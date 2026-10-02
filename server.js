const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 8000);
const HOST = process.env.HOST || '0.0.0.0';
const MODEL = process.env.OPENAI_MODEL || 'gpt-6-luna';
const API_KEY = process.env.OPENAI_API_KEY || '';

const MIME = {
  '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8',
  '.json':'application/json; charset=utf-8', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.svg':'image/svg+xml'
};

function send(res, status, body, type='application/json; charset=utf-8'){
  res.writeHead(status, {'Content-Type':type, 'Cache-Control':'no-store'});
  res.end(typeof body === 'string' ? body : JSON.stringify(body));
}

function collect(req){
  return new Promise((resolve,reject)=>{
    let data='';
    req.on('data',c=>{data+=c; if(data.length>2_000_000){reject(new Error('payload too large')); req.destroy();}});
    req.on('end',()=>{try{resolve(data?JSON.parse(data):{})}catch(e){reject(e)}});
    req.on('error',reject);
  });
}

function extractText(response){
  if(typeof response.output_text === 'string') return response.output_text;
  const out=[];
  for(const item of response.output || []){
    for(const c of item.content || []){
      if(typeof c.text === 'string') out.push(c.text);
    }
  }
  return out.join('\n').trim();
}

function cleanJson(text){
  let t=(text||'').trim();
  if(t.startsWith('```')) t=t.replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/,'');
  const first=t.indexOf('{'), last=t.lastIndexOf('}');
  if(first>=0 && last>first) t=t.slice(first,last+1);
  return JSON.parse(t);
}

async function askModel(instructions, input, max_output_tokens=1200){
  if(!API_KEY) throw Object.assign(new Error('AI backend not configured'),{status:503});
  const r = await fetch('https://api.openai.com/v1/responses', {
    method:'POST',
    headers:{'Authorization':`Bearer ${API_KEY}`,'Content-Type':'application/json'},
    body:JSON.stringify({model:MODEL,instructions,input,max_output_tokens})
  });
  const body=await r.json();
  if(!r.ok) throw Object.assign(new Error(body?.error?.message || 'OpenAI API error'),{status:r.status});
  return extractText(body);
}

const gradingInstructions = `You are an exacting Investment Banking Analyst interview evaluator. Grade answers for technical correctness, completeness, sequencing, and concise banker-ready communication. Do not reward confident but incorrect statements. A 10 is exceptional interview-ready performance; 7 is a solid passing answer with minor gaps; 5 is partial but meaningfully incomplete; 3 or below reflects major conceptual errors. Return ONLY valid JSON with keys: score (integer 1-10), headline (string), covered (array of concise strings), missing (array of concise strings), incorrect (array of concise strings), better_answer (string, concise but complete), follow_up (string).`;

async function apiGrade(payload){
  const prompt = `Topic: ${payload.topic}\nDifficulty: ${payload.difficulty}\nQuestion: ${payload.question}\nReference answer: ${payload.referenceAnswer}\nReference concepts: ${(payload.keyPoints||[]).join(', ')}\nCandidate answer: ${payload.userAnswer}`;
  return cleanJson(await askModel(gradingInstructions,prompt,1000));
}

async function apiInterviewNext(payload){
  const instructions = `You are conducting a realistic Investment Banking Analyst interview. You adapt to the candidate's last answer. Keep the interview professional, concise, and challenging. Never claim a bank always uses a particular process. If the candidate gave a weak or incomplete answer, ask one targeted follow-up; otherwise move to a fresh question that fits the requested interview type. Technical questions may cover accounting, valuation, DCF, M&A, 3-statement modeling, LBO, markets, or deal judgment. Behavioral questions should test motivation, teamwork, leadership, pressure, failure, and resume depth. Return ONLY valid JSON: {"next_question":"...","kind":"technical|behavioral","reason":"short internal calibration summary"}.`;
  const history=(payload.turns||[]).slice(-6).map((t,i)=>`Turn ${i+1} Q: ${t.question}\nA: ${t.answer}\nScore: ${t.score ?? 'n/a'}`).join('\n\n');
  const input=`Firm profile: ${payload.firm}\nInterview type: ${payload.type}\nStage: ${payload.stage}\nCandidate level: ${payload.candidateLevel}\nCoverage focus: ${payload.coverageFocus}\nFirm calibration notes: ${payload.profileStyle}\nRemaining approximate questions: ${payload.remaining}\n\nRecent interview history:\n${history}\n\nGenerate the next interviewer question.`;
  return cleanJson(await askModel(instructions,input,500));
}

