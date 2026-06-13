/* SobaiShikhi — site chrome, Home, CourseCard, CategoryCard, BecomeInstructor */

function CourseCard({ c, go, compact }) {
  const instr = window.instrOf(c);
  const cat = window.catOf(c);
  return (
    <div className="card" onClick={() => go({ view: "site", page: "course", id: c.slug })}
      style={{ overflow: "hidden", cursor: "pointer", display: "flex", flexDirection: "column", transition: "transform .14s, box-shadow .14s" }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "var(--shadow-lg)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
      <div style={{ position: "relative" }}>
        <Slot label={`${c.slug}.jpg`} h={compact ? 120 : 150} dark style={{ borderRadius: 0 }} />
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
          <div style={{ width: 42, height: 42, borderRadius: 999, background: "oklch(1 0 0 / 0.92)", display: "grid", placeItems: "center", boxShadow: "var(--shadow)" }}>
            <Icon name="playS" size={18} style={{ color: "var(--ink)" }} />
          </div>
        </div>
        <span className="chip" style={{ position: "absolute", top: 10, left: 10, background: `oklch(0.42 0.12 ${cat.hue})`, color: "#fff", border: "none", fontSize: 10.5 }}>{cat.bn}</span>
        {c.bestseller && <span className="badge gold" style={{ position: "absolute", top: 10, right: 10 }}>Bestseller</span>}
      </div>
      <div style={{ padding: 15, display: "flex", flexDirection: "column", gap: 7, flex: 1 }}>
        <div className="display" style={{ fontSize: 16, lineHeight: 1.2 }}>{c.title}</div>
        <div className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>
          <span onClick={(e) => { e.stopPropagation(); go({ view: "site", page: "instructor-profile", id: instr.id }); }} style={{ cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.style.textDecoration = "underline"} onMouseLeave={(e) => e.currentTarget.style.textDecoration = "none"}>{instr.name}</span>
          {instr.verified && <Icon name="checkC" size={12} style={{ color: "var(--brand)", marginLeft: 4, verticalAlign: "-2px" }} />}
        </div>
        <Stars value={c.rating} size={13} showNum count={c.ratings} />
        <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", display: "flex", alignItems: "center", gap: 5 }}>
          <Icon name="users" size={13} /> {c.students > 0 ? c.students.toLocaleString() + " শিক্ষার্থী" : "নতুন কোর্স"} · {c.lessons} lessons
        </div>
        <div className="spread" style={{ marginTop: "auto", paddingTop: 6 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 7 }}>
            <span className="display" style={{ fontSize: 19, color: "var(--accent-d)" }}>{window.taka(c.price)}</span>
            <span className="mono" style={{ fontSize: 12, color: "var(--ink-3)", textDecoration: "line-through" }}>{window.taka(c.oldPrice)}</span>
          </div>
          <span className="badge red" style={{ fontSize: 10 }}>{Math.round((1 - c.price / c.oldPrice) * 100)}% OFF</span>
        </div>
      </div>
    </div>
  );
}

function CategoryCard({ cat, go }) {
  return (
    <button onClick={() => go({ view: "site", page: "browse", id: cat.id })}
      style={{ textAlign: "left", background: "var(--card)", border: "1px solid var(--line)", borderRadius: 14, padding: 16, cursor: "pointer", display: "flex", alignItems: "center", gap: 13, transition: "border-color .14s, box-shadow .14s" }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "var(--shadow)"; e.currentTarget.style.borderColor = `oklch(0.7 0.1 ${cat.hue})`; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--line)"; }}>
      <div style={{ width: 42, height: 42, borderRadius: 11, background: `oklch(0.94 0.05 ${cat.hue})`, color: `oklch(0.45 0.13 ${cat.hue})`, display: "grid", placeItems: "center", flexShrink: 0 }}>
        <Icon name={cat.icon} size={22} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div className="display" style={{ fontSize: 14.5 }}>{cat.name}</div>
        <div className="bn" style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 2 }}>{cat.bn} · {cat.courses.toLocaleString()}</div>
      </div>
    </button>
  );
}

