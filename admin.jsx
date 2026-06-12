/* SobaiShikhi — Admin panel */
function AdminApp({ go, layout }) {
  const [section, setSection] = React.useState("overview");
  const [toast, setToast] = React.useState(null);
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2600); };

  const nav = [
    ["overview", "Overview", "chart"],
    ["review", "Review Center", "shield"],
    ["courses", "Courses", "play2"],
    ["products", "Products", "cart"],
    ["blogs", "Blog & Vlogs", "book"],
    ["orders", "Orders", "card"],
    ["instructors", "Instructors", "teacher"],
    ["learners", "Learners", "users"],
    ["payouts", "Payouts", "money"],
    ["categories", "Categories", "grid"],
    ["settings", "Platform Settings", "wrench"],
  ];
  const topnav = layout === "topnav";
  const R = window.RDATA;
  const queueCount = window.DATA.courses.filter((c) => c.status === "under_review" || c.status === "revision").length
    + R.rguides.filter((g) => g.status === "under_review").length
    + R.pendingProducts.length
    + R.blogs.filter((b) => b.status === "under_review").length
    + R.forumQueue.length + R.pendingTechs.length
    + window.DATA.instructors.filter((i) => !i.verified).length;

  const NavItem = ({ id, label, icon, horiz }) => {
    const active = section === id;
    return (
      <button onClick={() => setSection(id)} style={{
        display: "flex", alignItems: "center", gap: 11, width: horiz ? "auto" : "100%",
        padding: horiz ? "9px 13px" : "10px 12px", borderRadius: 9, border: "none", textAlign: "left",
        background: active ? (topnav ? "var(--ink)" : "var(--brand-soft)") : "transparent",
        color: active ? (topnav ? "var(--ink-inv)" : "var(--brand-d)") : "var(--ink-2)",
        fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 14.5 }}>
        <Icon name={icon} size={18} /> {label}
        {id === "review" && queueCount > 0 && <span className="badge amber" style={{ marginLeft: "auto" }}>{queueCount}</span>}
      </button>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)", display: topnav ? "block" : "flex" }}>
      {!topnav && (
        <aside style={{ width: 236, borderRight: "1px solid var(--line)", background: "var(--card)", position: "sticky", top: 0, height: "100vh", display: "flex", flexDirection: "column", padding: "18px 14px", flexShrink: 0 }}>
          <div style={{ padding: "4px 6px 6px" }}><Logo size={19} onClick={() => go({ view: "site", page: "home" })} /></div>
          <div className="chip" style={{ margin: "8px 6px 16px", alignSelf: "flex-start" }}>Admin console</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {nav.map(([id, label, icon]) => <NavItem key={id} id={id} label={label} icon={icon} />)}
          </div>
          <div style={{ marginTop: "auto", padding: 12, background: "var(--paper-2)", borderRadius: 12, display: "flex", alignItems: "center", gap: 10 }}>
            <Avatar initials="AD" brand size={34} />
            <div><div className="display" style={{ fontSize: 13.5 }}>Admin</div><div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)" }}>Platform team</div></div>
          </div>
        </aside>
      )}

      <div style={{ flex: 1, minWidth: 0 }}>
        {topnav ? (
          <header style={{ background: "var(--card)", borderBottom: "1px solid var(--line)", position: "sticky", top: 0, zIndex: 30 }}>
            <div style={{ padding: "0 28px", height: 60, display: "flex", alignItems: "center", gap: 18 }}>
              <Logo size={18} onClick={() => go({ view: "site", page: "home" })} />
              <nav style={{ display: "flex", gap: 2, flexWrap: "wrap" }}>{nav.map(([id, label, icon]) => <NavItem key={id} id={id} label={label} icon={icon} horiz />)}</nav>
              <div style={{ marginLeft: "auto" }}><Avatar initials="AD" brand size={32} /></div>
            </div>
          </header>
        ) : (
          <header style={{ background: "oklch(1 0 0 / 0.8)", backdropFilter: "blur(10px)", borderBottom: "1px solid var(--line)", position: "sticky", top: 0, zIndex: 30 }}>
            <div style={{ padding: "0 32px", height: 60, display: "flex", alignItems: "center" }}>
              <div style={{ position: "relative", flex: 1, maxWidth: 340 }}>
                <Icon name="search" size={17} style={{ position: "absolute", left: 12, top: 11, color: "var(--ink-3)" }} />
                <input className="input" placeholder="Search courses, instructors…" style={{ padding: "9px 12px 9px 36px", fontSize: 14, background: "var(--paper-2)" }} />
              </div>
              <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
                <button className="btn btn-ghost btn-sm"><Icon name="bell" size={16} /></button>
                <button className="btn btn-brand btn-sm" onClick={() => setSection("review")}><Icon name="shield" size={16} /> Review queue ({queueCount})</button>
              </div>
            </div>
          </header>
        )}

        <main style={{ padding: "28px 32px", maxWidth: 1180, margin: "0 auto" }}>
          {section === "overview" && <AdmOverview setSection={setSection} />}
          {section === "review" && <AdmReviewCenter showToast={showToast} go={go} />}
          {section === "courses" && <AdmCourses go={go} showToast={showToast} />}
          {section === "products" && <AdmProducts showToast={showToast} />}
          {section === "blogs" && <AdmBlogs showToast={showToast} go={go} />}
          {section === "orders" && <AdmOrders />}
          {section === "instructors" && <AdmInstructors showToast={showToast} />}
          {section === "learners" && <AdmLearners showToast={showToast} />}
          {section === "payouts" && <AdmPayouts showToast={showToast} />}
          {section === "categories" && <AdmCategories showToast={showToast} />}
          {section === "settings" && <AdmSettings showToast={showToast} />}
        </main>
      </div>

      {toast && (
        <div style={{ position: "fixed", bottom: 80, left: "50%", transform: "translateX(-50%)", zIndex: 90, background: "var(--ink)", color: "var(--ink-inv)", padding: "13px 20px", borderRadius: 12, boxShadow: "var(--shadow-lg)", display: "flex", alignItems: "center", gap: 10 }}>
          <Icon name="checkC" size={18} style={{ color: "var(--brand)" }} /> <span className="bn" style={{ fontSize: 14.5 }}>{toast}</span>
        </div>
      )}
    </div>
  );
}

