/* SobaiShikhi — Repair Blog & Vlog (video posts) */

function BlogCard({ b, go }) {
  return (
    <div className="card" onClick={() => go({ view: "site", page: "blog-post", id: b.slug })}
      style={{ overflow: "hidden", cursor: "pointer", display: "flex", flexDirection: "column", transition: "box-shadow .14s, border-color .14s" }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "var(--shadow)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}>
      <div style={{ position: "relative" }}>
        <Slot label={`${b.slug}.mp4`} h={150} dark style={{ borderRadius: 0 }} />
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
          <div style={{ width: 46, height: 46, borderRadius: 999, background: "oklch(1 0 0 / 0.94)", display: "grid", placeItems: "center", boxShadow: "var(--shadow)" }}><Icon name="playS" size={20} style={{ color: "var(--ink)" }} /></div>
        </div>
        <span className={"badge " + (b.type === "vlog" ? "red" : "blue")} style={{ position: "absolute", top: 10, left: 10 }}>{b.type === "vlog" ? "ভ্লগ" : "আর্টিকেল"}</span>
        {b.ai && <span className="chip" style={{ position: "absolute", top: 10, right: 10, background: "var(--brand)", color: "#fff", border: "none", fontSize: 10 }}><Icon name="spark" size={11} /> AI ভিডিও</span>}
        <span className="chip solid" style={{ position: "absolute", bottom: 10, right: 10, fontSize: 10 }}>{b.dur}</span>
      </div>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        <div className="display bn" style={{ fontSize: 15.5, lineHeight: 1.35 }}>{b.title}</div>
        <p className="bn" style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.55, margin: 0, flex: 1 }}>{b.excerpt}</p>
        <div className="spread" style={{ marginTop: 4 }}>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>{b.author}</span>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>{(b.views / 1000).toFixed(1)}k views</span>
        </div>
      </div>
    </div>
  );
}

function BlogPage({ go }) {
  const blogs = window.RDATA.blogs.filter((b) => b.status === "published");
  const [type, setType] = React.useState("all");
  const list = blogs.filter((b) => type === "all" || b.type === type);
  return (
    <div className="wrap" style={{ padding: "36px 28px 80px" }}>
      <div className="spread" style={{ flexWrap: "wrap", gap: 14 }}>
        <div>
          <div className="kicker">Repair Blog & Vlogs</div>
          <h1 className="display bn" style={{ fontSize: 34, marginTop: 8 }}>রিপেয়ার ব্লগ ও ভ্লগ</h1>
          <p className="bn" style={{ color: "var(--ink-2)", fontSize: 15, marginTop: 6, maxWidth: 540 }}>টেকনিশিয়ানদের বাস্তব অভিজ্ঞতা — দোকানের ভ্লগ, কেস স্টাডি আর AI ভিডিওসহ ব্যাখ্যা। প্রতিটি পোস্ট অ্যাডমিন-রিভিউড।</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[["all", "All"], ["vlog", "Vlogs"], ["article", "Articles"]].map(([id, label]) => (
            <button key={id} onClick={() => setType(id)} className="btn btn-sm" style={{ background: type === id ? "var(--ink)" : "var(--card)", color: type === id ? "#fff" : "var(--ink-2)", border: "1px solid " + (type === id ? "var(--ink)" : "var(--line)") }}>{label}</button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 26 }} className="course-grid">
        {list.map((b) => <BlogCard key={b.id} b={b} go={go} />)}
      </div>
    </div>
  );
}

