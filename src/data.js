// ══════════════════════════════════════════════════════════════════
// DATA LAYER — Google Sheets integration + per-month switching
// ══════════════════════════════════════════════════════════════════

export const COMPANY = { name: "NovaTech Solutions", type: "B2B SaaS", fiscalYear: "FY 2026", currency: "USD" };

export const MONTHS = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
export const MONTH_LABELS = { Oct: "October 2025", Nov: "November 2025", Dec: "December 2025", Jan: "January 2026", Feb: "February 2026", Mar: "March 2026" };

export const DEFAULT_MONTHLY_DATA = [
  { month: "Oct", revenue: 2850000, cogs: 570000, opex: 1990000, arr: 34200000, customers: 312, churn: 2.1, nrr: 112, cac: 42000, ltv: 168000, headcount: 178, cash: 18500000, runway: 24 },
  { month: "Nov", revenue: 3020000, cogs: 604000, opex: 2050000, arr: 36240000, customers: 328, churn: 1.9, nrr: 115, cac: 39000, ltv: 175000, headcount: 185, cash: 18900000, runway: 25 },
  { month: "Dec", revenue: 3180000, cogs: 636000, opex: 2120000, arr: 38160000, customers: 341, churn: 1.8, nrr: 118, cac: 37000, ltv: 182000, headcount: 190, cash: 19400000, runway: 26 },
  { month: "Jan", revenue: 3340000, cogs: 668000, opex: 2200000, arr: 40080000, customers: 356, churn: 2.3, nrr: 110, cac: 44000, ltv: 170000, headcount: 196, cash: 19100000, runway: 24 },
  { month: "Feb", revenue: 3510000, cogs: 702000, opex: 2280000, arr: 42120000, customers: 372, churn: 1.7, nrr: 119, cac: 35000, ltv: 189000, headcount: 203, cash: 19600000, runway: 26 },
  { month: "Mar", revenue: 3690000, cogs: 738000, opex: 2350000, arr: 44280000, customers: 389, churn: 1.5, nrr: 122, cac: 33000, ltv: 195000, headcount: 210, cash: 20200000, runway: 28 },
];

