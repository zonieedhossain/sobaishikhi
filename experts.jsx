/* SobaiShikhi — Expert video consultation + local service booking */

function ExpertsPage({ go }) {
  const R = window.RDATA;
  const [booking, setBooking] = React.useState(null); // expert being booked
  return (
    <div>
      <section style={{ background: "var(--ink)", color: "#fff" }}>
        <div className="wrap" style={{ padding: "44px 28px", display: "flex", alignItems: "center", gap: 30, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <span className="chip" style={{ background: "oklch(0.34 0.03 260)", color: "#fff", border: "none" }}><Icon name="play" size={13} /> লাইভ এক্সপার্ট কনসালটেশন</span>
            <h1 className="display bn" style={{ fontSize: 38, marginTop: 14, lineHeight: 1.1 }}>সমস্যা দেখান, <span style={{ color: "var(--accent)" }}>সমাধান নিন</span> — ভিডিও কলে।</h1>
            <p className="bn" style={{ color: "oklch(0.8 0.01 260)", fontSize: 15.5, marginTop: 10, maxWidth: 520, lineHeight: 1.6 }}>
              ক্যামেরায় ডিভাইস দেখান — যাচাইকৃত টেকনিশিয়ান লাইভ দেখে ডায়াগনোসিস করবেন। স্ক্রিন শেয়ার, চ্যাট আর সেশন রেকর্ডিংসহ।
            </p>
            <div style={{ display: "flex", gap: 18, marginTop: 16, flexWrap: "wrap" }}>
              {[["১৫ মিনিট", "৳১৯৯ থেকে"], ["৩০ মিনিট", "৳৩৯৯ থেকে"], ["৬০ মিনিট", "৳৭৪৯ থেকে"]].map(([t, p]) => (
                <div key={t} style={{ padding: "10px 16px", borderRadius: 12, background: "oklch(0.34 0.03 260)" }}>
                  <div className="display bn" style={{ fontSize: 15 }}>{t}</div>
                  <div className="bn" style={{ fontSize: 12, color: "var(--accent)" }}>{p}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[["play", "ভিডিও + অডিও কল"], ["laptop", "স্ক্রিন শেয়ারিং"], ["book", "সেশন রেকর্ডিং"], ["shield", "পেমেন্ট সুরক্ষা — কাজ না হলে রিফান্ড"]].map(([ic, t]) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 30, height: 30, borderRadius: 8, background: "oklch(0.34 0.03 260)", display: "grid", placeItems: "center" }}><Icon name={ic} size={15} style={{ color: "var(--accent)" }} /></span>
                <span className="bn" style={{ fontSize: 13.5, color: "oklch(0.85 0.01 260)" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="wrap" style={{ padding: "30px 28px 30px" }}>
        <div className="spread" style={{ marginBottom: 18 }}>
          <h2 className="display bn" style={{ fontSize: 24 }}>এক্সপার্ট বেছে নিন</h2>
          <span className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{R.experts.filter(e => e.online).length} জন এখন অনলাইনে</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }} className="course-prog">
          {R.experts.map((ex) => (
            <div key={ex.id} className="card" style={{ padding: 20 }}>
              <div style={{ display: "flex", gap: 14 }}>
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <Avatar initials={ex.initials} size={58} hue={ex.hue} />
                  {ex.online && <span style={{ position: "absolute", bottom: 2, right: 2, width: 13, height: 13, borderRadius: 999, background: "var(--ok)", border: "2.5px solid #fff" }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span className="display" style={{ fontSize: 17 }}>{ex.name}</span>
                    {ex.verified && <Icon name="checkC" size={15} style={{ color: "var(--brand)" }} />}
                    <span className="badge blue" style={{ fontSize: 10 }}>{ex.badge}</span>
                  </div>
                  <div className="bn" style={{ fontSize: 13, color: "var(--ink-2)", marginTop: 3 }}>{ex.field}</div>
                  <div style={{ display: "flex", gap: 14, marginTop: 8, flexWrap: "wrap" }}>
                    <Stars value={ex.rating} size={12} showNum />
                    <span className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{ex.sessions.toLocaleString()} সেশন · {ex.exp} বছর অভিজ্ঞতা</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                {Object.entries(ex.prices).map(([min, price]) => (
                  <div key={min} style={{ flex: 1, textAlign: "center", padding: "8px 6px", borderRadius: 10, border: "1px solid var(--line)", background: "var(--paper-2)" }}>
                    <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)" }}>{min} min</div>
                    <div className="display" style={{ fontSize: 14.5 }}>{window.taka(price)}</div>
                  </div>
                ))}
              </div>
              <button className="btn btn-accent btn-sm" style={{ width: "100%", marginTop: 12 }} onClick={() => setBooking(ex)}>
                <Icon name="cal" size={15} /> {ex.online ? "এখনই বুক করুন" : "সময় বুক করুন"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* service booking teaser */}
      <ServiceSection go={go} />

      {booking && <BookingModal expert={booking} onClose={() => setBooking(null)} />}
    </div>
  );
}

function BookingModal({ expert, onClose }) {
  const [dur, setDur] = React.useState("30");
  const [slot, setSlot] = React.useState(null);
  const [paid, setPaid] = React.useState(false);
  const slots = ["আজ ৮:৩০ PM", "আজ ৯:০০ PM", "কাল ১১:০০ AM", "কাল ৪:৩০ PM", "কাল ৮:০০ PM"];
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "oklch(0.2 0.02 260 / 0.5)", zIndex: 70, display: "grid", placeItems: "center", padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} className="card" style={{ width: "100%", maxWidth: 480, padding: 26, boxShadow: "var(--shadow-lg)" }}>
        {paid ? (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div style={{ width: 62, height: 62, borderRadius: 999, background: "var(--brand-soft)", color: "var(--brand-d)", display: "grid", placeItems: "center", margin: "0 auto 14px" }}><Icon name="checkC" size={32} /></div>
            <div className="display bn" style={{ fontSize: 21 }}>বুকিং কনফার্মড!</div>
            <p className="bn" style={{ fontSize: 14, color: "var(--ink-2)", marginTop: 8, lineHeight: 1.6 }}>{expert.name}-এর সাথে {dur} মিনিটের সেশন — {slot}। সেশনের ১০ মিনিট আগে SMS ও অ্যাপে জয়েন লিংক পাবেন।</p>
            <div className="chip" style={{ marginTop: 12 }}><Icon name="shield" size={13} /> পেমেন্ট এসক্রোতে সুরক্ষিত</div>
            <button className="btn btn-brand" style={{ width: "100%", marginTop: 18 }} onClick={onClose}>ঠিক আছে</button>
          </div>
        ) : (
          <>
            <div className="spread" style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <Avatar initials={expert.initials} size={42} hue={expert.hue} />
                <div><div className="display" style={{ fontSize: 16 }}>{expert.name}</div><div className="bn" style={{ fontSize: 12, color: "var(--ink-3)" }}>{expert.field}</div></div>
              </div>
              <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-3)" }}><Icon name="x" size={20} /></button>
            </div>
            <div className="kicker" style={{ marginBottom: 9 }}>সেশনের দৈর্ঘ্য</div>
            <div style={{ display: "flex", gap: 8 }}>
              {Object.entries(expert.prices).map(([min, price]) => (
                <button key={min} onClick={() => setDur(min)} style={{ flex: 1, padding: "11px 8px", borderRadius: 11, cursor: "pointer", textAlign: "center", border: "1.5px solid " + (dur === min ? "var(--accent)" : "var(--line)"), background: dur === min ? "var(--accent-soft)" : "var(--card)" }}>
                  <div className="display" style={{ fontSize: 15 }}>{min} min</div>
                  <div className="mono" style={{ fontSize: 12, color: dur === min ? "var(--accent-d)" : "var(--ink-3)" }}>{window.taka(price)}</div>
                </button>
              ))}
            </div>
            <div className="kicker" style={{ margin: "16px 0 9px" }}>সময় বেছে নিন</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {slots.map((s) => (
                <button key={s} onClick={() => setSlot(s)} className="bn" style={{ padding: "8px 13px", borderRadius: 999, fontSize: 13, cursor: "pointer", border: "1.5px solid " + (slot === s ? "var(--accent)" : "var(--line)"), background: slot === s ? "var(--accent-soft)" : "var(--card)", color: "var(--ink)" }}>{s}</button>
              ))}
            </div>
            <div className="kicker" style={{ margin: "16px 0 9px" }}>পেমেন্ট</div>
            <div style={{ display: "flex", gap: 8 }}>
              {["bKash", "Nagad", "Card"].map((m, i) => (
                <span key={m} className="chip" style={{ flex: 1, justifyContent: "center", padding: "9px 0", background: i === 0 ? "var(--paper-2)" : "var(--card)" }}>{m}</span>
              ))}
            </div>
            <button className="btn btn-accent" style={{ width: "100%", marginTop: 18 }} disabled={!slot} onClick={() => setPaid(true)}>
              {window.taka(expert.prices[dur])} পে করে কনফার্ম করুন <Icon name="arrow" size={16} />
            </button>
            <div className="bn" style={{ fontSize: 11.5, color: "var(--ink-3)", textAlign: "center", marginTop: 10 }}>সেশন সন্তোষজনক না হলে ১০০% রিফান্ড</div>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------- Page 8: local service booking ---------- */
function ServiceSection({ go, full }) {
  const R = window.RDATA;
  const [booked, setBooked] = React.useState(null);
  const [applying, setApplying] = React.useState(false);
  const [applied, setApplied] = React.useState(false);
  return (
    <section style={{ background: "var(--card)", borderTop: "1px solid var(--line)" }}>
      <div className="wrap" style={{ padding: "44px 28px 60px" }}>
        <div className="spread" style={{ flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
          <div>
            <span className="chip brand"><Icon name="wrench" size={13} /> হোম সার্ভিস</span>
            <h2 className="display bn" style={{ fontSize: 28, marginTop: 10 }}>টেকনিশিয়ান আসবে আপনার দরজায়</h2>
            <p className="bn" style={{ color: "var(--ink-2)", fontSize: 14.5, marginTop: 6, maxWidth: 520 }}>যাচাইকৃত লোকাল টেকনিশিয়ান — রেটিং, সম্পন্ন কাজ আর ওয়ারেন্টি দেখে বুক করুন। পেমেন্ট এসক্রোতে সুরক্ষিত থাকে কাজ শেষ না হওয়া পর্যন্ত।</p>
          </div>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            {[["২,৪০০+", "টেকনিশিয়ান"], ["৬৪", "জেলায়"], ["৪.৮★", "গড় রেটিং"]].map(([v, l]) => (
              <div key={l} style={{ textAlign: "center" }}><div className="display" style={{ fontSize: 22 }}>{v}</div><div className="bn" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{l}</div></div>
            ))}
            <button className="btn btn-brand btn-sm" onClick={() => { setApplying(true); setApplied(false); }}><Icon name="plus" size={15} /> আপনার সার্ভিস লিস্ট করুন</button>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }} className="course-grid">
          {R.technicians.map((t) => (
            <div key={t.id} className="card" style={{ padding: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <Avatar initials={t.initials} size={44} hue={t.hue} />
                <div style={{ minWidth: 0 }}>
                  <div className="display" style={{ fontSize: 14.5, display: "flex", alignItems: "center", gap: 5 }}>{t.name} {t.verified && <Icon name="checkC" size={13} style={{ color: "var(--brand)", flexShrink: 0 }} />}</div>
                  <div className="bn" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{t.field}</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
                {[["users", t.jobs.toLocaleString() + " কাজ সম্পন্ন"], ["star", t.rating + " রেটিং"], ["money", t.charge], ["shield", "ওয়ারেন্টি " + t.warranty]].map(([ic, v]) => (
                  <span key={v} style={{ display: "flex", alignItems: "center", gap: 7 }}><Icon name={ic} size={12.5} style={{ color: "var(--ink-3)" }} /><span className="bn" style={{ fontSize: 12 }}>{v}</span></span>
                ))}
              </div>
              <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", marginTop: 8 }}>📍 {t.area}</div>
              <button className={"btn btn-sm " + (booked === t.id ? "btn-brand" : "btn-soft")} style={{ width: "100%", marginTop: 12 }} onClick={() => setBooked(booked === t.id ? null : t.id)}>
                {booked === t.id ? <><Icon name="check" size={14} /> রিকোয়েস্ট পাঠানো হয়েছে</> : "সার্ভিস বুক করুন"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* list-your-service application → admin review */}
      {applying && (
        <div onClick={() => setApplying(false)} style={{ position: "fixed", inset: 0, background: "oklch(0.2 0.02 260 / 0.5)", zIndex: 70, display: "grid", placeItems: "center", padding: 20 }}>
          <div onClick={(e) => e.stopPropagation()} className="card" style={{ width: "100%", maxWidth: 460, padding: 26, boxShadow: "var(--shadow-lg)" }}>
            {applied ? (
              <div style={{ textAlign: "center", padding: "14px 0" }}>
                <div style={{ width: 60, height: 60, borderRadius: 999, background: "var(--brand-soft)", color: "var(--brand-d)", display: "grid", placeItems: "center", margin: "0 auto 14px" }}><Icon name="checkC" size={32} /></div>
                <div className="display bn" style={{ fontSize: 20 }}>আবেদন জমা হয়েছে!</div>
                <p className="bn" style={{ fontSize: 14, color: "var(--ink-2)", marginTop: 8, lineHeight: 1.6 }}>অ্যাডমিন টিম আপনার ডকুমেন্ট ও দক্ষতা যাচাই করবে। অনুমোদিত হলে আপনার প্রোফাইল সার্ভিস মার্কেটপ্লেসে দেখা যাবে।</p>
                <div className="chip" style={{ marginTop: 10 }}><Icon name="clock" size={13} /> Status: Under review</div>
                <button className="btn btn-brand" style={{ width: "100%", marginTop: 16 }} onClick={() => setApplying(false)}>ঠিক আছে</button>
              </div>
            ) : (
              <>
                <div className="spread" style={{ marginBottom: 16 }}>
                  <h3 className="display bn" style={{ fontSize: 19 }}>টেকনিশিয়ান হিসেবে যুক্ত হোন</h3>
                  <button onClick={() => setApplying(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-3)" }}><Icon name="x" size={20} /></button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                  <div className="field"><label>Business / name</label><input className="input bn" placeholder="যেমন: Dhaka Mobile Care" /></div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div className="field"><label>Service field</label>
                      <select className="select">{["মোবাইল রিপেয়ার", "ল্যাপটপ রিপেয়ার", "এসি সার্ভিস", "বাইক সার্ভিসিং", "অ্যাপ্লায়েন্স"].map((f) => <option key={f}>{f}</option>)}</select>
                    </div>
                    <div className="field"><label>Area</label><input className="input bn" placeholder="যেমন: মিরপুর, ঢাকা" /></div>
                  </div>
                  <div className="field"><label>Visit charge (৳)</label><input className="input" placeholder="200" /></div>
                  <div className="field"><label>NID / trade license</label>
                    <div style={{ height: 76, borderRadius: 11, border: "1.5px dashed var(--line)", display: "grid", placeItems: "center", background: "var(--paper-2)" }}>
                      <span className="bn" style={{ fontSize: 12.5, color: "var(--ink-3)" }}><Icon name="upload" size={15} style={{ verticalAlign: "-3px" }} /> ডকুমেন্ট আপলোড করুন</span>
                    </div>
                  </div>
                </div>
                <button className="btn btn-accent" style={{ width: "100%", marginTop: 16 }} onClick={() => setApplied(true)}>Submit for review <Icon name="arrow" size={16} /></button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

Object.assign(window, { ExpertsPage, BookingModal, ServiceSection });