function BlogPostPage({ go, slug }) {
  const R = window.RDATA;
  const b = R.blogs.find((x) => x.slug === slug) || R.blogs[0];
  const guide = R.rguides.find((g) => g.id === b.relGuide);
  const [playing, setPlaying] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  return (
    <div className="wrap" style={{ padding: "26px 28px 80px", maxWidth: 920 }}>
      <button onClick={() => go({ view: "site", page: "blog" })} className="mono" style={{ background: "none", border: "none", color: "var(--ink-3)", fontSize: 12.5, display: "flex", alignItems: "center", gap: 6, padding: 0, cursor: "pointer" }}><Icon name="arrowL" size={15} /> All posts</button>

      <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <span className={"badge " + (b.type === "vlog" ? "red" : "blue")}>{b.type === "vlog" ? "ভ্লগ" : "আর্টিকেল"}</span>
        {b.ai && <span className="badge green"><Icon name="spark" size={11} /> AI ভিডিও</span>}
        <span className="badge gray">{b.when}</span>
      </div>
      <h1 className="display bn" style={{ fontSize: 32, marginTop: 12, lineHeight: 1.2 }}>{b.title}</h1>

      {/* author — name & description only (privacy: no phone) */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16, cursor: "pointer" }} onClick={() => go({ view: "site", page: "instructor-profile", id: b.authorId })}>
        <Avatar initials={b.author.split(" ").map(w => w[0]).join("")} size={40} brand />
        <div>
          <div className="display" style={{ fontSize: 14.5 }}>{b.author} <span className="badge blue" style={{ marginLeft: 5, fontSize: 10 }}>{b.badge}</span></div>
          <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>{(b.views / 1000).toFixed(1)}k views · {b.dur}</div>
        </div>
      </div>

      {/* video */}
      <div style={{ marginTop: 20, borderRadius: "var(--r-lg)", overflow: "hidden", border: "1px solid var(--line)", position: "relative" }}>
        <Slot label={`${b.slug}.mp4 — ${b.type === "vlog" ? "ভ্লগ ভিডিও" : "AI ভিডিও ব্যাখ্যা"}`} h={400} dark style={{ borderRadius: 0 }} />
        <div onClick={() => setPlaying(!playing)} style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", cursor: "pointer" }}>
          <div style={{ width: 68, height: 68, borderRadius: 999, background: "oklch(1 0 0 / 0.95)", display: "grid", placeItems: "center", boxShadow: "var(--shadow-lg)" }}>
            {playing ? <div style={{ display: "flex", gap: 6 }}><span style={{ width: 6, height: 24, background: "var(--ink)", borderRadius: 2 }} /><span style={{ width: 6, height: 24, background: "var(--ink)", borderRadius: 2 }} /></div> : <Icon name="playS" size={30} style={{ color: "var(--ink)", marginLeft: 3 }} />}
          </div>
        </div>
        {b.ai && <span className="chip" style={{ position: "absolute", top: 12, left: 12, background: "var(--brand)", color: "#fff", border: "none" }}><Icon name="spark" size={12} /> AI-generated video · বাংলা ভয়েস</span>}
      </div>

      {/* body */}
      <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 16, maxWidth: 720 }}>
        {b.body.map((p, i) => <p key={i} className="bn" style={{ fontSize: 16, lineHeight: 1.8, margin: 0, textWrap: "pretty" }}>{p}</p>)}
      </div>

      {/* actions */}
      <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
        <button className={"btn btn-sm " + (liked ? "btn-brand" : "btn-ghost")} onClick={() => setLiked(!liked)}>👍 {(b.likes + (liked ? 1 : 0)).toLocaleString()}</button>
        <button className="btn btn-ghost btn-sm">Share</button>
        <button className="btn btn-ghost btn-sm" onClick={() => go({ view: "site", page: "forum" })}>Comment</button>
      </div>

      {/* related guide */}
      {guide && (
        <div className="card" style={{ marginTop: 28, padding: 20, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div style={{ width: 44, height: 44, borderRadius: 11, background: "var(--brand-soft)", color: "var(--brand-d)", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name="book" size={22} /></div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div className="kicker">সম্পর্কিত রিপেয়ার গাইড</div>
            <div className="display bn" style={{ fontSize: 16, marginTop: 4 }}>{guide.title}</div>
          </div>
          <button className="btn btn-brand btn-sm" onClick={() => go({ view: "site", page: "repair-guide", id: guide.slug })}>গাইড দেখুন <Icon name="arrow" size={15} /></button>
        </div>
      )}
    </div>
  );
}

/* Blog studio — create vlogs/articles from a panel (admin reviews before live) */
function BlogStudio({ go, authorId = "in5" }) {
  const R = window.RDATA;
  const mine = R.blogs.filter((b) => b.authorId === authorId);
  const [writing, setWriting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [form, setForm] = React.useState({ title: "", type: "vlog", body: "" });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  if (submitted) return (
    <div className="center" style={{ flexDirection: "column", padding: "50px 0", textAlign: "center", gap: 14 }}>
      <div style={{ width: 62, height: 62, borderRadius: 999, background: "var(--brand-soft)", color: "var(--brand-d)", display: "grid", placeItems: "center" }}><Icon name="checkC" size={32} /></div>
      <h2 className="display bn" style={{ fontSize: 24 }}>পোস্ট রিভিউয়ের জন্য জমা হয়েছে!</h2>
      <p className="bn" style={{ color: "var(--ink-2)", fontSize: 14.5, maxWidth: 420, lineHeight: 1.6 }}>অ্যাডমিন কনটেন্ট ও ভিডিও যাচাই করার পর ব্লগ সেকশনে প্রকাশিত হবে।</p>
      <div className="chip"><Icon name="clock" size={14} /> Status: Under review</div>
      <button className="btn btn-brand btn-sm" onClick={() => { setSubmitted(false); setWriting(false); }}>My posts</button>
    </div>
  );

  if (writing) return (
    <div style={{ maxWidth: 680 }}>
      <div className="card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="field"><label>Post title</label><input className="input bn" value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="যেমন: সিলিং ফ্যান রিপেয়ার — দোকানের ভ্লগ" /></div>
        <div className="field"><label>Type</label>
          <div style={{ display: "flex", gap: 8 }}>
            {[["vlog", "ভ্লগ (নিজের ভিডিও)"], ["article", "আর্টিকেল + AI ভিডিও"]].map(([id, label]) => (
              <button key={id} onClick={() => set("type", id)} className="bn" style={{ flex: 1, padding: "12px 10px", borderRadius: 11, cursor: "pointer", fontSize: 13.5, border: "1.5px solid " + (form.type === id ? "var(--brand)" : "var(--line)"), background: form.type === id ? "var(--brand-soft)" : "var(--card)" }}>{label}</button>
            ))}
          </div>
        </div>
        <div className="field"><label>{form.type === "vlog" ? "Video upload" : "AI video will be generated from your text"}</label>
          <div style={{ height: 100, borderRadius: 12, border: "1.5px dashed var(--line)", display: "grid", placeItems: "center", background: "var(--paper-2)" }}>
            <div style={{ textAlign: "center" }}>
              <Icon name={form.type === "vlog" ? "upload" : "spark"} size={22} style={{ color: "var(--ink-3)" }} />
              <div className="bn" style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 6 }}>{form.type === "vlog" ? "ভিডিও আপলোড করুন (MP4)" : "লেখা থেকে AI বাংলা ভয়েসসহ ভিডিও বানাবে"}</div>
            </div>
          </div>
        </div>
        <div className="field"><label>Content</label><textarea className="textarea bn" value={form.body} onChange={(e) => set("body", e.target.value)} placeholder="পোস্টের বিস্তারিত লিখুন…" style={{ minHeight: 120 }} /></div>
      </div>
      <div className="spread" style={{ marginTop: 16 }}>
        <button className="btn btn-ghost" onClick={() => setWriting(false)}>Cancel</button>
        <button className="btn btn-accent" disabled={!form.title} onClick={() => setSubmitted(true)}>Submit for review <Icon name="arrow" size={16} /></button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="spread" style={{ marginBottom: 16 }}>
        <span className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{mine.length} posts</span>
        <button className="btn btn-accent btn-sm" onClick={() => setWriting(true)}><Icon name="plus" size={15} /> New post</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {mine.map((b) => (
          <div key={b.id} className="card" style={{ padding: 16, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <Slot label="▶" h={50} dark style={{ width: 84, borderRadius: 9, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 200 }}>
              <div className="display bn" style={{ fontSize: 14.5 }}>{b.title}</div>
              <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", marginTop: 4 }}>{b.type} · {b.dur} · {b.views ? (b.views / 1000).toFixed(1) + "k views" : "—"}</div>
            </div>
            <StatusPill status={b.status} />
            {b.status === "published" && <button className="btn btn-ghost btn-sm" onClick={() => go({ view: "site", page: "blog-post", id: b.slug })}><Icon name="eye" size={14} /></button>}
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { BlogPage, BlogPostPage, BlogCard, BlogStudio });
