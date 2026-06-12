/* SobaiShikhi — Tools & Spare Parts marketplaces */

function SellerBadge({ type }) {
  if (type === "official") return <span className="badge green"><Icon name="checkC" size={11} /> SobaiShikhi Store</span>;
  if (type === "verified") return <span className="badge blue"><Icon name="shield" size={11} /> Verified Vendor</span>;
  return <span className="badge gray">Independent</span>;
}

function ProductCard({ p, go, isPart }) {
  const [added, setAdded] = React.useState(false);
  return (
    <div className="card" style={{ overflow: "hidden", display: "flex", flexDirection: "column", transition: "transform .14s, box-shadow .14s" }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "var(--shadow-lg)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
      <div style={{ position: "relative" }}>
        <Slot label={`${p.brand} product photo`} h={140} style={{ borderRadius: 0 }} />
        <span className="chip" style={{ position: "absolute", top: 10, left: 10, background: `oklch(0.95 0.04 ${p.hue})`, color: `oklch(0.42 0.13 ${p.hue})`, border: "none", fontSize: 10 }}>{p.cat}</span>
        {p.stock === "Low stock" && <span className="badge amber" style={{ position: "absolute", top: 10, right: 10 }}>শেষ পর্যায়ে</span>}
        {p.genuine && <span className={"badge " + (p.genuine === "Genuine" ? "green" : "blue")} style={{ position: "absolute", bottom: 10, left: 10 }}>{p.genuine}</span>}
      </div>
      <div style={{ padding: 15, display: "flex", flexDirection: "column", gap: 7, flex: 1 }}>
        <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)" }}>{p.brand}</div>
        <div className="display bn" style={{ fontSize: 15, lineHeight: 1.3 }}>{p.name}</div>
        <Stars value={p.rating} size={12} showNum count={p.ratings} />
        {isPart && (
          <div className="bn" style={{ fontSize: 11.5, color: "var(--ink-3)", display: "flex", flexDirection: "column", gap: 3 }}>
            <span>📱 {p.compat}</span>
            <span>🛡 ওয়ারেন্টি {p.warranty} · ইনস্টল: {p.difficulty}</span>
          </div>
        )}
        <div style={{ marginTop: "auto" }}>
          <div className="spread" style={{ paddingTop: 6 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span className="display" style={{ fontSize: 18, color: "var(--accent-d)" }}>{window.taka(p.price)}</span>
              <span className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)", textDecoration: "line-through" }}>{window.taka(p.oldPrice)}</span>
            </div>
          </div>
          <div className="spread" style={{ marginTop: 8 }}>
            <SellerBadge type={p.sellerType || "verified"} />
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 11 }}>
            <button className={"btn btn-sm " + (added ? "btn-brand" : "btn-accent")} style={{ flex: 1 }} onClick={() => setAdded(!added)}>
              {added ? <><Icon name="check" size={14} /> কার্টে আছে</> : <><Icon name="cart" size={14} /> কার্টে দিন</>}
            </button>
            {isPart && p.guide && <button className="btn btn-ghost btn-sm" onClick={() => { const g = window.RDATA.rguides.find(x => x.id === p.guide); go({ view: "site", page: "repair-guide", id: g ? g.slug : undefined }); }} title="রিপেয়ার গাইড"><Icon name="book" size={14} /></button>}
          </div>
        </div>
      </div>
    </div>
  );
}