async function apiResume(payload){
  const instructions = `You are a rigorous Investment Banking recruiting coach reviewing a candidate resume. Give realistic feedback tailored to the candidate's current academic/career stage. Do not invent experience that is not present. Prioritize evidence of analytical rigor, accounting/valuation/modeling, transactions, ownership, communication, academic strength, leadership, and concise quantified bullets. Suggest concrete projects only where they would materially fill a gap. Return ONLY valid JSON with keys: score (number 1-10), summary (string), strengths (array), gaps (array), bullet_improvements (array of strings), projects (array of objects with title, description, deliverable), stage_guidance (string).`;
  const input=`Candidate status: ${payload.status}\nTarget role: ${payload.target}\n\nResume text:\n${payload.text.slice(0,18000)}`;
  return cleanJson(await askModel(instructions,input,1800));
}

function serveStatic(req,res){
  let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if(pathname==='/') pathname='/index.html';
  const file=path.normalize(path.join(ROOT,pathname));
  if(!file.startsWith(ROOT)) return send(res,403,'Forbidden','text/plain');
  fs.stat(file,(err,st)=>{
    if(err||!st.isFile()) return send(res,404,'Not found','text/plain');
    res.writeHead(200,{'Content-Type':MIME[path.extname(file)]||'application/octet-stream'});
    fs.createReadStream(file).pipe(res);
  });
}


const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = Number(process.env.AI_RATE_LIMIT || 30);
const rateBuckets = new Map();

function clientIp(req){
  const fwd = req.headers['x-forwarded-for'];
  return (Array.isArray(fwd) ? fwd[0] : (fwd || req.socket.remoteAddress || 'unknown')).split(',')[0].trim();
}

function allowAiRequest(req){
  const now = Date.now();
  const ip = clientIp(req);
  const current = rateBuckets.get(ip);
  if(!current || now - current.start > RATE_WINDOW_MS){
    rateBuckets.set(ip,{start:now,count:1});
    return true;
  }
  if(current.count >= RATE_LIMIT) return false;
  current.count += 1;
  return true;
}

const server=http.createServer(async (req,res)=>{
  try{
    const url=new URL(req.url,'http://localhost');
    if(req.method==='POST' && url.pathname.startsWith('/api/') && !allowAiRequest(req)) return send(res,429,{error:'Too many AI requests. Please try again in a few minutes.'});
    if(url.pathname==='/api/health') return send(res,200,{ok:true,ai:Boolean(API_KEY),model:API_KEY?MODEL:null});
    if(req.method==='POST' && url.pathname==='/api/grade') return send(res,200,await apiGrade(await collect(req)));
    if(req.method==='POST' && url.pathname==='/api/interview-next') return send(res,200,await apiInterviewNext(await collect(req)));
    if(req.method==='POST' && url.pathname==='/api/resume') return send(res,200,await apiResume(await collect(req)));
    if(req.method==='GET' || req.method==='HEAD') return serveStatic(req,res);
    return send(res,405,{error:'Method not allowed'});
  }catch(e){
    send(res,e.status||500,{error:e.message||'Server error'});
  }
});

server.on('error',(err)=>{
  console.error('StreetPrep AI server failed to start:', err && err.stack ? err.stack : err);
  process.exit(1);
});

server.listen(PORT,HOST,()=>{
  console.log(`StreetPrep AI running on ${HOST}:${PORT}`);
  console.log(API_KEY ? `AI mode enabled (${MODEL})` : 'AI mode disabled — local fallback evaluators will be used.');
});
