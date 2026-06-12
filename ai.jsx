/* SobaiShikhi — AI Repair Assistant (diagnosis + AI video) */
function AIAssistant({ go }) {
  const R = window.RDATA;
  const [q, setQ] = React.useState("");
  const [msgs, setMsgs] = React.useState([]);
  const [thinking, setThinking] = React.useState(false);
  const examples = ["আমার ফোন গরম হয়ে চার্জ দ্রুত শেষ হচ্ছে", "ল্যাপটপ হঠাৎ বন্ধ হয়ে যায়", "ফ্রিজ ঠান্ডা হচ্ছে না"];

  const ask = (text) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setQ("");
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      setMsgs((m) => [...m, { role: "ai", text }]);
    }, 1100);
  };

  const guide = R.rguides[0]; // phone heating demo
  const expert = R.experts[0];
  const tech = R.technicians[0];
  const part = R.parts[0];

  return (
    <div style={{ background: "var(--paper)", minHeight: "70vh" }}>
      <div className="wrap" style={{ padding: "36px 28px 80px", maxWidth: 880 }}>
        <div style={{ textAlign: "center" }}>
          <span className="chip brand"><Icon name="spark" size={13} /> AI Repair Assistant · বেটা</span>
          <h1 className="display bn" style={{ fontSize: 36, marginTop: 14 }}>সমস্যা বলুন, AI পথ দেখাবে</h1>
          <p className="bn" style={{ color: "var(--ink-2)", fontSize: 15, marginTop: 8, maxWidth: 520, margin: "8px auto 0", lineHeight: 1.6 }}>
            লক্ষণ লিখুন — AI সম্ভাব্য কারণ, চেকলিস্ট, AI ভিডিও ব্যাখ্যা, গাইড, পার্টস আর এক্সপার্ট সাজেস্ট করবে।
          </p>
        </div>

        {/* conversation */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 28 }}>
          {msgs.length === 0 && (
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
              {examples.map((ex) => (
                <button key={ex} onClick={() => ask(ex)} className="bn" style={{ padding: "9px 15px", borderRadius: 999, border: "1px solid var(--line)", background: "var(--card)", color: "var(--ink-2)", fontSize: 13.5, cursor: "pointer" }}>{ex}</button>
              ))}
            </div>
          )}

          {msgs.map((m, i) => m.role === "user" ? (
            <div key={i} style={{ alignSelf: "flex-end", maxWidth: "75%", background: "var(--ink)", color: "#fff", padding: "12px 17px", borderRadius: "16px 16px 4px 16px" }}>
              <span className="bn" style={{ fontSize: 14.5 }}>{m.text}</span>
            </div>
          ) : (
            <div key={i} style={{ display: "flex", gap: 12, maxWidth: "100%" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--brand)", color: "#fff", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name="spark" size={18} /></div>
              <div className="card" style={{ flex: 1, padding: 20, borderRadius: "4px 16px 16px 16px" }}>
                <p className="bn" style={{ fontSize: 14.5, lineHeight: 1.7, margin: 0 }}>
                  লক্ষণ শুনে মনে হচ্ছে এটি <strong>ব্যাটারি বা ব্যাকগ্রাউন্ড অ্যাপের সমস্যা</strong>। আনুমানিক খরচ: <strong>৳০–৮৫০</strong>। নিচের ভিডিও আর চেকলিস্টটি অনুসরণ করুন —
                </p>

                {/* AI video */}
                <div style={{ marginTop: 14, borderRadius: 12, overflow: "hidden", border: "1px solid var(--line)", position: "relative" }}>
                  <Slot label="AI-generated video — সমস্যার ভিডিও ব্যাখ্যা (বাংলা ভয়েস)" h={210} dark style={{ borderRadius: 0 }} />
                  <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
                    <div style={{ width: 54, height: 54, borderRadius: 999, background: "oklch(1 0 0 / 0.94)", display: "grid", placeItems: "center", boxShadow: "var(--shadow-lg)" }}><Icon name="playS" size={24} style={{ color: "var(--ink)" }} /></div>
                  </div>
                  <span className="chip" style={{ position: "absolute", top: 10, left: 10, background: "var(--brand)", color: "#fff", border: "none", fontSize: 10 }}><Icon name="spark" size={11} /> AI ভিডিও</span>
                  <span className="chip solid" style={{ position: "absolute", bottom: 10, right: 10, fontSize: 10 }}>2:40</span>
                </div>

                {/* checklist */}
                <div className="kicker" style={{ margin: "16px 0 8px" }}>সম্ভাব্য কারণ ও চেক</div>
                {["ব্যাকগ্রাউন্ড অ্যাপ (Settings → Battery দেখুন)", "ব্যাটারি হেলথ ৮০%-এর নিচে কিনা", "নন-অরিজিনাল চার্জার ব্যবহার", "চার্জিং পোর্টে ময়লা"].map((c, ci) => (
                  <div key={ci} style={{ display: "flex", gap: 9, alignItems: "flex-start", marginTop: 6 }}>
                    <span className="mono" style={{ color: "var(--brand-d)", fontSize: 12.5, fontWeight: 700 }}>{ci + 1}.</span>
                    <span className="bn" style={{ fontSize: 13.5, lineHeight: 1.5 }}>{c}</span>
                  </div>
                ))}

                {/* linked resources */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 16 }} className="course-prog">
                  <button onClick={() => go({ view: "site", page: "repair-guide", id: guide.slug })} style={{ textAlign: "left", padding: "12px 14px", borderRadius: 11, border: "1px solid var(--line)", background: "var(--card)", cursor: "pointer" }}>
                    <div className="kicker" style={{ fontSize: 10 }}>রিপেয়ার গাইড</div>
                    <div className="display bn" style={{ fontSize: 13.5, marginTop: 4 }}>{guide.title}</div>
                    <div className="mono" style={{ fontSize: 10.5, color: "var(--brand-d)", marginTop: 4 }}>{guide.success}% সফলতা · {guide.time}</div>
                  </button>
                  <button onClick={() => go({ view: "site", page: "parts" })} style={{ textAlign: "left", padding: "12px 14px", borderRadius: 11, border: "1px solid var(--line)", background: "var(--card)", cursor: "pointer" }}>
                    <div className="kicker" style={{ fontSize: 10 }}>প্রয়োজন হতে পারে</div>
                    <div className="display bn" style={{ fontSize: 13.5, marginTop: 4 }}>{part.name}</div>
                    <div className="mono" style={{ fontSize: 10.5, color: "var(--accent-d)", marginTop: 4 }}>{window.taka(part.price)} · {part.genuine}</div>
                  </button>
                  <button onClick={() => go({ view: "site", page: "experts" })} style={{ textAlign: "left", padding: "12px 14px", borderRadius: 11, border: "1px solid var(--line)", background: "var(--card)", cursor: "pointer" }}>
                    <div className="kicker" style={{ fontSize: 10 }}>লাইভ এক্সপার্ট</div>
                    <div className="display bn" style={{ fontSize: 13.5, marginTop: 4 }}>{expert.name} · {expert.rating}★</div>
                    <div className="mono" style={{ fontSize: 10.5, color: "var(--accent-d)", marginTop: 4 }}>{window.taka(expert.prices[15])} / ১৫ মিনিট</div>
                  </button>
                  <button onClick={() => go({ view: "site", page: "services" })} style={{ textAlign: "left", padding: "12px 14px", borderRadius: 11, border: "1px solid var(--line)", background: "var(--card)", cursor: "pointer" }}>
                    <div className="kicker" style={{ fontSize: 10 }}>কাছের টেকনিশিয়ান</div>
                    <div className="display bn" style={{ fontSize: 13.5, marginTop: 4 }}>{tech.name}</div>
                    <div className="mono" style={{ fontSize: 10.5, color: "var(--brand-d)", marginTop: 4 }}>{tech.area} · {tech.charge}</div>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {thinking && (
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--brand)", color: "#fff", display: "grid", placeItems: "center" }}><Icon name="spark" size={18} /></div>
              <div className="card" style={{ padding: "14px 18px" }}><span className="bn" style={{ fontSize: 13.5, color: "var(--ink-3)" }}>ভাবছি…</span></div>
            </div>
          )}
        </div>

        {/* input */}
        <div style={{ position: "sticky", bottom: 76, marginTop: 24, display: "flex", gap: 8, background: "var(--card)", border: "1.5px solid var(--line)", borderRadius: 14, padding: 6, boxShadow: "var(--shadow)" }}>
          <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && ask(q)} className="bn" placeholder="সমস্যার লক্ষণ লিখুন…" style={{ flex: 1, border: "none", outline: "none", background: "none", fontSize: 14.5, padding: "10px 14px", fontFamily: "var(--font-body)" }} />
          <button className="btn btn-brand" onClick={() => ask(q)}><Icon name="arrow" size={17} /></button>
        </div>
        <div className="bn" style={{ fontSize: 11.5, color: "var(--ink-3)", textAlign: "center", marginTop: 10 }}>AI ভুল করতে পারে — গুরুত্বপূর্ণ কাজে এক্সপার্টের পরামর্শ নিন। ডেমোতে উত্তর পূর্বনির্ধারিত।</div>
      </div>
    </div>
  );
}
Object.assign(window, { AIAssistant });
