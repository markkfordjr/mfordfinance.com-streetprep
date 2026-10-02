const TOPIC_LABELS = {
  accounting: "Accounting",
  ma: "M&A",
  dcf: "DCF",
  threeStatement: "3-Statement",
  lbo: "LBO"
};

const QUESTION_BANK = [
  // Accounting
  {id:"acct-01",topic:"accounting",difficulty:"core",q:"Walk me through the three financial statements and explain how they link together.",key:["income statement","net income","cash flow statement","cash from operations","balance sheet","cash","retained earnings"],ideal:"Start with the income statement: revenue less expenses produces net income. Net income is the starting point of the cash flow statement, where non-cash items and changes in working capital are adjusted and investing/financing cash flows are added to arrive at the net change in cash. Ending cash flows to the balance sheet. Net income also increases retained earnings within shareholders' equity, while other cash-flow items change assets, liabilities, and equity depending on the transaction.",pitfalls:["Only listing the statements without explaining the links","Forgetting retained earnings","Treating net income as cash"]},
  {id:"acct-02",topic:"accounting",difficulty:"core",q:"A company records $10 of depreciation. Assume a 25% tax rate. Walk me through the impact on all three financial statements.",key:["ebit","10","tax","2.5","net income","7.5","add back","cash flow","capex","pp&e","cash","2.5","retained earnings"],ideal:"On the income statement, D&A rises by $10, EBIT falls by $10, taxes fall by $2.5, and net income falls by $7.5. On the cash flow statement, net income is down $7.5 but the $10 non-cash depreciation is added back, so cash increases by $2.5 versus the no-depreciation case. On the balance sheet, PP&E falls by $10, cash rises by $2.5, and retained earnings falls by $7.5, so both sides fall by $7.5.",pitfalls:["Saying cash falls by $7.5","Forgetting the tax shield","Forgetting PP&E"]},
  {id:"acct-03",topic:"accounting",difficulty:"core",q:"What is working capital, and why does an increase in net working capital reduce cash flow?",key:["current assets","current liabilities","cash","receivables","inventory","payables","use of cash"],ideal:"Net working capital is generally operating current assets minus operating current liabilities, often excluding cash and debt. If operating current assets such as A/R or inventory rise faster than operating current liabilities such as A/P, the company has tied up cash in the business. Therefore an increase in NWC is a use of cash and reduces cash flow from operations.",pitfalls:["Including debt without qualification","Saying higher NWC always means better liquidity so cash increases"]},
  {id:"acct-04",topic:"accounting",difficulty:"advanced",q:"A company buys $100 of inventory with cash, then later sells it for $150. Assume a 25% tax rate. Walk through both events across the statements.",key:["inventory","cash","100","revenue","150","cogs","100","pretax","50","tax","12.5","net income","37.5","cash flow","inventory","retained earnings"],ideal:"At purchase, cash falls $100 and inventory rises $100; there is no income statement impact and no net cash flow impact after the working-capital adjustment because the balance sheet simply shifts asset composition. At sale, revenue is $150 and COGS is $100, so pretax income rises $50, taxes rise $12.5, and net income rises $37.5. On the cash flow statement, net income rises $37.5 and the $100 inventory reduction is a source of cash; assuming cash sale, cash rises $137.5 from the sale event. On the balance sheet, inventory falls $100, cash rises $137.5, and retained earnings rises $37.5.",pitfalls:["Expensing inventory when purchased","Ignoring the inventory working-capital release"]},
  {id:"acct-05",topic:"accounting",difficulty:"advanced",q:"What is deferred revenue, and how does a $100 cash payment from a customer before service delivery affect the statements?",key:["cash","deferred revenue","liability","no revenue","cash flow from operations","100"],ideal:"The company has received cash but has not yet earned the revenue, so no revenue or net income is recognized initially. Cash increases by $100 and deferred revenue, a liability, increases by $100. On the cash flow statement, cash from operations increases by $100, usually through the change in deferred revenue. Later, as the service is delivered, revenue is recognized and the deferred-revenue liability declines.",pitfalls:["Recognizing revenue immediately","Calling deferred revenue an asset"]},
  {id:"acct-06",topic:"accounting",difficulty:"core",q:"What is the difference between capitalizing and expensing a cost?",key:["asset","balance sheet","expense","income statement","depreciation","amortization","future periods","cash flow"],ideal:"An expensed cost hits the income statement immediately and reduces current-period earnings. A capitalized cost is recorded as an asset and recognized through depreciation or amortization over future periods. The initial cash outflow can be identical; the difference is timing of expense recognition and classification on the cash flow statement.",pitfalls:["Saying capitalization avoids expense forever","Confusing accounting treatment with whether cash was paid"]},
  {id:"acct-07",topic:"accounting",difficulty:"advanced",q:"If accounts receivable increases by $20 with no other changes, what happens to cash flow and the balance sheet?",key:["receivables","20","cash from operations","decrease","cash","asset","revenue"],ideal:"An increase in A/R means revenue recognized has not yet been collected in cash. The $20 increase is a $20 use of cash in CFO. On the balance sheet, A/R is $20 higher and cash is $20 lower than it otherwise would be, with total assets unchanged versus a cash collection scenario.",pitfalls:["Calling it a source of cash","Assuming an income statement change from the working-capital movement alone"]},
  {id:"acct-08",topic:"accounting",difficulty:"core",q:"Why is EBITDA not the same as cash flow?",key:["working capital","capex","taxes","interest","cash","non-cash","ebitda"],ideal:"EBITDA is an operating earnings proxy before interest, taxes, D&A. It ignores cash taxes, interest, capital expenditures, changes in working capital, and other investing/financing items. It can be useful for comparing operating performance, but it is not actual cash generated for equity or debt holders.",pitfalls:["Saying EBITDA includes capex","Calling EBITDA free cash flow"]},
  {id:"acct-09",topic:"accounting",difficulty:"advanced",q:"How can a company have positive net income but negative cash flow from operations?",key:["working capital","accounts receivable","inventory","non-cash","timing","cash"],ideal:"Accrual earnings and cash collection can diverge. A company may report positive net income while cash from operations is negative if working-capital uses—such as rapidly rising A/R or inventory—more than offset earnings and non-cash add-backs. Other timing differences and non-cash income can also contribute.",pitfalls:["Saying positive net income guarantees positive CFO"]},
  {id:"acct-10",topic:"accounting",difficulty:"advanced",q:"Explain goodwill and when it is created in an acquisition.",key:["purchase price","fair value","net identifiable assets","premium","intangible","impairment"],ideal:"Goodwill is created when the purchase price paid for a target exceeds the fair value of its identifiable net assets acquired. It captures items such as expected synergies, assembled workforce, and other value not separately recognized as identifiable assets. It remains on the balance sheet and is generally tested for impairment rather than amortized under U.S. GAAP for public companies.",pitfalls:["Calling goodwill cash","Saying goodwill equals purchase price"]},
  {id:"acct-11",topic:"accounting",difficulty:"core",q:"What is retained earnings and what typically changes it?",key:["equity","net income","dividends","accumulated","balance sheet"],ideal:"Retained earnings is the cumulative portion of net income kept in the business rather than distributed to shareholders. It sits in shareholders' equity and generally increases with net income and decreases with dividends and certain accounting adjustments.",pitfalls:["Calling it cash","Saying share issuance directly increases retained earnings"]},
  {id:"acct-12",topic:"accounting",difficulty:"advanced",q:"What happens if inventory is written down by $20? Assume a 25% tax rate.",key:["cogs","expense","20","tax","5","net income","15","cash flow","non-cash","inventory","retained earnings"],ideal:"The write-down creates a $20 expense, reducing pretax income by $20, taxes by $5, and net income by $15. The write-down is non-cash, so $20 is added back on the cash flow statement, increasing cash by $5 versus the pre-write-down case. On the balance sheet, inventory falls $20, cash rises $5, and retained earnings falls $15, balancing the $15 net decline in assets and equity.",pitfalls:["Assuming a $20 immediate cash outflow","Forgetting tax effect"]},

  // M&A
  {id:"ma-01",topic:"ma",difficulty:"core",q:"Walk me through a basic accretion / dilution analysis.",key:["purchase price","financing","synergies","target earnings","interest","shares","pro forma net income","pro forma eps","buyer eps"],ideal:"Determine the purchase price and transaction structure, including cash, debt, and stock consideration. Estimate incremental financing costs, lost interest income, purchase-accounting effects, and synergies. Add the target's adjusted net income to the buyer's net income, subtract incremental costs, and divide by the pro forma share count to calculate pro forma EPS. Compare pro forma EPS with the buyer's standalone EPS: higher is accretive, lower is dilutive.",pitfalls:["Ignoring new shares in stock deals","Ignoring financing costs or synergies"]},
  {id:"ma-02",topic:"ma",difficulty:"core",q:"Why might a strategic buyer be able to pay more than a financial sponsor?",key:["synergies","cost synergies","revenue synergies","strategic","lbo returns","leverage","irr"],ideal:"A strategic buyer can often justify a higher price because it may realize cost or revenue synergies unavailable to a financial sponsor. A sponsor generally prices to achieve a target return based on leverage, cash-flow growth, and exit value, so its valuation is constrained by required IRR and debt capacity.",pitfalls:["Saying strategics always pay more","Ignoring sponsor operational upside"]},
  {id:"ma-03",topic:"ma",difficulty:"core",q:"What are the major ways an acquisition can be financed, and how does each affect accretion / dilution?",key:["cash","debt","stock","interest","foregone interest","shares","eps"],ideal:"The main forms are cash on hand, new debt, and stock. Cash can create lost interest income; debt creates after-tax interest expense; stock creates new shares and therefore dilution to the denominator. The accretion/dilution result depends on the target earnings acquired, financing cost, purchase accounting, synergies, and relative valuation multiples.",pitfalls:["Treating cash as free","Ignoring share issuance"]},
  {id:"ma-04",topic:"ma",difficulty:"advanced",q:"Why can buying a company with a lower P/E multiple than the buyer be accretive in an all-stock deal?",key:["earnings yield","inverse","p/e","shares","relative multiple","accretive"],ideal:"In a simplified no-synergy all-stock deal, a lower target P/E means a higher earnings yield than the buyer. The buyer is effectively issuing relatively expensive stock to purchase cheaper earnings, so the incremental earnings acquired can exceed the EPS dilution from new shares, making the deal accretive.",pitfalls:["Saying lower P/E guarantees accretion in every deal","Ignoring purchase accounting and synergies"]},
  {id:"ma-05",topic:"ma",difficulty:"advanced",q:"What is purchase price allocation and why does it matter in merger modeling?",key:["fair value","assets","liabilities","intangible assets","goodwill","deferred taxes","depreciation","amortization"],ideal:"Purchase price allocation revalues the target's acquired assets and liabilities to fair value and allocates the purchase price among tangible net assets, identifiable intangibles, deferred-tax effects, and goodwill. It matters because step-ups can create incremental D&A, amortization, taxes, and balance-sheet changes that affect pro forma earnings and accretion/dilution.",pitfalls:["Treating all premium as goodwill","Ignoring amortization from identifiable intangibles"]},
  {id:"ma-06",topic:"ma",difficulty:"core",q:"What are synergies? Give examples of cost and revenue synergies and explain how you would model them.",key:["cost synergies","revenue synergies","headcount","procurement","cross-sell","margin","ramp","tax"],ideal:"Cost synergies are savings such as eliminating duplicate functions, consolidating facilities, or improving procurement. Revenue synergies include cross-selling, pricing, channel expansion, or broader distribution. In a model, estimate the annual run-rate, phase in the realization over time, apply appropriate margins and taxes, and separately consider one-time costs to achieve the synergies.",pitfalls:["Modeling full synergies on day one without rationale","Ignoring integration costs"]},
  {id:"ma-07",topic:"ma",difficulty:"advanced",q:"A buyer trades at 20x P/E and a target at 10x P/E. Ignoring synergies and purchase accounting, is an all-stock deal likely accretive or dilutive? Explain, don't just answer.",key:["accretive","earnings yield","5%","10%","expensive stock","cheap earnings"],ideal:"It is likely accretive because the buyer's 20x P/E implies a 5% earnings yield while the target's 10x implies a 10% earnings yield. The buyer is issuing stock with a lower earnings yield to acquire earnings with a higher yield. In the simplified setup, the earnings gained outweigh the proportional share issuance.",pitfalls:["Only stating accretive without explaining earnings yield","Claiming certainty despite omitted real-world adjustments"]},
  {id:"ma-08",topic:"ma",difficulty:"advanced",q:"What is a fairness opinion and what is it intended to address?",key:["board","financial point of view","consideration","fair","valuation","advisor"],ideal:"A fairness opinion is typically delivered by a financial advisor to a board or special committee stating whether the consideration in a transaction is fair, from a financial point of view, to a specified group of shareholders. It supports the board's process but is not a guarantee of future value or a legal opinion on every aspect of the transaction.",pitfalls:["Calling it a recommendation that shareholders must accept","Saying it guarantees the best possible price"]},
  {id:"ma-09",topic:"ma",difficulty:"core",q:"What is the difference between an asset purchase and a stock purchase?",key:["assets","liabilities","shares","tax basis","step-up","contracts","legal entity"],ideal:"In an asset purchase, the buyer acquires selected assets and often selected liabilities, potentially receiving a tax basis step-up but facing more transfer complexity. In a stock purchase, the buyer acquires the target's equity and therefore the legal entity, including its assets and liabilities, which can simplify continuity of contracts but may carry more inherited liabilities.",pitfalls:["Saying stock purchase means buying inventory only","Ignoring tax and liability differences"]},
  {id:"ma-10",topic:"ma",difficulty:"advanced",q:"How do you bridge from equity purchase price to transaction enterprise value in an acquisition?",key:["equity value","debt","cash","minority","preferred","enterprise value","assumed"],ideal:"Start with the equity purchase price paid to common shareholders. Add debt and debt-like items assumed or refinanced, preferred stock, and noncontrolling interests as appropriate, then subtract acquired cash and cash-like items. The exact bridge depends on the deal's definitions and purchase agreement.",pitfalls:["Adding cash instead of subtracting it","Ignoring debt-like items"]},
  {id:"ma-11",topic:"ma",difficulty:"core",q:"What are the main reasons companies pursue acquisitions?",key:["growth","synergies","market share","capabilities","geography","vertical integration","technology"],ideal:"Common rationales include accelerating growth, entering new markets or geographies, gaining products or technology, achieving cost or revenue synergies, increasing scale or market share, vertical integration, diversifying, or acquiring talent and capabilities. A strong answer also notes that strategic rationale must justify the premium and execution risk.",pitfalls:["Only saying growth","Ignoring integration and premium risk"]},
  {id:"ma-12",topic:"ma",difficulty:"advanced",q:"What factors determine whether debt financing or stock financing is more attractive for an acquisition?",key:["cost of debt","interest rate","leverage","credit","valuation","p/e","ownership","eps","balance sheet"],ideal:"Key factors include the buyer's borrowing capacity and credit metrics, after-tax cost of debt, interest-rate environment, equity valuation, relative buyer/target multiples, EPS impact, desired ownership dilution, ratings constraints, liquidity, covenant headroom, and strategic preference for balance-sheet flexibility.",pitfalls:["Choosing debt solely because interest is tax deductible","Ignoring dilution and credit constraints"]},

  // DCF
  {id:"dcf-01",topic:"dcf",difficulty:"core",q:"Walk me through a DCF from revenue to implied equity value.",key:["revenue","ebitda","ebit","tax","nopat","d&a","capex","working capital","unlevered free cash flow","wacc","terminal value","enterprise value","net debt","equity value"],ideal:"Project operating results, calculate EBIT and apply taxes to get NOPAT, add back D&A, subtract capex and the increase in NWC to derive unlevered free cash flow. Discount projected UFCF at WACC. Estimate terminal value using a perpetuity-growth or exit-multiple method and discount it back. Sum present values to get enterprise value, then subtract net debt and other non-common claims and add non-operating assets as appropriate to reach equity value; divide by diluted shares for implied value per share.",pitfalls:["Discounting UFCF at cost of equity","Forgetting to bridge EV to equity value"]},
  {id:"dcf-02",topic:"dcf",difficulty:"core",q:"Why do you use WACC to discount unlevered free cash flow?",key:["debt","equity","capital providers","unlevered","weighted average","after-tax cost of debt"],ideal:"UFCF is cash flow available to all capital providers before debt payments, so the discount rate should reflect the blended required return of debt and equity. WACC weights the cost of equity and after-tax cost of debt by their market-value proportions, matching the cash flow's capital structure neutrality.",pitfalls:["Saying WACC is only the cost of debt","Using levered cash flow with WACC"]},
  {id:"dcf-03",topic:"dcf",difficulty:"core",q:"How do you calculate terminal value using the perpetuity growth method?",key:["fcf","wacc","growth","wacc minus g","year n plus 1"],ideal:"Terminal value at the end of the projection period equals FCF in the following year divided by WACC minus the perpetual growth rate: TV = FCF_(n+1) / (WACC - g). Then discount that terminal value back to present at WACC.",pitfalls:["Using current-year FCF without growing it when formula requires next year","Setting g greater than WACC"]},
  {id:"dcf-04",topic:"dcf",difficulty:"core",q:"What are the two standard terminal-value methods and what are the pros and cons of each?",key:["perpetuity growth","exit multiple","fundamental","market","multiple","sensitivity"],ideal:"The perpetuity-growth method assumes cash flow grows at a sustainable long-term rate and is theoretically grounded but sensitive to WACC and g. The exit-multiple method applies a market-based multiple to a terminal metric such as EBITDA and is intuitive and tied to trading evidence, but it can reintroduce relative-valuation assumptions into an intrinsic valuation.",pitfalls:["Saying one is always superior","Ignoring sensitivity"]},
  {id:"dcf-05",topic:"dcf",difficulty:"advanced",q:"Which DCF assumptions usually have the largest impact on valuation and why?",key:["wacc","terminal value","growth","margin","revenue","exit multiple","sensitivity"],ideal:"WACC and terminal-value assumptions usually have outsized impact because a large portion of enterprise value often comes from distant cash flows and terminal value. Revenue growth and margins also matter because they shape the entire FCF base. Good practice is to sensitivity-test WACC versus terminal growth or exit multiple and stress operating assumptions separately.",pitfalls:["Naming only revenue","Ignoring terminal value concentration"]},
  {id:"dcf-06",topic:"dcf",difficulty:"advanced",q:"How does a 1% increase in WACC generally affect DCF value? Explain conceptually.",key:["decrease","present value","discount rate","terminal value","sensitivity"],ideal:"All else equal, a higher WACC lowers the present value of projected cash flows and also typically lowers terminal value under the perpetuity-growth method because WACC appears in the denominator. The effect can be substantial because long-duration cash flows are especially sensitive to the discount rate.",pitfalls:["Saying value increases","Providing a fixed percentage without model context"]},
  {id:"dcf-07",topic:"dcf",difficulty:"advanced",q:"How would you value a company with negative near-term free cash flow using a DCF?",key:["forecast","positive cash flow","longer projection","terminal","unit economics","wacc","scenario"],ideal:"A DCF can still work if there is a credible path to positive cash flow. Extend the explicit forecast far enough to reach a more normalized state, model the operating drivers carefully, and use scenario or sensitivity analysis because terminal value may dominate. If the business lacks a credible path to sustainable cash flow, the DCF becomes less reliable and alternative methods deserve more weight.",pitfalls:["Saying DCF is impossible whenever FCF is negative","Using a terminal value before normalization"]},
  {id:"dcf-08",topic:"dcf",difficulty:"core",q:"What is unlevered free cash flow? Give the formula starting from EBIT.",key:["ebit","tax","nopat","d&a","capex","working capital"],ideal:"UFCF = EBIT × (1 - tax rate) + D&A - capex - increase in net working capital, with other non-cash operating items and adjustments included as appropriate. It represents cash flow generated by operations before interest and debt repayments, available to both debt and equity holders.",pitfalls:["Subtracting interest expense","Forgetting capex or working capital"]},
  {id:"dcf-09",topic:"dcf",difficulty:"advanced",q:"How do you calculate cost of equity under CAPM?",key:["risk-free","beta","equity risk premium","rf","beta times erp"],ideal:"Cost of equity = risk-free rate + beta × equity risk premium, with additional premiums included only if the valuation framework calls for them. Beta captures the stock's systematic risk relative to the market.",pitfalls:["Using cost of debt in CAPM","Adding the ERP without multiplying by beta"]},
  {id:"dcf-10",topic:"dcf",difficulty:"advanced",q:"How do you unlever and relever beta, and why would you do it?",key:["capital structure","debt equity","tax","comparable","unlever","relever","asset beta"],ideal:"You unlever comparable-company equity betas to remove the effect of each company's capital structure and estimate business or asset risk, then relever the resulting beta using the subject company's target debt/equity mix. A common simplified formula is unlevered beta = levered beta / [1 + (1-tax rate)×D/E], then reverse it to relever.",pitfalls:["Saying beta has nothing to do with leverage","Using book values without thought"]},
  {id:"dcf-11",topic:"dcf",difficulty:"core",q:"Why do you subtract the increase in net working capital when calculating free cash flow?",key:["use of cash","receivables","inventory","payables","cash tied up"],ideal:"An increase in operating NWC means more cash is tied up in items like receivables and inventory net of payables. That cash is not available to capital providers, so the increase is subtracted when converting accounting profit to free cash flow.",pitfalls:["Treating every NWC increase as a source of cash"]},
  {id:"dcf-12",topic:"dcf",difficulty:"advanced",q:"When might you use a sum-of-the-parts valuation instead of a single consolidated DCF?",key:["segments","different growth","margins","risk","capital intensity","multiple","business lines"],ideal:"SOTP is useful when a company has distinct businesses with materially different growth, margins, risk, capital intensity, or appropriate valuation methodologies. You value each segment separately—using DCFs or relevant multiples—and then add them, adjusting for corporate items, net debt, and non-operating assets or liabilities.",pitfalls:["Using SOTP simply because the company is large","Forgetting corporate-level adjustments"]},

  // Three Statement
  {id:"3s-01",topic:"threeStatement",difficulty:"core",q:"Describe the basic build order of a 3-statement model.",key:["income statement","balance sheet","cash flow statement","revenue","working capital","debt","cash","circularity"],ideal:"Start by projecting operating drivers and the income statement. Build supporting schedules for working capital, PP&E/depreciation, debt/interest, and other balance-sheet items. Use net income and balance-sheet changes to construct the cash flow statement, calculate ending cash, then flow that cash back to the balance sheet. Add checks so assets equal liabilities plus equity and manage interest/cash circularity appropriately.",pitfalls:["Building statements independently","Ignoring support schedules and balance checks"]},
  {id:"3s-02",topic:"threeStatement",difficulty:"core",q:"How does revenue growth flow through a 3-statement model?",key:["revenue","gross profit","operating income","net income","receivables","working capital","cash","retained earnings"],ideal:"Higher revenue flows through margins to operating income and net income, subject to incremental costs and taxes. It can also increase working-capital needs such as A/R and inventory, which may reduce cash conversion. Net income increases retained earnings, while cash changes based on profitability, working capital, capex, financing, and other cash-flow items.",pitfalls:["Assuming all incremental revenue becomes cash","Ignoring working capital"]},
  {id:"3s-03",topic:"threeStatement",difficulty:"advanced",q:"How would you model accounts receivable using days sales outstanding?",key:["dso","revenue","days","365","accounts receivable","formula"],ideal:"Project DSO based on historical trends or operating assumptions, then calculate A/R as DSO divided by the number of days in the period multiplied by revenue, with adjustments if using quarterly periods or average balances. Changes in A/R then flow through working capital on the cash flow statement.",pitfalls:["Using EBITDA instead of revenue","Forgetting period length"]},
  {id:"3s-04",topic:"threeStatement",difficulty:"advanced",q:"How do you model PP&E and depreciation in a 3-statement model?",key:["beginning pp&e","capex","depreciation","ending pp&e","useful life","schedule"],ideal:"Create a PP&E schedule where ending PP&E equals beginning PP&E plus capex minus depreciation and disposals. Forecast capex using operating drivers or percent of sales and forecast depreciation from existing and new asset bases using useful-life assumptions. Depreciation flows to the income statement and is added back on the cash flow statement.",pitfalls:["Subtracting capex from PP&E","Forgetting depreciation is non-cash"]},
  {id:"3s-05",topic:"threeStatement",difficulty:"advanced",q:"Why can interest expense create circularity in a 3-statement model, and how can you handle it?",key:["debt","cash","interest","revolver","circularity","average debt","iteration","circuit breaker"],ideal:"Interest depends on debt and cash balances, but debt or revolver usage can depend on ending cash, which itself depends on net income after interest. This creates circularity. Common approaches include iterative calculation, a circularity switch/circuit breaker, using beginning or average balances as an approximation, or solving debt after pre-interest cash flow.",pitfalls:["Saying circularity is always an error","Ignoring cash interest income"]},
  {id:"3s-06",topic:"threeStatement",difficulty:"core",q:"What is the cash sweep in a model?",key:["excess cash","debt repayment","mandatory amortization","revolver","cash balance"],ideal:"A cash sweep uses excess cash generated by the business, after minimum cash and required uses, to repay debt. In a 3-statement or LBO model it links free cash flow to the debt schedule and reduces future interest expense as debt is paid down.",pitfalls:["Calling a cash sweep a dividend","Ignoring minimum cash"]},
  {id:"3s-07",topic:"threeStatement",difficulty:"advanced",q:"If capex increases by $50 with no change in depreciation in the current period, what happens across the statements?",key:["income statement","no impact","cash flow investing","50","cash","pp&e","balance sheet"],ideal:"There is no current-period income statement impact if depreciation is unchanged. On the cash flow statement, capex is a $50 investing cash outflow, so cash falls by $50. On the balance sheet, PP&E rises by $50 and cash falls by $50, leaving total assets unchanged.",pitfalls:["Expensing the full capex immediately","Forgetting PP&E rises"]},
  {id:"3s-08",topic:"threeStatement",difficulty:"advanced",q:"How do you forecast inventory using days inventory outstanding?",key:["dio","cogs","365","inventory","formula"],ideal:"Inventory is typically modeled as DIO divided by days in the period multiplied by COGS. Forecast DIO based on historical trends or operating assumptions. The period-over-period change in inventory flows through working capital on the cash flow statement.",pitfalls:["Using revenue instead of COGS without justification","Forgetting inventory increase is a use of cash"]},
  {id:"3s-09",topic:"threeStatement",difficulty:"core",q:"What is the purpose of a balance-sheet check in a 3-statement model?",key:["assets","liabilities","equity","difference","zero","error"],ideal:"The check verifies that total assets equal total liabilities plus shareholders' equity. A non-zero difference flags a broken link, sign convention issue, missing cash-flow impact, or other modeling error. The check should equal zero in every projected period.",pitfalls:["Treating the plug itself as the fix","Ignoring small persistent differences"]},
  {id:"3s-10",topic:"threeStatement",difficulty:"advanced",q:"How would a new $100 term loan used entirely to fund capex affect the statements at close, ignoring fees?",key:["debt","100","cash","capex","pp&e","financing","investing","income statement","no immediate impact"],ideal:"At close, the borrowing adds $100 of financing cash inflow and increases debt by $100. The capex creates a $100 investing outflow and increases PP&E by $100. Net cash is unchanged. There is no immediate income statement impact at close, though future periods will include depreciation and interest expense.",pitfalls:["Recognizing immediate $100 expense","Forgetting debt liability"]},
  {id:"3s-11",topic:"threeStatement",difficulty:"core",q:"What are the main supporting schedules you would expect behind a 3-statement model?",key:["working capital","pp&e","depreciation","debt","interest","equity","tax","revenue"],ideal:"Typical schedules include revenue/operating drivers, working capital, PP&E and depreciation, debt and interest, equity/share count, taxes, and sometimes leases, deferred revenue, stock compensation, or segment schedules. These schedules create transparent links into the three statements.",pitfalls:["Only naming the three statements themselves"]},
  {id:"3s-12",topic:"threeStatement",difficulty:"advanced",q:"How would you model a revolver in a 3-statement model?",key:["minimum cash","draw","repay","cash deficit","cash surplus","interest","debt schedule"],ideal:"Set a minimum cash requirement. After operating, investing, and other financing cash flows, draw the revolver when ending cash would fall below the minimum and repay it when excess cash is available. The revolver balance sits in the debt schedule and generates interest expense, which may require circularity handling.",pitfalls:["Drawing the revolver regardless of cash needs","Forgetting interest expense"]},

  // LBO
  {id:"lbo-01",topic:"lbo",difficulty:"core",q:"Walk me through a basic LBO model.",key:["purchase price","sources and uses","debt","equity","operating projection","free cash flow","debt paydown","exit multiple","enterprise value","equity value","irr","moic"],ideal:"Set the entry purchase price and build sources & uses to determine debt and sponsor equity funding. Project the company's operating performance and free cash flow, then use available cash to amortize or sweep debt. At exit, apply an exit multiple to the terminal operating metric to calculate enterprise value, subtract remaining net debt to get sponsor equity value, then calculate MOIC and IRR on the sponsor's initial equity investment.",pitfalls:["Forgetting debt paydown","Calculating returns on enterprise value instead of sponsor equity"]},
  {id:"lbo-02",topic:"lbo",difficulty:"core",q:"What are the main drivers of LBO returns?",key:["entry multiple","exit multiple","ebitda growth","margin","leverage","debt paydown","holding period","cash flow"],ideal:"The key drivers are entry valuation, exit valuation, operating growth and margin expansion, initial leverage, free-cash-flow generation and debt paydown, and the holding period. Lower entry price, stronger EBITDA growth, more deleveraging, and a higher exit multiple generally improve returns, though higher leverage also increases risk.",pitfalls:["Naming leverage alone","Ignoring holding period"]},
  {id:"lbo-03",topic:"lbo",difficulty:"core",q:"Why does debt increase equity returns in an LBO?",key:["less equity","leverage","debt paydown","equity value","risk","interest"],ideal:"Debt reduces the amount of sponsor equity required at entry. If the business generates enough cash to service and repay debt, the sponsor owns the residual equity value on a smaller initial equity investment, magnifying returns. The same leverage also magnifies downside risk and increases fixed interest obligations.",pitfalls:["Saying debt creates value by itself","Ignoring downside risk"]},
  {id:"lbo-04",topic:"lbo",difficulty:"advanced",q:"What characteristics make a company a good LBO candidate?",key:["stable cash flow","predictable","margins","low capex","debt capacity","defensible","growth","assets","management"],ideal:"Attractive candidates generally have stable and predictable cash flow, defensible market positions, manageable capex and working-capital needs, strong margins, debt capacity, opportunities for operational improvement or growth, and a credible exit path. Recurring revenue and tangible assets can also help, depending on the business.",pitfalls:["Only saying high growth","Ignoring cash-flow stability and debt service"]},
  {id:"lbo-05",topic:"lbo",difficulty:"advanced",q:"What is the difference between MOIC and IRR?",key:["multiple","money","time","holding period","annualized","return"],ideal:"MOIC is total equity proceeds divided by invested equity and ignores the timing of cash flows. IRR is the annualized discount rate that sets the net present value of investment cash flows to zero, so it is highly sensitive to holding period and timing. A 2.0x MOIC can imply very different IRRs over three years versus seven years.",pitfalls:["Saying they are interchangeable","Ignoring time in IRR"]},
  {id:"lbo-06",topic:"lbo",difficulty:"advanced",q:"How does the exit multiple affect LBO returns, and why should you be cautious about multiple expansion?",key:["exit enterprise value","equity value","irr","moic","assumption","conservative","multiple expansion"],ideal:"A higher exit multiple increases exit enterprise value and therefore sponsor equity value after subtracting remaining debt, raising MOIC and IRR. Because multiple expansion is market-dependent and not fully controllable, sponsors often avoid relying on it in the base case and may assume a flat or even lower exit multiple for conservatism.",pitfalls:["Treating multiple expansion as operational value creation"]},
  {id:"lbo-07",topic:"lbo",difficulty:"advanced",q:"What is a sources & uses table in an LBO?",key:["sources","debt","equity","uses","purchase price","refinance","fees","minimum cash"],ideal:"Uses show where transaction funds go—equity purchase price, refinancing existing debt, fees, expenses, and sometimes minimum cash or other adjustments. Sources show how those uses are funded—new debt tranches, sponsor equity, rollover equity, or other financing. Total sources must equal total uses.",pitfalls:["Putting purchase price under sources","Forgetting refinanced debt and fees"]},
  {id:"lbo-08",topic:"lbo",difficulty:"advanced",q:"What is PIK interest and how does it affect an LBO model?",key:["paid in kind","non-cash","debt balance","interest expense","cash","accrues"],ideal:"PIK interest is non-cash interest that accrues to the debt principal rather than being paid currently in cash. It increases interest expense on the income statement and the debt balance on the balance sheet, is added back in operating cash flow as non-cash, and increases the amount that must ultimately be repaid or refinanced.",pitfalls:["Treating PIK as cash interest","Forgetting it increases debt principal"]},
  {id:"lbo-09",topic:"lbo",difficulty:"core",q:"How do you calculate sponsor equity value at exit in a basic LBO?",key:["exit ebitda","exit multiple","enterprise value","net debt","equity value"],ideal:"Calculate exit enterprise value by applying the exit multiple to the selected exit operating metric, usually EBITDA. Then subtract remaining debt and other debt-like claims and add excess cash or other non-operating assets as appropriate. The resulting equity value belongs to the sponsor and any other equity holders according to their ownership.",pitfalls:["Using entry debt instead of exit debt","Confusing enterprise and equity value"]},
  {id:"lbo-10",topic:"lbo",difficulty:"advanced",q:"If you increase leverage at entry, what happens to IRR and risk, all else equal?",key:["irr","increase","equity contribution","risk","interest","default","debt service"],ideal:"All else equal, more leverage reduces the initial equity contribution and can increase equity IRR and MOIC if the company performs and debt can be serviced. But it also raises interest expense, reduces financial flexibility, increases refinancing/default risk, and can constrain the business. Returns do not improve if leverage undermines operations or forces distress.",pitfalls:["Saying more leverage always improves outcomes","Ignoring interest and default risk"]},
  {id:"lbo-11",topic:"lbo",difficulty:"advanced",q:"Why is free cash flow conversion important in an LBO?",key:["debt paydown","cash","ebitda","capex","working capital","interest","deleveraging"],ideal:"Sponsors rely on cash generation to service and repay debt. High EBITDA is not enough if capex, working capital, taxes, or other cash uses absorb most of it. Strong FCF conversion enables faster deleveraging, lowers interest expense over time, and increases exit equity value.",pitfalls:["Using EBITDA as if it were cash","Ignoring capex and working capital"]},
  {id:"lbo-12",topic:"lbo",difficulty:"advanced",q:"How would a dividend recapitalization affect sponsor returns?",key:["new debt","dividend","cash proceeds","irr","moic","leverage","risk"],ideal:"In a dividend recap, the portfolio company raises additional debt and distributes proceeds to equity holders before exit. This returns capital earlier, which can increase IRR and MOIC, but it raises leverage and risk and may reduce future flexibility or exit equity value if the additional debt remains outstanding.",pitfalls:["Calling it free money","Ignoring higher leverage"]}
];