function AdmOverview({ setSection }) {
  const D = window.DATA, s = D.stats, R = window.RDATA;
  const streams = [
    ["Courses", 64, "var(--brand)", "৳52.5L"],
    ["Store (tools & parts)", 22, "var(--info)", "৳18.0L"],
    ["Consultations", 9, "var(--accent)", "৳7.4L"],
    ["Home services", 5, "var(--gold)", "৳4.1L"],
  ];
  return (
    <div>
      <PageHead title="Platform Overview" sub="SobaiShikhi knowledge economy · investor view · Jun 2026" />

      {/* North-star KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginTop: 22 }}>
        <Stat label="GMV · monthly" value="৳82L" sub="+18% MoM"><span className="badge green">+212% YoY</span></Stat>
        <Stat label="Platform revenue" value="৳14.8L" sub="blended take rate 18%"><Spark data={s.gmvTrend} w={64} h={26} /></Stat>
        <Stat label="Monthly active users" value="48.2k" sub="of 142k registered"><span className="badge green">+8%</span></Stat>
        <Stat label="Paying users" value="11.4k" sub="ARPU ৳720 / mo"><span className="badge blue">23.6%</span></Stat>
      </div>

      {/* Revenue streams + growth */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
        <div className="card" style={{ padding: 24 }}>
          <div className="spread" style={{ marginBottom: 16 }}>
            <h3 className="display" style={{ fontSize: 17 }}>Revenue streams</h3>
            <span className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>Jun 2026</span>
          </div>
          <div style={{ display: "flex", height: 14, borderRadius: 999, overflow: "hidden", border: "1px solid var(--line)" }}>
            {streams.map(([l, pct, c]) => <div key={l} style={{ width: pct + "%", background: c }} />)}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
            {streams.map(([l, pct, c, amt]) => (
              <div key={l} className="spread">
                <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: c }} />
                  <span style={{ fontSize: 13.5 }}>{l}</span>
                </span>
                <span className="mono tnum" style={{ fontSize: 12.5 }}>{amt} · {pct}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ padding: 24 }}>
          <div className="spread" style={{ marginBottom: 16 }}>
            <h3 className="display" style={{ fontSize: 17 }}>Enrollments · 12 weeks</h3>
            <span className="badge green">↑ 38% QoQ</span>
          </div>
          <Bars data={s.enrollTrend} h={110} accent />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 16 }}>
            {[["LTV / CAC", "4.2x"], ["M3 retention", "72%"], ["NPS", "+64"]].map(([l, v]) => (
              <div key={l} style={{ padding: "10px 12px", borderRadius: 10, background: "var(--paper-2)" }}>
                <div className="display tnum" style={{ fontSize: 18 }}>{v}</div>
                <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ecosystem + needs attention */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16, marginTop: 16 }}>
        <div className="card" style={{ padding: 24 }}>
          <h3 className="display" style={{ fontSize: 17, marginBottom: 16 }}>Ecosystem health</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
            {[["play2", "8.1k", "Courses live"], ["wrench", "3.6k", "Repair guides"], ["cart", "240", "Vendors"], ["users", "2.4k", "Experts & techs"]].map(([ic, v, l]) => (
              <div key={l} style={{ textAlign: "center", padding: "14px 8px", borderRadius: 12, border: "1px solid var(--line)" }}>
                <Icon name={ic} size={20} style={{ color: "var(--brand-d)" }} />
                <div className="display tnum" style={{ fontSize: 20, marginTop: 6 }}>{v}</div>
                <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
          <div className="bn" style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 14, lineHeight: 1.5 }}>
            Flywheel: শিক্ষার্থী → কন্ট্রিবিউটর → ইন্সট্রাক্টর/এক্সপার্ট → ভেন্ডর — একই ইউজার একাধিক ভূমিকায় আয় ও ব্যয় করে।
          </div>
        </div>
        <div className="card" style={{ padding: 24 }}>
          <h3 className="display" style={{ fontSize: 17, marginBottom: 14 }}>Needs attention</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[["shield", `${window.DATA.courses.filter(c => c.status !== "published" && c.status !== "draft").length + R.rguides.filter(g => g.status === "under_review").length + R.pendingProducts.length + R.blogs.filter(b => b.status === "under_review").length} items in review queue`, () => setSection("review")],
              ["teacher", `${window.DATA.instructors.filter(i => !i.verified).length} expert verification pending`, () => setSection("review")],
              ["money", "2 payouts to process", () => setSection("payouts")]].map(([ic, label, fn]) => (
              <button key={label} onClick={fn} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 13px", border: "1px solid var(--line)", borderRadius: 10, background: "var(--card)", cursor: "pointer", textAlign: "left", width: "100%" }}>
                <span style={{ width: 32, height: 32, borderRadius: 8, background: "oklch(0.72 0.15 70 / 0.16)", color: "var(--warn)", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name={ic} size={17} /></span>
                <span style={{ fontSize: 13.5 }}>{label}</span>
                <Icon name="chevR" size={16} style={{ color: "var(--ink-3)", marginLeft: "auto" }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdmReviewCenter({ showToast, go }) {
  const D = window.DATA, R = window.RDATA;
  const [tab, setTab] = React.useState("courses");
  const tabs = [
    ["courses", "Courses", D.courses.filter((c) => c.status === "under_review" || c.status === "revision").length],
    ["guides", "Repair Guides", R.rguides.filter((g) => g.status === "under_review").length],
    ["products", "Products", R.pendingProducts.length],
    ["blogs", "Blog & Vlogs", R.blogs.filter((b) => b.status === "under_review").length],
    ["forum", "Forum", R.forumQueue.length],
    ["experts", "Experts", D.instructors.filter((i) => !i.verified).length],
    ["technicians", "Technicians", R.pendingTechs.length],
  ];
  return (
    <div>
      <PageHead title="Review Center" sub="কিছুই রিভিউ ছাড়া লাইভ হয় না — কোর্স, গাইড, প্রোডাক্ট, ব্লগ, এক্সপার্ট সব এখানে" />
      <div style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--line)", margin: "20px 0", flexWrap: "wrap" }}>
        {tabs.map(([id, label, n]) => (
          <button key={id} onClick={() => setTab(id)} style={{ display: "flex", alignItems: "center", gap: 7, padding: "11px 14px", border: "none", background: "none", cursor: "pointer", fontFamily: "var(--font-display)", fontSize: 14, fontWeight: tab === id ? 600 : 400, color: tab === id ? "var(--ink)" : "var(--ink-3)", borderBottom: "2.5px solid " + (tab === id ? "var(--brand)" : "transparent"), marginBottom: -1 }}>
            {label} {n > 0 && <span className="badge amber" style={{ fontSize: 10 }}>{n}</span>}
          </button>
        ))}
      </div>
      {tab === "courses" && <AdmReviewCourses showToast={showToast} go={go} />}
      {tab === "guides" && (
        <ReviewList showToast={showToast}
          items={R.rguides.filter((g) => g.status === "under_review").map((g) => ({ id: g.id, title: g.title, sub: `${g.authorName} · ${g.steps.length} ধাপ · ${g.cat} · submitted ${g.submitted || "Jun 2026"}`, approveMsg: `গাইড "${g.title}" প্রকাশিত হয়েছে` }))}
          empty="কোনো গাইড রিভিউয়ের অপেক্ষায় নেই।" />
      )}
      {tab === "products" && (
        <ReviewList showToast={showToast}
          items={R.pendingProducts.map((p) => ({ id: p.id, title: p.name, sub: `${p.seller} · ${p.brand} · ${window.taka(p.price)} · submitted ${p.submitted}`, approveMsg: `প্রোডাক্ট "${p.name}" স্টোরে লাইভ হয়েছে` }))}
          empty="কোনো প্রোডাক্ট রিভিউয়ের অপেক্ষায় নেই।" />
      )}
      {tab === "blogs" && (
        <ReviewList showToast={showToast}
          items={R.blogs.filter((b) => b.status === "under_review").map((b) => ({ id: b.id, title: b.title, sub: `${b.author} · ${b.type} · ${b.dur} · ${b.when}`, approveMsg: `পোস্ট "${b.title}" প্রকাশিত হয়েছে` }))}
          empty="কোনো ব্লগ/ভ্লগ রিভিউয়ের অপেক্ষায় নেই।" />
      )}
      {tab === "forum" && (
        <ReviewList showToast={showToast} approveLabel="Approve"
          items={R.forumQueue.map((f) => ({ id: f.id, title: f.title, sub: f.sub, approveMsg: "ফোরাম অ্যাকশন সম্পন্ন হয়েছে" }))}
          empty="ফোরামে কোনো পেন্ডিং মডারেশন নেই।" />
      )}
      {tab === "technicians" && (
        <ReviewList showToast={showToast} approveLabel="Verify & list"
          items={R.pendingTechs.map((t) => ({ id: t.id, title: t.name, sub: `${t.field} · ${t.area} · ${t.note}`, approveMsg: `${t.name} সার্ভিস মার্কেটপ্লেসে লিস্টেড হয়েছে` }))}
          empty="কোনো টেকনিশিয়ান আবেদন পেন্ডিং নেই।" />
      )}
      {tab === "experts" && (
        <ReviewList showToast={showToast} approveLabel="Verify"
          items={D.instructors.filter((i) => !i.verified).map((i) => ({ id: i.id, title: i.name, sub: `${i.title} · ${i.location || "Bangladesh"} · NID + স্কিল যাচাই প্রয়োজন`, approveMsg: `${i.name} ভেরিফাইড হয়েছেন — এখন কনসালটেশন নিতে পারবেন` }))}
          empty="সব এক্সপার্ট ভেরিফাইড।" />
      )}
    </div>
  );
}

/* generic review queue list (guides / products / blogs / experts) */
function ReviewList({ items, empty, showToast, approveLabel = "Approve & publish" }) {
  const [queue, setQueue] = React.useState(items.map((i) => i.id));
  const act = (id, msg) => { setQueue((q) => q.filter((x) => x !== id)); showToast(msg); };
  const live = items.filter((i) => queue.includes(i.id));
  if (live.length === 0) return (
    <div className="card" style={{ padding: 48, textAlign: "center" }}>
      <div style={{ width: 56, height: 56, borderRadius: 999, background: "var(--brand-soft)", color: "var(--brand-d)", display: "grid", placeItems: "center", margin: "0 auto 12px" }}><Icon name="checkC" size={30} /></div>
      <div className="bn" style={{ fontSize: 15, color: "var(--ink-2)" }}>{empty}</div>
    </div>
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {live.map((i) => (
        <div key={i.id} className="card" style={{ padding: 16, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <Slot label="preview" h={54} dark style={{ width: 92, borderRadius: 9, flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 220 }}>
            <div className="display bn" style={{ fontSize: 15 }}>{i.title}</div>
            <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 4 }}>{i.sub}</div>
          </div>
          <button className="btn btn-brand btn-sm" onClick={() => act(i.id, i.approveMsg)}><Icon name="check" size={14} /> {approveLabel}</button>
          <button className="btn btn-ghost btn-sm" onClick={() => act(i.id, "Revision requested — contributor notified")}>Request revision</button>
        </div>
      ))}
    </div>
  );
}

function AdmReviewCourses({ showToast, go }) {
  const D = window.DATA;
  const [queue, setQueue] = React.useState(D.courses.filter((c) => c.status === "under_review" || c.status === "revision").map((c) => c.id));
  const [review, setReview] = React.useState(null);
  const act = (id, verb) => { setQueue((q) => q.filter((x) => x !== id)); setReview(null); showToast(verb); };

  return (
    <div>
      {queue.length === 0 ? (
        <div className="card" style={{ padding: 56, textAlign: "center", marginTop: 22 }}>
          <div style={{ width: 64, height: 64, borderRadius: 999, background: "var(--brand-soft)", color: "var(--brand-d)", display: "grid", placeItems: "center", margin: "0 auto 16px" }}><Icon name="checkC" size={34} /></div>
          <div className="display bn" style={{ fontSize: 20 }}>রিভিউ কিউ খালি!</div>
          <div className="bn" style={{ color: "var(--ink-3)", fontSize: 14, marginTop: 6 }}>সব কোর্স রিভিউ করা হয়েছে। দারুণ কাজ।</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 22 }}>
          {queue.map((id) => {
            const c = window.byId(D.courses, id);
            const instr = window.instrOf(c);
            return (
              <div key={id} className="card" style={{ padding: 16, display: "flex", gap: 16, alignItems: "center" }}>
                <Slot label="cover" h={70} dark style={{ width: 124, borderRadius: 10, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                    <span className="display" style={{ fontSize: 16 }}>{c.title}</span>
                    <StatusPill status={c.status} />
                  </div>
                  <div className="bn" style={{ fontSize: 13, color: "var(--ink-2)", marginTop: 4 }}>{c.titleBn}</div>
                  <div className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)", marginTop: 6 }}>
                    {instr.name} {!instr.verified && <span className="badge amber" style={{ marginLeft: 4 }}>unverified instructor</span>} · {c.lessons} lessons · {c.hours}h · submitted {c.submitted}
                  </div>
                </div>
                <button className="btn btn-brand btn-sm" onClick={() => setReview(c)}>Review <Icon name="arrow" size={15} /></button>
              </div>
            );
          })}
        </div>
      )}
      {review && <ReviewModal course={review} onClose={() => setReview(null)} onAct={act} go={go} />}
    </div>
  );
}

function ReviewModal({ course, onClose, onAct, go }) {
  const instr = window.instrOf(course);
  const cat = window.catOf(course);
  const checks = ["Content matches the stated category & level", "Video & audio quality acceptable", "No copyright / policy violations", "Accurate course description & pricing", "Curriculum is complete and logical",
    ...(cat.isNew ? [`Approve new category "${course.newCategoryEn}"`] : [])];
  const [done, setDone] = React.useState([]);
  const lessons = ["Course introduction", "Setting up your tools", "Core concepts — part 1", "Hands-on: first project", "Module 1 quiz"];
  const [flags, setFlags] = React.useState({});
  const [editMode, setEditMode] = React.useState(false);
  const toggleFlag = (i) => setFlags((f) => { const n = { ...f }; if (n[i] != null) delete n[i]; else n[i] = ""; return n; });
  const flagCount = Object.keys(flags).length;
  const toggle = (i) => setDone((d) => d.includes(i) ? d.filter((x) => x !== i) : [...d, i]);

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "oklch(0.2 0.02 260 / 0.45)", zIndex: 70, display: "flex", justifyContent: "flex-end" }}>
      <div onClick={(e) => e.stopPropagation()} className="scroll" style={{ width: 520, background: "var(--paper)", height: "100%", overflowY: "auto", boxShadow: "var(--shadow-lg)" }}>
        <div style={{ position: "relative" }}>
          <Slot label="course preview video" h={200} dark style={{ borderRadius: 0 }} />
          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}><div style={{ width: 54, height: 54, borderRadius: 999, background: "oklch(1 0 0 / 0.92)", display: "grid", placeItems: "center" }}><Icon name="playS" size={24} style={{ color: "var(--ink)" }} /></div></div>
          <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, width: 32, height: 32, borderRadius: 8, border: "none", background: "oklch(1 0 0 / 0.92)", display: "grid", placeItems: "center" }}><Icon name="x" size={18} /></button>
        </div>
        <div style={{ padding: 26 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <StatusPill status={course.status} />
            <span className="chip" style={{ background: `oklch(0.94 0.05 ${cat.hue})`, color: `oklch(0.42 0.13 ${cat.hue})`, border: "none" }}>{cat.bn}</span>
          </div>
          <h2 className="display" style={{ fontSize: 24 }}>{course.title}</h2>
          <div className="bn" style={{ fontSize: 15, color: "var(--ink-2)", marginTop: 4 }}>{course.titleBn}</div>
          <p className="bn" style={{ fontSize: 14.5, color: "var(--ink-2)", lineHeight: 1.6, marginTop: 12 }}>{course.blurb}</p>

          {cat.isNew && (
            <div style={{ marginTop: 16, padding: "13px 15px", borderRadius: 12, background: "var(--accent-soft)", border: "1px solid oklch(0.8 0.08 45)", display: "flex", gap: 11, alignItems: "flex-start" }}>
              <Icon name="spark" size={18} style={{ color: "var(--accent-d)", flexShrink: 0, marginTop: 2 }} />
              <div>
                <div className="display bn" style={{ fontSize: 14.5 }}>নতুন ক্যাটাগরির অনুরোধ: "{course.newCategory}"</div>
                <div className="bn" style={{ fontSize: 13, color: "var(--accent-d)", marginTop: 3 }}>
                  ইন্সট্রাক্টর উপযুক্ত ক্যাটাগরি পাননি। অনুমোদন দিলে "{course.newCategoryEn}" ক্যাটাগরিটি মার্কেটপ্লেসে যুক্ত হবে এবং কোর্সটি এতে প্রকাশিত হবে।
                </div>
              </div>
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16, padding: "12px 14px", border: "1px solid var(--line)", borderRadius: 12 }}>
            <Avatar initials={instr.initials} size={42} hue={cat.hue} />
            <div style={{ flex: 1 }}><div className="display" style={{ fontSize: 15 }}>{instr.name}</div><div className="bn" style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{instr.title}</div></div>
            {instr.verified ? <span className="badge green"><Icon name="checkC" size={12} /> Verified</span> : <span className="badge amber">Unverified</span>}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 16 }}>
            {[["Lessons", course.lessons], ["Duration", course.hours + "h"], ["Price", window.taka(course.price)]].map(([k, v]) => (
              <div key={k} className="card" style={{ padding: 12, textAlign: "center" }}><div className="display" style={{ fontSize: 16 }}>{v}</div><div className="kicker" style={{ marginTop: 3 }}>{k}</div></div>
            ))}
          </div>

          <div className="spread" style={{ margin: "22px 0 10px" }}>
            <span className="kicker">Content inspection — flag items to fix</span>
            <button onClick={() => setEditMode(!editMode)} className="mono" style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: editMode ? "var(--accent-d)" : "var(--brand-d)" }}>{editMode ? "✓ Admin edit mode ON" : "Edit as admin"}</button>
          </div>
          {editMode && <div className="bn" style={{ fontSize: 12, color: "var(--accent-d)", background: "var(--accent-soft)", padding: "8px 12px", borderRadius: 9, marginBottom: 10 }}>অ্যাডমিন এডিট মোড — কন্টেন্ট সরাসরি বদলাতে পারবেন, পরিবর্তন সাথে সাথে কার্যকর হবে।</div>}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {lessons.map((l, i) => {
              const flagged = flags[i] != null;
              return (
                <div key={i} style={{ border: "1px solid " + (flagged ? "var(--danger)" : "var(--line)"), borderRadius: 10, padding: "9px 12px", background: flagged ? "oklch(0.58 0.18 25 / 0.05)" : "var(--card)" }}>
                  <div className="spread" style={{ gap: 10 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 9, flex: 1 }}>
                      <Icon name="play2" size={15} style={{ color: "var(--ink-3)", flexShrink: 0 }} />
                      {editMode ? <input className="input" defaultValue={l} style={{ padding: "5px 9px", fontSize: 13 }} /> : <span style={{ fontSize: 13.5 }}>{l}</span>}
                    </span>
                    <button onClick={() => toggleFlag(i)} className={"badge " + (flagged ? "red" : "gray")} style={{ border: "none", cursor: "pointer" }}>{flagged ? "Flagged" : "Flag"}</button>
                  </div>
                  {flagged && <input className="input bn" value={flags[i]} onChange={(e) => setFlags((f) => ({ ...f, [i]: e.target.value }))} placeholder="কী ঠিক করতে হবে লিখুন — ইন্সট্রাক্টর এই নোট দেখবেন" style={{ marginTop: 8, padding: "8px 11px", fontSize: 13 }} />}
                </div>
              );
            })}
          </div>
          <div className="kicker" style={{ margin: "18px 0 12px" }}>Review checklist</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {checks.map((ch, i) => (
              <button key={i} onClick={() => toggle(i)} style={{ display: "flex", alignItems: "center", gap: 11, padding: "11px 13px", border: "1px solid var(--line)", borderRadius: 10, background: done.includes(i) ? "var(--brand-soft)" : "var(--card)", cursor: "pointer", textAlign: "left" }}>
                <span style={{ width: 20, height: 20, borderRadius: 6, border: "1.5px solid " + (done.includes(i) ? "var(--brand)" : "var(--line)"), background: done.includes(i) ? "var(--brand)" : "transparent", display: "grid", placeItems: "center", flexShrink: 0 }}>{done.includes(i) && <Icon name="check" size={13} style={{ color: "#fff" }} />}</span>
                <span style={{ fontSize: 13.5 }}>{ch}</span>
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
            <button className="btn btn-brand" style={{ flex: 1 }} disabled={done.length < checks.length} onClick={() => onAct(course.id, cat.isNew ? `"${course.title}" অনুমোদিত · নতুন ক্যাটাগরি "${course.newCategory}" যুক্ত হয়েছে` : `"${course.title}" অনুমোদিত ও প্রকাশিত হয়েছে`)}>
              <Icon name="check" size={17} /> Approve & publish
            </button>
            <button className="btn btn-ghost" onClick={() => onAct(course.id, flagCount ? `Revision requested — ${flagCount} item${flagCount > 1 ? "s" : ""} flagged, instructor notified` : "Revision requested — instructor notified")}>Request revision{flagCount ? ` (${flagCount})` : ""}</button>
          </div>
          {done.length < checks.length && <div className="bn" style={{ fontSize: 12, color: "var(--ink-3)", textAlign: "center", marginTop: 10 }}>অনুমোদনের আগে চেকলিস্টের সব ধাপ সম্পন্ন করুন</div>}
        </div>
      </div>
    </div>
  );
}

function AdmCourses({ go, showToast }) {
  const [, force] = React.useReducer((x) => x + 1, 0);
  const pub = window.DATA.courses.filter((c) => c.status === "published");
  const [sel, setSel] = React.useState(null);
  const [featured, setFeatured] = React.useState(["c1", "c2"]);
  const unpublish = (c) => { c.status = "draft"; if (sel && sel.id === c.id) setSel(null); force(); showToast(`"${c.title}" unpublished — hidden from browse`); };
  const toggleFeature = (c) => { const on = featured.includes(c.id); setFeatured((f) => on ? f.filter((x) => x !== c.id) : [...f, c.id]); showToast(on ? `"${c.title}" removed from featured` : `"${c.title}" featured on homepage`); };
  const enrolled = sel ? window.DATA.students.filter((s) => s.course === sel.id) : [];
  return (
    <div>
      <PageHead title="Courses" sub={`${pub.length} published · click a course to see enrolled students`} />
      <div className="card" style={{ overflow: "hidden", marginTop: 22 }}>
        <Table head={["Course", "Category", "Instructor", "Enrolled", "Rating", "Price", "Controls"]}>
          {pub.map((c) => (
            <tr key={c.id} style={{ cursor: "pointer", background: sel?.id === c.id ? "var(--brand-soft)" : "transparent" }} onClick={() => setSel(sel?.id === c.id ? null : c)}>
              <Td><div className="display" style={{ fontSize: 14 }}>{c.title}</div></Td>
              <Td><span className="chip" style={{ background: `oklch(0.94 0.05 ${window.catOf(c).hue})`, color: `oklch(0.42 0.13 ${window.catOf(c).hue})`, border: "none", fontSize: 10.5 }}>{window.catOf(c).bn}</span></Td>
              <Td>{window.instrOf(c).name}</Td>
              <Td><span className="mono tnum" style={{ fontWeight: 600 }}>{c.students.toLocaleString()}</span></Td>
              <Td mono>{c.rating} ★</Td>
              <Td mono>{window.taka(c.price)}</Td>
              <Td>
                <div style={{ display: "flex", gap: 4, alignItems: "center" }} onClick={(e) => e.stopPropagation()}>
                  <button className="btn btn-ghost btn-sm" title="Feature on homepage" onClick={() => toggleFeature(c)} style={{ padding: 7, color: featured.includes(c.id) ? "var(--gold)" : "var(--ink-3)" }}><Icon name={featured.includes(c.id) ? "star" : "starO"} size={15} /></button>
                  <button className="btn btn-ghost btn-sm" title="Unpublish" onClick={() => unpublish(c)} style={{ padding: 7 }}><Icon name="x" size={15} /></button>
                  <span className="mono" style={{ fontSize: 11, color: "var(--brand-d)", cursor: "pointer", whiteSpace: "nowrap" }} onClick={() => setSel(sel && sel.id === c.id ? null : c)}>{sel && sel.id === c.id ? "Hide ▴" : "Students ▾"}</span>
                </div>
              </Td>
            </tr>
          ))}
        </Table>
      </div>

      {sel && (
        <div className="card" style={{ marginTop: 16, overflow: "hidden" }}>
          <div className="spread" style={{ padding: "16px 22px", flexWrap: "wrap", gap: 10 }}>
            <div>
              <h3 className="display" style={{ fontSize: 16 }}>Enrolled students — {sel.title}</h3>
              <div className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)", marginTop: 4 }}>{sel.students.toLocaleString()} total · showing recent {enrolled.length}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-ghost btn-sm"><Icon name="download" size={14} /> Export list</button>
              <button className="btn btn-ghost btn-sm" onClick={() => go({ view: "site", page: "course", id: sel.slug })}><Icon name="eye" size={14} /> View page</button>
            </div>
          </div>
          {enrolled.length === 0 ? (
            <div style={{ padding: "20px 22px", borderTop: "1px solid var(--line)" }}><span className="bn" style={{ fontSize: 13.5, color: "var(--ink-3)" }}>স্যাম্পল ডেটায় এই কোর্সের তালিকা নেই — মোট সংখ্যা উপরের কলামে।</span></div>
          ) : (
            <Table head={["Student", "Bangla name", "Progress", "Joined", "Status"]}>
              {enrolled.map((s) => (
                <tr key={s.id}>
                  <Td><div style={{ display: "flex", alignItems: "center", gap: 10 }}><Avatar initials={s.initials} size={30} /><span className="display" style={{ fontSize: 13.5 }}>{s.name}</span></div></Td>
                  <Td><span className="bn">{s.bn}</span></Td>
                  <Td><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 90 }}><Progress value={s.progress} /></div><span className="mono" style={{ fontSize: 11.5 }}>{s.progress}%</span></div></Td>
                  <Td mono>{s.joined}</Td>
                  <Td><span className={"badge " + (s.status === "Active" ? "green" : s.status === "Completed" ? "blue" : "amber")}>{s.status}</span></Td>
                </tr>
              ))}
            </Table>
          )}
        </div>
      )}
    </div>
  );
}

