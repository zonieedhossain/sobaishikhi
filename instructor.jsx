/* SobaiShikhi — Instructor dashboard */
function InstructorDash({ go }) {
  const D = window.DATA;
  const me = window.byId(D.instructors, "in1");
  const myCourses = D.courses.filter((c) => c.instr === "in1");
  const [tab, setTab] = React.useState("overview");

  const tabs = [["overview", "Overview", "grid"], ["courses", "My Courses", "play2"], ["build", "New Course", "plus"], ["earnings", "Earnings", "money"]];

  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)" }}>
      <PortalBar go={go} role="instructor" me={me} />
      <div className="wrap" style={{ padding: "24px 28px 80px" }}>
        {/* tab bar */}
        <div style={{ display: "flex", gap: 6, borderBottom: "1px solid var(--line)", marginBottom: 26 }}>
          {tabs.map(([id, label, ic]) => (
            <button key={id} onClick={() => setTab(id)} className="bn" style={{
              display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", border: "none", background: "none", cursor: "pointer",
              fontSize: 15, fontWeight: tab === id ? 600 : 400, color: tab === id ? "var(--ink)" : "var(--ink-3)",
              borderBottom: "2.5px solid " + (tab === id ? "var(--accent)" : "transparent"), marginBottom: -1 }}>
              <Icon name={ic} size={17} /> {label}
            </button>
          ))}
        </div>

        {tab === "overview" && <InstrOverview me={me} myCourses={myCourses} setTab={setTab} go={go} />}
        {tab === "courses" && <InstrCourses myCourses={myCourses} setTab={setTab} go={go} />}
        {tab === "build" && <CourseBuilder me={me} setTab={setTab} />}
        {tab === "earnings" && <InstrEarnings me={me} />}
      </div>
    </div>
  );
}