const FIRM_PROFILES = {
  "Goldman Sachs": {abbr:"GS",tech:72,behavior:70,pressure:82,style:"Technical + resume-driven early; senior rounds often expand fit and judgment.",tags:["Resume depth","Accounting","Valuation","Why GS"],questionBias:["accounting","dcf","ma"],behavioral:["Why Goldman Sachs?","Walk me through your resume.","Tell me about a time you had to defend a difficult decision.","Describe a situation where you received critical feedback."],source:"Recent candidate reports describe technical/resume questions in early rounds with broader behavioral emphasis later."},
  "JPMorgan": {abbr:"JPM",tech:68,behavior:72,pressure:70,style:"Balanced technical/behavioral process with strong motivation and teamwork emphasis.",tags:["Behavioral","Markets","Valuation","Teamwork"],questionBias:["accounting","dcf","ma"],behavioral:["Why JPMorgan and why investment banking?","Tell me about a time you worked through competing priorities.","Discuss a recent transaction that interested you.","Tell me about a conflict on a team and how you handled it."],source:"Profile uses recurring bulge-bracket patterns and community reports; exact structure varies materially by group."},
  "Morgan Stanley": {abbr:"MS",tech:70,behavior:72,pressure:68,style:"Often HireVue/screen first, then a technical-heavy first round and senior Superday conversations.",tags:["HireVue","Technical screen","Markets","Why MS"],questionBias:["accounting","dcf","ma"],behavioral:["Why Morgan Stanley?","Why investment banking?","What differentiates Morgan Stanley to you?","Tell me about a time you performed under pressure."],source:"Recent Glassdoor reports describe HireVue followed by technical-heavy first rounds and senior Superdays."},
  "Citi": {abbr:"C",tech:72,behavior:68,pressure:72,style:"Recent reports show split behavioral/technical first rounds and technical depth at Superday.",tags:["M&A math","Paper LBO","Purchase accounting","Why Citi"],questionBias:["ma","lbo","dcf","accounting"],behavioral:["Why Citi?","Tell me about a time you worked under a tight deadline.","Why this group?","Describe a time you had to influence someone without authority."],source:"A 2026 candidate report described recorded video, split behavioral/technical Zoom rounds, then a multi-block Superday."},
  "Bank of America": {abbr:"BofA",tech:68,behavior:70,pressure:66,style:"HireVue or initial screen, then technical/behavioral rounds and multi-interviewer final stages.",tags:["HireVue","Technical","Commercial","Case"],questionBias:["accounting","dcf","ma"],behavioral:["Why Bank of America?","Tell me about a time you led a team.","Discuss a current market theme.","Describe how you communicate complex information."],source:"Recent reports describe HireVue plus technical/behavioral interviews and, in some processes, case studies or multi-interviewer Superdays."},
  "Evercore": {abbr:"EVR",tech:90,behavior:68,pressure:88,style:"Conceptual technical depth; interviewers may push beyond memorized guide answers.",tags:["Conceptual technicals","Accounting","Valuation","Deal discussion"],questionBias:["accounting","dcf","ma","lbo"],behavioral:["Why Evercore?","Why M&A?","Discuss a transaction you have followed closely.","Tell me about feedback that changed how you work."],source:"Recent candidates describe technically difficult, conceptual interviews with deep resume/deal follow-ups."},
  "Lazard": {abbr:"LAZ",tech:84,behavior:70,pressure:80,style:"Technical first rounds are common; accounting and LBO questions appear in recent Superday reports.",tags:["Accounting","LBO","Technical first","Why Lazard"],questionBias:["accounting","lbo","dcf","ma"],behavioral:["Why Lazard?","Why advisory?","Walk me through your resume.","Tell me about a time you persuaded a skeptical teammate."],source:"Recent candidate reports describe first-round technicals followed by Superdays mixing technical and behavioral questions, including accounting and LBO."},
  "Moelis": {abbr:"MC",tech:92,behavior:68,pressure:92,style:"Heavy technical pressure with follow-ups designed to test understanding beyond memorization.",tags:["Paper DCF","3-statement","M&A","Deep follow-ups"],questionBias:["threeStatement","dcf","ma","lbo","accounting"],behavioral:["Why Moelis?","Why investment banking?","Walk me through the M&A process.","Tell me about a time you worked on a team under pressure."],source:"2026 reports describe candidates being pushed on common IB questions and intensive modeling/technical follow-ups."},
  "PJT Partners": {abbr:"PJT",tech:84,behavior:74,pressure:82,style:"Mix of technical, behavioral, market/trend, and case-style questioning across rounds.",tags:["Technical","Behavioral","Market view","Case"],questionBias:["accounting","dcf","ma","lbo"],behavioral:["Why PJT?","What is your current market view?","Tell me about a time you operated with incomplete information.","Why advisory over principal investing?"],source:"Recent reports describe first rounds plus multi-interview finals containing technical, behavioral, and market/trend components."},
  "Centerview Partners": {abbr:"CVP",tech:85,behavior:78,pressure:86,style:"Technical valuation plus abstract/mental-math or unusual fit questions can appear.",tags:["DCF","Valuation","Mental math","Abstract fit"],questionBias:["dcf","ma","accounting"],behavioral:["Why Centerview?","Tell me about yourself.","Discuss a recent transaction.","If you could have dinner with anyone in history, who and why?"],source:"Recent reports cite DCF/valuation questions alongside brainteasers, mental math, and unconventional behavioral prompts."},
  "Jefferies": {abbr:"JEF",tech:72,behavior:72,pressure:70,style:"Typically balanced technical and fit screens with senior final-round conversations.",tags:["Technical","Fit","Senior rounds","Markets"],questionBias:["accounting","dcf","ma"],behavioral:["Why Jefferies?","Why investment banking?","Describe a recent deal you found interesting.","Tell me about a time you took ownership beyond your title."],source:"Recent interview reports describe screening followed by senior final interviews, with variation by group."},
  "Rothschild & Co": {abbr:"R&Co",tech:74,behavior:72,pressure:72,style:"Standard technical/fit core with occasional deeper corporate-finance and current-affairs discussion.",tags:["Corporate finance","Fit","Current affairs","Deal experience"],questionBias:["accounting","dcf","ma"],behavioral:["Why Rothschild & Co?","Discuss a current macro issue relevant to clients.","Walk me through your deal or project experience.","Why independent advisory?"],source:"Recent reports describe standard technical/behavioral rounds, with deeper corporate-finance, current-affairs, and deal-experience follow-ups in some offices."}
};