function SiteNav({ go, route }) {
  const [q, setQ] = React.useState("");
  const submit = () => go({ view: "site", page: "browse", q });
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 40, background: "oklch(1 0 0 / 0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--line)" }}>
      <div className="wrap" style={{ height: 70, display: "flex", alignItems: "center", gap: 22 }}>
        <Logo size={21} onClick={() => go({ view: "site", page: "home" })} />
        {[["Courses", "browse", ["browse", "course"]], ["Repair", "repair", ["repair", "repair-guide", "forum", "contribute"]], ["Store", "store", ["store", "parts"]], ["Experts", "experts", ["experts", "services"]], ["Blog", "blog", ["blog", "blog-post"]], ["AI Help", "ai", ["ai"]]].map(([label, page, group]) => (
          <button key={page} onClick={() => go({ view: "site", page })} className="display nav-cats" style={{ background: "none", border: "none", fontSize: 14.5, fontWeight: group.includes(route.page) ? 700 : 500, color: group.includes(route.page) ? "var(--brand-d)" : "var(--ink-2)", cursor: "pointer" }}>
            {label}
          </button>
        ))}
        <div className="nav-search" style={{ flex: 1, maxWidth: 520, position: "relative" }}>
          <Icon name="search" size={18} style={{ position: "absolute", left: 14, top: 12, color: "var(--ink-3)" }} />
          <input className="input" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Search courses — e.g. Web Development" style={{ padding: "10px 14px 10px 42px", borderRadius: 999, background: "var(--paper-2)" }} />
        </div>
        <button onClick={() => go({ view: "instructor" })} className="display nav-teach" style={{ background: "none", border: "none", fontSize: 14.5, color: "var(--ink-2)", cursor: "pointer" }}>Teach</button>
        <button className="btn btn-ghost btn-sm" style={{ width: 40, height: 40, padding: 0, borderRadius: 10 }} onClick={() => go({ view: "site", page: "course", id: "web-dev-bangla" })}><Icon name="cart" size={19} /></button>
        <button className="btn btn-ghost btn-sm nav-login" onClick={() => go({ view: "learner" })}>Log in</button>
        <button className="btn btn-accent btn-sm" onClick={() => go({ view: "site", page: "signup" })}>Sign up</button>
      </div>
    </header>
  );
}

