/* SobaiShikhi — Learner dashboard */
function LearnerDash({ go }) {
  const D = window.DATA;
  const me = D.learner;
  const enrolled = me.enrolled.map((e) => ({ ...e, c: window.byId(D.courses, e.course) }));
  const cont = enrolled[0];

  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)" }}>
      <PortalBar go={go} role="learner" me={me} />
      <div className="wrap" style={{ padding: "32px 28px 80px" }}>
        <div className="spread" style={{ alignItems: "flex-end", marginBottom: 24 }}>
          <div>
            <div className="kicker">আজ · Jun 11</div>
            <h1 className="display bn" style={{ fontSize: 34, marginTop: 8 }}>স্বাগতম, রিয়া 👋</h1>
          </div>
          <button className="btn btn-ghost" onClick={() => go({ view: "site", page: "browse" })}>নতুন কোর্স খুঁজুন <Icon name="search" size={16} /></button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 22 }} className="dash-grid">
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            {/* continue learning hero */}
            <div className="card" style={{ overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "220px 1fr" }} className="course-prog">
                <Slot label={`${cont.c.slug}.jpg`} h={190} dark style={{ borderRadius: 0 }} />
                <div style={{ padding: 24 }}>
                  <span className="badge green">চলমান · {cont.progress}% শেষ</span>
                  <h2 className="display" style={{ fontSize: 22, marginTop: 12 }}>{cont.c.title}</h2>
                  <div className="bn" style={{ fontSize: 13.5, color: "var(--ink-3)", marginTop: 4 }}>পরবর্তী: {cont.last}</div>
                  <div style={{ marginTop: 16 }}><Progress value={cont.progress} h={9} /></div>
                  <button className="btn btn-accent" style={{ marginTop: 18 }} onClick={() => go({ view: "site", page: "watch", id: cont.c.slug })}><Icon name="playS" size={16} /> শেখা চালিয়ে যান</button>
                </div>
              </div>
            </div>

            {/* my courses */}
            <div>
              <div className="spread" style={{ marginBottom: 14 }}>
                <h3 className="display bn" style={{ fontSize: 20 }}>আমার কোর্স</h3>
                <span className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{enrolled.length} enrolled</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {enrolled.map((e) => (
                  <div key={e.course} className="card" style={{ padding: 14, display: "flex", gap: 16, alignItems: "center" }}>
                    <Slot label="▶" h={64} dark style={{ width: 110, borderRadius: 10, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div className="display" style={{ fontSize: 15.5 }}>{e.c.title}</div>
                      <div className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)", margin: "5px 0 9px" }}>{window.instrOf(e.c).name} · {e.progress}% complete</div>
                      <Progress value={e.progress} />
                    </div>
                    <button className="btn btn-soft btn-sm" onClick={() => go({ view: "site", page: "watch", id: e.c.slug })}>Resume</button>
                  </div>
                ))}
              </div>
            </div>

            {/* recommended */}
            <div>
              <h3 className="display bn" style={{ fontSize: 20, marginBottom: 14 }}>আপনার জন্য রেকমেন্ডেড</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }} className="course-grid">
                {D.courses.filter((c) => c.status === "published" && !me.enrolled.find((e) => e.course === c.id)).slice(0, 3).map((c) => <CourseCard key={c.id} c={c} go={go} compact />)}
              </div>
            </div>
          </div>

          {/* right */}
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div className="card" style={{ padding: 22, background: "var(--brand)", color: "#fff", border: "none" }}>
              <div className="spread"><span className="bn" style={{ fontSize: 14, opacity: .9 }}>শেখার ধারাবাহিকতা</span><Icon name="flame" size={20} style={{ fill: "#fff", stroke: "#fff" }} /></div>
              <div className="display" style={{ fontSize: 40, marginTop: 8 }}>{me.streak} দিন</div>
              <div className="bn" style={{ fontSize: 13, opacity: .85, marginTop: 2 }}>এই সপ্তাহে {me.minutesWeek} মিনিট শিখেছেন</div>
              <div style={{ display: "flex", gap: 5, marginTop: 16 }}>
                {["শ", "র", "সো", "ম", "বু", "বৃ", "শু"].map((d, i) => (
                  <div key={i} style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ height: 30, borderRadius: 6, background: i < 5 ? "oklch(1 0 0 / 0.9)" : "oklch(1 0 0 / 0.25)" }} />
                    <div className="bn" style={{ fontSize: 10, marginTop: 4, opacity: .8 }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ padding: 22 }}>
              <div className="kicker" style={{ marginBottom: 14 }}>সম্পন্ন কোর্স</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {me.certificates.map((cert) => {
                  const cc = window.byId(D.courses, cert.course);
                  return (
                    <div key={cert.course} onClick={() => go({ view: "site", page: "course", id: cc.slug })} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", border: "1px solid var(--line)", borderRadius: 12, cursor: "pointer" }}>
                      <div style={{ width: 38, height: 38, borderRadius: 9, background: "var(--brand-soft)", color: "var(--brand-d)", display: "grid", placeItems: "center" }}><Icon name="checkC" size={20} /></div>
                      <div style={{ flex: 1 }}><div className="display" style={{ fontSize: 14 }}>{cc.title}</div><div className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>সম্পন্ন · {cert.date}</div></div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="card" style={{ padding: 22 }}>
              <div className="kicker" style={{ marginBottom: 14 }}>উইশলিস্ট</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {me.wishlist.map((id) => {
                  const c = window.byId(D.courses, id);
                  return (
                    <div key={id} onClick={() => go({ view: "site", page: "course", id: c.slug })} style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
                      <Slot label="♥" h={44} dark style={{ width: 64, borderRadius: 8, flexShrink: 0 }} />
                      <div style={{ flex: 1 }}><div className="display" style={{ fontSize: 13.5, lineHeight: 1.2 }}>{c.title}</div><div className="display" style={{ fontSize: 13, color: "var(--accent-d)", marginTop: 3 }}>{window.taka(c.price)}</div></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* shared portal top bar for learner + instructor */
function PortalBar({ go, role, me }) {
  const label = role === "learner" ? "Learner Dashboard" : "Instructor Dashboard";
  return (
    <header style={{ background: "var(--card)", borderBottom: "1px solid var(--line)", position: "sticky", top: 0, zIndex: 30 }}>
      <div className="wrap spread" style={{ height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Logo size={20} onClick={() => go({ view: "site", page: "home" })} />
          <span className="chip">{label}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button className="btn btn-ghost btn-sm" style={{ width: 38, height: 38, padding: 0 }}><Icon name="bell" size={18} /></button>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <Avatar initials={me.initials} brand size={34} />
            <div className="bn" style={{ lineHeight: 1.15, whiteSpace: "nowrap" }}><div className="display" style={{ fontSize: 14 }}>{me.name}</div><div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)" }}>{me.title || me.bn || ""}</div></div>
          </div>
        </div>
      </div>
    </header>
  );
}

Object.assign(window, { LearnerDash, PortalBar });