const state = {
  round: [],
  roundIndex: 0,
  roundScores: [],
  interview: null,
  interviewTimer: null,
  recognition: null,
  mediaStream: null,
  aiAvailable: false,
  aiModel: null
};

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function getStore(key, fallback){
  try{return JSON.parse(localStorage.getItem(key)) ?? fallback}catch{return fallback}
}
function setStore(key, value){localStorage.setItem(key, JSON.stringify(value))}
function shuffle(arr){
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}
  return a;
}
function clamp(n,min,max){return Math.max(min,Math.min(max,n))}
function normalize(s){return (s||"").toLowerCase().replace(/[^a-z0-9%$&+\-/\.\s]/g," ").replace(/\s+/g," ").trim()}

async function apiPost(endpoint, payload){
  const r=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  if(!r.ok) throw new Error((await r.json().catch(()=>({}))).error||`API ${r.status}`);
  return await r.json();
}
async function detectAI(){
  try{
    const r=await fetch('/api/health');
    if(!r.ok)return;
    const data=await r.json();
    state.aiAvailable=Boolean(data.ai);state.aiModel=data.model||null;
    const pill=document.querySelector('.status-pill');
    if(pill) pill.innerHTML=state.aiAvailable?`<span class="status-dot"></span>AI mode • ${escapeHtml(state.aiModel)}`:`<span class="status-dot"></span>Local demo mode`;
  }catch{}
}
function speakQuestion(text){
  if(!('speechSynthesis' in window))return;
  try{window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.rate=0.98;u.pitch=0.95;window.speechSynthesis.speak(u)}catch{}
}

