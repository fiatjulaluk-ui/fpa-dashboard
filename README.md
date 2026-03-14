# FP&A Dashboard with AI Copilot

A production-grade Financial Planning & Analysis dashboard with a live AI assistant powered by Claude. Built with React, Recharts, and Vite.

![Dashboard Preview](https://img.shields.io/badge/Status-Production_Ready-34D399?style=flat-square)
![React](https://img.shields.io/badge/React-18-6366F1?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-5-F59E0B?style=flat-square)

## Features

- **6 KPI Cards** — Revenue, ARR, EBITDA, Cash, Customers, LTV/CAC with trend indicators
- **Revenue & Profitability Trend** — 6-month area + line chart
- **Expense Breakdown** — Interactive donut chart
- **Budget vs Actual** — Horizontal bar chart with variance highlighting
- **Cash Flow Forecast** — Inflow/outflow bars with net cash line
- **Unit Economics** — CAC vs LTV trend, NRR, Churn
- **Recent Transactions** — Scrollable list with status badges
- **AI Copilot** — Live Claude-powered assistant with full financial context

---

## Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Create your environment file
cp .env.example .env

# 3. Add your Anthropic API key to .env (see "AI Setup" below)

# 4. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## AI Copilot Setup

The AI chat assistant calls Claude's API. You have two options:

### Option A: Backend Proxy (Recommended for Production)

This project includes ready-to-use serverless functions for both Vercel and Netlify.

**For Vercel:**
1. Deploy to Vercel (see below)
2. Add `ANTHROPIC_API_KEY` to your Vercel project → Settings → Environment Variables
3. In `src/AIChat.jsx`, the API URL defaults to `/api/chat` when `VITE_API_PROXY_URL` is not set
4. Update the `API_URL` line in `src/AIChat.jsx`:
   ```js
   const API_URL = "/api/chat";
   ```

**For Netlify:**
1. Deploy to Netlify (see below)
2. Add `ANTHROPIC_API_KEY` to your Netlify site → Settings → Environment Variables
3. Update the `API_URL` line in `src/AIChat.jsx`:
   ```js
   const API_URL = "/api/chat";
   ```

### Option B: Direct API Key (Demo Only — NOT for Production)

⚠️ This exposes your API key in the browser. Only use for local testing.

```bash
# In your .env file:
VITE_ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
```

Note: Direct browser-to-Anthropic calls may be blocked by CORS. The backend proxy approach is strongly recommended.

---

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variable
vercel env add ANTHROPIC_API_KEY
```

Or connect your GitHub repo at [vercel.com/new](https://vercel.com/new) for automatic deploys.

---

## Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod

# Set environment variable
netlify env:set ANTHROPIC_API_KEY sk-ant-...
```

Or connect your GitHub repo at [app.netlify.com](https://app.netlify.com) for automatic deploys.

---

## Project Structure

```
fpa-dashboard/
├── api/
│   └── chat.js              # Vercel serverless function (API proxy)
├── netlify/
│   └── functions/
│       └── chat.mjs          # Netlify serverless function (API proxy)
├── src/
│   ├── main.jsx              # React entry point
│   ├── index.css             # Global styles & animations
│   ├── App.jsx               # Main dashboard layout & charts
│   ├── AIChat.jsx            # AI chat panel component
│   └── data.js               # Financial data & AI context builder
├── index.html                # HTML entry
├── package.json
├── vite.config.js
├── vercel.json               # Vercel deployment config
├── netlify.toml              # Netlify deployment config
├── .env.example              # Environment variables template
└── README.md
```

---

## Customizing the Data

All financial data lives in `src/data.js`. Replace the mock data with your actual financials:

- `COMPANY` — Company name, type, fiscal year
- `MONTHLY_DATA` — Monthly P&L, customers, unit economics
- `BUDGET_VS_ACTUAL` — Budget variance data
- `EXPENSE_BREAKDOWN` — Cost categories for the donut chart
- `RECENT_TRANSACTIONS` — Transaction feed
- `CASHFLOW_FORECAST` — Forward-looking cash flow

The `buildFinancialContext()` function in `data.js` automatically generates the AI system prompt from your data — update the data and the AI assistant adapts automatically.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Charts | Recharts |
| Icons | Lucide React |
| AI | Claude API (Anthropic) |
| Hosting | Vercel / Netlify |

---

## License

MIT — use freely for commercial or personal projects.
