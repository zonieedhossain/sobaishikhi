/* SobaiShikhi — Course detail */
function CourseDetail({ go, slug }) {
  const D = window.DATA;
  const c = D.courses.find((x) => x.slug === slug) || D.courses[0];
  const instr = window.instrOf(c);
  const cat = window.catOf(c);
  const reviews = D.reviews.filter((r) => r.course === c.id);
  const [openSection, setOpenSection] = React.useState(0);
  const [enrolled, setEnrolled] = React.useState(false);

  const sections = [
    { t: "শুরু করা — Getting Started", lessons: [["Course introduction", "3:20", true], ["How to use this course", "5:10", true], ["Setting up your tools", "8:40", false]] },
    { t: "মূল ভিত্তি — Core Foundations", lessons: [["The fundamentals explained", "12:05", false], ["Hands-on: first project", "18:30", false], ["Common mistakes to avoid", "9:15", false], ["Practice quiz", "Quiz", false]] },
    { t: "প্রজেক্ট — Build a Real Project", lessons: [["Project walkthrough", "22:40", false], ["Step-by-step build", "31:10", false], ["Debugging & polish", "14:25", false]] },
    { t: "ক্যারিয়ার — Next Steps & Career", lessons: [["Building your portfolio", "11:00", false], ["Finding clients & jobs", "16:20", false], ["Final assignment", "Assignment", false]] },
  ];
  const totalLessons = sections.reduce((a, s) => a + s.lessons.length, 0);

  return (
    <div>
      {/* dark header */}
      <div style={{ background: "var(--ink)", color: "var(--ink-inv)" }}>
        <div className="wrap" style={{ padding: "32px 28px", display: "grid", gridTemplateColumns: "1fr 360px", gap: 40 }} className="detail-grid">
          <div>
            <div className="mono" style={{ fontSize: 12, color: "oklch(0.7 0.01 260)", marginBottom: 12, cursor: "pointer" }} onClick={() => go({ view: "site", page: "browse", id: c.cat })}>
              {cat.name} →
            </div>
            <h1 className="display" style={{ fontSize: 34, lineHeight: 1.12 }}>{c.title}</h1>
            <div className="bn" style={{ fontSize: 18, color: "oklch(0.82 0.01 260)", marginTop: 8 }}>{c.titleBn}</div>
            <p className="bn" style={{ fontSize: 16, color: "oklch(0.82 0.01 260)", marginTop: 14, lineHeight: 1.6, maxWidth: 560 }}>{c.blurb}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 18, flexWrap: "wrap" }}>
              <Stars value={c.rating} size={15} showNum count={c.ratings} />
              {c.bestseller && <span className="badge gold">Bestseller</span>}
              <span className="mono" style={{ fontSize: 13, color: "oklch(0.78 0.01 260)" }}>{c.students.toLocaleString()} students</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16, cursor: "pointer" }} onClick={() => go({ view: "site", page: "instructor-profile", id: instr.id })}>
              <Avatar initials={instr.initials} size={34} hue={cat.hue} />
              <span style={{ fontSize: 14 }}>তৈরি করেছেন <strong style={{ textDecoration: "underline", textUnderlineOffset: 3 }}>{instr.name}</strong></span>
              {instr.verified && <span className="badge green"><Icon name="checkC" size={12} /> Verified</span>}
            </div>
          </div>
          <div />
        </div>
      </div>

      <div className="wrap" style={{ padding: "0 28px", display: "grid", gridTemplateColumns: "1fr 360px", gap: 40, alignItems: "start" }} className="detail-grid">
        {/* LEFT content */}
        <div style={{ padding: "36px 0 80px" }}>
          {/* what you'll learn */}
          <div className="card" style={{ padding: 24 }}>
            <h3 className="display bn" style={{ fontSize: 20, marginBottom: 16 }}>যা শিখবেন</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {["চাকরি ও ফ্রিল্যান্সিং-উপযোগী দক্ষতা", "হাতে-কলমে রিয়েল প্রজেক্ট", "ধাপে ধাপে বাংলায় ব্যাখ্যা", "লাইফটাইম অ্যাক্সেস ও আপডেট", "মোবাইল ও কম্পিউটারে অ্যাক্সেস", "ইন্সট্রাক্টরের কাছে প্রশ্ন করার সুযোগ"].map((o) => (
                <div key={o} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <Icon name="check" size={16} style={{ color: "var(--brand)", marginTop: 3, flexShrink: 0 }} />
                  <span className="bn" style={{ fontSize: 14.5, lineHeight: 1.45 }}>{o}</span>
                </div>
              ))}
            </div>
          </div>

          {/* curriculum */}
          <div style={{ marginTop: 32 }}>
            <div className="spread" style={{ marginBottom: 14 }}>
              <h3 className="display bn" style={{ fontSize: 22 }}>কোর্স কনটেন্ট</h3>
              <span className="mono" style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{sections.length} sections · {totalLessons} lessons · {c.hours}h</span>
            </div>
            <div className="card" style={{ overflow: "hidden" }}>
              {sections.map((s, si) => {
                const open = openSection === si;
                return (
                  <div key={si} style={{ borderTop: si ? "1px solid var(--line)" : "none" }}>
                    <button onClick={() => setOpenSection(open ? -1 : si)} className="spread" style={{ width: "100%", background: open ? "var(--paper-2)" : "var(--card)", border: "none", padding: "15px 18px", cursor: "pointer", textAlign: "left" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <Icon name={open ? "chevD" : "chevR"} size={16} style={{ color: "var(--ink-3)" }} />
                        <span className="display bn" style={{ fontSize: 15.5 }}>{s.t}</span>
                      </span>
                      <span className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{s.lessons.length} lessons</span>
                    </button>
                    {open && s.lessons.map(([title, dur, preview], li) => (
                      <div key={li} className="spread" style={{ padding: "11px 18px 11px 46px", borderTop: "1px solid var(--line-2)" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 11 }}>
                          <Icon name={dur === "Quiz" || dur === "Assignment" ? "edit" : "play2"} size={16} style={{ color: "var(--ink-3)" }} />
                          <span style={{ fontSize: 14 }}>{title}</span>
                          {preview && <span className="badge green" style={{ cursor: "pointer" }} onClick={() => go({ view: "site", page: "watch", id: c.slug })}>Preview</span>}
                        </span>
                        <span className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{dur}</span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* instructor */}
          <div style={{ marginTop: 32 }}>
            <h3 className="display bn" style={{ fontSize: 22, marginBottom: 14 }}>ইন্সট্রাক্টর</h3>
            <div className="card" style={{ padding: 24, display: "flex", gap: 18, cursor: "pointer" }} onClick={() => go({ view: "site", page: "instructor-profile", id: instr.id })}>
              <Avatar initials={instr.initials} size={64} hue={cat.hue} />
              <div style={{ flex: 1 }}>
                <div className="display" style={{ fontSize: 18 }}>{instr.name} {instr.verified && <Icon name="checkC" size={15} style={{ color: "var(--brand)", verticalAlign: "-2px" }} />}</div>
                <div className="bn" style={{ fontSize: 13.5, color: "var(--brand-d)" }}>{instr.title}</div>
                <div style={{ display: "flex", gap: 18, marginTop: 12, flexWrap: "wrap" }}>
                  {[["star", `${instr.rating} rating`], ["users", `${instr.students.toLocaleString()} students`], ["play2", `${instr.courses} courses`]].map(([ic, v]) => (
                    <span key={v} style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon name={ic} size={15} style={{ color: "var(--ink-3)" }} /><span className="mono" style={{ fontSize: 12.5 }}>{v}</span></span>
                  ))}
                </div>
                <div className="bn" style={{ fontSize: 13, color: "var(--brand-d)", marginTop: 12, display: "flex", alignItems: "center", gap: 5 }}>সম্পূর্ণ প্রোফাইল দেখুন <Icon name="arrow" size={14} /></div>
              </div>
            </div>
          </div>

          {/* reviews */}
          {reviews.length > 0 && (
            <div style={{ marginTop: 32 }}>
              <h3 className="display bn" style={{ fontSize: 22, marginBottom: 14 }}>শিক্ষার্থীদের রিভিউ</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {reviews.map((r) => (
                  <div key={r.id} className="card" style={{ padding: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <Avatar initials={r.initials} size={38} />
                      <div><div className="display" style={{ fontSize: 14.5 }}>{r.name}</div><div style={{ display: "flex", alignItems: "center", gap: 8 }}><Stars value={r.rating} size={12} /><span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>{r.when}</span></div></div>
                    </div>
                    <p className="bn" style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--ink)", margin: "12px 0 0" }}>{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT — sticky purchase card (overlaps dark header) */}
        <div style={{ marginTop: -180 }} className="buy-col">
          <div className="card" style={{ overflow: "hidden", boxShadow: "var(--shadow-lg)", position: "sticky", top: 88 }}>
            <div style={{ position: "relative", cursor: "pointer" }} onClick={() => go({ view: "site", page: "watch", id: c.slug })}>
              <Slot label="preview.mp4" h={200} dark style={{ borderRadius: 0 }} />
              <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
                <div style={{ width: 58, height: 58, borderRadius: 999, background: "oklch(1 0 0 / 0.95)", display: "grid", placeItems: "center", boxShadow: "var(--shadow-lg)" }}><Icon name="playS" size={26} style={{ color: "var(--ink)" }} /></div>
              </div>
              <span className="chip solid" style={{ position: "absolute", bottom: 10, left: 10, fontSize: 11 }}>ফ্রি প্রিভিউ দেখুন</span>
            </div>
            <div style={{ padding: 22 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span className="display" style={{ fontSize: 32 }}>{window.taka(c.price)}</span>
                <span className="mono" style={{ fontSize: 15, color: "var(--ink-3)", textDecoration: "line-through" }}>{window.taka(c.oldPrice)}</span>
                <span className="badge red" style={{ marginLeft: "auto" }}>{Math.round((1 - c.price / c.oldPrice) * 100)}% OFF</span>
              </div>
              <div className="mono" style={{ fontSize: 12, color: "var(--accent-d)", marginTop: 6 }}>⏳ অফার শেষ হতে বাকি ২ দিন</div>

              {enrolled ? (
                <button className="btn btn-brand btn-lg" style={{ width: "100%", marginTop: 16 }} onClick={() => go({ view: "learner" })}>শেখা চালিয়ে যান <Icon name="arrow" size={18} /></button>
              ) : (
                <>
                  <button className="btn btn-accent btn-lg" style={{ width: "100%", marginTop: 16 }} onClick={() => setEnrolled(true)}><Icon name="cart" size={18} /> এনরোল করুন</button>
                  <button className="btn btn-ghost" style={{ width: "100%", marginTop: 10 }} onClick={() => setEnrolled(true)}>উইশলিস্টে যোগ করুন</button>
                </>
              )}
              {enrolled && <div className="bn" style={{ textAlign: "center", fontSize: 13, color: "var(--brand-d)", marginTop: 10 }}>✓ আপনি এই কোর্সে এনরোল করেছেন</div>}

              <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 11 }}>
                {[["play2", `${totalLessons} ভিডিও লেসন`], ["clock", `${c.hours} ঘণ্টা কনটেন্ট`], ["globe", c.lang], ["play2", "লাইফটাইম অ্যাক্সেস"], ["shield", "৭ দিনের মানি-ব্যাক গ্যারান্টি"]].map(([ic, v]) => (
                  <div key={v} style={{ display: "flex", alignItems: "center", gap: 11 }}><Icon name={ic} size={17} style={{ color: "var(--ink-3)" }} /><span className="bn" style={{ fontSize: 14 }}>{v}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* lightweight lesson player (preview) */
function WatchPage({ go, slug }) {
  const D = window.DATA;
  const c = D.courses.find((x) => x.slug === slug) || D.courses[0];
  const [playing, setPlaying] = React.useState(false);
  const lessons = ["Course introduction", "How to use this course", "Setting up your tools", "The fundamentals explained"];
  const [active, setActive] = React.useState(0);
  return (
    <div style={{ background: "var(--ink)", minHeight: "100vh" }}>
      <div className="wrap" style={{ padding: "20px 28px" }}>
        <button onClick={() => go({ view: "site", page: "course", id: c.slug })} className="mono" style={{ background: "none", border: "none", color: "oklch(0.78 0.01 260)", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}><Icon name="arrowL" size={16} /> কোর্সে ফিরে যান</button>
      </div>
      <div className="wrap" style={{ padding: "0 28px 60px", display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "start" }} className="detail-grid">
        <div>
          <div className="card" style={{ overflow: "hidden", border: "none" }}>
            <div style={{ position: "relative" }}>
              <Slot label={`lesson-${active + 1}.mp4 — ${lessons[active]}`} h={420} dark style={{ borderRadius: 0 }} />
              <div onClick={() => setPlaying((p) => !p)} style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", cursor: "pointer" }}>
                <div style={{ width: 72, height: 72, borderRadius: 999, background: "oklch(1 0 0 / 0.95)", display: "grid", placeItems: "center", boxShadow: "var(--shadow-lg)" }}>
                  {playing ? <div style={{ display: "flex", gap: 6 }}><span style={{ width: 6, height: 24, background: "var(--ink)", borderRadius: 2 }} /><span style={{ width: 6, height: 24, background: "var(--ink)", borderRadius: 2 }} /></div> : <Icon name="playS" size={32} style={{ color: "var(--ink)", marginLeft: 3 }} />}
                </div>
              </div>
            </div>
          </div>
          <h1 className="display" style={{ color: "var(--ink-inv)", fontSize: 24, marginTop: 20 }}>{c.title}</h1>
          <div className="bn" style={{ color: "oklch(0.78 0.01 260)", fontSize: 15, marginTop: 6 }}>Lesson {active + 1}: {lessons[active]}</div>
        </div>
        <div className="card scroll" style={{ padding: 0, overflow: "hidden", maxHeight: 480, overflowY: "auto" }}>
          <div style={{ padding: "16px 18px", borderBottom: "1px solid var(--line)" }} className="display">কোর্স কনটেন্ট</div>
          {lessons.map((l, i) => (
            <button key={i} onClick={() => { setActive(i); setPlaying(true); }} className="spread" style={{ width: "100%", border: "none", borderBottom: "1px solid var(--line-2)", background: active === i ? "var(--brand-soft)" : "var(--card)", padding: "13px 18px", cursor: "pointer", textAlign: "left" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 11 }}><Icon name={active === i && playing ? "play2" : "play2"} size={16} style={{ color: active === i ? "var(--brand-d)" : "var(--ink-3)" }} /><span style={{ fontSize: 13.5 }}>{l}</span></span>
              <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>{["3:20", "5:10", "8:40", "12:05"][i]}</span>
            </button>
          ))}
          <div style={{ padding: 16 }}><button className="btn btn-accent" style={{ width: "100%" }} onClick={() => go({ view: "site", page: "course", id: c.slug })}>পুরো কোর্স আনলক করুন</button></div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CourseDetail, WatchPage });