function navigate(view){
  $$('.view').forEach(v=>v.classList.remove('active'));
  $$('.nav-item').forEach(n=>n.classList.toggle('active',n.dataset.view===view));
  $(`#${view}-view`).classList.add('active');
  const labels={dashboard:'Dashboard','question-bank':'Question Bank','mock-interview':'Mock Interview','resume-lab':'Resume Lab',research:'Bank Profiles'};
  $('#viewTitle').textContent=labels[view]||'StreetPrep AI';
  window.scrollTo({top:0,behavior:'smooth'});
}

$$('.nav-item').forEach(btn=>btn.addEventListener('click',()=>navigate(btn.dataset.view)));
$$('[data-jump]').forEach(btn=>btn.addEventListener('click',()=>navigate(btn.dataset.jump)));

function updateDashboard(){
  const history=getStore('sp_history',[]);
  const interviews=getStore('sp_interviews',[]);
  const resumeReviews=getStore('sp_resume_reviews',[]);
  const scores=[...history.map(x=>x.score),...interviews.map(x=>x.score),...resumeReviews.map(x=>x.score)].filter(Number.isFinite);
  const composite=scores.length ? (scores.reduce((a,b)=>a+b,0)/scores.length) : null;
  const display=composite?composite.toFixed(1):'—';
  $('#dashboardScore').textContent=display;
  $('#sidebarScore').textContent=display;
  $('#sidebarProgress').style.width=composite?`${composite*10}%`:'0%';
  $('#dashboardScoreCaption').textContent=composite? composite>=8?'Strong baseline. Focus on consistency and pressure-testing weak topics.':composite>=6?'Good base. Target the lowest-scoring topics and tighten delivery.':'Build reps across the core technical pillars and focus on structured answers.':'Complete a practice question to establish a baseline.';
  $('#metricQuestions').textContent=history.length;
  $('#metricInterviews').textContent=interviews.length;
  $('#metricResume').textContent=resumeReviews.length;

  const pillars=['accounting','ma','dcf','threeStatement','lbo'];
  $('#pillarGrid').innerHTML=pillars.map(topic=>{
    const vals=history.filter(x=>x.topic===topic).map(x=>x.score);
    const avg=vals.length?(vals.reduce((a,b)=>a+b,0)/vals.length).toFixed(1):'—';
    const copy={accounting:'Statements, working capital, purchase accounting',ma:'Accretion/dilution, financing, synergies',dcf:'UFCF, WACC, terminal value, valuation',threeStatement:'Schedules, circularity, cash flow linking',lbo:'Sources & uses, debt paydown, sponsor returns'}[topic];
    return `<div class="pillar-card"><div class="pillar-top"><div class="eyebrow">${TOPIC_LABELS[topic]}</div><div class="pillar-score">${avg}/10</div></div><h4>${TOPIC_LABELS[topic]}</h4><p>${copy}</p></div>`
  }).join('');

  const recent=history.slice(-5).reverse();
  $('#recentHistory').classList.toggle('empty-state',!recent.length);
  $('#recentHistory').innerHTML=recent.length?recent.map(x=>`<div class="history-item"><div class="history-topic">${TOPIC_LABELS[x.topic]}</div><div class="history-q">${x.q}</div><div class="history-score">${x.score}/10</div></div>`).join(''):'No scored questions yet.';

  const sample=shuffle(Object.entries(FIRM_PROFILES)).slice(0,4);
  $('#firmSampler').innerHTML=sample.map(([name,p])=>`<div class="firm-mini"><strong>${name}</strong><span>${p.style}</span></div>`).join('');
}

