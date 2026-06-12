/* SobaiShikhi — Repair Knowledge Hub + Guide detail */

function DiffBadge({ g }) {
  const c = g.diffLevel === 1 ? "green" : g.diffLevel === 2 ? "amber" : "red";
  return <span className={"badge " + c}>{g.difficulty}</span>;
}

function RepairGuideCard({ g, go }) {
  const cat = window.rcatOf(g);
  return (
    <div className="card" onClick={() => go({ view: "site", page: "repair-guide", id: g.slug })}
      style={{ padding: 18, cursor: "pointer", display: "flex", flexDirection: "column", gap: 10, transition: "transform .14s, box-shadow .14s" }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "var(--shadow-lg)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
      <div className="spread">
        <span className="chip" style={{ background: `oklch(0.95 0.04 ${cat.hue})`, color: `oklch(0.42 0.13 ${cat.hue})`, border: "none", fontSize: 10.5 }}>{cat.bn}</span>
        <DiffBadge g={g} />
      </div>
      <div className="display bn" style={{ fontSize: 17, lineHeight: 1.3 }}>{g.title}</div>
      <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>{g.en}</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 4 }}>
        {[["clock", g.time], ["money", g.cost], ["eye", (g.views / 1000).toFixed(1) + "k views"], ["checkC", g.success + "% সফলতা"]].map(([ic, v]) => (
          <span key={v} style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon name={ic} size={13} style={{ color: "var(--ink-3)" }} /><span className="bn" style={{ fontSize: 12, color: "var(--ink-2)" }}>{v}</span></span>
        ))}
      </div>
      <div className="hairline" style={{ margin: "2px 0" }} />
      <div className="spread">
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>{g.authorName}{g.verified && <Icon name="checkC" size={11} style={{ color: "var(--brand)", marginLeft: 3, verticalAlign: "-2px" }} />}</span>
        <span className="bn" style={{ fontSize: 12, color: "var(--brand-d)", fontWeight: 600 }}>{g.steps.length} ধাপ →</span>
      </div>
    </div>
  );
}

