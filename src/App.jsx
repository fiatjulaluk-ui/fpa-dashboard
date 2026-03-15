import { useState, useEffect } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie, ComposedChart, ReferenceLine, Area } from "recharts";
import { TrendingUp, DollarSign, CreditCard, Users, Wallet, ChevronDown, BarChart3, MessageSquare, FileText, Settings, Bell, ArrowUpRight, ArrowDownRight, Zap, Clock, PieChart as PieIcon, Activity, Target, Layers, RefreshCw, Database } from "lucide-react";
import { COMPANY, DEFAULT_MONTHLY_DATA, DEFAULT_BUDGET_DATA, DEFAULT_EXPENSE_DATA, DEFAULT_TRANSACTIONS, CASHFLOW_FORECAST, MONTHS, MONTH_LABELS, fmt, delta, fetchSheetData } from "./data";
import AIChat from "./AIChat";

// ── Sub-components ──
function MetricCard({ icon: Icon, label, value, change, changeLabel, color, delay }) {
  const pos = parseFloat(change) > 0;
  return (<div style={{ background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:14,padding:"20px 22px",position:"relative",overflow:"hidden",animation:`slideUp 0.5s ease ${delay||0}s both` }}>
    <div style={{ position:"absolute",top:0,left:0,width:"100%",height:2,background:color||"#6366F1" }}/>
    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12 }}>
      <div style={{ width:36,height:36,borderRadius:10,background:`${color||"#6366F1"}15`,display:"flex",alignItems:"center",justifyContent:"center" }}><Icon size={18} color={color||"#6366F1"}/></div>
      {change && <div style={{ display:"flex",alignItems:"center",gap:3,fontSize:11,fontWeight:600,color:pos?"#34D399":"#F87171",background:pos?"rgba(52,211,153,0.1)":"rgba(248,113,113,0.1)",padding:"3px 8px",borderRadius:6 }}>{pos?<ArrowUpRight size={12}/>:<ArrowDownRight size={12}/>}{change}%</div>}
    </div>
    <div style={{ fontSize:11,color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:1.2,fontWeight:600,marginBottom:6 }}>{label}</div>
    <div style={{ fontSize:24,fontWeight:800,letterSpacing:-0.5 }}>{value}</div>
    {changeLabel && <div style={{ fontSize:11,color:"rgba(255,255,255,0.3)",marginTop:4 }}>{changeLabel}</div>}
  </div>);
}

function ChartTip({ active, payload, label }) {
  if (!active||!payload?.length) return null;
  return (<div style={{ background:"#141428",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"10px 14px",boxShadow:"0 8px 32px rgba(0,0,0,0.4)" }}>
    <div style={{ fontSize:11,color:"rgba(255,255,255,0.5)",marginBottom:6,fontWeight:600 }}>{label}</div>
    {payload.map((p,i) => <div key={i} style={{ fontSize:12,color:p.color,display:"flex",gap:8,alignItems:"center",marginBottom:2 }}><div style={{ width:8,height:8,borderRadius:2,background:p.color }}/><span style={{ color:"rgba(255,255,255,0.6)" }}>{p.name}:</span><span style={{ fontWeight:700 }}>{typeof p.value==="number"?fmt(p.value):p.value}</span></div>)}
  </div>);
}

function SectionHeader({ icon: Icon, title }) {
  return (<div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:18 }}>{Icon && <Icon size={16} color="#6366F1"/>}<span style={{ fontSize:13,fontWeight:700,textTransform:"uppercase",letterSpacing:1.5,color:"rgba(255,255,255,0.5)" }}>{title}</span></div>);
}