function Footer({ go }) {
  return (
    <footer style={{ background: "var(--ink)", color: "var(--ink-inv)" }}>
      <div className="wrap" style={{ padding: "56px 28px 36px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 32 }} className="footer-grid">
          <div>
            <Logo light size={21} />
            <p className="bn" style={{ color: "oklch(0.74 0.01 260)", maxWidth: 280, marginTop: 16, lineHeight: 1.6, fontSize: 14.5 }}>
              বাংলাদেশের সবচেয়ে বড় লার্নিং মার্কেটপ্লেস। যে কেউ শেখাবে, সবাই শিখবে।
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              {["bKash", "Nagad", "Rocket", "Visa"].map((m) => (
                <span key={m} className="mono" style={{ fontSize: 11, padding: "5px 9px", border: "1px solid oklch(0.4 0.01 260)", borderRadius: 6, color: "oklch(0.78 0.01 260)" }}>{m}</span>
              ))}
            </div>
          </div>
          {[
            ["Learn", ["All categories", "Free courses", "Popular courses", "Live workshops"]],
            ["Teach", ["Become an instructor", "Instructor handbook", "Quality guidelines", "Revenue & payouts"]],
            ["Company", ["About SobaiShikhi", "Trust & safety", "Help center", "Contact"]],
          ].map(([h, items]) => (
            <div key={h}>
              <div className="kicker" style={{ color: "oklch(0.66 0.01 260)", marginBottom: 14 }}>{h}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map((i) => (
                  <a key={i} href="#" onClick={(e) => { e.preventDefault(); if (i === "Become an instructor") go({ view: "instructor" }); else go({ view: "site", page: "browse" }); }}
                    style={{ color: "oklch(0.82 0.01 260)", fontSize: 14.5 }}>{i}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: 1, background: "oklch(0.34 0.012 260)", margin: "36px 0 20px" }} />
        <div className="spread mono" style={{ fontSize: 12, color: "oklch(0.62 0.01 260)" }}>
          <span>© 2026 SobaiShikhi · সবাইশিখি</span>
          <span>Made in Bangladesh 🇧🇩</span>
        </div>
      </div>
    </footer>
  );
}

function Home({ go }) {
  const D = window.DATA;
  const featured = D.courses.filter((c) => c.status === "published");
  const [q, setQ] = React.useState("");
  const tags = ["ওয়েব ডেভেলপমেন্ট", "IELTS", "ফ্রিল্যান্সিং", "ডিজিটাল মার্কেটিং", "কুরআন"];
  const freeClasses = [
    ["HTML দিয়ে প্রথম ওয়েবপেজ", "ওয়েব ডেভেলপমেন্ট", 200, "12:40"],
    ["Spoken English: Daily Greetings", "ভাষা শিক্ষা", 220, "09:15"],
    ["ফেসবুক পেজ সেটআপ A–Z", "ব্যবসা", 300, "15:30"],
    ["সুরা ফাতিহার সঠিক উচ্চারণ", "ধর্মীয় শিক্ষা", 150, "08:20"],
  ];
  return (
    <div>
      {/* tagline bar */}
      <div style={{ background: "var(--ink)", color: "#fff" }}>
        <div className="wrap center" style={{ height: 40, gap: 10, fontSize: 13.5 }}>
          <span className="badge red" style={{ fontSize: 10 }}>৬০% OFF</span>
          <span className="bn">নতুন শিক্ষার্থীদের জন্য সব কোর্সে বিশাল ছাড় — সীমিত সময়ের অফার চলছে</span>
        </div>
      </div>

      {/* HERO — flat & simple */}
      <section style={{ background: "var(--card)", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 44, alignItems: "center", padding: "56px 28px" }} id="hero">
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }} className="hero-copy">
            <h1 className="display bn" style={{ fontSize: 54, lineHeight: 1.06 }}>
              যে কেউ <span style={{ color: "var(--brand)" }}>শেখাবে</span>,<br />সবাই <span style={{ color: "var(--accent)" }}>শিখবে</span>।
            </h1>
            <p className="bn" style={{ color: "var(--ink-2)", fontSize: 17, lineHeight: 1.55, maxWidth: 470 }}>
              ৮,০০০+ কোর্স, ২,৪০০+ যাচাইকৃত ইন্সট্রাক্টর। আপনি যা শিখতে চান — সবই বাংলায়, এক জায়গায়।
            </p>
            {/* hero search */}
            <div style={{ display: "flex", gap: 8, background: "var(--paper)", border: "1.5px solid var(--line)", borderRadius: 14, padding: 6, maxWidth: 480 }}>
              <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center" }}>
                <Icon name="search" size={19} style={{ position: "absolute", left: 14, color: "var(--ink-3)" }} />
                <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && go({ view: "site", page: "browse", q })}
                  className="bn" placeholder="কী শিখতে চান?" style={{ border: "none", outline: "none", background: "none", fontSize: 15.5, padding: "10px 10px 10px 42px", width: "100%", fontFamily: "var(--font-body)" }} />
              </div>
              <button className="btn btn-accent" onClick={() => go({ view: "site", page: "browse", q })}>Search</button>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <span className="bn" style={{ fontSize: 13, color: "var(--ink-3)" }}>জনপ্রিয়:</span>
              {tags.map((t) => (
                <button key={t} onClick={() => go({ view: "site", page: "browse", q: t })} className="bn" style={{ fontSize: 12.5, padding: "5px 11px", borderRadius: 999, border: "1px solid var(--line)", background: "var(--card)", color: "var(--ink-2)", cursor: "pointer" }}>{t}</button>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 2 }}>
              <Stars value={4.8} size={13} showNum />
              <span className="bn" style={{ fontSize: 12.5, color: "var(--ink-3)" }}>১.৪ লক্ষ+ শিক্ষার্থী আমাদের সাথে শিখছেন</span>
            </div>
          </div>
          <div className="hero-art">
            <div style={{ borderRadius: "var(--r-lg)", overflow: "hidden", border: "1px solid var(--line)" }}>
              <Slot label="hero — students learning" h={380} dark />
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="wrap" style={{ padding: "44px 28px 20px" }}>
        <div className="spread" style={{ marginBottom: 22 }}>
          <div>
            <h2 className="display bn" style={{ fontSize: 30 }}>যেকোনো বিষয়ে শিখুন</h2>
            <p className="bn" style={{ color: "var(--ink-3)", fontSize: 14.5, marginTop: 4 }}>একাডেমিক থেকে কারিগরি, ধর্মীয় থেকে সৃজনশীল — সব এক জায়গায়।</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => go({ view: "site", page: "browse" })}>সব ক্যাটাগরি <Icon name="arrow" size={16} /></button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }} className="cat-grid">
          {D.categories.map((cat) => <CategoryCard key={cat.id} cat={cat} go={go} />)}
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="wrap" style={{ padding: "48px 28px" }}>
        <div className="spread" style={{ marginBottom: 22 }}>
          <h2 className="display bn" style={{ fontSize: 30 }}>জনপ্রিয় কোর্স</h2>
          <button className="btn btn-ghost btn-sm" onClick={() => go({ view: "site", page: "browse" })}>আরও দেখুন <Icon name="arrow" size={16} /></button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 }} className="course-grid">
          {featured.slice(0, 8).map((c) => <CourseCard key={c.id} c={c} go={go} />)}
        </div>
      </section>

      {/* OFFER BAND */}
      <section className="wrap" style={{ padding: "8px 28px 12px" }}>
        <div style={{ borderRadius: "var(--r-lg)", background: "var(--brand)", color: "#fff", padding: "30px 38px", display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <div style={{ fontSize: 56, fontWeight: 700, fontFamily: "var(--font-display)", lineHeight: 1, letterSpacing: "-0.03em" }}>৬০%<span style={{ fontSize: 24, marginLeft: 4 }}>ছাড়</span></div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div className="display bn" style={{ fontSize: 26 }}>ঈদ স্পেশাল লার্নিং অফার</div>
            <div className="bn" style={{ fontSize: 15, opacity: 0.9, marginTop: 4 }}>সব প্রিমিয়াম কোর্সে বিশাল ছাড়। অফার শেষ হতে আর মাত্র ২ দিন বাকি।</div>
          </div>
          <button className="btn" style={{ background: "#fff", color: "var(--brand-d)" }} onClick={() => go({ view: "site", page: "browse" })}>View offers <Icon name="arrow" size={17} /></button>
        </div>
      </section>

      {/* FREE CLASSES */}
      <section className="wrap" style={{ padding: "40px 28px 8px" }}>
        <div className="spread" style={{ marginBottom: 20 }}>
          <div>
            <span className="badge green" style={{ marginBottom: 8 }}>১০০% ফ্রি</span>
            <h2 className="display bn" style={{ fontSize: 30, marginTop: 8 }}>জনপ্রিয় ফ্রি ক্লাস</h2>
            <p className="bn" style={{ color: "var(--ink-3)", fontSize: 14.5, marginTop: 4 }}>আজই শুরু করুন — কোনো খরচ ছাড়াই।</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => go({ view: "site", page: "browse" })}>সব ফ্রি ক্লাস <Icon name="arrow" size={16} /></button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }} className="course-grid">
          {freeClasses.map(([title, cat, views, dur], i) => (
            <div key={i} onClick={() => go({ view: "site", page: "watch", id: featured[i % featured.length].slug })} className="card" style={{ overflow: "hidden", cursor: "pointer", transition: "transform .14s, box-shadow .14s" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "var(--shadow-lg)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ position: "relative" }}>
                <Slot label="free-class.mp4" h={128} dark style={{ borderRadius: 0 }} />
                <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}><div style={{ width: 44, height: 44, borderRadius: 999, background: "oklch(1 0 0 / 0.94)", display: "grid", placeItems: "center", boxShadow: "var(--shadow)" }}><Icon name="playS" size={20} style={{ color: "var(--ink)" }} /></div></div>
                <span className="badge green" style={{ position: "absolute", top: 10, left: 10 }}>ফ্রি</span>
                <span className="chip solid" style={{ position: "absolute", bottom: 10, right: 10, fontSize: 10 }}>{dur}</span>
              </div>
              <div style={{ padding: 14 }}>
                <div className="display bn" style={{ fontSize: 15, lineHeight: 1.25 }}>{title}</div>
                <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 8, display: "flex", alignItems: "center", gap: 5 }}><Icon name="eye" size={13} /> {views.toLocaleString()}k views · {cat}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REPAIR ECOSYSTEM BAND */}
      <section className="wrap" style={{ padding: "40px 28px 8px" }}>
        <div style={{ borderRadius: "var(--r-xl)", overflow: "hidden", border: "1px solid var(--line)", display: "grid", gridTemplateColumns: "1.2fr 1fr" }} className="teach-band">
          <div style={{ padding: "40px 44px", background: "var(--ink)", color: "#fff" }}>
            <span className="chip" style={{ background: "oklch(0.34 0.03 260)", color: "#fff", border: "none" }}><Icon name="wrench" size={13} /> নতুন · রিপেয়ার হাব</span>
            <h2 className="display bn" style={{ fontSize: 32, marginTop: 14, lineHeight: 1.12 }}>নষ্ট হয়েছে? ফেলবেন না — <span style={{ color: "var(--accent)" }}>নিজেই সারান</span>।</h2>
            <p className="bn" style={{ color: "oklch(0.8 0.01 260)", fontSize: 14.5, lineHeight: 1.6, marginTop: 10, maxWidth: 420 }}>
              ৩,৬০০+ ধাপে ধাপে রিপেয়ার গাইড, কমিউনিটি ফোরাম, টুলস-পার্টস স্টোর আর লাইভ এক্সপার্ট — সব বাংলায়।
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
              <button className="btn btn-accent" onClick={() => go({ view: "site", page: "repair" })}>রিপেয়ার গাইড <Icon name="arrow" size={16} /></button>
              <button className="btn btn-sm" style={{ background: "oklch(0.34 0.03 260)", color: "#fff", padding: "11px 18px" }} onClick={() => go({ view: "site", page: "experts" })}>লাইভ এক্সপার্ট ৳১৯৯</button>
            </div>
          </div>
          <div style={{ background: "var(--card)", padding: "28px 30px", display: "flex", flexDirection: "column", gap: 12, justifyContent: "center" }}>
            {[
              ["book", "৩,৬০০+ রিপেয়ার গাইড", "খরচ ও সফলতার হারসহ", () => go({ view: "site", page: "repair" })],
              ["users", "কমিউনিটি ফোরাম", "এক্সপার্টদের যাচাইকৃত উত্তর", () => go({ view: "site", page: "forum" })],
              ["cart", "টুলস ও পার্টস স্টোর", "গাইডের সাথে লিংক করা", () => go({ view: "site", page: "store" })],
              ["wrench", "হোম সার্ভিস", "যাচাইকৃত টেকনিশিয়ান বুকিং", () => go({ view: "site", page: "services" })],
            ].map(([ic, t, d, fn]) => (
              <button key={t} onClick={fn} style={{ display: "flex", alignItems: "center", gap: 13, padding: "11px 13px", borderRadius: 12, border: "1px solid var(--line)", background: "var(--card)", cursor: "pointer", textAlign: "left" }}>
                <span style={{ width: 38, height: 38, borderRadius: 10, background: "var(--brand-soft)", color: "var(--brand-d)", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name={ic} size={19} /></span>
                <span style={{ flex: 1 }}>
                  <span className="display bn" style={{ fontSize: 14.5, display: "block" }}>{t}</span>
                  <span className="bn" style={{ fontSize: 12, color: "var(--ink-3)" }}>{d}</span>
                </span>
                <Icon name="chevR" size={16} style={{ color: "var(--ink-3)" }} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* BECOME INSTRUCTOR BAND */}
      <section className="wrap" style={{ padding: "20px 28px 56px" }}>
        <div style={{ background: "var(--ink)", color: "var(--ink-inv)", borderRadius: "var(--r-xl)", padding: 0, overflow: "hidden", display: "grid", gridTemplateColumns: "1.3fr 1fr" }} className="teach-band">
          <div style={{ padding: "48px 48px" }}>
            <span className="chip" style={{ background: "oklch(0.34 0.03 260)", color: "var(--ink-inv)", border: "none" }}>ইন্সট্রাক্টর প্রোগ্রাম</span>
            <h2 className="display bn" style={{ fontSize: 38, marginTop: 16, lineHeight: 1.1 }}>আপনার জ্ঞান থেকেই আয় করুন।</h2>
            <p className="bn" style={{ color: "oklch(0.8 0.01 260)", fontSize: 16, lineHeight: 1.6, marginTop: 12, maxWidth: 440 }}>
              কোর্স বানান, পাবলিশ করুন, আর প্রতিটি বিক্রয়ে আয় করুন। আমরা সামলাই টেকনোলজি, পেমেন্ট আর মার্কেটিং — আপনি শুধু শেখান।
            </p>
            <button className="btn btn-accent btn-lg" style={{ marginTop: 24 }} onClick={() => go({ view: "instructor" })}>শেখানো শুরু করুন <Icon name="arrow" size={18} /></button>
          </div>
          <Slot label="instructor recording a course" h="100%" dark style={{ borderRadius: 0, minHeight: 280 }} />
        </div>
      </section>

      {/* TRUST / QUALITY */}
      <section style={{ background: "var(--card)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap" style={{ padding: "56px 28px" }}>
          <div className="kicker">Why SobaiShikhi</div>
          <h2 className="display bn" style={{ fontSize: 30, marginTop: 10, marginBottom: 30 }}>বিশ্বাস আর মানের প্ল্যাটফর্ম</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="cat-grid">
            {[
              ["shield", "যাচাইকৃত ইন্সট্রাক্টর", "প্রতিটি ইন্সট্রাক্টর ভেরিফিকেশন পার হয়ে তবেই শেখাতে পারেন।"],
              ["checkC", "অনুমোদিত কোর্স", "প্রতিটি কোর্স অ্যাডমিন রিভিউয়ের পর প্রকাশিত হয় — মান নিশ্চিত।"],
              ["globe", "লাইফটাইম অ্যাক্সেস", "একবার এনরোল করলেই সারাজীবন অ্যাক্সেস — মোবাইল বা কম্পিউটারে, যখন খুশি।"],
            ].map(([ic, h, b]) => (
              <div key={h} className="card" style={{ padding: 24 }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: "var(--brand-soft)", color: "var(--brand-d)", display: "grid", placeItems: "center", marginBottom: 16 }}><Icon name={ic} size={24} /></div>
                <h3 className="display bn" style={{ fontSize: 19 }}>{h}</h3>
                <p className="bn" style={{ color: "var(--ink-2)", fontSize: 14.5, lineHeight: 1.6, marginTop: 8 }}>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 40 }} />
    </div>
  );
}

/* ---------- BECOME INSTRUCTOR (public landing) ---------- */
function BecomeInstructor({ go }) {
  const steps = [
    ["Register & verify", "রেজিস্ট্রেশন ও যাচাই — পরিচয় নিশ্চিত করুন।"],
    ["Create your course", "ভিডিও, লেসন, কুইজ আর অ্যাসাইনমেন্ট যোগ করুন।"],
    ["Submit for review", "অ্যাডমিন রিভিউয়ের জন্য জমা দিন।"],
    ["Publish & earn", "অনুমোদনের পর প্রকাশ করুন, প্রতিটি বিক্রয়ে আয় করুন।"],
  ];
  return (
    <div>
      <section className="wrap detail-grid" style={{ padding: "64px 28px", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "center" }}>
        <div>
          <span className="chip brand">ইন্সট্রাক্টর হোন</span>
          <h1 className="display bn" style={{ fontSize: 52, marginTop: 16, lineHeight: 1.05 }}>আপনার দক্ষতা শেখান, আয় করুন।</h1>
          <p className="bn" style={{ color: "var(--ink-2)", fontSize: 18, lineHeight: 1.6, marginTop: 14 }}>
            বাংলাদেশের লক্ষ শিক্ষার্থীর কাছে পৌঁছান। স্বচ্ছ কমিশন মডেলে আয় ভাগ করি — আপনি শেখান, বাকিটা আমরা দেখি।
          </p>
          <button className="btn btn-accent btn-lg" style={{ marginTop: 24 }} onClick={() => go({ view: "instructor" })}>ড্যাশবোর্ডে যান <Icon name="arrow" size={18} /></button>
        </div>
        <div className="card" style={{ overflow: "hidden", borderRadius: "var(--r-xl)" }}><Slot label="instructor studio" h={340} dark /></div>
      </section>
      <section className="wrap" style={{ padding: "0 28px 56px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }} className="cat-grid">
          {steps.map(([h, b], i) => (
            <div key={h} className="card" style={{ padding: 22 }}>
              <div className="display" style={{ fontSize: 13, width: 30, height: 30, borderRadius: 8, background: "var(--accent)", color: "#fff", display: "grid", placeItems: "center" }}>{i + 1}</div>
              <h3 className="display" style={{ fontSize: 17, marginTop: 14 }}>{h}</h3>
              <p className="bn" style={{ color: "var(--ink-2)", fontSize: 14, lineHeight: 1.55, marginTop: 6 }}>{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* THREE WAYS TO TEACH */}
      <section style={{ background: "var(--card)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap" style={{ padding: "56px 28px" }}>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 32px" }}>
            <span className="chip brand">তিনভাবে শেখাতে পারেন</span>
            <h2 className="display bn" style={{ fontSize: 34, marginTop: 14 }}>আপনার সুবিধামতো বেছে নিন</h2>
            <p className="bn" style={{ color: "var(--ink-2)", fontSize: 16, lineHeight: 1.6, marginTop: 10 }}>
              নিজে বানান সর্বোচ্চ আয়ে, আমাদের দিয়ে বানিয়ে নিন, অথবা আপনার আইডিয়া আমাদের কাছে বিক্রি করুন।
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="cat-grid">
            {/* Self-produced */}
            <div className="card" style={{ padding: 26 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--brand-soft)", color: "var(--brand-d)", display: "grid", placeItems: "center" }}><Icon name="play2" size={24} /></div>
              <h3 className="display" style={{ fontSize: 20, marginTop: 16 }}>Self-Produced</h3>
              <div className="bn" style={{ fontSize: 13.5, color: "var(--ink-3)", marginTop: 4 }}>নিজের ক্যামেরায় রেকর্ড ও এডিট</div>
              <div className="spread" style={{ margin: "16px 0", alignItems: "baseline" }}>
                <span className="display" style={{ fontSize: 28, color: "var(--brand-d)" }}>৮০%</span>
                <span className="bn" style={{ fontSize: 13, color: "var(--ink-3)" }}>আপনি রাখবেন · ২০% কমিশন</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {["নিজের ভিডিও, নিজের নিয়ন্ত্রণ", "কোর্সের দাম নিজে ঠিক করুন", "সর্বোচ্চ আয়ের হার"].map((t) => (
                  <div key={t} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}><Icon name="check" size={15} style={{ color: "var(--brand)", marginTop: 2, flexShrink: 0 }} /><span className="bn" style={{ fontSize: 13.5 }}>{t}</span></div>
                ))}
              </div>
              <button className="btn btn-ghost" style={{ width: "100%", marginTop: 20 }} onClick={() => go({ view: "instructor", tab: "build" })}>নিজে বানান</button>
            </div>

            {/* We produce */}
            <div className="card" style={{ padding: 26, border: "2px solid var(--accent)", position: "relative" }}>
              <span className="badge" style={{ position: "absolute", top: -11, right: 22, background: "var(--accent)", color: "#fff" }}>সবচেয়ে জনপ্রিয়</span>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--accent-soft)", color: "var(--accent-d)", display: "grid", placeItems: "center" }}><Icon name="users" size={24} /></div>
              <h3 className="display" style={{ fontSize: 20, marginTop: 16 }}>We Produce For You</h3>
              <div className="bn" style={{ fontSize: 13.5, color: "var(--ink-3)", marginTop: 4 }}>ক্যামেরা + এডিটিং সহায়তা</div>
              <div className="spread" style={{ margin: "16px 0", alignItems: "baseline" }}>
                <span className="display" style={{ fontSize: 28, color: "var(--accent-d)" }}>৪০–৫০%</span>
                <span className="bn" style={{ fontSize: 13, color: "var(--ink-3)" }}>আপনি রাখবেন · প্রোডাকশন আমাদের</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {["শুটিং, এডিটিং, থাম্বনেইল আমরা করি", "শুধু আপনার জ্ঞানটা দিন", "স্টুডিও বা আপনার সুবিধামতো"].map((t) => (
                  <div key={t} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}><Icon name="check" size={15} style={{ color: "var(--accent-d)", marginTop: 2, flexShrink: 0 }} /><span className="bn" style={{ fontSize: 13.5 }}>{t}</span></div>
                ))}
              </div>
              <button className="btn btn-accent" style={{ width: "100%", marginTop: 20 }} onClick={() => go({ view: "instructor", tab: "managed" })}>সহায়তা চান <Icon name="arrow" size={16} /></button>
            </div>

            {/* Buy-out */}
            <div className="card" style={{ padding: 26 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--ink)", color: "var(--accent)", display: "grid", placeItems: "center" }}><Icon name="money" size={24} /></div>
              <h3 className="display" style={{ fontSize: 20, marginTop: 16 }}>Sell Your Idea</h3>
              <div className="bn" style={{ fontSize: 13.5, color: "var(--ink-3)", marginTop: 4 }}>আইডিয়া বিক্রি করুন</div>
              <div className="spread" style={{ margin: "16px 0", alignItems: "baseline" }}>
                <span className="display" style={{ fontSize: 28 }}>এককালীন</span>
                <span className="bn" style={{ fontSize: 13, color: "var(--ink-3)" }}>একবারে পেমেন্ট</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {["শুধু আইডিয়া পিচ করুন", "পছন্দ হলে পুরো কোর্স কিনে নেব", "কমিশন নয় — একবারেই টাকা"].map((t) => (
                  <div key={t} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}><Icon name="check" size={15} style={{ color: "var(--ink)", marginTop: 2, flexShrink: 0 }} /><span className="bn" style={{ fontSize: 13.5 }}>{t}</span></div>
                ))}
              </div>
              <button className="btn btn-ghost" style={{ width: "100%", marginTop: 20 }} onClick={() => go({ view: "instructor", tab: "managed" })}>আইডিয়া পিচ করুন</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { CourseCard, CategoryCard, SiteNav, Footer, Home, BecomeInstructor });
