// ══════════════════════════════════════════════════════════════════
// COMPANY CONFIG & FINANCIAL DATA
// ══════════════════════════════════════════════════════════════════

export const COMPANY = {
  name: "NovaTech Solutions",
  type: "B2B SaaS",
  fiscalYear: "FY 2026",
  currency: "USD",
};

export const MONTHLY_DATA = [
  { month: "Oct", revenue: 2850000, cogs: 570000, opex: 1990000, arr: 34200000, customers: 312, churn: 2.1, nrr: 112, cac: 42000, ltv: 168000, headcount: 178, cash: 18500000, runway: 24 },
  { month: "Nov", revenue: 3020000, cogs: 604000, opex: 2050000, arr: 36240000, customers: 328, churn: 1.9, nrr: 115, cac: 39000, ltv: 175000, headcount: 185, cash: 18900000, runway: 25 },
  { month: "Dec", revenue: 3180000, cogs: 636000, opex: 2120000, arr: 38160000, customers: 341, churn: 1.8, nrr: 118, cac: 37000, ltv: 182000, headcount: 190, cash: 19400000, runway: 26 },
  { month: "Jan", revenue: 3340000, cogs: 668000, opex: 2200000, arr: 40080000, customers: 356, churn: 2.3, nrr: 110, cac: 44000, ltv: 170000, headcount: 196, cash: 19100000, runway: 24 },
  { month: "Feb", revenue: 3510000, cogs: 702000, opex: 2280000, arr: 42120000, customers: 372, churn: 1.7, nrr: 119, cac: 35000, ltv: 189000, headcount: 203, cash: 19600000, runway: 26 },
  { month: "Mar", revenue: 3690000, cogs: 738000, opex: 2350000, arr: 44280000, customers: 389, churn: 1.5, nrr: 122, cac: 33000, ltv: 195000, headcount: 210, cash: 20200000, runway: 28 },
];

export const BUDGET_VS_ACTUAL = [
  { category: "Revenue", budget: 3500000, actual: 3690000, variance: 5.4 },
  { category: "COGS", budget: 770000, actual: 738000, variance: -4.2 },
  { category: "Gross Profit", budget: 2730000, actual: 2952000, variance: 8.1 },
  { category: "S&M", budget: 1100000, actual: 1080000, variance: -1.8 },
  { category: "R&D", budget: 850000, actual: 890000, variance: 4.7 },
  { category: "G&A", budget: 400000, actual: 380000, variance: -5.0 },
  { category: "EBITDA", budget: 380000, actual: 602000, variance: 58.4 },
];

export const EXPENSE_BREAKDOWN = [
  { name: "Sales & Marketing", value: 1080000, color: "#6366F1" },
  { name: "R&D / Engineering", value: 890000, color: "#A855F7" },
  { name: "G&A", value: 380000, color: "#EC4899" },
  { name: "COGS", value: 738000, color: "#F59E0B" },
];

export const RECENT_TRANSACTIONS = [
  { id: 1, desc: "AWS Infrastructure — March", amount: -284000, category: "COGS", date: "Mar 12", status: "paid" },
  { id: 2, desc: "Enterprise License — Acme Corp", amount: 156000, category: "Revenue", date: "Mar 11", status: "received" },
  { id: 3, desc: "Q1 Marketing Campaign — Google Ads", amount: -92000, category: "S&M", date: "Mar 10", status: "paid" },
  { id: 4, desc: "Annual Contract — TechFlow Inc", amount: 288000, category: "Revenue", date: "Mar 9", status: "received" },
  { id: 5, desc: "Payroll — Engineering (March)", amount: -612000, category: "R&D", date: "Mar 8", status: "paid" },
  { id: 6, desc: "Office Lease — HQ", amount: -48000, category: "G&A", date: "Mar 7", status: "paid" },
  { id: 7, desc: "Consulting — Deloitte Advisory", amount: -85000, category: "G&A", date: "Mar 6", status: "pending" },
  { id: 8, desc: "Expansion Deal — GlobalRetail", amount: 72000, category: "Revenue", date: "Mar 5", status: "received" },
];

export const CASHFLOW_FORECAST = [
  { month: "Apr", inflow: 3800000, outflow: 3100000, net: 700000 },
  { month: "May", inflow: 3950000, outflow: 3200000, net: 750000 },
  { month: "Jun", inflow: 4100000, outflow: 3350000, net: 750000 },
  { month: "Jul", inflow: 4000000, outflow: 3400000, net: 600000 },
  { month: "Aug", inflow: 4300000, outflow: 3500000, net: 800000 },
  { month: "Sep", inflow: 4500000, outflow: 3600000, net: 900000 },
];

// ── HELPERS ───────────────────────────────────────────────────────

export const fmt = (n) => {
  if (Math.abs(n) >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (Math.abs(n) >= 1000) return `$${(n / 1000).toFixed(0)}K`;
  return `$${n.toLocaleString()}`;
};

export const latest = MONTHLY_DATA[MONTHLY_DATA.length - 1];
export const prev = MONTHLY_DATA[MONTHLY_DATA.length - 2];
export const delta = (a, b) => ((a - b) / b * 100).toFixed(1);

// ── AI CONTEXT BUILDER ────────────────────────────────────────────

export const buildFinancialContext = () => `
You are the AI FP&A Assistant for ${COMPANY.name}, a ${COMPANY.type} company in ${COMPANY.fiscalYear}.

CURRENT FINANCIALS (March — latest month):
- Monthly Revenue: $${(latest.revenue/1e6).toFixed(2)}M (${delta(latest.revenue, prev.revenue)}% MoM)
- ARR: $${(latest.arr/1e6).toFixed(1)}M
- COGS: $${(latest.cogs/1e6).toFixed(2)}M
- Gross Margin: ${((1 - latest.cogs/latest.revenue)*100).toFixed(1)}%
- Total OpEx: $${(latest.opex/1e6).toFixed(2)}M
- EBITDA: $${((latest.revenue - latest.cogs - latest.opex)/1e6).toFixed(2)}M
- Customers: ${latest.customers}
- Monthly Churn: ${latest.churn}%
- Net Revenue Retention: ${latest.nrr}%
- CAC: $${(latest.cac/1e3).toFixed(0)}K | LTV: $${(latest.ltv/1e3).toFixed(0)}K | LTV/CAC: ${(latest.ltv/latest.cac).toFixed(1)}x
- Headcount: ${latest.headcount}
- Cash: $${(latest.cash/1e6).toFixed(1)}M | Runway: ${latest.runway} months

BUDGET VS ACTUAL (March):
${BUDGET_VS_ACTUAL.map(b => `- ${b.category}: Budget $${(b.budget/1e6).toFixed(2)}M vs Actual $${(b.actual/1e6).toFixed(2)}M (${b.variance > 0 ? '+' : ''}${b.variance}%)`).join('\n')}

EXPENSE BREAKDOWN: S&M $1.08M, R&D $890K, G&A $380K, COGS $738K

6-MONTH TREND (Oct→Mar): Revenue grew from $2.85M to $3.69M. ARR from $34.2M to $44.3M. Customers from 312 to 389. Churn improved from 2.1% to 1.5%. CAC decreased from $42K to $33K.

CASH FLOW FORECAST (Apr–Sep): Net cash positive every month, ranging $600K–$900K/mo. Total projected inflow $24.65M, outflow $20.15M.

Respond as a sharp, experienced CFO. Be specific with numbers. Keep answers concise but insightful. If asked about trends, reference the actual data. If asked for recommendations, ground them in the financials. Use bullet points sparingly. Sound like you're briefing the board — confident, direct, no fluff.
`;
