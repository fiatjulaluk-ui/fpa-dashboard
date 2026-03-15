import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Zap, X } from "lucide-react";
import { COMPANY, buildFinancialContext } from "./data";

const API_URL = "/api/chat";

export default function AIChat({ isOpen, onToggle, monthlyData, selectedMonth }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: `Hey — I'm your FP&A copilot for ${COMPANY.name}. I have full visibility into your financials. Ask me anything.\n\nTry: "How did we do vs budget?" or "What's our biggest risk?"` }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  useEffect(() => { if (isOpen) setTimeout(() => inputRef.current?.focus(), 300); }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim() };
    setMessages(m => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const apiMessages = [...messages.filter((_, i) => i > 0), userMsg].map(m => ({ role: m.role, content: m.content }));
      const headers = { "Content-Type": "application/json" };
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
      if (apiKey) { headers["x-api-key"] = apiKey; headers["anthropic-version"] = "2023-06-01"; headers["anthropic-dangerous-direct-browser-access"] = "true"; }
      const response = await fetch(apiKey ? "https://api.anthropic.com/v1/messages" : API_URL, {
        method: "POST", headers,
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1024, system: buildFinancialContext(monthlyData, selectedMonth), messages: apiMessages }),
      });
      if (!response.ok) throw new Error(`API ${response.status}`);
      const data = await response.json();
      const text = data.content?.map(b => b.type === "text" ? b.text : "").filter(Boolean).join("\n") || "Couldn't process that.";
      setMessages(m => [...m, { role: "assistant", content: text }]);
    } catch (err) {
      setMessages(m => [...m, { role: "assistant", content: "⚠️ AI service unavailable. Check API key setup.\n\nError: " + err.message }]);
    }
    setLoading(false);
  };

  if (!isOpen) return null;
  return (
    <div style={{ position:"fixed",right:24,bottom:24,top:80,width:420,zIndex:1000,background:"linear-gradient(180deg,#0e0e24,#0a0a1a)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:20,display:"flex",flexDirection:"column",boxShadow:"0 24px 80px rgba(0,0,0,0.6)",animation:"chatSlideIn 0.35s cubic-bezier(0.16,1,0.3,1)",overflow:"hidden" }}>
      <div style={{ padding:"16px 20px",borderBottom:"1px solid rgba(255,255,255,0.06)",display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(99,102,241,0.04)",flexShrink:0 }}>
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          <div style={{ width:34,height:34,borderRadius:10,background:"linear-gradient(135deg,#6366F1,#A855F7)",display:"flex",alignItems:"center",justifyContent:"center" }}><Zap size={16} color="#fff" /></div>
          <div><div style={{ fontSize:14,fontWeight:700 }}>FP&A Copilot</div><div style={{ fontSize:10,color:"#34D399",fontWeight:600,display:"flex",alignItems:"center",gap:4 }}><div style={{ width:5,height:5,borderRadius:"50%",background:"#34D399" }}/>Live</div></div>
        </div>
        <button onClick={onToggle} style={{ background:"rgba(255,255,255,0.05)",border:"none",borderRadius:8,width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"rgba(255,255,255,0.4)" }}><X size={14}/></button>
      </div>
      <div style={{ flex:1,overflowY:"auto",padding:"16px 18px",display:"flex",flexDirection:"column",gap:14 }}>
        {messages.map((msg,i) => (
          <div key={i} style={{ display:"flex",gap:10,flexDirection:msg.role==="user"?"row-reverse":"row",animation:`msgFade 0.3s ease ${i*0.05}s both` }}>
            <div style={{ width:28,height:28,borderRadius:8,flexShrink:0,background:msg.role==="user"?"rgba(255,255,255,0.08)":"linear-gradient(135deg,#6366F1,#A855F7)",display:"flex",alignItems:"center",justifyContent:"center",marginTop:2 }}>
              {msg.role==="user"?<User size={13} color="rgba(255,255,255,0.6)"/>:<Bot size={13} color="#fff"/>}
            </div>
            <div style={{ maxWidth:"82%",background:msg.role==="user"?"rgba(99,102,241,0.12)":"rgba(255,255,255,0.04)",border:`1px solid ${msg.role==="user"?"rgba(99,102,241,0.2)":"rgba(255,255,255,0.06)"}`,borderRadius:msg.role==="user"?"14px 14px 4px 14px":"14px 14px 14px 4px",padding:"11px 15px",fontSize:13,lineHeight:1.65,color:"rgba(255,255,255,0.85)",whiteSpace:"pre-wrap" }}>{msg.content}</div>
          </div>
        ))}
        {loading && <div style={{ display:"flex",gap:10 }}><div style={{ width:28,height:28,borderRadius:8,background:"linear-gradient(135deg,#6366F1,#A855F7)",display:"flex",alignItems:"center",justifyContent:"center" }}><Bot size={13} color="#fff"/></div><div style={{ background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:"14px 14px 14px 4px",padding:"14px 18px",display:"flex",gap:5 }}>{[0,1,2].map(i=><div key={i} style={{ width:7,height:7,borderRadius:"50%",background:"#6366F1",animation:`dotPulse 1.2s ease infinite ${i*0.2}s`,opacity:0.4 }}/>)}</div></div>}
        <div ref={chatEndRef}/>
      </div>
      <div style={{ padding:"12px 16px",borderTop:"1px solid rgba(255,255,255,0.06)",background:"rgba(0,0,0,0.2)",flexShrink:0 }}>
        <div style={{ display:"flex",gap:8,alignItems:"center",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"4px 4px 4px 14px" }}>
          <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMessage()} placeholder="Ask about your financials..." style={{ flex:1,background:"transparent",border:"none",outline:"none",color:"#fff",fontSize:13,fontFamily:"inherit" }}/>
          <button onClick={sendMessage} disabled={!input.trim()||loading} style={{ width:34,height:34,borderRadius:9,background:input.trim()?"linear-gradient(135deg,#6366F1,#8B5CF6)":"rgba(255,255,255,0.05)",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:input.trim()?"pointer":"default" }}><Send size={14} color={input.trim()?"#fff":"rgba(255,255,255,0.2)"}/></button>
        </div>
      </div>
    </div>
  );
}