export const DEFAULT_BUDGET_DATA = {
  Oct: [{ category: "Revenue", budget: 2800000, actual: 2850000, variance: 1.8 },{ category: "COGS", budget: 600000, actual: 570000, variance: -5.0 },{ category: "Gross Profit", budget: 2200000, actual: 2280000, variance: 3.6 },{ category: "S&M", budget: 950000, actual: 920000, variance: -3.2 },{ category: "R&D", budget: 750000, actual: 770000, variance: 2.7 },{ category: "G&A", budget: 350000, actual: 300000, variance: -14.3 },{ category: "EBITDA", budget: 150000, actual: 290000, variance: 93.3 }],
  Nov: [{ category: "Revenue", budget: 2950000, actual: 3020000, variance: 2.4 },{ category: "COGS", budget: 620000, actual: 604000, variance: -2.6 },{ category: "Gross Profit", budget: 2330000, actual: 2416000, variance: 3.7 },{ category: "S&M", budget: 980000, actual: 960000, variance: -2.0 },{ category: "R&D", budget: 780000, actual: 800000, variance: 2.6 },{ category: "G&A", budget: 360000, actual: 290000, variance: -19.4 },{ category: "EBITDA", budget: 210000, actual: 366000, variance: 74.3 }],
  Dec: [{ category: "Revenue", budget: 3100000, actual: 3180000, variance: 2.6 },{ category: "COGS", budget: 650000, actual: 636000, variance: -2.2 },{ category: "Gross Profit", budget: 2450000, actual: 2544000, variance: 3.8 },{ category: "S&M", budget: 1000000, actual: 990000, variance: -1.0 },{ category: "R&D", budget: 800000, actual: 830000, variance: 3.8 },{ category: "G&A", budget: 370000, actual: 300000, variance: -18.9 },{ category: "EBITDA", budget: 280000, actual: 424000, variance: 51.4 }],
  Jan: [{ category: "Revenue", budget: 3250000, actual: 3340000, variance: 2.8 },{ category: "COGS", budget: 700000, actual: 668000, variance: -4.6 },{ category: "Gross Profit", budget: 2550000, actual: 2672000, variance: 4.8 },{ category: "S&M", budget: 1050000, actual: 1030000, variance: -1.9 },{ category: "R&D", budget: 820000, actual: 860000, variance: 4.9 },{ category: "G&A", budget: 380000, actual: 310000, variance: -18.4 },{ category: "EBITDA", budget: 300000, actual: 472000, variance: 57.3 }],
  Feb: [{ category: "Revenue", budget: 3400000, actual: 3510000, variance: 3.2 },{ category: "COGS", budget: 730000, actual: 702000, variance: -3.8 },{ category: "Gross Profit", budget: 2670000, actual: 2808000, variance: 5.2 },{ category: "S&M", budget: 1080000, actual: 1060000, variance: -1.9 },{ category: "R&D", budget: 840000, actual: 870000, variance: 3.6 },{ category: "G&A", budget: 390000, actual: 350000, variance: -10.3 },{ category: "EBITDA", budget: 360000, actual: 528000, variance: 46.7 }],
  Mar: [{ category: "Revenue", budget: 3500000, actual: 3690000, variance: 5.4 },{ category: "COGS", budget: 770000, actual: 738000, variance: -4.2 },{ category: "Gross Profit", budget: 2730000, actual: 2952000, variance: 8.1 },{ category: "S&M", budget: 1100000, actual: 1080000, variance: -1.8 },{ category: "R&D", budget: 850000, actual: 890000, variance: 4.7 },{ category: "G&A", budget: 400000, actual: 380000, variance: -5.0 },{ category: "EBITDA", budget: 380000, actual: 602000, variance: 58.4 }],
};

export const DEFAULT_EXPENSE_DATA = {
  Oct: [{ name: "Sales & Marketing", value: 920000, color: "#6366F1" },{ name: "R&D / Engineering", value: 770000, color: "#A855F7" },{ name: "G&A", value: 300000, color: "#EC4899" },{ name: "COGS", value: 570000, color: "#F59E0B" }],
  Nov: [{ name: "Sales & Marketing", value: 960000, color: "#6366F1" },{ name: "R&D / Engineering", value: 800000, color: "#A855F7" },{ name: "G&A", value: 290000, color: "#EC4899" },{ name: "COGS", value: 604000, color: "#F59E0B" }],
  Dec: [{ name: "Sales & Marketing", value: 990000, color: "#6366F1" },{ name: "R&D / Engineering", value: 830000, color: "#A855F7" },{ name: "G&A", value: 300000, color: "#EC4899" },{ name: "COGS", value: 636000, color: "#F59E0B" }],
  Jan: [{ name: "Sales & Marketing", value: 1030000, color: "#6366F1" },{ name: "R&D / Engineering", value: 860000, color: "#A855F7" },{ name: "G&A", value: 310000, color: "#EC4899" },{ name: "COGS", value: 668000, color: "#F59E0B" }],
  Feb: [{ name: "Sales & Marketing", value: 1060000, color: "#6366F1" },{ name: "R&D / Engineering", value: 870000, color: "#A855F7" },{ name: "G&A", value: 350000, color: "#EC4899" },{ name: "COGS", value: 702000, color: "#F59E0B" }],
  Mar: [{ name: "Sales & Marketing", value: 1080000, color: "#6366F1" },{ name: "R&D / Engineering", value: 890000, color: "#A855F7" },{ name: "G&A", value: 380000, color: "#EC4899" },{ name: "COGS", value: 738000, color: "#F59E0B" }],
};