// ══════════════════════════════════════════════════════════════════
export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [selectedMonthIdx, setSelectedMonthIdx] = useState(5); // Mar = index 5
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [monthlyData, setMonthlyData] = useState(DEFAULT_MONTHLY_DATA);
  const [dataSource, setDataSource] = useState("local"); // "local" or "sheets"
  const [loading, setLoading] = useState(false);

  // Load Google Sheets data on mount
  useEffect(() => {
    (async () => {
      setLoading(true);
      const sheetData = await fetchSheetData();
      if (sheetData) { setMonthlyData(sheetData); setDataSource("sheets"); }
      setLoading(false);
    })();
  }, []);

  const refreshData = async () => {
    setLoading(true);
    const sheetData = await fetchSheetData();
    if (sheetData) { setMonthlyData(sheetData); setDataSource("sheets"); }
    setLoading(false);
  };

  const selectedMonth = MONTHS[selectedMonthIdx];
  const current = monthlyData[selectedMonthIdx];
  const previous = selectedMonthIdx > 0 ? monthlyData[selectedMonthIdx - 1] : current;
  const ebitda = current.revenue - current.cogs - current.opex;
  const ebitdaMargin = ((ebitda / current.revenue) * 100).toFixed(1);
  const budgetData = DEFAULT_BUDGET_DATA[selectedMonth] || DEFAULT_BUDGET_DATA.Mar;
  const expenseData = DEFAULT_EXPENSE_DATA[selectedMonth] || DEFAULT_EXPENSE_DATA.Mar;
  const transactions = (DEFAULT_TRANSACTIONS && DEFAULT_TRANSACTIONS[selectedMonth]) || DEFAULT_TRANSACTIONS?.Mar || [];

  const P = { background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:16,padding:"22px 24px" };

  return (
    <div style={{ minHeight:"100vh",background:"linear-gradient(170deg,#07071a 0%,#0c0c24 50%,#0f0a20 100%)",color:"#fff",display:"flex" }}>
      {/* SIDEBAR */}
      <nav style={{ width:68,minHeight:"100vh",background:"rgba(255,255,255,0.015)",borderRight:"1px solid rgba(255,255,255,0.05)",display:"flex",flexDirection:"column",alignItems:"center",padding:"20px 0",gap:4,position:"sticky",top:0 }}>
        <div style={{ width:40,height:40,borderRadius:12,background:"linear-gradient(135deg,#6366F1,#A855F7)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:24,fontWeight:900,fontSize:16 }}>N</div>
        {[{id:"dashboard",icon:BarChart3},{id:"reports",icon:FileText},{id:"activity",icon:Activity},{id:"targets",icon:Target}].map(item=>(
          <button key={item.id} onClick={()=>setActiveNav(item.id)} style={{ width:42,height:42,borderRadius:11,background:activeNav===item.id?"rgba(99,102,241,0.15)":"transparent",border:activeNav===item.id?"1px solid rgba(99,102,241,0.2)":"1px solid transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.2s",marginBottom:2 }}><item.icon size={18} color={activeNav===item.id?"#A5B4FC":"rgba(255,255,255,0.25)"}/></button>
        ))}
        <div style={{ flex:1 }}/>
        <button onClick={()=>setChatOpen(!chatOpen)} style={{ width:42,height:42,borderRadius:11,background:chatOpen?"linear-gradient(135deg,#6366F1,#A855F7)":"rgba(255,255,255,0.04)",border:chatOpen?"none":"1px solid rgba(255,255,255,0.06)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",position:"relative" }}>
          <MessageSquare size={18} color={chatOpen?"#fff":"rgba(255,255,255,0.35)"}/>
          {!chatOpen && <div style={{ position:"absolute",top:8,right:8,width:7,height:7,borderRadius:"50%",background:"#34D399" }}/>}
        </button>
        <button style={{ width:42,height:42,borderRadius:11,marginTop:4,background:"transparent",border:"1px solid transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer" }}><Settings size={18} color="rgba(255,255,255,0.2)"/></button>
      </nav>

      {/* MAIN */}
      <main style={{ flex:1,padding:"28px 36px 60px",overflowY:"auto",maxHeight:"100vh",transition:"margin-right 0.35s ease",marginRight:chatOpen?444:0 }}>
        {/* TOP BAR */}
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:32 }}>
          <div>
            <div style={{ fontSize:11,color:"rgba(255,255,255,0.3)",textTransform:"uppercase",letterSpacing:2,fontWeight:600,marginBottom:6 }}>{COMPANY.type} · {COMPANY.fiscalYear}</div>
            <h1 style={{ fontSize:26,fontWeight:800,letterSpacing:-0.8,margin:0 }}>{COMPANY.name}<span style={{ fontSize:14,fontWeight:500,color:"rgba(255,255,255,0.3)",marginLeft:12 }}>FP&A Dashboard</span></h1>
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            {/* Data source indicator */}
            <div style={{ display:"flex",alignItems:"center",gap:6,fontSize:10,color:dataSource==="sheets"?"#34D399":"rgba(255,255,255,0.3)",background:dataSource==="sheets"?"rgba(52,211,153,0.08)":"rgba(255,255,255,0.03)",padding:"5px 10px",borderRadius:8,border:`1px solid ${dataSource==="sheets"?"rgba(52,211,153,0.2)":"rgba(255,255,255,0.06)"}` }}>
              <Database size={11}/>{dataSource==="sheets"?"Google Sheets":"Local Data"}
            </div>
            <button onClick={refreshData} style={{ width:34,height:34,borderRadius:8,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer" }}>
              <RefreshCw size={14} color="rgba(255,255,255,0.4)" style={{ animation:loading?"spin 1s linear infinite":"none" }}/>
            </button>
            {/* MONTH DROPDOWN */}
            <div style={{ position:"relative" }}>
              <button onClick={()=>setDropdownOpen(!dropdownOpen)} style={{ display:"flex",alignItems:"center",gap:8,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,padding:"8px 14px",fontSize:12,color:"rgba(255,255,255,0.7)",cursor:"pointer",minWidth:160 }}>
                <Clock size={13}/>{MONTH_LABELS[selectedMonth]}<ChevronDown size={13} style={{ marginLeft:"auto",transform:dropdownOpen?"rotate(180deg)":"none",transition:"transform 0.2s" }}/>
              </button>
              {dropdownOpen && (
                <div style={{ position:"absolute",top:"100%",right:0,marginTop:6,background:"#141428",border:"1px solid rgba(255,255,255,0.1)",borderRadius:12,padding:6,zIndex:100,minWidth:180,boxShadow:"0 16px 48px rgba(0,0,0,0.5)" }}>
                  {MONTHS.map((m, i) => (
                    <button key={m} onClick={() => { setSelectedMonthIdx(i); setDropdownOpen(false); }}
                      style={{ display:"block",width:"100%",textAlign:"left",padding:"9px 14px",borderRadius:8,fontSize:12,fontWeight:selectedMonthIdx===i?600:400,color:selectedMonthIdx===i?"#A5B4FC":"rgba(255,255,255,0.6)",background:selectedMonthIdx===i?"rgba(99,102,241,0.12)":"transparent",border:"none",cursor:"pointer",transition:"all 0.15s" }}
                      onMouseEnter={e=>{if(selectedMonthIdx!==i)e.target.style.background="rgba(255,255,255,0.04)"}}
                      onMouseLeave={e=>{if(selectedMonthIdx!==i)e.target.style.background="transparent"}}>
                      {MONTH_LABELS[m]}
                      {selectedMonthIdx===i && <span style={{ float:"right",color:"#6366F1" }}>●</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button style={{ width:38,height:38,borderRadius:10,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",position:"relative" }}>
              <Bell size={16} color="rgba(255,255,255,0.4)"/><div style={{ position:"absolute",top:9,right:10,width:6,height:6,borderRadius:"50%",background:"#EF4444" }}/>
            </button>
          </div>
        </div>

        {/* KPI ROW */}
        <div style={{ display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:14,marginBottom:28 }}>
          <MetricCard icon={DollarSign} label="Revenue" value={fmt(current.revenue)} change={delta(current.revenue,previous.revenue)} changeLabel="MoM growth" color="#34D399" delay={0}/>
          <MetricCard icon={TrendingUp} label="ARR" value={fmt(current.arr)} change={delta(current.arr,previous.arr)} color="#6366F1" delay={0.05}/>
          <MetricCard icon={Wallet} label="EBITDA" value={fmt(ebitda)} change={ebitdaMargin} changeLabel={`${ebitdaMargin}% margin`} color="#F59E0B" delay={0.1}/>
          <MetricCard icon={CreditCard} label="Cash" value={fmt(current.cash)} change={delta(current.cash,previous.cash)} color="#A855F7" delay={0.15}/>
          <MetricCard icon={Users} label="Customers" value={current.customers.toString()} change={delta(current.customers,previous.customers)} color="#EC4899" delay={0.2}/>
          <MetricCard icon={Target} label="LTV/CAC" value={`${(current.ltv/current.cac).toFixed(1)}x`} change={delta(current.ltv/current.cac,previous.ltv/previous.cac)} color="#38BDF8" delay={0.25}/>
        </div>

        {/* ROW 1 */}
        <div style={{ display:"grid",gridTemplateColumns:"2fr 1fr",gap:18,marginBottom:18 }}>
          <div style={P}>
            <SectionHeader icon={TrendingUp} title="Revenue & Profitability Trend"/>
            <ResponsiveContainer width="100%" height={260}>
              <ComposedChart data={monthlyData.map(d=>({...d,grossProfit:d.revenue-d.cogs,ebitda:d.revenue-d.cogs-d.opex}))} margin={{top:5,right:10,left:-10,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
                <XAxis dataKey="month" tick={{fill:"rgba(255,255,255,0.4)",fontSize:11}} axisLine={{stroke:"rgba(255,255,255,0.06)"}}/>
                <YAxis tick={{fill:"rgba(255,255,255,0.4)",fontSize:11}} axisLine={{stroke:"rgba(255,255,255,0.06)"}} tickFormatter={v=>fmt(v)}/>
                <Tooltip content={<ChartTip/>}/>
                <ReferenceLine y={0} stroke="rgba(255,255,255,0.1)"/>
                {/* Highlight selected month */}
                <ReferenceLine x={selectedMonth} stroke="#6366F1" strokeDasharray="4 4" strokeWidth={2} label={{value:"▼",position:"top",fill:"#6366F1",fontSize:12}}/>
                <Area type="monotone" dataKey="revenue" fill="rgba(99,102,241,0.1)" stroke="#6366F1" strokeWidth={2.5} name="Revenue" dot={{r:3.5,fill:"#6366F1"}}/>
                <Line type="monotone" dataKey="grossProfit" stroke="#34D399" strokeWidth={2} name="Gross Profit" dot={{r:3,fill:"#34D399"}}/>
                <Line type="monotone" dataKey="ebitda" stroke="#F59E0B" strokeWidth={2} strokeDasharray="6 3" name="EBITDA" dot={{r:3,fill:"#F59E0B"}}/>
                <Legend wrapperStyle={{fontSize:11,color:"rgba(255,255,255,0.5)",paddingTop:8}}/>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div style={P}>
            <SectionHeader icon={PieIcon} title={`Expenses — ${selectedMonth}`}/>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart><Pie data={expenseData} cx="50%" cy="50%" innerRadius={52} outerRadius={78} paddingAngle={3} dataKey="value" stroke="none">
                {expenseData.map((e,i)=><Cell key={i} fill={e.color}/>)}
              </Pie><Tooltip content={<ChartTip/>}/></PieChart>
            </ResponsiveContainer>
            <div style={{display:"flex",flexDirection:"column",gap:8,marginTop:4}}>
              {expenseData.map(e=>(<div key={e.name} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:8,fontSize:11,color:"rgba(255,255,255,0.6)"}}><div style={{width:8,height:8,borderRadius:2,background:e.color}}/>{e.name}</div><div style={{fontSize:12,fontWeight:700}}>{fmt(e.value)}</div></div>))}
            </div>
          </div>
        </div>

        {/* ROW 2 */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18,marginBottom:18}}>
          <div style={P}>
            <SectionHeader icon={Layers} title={`Budget vs Actual — ${selectedMonth}`}/>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={budgetData} layout="vertical" margin={{top:0,right:10,left:20,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false}/>
                <XAxis type="number" tick={{fill:"rgba(255,255,255,0.4)",fontSize:10}} axisLine={{stroke:"rgba(255,255,255,0.06)"}} tickFormatter={v=>fmt(v)}/>
                <YAxis type="category" dataKey="category" tick={{fill:"rgba(255,255,255,0.5)",fontSize:11}} axisLine={{stroke:"rgba(255,255,255,0.06)"}} width={80}/>
                <Tooltip content={<ChartTip/>}/>
                <Bar dataKey="budget" fill="rgba(255,255,255,0.08)" radius={[0,4,4,0]} name="Budget" barSize={14}/>
                <Bar dataKey="actual" radius={[0,4,4,0]} name="Actual" barSize={14}>
                  {budgetData.map((e,i)=>{const isCost=["COGS","S&M","R&D","G&A"].includes(e.category);const good=isCost?e.variance<0:e.variance>0;return <Cell key={i} fill={good?"#34D399":"#F87171"}/>;})}
                </Bar>
                <Legend wrapperStyle={{fontSize:11,color:"rgba(255,255,255,0.5)"}}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={P}>
            <SectionHeader icon={Activity} title="Cash Flow Forecast — Q2–Q3"/>
            <ResponsiveContainer width="100%" height={240}>
              <ComposedChart data={CASHFLOW_FORECAST} margin={{top:5,right:10,left:-10,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
                <XAxis dataKey="month" tick={{fill:"rgba(255,255,255,0.4)",fontSize:11}} axisLine={{stroke:"rgba(255,255,255,0.06)"}}/>
                <YAxis tick={{fill:"rgba(255,255,255,0.4)",fontSize:11}} axisLine={{stroke:"rgba(255,255,255,0.06)"}} tickFormatter={v=>fmt(v)}/>
                <Tooltip content={<ChartTip/>}/>
                <Bar dataKey="inflow" fill="#34D399" radius={[4,4,0,0]} name="Inflow" barSize={20} fillOpacity={0.7}/>
                <Bar dataKey="outflow" fill="#F87171" radius={[4,4,0,0]} name="Outflow" barSize={20} fillOpacity={0.5}/>
                <Line type="monotone" dataKey="net" stroke="#6366F1" strokeWidth={2.5} dot={{r:4,fill:"#6366F1"}} name="Net Cash"/>
                <Legend wrapperStyle={{fontSize:11,color:"rgba(255,255,255,0.5)"}}/>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ROW 3 */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1.6fr",gap:18}}>
          <div style={P}>
            <SectionHeader icon={Target} title="Unit Economics"/>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={monthlyData} margin={{top:5,right:10,left:-10,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
                <XAxis dataKey="month" tick={{fill:"rgba(255,255,255,0.4)",fontSize:11}} axisLine={{stroke:"rgba(255,255,255,0.06)"}}/>
                <YAxis tick={{fill:"rgba(255,255,255,0.4)",fontSize:11}} axisLine={{stroke:"rgba(255,255,255,0.06)"}} tickFormatter={v=>`$${v/1000}K`}/>
                <Tooltip content={<ChartTip/>}/>
                <ReferenceLine x={selectedMonth} stroke="#6366F1" strokeDasharray="4 4"/>
                <Line type="monotone" dataKey="cac" stroke="#EC4899" strokeWidth={2} dot={{r:3}} name="CAC"/>
                <Line type="monotone" dataKey="ltv" stroke="#34D399" strokeWidth={2} dot={{r:3}} name="LTV"/>
                <Legend wrapperStyle={{fontSize:11}}/>
              </LineChart>
            </ResponsiveContainer>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginTop:14}}>
              <div style={{background:"rgba(52,211,153,0.06)",borderRadius:10,padding:"10px 14px"}}><div style={{fontSize:10,color:"rgba(255,255,255,0.35)",textTransform:"uppercase",letterSpacing:1}}>NRR</div><div style={{fontSize:20,fontWeight:800,color:"#34D399"}}>{current.nrr}%</div></div>
              <div style={{background:"rgba(236,72,153,0.06)",borderRadius:10,padding:"10px 14px"}}><div style={{fontSize:10,color:"rgba(255,255,255,0.35)",textTransform:"uppercase",letterSpacing:1}}>Churn</div><div style={{fontSize:20,fontWeight:800,color:"#EC4899"}}>{current.churn}%</div></div>
            </div>
          </div>
          <div style={P}>
            <SectionHeader icon={CreditCard} title={`Transactions — ${selectedMonth}`}/>
            <div style={{display:"flex",flexDirection:"column",gap:2}}>
              {transactions.map(tx=>(<div key={tx.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 14px",borderRadius:10,borderBottom:"1px solid rgba(255,255,255,0.03)",transition:"background 0.15s",cursor:"default"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.035)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <div style={{display:"flex",alignItems:"center",gap:14}}>
                  <div style={{width:32,height:32,borderRadius:8,background:tx.amount>0?"rgba(52,211,153,0.1)":"rgba(248,113,113,0.08)",display:"flex",alignItems:"center",justifyContent:"center"}}>{tx.amount>0?<ArrowUpRight size={14} color="#34D399"/>:<ArrowDownRight size={14} color="#F87171"/>}</div>
                  <div><div style={{fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.85)"}}>{tx.desc}</div><div style={{fontSize:10,color:"rgba(255,255,255,0.3)",marginTop:2}}>{tx.category} · {tx.date}</div></div>
                </div>
                <div style={{textAlign:"right"}}><div style={{fontSize:13,fontWeight:700,color:tx.amount>0?"#34D399":"#F87171"}}>{tx.amount>0?"+":""}{fmt(tx.amount)}</div><div style={{fontSize:9,fontWeight:600,textTransform:"uppercase",letterSpacing:1,color:tx.status==="received"?"#34D399":tx.status==="paid"?"rgba(255,255,255,0.3)":"#F59E0B",marginTop:2}}>{tx.status}</div></div>
              </div>))}
            </div>
          </div>
        </div>
      </main>

      <AIChat isOpen={chatOpen} onToggle={()=>setChatOpen(false)} monthlyData={monthlyData} selectedMonth={selectedMonth}/>
      {!chatOpen && <button onClick={()=>setChatOpen(true)} style={{position:"fixed",bottom:28,right:28,zIndex:999,width:56,height:56,borderRadius:16,background:"linear-gradient(135deg,#6366F1,#A855F7)",border:"none",boxShadow:"0 8px 32px rgba(99,102,241,0.4)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",animation:"fabPulse 2s ease infinite"}}><Zap size={22} color="#fff"/></button>}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0}body{font-family:'Outfit',system-ui,sans-serif}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.08);border-radius:4px}
        @keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes chatSlideIn{from{opacity:0;transform:translateX(20px) scale(0.97)}to{opacity:1;transform:translateX(0) scale(1)}}
        @keyframes msgFade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        @keyframes dotPulse{0%,100%{opacity:.3;transform:scale(1)}50%{opacity:1;transform:scale(1.15)}}
        @keyframes fabPulse{0%,100%{box-shadow:0 8px 32px rgba(99,102,241,0.4),0 0 0 0 rgba(99,102,241,0.2)}50%{box-shadow:0 8px 32px rgba(99,102,241,0.4),0 0 0 8px rgba(99,102,241,0.06)}}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>
    </div>
  );
}
