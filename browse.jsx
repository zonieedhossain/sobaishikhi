/* SobaiShikhi — Browse / search results */
function BrowsePage({ go, catId, query }) {
  const D = window.DATA;
  const [cat, setCat] = React.useState(catId || "all");
  const [level, setLevel] = React.useState("All");
  const [sort, setSort] = React.useState("Popular");
  const [q, setQ] = React.useState(query || "");
  React.useEffect(() => { if (catId) setCat(catId); }, [catId]);
  React.useEffect(() => { if (query != null) setQ(query); }, [query]);

  let list = D.courses.filter((c) => c.status === "published");
  if (cat !== "all") list = list.filter((c) => c.cat === cat);
  if (level !== "All") list = list.filter((c) => c.level === level || c.level === "All levels");
  if (q.trim()) {
    const s = q.toLowerCase();
    list = list.filter((c) => (c.title + c.titleBn + window.instrOf(c).name).toLowerCase().includes(s));
  }
  if (sort === "Rating") list = [...list].sort((a, b) => b.rating - a.rating);
  if (sort === "Price: low") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "Newest") list = [...list].sort((a, b) => b.students - a.students);

  const activeCat = cat === "all" ? null : window.byId(D.categories, cat);

  return (
    <div className="wrap" style={{ padding: "32px 28px 80px" }}>
      <div className="mono" style={{ fontSize: 12, color: "var(--ink-3)", marginBottom: 10 }}>
        <span style={{ cursor: "pointer" }} onClick={() => go({ view: "site", page: "home" })}>Home</span> / {activeCat ? activeCat.name : "All courses"}
      </div>
      <h1 className="display bn" style={{ fontSize: 38 }}>{activeCat ? activeCat.bn : "সব কোর্স"}</h1>
      <p className="mono" style={{ color: "var(--ink-3)", fontSize: 13.5, marginTop: 6 }}>{list.length} courses{q.trim() ? ` · "${q}"` : ""}</p>

      {/* search + sort row */}
      <div style={{ display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 240, position: "relative" }}>
          <Icon name="search" size={18} style={{ position: "absolute", left: 14, top: 12, color: "var(--ink-3)" }} />
          <input className="input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="কোর্স খুঁজুন…" style={{ padding: "10px 14px 10px 42px", borderRadius: 999 }} />
        </div>
        <select className="select" value={sort} onChange={(e) => setSort(e.target.value)} style={{ width: "auto", borderRadius: 999 }}>
          {["Popular", "Rating", "Newest", "Price: low"].map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "230px 1fr", gap: 28, marginTop: 26 }} className="browse-grid">
        {/* filters */}
        <aside className="browse-side">
          <div className="card" style={{ padding: 18 }}>
            <div className="kicker" style={{ marginBottom: 12 }}>Category</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[{ id: "all", bn: "সব কোর্স", name: "All" }, ...D.categories].map((ct) => (
                <button key={ct.id} onClick={() => setCat(ct.id)} className="bn" style={{
                  textAlign: "left", background: cat === ct.id ? "var(--brand-soft)" : "transparent", color: cat === ct.id ? "var(--brand-d)" : "var(--ink-2)",
                  border: "none", borderRadius: 8, padding: "8px 10px", fontSize: 14, cursor: "pointer", fontWeight: cat === ct.id ? 600 : 400 }}>
                  {ct.bn}
                </button>
              ))}
            </div>
            <div className="kicker" style={{ margin: "18px 0 10px" }}>Level</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {["All", "Beginner", "Intermediate", "Advanced"].map((lv) => (
                <button key={lv} onClick={() => setLevel(lv)} className="mono" style={{ padding: "6px 11px", borderRadius: 999, fontSize: 12,
                  border: "1px solid " + (level === lv ? "var(--ink)" : "var(--line)"), background: level === lv ? "var(--ink)" : "var(--card)", color: level === lv ? "var(--ink-inv)" : "var(--ink-2)" }}>{lv}</button>
              ))}
            </div>
          </div>
        </aside>

        {/* results */}
        <div>
          {list.length === 0 ? (
            <div className="card" style={{ padding: 48, textAlign: "center" }}>
              <div className="bn" style={{ fontSize: 17, color: "var(--ink-2)" }}>কোনো কোর্স পাওয়া যায়নি।</div>
              <button className="btn btn-ghost btn-sm" style={{ marginTop: 14 }} onClick={() => { setCat("all"); setLevel("All"); setQ(""); }}>ফিল্টার মুছুন</button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }} className="course-grid">
              {list.map((c) => <CourseCard key={c.id} c={c} go={go} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Simple Signup ---------- */
function Signup({ go }) {
  const [role, setRole] = React.useState("learner");
  return (
    <div className="wrap center" style={{ padding: "56px 28px 90px" }}>
      <div className="card" style={{ width: "100%", maxWidth: 460, padding: 34 }}>
        <Logo size={22} />
        <h1 className="display bn" style={{ fontSize: 26, marginTop: 22 }}>একাউন্ট তৈরি করুন</h1>
        <p className="bn" style={{ color: "var(--ink-3)", fontSize: 14, marginTop: 4 }}>শেখা শুরু করুন, অথবা নিজের কোর্স বানান।</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "22px 0" }}>
          {[["learner", "শিখতে চাই", "user"], ["instructor", "শেখাতে চাই", "teacher"]].map(([r, label, ic]) => (
            <button key={r} onClick={() => setRole(r)} style={{ padding: 16, borderRadius: 12, cursor: "pointer", textAlign: "left",
              border: "1.5px solid " + (role === r ? "var(--brand)" : "var(--line)"), background: role === r ? "var(--brand-soft)" : "var(--card)" }}>
              <Icon name={ic} size={22} style={{ color: "var(--brand-d)" }} />
              <div className="bn display" style={{ fontSize: 15, marginTop: 8 }}>{label}</div>
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="field"><label>Full name</label><input className="input" placeholder="আপনার নাম" /></div>
          <div className="field"><label>Mobile</label><input className="input" placeholder="01XXXXXXXXX" /></div>
          <div className="field"><label>Password</label><input className="input" type="password" placeholder="••••••••" /></div>
        </div>
        <button className="btn btn-accent btn-lg" style={{ width: "100%", marginTop: 20 }}
          onClick={() => go({ view: role === "instructor" ? "instructor" : "learner" })}>
          একাউন্ট তৈরি করুন <Icon name="arrow" size={18} />
        </button>
        <div className="bn" style={{ textAlign: "center", fontSize: 13.5, color: "var(--ink-3)", marginTop: 16 }}>
          ইতিমধ্যে একাউন্ট আছে? <span style={{ color: "var(--brand-d)", cursor: "pointer", fontWeight: 600 }} onClick={() => go({ view: "learner" })}>লগ ইন</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { BrowsePage, Signup });
