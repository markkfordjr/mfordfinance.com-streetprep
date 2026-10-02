# StreetPrep AI

Investment Banking Analyst interview-prep web app with randomized technical drills, mock interviews, and resume feedback.

## Local run

```bash
npm start
```

Optional environment variables:
- `OPENAI_API_KEY` — enables AI grading/interview/resume features
- `OPENAI_MODEL` — defaults to `gpt-6-luna`
- `PORT` — defaults to `8000`
- `AI_RATE_LIMIT` — max AI POST requests per IP per 10 minutes; defaults to `30`

## Render deployment

This repository includes `render.yaml`. Create a Render Blueprint/Web Service from the GitHub repository, then add `OPENAI_API_KEY` as a secret environment variable. Do not commit your API key to GitHub.