/* ---- PRODUCTS (store management) ---- */
function AdmProducts({ showToast }) {
  const R = window.RDATA;
  const all = [...R.pendingProducts, ...R.tools.map((t) => ({ ...t, status: "published" })), ...R.parts.map((p) => ({ ...p, seller: p.seller || "SobaiShikhi Store", status: "published" }))];
  const [filter, setFilter] = React.useState("all");
  const [removed, setRemoved] = React.useState([]);
  const unlist = (p) => { setRemoved((r) => [...r, p.id]); showToast(`"${p.name}" unlisted from store`); };
  const list = all.filter((p) => !removed.includes(p.id)).filter((p) => filter === "all" || (filter === "pending" ? p.status === "under_review" : p.status === "published"));
  return (
    <div>
      <PageHead title="Store products" sub={`${all.length} products · tools + parts · admin can add directly (no review needed)`} action={<button className="btn btn-brand btn-sm" onClick={() => showToast("Admin প্রোডাক্ট সরাসরি লাইভ হয় — ফর্ম ডেমোতে নেই")}><Icon name="plus" size={15} /> Add product</button>} />
      <div style={{ display: "flex", gap: 8, margin: "18px 0 14px" }}>
        {[["all", "All"], ["pending", "Pending review"], ["live", "Live"]].map(([id, label]) => (
          <button key={id} onClick={() => setFilter(id)} className="btn btn-sm" style={{ background: filter === id ? "var(--ink)" : "var(--card)", color: filter === id ? "#fff" : "var(--ink-2)", border: "1px solid " + (filter === id ? "var(--ink)" : "var(--line)") }}>{label}</button>
        ))}
      </div>
      <div className="card" style={{ overflow: "hidden" }}>
        <Table head={["Product", "Seller", "Price", "Rating", "Status", "Controls"]}>
          {list.map((p) => (
            <tr key={p.id}>
              <Td><div className="display bn" style={{ fontSize: 13.5 }}>{p.name}</div><div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)" }}>{p.brand} · {p.cat}</div></Td>
              <Td><SellerBadge type={p.sellerType || "official"} /></Td>
              <Td mono>{window.taka(p.price)}</Td>
              <Td mono>{p.rating ? p.rating + " ★" : "—"}</Td>
              <Td><StatusPill status={p.status} /></Td>
              <Td><button className="btn btn-ghost btn-sm" onClick={() => unlist(p)} style={{ padding: "6px 10px" }}><Icon name="x" size={14} /> Unlist</button></Td>
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
}

/* ---- BLOG & VLOGS management ---- */
function AdmBlogs({ showToast, go }) {
  const R = window.RDATA;
  const [down, setDown] = React.useState([]);
  const takedown = (b) => { setDown((d) => [...d, b.id]); showToast(`"${b.title}" taken down`); };
  return (
    <div>
      <PageHead title="Blog & Vlogs" sub={`${R.blogs.length} posts · community posts need review, admin posts go live directly`} action={<button className="btn btn-brand btn-sm" onClick={() => showToast("Admin পোস্ট সরাসরি লাইভ হয়")}><Icon name="plus" size={15} /> New post</button>} />
      <div className="card" style={{ overflow: "hidden", marginTop: 22 }}>
        <Table head={["Post", "Type", "Author", "Views", "Status", ""]}>
          {R.blogs.filter((b) => !down.includes(b.id)).map((b) => (
            <tr key={b.id}>
              <Td><div className="display bn" style={{ fontSize: 13.5, maxWidth: 360 }}>{b.title}</div></Td>
              <Td><span className={"badge " + (b.type === "vlog" ? "red" : "blue")}>{b.type}</span>{b.ai && <span className="badge green" style={{ marginLeft: 5 }}>AI</span>}</Td>
              <Td>{b.author}</Td>
              <Td mono>{b.views ? (b.views / 1000).toFixed(1) + "k" : "—"}</Td>
              <Td><StatusPill status={b.status} /></Td>
              <Td><div style={{ display: "flex", gap: 5 }}>{b.status === "published" && <button className="btn btn-ghost btn-sm" onClick={() => go({ view: "site", page: "blog-post", id: b.slug })} style={{ padding: 7 }}><Icon name="eye" size={14} /></button>}<button className="btn btn-ghost btn-sm" title="Take down" onClick={() => takedown(b)} style={{ padding: 7 }}><Icon name="x" size={14} /></button></div></Td>
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
}

function AdmInstructors({ showToast }) {
  const [verified, setVerified] = React.useState(window.DATA.instructors.filter((i) => i.verified).map((i) => i.id));
  const verify = (id, name) => { setVerified((v) => [...v, id]); showToast(`${name} ভেরিফাইড হয়েছেন`); };
  const [suspended, setSuspended] = React.useState([]);
  const toggleSuspend = (p) => { const on = suspended.includes(p.id); setSuspended((s) => on ? s.filter((x) => x !== p.id) : [...s, p.id]); showToast(on ? `${p.name} reactivated` : `${p.name} suspended — courses & profile hidden`); };
  return (
    <div>
      <PageHead title="Instructors" sub={`${window.DATA.instructors.length} total · 142 awaiting verification`} />
      <div className="card" style={{ overflow: "hidden", marginTop: 22 }}>
        <Table head={["Instructor", "Specialty", "Courses", "Students", "Revenue", "Verification", "Controls"]}>
          {window.DATA.instructors.map((p) => {
            const isV = verified.includes(p.id);
            return (
              <tr key={p.id}>
                <Td><div style={{ display: "flex", alignItems: "center", gap: 11 }}><Avatar initials={p.initials} size={34} hue={window.byId(window.DATA.categories, p.cat).hue} /><div><div className="display" style={{ fontSize: 14 }}>{p.name}</div><div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)" }}>{p.bn}</div></div></div></Td>
                <Td>{p.title}</Td>
                <Td mono>{p.courses}</Td>
                <Td mono>{p.students.toLocaleString()}</Td>
                <Td mono>{window.taka(p.revenue)}</Td>
                <Td>{isV ? <span className="badge green"><Icon name="checkC" size={12} /> Verified</span> : <button className="btn btn-brand btn-sm" onClick={() => verify(p.id, p.name)}><Icon name="shield" size={14} /> Verify</button>}</Td>
                <Td><button className={"btn btn-sm " + (suspended.includes(p.id) ? "btn-brand" : "btn-ghost")} onClick={() => toggleSuspend(p)} style={{ padding: "6px 10px" }}>{suspended.includes(p.id) ? "Reactivate" : "Suspend"}</button></Td>
              </tr>
            );
          })}
        </Table>
      </div>
    </div>
  );
}

function AdmLearners({ showToast }) {
  const [suspended, setSuspended] = React.useState([]);
  const rows = [
    ["Ria Islam", "রিয়া ইসলাম", "3 courses", "Jan 2026", "Active"],
    ["Sabbir Ahmed", "সাব্বির আহমেদ", "5 courses", "Feb 2026", "Active"],
    ["Mim Akter", "মিম আক্তার", "2 courses", "Mar 2026", "Active"],
    ["Hasan Mahmud", "হাসান মাহমুদ", "1 course", "May 2026", "Active"],
    ["Tania Sultana", "তানিয়া সুলতানা", "4 courses", "Apr 2026", "Active"],
  ];
  return (
    <div>
      <PageHead title="Learners" sub="142,000 total learners" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, margin: "22px 0 16px" }}>
        <Stat label="Active this month" value="48.2k" sub="34% of total"><span className="badge green">+6%</span></Stat>
        <Stat label="Avg. courses / learner" value="2.4" />
        <Stat label="Completion rate" value="61%" sub="across published" />
      </div>
      <div className="card" style={{ overflow: "hidden" }}>
        <Table head={["Learner", "Bangla name", "Enrolled", "Joined", "Status", "Controls"]}>
          {rows.map((r) => (
            <tr key={r[0]}>
              <Td><div style={{ display: "flex", alignItems: "center", gap: 11 }}><Avatar initials={r[0].split(" ").map(w => w[0]).join("")} size={32} /><span className="display" style={{ fontSize: 14 }}>{r[0]}</span></div></Td>
              <Td><span className="bn">{r[1]}</span></Td>
              <Td mono>{r[2]}</Td>
              <Td mono>{r[3]}</Td>
              <Td><span className={"badge " + (suspended.includes(r[0]) ? "red" : "green")}>{suspended.includes(r[0]) ? "Suspended" : r[4]}</span></Td>
              <Td><button className={"btn btn-sm " + (suspended.includes(r[0]) ? "btn-brand" : "btn-ghost")} onClick={() => { const on = suspended.includes(r[0]); setSuspended((s) => on ? s.filter((x) => x !== r[0]) : [...s, r[0]]); showToast(on ? `${r[0]} reactivated` : `${r[0]} suspended — account paused`); }} style={{ padding: "6px 10px" }}>{suspended.includes(r[0]) ? "Reactivate" : "Suspend"}</button></Td>
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
}

function AdmPayouts({ showToast }) {
  const [rows, setRows] = React.useState(window.DATA.payouts);
  const pay = (id) => { setRows((r) => r.map((p) => p.id === id ? { ...p, status: "Paid" } : p)); showToast(`Payout ${id} processed`); };
  const pending = rows.filter((p) => p.status !== "Paid").reduce((a, p) => a + p.amount, 0);
  return (
    <div>
      <PageHead title="Payouts & commission" sub="Instructor earnings · 20% platform commission" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, margin: "22px 0 16px" }}>
        <Stat label="Pending payouts" value={window.taka(pending)} sub={`${rows.filter(p => p.status !== "Paid").length} instructors`}><span className="badge amber">due</span></Stat>
        <Stat label="Platform commission (Jun)" value={window.taka(1640000)} sub="20% of GMV" />
        <Stat label="Paid this month" value={window.taka(188000)} sub="2 payouts" />
      </div>
      <div className="card" style={{ overflow: "hidden" }}>
        <Table head={["Payout", "Instructor", "Amount", "Method", "Date", "Status", ""]}>
          {rows.map((p) => {
            const instr = window.byId(window.DATA.instructors, p.instr);
            return (
              <tr key={p.id}>
                <Td mono>{p.id}</Td>
                <Td><span className="display" style={{ fontSize: 14 }}>{instr.name}</span></Td>
                <Td mono>{window.taka(p.amount)}</Td>
                <Td mono>{p.method}</Td>
                <Td mono>{p.date}</Td>
                <Td><span className={"badge " + (p.status === "Paid" ? "green" : p.status === "Processing" ? "blue" : "amber")}>{p.status}</span></Td>
                <Td>{p.status === "Pending" && <button className="btn btn-brand btn-sm" onClick={() => pay(p.id)}>Process</button>}</Td>
              </tr>
            );
          })}
        </Table>
      </div>
    </div>
  );
}

function AdmCategories({ showToast }) {
  const [adding, setAdding] = React.useState(false);
  const [name, setName] = React.useState("");
  const [disabled, setDisabled] = React.useState([]);
  const toggleCat = (cat) => { const off = disabled.includes(cat.id); setDisabled((d) => off ? d.filter((x) => x !== cat.id) : [...d, cat.id]); showToast(off ? `"${cat.name}" enabled` : `"${cat.name}" disabled — hidden from browse`); };
  return (
    <div>
      <PageHead title="Categories" sub="12 active · disable to hide from browse · instructor-proposed categories arrive via course review" action={<button className="btn btn-brand btn-sm" onClick={() => setAdding(!adding)}><Icon name="plus" size={16} /> Add category</button>} />
      {adding && (
        <div className="card" style={{ padding: 16, marginTop: 18, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="New category name" style={{ flex: 1, minWidth: 220 }} />
          <button className="btn btn-brand btn-sm" disabled={!name} onClick={() => { showToast(`Category "${name}" added — live (admin bypasses review)`); setName(""); setAdding(false); }}>Add — goes live</button>
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 22 }}>
        {window.DATA.categories.map((cat) => {
          const off = disabled.includes(cat.id);
          return (
            <div key={cat.id} className="card" style={{ padding: 18, display: "flex", alignItems: "center", gap: 14, opacity: off ? 0.55 : 1 }}>
              <div style={{ width: 44, height: 44, borderRadius: 11, background: `oklch(0.94 0.05 ${cat.hue})`, color: `oklch(0.45 0.13 ${cat.hue})`, display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name={cat.icon} size={22} /></div>
              <div style={{ flex: 1 }}><div className="display bn" style={{ fontSize: 15 }}>{cat.bn}</div><div className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>{cat.courses.toLocaleString()} courses</div></div>
              <button onClick={() => toggleCat(cat)} className={"badge " + (off ? "gray" : "green")} style={{ border: "none", cursor: "pointer" }}>{off ? "Disabled" : "Live"}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---- ORDERS (full order visibility) ---- */
function AdmOrders() {
  const [type, setType] = React.useState("All");
  const orders = [
    ["ORD-9120", "Ria Islam", "Complete Web Development in Bangla", "Course", "Tahmid Rahman", 1499, "Jun 11, 7:42 PM", "Paid"],
    ["ORD-9119", "Sabbir Ahmed", "ডিজিটাল মাল্টিমিটার DT-9205A", "Tool", "TechMart BD", 950, "Jun 11, 6:10 PM", "Shipped"],
    ["ORD-9117", "Noman Khan", "Expert call — Rakibul Islam (30 min)", "Consultation", "Rakibul Islam", 399, "Jun 11, 4:55 PM", "Scheduled"],
    ["ORD-9114", "Mim Akter", "iPhone 13 ব্যাটারি (3227mAh)", "Part", "SobaiShikhi Store", 3200, "Jun 11, 2:20 PM", "Processing"],
    ["ORD-9111", "Tania Sultana", "IELTS Band 8: Speaking & Writing", "Course", "Nusrat Jahan", 1999, "Jun 11, 11:08 AM", "Paid"],
    ["ORD-9108", "Hasan Mahmud", "AC service visit — CoolFix", "Service", "CoolFix AC Service", 300, "Jun 10, 9:30 PM", "Completed"],
    ["ORD-9105", "Farhan Rahman", "থার্মাল পেস্ট MX-4 (4g)", "Tool", "TechMart BD", 750, "Jun 10, 8:14 PM", "Delivered"],
    ["ORD-9101", "Nadia Ferdous", "Spoken English in 60 Days", "Course", "Nusrat Jahan", 899, "Jun 10, 5:02 PM", "Refunded"],
  ];
  const types = ["All", "Course", "Tool", "Part", "Consultation", "Service"];
  const list = orders.filter((o) => type === "All" || o[3] === type);
  const stColor = { Paid: "green", Delivered: "green", Completed: "green", Shipped: "blue", Scheduled: "blue", Processing: "amber", Refunded: "red" };
  return (
    <div>
      <PageHead title="Orders" sub="every purchase on the platform — who ordered, what, from whom, for how much" action={<button className="btn btn-ghost btn-sm"><Icon name="download" size={14} /> Export CSV</button>} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, margin: "22px 0 16px" }}>
        <Stat label="Orders · today" value="312" sub="+8% vs yesterday"><span className="badge green">live</span></Stat>
        <Stat label="GMV · today" value="৳2.84L" sub="all streams" />
        <Stat label="Avg. order value" value="৳910" sub="30-day" />
        <Stat label="Refund rate" value="1.2%" sub="30-day"><span className="badge green">low</span></Stat>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        {types.map((t) => (
          <button key={t} onClick={() => setType(t)} className="btn btn-sm" style={{ background: type === t ? "var(--ink)" : "var(--card)", color: type === t ? "#fff" : "var(--ink-2)", border: "1px solid " + (type === t ? "var(--ink)" : "var(--line)") }}>{t}</button>
        ))}
      </div>
      <div className="card" style={{ overflow: "hidden" }}>
        <Table head={["Order", "Buyer", "Item", "Type", "Seller / Provider", "Amount", "Time", "Status"]}>
          {list.map((o) => (
            <tr key={o[0]}>
              <Td mono>{o[0]}</Td>
              <Td><div style={{ display: "flex", alignItems: "center", gap: 9 }}><Avatar initials={o[1].split(" ").map((w) => w[0]).join("")} size={28} /><span className="display" style={{ fontSize: 13.5 }}>{o[1]}</span></div></Td>
              <Td><span className="bn" style={{ fontSize: 13 }}>{o[2]}</span></Td>
              <Td><span className="badge gray">{o[3]}</span></Td>
              <Td>{o[4]}</Td>
              <Td mono>{window.taka(o[5])}</Td>
              <Td mono>{o[6]}</Td>
              <Td><span className={"badge " + (stColor[o[7]] || "gray")}>{o[7]}</span></Td>
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
}

/* ---- PLATFORM SETTINGS (admin controls everything) ---- */
function AdmSettings({ showToast }) {
  const [com, setCom] = React.useState({ "Course sales": 20, "Store (tools & parts)": 10, "Expert consultations": 15, "Home services": 12 });
  const [feats, setFeats] = React.useState({ "Courses marketplace": true, "Repair Hub": true, "Tools & Parts Store": true, "Expert Consultations": true, "Home Services": true, "Blog & Vlogs": true, "Community Forum": true, "AI Assistant": true });
  const [pay, setPay] = React.useState({ bKash: true, Nagad: true, Rocket: false, Card: true });
  const [banner, setBanner] = React.useState({ on: true, pct: 60, text: "নতুন শিক্ষার্থীদের জন্য সব কোর্সে বিশাল ছাড় — সীমিত সময়ের অফার চলছে" });
  const Toggle = ({ on, onClick, label }) => (
    <button onClick={onClick} className="spread" style={{ width: "100%", padding: "10px 14px", borderRadius: 11, border: "1.5px solid " + (on ? "var(--brand)" : "var(--line)"), background: on ? "var(--brand-soft)" : "var(--card)", cursor: "pointer", gap: 10 }}>
      <span className="display" style={{ fontSize: 13.5, textAlign: "left" }}>{label}</span>
      <span className={"badge " + (on ? "green" : "gray")}>{on ? "On" : "Off"}</span>
    </button>
  );
  return (
    <div>
      <PageHead title="Platform Settings" sub="commission, sections, payments, homepage — সব অ্যাডমিনের নিয়ন্ত্রণে" action={<button className="btn btn-accent btn-sm" onClick={() => showToast("Platform settings saved & applied")}><Icon name="check" size={15} /> Save & apply</button>} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 22 }}>
        <div className="card" style={{ padding: 22 }}>
          <h3 className="display" style={{ fontSize: 16, marginBottom: 14 }}>Commission rates</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {Object.entries(com).map(([k, v]) => (
              <div key={k} className="spread" style={{ gap: 12 }}>
                <span style={{ fontSize: 13.5 }}>{k}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <input className="input tnum" type="number" value={v} onChange={(e) => setCom((c) => ({ ...c, [k]: Number(e.target.value) }))} style={{ width: 74, padding: "7px 10px", textAlign: "right" }} />
                  <span className="mono" style={{ fontSize: 12.5, color: "var(--ink-3)" }}>%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ padding: 22 }}>
          <h3 className="display" style={{ fontSize: 16, marginBottom: 14 }}>Payment methods</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {Object.entries(pay).map(([k, on]) => <Toggle key={k} on={on} label={k} onClick={() => { setPay((p) => ({ ...p, [k]: !p[k] })); showToast(`${k} ${on ? "disabled" : "enabled"} at checkout`); }} />)}
          </div>
        </div>
        <div className="card" style={{ padding: 22 }}>
          <h3 className="display" style={{ fontSize: 16, marginBottom: 14 }}>Site sections</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {Object.entries(feats).map(([k, on]) => <Toggle key={k} on={on} label={k} onClick={() => { setFeats((f) => ({ ...f, [k]: !f[k] })); showToast(`"${k}" ${on ? "hidden from site" : "live on site"}`); }} />)}
          </div>
        </div>
        <div className="card" style={{ padding: 22 }}>
          <h3 className="display" style={{ fontSize: 16, marginBottom: 14 }}>Homepage offer banner</h3>
          <Toggle on={banner.on} label="Show offer banner" onClick={() => setBanner((b) => ({ ...b, on: !b.on }))} />
          <div className="field" style={{ marginTop: 12 }}>
            <label>Banner text</label>
            <input className="input bn" value={banner.text} onChange={(e) => setBanner((b) => ({ ...b, text: e.target.value }))} />
          </div>
          <div className="field" style={{ marginTop: 12 }}>
            <label>Discount — {banner.pct}%</label>
            <input type="range" min="0" max="80" step="5" value={banner.pct} onChange={(e) => setBanner((b) => ({ ...b, pct: Number(e.target.value) }))} style={{ width: "100%", accentColor: "var(--accent)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* shared */
function PageHead({ title, sub, action }) {
  return (
    <div className="spread" style={{ alignItems: "flex-end" }}>
      <div><h1 className="display" style={{ fontSize: 28 }}>{title}</h1><p className="bn" style={{ color: "var(--ink-3)", fontSize: 14, marginTop: 6 }}>{sub}</p></div>
      {action}
    </div>
  );
}
function Table({ head, children }) {
  return (
    <div className="scroll" style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}>
        <thead><tr style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", background: "var(--paper-2)" }}>
          {head.map((h, i) => <th key={i} className="kicker" style={{ textAlign: "left", padding: "11px 18px", fontWeight: 400 }}>{h}</th>)}
        </tr></thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
function Td({ children, mono }) {
  return <td style={{ padding: "12px 18px", borderBottom: "1px solid var(--line-2)", fontSize: 14, verticalAlign: "middle" }} className={mono ? "mono" : ""}>{children}</td>;
}

Object.assign(window, { AdminApp });
