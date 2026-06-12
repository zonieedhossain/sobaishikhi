/* SobaiShikhi — Vendor panel (product upload → admin review) + Expert consultation console */

function PanelBar({ go, name, sub, initials, label, hue }) {
  return (
    <header style={{ background: "var(--card)", borderBottom: "1px solid var(--line)", position: "sticky", top: 0, zIndex: 30 }}>
      <div className="wrap spread" style={{ height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Logo size={20} onClick={() => go({ view: "site", page: "home" })} />
          <span className="chip">{label}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button className="btn btn-ghost btn-sm" style={{ width: 38, height: 38, padding: 0 }}><Icon name="bell" size={18} /></button>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <Avatar initials={initials} size={34} hue={hue} />
            <div style={{ lineHeight: 1.15 }}><div className="display" style={{ fontSize: 14 }}>{name}</div><div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)" }}>{sub}</div></div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ================= VENDOR PANEL ================= */
function VendorPanel({ go }) {
  const R = window.RDATA;
  const [tab, setTab] = React.useState("overview");
  const [submitted, setSubmitted] = React.useState(false);
  const [form, setForm] = React.useState({ name: "", brand: "", cat: "", price: "", stock: "" });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const myLive = R.tools.filter((t) => t.seller === "TechMart BD");
  const myPending = R.pendingProducts;
  const orders = [
    ["ORD-8841", "ডিজিটাল মাল্টিমিটার DT-9205A", "Sabbir Ahmed", 950, "Shipped"],
    ["ORD-8839", "থার্মাল পেস্ট MX-4 (4g)", "Mim Akter", 750, "Delivered"],
    ["ORD-8835", "থার্মাল পেস্ট MX-4 (4g)", "Hasan Mahmud", 750, "Delivered"],
    ["ORD-8830", "ডিজিটাল মাল্টিমিটার DT-9205A", "Tania Sultana", 950, "Processing"],
  ];
  const tabs = [["overview", "Overview", "grid"], ["products", "My Products", "cart"], ["add", "Add Product", "plus"], ["orders", "Orders", "card"]];

  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)" }}>
      <PanelBar go={go} name="TechMart BD" sub="Verified Vendor" initials="TM" label="Vendor Panel" hue={150} />
      <div className="wrap" style={{ padding: "24px 28px 80px" }}>
        <div style={{ display: "flex", gap: 6, borderBottom: "1px solid var(--line)", marginBottom: 26, flexWrap: "wrap" }}>
          {tabs.map(([id, label, ic]) => (
            <button key={id} onClick={() => { setTab(id); setSubmitted(false); }} style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", border: "none", background: "none", cursor: "pointer", fontFamily: "var(--font-display)", fontSize: 14.5, fontWeight: tab === id ? 600 : 400, color: tab === id ? "var(--ink)" : "var(--ink-3)", borderBottom: "2.5px solid " + (tab === id ? "var(--accent)" : "transparent"), marginBottom: -1 }}>
              <Icon name={ic} size={16} /> {label}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <div>
            <div className="card" style={{ padding: "14px 18px", marginBottom: 16, background: "var(--accent-soft)", border: "1px solid oklch(0.8 0.08 45)", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <Icon name="clock" size={20} style={{ color: "var(--accent-d)" }} />
              <span className="bn" style={{ fontSize: 14, flex: 1 }}><strong>{myPending.length}টি প্রোডাক্ট</strong> অ্যাডমিন রিভিউয়ে আছে — অনুমোদনের পর স্টোরে দেখা যাবে।</span>
              <button className="btn btn-ghost btn-sm" onClick={() => setTab("products")}>View</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }} id="contrib-stats">
              <Stat label="Revenue · Jun" value={window.taka(84500)} sub="+12% vs May"><span className="badge green">+12%</span></Stat>
              <Stat label="Orders · Jun" value="96" sub="4 processing" />
              <Stat label="Live products" value={myLive.length} sub={`${myPending.length} under review`} />
              <Stat label="Store rating" value="4.7" sub="312 reviews"><Stars value={4.7} size={12} /></Stat>
            </div>
            <div className="card" style={{ marginTop: 16, overflow: "hidden" }}>
              <div style={{ padding: "16px 22px" }} className="display">Recent orders</div>
              <VTable head={["Order", "Product", "Buyer", "Amount", "Status"]}>
                {orders.map((o) => (
                  <tr key={o[0]}>
                    <VTd mono>{o[0]}</VTd><VTd><span className="bn">{o[1]}</span></VTd><VTd>{o[2]}</VTd><VTd mono>{window.taka(o[3])}</VTd>
                    <VTd><span className={"badge " + (o[4] === "Delivered" ? "green" : o[4] === "Shipped" ? "blue" : "amber")}>{o[4]}</span></VTd>
                  </tr>
                ))}
              </VTable>
            </div>
          </div>
        )}

        {tab === "products" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[...myPending, ...myLive].map((p) => (
              <div key={p.id} className="card" style={{ padding: 16, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <Slot label="photo" h={56} style={{ width: 84, borderRadius: 9, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div className="display bn" style={{ fontSize: 15 }}>{p.name}</div>
                  <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 4 }}>{p.brand} · {window.taka(p.price)} {p.status !== "under_review" && `· ${p.ratings} reviews`}</div>
                </div>
                <StatusPill status={p.status || "published"} />
                <button className="btn btn-ghost btn-sm"><Icon name="edit" size={14} /> Edit</button>
              </div>
            ))}
          </div>
        )}

        {tab === "add" && (submitted ? (
          <div className="center" style={{ flexDirection: "column", padding: "60px 0", textAlign: "center", gap: 14 }}>
            <div style={{ width: 66, height: 66, borderRadius: 999, background: "var(--brand-soft)", color: "var(--brand-d)", display: "grid", placeItems: "center" }}><Icon name="checkC" size={34} /></div>
            <h2 className="display bn" style={{ fontSize: 26 }}>রিভিউয়ের জন্য জমা হয়েছে!</h2>
            <p className="bn" style={{ color: "var(--ink-2)", fontSize: 15, maxWidth: 440, lineHeight: 1.6 }}>অ্যাডমিন টিম প্রোডাক্টের তথ্য, ছবি ও দাম যাচাই করবে। অনুমোদনের পর স্টোরে লাইভ হবে — সাধারণত ১ কর্মদিবসে।</p>
            <div className="chip"><Icon name="clock" size={14} /> Status: Under review</div>
            <button className="btn btn-brand btn-sm" onClick={() => setTab("products")}>My products</button>
          </div>
        ) : (
          <div style={{ maxWidth: 680 }}>
            <div className="card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="field"><label>Product name</label><input className="input bn" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="যেমন: সোল্ডারিং আয়রন 60W" /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div className="field"><label>Brand</label><input className="input" value={form.brand} onChange={(e) => set("brand", e.target.value)} placeholder="Brand name" /></div>
                <div className="field"><label>Category</label>
                  <select className="select" value={form.cat} onChange={(e) => set("cat", e.target.value)}>
                    <option value="">Select…</option>
                    {[...new Set(window.RDATA.tools.map((t) => t.cat))].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div className="field"><label>Price (৳)</label><input className="input" value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="950" /></div>
                <div className="field"><label>Stock quantity</label><input className="input" value={form.stock} onChange={(e) => set("stock", e.target.value)} placeholder="50" /></div>
              </div>
              <div className="field"><label>Description</label><textarea className="textarea bn" placeholder="প্রোডাক্টের বিবরণ, স্পেসিফিকেশন, ব্যবহারের নিয়ম…" /></div>
              <div className="field"><label>Photos</label>
                <div style={{ height: 110, borderRadius: 12, border: "1.5px dashed var(--line)", display: "grid", placeItems: "center", background: "var(--paper-2)" }}>
                  <div style={{ textAlign: "center" }}><Icon name="upload" size={24} style={{ color: "var(--ink-3)" }} /><div className="bn" style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 6 }}>প্রোডাক্টের ছবি আপলোড করুন</div></div>
                </div>
              </div>
            </div>
            <div className="spread" style={{ marginTop: 18 }}>
              <span className="bn" style={{ fontSize: 12.5, color: "var(--ink-3)" }}><Icon name="shield" size={13} style={{ verticalAlign: "-2px" }} /> সব প্রোডাক্ট অ্যাডমিন রিভিউয়ের পর লাইভ হয়</span>
              <button className="btn btn-accent" disabled={!form.name || !form.cat || !form.price} onClick={() => setSubmitted(true)}>Submit for review <Icon name="arrow" size={16} /></button>
            </div>
          </div>
        ))}

        {tab === "orders" && (
          <div className="card" style={{ overflow: "hidden" }}>
            <VTable head={["Order", "Product", "Buyer", "Amount", "Status"]}>
              {orders.concat([["ORD-8822", "ডিজিটাল মাল্টিমিটার DT-9205A", "Farhan Rahman", 950, "Delivered"], ["ORD-8815", "থার্মাল পেস্ট MX-4 (4g)", "Nadia Ferdous", 750, "Delivered"]]).map((o) => (
                <tr key={o[0]}>
                  <VTd mono>{o[0]}</VTd><VTd><span className="bn">{o[1]}</span></VTd><VTd>{o[2]}</VTd><VTd mono>{window.taka(o[3])}</VTd>
                  <VTd><span className={"badge " + (o[4] === "Delivered" ? "green" : o[4] === "Shipped" ? "blue" : "amber")}>{o[4]}</span></VTd>
                </tr>
              ))}
            </VTable>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= EXPERT CONSOLE ================= */
function ExpertConsole({ go }) {
  const [tab, setTab] = React.useState("today");
  const [inCall, setInCall] = React.useState(false);
  const [requests, setRequests] = React.useState([
    { id: "rq1", user: "Noman Khan", topic: "ফ্রিজের পেছনে টিকটিক শব্দ", dur: 15, slot: "আজ ৯:৩০ PM", price: 199 },
    { id: "rq2", user: "Nadia Ferdous", topic: "ল্যাপটপ চার্জ হচ্ছে না", dur: 30, slot: "কাল ১১:০০ AM", price: 399 },
  ]);
  const [avail, setAvail] = React.useState({ "সকাল (৯–১২)": true, "দুপুর (১২–৪)": false, "সন্ধ্যা (৬–৯)": true, "রাত (৯–১১)": true });
  const sessions = [
    { time: "8:30 PM", user: "Sabbir Ahmed", initials: "SA", topic: "ফোন চার্জিং সমস্যা — লাইভ ডায়াগনোসিস", dur: 30, status: "next", price: 399 },
    { time: "9:15 PM", user: "Mim Akter", initials: "MA", topic: "রাউটার সেটআপ সাহায্য", dur: 15, status: "upcoming", price: 199 },
  ];
  const act = (id) => setRequests((r) => r.filter((x) => x.id !== id));
  const tabs = [["today", "Today's Calls", "play"], ["requests", "Requests", "bell"], ["guides", "My Guides", "book"], ["posts", "My Posts", "play2"], ["availability", "Availability", "cal"], ["earnings", "Earnings", "money"]];

  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)" }}>
      <PanelBar go={go} name="Rakibul Islam" sub="টেকনিশিয়ান · Expert" initials="RI" label="Expert Console" hue={250} />
      <div className="wrap" style={{ padding: "24px 28px 80px" }}>
        <div style={{ display: "flex", gap: 6, borderBottom: "1px solid var(--line)", marginBottom: 26, flexWrap: "wrap" }}>
          {tabs.map(([id, label, ic]) => (
            <button key={id} onClick={() => setTab(id)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", border: "none", background: "none", cursor: "pointer", fontFamily: "var(--font-display)", fontSize: 14.5, fontWeight: tab === id ? 600 : 400, color: tab === id ? "var(--ink)" : "var(--ink-3)", borderBottom: "2.5px solid " + (tab === id ? "var(--accent)" : "transparent"), marginBottom: -1 }}>
              <Icon name={ic} size={16} /> {label}
              {id === "requests" && requests.length > 0 && <span className="badge amber">{requests.length}</span>}
            </button>
          ))}
        </div>

        {tab === "today" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 18 }} id="contrib-stats">
              <Stat label="Today's sessions" value="5" sub="2 remaining" />
              <Stat label="This month" value="64" sub="sessions completed" />
              <Stat label="Earnings · Jun" value={window.taka(23800)} sub="after commission"><span className="badge green">+18%</span></Stat>
              <Stat label="Rating" value="4.9" sub="1,840 sessions"><Stars value={4.9} size={12} /></Stat>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {sessions.map((s) => (
                <div key={s.time} className="card" style={{ padding: 18, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", borderColor: s.status === "next" ? "var(--accent)" : "var(--line)" }}>
                  <div style={{ textAlign: "center", width: 70 }}>
                    <div className="display" style={{ fontSize: 17 }}>{s.time}</div>
                    <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)" }}>{s.dur} min</div>
                  </div>
                  <div style={{ width: 1, height: 40, background: "var(--line)" }} />
                  <Avatar initials={s.initials} size={40} />
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div className="display" style={{ fontSize: 15 }}>{s.user}</div>
                    <div className="bn" style={{ fontSize: 13, color: "var(--ink-2)", marginTop: 2 }}>{s.topic}</div>
                  </div>
                  <span className="mono" style={{ fontSize: 12.5, color: "var(--brand-d)" }}>{window.taka(s.price)}</span>
                  {s.status === "next" ? (
                    <button className="btn btn-accent btn-sm" onClick={() => setInCall(true)}><Icon name="play" size={15} /> Join call</button>
                  ) : (
                    <span className="badge gray">Upcoming</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "requests" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 720 }}>
            {requests.length === 0 ? (
              <div className="card" style={{ padding: 40, textAlign: "center" }}><span className="bn" style={{ color: "var(--ink-3)" }}>কোনো নতুন রিকোয়েস্ট নেই।</span></div>
            ) : requests.map((r) => (
              <div key={r.id} className="card" style={{ padding: 18, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <Avatar initials={r.user.split(" ").map(w => w[0]).join("")} size={40} />
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div className="display" style={{ fontSize: 15 }}>{r.user}</div>
                  <div className="bn" style={{ fontSize: 13, color: "var(--ink-2)", marginTop: 2 }}>{r.topic}</div>
                  <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 4 }}>{r.slot} · {r.dur} min · {window.taka(r.price)}</div>
                </div>
                <button className="btn btn-brand btn-sm" onClick={() => act(r.id)}><Icon name="check" size={14} /> Accept</button>
                <button className="btn btn-ghost btn-sm" onClick={() => act(r.id)}>Decline</button>
              </div>
            ))}
          </div>
        )}

        {tab === "guides" && (
          <div>
            <div className="card" style={{ padding: "14px 18px", marginBottom: 20, background: "var(--brand-soft)", border: "none", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <Icon name="book" size={20} style={{ color: "var(--brand-d)" }} />
              <span className="bn" style={{ fontSize: 14, flex: 1 }}>এখান থেকে লেখা গাইড রিপেয়ার হাবের <strong>"জনপ্রিয় সমাধান"</strong>-এ দেখা যাবে — অ্যাডমিন অনুমোদনের পর।</span>
            </div>
            <ContributePage go={go} embedded />
          </div>
        )}

        {tab === "posts" && (
          <div style={{ maxWidth: 760 }}>
            <div className="card" style={{ padding: "14px 18px", marginBottom: 20, background: "var(--brand-soft)", border: "none", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <Icon name="play2" size={20} style={{ color: "var(--brand-d)" }} />
              <span className="bn" style={{ fontSize: 14, flex: 1 }}>এখান থেকে পোস্ট করা ভ্লগ/আর্টিকেল সাইটের <strong>Blog</strong> সেকশনে দেখা যাবে — অ্যাডমিন অনুমোদনের পর।</span>
            </div>
            <BlogStudio go={go} authorId="in5" />
          </div>
        )}

        {tab === "availability" && (
          <div style={{ maxWidth: 560 }}>
            <div className="card" style={{ padding: 24 }}>
              <div className="display bn" style={{ fontSize: 17, marginBottom: 6 }}>কখন কল নেবেন?</div>
              <p className="bn" style={{ fontSize: 13, color: "var(--ink-3)", margin: "0 0 16px" }}>বন্ধ স্লটে শিক্ষার্থীরা বুক করতে পারবে না।</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {Object.entries(avail).map(([slot, on]) => (
                  <button key={slot} onClick={() => setAvail((a) => ({ ...a, [slot]: !a[slot] }))} className="spread" style={{ padding: "13px 16px", borderRadius: 12, border: "1.5px solid " + (on ? "var(--brand)" : "var(--line)"), background: on ? "var(--brand-soft)" : "var(--card)", cursor: "pointer" }}>
                    <span className="bn display" style={{ fontSize: 14.5 }}>{slot}</span>
                    <span className={"badge " + (on ? "green" : "gray")}>{on ? "Available" : "Off"}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "earnings" && (
          <div style={{ maxWidth: 760 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
              <div className="card" style={{ padding: 22, background: "var(--brand)", color: "#fff", border: "none" }}>
                <div className="bn" style={{ fontSize: 13, opacity: .9 }}>Withdrawable</div>
                <div className="display" style={{ fontSize: 30, marginTop: 6 }}>{window.taka(23800)}</div>
                <button className="btn btn-sm" style={{ background: "#fff", color: "var(--brand-d)", marginTop: 14, width: "100%" }}>Withdraw to bKash</button>
              </div>
              <Stat label="Lifetime earnings" value={window.taka(412000)} sub="1,840 sessions" />
              <Stat label="Commission" value="15%" sub="platform share" />
            </div>
          </div>
        )}
      </div>

      {/* mock live call */}
      {inCall && (
        <div style={{ position: "fixed", inset: 0, background: "oklch(0.18 0.015 260)", zIndex: 90, display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, position: "relative", margin: 18, borderRadius: 18, overflow: "hidden" }}>
            <Slot label="user camera — ফোনের চার্জিং পোর্ট দেখাচ্ছেন" h="100%" dark style={{ borderRadius: 0, minHeight: 300 }} />
            <div style={{ position: "absolute", bottom: 16, right: 16, width: 180, borderRadius: 12, overflow: "hidden", border: "2px solid oklch(0.4 0.01 260)" }}>
              <Slot label="you" h={110} dark style={{ borderRadius: 0 }} />
            </div>
            <div style={{ position: "absolute", top: 14, left: 14, display: "flex", gap: 8 }}>
              <span className="chip" style={{ background: "oklch(0.25 0.02 260 / 0.8)", color: "#fff", border: "none" }}><span style={{ width: 7, height: 7, borderRadius: 999, background: "var(--danger)" }} /> REC · 04:12</span>
              <span className="chip" style={{ background: "oklch(0.25 0.02 260 / 0.8)", color: "#fff", border: "none" }}>Sabbir Ahmed · 30 min</span>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, padding: "0 18px 22px" }}>
            {[["bell", "Mute"], ["play", "Video"], ["laptop", "Share"], ["book", "Notes"]].map(([ic, t]) => (
              <button key={t} title={t} style={{ width: 50, height: 50, borderRadius: 999, border: "none", background: "oklch(0.3 0.02 260)", color: "#fff", cursor: "pointer", display: "grid", placeItems: "center" }}><Icon name={ic} size={20} /></button>
            ))}
            <button onClick={() => setInCall(false)} style={{ height: 50, padding: "0 26px", borderRadius: 999, border: "none", background: "var(--danger)", color: "#fff", cursor: "pointer", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14.5 }}>End call</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* small table helpers (scoped names to avoid collisions with admin.jsx) */
function VTable({ head, children }) {
  return (
    <div className="scroll" style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
        <thead><tr style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", background: "var(--paper-2)" }}>
          {head.map((h, i) => <th key={i} className="kicker" style={{ textAlign: "left", padding: "10px 18px", fontWeight: 400 }}>{h}</th>)}
        </tr></thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
function VTd({ children, mono }) {
  return <td style={{ padding: "12px 18px", borderBottom: "1px solid var(--line-2)", fontSize: 13.5, verticalAlign: "middle" }} className={mono ? "mono" : ""}>{children}</td>;
}

Object.assign(window, { VendorPanel, ExpertConsole, PanelBar });