function buildRollingRound(){
  const topic=$('#qbTopic').value;
  const diff=$('#qbDifficulty').value;
  const length=Number($('#qbLength').value);
  const seen=getStore('sp_seen',[]);
  let pool=QUESTION_BANK.filter(q=>(topic==='mixed'||q.topic===topic)&&(diff==='mixed'||q.difficulty===diff));
  if(pool.length<length) pool=QUESTION_BANK.filter(q=>(topic==='mixed'||q.topic===topic));
  const unseen=shuffle(pool.filter(q=>!seen.includes(q.id)));
  const previously=shuffle(pool.filter(q=>seen.includes(q.id)));
  state.round=[...unseen,...previously].slice(0,Math.min(length,pool.length));
  state.roundIndex=0;
  state.roundScores=[];
  $('#qbEmpty').classList.add('hidden');
  $('#qbActive').classList.remove('hidden');
  $('#roundSummary').classList.add('hidden');
  renderQuestion();
}

function renderQuestion(){
  const q=state.round[state.roundIndex];
  if(!q){renderRoundSummary();return}
  $('#qCurrent').textContent=state.roundIndex+1;
  $('#qTotal').textContent=state.round.length;
  $('#qTopicBadge').textContent=TOPIC_LABELS[q.topic];
  $('#qDifficultyBadge').textContent=q.difficulty==='advanced'?'Advanced':'Core';
  $('#qProgressBar').style.width=`${(state.roundIndex/state.round.length)*100}%`;
  $('#questionText').textContent=q.q;
  $('#answerBox').value='';
  $('#answerWordCount').textContent='0 words';
  $('#feedbackBox').classList.add('hidden');
  $('#submitAnswerBtn').disabled=false;
  $('#answerBox').disabled=false;
  $('#answerBox').focus();
}

function conceptMatch(answer, concept){
  const a=normalize(answer), c=normalize(concept);
  if(a.includes(c)) return true;
  const synonymGroups=[
    ['income statement','p&l','profit and loss'],['cash flow statement','cfs','statement of cash flows'],['balance sheet','bs'],
    ['net income','ni'],['depreciation','d&a','da'],['enterprise value','ev'],['equity value','market cap','market capitalization'],
    ['working capital','nwc','net working capital'],['free cash flow','fcf'],['unlevered free cash flow','ufcf'],['weighted average cost of capital','wacc'],
    ['internal rate of return','irr'],['multiple on invested capital','moic'],['purchase price allocation','ppa'],['accounts receivable','a/r','ar'],['accounts payable','a/p','ap'],
    ['capital expenditures','capex','capital expenditure'],['earnings per share','eps'],['cost of goods sold','cogs'],['property plant and equipment','pp&e','ppe']
  ];
  const group=synonymGroups.find(g=>g.includes(c));
  return group?group.some(s=>a.includes(s)):false;
}

