/* SobaiShikhi — shared components & icons. Exports to window. */
const { useState, useEffect, useRef } = React;

function Icon({ name, size = 20, stroke = 1.7, style }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round", style };
  const paths = {
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    arrowL: <path d="M19 12H5M11 18l-6-6 6-6" />,
    chevD: <path d="M6 9l6 6 6-6" />,
    chevR: <path d="M9 6l6 6-6 6" />,
    book: <path d="M4 4.5A1.5 1.5 0 015.5 3H20v15H5.5A1.5 1.5 0 004 19.5zM4 19.5A1.5 1.5 0 015.5 18H20v3H5.5A1.5 1.5 0 014 19.5z"/>,
    wrench: <path d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.6 2.6-2.4-2.4 2.6-2.6z"/>,
    chip: <g><rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 7V4M14 7V4M10 20v-3M14 20v-3M7 10H4M7 14H4M20 10h-3M20 14h-3"/></g>,
    laptop: <g><rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M2 20h20M9 20l.5-2h5l.5 2"/></g>,
    chart: <g><path d="M4 4v16h16"/><path d="M8 14l3-3 3 2 4-5"/></g>,
    moon: <path d="M20 14.5A8 8 0 119.5 4 6.5 6.5 0 0020 14.5z"/>,
    globe: <g><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"/></g>,
    flask: <path d="M9 3h6M10 3v6l-5 9a1.5 1.5 0 001.3 2.3h11.4A1.5 1.5 0 0015 18l-5-9V3M7.5 14h9"/>,
    brush: <g><path d="M14 4l6 6-8 8H6v-6z"/><path d="M14 4l6 6"/></g>,
    leaf: <path d="M5 19c0-8 6-14 15-14 0 9-5 15-13 15a6 6 0 01-2-1zM5 19c2-4 5-7 9-9"/>,
    badge: <g><circle cx="12" cy="9" r="5"/><path d="M9 13.5L8 21l4-2 4 2-1-7.5"/></g>,
    spark: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>,
    teacher: <g><path d="M3 6l9-3 9 3-9 3-9-3z"/><path d="M7 8v5c0 1.5 2.2 3 5 3s5-1.5 5-3V8"/></g>,
    users: <g><circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0112 0M16 5.5a3 3 0 010 5.5M21 20a6 6 0 00-4-5.6"/></g>,
    user: <g><circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0114 0"/></g>,
    play: <g><circle cx="12" cy="12" r="9"/><path d="M10 8.5l5 3.5-5 3.5z" fill="currentColor"/></g>,
    playS: <path d="M7 4.5l13 7.5-13 7.5z" fill="currentColor" stroke="none"/>,
    star: <path d="M12 3.2l2.7 5.5 6 .9-4.3 4.2 1 6L12 17l-5.4 2.8 1-6L3.3 9.6l6-.9z" fill="currentColor" stroke="none"/>,
    starO: <path d="M12 3.2l2.7 5.5 6 .9-4.3 4.2 1 6L12 17l-5.4 2.8 1-6L3.3 9.6l6-.9z"/>,
    check: <path d="M5 12.5l4.5 4.5L19 6.5"/>,
    checkC: <g><circle cx="12" cy="12" r="9"/><path d="M8 12.2l2.6 2.6L16 9"/></g>,
    clock: <g><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></g>,
    plus: <path d="M12 5v14M5 12h14"/>,
    search: <g><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></g>,
    bell: <g><path d="M6 9a6 6 0 1112 0c0 5 2 6 2 6H4s2-1 2-6z"/><path d="M10 20a2 2 0 004 0"/></g>,
    cart: <g><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h2.5l2.2 12.4a1.5 1.5 0 001.5 1.2h8.6a1.5 1.5 0 001.5-1.1L20.5 7H6"/></g>,
    heart: <path d="M12 20S4 14.5 4 9a4 4 0 017.5-2A4 4 0 0119 9c0 5.5-7 11-7 11z"/>,
    cal: <g><rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9h18M8 2.5v4M16 2.5v4"/></g>,
    grid: <g><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></g>,
    card: <g><rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 9.5h19M6 15h4"/></g>,
    money: <g><circle cx="12" cy="12" r="9"/><path d="M12 7v10M14.5 9.2c-.5-.8-1.5-1.2-2.5-1.2-1.4 0-2.5.8-2.5 2s1.1 1.7 2.5 2 2.5.8 2.5 2-1.1 2-2.5 2c-1 0-2-.4-2.5-1.2"/></g>,
    play2: <g><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M10 8.5l5 3.5-5 3.5z" fill="currentColor" stroke="none"/></g>,
    upload: <g><path d="M12 16V5M7 9l5-4 5 4"/><path d="M5 19h14"/></g>,
    download: <g><path d="M12 4v11M7 11l5 5 5-5"/><path d="M5 20h14"/></g>,
    edit: <path d="M5 19h2.5L18 8.5 15.5 6 5 16.5zM14 7.5l2.5 2.5"/>,
    eye: <g><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="2.6"/></g>,
    x: <path d="M6 6l12 12M18 6L6 18"/>,
    menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
    dot: <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/>,
    shield: <g><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></g>,
    cert: <g><circle cx="12" cy="9" r="5"/><path d="M9 13l-1 8 4-2 4 2-1-8"/></g>,
    flame: <path d="M12 3c0 4-5 5-5 10a5 5 0 0010 0c0-2-1-3-1-3 0 2-1.5 3-2 3 .5-3-2-5-2-10z"/>,
    logo: <g><path d="M12 3l8 4v5c0 5-4 8-8 9-4-1-8-4-8-9V7z" fill="currentColor" stroke="none"/></g>,
  };
  return <svg {...p}>{paths[name] || null}</svg>;
}