function InstrOverview({ me, myCourses, setTab, go }) {
  const D = window.DATA;
  const pending = myCourses.filter((c) => c.status !== "published");
  return (
    <div>
      <h2 className="display bn" style={{ fontSize: 26, marginBottom: 18 }}>আসসালামু আলাইকুম, তাহমিদ</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
        <Stat label="মোট শিক্ষার্থী" value={me.students.toLocaleString()} sub="+820 this month"><span className="badge green">+4.7%</span></Stat>
        <Stat label="মোট আয়" value={window.taka(me.revenue)} sub="lifetime"><Spark data={D.stats.gmvTrend} w={64} h={26} /></Stat>
        <Stat label="গড় রেটিং" value={me.rating} sub="across 6 courses"><Stars value={me.rating} size={13} /></Stat>
        <Stat label="পরবর্তী পেআউট" value={window.taka(me.payout)} sub="Jun 15"><span className="badge amber">pending</span></Stat>
      </div>

      {pending.length > 0 && (
        <div className="card" style={{ padding: "16px 20px", marginTop: 16, background: "var(--accent-soft)", border: "1px solid oklch(0.8 0.08 45)", display: "flex", alignItems: "center", gap: 14 }}>
          <Icon name="clock" size={22} style={{ color: "var(--accent-d)" }} />
          <div style={{ flex: 1 }}>
            <div className="display bn" style={{ fontSize: 15 }}>{pending.length}টি কোর্স রিভিউ/ড্রাফট অবস্থায় আছে</div>
            <div className="bn" style={{ fontSize: 13, color: "var(--accent-d)" }}>অ্যাডমিন অনুমোদনের পর কোর্স প্রকাশিত হবে।</div>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => setTab("courses")}>দেখুন</button>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16, marginTop: 16 }}>
        <div className="card" style={{ padding: 24 }}>
          <div className="spread" style={{ marginBottom: 18 }}><h3 className="display bn" style={{ fontSize: 18 }}>আয় · গত ১২ সপ্তাহ</h3><span className="badge green">↑ বাড়ছে</span></div>
          <Bars data={D.stats.gmvTrend} h={120} accent />
        </div>
        <div className="card" style={{ padding: 24 }}>
          <h3 className="display bn" style={{ fontSize: 18, marginBottom: 16 }}>টপ কোর্স</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {myCourses.filter((c) => c.status === "published").map((c) => (
              <div key={c.id} className="spread">
                <span className="display" style={{ fontSize: 14 }}>{c.title}</span>
                <span className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{c.students.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InstrCourses({ myCourses, setTab, go }) {
  return (
    <div>
      <div className="spread" style={{ marginBottom: 18 }}>
        <h2 className="display bn" style={{ fontSize: 24 }}>আমার কোর্স</h2>
        <button className="btn btn-accent btn-sm" onClick={() => setTab("build")}><Icon name="plus" size={16} /> নতুন কোর্স তৈরি</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {myCourses.map((c) => (
          <div key={c.id} className="card" style={{ padding: 16, display: "flex", gap: 16, alignItems: "center" }}>
            <Slot label="cover" h={66} dark style={{ width: 116, borderRadius: 10, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                <span className="display" style={{ fontSize: 16 }}>{c.title}</span>
                <StatusPill status={c.status} />
              </div>
              <div className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)", marginTop: 5 }}>
                {c.status === "published" ? `${c.students.toLocaleString()} students · ${c.rating} ★ · ${window.taka(c.price * c.students)} earned` : `${c.lessons} lessons · ${c.hours}h${c.submitted ? " · submitted " + c.submitted : ""}`}
              </div>
              {c.adminNotes && c.status === "revision" && (
                <div style={{ marginTop: 10, padding: "11px 13px", borderRadius: 10, background: "oklch(0.58 0.18 25 / 0.07)", border: "1px solid oklch(0.58 0.18 25 / 0.25)" }}>
                  <div className="kicker" style={{ color: "var(--danger)", marginBottom: 7 }}>Admin feedback — fix & resubmit</div>
                  {c.adminNotes.map((n, ni) => (
                    <div key={ni} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginTop: ni ? 5 : 0 }}>
                      <span className="mono" style={{ fontSize: 11.5, color: "var(--danger)", fontWeight: 700 }}>{ni + 1}.</span>
                      <span className="bn" style={{ fontSize: 13, lineHeight: 1.5 }}>{n}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {c.status === "published" && <button className="btn btn-ghost btn-sm" onClick={() => go({ view: "site", page: "course", id: c.slug })}><Icon name="eye" size={15} /> View</button>}
              <button className="btn btn-ghost btn-sm" onClick={() => setTab("build")}><Icon name="edit" size={15} /> Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CourseBuilder({ me, setTab }) {
  const [title, setTitle] = React.useState("");
  const [cat, setCat] = React.useState("");
  const [newCat, setNewCat] = React.useState("");
  const [sections, setSections] = React.useState([{ title: "Introduction", lessons: ["Welcome to the course"] }]);
  const [submitted, setSubmitted] = React.useState(false);
  const needsNewCat = cat === "__new";
  const addLesson = (si) => setSections((s) => s.map((sec, i) => i === si ? { ...sec, lessons: [...sec.lessons, "New lesson"] } : sec));
  const addSection = () => setSections((s) => [...s, { title: "New section", lessons: [] }]);
  const totalLessons = sections.reduce((a, s) => a + s.lessons.length, 0);

  if (submitted) {
    return (
      <div className="center" style={{ flexDirection: "column", padding: "80px 0", textAlign: "center", gap: 16 }}>
        <div style={{ width: 70, height: 70, borderRadius: 999, background: "var(--brand-soft)", color: "var(--brand-d)", display: "grid", placeItems: "center" }}><Icon name="checkC" size={36} /></div>
        <h2 className="display bn" style={{ fontSize: 28 }}>রিভিউয়ের জন্য জমা হয়েছে!</h2>
        <p className="bn" style={{ color: "var(--ink-2)", fontSize: 16, maxWidth: 460, lineHeight: 1.6 }}>আপনার কোর্স অ্যাডমিন টিম রিভিউ করবে। সাধারণত ২–৩ কর্মদিবসের মধ্যে ফলাফল জানানো হয়। অনুমোদন পেলে কোর্সটি স্বয়ংক্রিয়ভাবে প্রকাশিত হবে।</p>
        {needsNewCat && newCat.trim() && (
          <div className="chip brand"><Icon name="spark" size={13} /> নতুন ক্যাটাগরি "{newCat.trim()}" রিভিউয়ের সাথে পাঠানো হয়েছে</div>
        )}
        <div className="chip"><Icon name="clock" size={14} /> Status: Under review</div>
        <button className="btn btn-accent" style={{ marginTop: 8 }} onClick={() => setTab("courses")}>আমার কোর্সে ফিরুন</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 760 }}>
      <h2 className="display bn" style={{ fontSize: 24, marginBottom: 6 }}>নতুন কোর্স তৈরি করুন</h2>
      <p className="bn" style={{ color: "var(--ink-3)", fontSize: 14, marginBottom: 22 }}>তথ্য পূরণ করে কারিকুলাম সাজান, তারপর রিভিউয়ের জন্য জমা দিন।</p>

      <div className="card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
        <div className="field"><label>কোর্সের শিরোনাম</label><input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="যেমন: সম্পূর্ণ ওয়েব ডেভেলপমেন্ট" /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div className="field"><label>ক্যাটাগরি</label>
            <select className="select" value={cat} onChange={(e) => setCat(e.target.value)}>
              <option value="">নির্বাচন করুন…</option>
              {window.DATA.categories.map((ct) => <option key={ct.id} value={ct.id}>{ct.bn}</option>)}
              <option value="__new">＋ এই তালিকায় নেই — নতুন ক্যাটাগরি বানান</option>
            </select>
          </div>
          <div className="field"><label>মূল্য (৳)</label><input className="input" placeholder="1499" /></div>
        </div>
        {needsNewCat && (
          <div style={{ padding: 16, borderRadius: 12, background: "var(--brand-soft)", border: "1px solid oklch(0.82 0.06 168)" }}>
            <div className="field">
              <label>নতুন ক্যাটাগরির নাম</label>
              <input className="input" value={newCat} onChange={(e) => setNewCat(e.target.value)} placeholder="যেমন: ড্রোন ও রোবোটিক্স" style={{ background: "var(--card)" }} />
            </div>
            <div className="bn" style={{ fontSize: 12.5, color: "var(--brand-d)", marginTop: 9, display: "flex", alignItems: "flex-start", gap: 7 }}>
              <Icon name="shield" size={15} style={{ flexShrink: 0, marginTop: 1 }} />
              আপনার প্রস্তাবিত ক্যাটাগরিটি কোর্সের সাথে অ্যাডমিন রিভিউতে যাবে। অনুমোদিত হলে নতুন ক্যাটাগরিটি মার্কেটপ্লেসে যুক্ত হবে।
            </div>
          </div>
        )}
        <div className="field"><label>কোর্স কভার</label>
          <div className="slot" style={{ height: 120, borderRadius: 12, border: "1.5px dashed var(--line)", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8, background: "var(--paper-2)", backgroundImage: "none" }}>
            <Icon name="upload" size={26} style={{ color: "var(--ink-3)" }} />
            <span className="bn" style={{ fontSize: 13, color: "var(--ink-3)" }}>কভার ইমেজ আপলোড করুন</span>
          </div>
        </div>
      </div>

      {/* curriculum builder */}
      <div className="card" style={{ padding: 24, marginTop: 16 }}>
        <div className="spread" style={{ marginBottom: 16 }}>
          <h3 className="display bn" style={{ fontSize: 18 }}>কারিকুলাম</h3>
          <span className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{sections.length} sections · {totalLessons} lessons</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {sections.map((sec, si) => (
            <div key={si} style={{ border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden" }}>
              <div className="spread" style={{ background: "var(--paper-2)", padding: "11px 14px" }}>
                <input value={sec.title} onChange={(e) => setSections((s) => s.map((x, i) => i === si ? { ...x, title: e.target.value } : x))} className="display"
                  style={{ background: "none", border: "none", fontSize: 15, color: "var(--ink)", width: "60%" }} />
                <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>Section {si + 1}</span>
              </div>
              {sec.lessons.map((l, li) => (
                <div key={li} className="spread" style={{ padding: "9px 14px 9px 16px", borderTop: "1px solid var(--line-2)" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 10 }}><Icon name="play2" size={15} style={{ color: "var(--ink-3)" }} /><span style={{ fontSize: 13.5 }}>{l}</span></span>
                  <Icon name="upload" size={15} style={{ color: "var(--ink-3)" }} />
                </div>
              ))}
              <button onClick={() => addLesson(si)} className="bn" style={{ width: "100%", border: "none", borderTop: "1px solid var(--line-2)", background: "var(--card)", padding: "9px", fontSize: 13, color: "var(--brand-d)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><Icon name="plus" size={14} /> লেসন যোগ করুন</button>
            </div>
          ))}
        </div>
        <button onClick={addSection} className="btn btn-ghost btn-sm" style={{ marginTop: 14 }}><Icon name="plus" size={15} /> সেকশন যোগ করুন</button>
      </div>

      <div className="spread" style={{ marginTop: 20 }}>
        <button className="btn btn-ghost" onClick={() => setTab("courses")}>ড্রাফট সেভ করুন</button>
        <button className="btn btn-accent" disabled={!title || !cat || (needsNewCat && !newCat.trim())} onClick={() => setSubmitted(true)}>রিভিউয়ের জন্য জমা দিন <Icon name="arrow" size={17} /></button>
      </div>
    </div>
  );
}

function InstrEarnings({ me }) {
  const D = window.DATA;
  const myPay = D.payouts.filter((p) => p.instr === "in1");
  return (
    <div>
      <h2 className="display bn" style={{ fontSize: 24, marginBottom: 18 }}>আয় ও পেআউট</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        <div className="card" style={{ padding: 24, background: "var(--brand)", color: "#fff", border: "none" }}>
          <div className="bn" style={{ fontSize: 14, opacity: .9 }}>উইথড্রয়েবল ব্যালেন্স</div>
          <div className="display" style={{ fontSize: 36, marginTop: 6 }}>{window.taka(me.payout)}</div>
          <button className="btn" style={{ background: "#fff", color: "var(--brand-d)", marginTop: 16, width: "100%" }}>bKash-এ উইথড্র করুন</button>
        </div>
        <Stat label="লাইফটাইম আয়" value={window.taka(me.revenue)} sub="before commission" />
        <Stat label="কমিশন রেট" value="20%" sub="platform share" />
      </div>
      <div className="card" style={{ marginTop: 16, overflow: "hidden" }}>
        <div style={{ padding: "16px 22px" }} className="display">পেআউট হিস্ট্রি</div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", background: "var(--paper-2)" }}>
            {["Payout ID", "Amount", "Method", "Date", "Status"].map((h) => <th key={h} className="kicker" style={{ textAlign: "left", padding: "10px 22px", fontWeight: 400 }}>{h}</th>)}
          </tr></thead>
          <tbody>
            {myPay.concat([{ id: "PO-2988", amount: 74000, method: "bKash", date: "May 01", status: "Paid" }, { id: "PO-2901", amount: 69000, method: "Bank", date: "Apr 01", status: "Paid" }]).map((p) => (
              <tr key={p.id}>
                <td className="mono" style={{ padding: "13px 22px", borderBottom: "1px solid var(--line-2)", fontSize: 13 }}>{p.id}</td>
                <td className="mono" style={{ padding: "13px 22px", borderBottom: "1px solid var(--line-2)", fontSize: 13 }}>{window.taka(p.amount)}</td>
                <td className="mono" style={{ padding: "13px 22px", borderBottom: "1px solid var(--line-2)", fontSize: 13 }}>{p.method}</td>
                <td className="mono" style={{ padding: "13px 22px", borderBottom: "1px solid var(--line-2)", fontSize: 13 }}>{p.date}</td>
                <td style={{ padding: "13px 22px", borderBottom: "1px solid var(--line-2)" }}><span className={"badge " + (p.status === "Paid" ? "green" : p.status === "Processing" ? "blue" : "amber")}>{p.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

Object.assign(window, { InstructorDash });