function gradeTechnical(q, answer){
  const clean=normalize(answer);
  const words=clean.split(' ').filter(Boolean);
  const covered=q.key.filter(k=>conceptMatch(clean,k));
  const uniqueCoverage=new Set(covered.map(x=>x.toLowerCase())).size;
  const coverage=uniqueCoverage/Math.max(1,q.key.length);
  let score=2 + coverage*7;
  if(words.length>=45) score+=0.5;
  if(words.length>=90) score+=0.3;
  if(words.length<15) score-=1.2;
  if(/i don't know|idk|not sure/.test(clean)) score-=1;
  score=Math.round(clamp(score,1,10));
  const missing=q.key.filter(k=>!conceptMatch(clean,k)).slice(0,6);
  return {
    score,
    covered: covered.slice(0,6),
    missing,
    headline: score>=9?'Interview-ready answer':score>=7?'Strong, with a few gaps':score>=5?'Good base, tighten the mechanics':score>=3?'Partial understanding':'Rebuild this concept before moving on'
  };
}

async function submitQuestion(){
  const q=state.round[state.roundIndex];
  const answer=$('#answerBox').value.trim();
  if(!answer){$('#answerBox').focus();return}
  $('#submitAnswerBtn').disabled=true;
  let result=gradeTechnical(q,answer);
  if(state.aiAvailable){
    try{
      const ai=await apiPost('/api/grade',{question:q.q,topic:q.topic,difficulty:q.difficulty,referenceAnswer:q.ideal,keyPoints:q.key,userAnswer:answer});
      result={score:Number(ai.score)||result.score,headline:ai.headline||result.headline,covered:ai.covered||result.covered,missing:[...(ai.missing||[]),...(ai.incorrect||[]).map(x=>`Incorrect: ${x}`)].slice(0,7),better_answer:ai.better_answer||q.ideal};
    }catch(e){console.warn('AI grading unavailable, using local rubric',e)}
  }
  state.roundScores.push(result.score);
  $('#feedbackScore').textContent=result.score;
  $('#feedbackHeadline').textContent=result.headline;
  $('#coveredList').innerHTML=(result.covered.length?result.covered:['You attempted the question and provided a structured response.']).map(x=>`<li>${escapeHtml(titleCase(x))}</li>`).join('');
  $('#missingList').innerHTML=(result.missing.length?result.missing:['No major rubric concepts missing. Focus on concise delivery.']).map(x=>`<li>${escapeHtml(titleCase(x))}</li>`).join('');
  $('#idealAnswerText').textContent=result.better_answer||q.ideal;
  $('#feedbackBox').classList.remove('hidden');
  $('#submitAnswerBtn').disabled=true;
  $('#answerBox').disabled=true;
  const history=getStore('sp_history',[]);
  history.push({id:q.id,topic:q.topic,q:q.q,score:result.score,answer,ts:Date.now()});
  setStore('sp_history',history.slice(-300));
  const seen=getStore('sp_seen',[]).filter(id=>id!==q.id);
  seen.push(q.id);
  setStore('sp_seen',seen.slice(-Math.max(40,QUESTION_BANK.length-8)));
  updateDashboard();
}

function nextQuestion(){state.roundIndex++;renderQuestion()}

function renderRoundSummary(){
  $('#questionText').textContent='Round complete';
  $('#answerBox').classList.add('hidden');
  $('#submitAnswerBtn').classList.add('hidden');
  $('#answerWordCount').classList.add('hidden');
  $('#feedbackBox').classList.add('hidden');
  $('#qProgressBar').style.width='100%';
  const avg=state.roundScores.length?state.roundScores.reduce((a,b)=>a+b,0)/state.roundScores.length:0;
  const hi=state.roundScores.length?Math.max(...state.roundScores):0, lo=state.roundScores.length?Math.min(...state.roundScores):0;
  $('#roundSummary').innerHTML=`<div class="eyebrow">Round summary</div><div class="summary-score">${avg.toFixed(1)}<small>/10</small></div><p class="muted">${avg>=8?'Strong technical round. Move into harder mixed questions and firm-specific pressure testing.':avg>=6?'You have the foundation. Revisit the lowest-scoring mechanics before adding speed.':'Slow down and rebuild the core concepts from model answers, then retake a fresh round.'}</p><div class="summary-breakdown"><div><span>${state.roundScores.length}</span><small>Answered</small></div><div><span>${hi}</span><small>Best score</small></div><div><span>${lo}</span><small>Lowest score</small></div></div><button class="primary-btn" style="margin-top:18px" onclick="resetQuestionUI()">Build another round</button>`;
  $('#roundSummary').classList.remove('hidden');
}

window.resetQuestionUI=function(){
  $('#qbEmpty').classList.remove('hidden');$('#qbActive').classList.add('hidden');
  $('#answerBox').classList.remove('hidden');$('#submitAnswerBtn').classList.remove('hidden');$('#answerWordCount').classList.remove('hidden');
};

$('#startRoundBtn').addEventListener('click',buildRollingRound);
$('#submitAnswerBtn').addEventListener('click',submitQuestion);
$('#nextQuestionBtn').addEventListener('click',nextQuestion);
$('#answerBox').addEventListener('input',e=>{$('#answerWordCount').textContent=`${e.target.value.trim()?e.target.value.trim().split(/\s+/).length:0} words`});

function populateFirmSelect(){
  $('#firmSelect').innerHTML=Object.keys(FIRM_PROFILES).map(name=>`<option>${name}</option>`).join('');
  $('#firmSelect').value='Goldman Sachs';
  renderFirmPreview();
}
function renderFirmPreview(){
  const name=$('#firmSelect').value, p=FIRM_PROFILES[name];
  $('#selectedFirmProfile').innerHTML=`<div class="profile-header"><div><div class="eyebrow">Current calibration</div><h4>${name}</h4></div><div class="tag">${p.pressure>=85?'High pressure':'Balanced pressure'}</div></div><p class="muted" style="font-size:12px;line-height:1.55">${p.style}</p><div class="weight-row"><span>Technical</span><div class="weight-bar"><div style="width:${p.tech}%"></div></div><strong>${p.tech}</strong></div><div class="weight-row"><span>Behavioral</span><div class="weight-bar"><div style="width:${p.behavior}%"></div></div><strong>${p.behavior}</strong></div><div class="weight-row"><span>Pressure</span><div class="weight-bar"><div style="width:${p.pressure}%"></div></div><strong>${p.pressure}</strong></div><div class="profile-tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div>`;
}
$('#firmSelect').addEventListener('change',renderFirmPreview);

function createInterviewQuestions(firm,type,stage,minutes){
  const p=FIRM_PROFILES[firm];
  const count=Math.max(4,Math.round(minutes/3.5));
  const behavioral=shuffle([
    ...p.behavioral,
    'Why investment banking?',
    'Walk me through your resume in about 90 seconds.',
    'Tell me about a time you made a mistake and how you handled it.',
    'Tell me about a time you had multiple deadlines at once.',
    'What is one recent transaction or market development you have been following?',
    'What do you think makes a strong first-year analyst?'
  ]);
  let techPool=QUESTION_BANK.filter(q=>p.questionBias.includes(q.topic));
  if(stage==='superday') techPool=techPool.filter(q=>q.difficulty==='advanced').concat(techPool.filter(q=>q.difficulty==='core'));
  techPool=shuffle(techPool);
  let list=[];
  if(type==='technical') list=techPool.slice(0,count).map(q=>({kind:'technical',text:q.q,ref:q}));
  else if(type==='behavioral') list=behavioral.slice(0,count).map(text=>({kind:'behavioral',text}));
  else{
    const bCount=Math.max(2,Math.round(count*(p.behavior/(p.behavior+p.tech))));
    const tCount=Math.max(2,count-bCount);
    list=[...behavioral.slice(0,bCount).map(text=>({kind:'behavioral',text})),...techPool.slice(0,tCount).map(q=>({kind:'technical',text:q.q,ref:q}))];
    list=shuffle(list);
  }
  if(stage==='hirevue') list=[{kind:'behavioral',text:'Tell me about yourself and why you are interested in this firm.'},...list].slice(0,Math.max(3,count));
  return list;
}

function startInterview(){
  const firm=$('#firmSelect').value,type=$('#interviewType').value,minutes=Number($('#interviewLength').value),stage=$('#interviewStage').value;
  const questions=createInterviewQuestions(firm,type,stage,minutes);
  state.interview={firm,type,minutes,stage,questions,index:0,answers:[],started:Date.now(),remaining:minutes*60};
  $('#interviewSetup').classList.add('hidden');$('#interviewResults').classList.add('hidden');$('#interviewRoom').classList.remove('hidden');
  $('#interviewerFirm').textContent=firm;$('#interviewerName').textContent=`${FIRM_PROFILES[firm].abbr} Interviewer`;
  $('#interviewerAvatar .avatar-face').textContent=FIRM_PROFILES[firm].abbr;
  $('#liveTranscript').value='';
  renderInterviewQuestion();
  startTimer();
  configureSpeechSupport();
}
function renderInterviewQuestion(){
  const item=state.interview.questions[state.interview.index];
  if(!item){endInterview();return}
  $('#interviewQuestion').textContent=item.text;
  $('#liveTranscript').value='';
  speakQuestion(item.text);
  $('#liveTranscript').focus();
}
function startTimer(){
  clearInterval(state.interviewTimer);
  state.interviewTimer=setInterval(()=>{
    if(!state.interview)return;
    state.interview.remaining--;
    const m=Math.max(0,Math.floor(state.interview.remaining/60)),s=Math.max(0,state.interview.remaining%60);
    $('#interviewTimer').textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    if(state.interview.remaining<=0)endInterview();
  },1000);
}
function gradeBehavioral(answer){
  const a=normalize(answer), words=a.split(' ').filter(Boolean).length;
  let score=4;
  const signs={situation:/situation|context|when i|during|at my/,task:/responsib|goal|needed to|task|objective/,action:/i decided|i did|i built|i led|i analyzed|i created|i spoke|i changed|i worked/,result:/result|outcome|increased|decreased|improved|saved|won|completed|learned/};
  const covered=Object.entries(signs).filter(([,r])=>r.test(a)).map(([k])=>k);
  score+=covered.length*.9;
  if(words>=70&&words<=220)score+=1;
  if(words>300)score-=1;
  if(words<25)score-=1.5;
  return {score:Math.round(clamp(score,1,10)),covered,missing:['situation','task','action','result'].filter(x=>!covered.includes(x))};
}
async function submitInterviewAnswer(){
  const item=state.interview.questions[state.interview.index], answer=$('#liveTranscript').value.trim();
  if(!answer)return;
  $('#answerInterviewBtn').disabled=true;
  let result=item.kind==='technical'?gradeTechnical(item.ref||{key:[],ideal:'',q:item.text},answer):gradeBehavioral(answer);
  if(state.aiAvailable && item.kind==='technical'){
    try{
      const ai=await apiPost('/api/grade',{question:item.text,topic:item.ref?.topic||'investment banking',difficulty:item.ref?.difficulty||'mixed',referenceAnswer:item.ref?.ideal||'',keyPoints:item.ref?.key||[],userAnswer:answer});
      result={...result,score:Number(ai.score)||result.score,covered:ai.covered||result.covered,missing:ai.missing||result.missing,headline:ai.headline||result.headline};
    }catch(e){console.warn(e)}
  }
  state.interview.answers.push({item,answer,score:result.score,detail:result});
  const nextIndex=state.interview.index+1;
  if(state.aiAvailable && nextIndex<state.interview.questions.length){
    try{
      const p=FIRM_PROFILES[state.interview.firm];
      const ai=await apiPost('/api/interview-next',{
        firm:state.interview.firm,type:state.interview.type,stage:state.interview.stage,
        candidateLevel:$('#candidateLevel').value,coverageFocus:$('#coverageFocus').value,profileStyle:p.style,
        remaining:state.interview.questions.length-nextIndex,
        turns:state.interview.answers.map(x=>({question:x.item.text,answer:x.answer,score:x.score}))
      });
      if(ai.next_question) state.interview.questions[nextIndex]={kind:ai.kind==='behavioral'?'behavioral':'technical',text:ai.next_question};
    }catch(e){console.warn('Adaptive follow-up unavailable',e)}
  }
  state.interview.index++;
  $('#answerInterviewBtn').disabled=false;
  renderInterviewQuestion();
}
async function enableMedia(){
  try{
    state.mediaStream=await navigator.mediaDevices.getUserMedia({video:true,audio:true});
    $('#userVideo').srcObject=state.mediaStream;$('#videoFallback').classList.add('hidden');$('#mediaStatus').textContent='Camera + mic on';
  }catch(e){$('#mediaStatus').textContent='Permission denied';$('#speechSupportNote').textContent='Camera/mic access was blocked. You can still complete the mock by typing answers.'}
}
function configureSpeechSupport(){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){$('#speechSupportNote').textContent='Live browser transcription is not supported here. Type answers manually; camera/mic preview can still work.';return}
  $('#speechSupportNote').textContent='Speech capture available. Browser transcription quality varies and is not used as a proxy for technical correctness.';
}
function toggleSpeech(){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR)return;
  if(state.recognition){state.recognition.stop();state.recognition=null;$('#micBtn').textContent='Start speech capture';return}
  const rec=new SR();rec.continuous=true;rec.interimResults=true;rec.lang='en-US';
  let finalText=$('#liveTranscript').value;
  rec.onresult=e=>{let interim='';for(let i=e.resultIndex;i<e.results.length;i++){const t=e.results[i][0].transcript;if(e.results[i].isFinal)finalText+=' '+t;else interim+=t}$('#liveTranscript').value=(finalText+' '+interim).trim()};
  rec.onend=()=>{state.recognition=null;$('#micBtn').textContent='Start speech capture'};
  rec.start();state.recognition=rec;$('#micBtn').textContent='Stop speech capture';
}
function endInterview(){
  if(!state.interview)return;
  clearInterval(state.interviewTimer);
  if(state.recognition){try{state.recognition.stop()}catch{}state.recognition=null}
  if(state.mediaStream){state.mediaStream.getTracks().forEach(t=>t.stop());state.mediaStream=null}
  const answers=state.interview.answers;
  const avg=answers.length?answers.reduce((s,a)=>s+a.score,0)/answers.length:0;
  const technical=answers.filter(a=>a.item.kind==='technical'),behavioral=answers.filter(a=>a.item.kind==='behavioral');
  const tAvg=technical.length?technical.reduce((s,a)=>s+a.score,0)/technical.length:null;
  const bAvg=behavioral.length?behavioral.reduce((s,a)=>s+a.score,0)/behavioral.length:null;
  const allText=answers.map(a=>normalize(a.answer)).join(' ');
  const filler=(allText.match(/\b(um|uh|like|basically|literally|you know)\b/g)||[]).length;
  const totalWords=answers.reduce((s,a)=>s+a.answer.split(/\s+/).filter(Boolean).length,0);
  let improvements=[];
  if(tAvg!==null&&tAvg<7)improvements.push('Rebuild the lowest-scoring technical mechanics and answer in a clear formula → intuition → implication structure.');
  if(bAvg!==null&&bAvg<7)improvements.push('Make behavioral stories more explicitly STAR: context, your responsibility, specific actions, quantified result.');
  if(filler>Math.max(4,answers.length*2))improvements.push('Reduce filler words. Pause silently for a beat instead of filling space.');
  if(totalWords/Math.max(1,answers.length)>230)improvements.push('Shorten answers. Lead with the conclusion, then give the mechanics or example.');
  if(!improvements.length)improvements.push('Increase pressure by selecting a tougher firm profile, advanced stage, or a longer hybrid round.');
  const interviewRecord={firm:state.interview.firm,score:Number(avg.toFixed(1)),technical:tAvg,behavioral:bAvg,ts:Date.now()};
  const saved=getStore('sp_interviews',[]);saved.push(interviewRecord);setStore('sp_interviews',saved.slice(-100));
  $('#interviewRoom').classList.add('hidden');
  $('#interviewResults').innerHTML=`<div class="resume-score-header"><div><div class="eyebrow">Mock interview complete</div><h2>${state.interview.firm}</h2><p class="muted">${answers.length} answered questions • ${state.interview.stage} • ${state.interview.type}</p></div><div class="resume-score">${avg.toFixed(1)}<small>/10</small></div></div><div class="summary-breakdown"><div><span>${tAvg===null?'—':tAvg.toFixed(1)}</span><small>Technical</small></div><div><span>${bAvg===null?'—':bAvg.toFixed(1)}</span><small>Behavioral</small></div><div><span>${filler}</span><small>Filler words</small></div></div><div class="resume-section"><h4>Areas to improve</h4>${improvements.map(x=>`<div class="bullet-suggestion">${escapeHtml(x)}</div>`).join('')}</div><div class="resume-section"><h4>Question-by-question</h4>${answers.map((a,i)=>`<div class="history-item"><div class="history-topic">${a.item.kind}</div><div class="history-q">${escapeHtml(a.item.text)}</div><div class="history-score">${a.score}/10</div></div>`).join('')}</div><button class="primary-btn" style="margin-top:18px" id="newMockBtn">Run another mock</button>`;
  $('#interviewResults').classList.remove('hidden');
  $('#newMockBtn').addEventListener('click',()=>{$('#interviewResults').classList.add('hidden');$('#interviewSetup').classList.remove('hidden')});
  state.interview=null;updateDashboard();
}

