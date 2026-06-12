/* SobaiShikhi — Repair community forum + contributor guide builder */

function ForumPage({ go }) {
  const R = window.RDATA;
  const [cat, setCat] = React.useState("all");
  const [asking, setAsking] = React.useState(false);
  const [askDone, setAskDone] = React.useState(false);
  const [voted, setVoted] = React.useState({});
  const list = R.forum.filter((f) => cat === "all" || f.cat === cat);
  const vote = (id) => setVoted((v) => ({ ...v, [id]: !v[id] }));
  const leaders = [
    { name: "Rakibul Islam", badge: "টেকনিশিয়ান", pts: 4820, hue: 250, initials: "RI" },
    { name: "Tahmid Rahman", badge: "ভেরিফায়েড ইন্সট্রাক্টর", pts: 3940, hue: 168, initials: "TR" },
    { name: "Karim Auto", badge: "টেকনিশিয়ান", pts: 3110, hue: 25, initials: "KA" },
    { name: "Salma Begum", badge: "টেকনিশিয়ান", pts: 2480, hue: 38, initials: "SB" },
  ];

  return (
    <div className="wrap" style={{ padding: "32px 28px 80px" }}>
      <div className="spread" style={{ flexWrap: "wrap", gap: 14 }}>
        <div>
          <div className="kicker">কমিউনিটি · Repair Forum</div>
          <h1 className="display bn" style={{ fontSize: 36, marginTop: 8 }}>রিপেয়ার কমিউনিটি</h1>
          <p className="bn" style={{ color: "var(--ink-2)", fontSize: 15, marginTop: 6, maxWidth: 520 }}>সমস্যা বলুন — টেকনিশিয়ান, ইঞ্জিনিয়ার আর অভিজ্ঞ মেকাররা উত্তর দেবেন। সেরা উত্তর পায় ব্যাজ।</p>
        </div>
        <button className="btn btn-accent" onClick={() => { setAsking(true); setAskDone(false); }}><Icon name="plus" size={17} /> প্রশ্ন করুন</button>
      </div>

      <div style={{ display: "flex", gap: 8, margin: "22px 0 18px", flexWrap: "wrap" }}>
        {[{ id: "all", bn: "সব" }, ...R.rcats].map((c) => (
          <button key={c.id} onClick={() => setCat(c.id)} className="bn" style={{ padding: "7px 14px", borderRadius: 999, fontSize: 13, cursor: "pointer", border: "1px solid " + (cat === c.id ? "var(--ink)" : "var(--line)"), background: cat === c.id ? "var(--ink)" : "var(--card)", color: cat === c.id ? "#fff" : "var(--ink-2)" }}>{c.bn}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 290px", gap: 26, alignItems: "start" }} className="detail-grid">
        {/* questions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {list.map((f) => {
            const upvoted = voted[f.id];
            return (
              <div key={f.id} className="card" style={{ padding: 18 }}>
                <div style={{ display: "flex", gap: 16 }}>
                  {/* vote rail */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flexShrink: 0 }}>
                    <button onClick={() => vote(f.id)} style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid " + (upvoted ? "var(--brand)" : "var(--line)"), background: upvoted ? "var(--brand-soft)" : "var(--card)", color: upvoted ? "var(--brand-d)" : "var(--ink-3)", cursor: "pointer", display: "grid", placeItems: "center" }}>▲</button>
                    <span className="display tnum" style={{ fontSize: 15 }}>{f.votes + (upvoted ? 1 : 0)}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                      {f.solved && <span className="badge green"><Icon name="checkC" size={12} /> সমাধান হয়েছে</span>}
                      {f.tags.map((t) => <span key={t} className="badge gray">{t}</span>)}
                    </div>
                    <h3 className="display bn" style={{ fontSize: 17, marginTop: 8, lineHeight: 1.35 }}>{f.title}</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 10, flexWrap: "wrap" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 7 }}><Avatar initials={f.initials} size={24} /><span className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{f.author} · {f.when}</span></span>
                      <span className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{f.answers} উত্তর · {f.views} বার দেখা</span>
                    </div>
                    {f.best && (
                      <div style={{ marginTop: 14, padding: "13px 15px", borderRadius: 11, background: "var(--brand-soft)", borderLeft: "3px solid var(--brand)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7, flexWrap: "wrap" }}>
                          <span className="badge green"><Icon name="star" size={11} /> সেরা উত্তর</span>
                          <span className="display" style={{ fontSize: 12.5 }}>{f.best.by}</span>
                          <span className="badge blue" style={{ fontSize: 10 }}>{f.best.badge}</span>
                        </div>
                        <p className="bn" style={{ fontSize: 13.5, lineHeight: 1.6, margin: 0, color: "var(--ink)" }}>{f.best.text}</p>
                      </div>
                    )}
                    <div style={{ display: "flex", gap: 14, marginTop: 12 }}>
                      {["উত্তর দিন", "ফলো করুন", "শেয়ার"].map((a) => (
                        <button key={a} className="bn" style={{ background: "none", border: "none", fontSize: 12.5, color: "var(--brand-d)", cursor: "pointer", fontWeight: 600, padding: 0 }}>{a}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* sidebar */}
        <aside style={{ display: "flex", flexDirection: "column", gap: 16, position: "sticky", top: 88 }}>
          <div className="card" style={{ padding: 18 }}>
            <div className="kicker" style={{ marginBottom: 14 }}>টপ এক্সপার্ট · এই মাসে</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {leaders.map((l, i) => (
                <div key={l.name} style={{ display: "flex", alignItems: "center", gap: 11 }}>
                  <span className="display" style={{ fontSize: 13, width: 20, color: i === 0 ? "var(--gold)" : "var(--ink-3)" }}>#{i + 1}</span>
                  <Avatar initials={l.initials} size={32} hue={l.hue} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="display" style={{ fontSize: 13 }}>{l.name}</div>
                    <div className="bn" style={{ fontSize: 10.5, color: "var(--ink-3)" }}>{l.badge}</div>
                  </div>
                  <span className="mono tnum" style={{ fontSize: 11.5, color: "var(--brand-d)", fontWeight: 600 }}>{l.pts.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card" style={{ padding: 18 }}>
            <div className="kicker" style={{ marginBottom: 12 }}>ব্যাজ সিস্টেম</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {[["blue", "টেকনিশিয়ান", "যাচাইকৃত হাতে-কলমে দক্ষতা"], ["violet", "ইঞ্জিনিয়ার", "প্রকৌশল ডিগ্রি যাচাইকৃত"], ["green", "ভেরিফায়েড ইন্সট্রাক্টর", "SobaiShikhi কোর্স ইন্সট্রাক্টর"], ["gold", "টপ কন্ট্রিবিউটর", "মাসের সেরা সাহায্যকারী"]].map(([c, t, d]) => (
                <div key={t} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
                  <span className={"badge " + c} style={{ flexShrink: 0 }}>{t}</span>
                  <span className="bn" style={{ fontSize: 11.5, color: "var(--ink-3)", lineHeight: 1.4 }}>{d}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card" style={{ padding: 18, background: "var(--brand-soft)", border: "none" }}>
            <div className="display bn" style={{ fontSize: 14.5 }}>জ্ঞান আছে? গাইড লিখুন</div>
            <p className="bn" style={{ fontSize: 12.5, color: "var(--brand-d)", margin: "6px 0 12px", lineHeight: 1.5 }}>আপনার রিপেয়ার অভিজ্ঞতা হাজারো মানুষের কাজে লাগবে — আর আপনি পাবেন রেপুটেশন।</p>
            <button className="btn btn-brand btn-sm" style={{ width: "100%" }} onClick={() => go({ view: "site", page: "contribute" })}>গাইড বিল্ডার <Icon name="arrow" size={14} /></button>
          </div>
        </aside>
      </div>

      {/* ask modal */}
      {asking && (
        <div onClick={() => setAsking(false)} style={{ position: "fixed", inset: 0, background: "oklch(0.2 0.02 260 / 0.45)", zIndex: 70, display: "grid", placeItems: "center", padding: 20 }}>
          <div onClick={(e) => e.stopPropagation()} className="card" style={{ width: "100%", maxWidth: 540, padding: 28, boxShadow: "var(--shadow-lg)" }}>
            {askDone ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ width: 60, height: 60, borderRadius: 999, background: "var(--brand-soft)", color: "var(--brand-d)", display: "grid", placeItems: "center", margin: "0 auto 14px" }}><Icon name="checkC" size={32} /></div>
                <div className="display bn" style={{ fontSize: 20 }}>প্রশ্ন পোস্ট হয়েছে!</div>
                <p className="bn" style={{ fontSize: 14, color: "var(--ink-2)", marginTop: 8 }}>এক্সপার্টরা সাধারণত ১–২ ঘণ্টার মধ্যে উত্তর দেন। নোটিফিকেশনে জানতে পারবেন।</p>
                <button className="btn btn-brand btn-sm" style={{ marginTop: 16 }} onClick={() => setAsking(false)}>ঠিক আছে</button>
              </div>
            ) : (
              <>
                <div className="spread" style={{ marginBottom: 18 }}>
                  <h3 className="display bn" style={{ fontSize: 20 }}>প্রশ্ন করুন</h3>
                  <button onClick={() => setAsking(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-3)" }}><Icon name="x" size={20} /></button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div className="field"><label>ক্যাটাগরি</label>
                    <select className="select">{R.rcats.map((c) => <option key={c.id}>{c.bn}</option>)}</select>
                  </div>
                  <div className="field"><label>সমস্যার শিরোনাম</label><input className="input" placeholder="যেমন: ফোনের ডিসপ্লেতে সবুজ লাইন দেখাচ্ছে" /></div>
                  <div className="field"><label>বিস্তারিত</label><textarea className="textarea" placeholder="ডিভাইসের মডেল, কখন থেকে সমস্যা, কী কী চেষ্টা করেছেন — যত বিস্তারিত লিখবেন তত ভালো উত্তর পাবেন।" /></div>
                </div>
                <button className="btn btn-accent" style={{ width: "100%", marginTop: 18 }} onClick={() => setAskDone(true)}>পোস্ট করুন <Icon name="arrow" size={16} /></button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Page 3: contributor guide builder ---------- */
function ContributePage({ go, embedded }) {
  const R = window.RDATA;
  const [tab, setTab] = React.useState("guides");
  const [submitted, setSubmitted] = React.useState(false);
  const [form, setForm] = React.useState({ title: "", cat: "", desc: "", difficulty: "সহজ" });
  const [steps, setSteps] = React.useState([{ t: "", body: "" }]);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const myGuides = [
    { title: "ফোন গরম হয়ে দ্রুত চার্জ শেষ — সমাধান", status: "published", views: "48.2k", helpful: 2140 },
    { title: "এসি ঠান্ডা করছে না — ফিল্টার থেকে গ্যাস", status: "under_review", views: "—", helpful: 0 },
    { title: "ওয়াশিং মেশিন স্পিন করছে না", status: "draft", views: "—", helpful: 0 },
    { title: "সিলিং ফ্যান ধীরে ঘোরে", status: "revision", views: "—", helpful: 0 },
  ];

  return (
    <div className={embedded ? "" : "wrap"} style={embedded ? {} : { padding: "32px 28px 80px" }}>
      {!embedded && (
        <>
          <div className="kicker">কন্ট্রিবিউটর স্টুডিও</div>
          <h1 className="display bn" style={{ fontSize: 34, marginTop: 8 }}>রিপেয়ার গাইড লিখুন</h1>
          <p className="bn" style={{ color: "var(--ink-2)", fontSize: 15, marginTop: 6, maxWidth: 560 }}>টেকনিশিয়ান, মেকানিক, ইঞ্জিনিয়ার — আপনার জ্ঞান শেয়ার করুন। প্রতিটি গাইড অ্যাডমিন রিভিউয়ের পর প্রকাশিত হয়।</p>
        </>
      )}

      <div style={{ display: "flex", gap: 6, borderBottom: "1px solid var(--line)", margin: "24px 0" }}>
        {[["guides", "আমার গাইড"], ["new", "নতুন গাইড লিখুন"]].map(([id, label]) => (
          <button key={id} onClick={() => { setTab(id); setSubmitted(false); }} className="bn" style={{ padding: "11px 16px", border: "none", background: "none", cursor: "pointer", fontSize: 15, fontWeight: tab === id ? 600 : 400, color: tab === id ? "var(--ink)" : "var(--ink-3)", borderBottom: "2.5px solid " + (tab === id ? "var(--accent)" : "transparent"), marginBottom: -1 }}>{label}</button>
        ))}
      </div>

      {tab === "guides" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 18 }} id="contrib-stats">
            {[["মোট গাইড", "4"], ["প্রকাশিত", "1"], ["মোট ভিউ", "48.2k"], ["রেপুটেশন", "4,820"]].map(([l, v]) => (
              <div key={l} className="card" style={{ padding: "14px 18px" }}><div className="display tnum" style={{ fontSize: 22 }}>{v}</div><div className="bn" style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 2 }}>{l}</div></div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {myGuides.map((g, i) => (
              <div key={i} className="card" style={{ padding: 16, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div className="display bn" style={{ fontSize: 15.5 }}>{g.title}</div>
                  <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 4 }}>{g.views} views · {g.helpful.toLocaleString()} helpful</div>
                </div>
                <StatusPill status={g.status} />
                <button className="btn btn-ghost btn-sm" onClick={() => setTab("new")}><Icon name="edit" size={14} /> Edit</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "new" && (submitted ? (
        <div className="center" style={{ flexDirection: "column", padding: "60px 0", textAlign: "center", gap: 14 }}>
          <div style={{ width: 66, height: 66, borderRadius: 999, background: "var(--brand-soft)", color: "var(--brand-d)", display: "grid", placeItems: "center" }}><Icon name="checkC" size={34} /></div>
          <h2 className="display bn" style={{ fontSize: 26 }}>রিভিউয়ের জন্য জমা হয়েছে!</h2>
          <p className="bn" style={{ color: "var(--ink-2)", fontSize: 15, maxWidth: 440, lineHeight: 1.6 }}>অ্যাডমিন টিম গাইডটি যাচাই করবে — তথ্যের সঠিকতা, নিরাপত্তা নোট আর মান। অনুমোদিত হলে প্রকাশিত হবে এবং আপনি নোটিফিকেশন পাবেন।</p>
          <div className="chip"><Icon name="clock" size={14} /> Status: Under review</div>
          <button className="btn btn-brand btn-sm" onClick={() => setTab("guides")}>আমার গাইডে ফিরুন</button>
        </div>
      ) : (
        <div style={{ maxWidth: 720 }}>
          <div className="card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="field"><label>গাইডের শিরোনাম</label><input className="input" value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="যেমন: ওয়াশিং মেশিন পানি নিচ্ছে না — সমাধান" /></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div className="field"><label>ক্যাটাগরি</label>
                <select className="select" value={form.cat} onChange={(e) => set("cat", e.target.value)}>
                  <option value="">নির্বাচন করুন…</option>
                  {R.rcats.map((c) => <option key={c.id} value={c.id}>{c.bn}</option>)}
                </select>
              </div>
              <div className="field"><label>কঠিনতা</label>
                <select className="select" value={form.difficulty} onChange={(e) => set("difficulty", e.target.value)}>
                  {["সহজ", "মাঝারি", "কঠিন"].map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <div className="field"><label>সমস্যার বর্ণনা ও লক্ষণ</label><textarea className="textarea" value={form.desc} onChange={(e) => set("desc", e.target.value)} placeholder="সমস্যাটা কী, কী কী লক্ষণ দেখা যায়, সম্ভাব্য কারণ…" /></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div className="field"><label>প্রয়োজনীয় টুলস</label><input className="input" placeholder="স্ক্রু-ড্রাইভার, মাল্টিমিটার…" /></div>
              <div className="field"><label>আনুমানিক খরচ (৳)</label><input className="input" placeholder="০–১,৫০০" /></div>
            </div>
            <div className="field"><label>নিরাপত্তা সতর্কতা</label><input className="input" placeholder="কাজের আগে বিদ্যুৎ সংযোগ বন্ধ করুন…" /></div>
          </div>

          <div className="card" style={{ padding: 24, marginTop: 14 }}>
            <div className="spread" style={{ marginBottom: 14 }}>
              <h3 className="display bn" style={{ fontSize: 17 }}>ধাপে ধাপে সমাধান</h3>
              <span className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{steps.length} ধাপ</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {steps.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span className="display" style={{ width: 30, height: 30, borderRadius: 8, background: "var(--ink)", color: "#fff", display: "grid", placeItems: "center", fontSize: 13, flexShrink: 0, marginTop: 4 }}>{i + 1}</span>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                    <input className="input" value={s.t} onChange={(e) => setSteps((st) => st.map((x, xi) => xi === i ? { ...x, t: e.target.value } : x))} placeholder={`ধাপ ${i + 1}-এর শিরোনাম`} style={{ padding: "9px 12px", fontSize: 14 }} />
                    <textarea className="textarea" value={s.body} onChange={(e) => setSteps((st) => st.map((x, xi) => xi === i ? { ...x, body: e.target.value } : x))} placeholder="বিস্তারিত নির্দেশনা…" style={{ minHeight: 64, fontSize: 14 }} />
                  </div>
                  {steps.length > 1 && <button onClick={() => setSteps((st) => st.filter((_, xi) => xi !== i))} style={{ background: "none", border: "none", color: "var(--ink-3)", cursor: "pointer", marginTop: 8 }}><Icon name="x" size={16} /></button>}
                </div>
              ))}
            </div>
            <button className="btn btn-ghost btn-sm" style={{ marginTop: 14 }} onClick={() => setSteps((s) => [...s, { t: "", body: "" }])}><Icon name="plus" size={15} /> ধাপ যোগ করুন</button>
          </div>

          <div className="spread" style={{ marginTop: 18 }}>
            <button className="btn btn-ghost" onClick={() => setTab("guides")}>ড্রাফট সেভ করুন</button>
            <button className="btn btn-accent" disabled={!form.title || !form.cat} onClick={() => setSubmitted(true)}>রিভিউয়ের জন্য জমা দিন <Icon name="arrow" size={16} /></button>
          </div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { ForumPage, ContributePage });