function Logo({ size = 22, onClick, light }) {
  const box = size + 12;
  return (
    <div onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 10, cursor: onClick ? "pointer" : "default" }}>
      <div style={{ width: box, height: box, borderRadius: box * 0.3, background: "linear-gradient(135deg, var(--brand) 0%, var(--brand-d) 100%)", display: "grid", placeItems: "center", flexShrink: 0, position: "relative", boxShadow: "0 2px 8px oklch(0.45 0.10 168 / 0.3)" }}>
        <span style={{ color: "#fff", fontWeight: 700, fontSize: box * 0.55, lineHeight: 1, fontFamily: "var(--font-display)", marginTop: -1 }}>S</span>
        <span style={{ position: "absolute", top: box * 0.14, right: box * 0.14, width: box * 0.18, height: box * 0.18, borderRadius: 999, background: "var(--accent)" }} />
      </div>
      <span className="display" style={{ fontSize: size * 0.92, letterSpacing: "-0.01em", color: light ? "var(--ink-inv)" : "var(--ink)" }}>SobaiShikhi</span>
    </div>
  );
}

function Slot({ label, h = 200, dark, brand, style, children }) {
  return (
    <div className={"slot" + (dark ? " dark" : brand ? " brand" : "")} style={{ height: h, borderRadius: "inherit", ...style }}>
      {children}
      <span className="slot-tag">{label}</span>
    </div>
  );
}

function Stars({ value, size = 14, showNum, count }) {
  const full = Math.round(value);
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
      {showNum && <span className="display" style={{ fontSize: size + 0.5, color: "oklch(0.5 0.1 75)" }}>{value.toFixed(1)}</span>}
      <span style={{ display: "inline-flex", gap: 1 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Icon key={i} name={i < full ? "star" : "starO"} size={size} stroke={1.5} style={{ color: "var(--gold)" }} />
        ))}
      </span>
      {count != null && <span className="mono" style={{ fontSize: size - 2, color: "var(--ink-3)" }}>({count.toLocaleString()})</span>}
    </span>
  );
}

function Bars({ data, h = 44, accent }) {
  const max = Math.max(...data);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: h }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, height: `${(v / max) * 100}%`, borderRadius: 2,
          background: i === data.length - 1 ? "var(--brand)" : (accent ? "var(--brand-soft)" : "var(--line)") }} />
      ))}
    </div>
  );
}

function Spark({ data, w = 120, h = 36, color = "var(--brand)" }) {
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * (h - 4) - 2}`).join(" ");
  return <svg width={w} height={h} style={{ overflow: "visible" }}><polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Avatar({ initials, size = 38, brand, hue }) {
  const bg = hue != null ? `oklch(0.93 0.05 ${hue})` : brand ? "var(--brand-soft)" : "var(--paper-2)";
  const fg = hue != null ? `oklch(0.42 0.13 ${hue})` : brand ? "var(--brand-d)" : "var(--ink-2)";
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", flexShrink: 0, display: "grid", placeItems: "center",
      background: bg, color: fg, border: "1px solid var(--line)", fontFamily: "var(--font-mono)", fontSize: size * 0.34, fontWeight: 600 }}>{initials}</div>
  );
}

function Progress({ value, h = 7, color = "var(--brand)" }) {
  return (
    <div style={{ background: "var(--paper-2)", borderRadius: 999, height: h, overflow: "hidden", border: "1px solid var(--line-2)" }}>
      <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: 999, transition: "width .4s ease" }} />
    </div>
  );
}

function Stat({ label, value, sub, children }) {
  return (
    <div className="card" style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 6 }}>
      <span className="kicker">{label}</span>
      <div className="spread" style={{ alignItems: "flex-end" }}>
        <span className="display tnum" style={{ fontSize: 28 }}>{value}</span>
        {children}
      </div>
      {sub && <span className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{sub}</span>}
    </div>
  );
}

function StatusPill({ status }) {
  const map = {
    published: ["green", "Published", "checkC"],
    under_review: ["amber", "Under review", "clock"],
    revision: ["red", "Revision requested", "edit"],
    draft: ["gray", "Draft", "edit"],
  };
  const [c, label, icon] = map[status] || ["gray", status, "dot"];
  return <span className={"badge " + c}><Icon name={icon} size={12} /> {label}</span>;
}

Object.assign(window, { Icon, Logo, Slot, Stars, Bars, Spark, Avatar, Progress, Stat, StatusPill });