$('#startInterviewBtn').addEventListener('click',startInterview);
$('#answerInterviewBtn').addEventListener('click',submitInterviewAnswer);
$('#endInterviewBtn').addEventListener('click',endInterview);
$('#cameraBtn').addEventListener('click',enableMedia);
$('#micBtn').addEventListener('click',toggleSpeech);

async function extractPdfText(file){
  try{
    const pdfjs=window.pdfjsLib;
    if(!pdfjs) throw new Error('PDF.js not ready');
    const data=await file.arrayBuffer();
    const pdf=await pdfjs.getDocument({data}).promise;
    let text='';
    for(let i=1;i<=pdf.numPages;i++){
      const page=await pdf.getPage(i), content=await page.getTextContent();
      text+=content.items.map(x=>x.str).join(' ')+'\n';
    }
    return text;
  }catch(err){throw err}
}

$('#resumeFile').addEventListener('change',async e=>{
  const f=e.target.files?.[0];if(!f)return;
  $('#fileStatus').textContent=`Selected: ${f.name}`;
  if(f.type==='text/plain'||f.name.toLowerCase().endsWith('.txt')){
    $('#resumeText').value=await f.text();$('#fileStatus').textContent=`Loaded ${f.name}`;return;
  }
  if(f.type==='application/pdf'||f.name.toLowerCase().endsWith('.pdf')){
    $('#fileStatus').textContent=`Reading ${f.name}…`;
    try{
      // PDF.js loaded as module may not populate global; use dynamic import fallback.
      let pdfjs=window.pdfjsLib;
      if(!pdfjs){pdfjs=await import('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs');window.pdfjsLib=pdfjs}
      const data=await f.arrayBuffer();const pdf=await pdfjs.getDocument({data}).promise;let text='';
      for(let i=1;i<=pdf.numPages;i++){const page=await pdf.getPage(i);const content=await page.getTextContent();text+=content.items.map(x=>x.str).join(' ')+'\n'}
      $('#resumeText').value=text.trim();$('#fileStatus').textContent=`Extracted text from ${f.name}`;
    }catch{$('#fileStatus').textContent='Could not extract this PDF in-browser. Paste the resume text below.'}
  }
});