export const CASHFLOW_FORECAST = [
  { month: "Apr", inflow: 3800000, outflow: 3100000, net: 700000 },
  { month: "May", inflow: 3950000, outflow: 3200000, net: 750000 },
  { month: "Jun", inflow: 4100000, outflow: 3350000, net: 750000 },
  { month: "Jul", inflow: 4000000, outflow: 3400000, net: 600000 },
  { month: "Aug", inflow: 4300000, outflow: 3500000, net: 800000 },
  { month: "Sep", inflow: 4500000, outflow: 3600000, net: 900000 },
];

export const fmt = (n) => { if(Math.abs(n)>=1e6) return `$${(n/1e6).toFixed(1)}M`; if(Math.abs(n)>=1e3) return `$${(n/1e3).toFixed(0)}K`; return `$${n.toLocaleString()}`; };
export const delta = (a, b) => ((a - b) / b * 100).toFixed(1);

// ── GOOGLE SHEETS ─────────────────────────────────────────────────
const SHEET_CSV_URL = import.meta.env.VITE_GOOGLE_SHEET_CSV_URL || null;

function parseCSV(csv) {
  const lines = csv.trim().split("\n");
  const headers = lines[0].split(",").map(h => h.trim().toLowerCase());
  return lines.slice(1).map(line => {
    const vals = line.split(",").map(v => v.trim());
    const row = {};
    headers.forEach((h, i) => { row[h] = h === "month" ? vals[i] : parseFloat(vals[i]) || 0; });
    return row;
  });
}

export async function fetchSheetData() {
  if (!SHEET_CSV_URL) return null;
  try {
    const r = await fetch(SHEET_CSV_URL);
    if (!r.ok) throw new Error("Fetch failed");
    const parsed = parseCSV(await r.text());
    if (parsed.length > 0 && parsed[0].revenue) { console.log("✅ Google Sheets loaded:", parsed.length, "rows"); return parsed; }
    return null;
  } catch (e) { console.warn("⚠️ Sheets unavailable, using defaults:", e.message); return null; }
}

export const buildFinancialContext = (monthlyData, selectedMonth) => {
  const cur = monthlyData.find(d => d.month === selectedMonth) || monthlyData[monthlyData.length - 1];
  const ci = monthlyData.indexOf(cur);
  const prev = ci > 0 ? monthlyData[ci - 1] : cur;
  return `You are the AI FP&A Assistant for ${COMPANY.name}, a ${COMPANY.type} company in ${COMPANY.fiscalYear}.
SELECTED MONTH: ${MONTH_LABELS[selectedMonth] || selectedMonth}
CURRENT: Revenue $${(cur.revenue/1e6).toFixed(2)}M (${delta(cur.revenue,prev.revenue)}% MoM), ARR $${(cur.arr/1e6).toFixed(1)}M, COGS $${(cur.cogs/1e6).toFixed(2)}M, GM ${((1-cur.cogs/cur.revenue)*100).toFixed(1)}%, OpEx $${(cur.opex/1e6).toFixed(2)}M, EBITDA $${((cur.revenue-cur.cogs-cur.opex)/1e6).toFixed(2)}M, Customers ${cur.customers}, Churn ${cur.churn}%, NRR ${cur.nrr}%, CAC $${(cur.cac/1e3).toFixed(0)}K, LTV $${(cur.ltv/1e3).toFixed(0)}K, LTV/CAC ${(cur.ltv/cur.cac).toFixed(1)}x, Headcount ${cur.headcount}, Cash $${(cur.cash/1e6).toFixed(1)}M, Runway ${cur.runway}mo
TREND:\n${monthlyData.map(d=>`${d.month}: Rev $${(d.revenue/1e6).toFixed(2)}M EBITDA $${((d.revenue-d.cogs-d.opex)/1e6).toFixed(2)}M Cust ${d.customers} Churn ${d.churn}%`).join('\n')}
Respond as a sharp CFO. Be specific with numbers. Direct, no fluff.`;
};