function StorePage({ go, kind }) {
  const R = window.RDATA;
  const isPart = kind === "parts";
  const items = isPart ? R.parts : R.tools;
  const [cat, setCat] = React.useState("all");
  const [q, setQ] = React.useState("");
  const cats = ["all", ...new Set(items.map((p) => p.cat))];
  let list = items.filter((p) => cat === "all" || p.cat === cat);
  if (q.trim()) list = list.filter((p) => (p.name + p.brand + (p.compat || "")).toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      {/* store hero */}
      <section style={{ background: isPart ? "linear-gradient(120deg, oklch(0.95 0.04 250), oklch(0.97 0.02 168))" : "linear-gradient(120deg, var(--brand-soft), oklch(0.96 0.03 80))", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap" style={{ padding: "40px 28px", display: "flex", alignItems: "center", gap: 30, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <span className="chip" style={{ background: "#fff", border: "1px solid var(--line)" }}><Icon name={isPart ? "chip" : "wrench"} size={13} /> {isPart ? "স্পেয়ার পার্টস" : "টুলস ও যন্ত্রপাতি"}</span>
            <h1 className="display bn" style={{ fontSize: 36, marginTop: 12 }}>{isPart ? "অরিজিনাল পার্টস, যাচাইকৃত বিক্রেতা" : "প্রফেশনাল রিপেয়ার টুলস"}</h1>
            <p className="bn" style={{ color: "var(--ink-2)", fontSize: 15, marginTop: 8, maxWidth: 520, lineHeight: 1.55 }}>
              {isPart ? "কম্প্যাটিবিলিটি তথ্য, ওয়ারেন্টি আর ইনস্টলেশন গাইডসহ — ভুল পার্টস কেনার দিন শেষ।" : "শেখার জন্য, কাজের জন্য — প্রতিটি টুল কোর্স আর গাইডের সাথে মিলিয়ে বাছাই করা।"}
            </p>
            <div style={{ display: "flex", gap: 16, marginTop: 16, flexWrap: "wrap" }}>
              {[["shield", "এসক্রো পেমেন্ট সুরক্ষা"], ["checkC", "৭ দিনের রিটার্ন"], ["wrench", "গাইড-লিংকড প্রোডাক্ট"]].map(([ic, t]) => (
                <span key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon name={ic} size={14} style={{ color: "var(--brand-d)" }} /><span className="bn" style={{ fontSize: 12.5 }}>{t}</span></span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className={"btn " + (!isPart ? "btn-dark" : "btn-ghost")} onClick={() => go({ view: "site", page: "store" })}><Icon name="wrench" size={16} /> টুলস</button>
            <button className={"btn " + (isPart ? "btn-dark" : "btn-ghost")} onClick={() => go({ view: "site", page: "parts" })}><Icon name="chip" size={16} /> পার্টস</button>
          </div>
        </div>
      </section>

      <div className="wrap" style={{ padding: "26px 28px 70px" }}>
        {/* compatibility checker for parts */}
        {isPart && (
          <div className="card" style={{ padding: "16px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", background: "var(--ink)", border: "none" }}>
            <Icon name="search" size={20} style={{ color: "var(--accent)" }} />
            <div style={{ flex: 1, minWidth: 200 }}>
              <div className="display bn" style={{ fontSize: 15, color: "#fff" }}>কম্প্যাটিবিলিটি চেকার</div>
              <div className="bn" style={{ fontSize: 12, color: "oklch(0.75 0.01 260)" }}>আপনার ডিভাইসের মডেল দিন — শুধু মানানসই পার্টস দেখাব।</div>
            </div>
            <div style={{ display: "flex", gap: 8, flex: 1, minWidth: 260 }}>
              <input className="input bn" value={q} onChange={(e) => setQ(e.target.value)} placeholder="যেমন: iPhone 13, Pulsar 150…" style={{ background: "oklch(0.34 0.03 260)", border: "none", color: "#fff" }} />
              <button className="btn btn-accent btn-sm">চেক</button>
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className="bn" style={{ padding: "7px 14px", borderRadius: 999, fontSize: 13, cursor: "pointer", border: "1px solid " + (cat === c ? "var(--ink)" : "var(--line)"), background: cat === c ? "var(--ink)" : "var(--card)", color: cat === c ? "#fff" : "var(--ink-2)" }}>{c === "all" ? "সব" : c}</button>
          ))}
          {!isPart && (
            <div style={{ marginLeft: "auto", position: "relative", minWidth: 220 }}>
              <Icon name="search" size={16} style={{ position: "absolute", left: 12, top: 10, color: "var(--ink-3)" }} />
              <input className="input bn" value={q} onChange={(e) => setQ(e.target.value)} placeholder="টুল খুঁজুন…" style={{ padding: "8px 12px 8px 36px", fontSize: 13.5, borderRadius: 999 }} />
            </div>
          )}
        </div>

        {list.length === 0 ? (
          <div className="card" style={{ padding: 44, textAlign: "center" }}><div className="bn" style={{ color: "var(--ink-2)" }}>কিছু পাওয়া যায়নি — অন্য কিওয়ার্ড চেষ্টা করুন।</div></div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }} className="course-grid">
            {list.map((p) => <ProductCard key={p.id} p={p} go={go} isPart={isPart} />)}
          </div>
        )}

        {/* seller types strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginTop: 36 }} id="seller-types">
          {[
            ["green", "SobaiShikhi Store", "নিজস্ব স্টক, দ্রুত ডেলিভারি"],
            ["blue", "Verified Vendors", "পরিচয় ও মান যাচাইকৃত"],
            ["violet", "Authorized Distributors", "ব্র্যান্ডের অনুমোদিত"],
            ["gray", "Independent Sellers", "রেটিং দেখে কিনুন"],
          ].map(([c, t, d]) => (
            <div key={t} className="card" style={{ padding: 16 }}>
              <span className={"badge " + c}>{t}</span>
              <div className="bn" style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 8 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { StorePage, ProductCard, SellerBadge });