function analyzeResumeLocal(){
  const text=$('#resumeText').value.trim();if(!text){$('#resumeText').focus();return}
  const status=$('#studentStatus').value,target=$('#resumeTarget').value,a=normalize(text);
  const lines=text.split(/\n+/).map(x=>x.trim()).filter(Boolean);
  const wordCount=text.split(/\s+/).filter(Boolean).length;
  const checks=[
    {name:'Education',pass:/education|university|college|bachelor|mba|master/.test(a),why:'IB resumes need a clearly readable academic section.'},
    {name:'Finance / analytical experience',pass:/financial|finance|valuation|dcf|model|analysis|investment|accounting|forecast|transaction/.test(a),why:'Recruiters need evidence of analytical exposure, not just stated interest.'},
    {name:'Quantified impact',pass:/\b\d+(\.\d+)?%|\$\s?\d|\b\d{2,}\+?\b/.test(text),why:'Strong bullets show scale, output, or measurable impact.'},
    {name:'Excel / modeling signal',pass:/excel|financial modeling|3.?statement|lbo|dcf|comps|valuation/.test(a),why:'Technical evidence helps de-risk analyst readiness.'},
    {name:'Leadership / ownership',pass:/president|captain|founder|led |leadership|treasurer|managed|coordinated|organized/.test(a),why:'Analyst hiring still tests ownership and teamwork heavily.'},
    {name:'Banking motivation evidence',pass:/investment banking|m&a|merger|acquisition|transaction|deal|capital markets/.test(a),why:'Projects and experiences should make the banking story credible.'}
  ];
  let score=4+checks.filter(c=>c.pass).length*.75;
  if(wordCount>250&&wordCount<850)score+=.5;
  if(status==='Freshman'||status==='Sophomore')score+=.3;
  score=clamp(Math.round(score*10)/10,1,10);

  const gaps=checks.filter(c=>!c.pass);
  const projects=[];
  if(!/dcf/.test(a))projects.push({title:'Public-company DCF + valuation deck',desc:'Choose a public company, build a revenue-to-UFCF forecast, WACC, terminal-value sensitivities, and triangulate against trading comps.',deliverable:'Deliverable: clean Excel model + 5-slide investment-banking style valuation deck.'});
  if(!/m&a|merger|acquisition|accretion|dilution/.test(a))projects.push({title:'M&A accretion / dilution case',desc:'Pick a plausible buyer and target, build purchase price assumptions, financing mix, synergies, purchase accounting, and pro forma EPS impact.',deliverable:'Deliverable: 1 merger model + 4-slide transaction rationale / accretion-dilution summary.'});
  if(!/lbo/.test(a))projects.push({title:'Paper-to-full LBO project',desc:'Build a simple sponsor model with sources & uses, operating projections, debt schedule, cash sweep, and exit return sensitivities.',deliverable:'Deliverable: Excel LBO + one-page IC-style returns summary.'});
  if(!/powerpoint|presentation|deck|pitch/.test(a))projects.push({title:'Banker-style PowerPoint exercise',desc:'Create a concise company overview, industry landscape, valuation football field, and strategic alternatives page using consistent formatting.',deliverable:'Deliverable: 6–8 slide PDF deck with source footnotes.'});

  const bulletSuggestions=[];
  if(!checks.find(c=>c.name==='Quantified impact').pass)bulletSuggestions.push('Rewrite experience bullets as: action + analytical task + scale + output/impact. Example structure: “Built a DCF across X scenarios to evaluate $Y of potential value and presented findings to Z.”');
  if(!/transaction|deal|valuation|model/.test(a))bulletSuggestions.push('Add at least one project or experience bullet that proves you can work with valuation, transactions, or financial models rather than only listing coursework.');
  if(!/excel/.test(a))bulletSuggestions.push('If accurate, explicitly surface Excel/modeling capability in Skills and prove it in an experience or project bullet.');
  if(lines.some(l=>l.length>220))bulletSuggestions.push('Some resume lines look dense. Keep bullets concise enough to scan quickly and avoid paragraph-style entries.');
  if(!bulletSuggestions.length)bulletSuggestions.push('Your resume already shows several core IB signals. The next improvement should be specificity: make each bullet prove complexity, ownership, and measurable output rather than adding more generic finance keywords.');

  const levelAdvice={
    Freshman:'Prioritize grades, finance-club involvement, one tangible valuation project, and early networking. You do not need a prior banking internship yet.',
    Sophomore:'Build enough technical and project evidence to be credible for early insight / sophomore programs and begin consistent alumni networking.',
    Junior:'Your resume should look interview-ready now: strong analytical internship/project evidence, clean technical signals, and a coherent “why IB” story.',
    Senior:'Position transferable analytical experience aggressively and show why banking now. Off-cycle, boutique, and lateral-style opportunities may matter more than traditional campus timing.',
    Graduated:'Treat the resume like a lateral candidate: emphasize immediately transferable modeling, transaction, valuation, and execution skills; projects help only if they are polished and genuinely additive.',
    "Master's":'Use the graduate degree to strengthen technical depth and reset recruiting access, but make sure the resume still shows practical transaction/modeling evidence.',
    MBA:'Focus on pre-MBA accomplishments, leadership, transaction judgment, and associate-track readiness rather than only technical coursework.'
  }[status]||'';

  $('#resumeEmpty').classList.add('hidden');$('#resumeResults').classList.remove('hidden');
  $('#resumeResults').innerHTML=`<div class="resume-score-header"><div><div class="eyebrow">IB recruiting readiness</div><h2>${escapeHtml(target)}</h2><p class="muted">${escapeHtml(status)} • ${wordCount} words detected</p></div><div class="resume-score">${score.toFixed(1)}<small>/10</small></div></div><div class="resume-section"><h4>Stage-specific guidance</h4><div class="bullet-suggestion">${escapeHtml(levelAdvice)}</div></div><div class="resume-section"><h4>Core signals</h4><div class="resume-checks">${checks.map(c=>`<div class="check-card"><strong>${c.pass?'✓':'△'} ${escapeHtml(c.name)}</strong><span>${escapeHtml(c.why)}</span></div>`).join('')}</div></div><div class="resume-section"><h4>Highest-value improvements</h4><div class="bullet-list">${bulletSuggestions.map(x=>`<div class="bullet-suggestion">${escapeHtml(x)}</div>`).join('')}</div></div><div class="resume-section"><h4>Projects that would add real evidence</h4>${projects.slice(0,4).map(p=>`<div class="project-card"><h5>${escapeHtml(p.title)}</h5><p>${escapeHtml(p.desc)}</p><div class="deliverable">${escapeHtml(p.deliverable)}</div></div>`).join('')||'<div class="bullet-suggestion">You already mention several technical projects. Prioritize making them polished, differentiated, and interviewable rather than adding another generic project.</div>'}</div><div class="tiny-note">This MVP analyzes extracted text and recruiting signals. Production mode should use an AI evaluator to critique each bullet in context and avoid keyword-only judgments.</div>`;
  const recs=getStore('sp_resume_reviews',[]);recs.push({score,ts:Date.now(),status,target});setStore('sp_resume_reviews',recs.slice(-50));updateDashboard();
}
async function analyzeResume(){
  const text=$('#resumeText').value.trim();if(!text){$('#resumeText').focus();return}
  if(!state.aiAvailable){analyzeResumeLocal();return}
  const btn=$('#analyzeResumeBtn');const old=btn.textContent;btn.disabled=true;btn.textContent='Analyzing…';
  try{
    const status=$('#studentStatus').value,target=$('#resumeTarget').value;
    const ai=await apiPost('/api/resume',{text,status,target});
    const score=Number(ai.score)||5;
    $('#resumeEmpty').classList.add('hidden');$('#resumeResults').classList.remove('hidden');
    $('#resumeResults').innerHTML=`<div class="resume-score-header"><div><div class="eyebrow">AI recruiting review</div><h2>${escapeHtml(target)}</h2><p class="muted">${escapeHtml(status)}</p></div><div class="resume-score">${score.toFixed(1)}<small>/10</small></div></div><div class="resume-section"><h4>Assessment</h4><div class="bullet-suggestion">${escapeHtml(ai.summary||'')}</div></div><div class="resume-section"><h4>Stage-specific guidance</h4><div class="bullet-suggestion">${escapeHtml(ai.stage_guidance||'')}</div></div><div class="resume-section"><h4>Strengths</h4><div class="bullet-list">${(ai.strengths||[]).map(x=>`<div class="bullet-suggestion">${escapeHtml(x)}</div>`).join('')}</div></div><div class="resume-section"><h4>Highest-value gaps</h4><div class="bullet-list">${(ai.gaps||[]).map(x=>`<div class="bullet-suggestion">${escapeHtml(x)}</div>`).join('')}</div></div><div class="resume-section"><h4>Bullet improvements</h4><div class="bullet-list">${(ai.bullet_improvements||[]).map(x=>`<div class="bullet-suggestion">${escapeHtml(x)}</div>`).join('')}</div></div><div class="resume-section"><h4>Projects that would add real evidence</h4>${(ai.projects||[]).slice(0,4).map(p=>`<div class="project-card"><h5>${escapeHtml(p.title)}</h5><p>${escapeHtml(p.description)}</p><div class="deliverable">${escapeHtml(p.deliverable)}</div></div>`).join('')}</div>`;
    const recs=getStore('sp_resume_reviews',[]);recs.push({score,ts:Date.now(),status,target});setStore('sp_resume_reviews',recs.slice(-50));updateDashboard();
  }catch(e){console.warn('AI resume analysis unavailable, using local fallback',e);analyzeResumeLocal()}
  finally{btn.disabled=false;btn.textContent=old}
}
$('#analyzeResumeBtn').addEventListener('click',analyzeResume);

function renderBankGrid(){
  $('#bankGrid').innerHTML=Object.entries(FIRM_PROFILES).map(([name,p])=>`<div class="bank-card"><div class="eyebrow">${p.abbr}</div><h3>${name}</h3><p>${p.style}</p><div class="weight-row"><span>Technical</span><div class="weight-bar"><div style="width:${p.tech}%"></div></div><strong>${p.tech}</strong></div><div class="weight-row"><span>Behavioral</span><div class="weight-bar"><div style="width:${p.behavior}%"></div></div><strong>${p.behavior}</strong></div><div class="bank-meta">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div><p style="margin-top:12px"><strong style="color:#b9c8d5">Research basis:</strong> ${p.source}</p></div>`).join('');
}

function escapeHtml(str){return String(str??'').replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]))}
function titleCase(str){return String(str).replace(/\b\w/g,c=>c.toUpperCase())}

$('#resetDataBtn').addEventListener('click',()=>{
  if(confirm('Clear practice history, seen-question history, interview scores, and resume reviews stored in this browser?')){
    ['sp_history','sp_seen','sp_interviews','sp_resume_reviews'].forEach(k=>localStorage.removeItem(k));updateDashboard();
  }
});

populateFirmSelect();renderBankGrid();updateDashboard();detectAI();
