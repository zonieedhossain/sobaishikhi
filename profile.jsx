/* SobaiShikhi — public Instructor profile (builds student trust) */
function InstructorProfile({ go, id }) {
  const D = window.DATA;
  const p = window.byId(D.instructors, id) || D.instructors[0];
  const cat = window.byId(D.categories, p.cat);
  const courses = D.courses.filter((c) => c.instr === p.id && c.status === "published");
  const totalStudents = courses.reduce((a, c) => a + c.students, 0) || p.students;

  return (
    <div>
      {/* header banner */}
      <div style={{ background: "var(--ink)", color: "var(--ink-inv)" }}>
        <div className="wrap" style={{ padding: "20px 28px 0" }}>
          <button onClick={() => window.history.length > 1 ? go({ view: "site", page: "browse" }) : go({ view: "site", page: "home" })} className="mono" style={{ background: "none", border: "none", color: "oklch(0.72 0.01 260)", fontSize: 12.5, display: "flex", alignItems: "center", gap: 6 }}><Icon name="arrowL" size={15} /> Back</button>
        </div>
        <div className="wrap profile-head" style={{ padding: "26px 28px 34px", display: "flex", gap: 28, alignItems: "center" }}>
          <div style={{ width: 120, height: 120, borderRadius: 24, background: `oklch(0.42 0.13 ${cat.hue})`, display: "grid", placeItems: "center", flexShrink: 0, fontFamily: "var(--font-mono)", fontSize: 42, fontWeight: 600, color: "#fff", border: "3px solid oklch(0.4 0.01 260)" }}>{p.initials}</div>
          <div style={{ flex: 1 }}>
            <div className="kicker" style={{ color: "oklch(0.7 0.01 260)" }}>{p.title}</div>
            <h1 className="display" style={{ fontSize: 38, marginTop: 6, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              {p.name}
              {p.verified && <span className="badge green" style={{ fontSize: 12 }}><Icon name="checkC" size={13} /> Verified instructor</span>}
            </h1>
            <div className="bn" style={{ fontSize: 17, color: "oklch(0.84 0.01 260)", marginTop: 8, lineHeight: 1.5, maxWidth: 620 }}>{p.headline}</div>
            <div style={{ display: "flex", gap: 18, marginTop: 16, flexWrap: "wrap" }}>
              {[["pin", p.location], ["clock", `${2026 - p.since}+ বছর শেখাচ্ছেন`], ["globe", p.langs.join(" · ")]].map(([ic, v]) => (
                <span key={v} style={{ display: "flex", alignItems: "center", gap: 7, color: "oklch(0.8 0.01 260)" }}><Icon name={ic === "pin" ? "user" : ic} size={15} /><span className="bn" style={{ fontSize: 13.5 }}>{v}</span></span>
              ))}
            </div>
          </div>
        </div>
        {/* stat strip */}
        <div style={{ borderTop: "1px solid oklch(0.34 0.012 260)" }}>
          <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
            {[[p.rating ? p.rating.toFixed(1) + " ★" : "নতুন", "ইন্সট্রাক্টর রেটিং"], [(p.reviews || 0).toLocaleString(), "রিভিউ"], [totalStudents.toLocaleString(), "শিক্ষার্থী"], [p.courses, "কোর্স"]].map(([v, l], i) => (
              <div key={l} style={{ padding: "18px 24px", borderLeft: i ? "1px solid oklch(0.34 0.012 260)" : "none" }}>
                <div className="display" style={{ fontSize: 24 }}>{v}</div>
                <div className="bn" style={{ fontSize: 12.5, color: "oklch(0.68 0.01 260)", marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* body */}
      <div className="wrap" style={{ padding: "40px 28px 80px", display: "grid", gridTemplateColumns: "1fr 300px", gap: 40, alignItems: "start" }} className="detail-grid">
        <div>
          <h2 className="display bn" style={{ fontSize: 24, marginBottom: 14 }}>পরিচিতি</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {p.bio.map((para, i) => (
              <p key={i} className="bn" style={{ fontSize: 16, lineHeight: 1.75, color: "var(--ink)", margin: 0, textWrap: "pretty" }}>{para}</p>
            ))}
          </div>

          <h3 className="display bn" style={{ fontSize: 19, margin: "30px 0 14px" }}>দক্ষতার ক্ষেত্র</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
            {p.expertise.map((e) => (
              <span key={e} className="chip" style={{ background: `oklch(0.95 0.04 ${cat.hue})`, color: `oklch(0.40 0.12 ${cat.hue})`, border: "none", fontSize: 12.5 }}>{e}</span>
            ))}
          </div>

          {/* courses */}
          <div style={{ marginTop: 38 }}>
            <div className="spread" style={{ marginBottom: 16 }}>
              <h2 className="display bn" style={{ fontSize: 24 }}>{p.name.split(" ")[0]}-এর কোর্স</h2>
              <span className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{courses.length} published</span>
            </div>
            {courses.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18 }} className="course-grid">
                {courses.map((c) => <CourseCard key={c.id} c={c} go={go} />)}
              </div>
            ) : (
              <div className="card" style={{ padding: 32, textAlign: "center" }}><div className="bn" style={{ color: "var(--ink-3)" }}>এখনো কোনো প্রকাশিত কোর্স নেই।</div></div>
            )}
          </div>
        </div>

        {/* trust sidebar */}
        <aside style={{ position: "sticky", top: 88, display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card" style={{ padding: 20 }}>
            <div className="display bn" style={{ fontSize: 16, marginBottom: 14 }}>কেন বিশ্বাস করবেন</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              {[
                ["shield", p.verified ? "SobaiShikhi-যাচাইকৃত পরিচয়" : "যাচাই প্রক্রিয়াধীন", p.verified],
                ["checkC", "সব কোর্স অ্যাডমিন-রিভিউড", true],
                ["star", `${(p.reviews || 0).toLocaleString()} জন রিভিউ দিয়েছেন`, true],
                ["users", `${totalStudents.toLocaleString()} জন শিখছেন`, true],
              ].map(([ic, label, on]) => (
                <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: 11 }}>
                  <Icon name={ic} size={18} style={{ color: on ? "var(--brand)" : "var(--ink-3)", flexShrink: 0, marginTop: 1 }} />
                  <span className="bn" style={{ fontSize: 13.5, lineHeight: 1.4, color: on ? "var(--ink)" : "var(--ink-3)" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card" style={{ padding: 20, background: "var(--brand-soft)", border: "none" }}>
            <div className="display bn" style={{ fontSize: 15 }}>প্রশ্ন আছে?</div>
            <p className="bn" style={{ fontSize: 13, color: "var(--brand-d)", margin: "7px 0 13px", lineHeight: 1.5 }}>যেকোনো কোর্স কিনলে সরাসরি ইন্সট্রাক্টরকে প্রশ্ন করতে পারবেন।</p>
            <button className="btn btn-brand btn-sm" style={{ width: "100%" }} onClick={() => courses[0] ? go({ view: "site", page: "course", id: courses[0].slug }) : go({ view: "site", page: "browse" })}>কোর্স দেখুন</button>
          </div>
        </aside>
      </div>
    </div>
  );
}

Object.assign(window, { InstructorProfile });