function RepairHub({ go }) {
  const R = window.RDATA;
  const [q, setQ] = React.useState("");
  const [cat, setCat] = React.useState("all");
  const published = R.rguides.filter((g) => g.status === "published");
  let list = published;
  if (cat !== "all") list = list.filter((g) => g.cat === cat);
  if (q.trim()) list = list.filter((g) => (g.title + g.en + window.rcatOf(g).bn).toLowerCase().includes(q.toLowerCase()));
  const quick = ["ফোন গরম", "ল্যাপটপ স্লো", "নেট স্লো", "ফ্রিজ ঠান্ডা না", "এসি", "বাইক স্টার্ট"];

  return (
    <div>
      {/* hub hero */}
      <section style={{ background: "var(--ink)", color: "#fff", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -60, width: 300, height: 300, borderRadius: "50%", background: "oklch(0.55 0.105 168 / 0.25)" }} />
        <div style={{ position: "absolute", bottom: -100, left: "30%", width: 260, height: 260, borderRadius: "50%", background: "oklch(0.66 0.17 38 / 0.18)" }} />
        <div className="wrap" style={{ position: "relative", padding: "52px 28px 56px", textAlign: "center" }}>
          <span className="chip" style={{ background: "oklch(0.34 0.03 260)", color: "#fff", border: "none" }}><Icon name="wrench" size={13} /> রিপেয়ার নলেজ হাব</span>
          <h1 className="display bn" style={{ fontSize: 44, marginTop: 16, lineHeight: 1.1 }}>নষ্ট হয়েছে? <span style={{ color: "var(--accent)" }}>ফেলবেন না</span>, সারান।</h1>
          <p className="bn" style={{ color: "oklch(0.8 0.01 260)", fontSize: 16.5, maxWidth: 560, margin: "12px auto 0", lineHeight: 1.6 }}>
            মোবাইল থেকে মোটরসাইকেল — ৩,৬০০+ ধাপে ধাপে সমাধান, বাংলায়। খরচ ও সময়ের হিসাবসহ।
          </p>
          <div style={{ display: "flex", gap: 8, background: "#fff", borderRadius: 999, padding: 6, boxShadow: "var(--shadow-lg)", maxWidth: 560, margin: "24px auto 0" }}>
            <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center" }}>
              <Icon name="search" size={19} style={{ position: "absolute", left: 14, color: "var(--ink-3)" }} />
              <input value={q} onChange={(e) => setQ(e.target.value)} className="bn" placeholder="সমস্যা লিখুন — যেমন: ফোন গরম হয়ে যাচ্ছে" style={{ border: "none", outline: "none", background: "none", fontSize: 15, padding: "10px 10px 10px 42px", width: "100%", color: "var(--ink)", fontFamily: "var(--font-body)" }} />
            </div>
            <button className="btn btn-accent">খুঁজুন</button>
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginTop: 14 }}>
            {quick.map((t) => (
              <button key={t} onClick={() => setQ(t.split(" ")[0])} className="bn" style={{ fontSize: 12.5, padding: "5px 12px", borderRadius: 999, border: "1px solid oklch(0.42 0.012 260)", background: "transparent", color: "oklch(0.82 0.01 260)", cursor: "pointer" }}>{t}</button>
            ))}
          </div>
        </div>
      </section>

      {/* categories */}
      <section className="wrap" style={{ padding: "36px 28px 8px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(8,1fr)", gap: 12 }} className="rcat-grid">
          {R.rcats.map((c) => {
            const active = cat === c.id;
            return (
              <button key={c.id} onClick={() => setCat(active ? "all" : c.id)} style={{ textAlign: "center", padding: "16px 8px", borderRadius: 14, cursor: "pointer", background: active ? `oklch(0.56 0.15 ${c.hue})` : `oklch(0.975 0.022 ${c.hue})`, border: `1px solid ${active ? "transparent" : `oklch(0.91 0.045 ${c.hue})`}`, transition: "all .14s" }}>
                <Icon name={c.icon} size={22} style={{ color: active ? "#fff" : `oklch(0.5 0.14 ${c.hue})` }} />
                <div className="display bn" style={{ fontSize: 12.5, marginTop: 8, color: active ? "#fff" : "var(--ink)" }}>{c.bn}</div>
                <div className="mono" style={{ fontSize: 9.5, marginTop: 3, color: active ? "oklch(1 0 0 / 0.8)" : "var(--ink-3)" }}>{c.guides} গাইড</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* guides */}
      <section className="wrap" style={{ padding: "32px 28px 24px" }}>
        <div className="spread" style={{ marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
          <h2 className="display bn" style={{ fontSize: 26 }}>{cat === "all" ? "জনপ্রিয় সমাধান" : window.RDATA.rcats.find(c => c.id === cat).bn + " — গাইড"}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{list.length} guides</span>
            <button className="btn btn-brand btn-sm" onClick={() => go({ view: "site", page: "contribute" })}><Icon name="plus" size={15} /> গাইড লিখুন</button>
          </div>
        </div>
        {list.length === 0 ? (
          <div className="card" style={{ padding: 44, textAlign: "center" }}>
            <div className="bn" style={{ fontSize: 16, color: "var(--ink-2)" }}>কোনো গাইড পাওয়া যায়নি। কমিউনিটিতে প্রশ্ন করুন!</div>
            <button className="btn btn-brand btn-sm" style={{ marginTop: 14 }} onClick={() => go({ view: "site", page: "forum" })}>প্রশ্ন করুন</button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }} className="course-grid">
            {list.map((g) => <RepairGuideCard key={g.id} g={g} go={go} />)}
          </div>
        )}
      </section>

      {/* CTA row: contribute + forum + experts */}
      <section className="wrap" style={{ padding: "16px 28px 64px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }} id="repair-cta-row">
        {[
          ["edit", "গাইড লিখুন", "আপনার রিপেয়ার জ্ঞান শেয়ার করুন — রিভিউয়ের পর প্রকাশিত হবে।", "গাইড বিল্ডার", () => go({ view: "site", page: "contribute" }), "var(--brand)"],
          ["users", "কমিউনিটি ফোরাম", "সমাধান খুঁজে না পেলে প্রশ্ন করুন — এক্সপার্টরা উত্তর দেবেন।", "প্রশ্ন করুন", () => go({ view: "site", page: "forum" }), "var(--info)"],
          ["play", "লাইভ এক্সপার্ট", "ভিডিও কলে টেকনিশিয়ানের সাথে সরাসরি সমস্যা দেখান।", "এক্সপার্ট বুক করুন", () => go({ view: "site", page: "experts" }), "var(--accent)"],
        ].map(([ic, h, b, btn, fn, color]) => (
          <div key={h} className="card" style={{ padding: 22 }}>
            <div style={{ width: 44, height: 44, borderRadius: 11, background: "var(--paper-2)", color, display: "grid", placeItems: "center", marginBottom: 14 }}><Icon name={ic} size={23} /></div>
            <div className="display bn" style={{ fontSize: 17 }}>{h}</div>
            <p className="bn" style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.55, margin: "7px 0 14px" }}>{b}</p>
            <button className="btn btn-ghost btn-sm" onClick={fn}>{btn} <Icon name="arrow" size={15} /></button>
          </div>
        ))}
      </section>
    </div>
  );
}

/* ---------- Page 2: step-by-step guide ---------- */
function RepairGuidePage({ go, slug }) {
  const R = window.RDATA;
  const g = R.rguides.find((x) => x.slug === slug) || R.rguides[0];
  const cat = window.rcatOf(g);
  const [helpful, setHelpful] = React.useState(null);
  const [saved, setSaved] = React.useState(false);
  const [done, setDone] = React.useState([]);
  const toggleStep = (i) => setDone((d) => d.includes(i) ? d.filter((x) => x !== i) : [...d, i]);
  const relTools = R.tools.filter((t) => t.cat.includes(cat.bn.split(" ")[0]) || (g.cat === "laptop" && t.cat.includes("ল্যাপটপ"))).slice(0, 2);
  const relParts = R.parts.filter((p) => p.guide === g.id).slice(0, 2);

  const ListCard = ({ title, items, icon, color }) => (
    <div className="card" style={{ padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
        <Icon name={icon} size={18} style={{ color: color || "var(--brand)" }} />
        <span className="display bn" style={{ fontSize: 16 }}>{title}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: color || "var(--brand)", marginTop: 8, flexShrink: 0 }} />
            <span className="bn" style={{ fontSize: 14, lineHeight: 1.55 }}>{it}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="wrap" style={{ padding: "26px 28px 80px" }}>
      <button onClick={() => go({ view: "site", page: "repair" })} className="mono" style={{ background: "none", border: "none", color: "var(--ink-3)", fontSize: 12.5, display: "flex", alignItems: "center", gap: 6, padding: 0 }}><Icon name="arrowL" size={15} /> রিপেয়ার হাব</button>

      {/* header */}
      <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <span className="chip" style={{ background: `oklch(0.95 0.04 ${cat.hue})`, color: `oklch(0.42 0.13 ${cat.hue})`, border: "none" }}>{cat.bn}</span>
        <DiffBadge g={g} />
        <span className="badge gray">{g.lang}</span>
      </div>
      <h1 className="display bn" style={{ fontSize: 38, marginTop: 12, lineHeight: 1.15, maxWidth: 780 }}>{g.title}</h1>
      <div className="mono" style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 6 }}>{g.en}</div>

      {/* meta strip */}
      <div className="card" style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(5,1fr)", overflow: "hidden" }} id="guide-meta">
        {[["clock", "সময়", g.time], ["money", "আনুমানিক খরচ", g.cost], ["chart", "সফলতার হার", g.success + "%"], ["eye", "দেখা হয়েছে", (g.views / 1000).toFixed(1) + "k"], ["user", "লেখক", g.authorName]].map(([ic, l, v], i) => (
          <div key={l} style={{ padding: "14px 16px", borderLeft: i ? "1px solid var(--line)" : "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon name={ic} size={13} style={{ color: "var(--ink-3)" }} /><span className="bn" style={{ fontSize: 11, color: "var(--ink-3)" }}>{l}</span></div>
            <div className="display bn" style={{ fontSize: 15, marginTop: 4 }}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 32, marginTop: 26, alignItems: "start" }} className="detail-grid">
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* overview */}
          <div className="card" style={{ padding: 22, background: "var(--brand-soft)", border: "none" }}>
            <div className="display bn" style={{ fontSize: 16, marginBottom: 8, color: "var(--brand-d)" }}>সমস্যার সারসংক্ষেপ</div>
            <p className="bn" style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>{g.overview}</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="course-prog">
            <ListCard title="লক্ষণ" items={g.symptoms} icon="eye" color="var(--info)" />
            <ListCard title="সম্ভাব্য কারণ" items={g.causes} icon="search" color="var(--warn)" />
          </div>

          {/* safety */}
          <div className="card" style={{ padding: 20, background: "oklch(0.58 0.18 25 / 0.07)", border: "1px solid oklch(0.58 0.18 25 / 0.25)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
              <Icon name="shield" size={18} style={{ color: "var(--danger)" }} />
              <span className="display bn" style={{ fontSize: 16, color: "var(--danger)" }}>সতর্কতা — আগে পড়ুন</span>
            </div>
            {g.safety.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start", marginTop: i ? 8 : 0 }}>
                <span className="mono" style={{ color: "var(--danger)", fontSize: 13, fontWeight: 700 }}>!</span>
                <span className="bn" style={{ fontSize: 14, lineHeight: 1.55 }}>{s}</span>
              </div>
            ))}
          </div>

          {/* steps */}
          <div>
            <div className="spread" style={{ margin: "10px 0 14px" }}>
              <h2 className="display bn" style={{ fontSize: 24 }}>ধাপে ধাপে সমাধান</h2>
              <span className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{done.length}/{g.steps.length} সম্পন্ন</span>
            </div>
            <Progress value={(done.length / g.steps.length) * 100} h={8} />
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
              {g.steps.map((s, i) => {
                const isDone = done.includes(i);
                return (
                  <div key={i} className="card" style={{ padding: 20, borderColor: isDone ? "var(--brand)" : "var(--line)", background: isDone ? "var(--brand-soft)" : "var(--card)" }}>
                    <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                      <button onClick={() => toggleStep(i)} style={{ width: 34, height: 34, borderRadius: 10, flexShrink: 0, cursor: "pointer", border: "1.5px solid " + (isDone ? "var(--brand)" : "var(--line)"), background: isDone ? "var(--brand)" : "var(--card)", color: isDone ? "#fff" : "var(--ink)", display: "grid", placeItems: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15 }}>
                        {isDone ? <Icon name="check" size={17} /> : i + 1}
                      </button>
                      <div className="step-img" style={{ width: 180, flexShrink: 0, borderRadius: 10, overflow: "hidden", border: "1px solid var(--line)" }}>
                        <Slot label={`step-${i + 1}.jpg`} h={120} dark style={{ borderRadius: 0 }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 className="display bn" style={{ fontSize: 17.5 }}>{s.t}</h3>
                        <p className="bn" style={{ fontSize: 14.5, lineHeight: 1.7, color: "var(--ink)", margin: "8px 0 0" }}>{s.body}</p>
                        {s.warn && (
                          <div style={{ display: "flex", gap: 9, marginTop: 12, padding: "10px 13px", borderRadius: 10, background: "oklch(0.72 0.15 70 / 0.13)", alignItems: "flex-start" }}>
                            <Icon name="shield" size={15} style={{ color: "oklch(0.5 0.13 65)", flexShrink: 0, marginTop: 2 }} />
                            <span className="bn" style={{ fontSize: 13, lineHeight: 1.5, color: "oklch(0.42 0.12 60)" }}>{s.warn}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="course-prog">
            <ListCard title="সাধারণ ভুল" items={g.mistakes} icon="x" color="var(--danger)" />
            <ListCard title="বিকল্প সমাধান" items={g.alternatives} icon="spark" color="var(--info)" />
          </div>
          <ListCard title="ভবিষ্যতে এড়াতে" items={g.prevention} icon="checkC" color="var(--brand)" />

          {/* helpful + Q&A */}
          <div className="card" style={{ padding: 22 }}>
            <div className="spread" style={{ flexWrap: "wrap", gap: 12 }}>
              <div>
                <div className="display bn" style={{ fontSize: 16 }}>গাইডটি কি কাজে লেগেছে?</div>
                <div className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)", marginTop: 4 }}>{(g.helpful + (helpful === true ? 1 : 0)).toLocaleString()} জনের কাজে লেগেছে · সফলতার হার {g.success}%</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className={"btn btn-sm " + (helpful === true ? "btn-brand" : "btn-ghost")} onClick={() => setHelpful(true)}>👍 হ্যাঁ</button>
                <button className={"btn btn-sm " + (helpful === false ? "btn-dark" : "btn-ghost")} onClick={() => setHelpful(false)}>👎 না</button>
                <button className={"btn btn-sm " + (saved ? "btn-brand" : "btn-ghost")} onClick={() => setSaved(!saved)}><Icon name="heart" size={15} /> {saved ? "সেভড" : "সেভ"}</button>
              </div>
            </div>
            {helpful === false && <div className="bn" style={{ marginTop: 12, fontSize: 13.5, color: "var(--ink-2)", padding: "11px 14px", background: "var(--paper-2)", borderRadius: 10 }}>দুঃখিত! <span style={{ color: "var(--brand-d)", fontWeight: 600, cursor: "pointer" }} onClick={() => go({ view: "site", page: "forum" })}>ফোরামে প্রশ্ন করুন</span> বা <span style={{ color: "var(--accent-d)", fontWeight: 600, cursor: "pointer" }} onClick={() => go({ view: "site", page: "experts" })}>লাইভ এক্সপার্টের</span> সাহায্য নিন।</div>}
          </div>

          {g.qa.length > 0 && (
            <div className="card" style={{ padding: 22 }}>
              <div className="display bn" style={{ fontSize: 17, marginBottom: 14 }}>প্রশ্নোত্তর</div>
              {g.qa.map((qa, i) => (
                <div key={i} style={{ borderTop: i ? "1px solid var(--line)" : "none", paddingTop: i ? 14 : 0 }}>
                  <div className="bn display" style={{ fontSize: 14.5 }}>প্র: {qa.q}</div>
                  <div style={{ display: "flex", gap: 10, marginTop: 10, padding: "12px 14px", background: "var(--paper-2)", borderRadius: 10 }}>
                    <Icon name="checkC" size={16} style={{ color: "var(--brand)", flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <p className="bn" style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>{qa.a}</p>
                      <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 6 }}>{qa.by} {qa.expert && <span className="badge green" style={{ marginLeft: 4 }}>Expert</span>}</div>
                    </div>
                  </div>
                </div>
              ))}
              <button className="btn btn-ghost btn-sm" style={{ marginTop: 14 }} onClick={() => go({ view: "site", page: "forum" })}>প্রশ্ন করুন <Icon name="arrow" size={14} /></button>
            </div>
          )}
        </div>

        {/* sidebar: tools, parts, expert escalation */}
        <aside style={{ position: "sticky", top: 88, display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card" style={{ padding: 18 }}>
            <div className="kicker" style={{ marginBottom: 12 }}>প্রয়োজনীয় টুলস</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {g.tools.map((t) => (
                <div key={t} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
                  <Icon name="wrench" size={14} style={{ color: "var(--brand-d)", marginTop: 3, flexShrink: 0 }} />
                  <span className="bn" style={{ fontSize: 13.5, lineHeight: 1.45 }}>{t}</span>
                </div>
              ))}
            </div>
            {relTools.length > 0 && <button className="btn btn-soft btn-sm" style={{ width: "100%", marginTop: 14 }} onClick={() => go({ view: "site", page: "store" })}><Icon name="cart" size={15} /> টুলস কিনুন</button>}
          </div>
          {relParts.length > 0 && (
            <div className="card" style={{ padding: 18 }}>
              <div className="kicker" style={{ marginBottom: 12 }}>সম্পর্কিত পার্টস</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {relParts.map((p) => (
                  <div key={p.id} onClick={() => go({ view: "site", page: "parts" })} style={{ cursor: "pointer", padding: "11px 13px", border: "1px solid var(--line)", borderRadius: 11 }}>
                    <div className="display bn" style={{ fontSize: 13.5, lineHeight: 1.3 }}>{p.name}</div>
                    <div className="spread" style={{ marginTop: 7 }}>
                      <span className="display" style={{ fontSize: 14, color: "var(--accent-d)" }}>{window.taka(p.price)}</span>
                      <span className="badge green" style={{ fontSize: 9.5 }}>{p.genuine}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="card" style={{ padding: 18, background: "var(--ink)", color: "#fff", border: "none" }}>
            <div className="display bn" style={{ fontSize: 15 }}>নিজে পারছেন না?</div>
            <p className="bn" style={{ fontSize: 12.5, color: "oklch(0.78 0.01 260)", margin: "7px 0 12px", lineHeight: 1.5 }}>ভিডিও কলে এক্সপার্ট দেখিয়ে দেবেন, অথবা টেকনিশিয়ান বাসায় আসবেন।</p>
            <button className="btn btn-accent btn-sm" style={{ width: "100%" }} onClick={() => go({ view: "site", page: "experts" })}>লাইভ এক্সপার্ট ৳১৯৯ থেকে</button>
            <button className="btn btn-sm" style={{ width: "100%", marginTop: 8, background: "oklch(0.34 0.03 260)", color: "#fff" }} onClick={() => go({ view: "site", page: "services" })}>টেকনিশিয়ান বুক করুন</button>
          </div>
          <div className="card" style={{ padding: 18, background: "var(--brand-soft)", border: "none" }}>
            <div className="display bn" style={{ fontSize: 14.5 }}>এই কাজ পেশা বানাতে চান?</div>
            <p className="bn" style={{ fontSize: 12.5, color: "var(--brand-d)", margin: "6px 0 12px", lineHeight: 1.5 }}>হাতে-কলমে রিপেয়ার শিখুন আমাদের কোর্সে।</p>
            <button className="btn btn-brand btn-sm" style={{ width: "100%" }} onClick={() => go({ view: "site", page: "browse", id: "hardware" })}>রিপেয়ার কোর্স দেখুন</button>
          </div>
        </aside>
      </div>
    </div>
  );
}

Object.assign(window, { RepairHub, RepairGuidePage, RepairGuideCard, DiffBadge });
