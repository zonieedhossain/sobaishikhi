/* SobaiShikhi — App shell: routing, role switcher, tweaks */

const BRANDS = {
  emerald: ["oklch(0.55 0.105 168)", "oklch(0.45 0.10 168)", "oklch(0.95 0.04 168)"],
  teal: ["oklch(0.55 0.09 205)", "oklch(0.45 0.09 205)", "oklch(0.95 0.035 205)"],
  indigo: ["oklch(0.51 0.12 265)", "oklch(0.42 0.12 265)", "oklch(0.95 0.04 265)"],
  plum: ["oklch(0.52 0.13 322)", "oklch(0.43 0.13 322)", "oklch(0.95 0.04 322)"],
};
const ACCENTS = {
  coral: ["oklch(0.66 0.17 38)", "oklch(0.52 0.15 38)", "oklch(0.95 0.045 45)"],
  amber: ["oklch(0.74 0.15 72)", "oklch(0.58 0.13 65)", "oklch(0.96 0.05 80)"],
  rose: ["oklch(0.62 0.19 16)", "oklch(0.50 0.17 16)", "oklch(0.95 0.04 20)"],
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "brand": "emerald",
  "accent": "coral",
  "adminLayout": "sidebar"
}/*EDITMODE-END*/;

function applyVars(brand, accent) {
  const r = document.documentElement.style;
  const b = BRANDS[brand] || BRANDS.emerald;
  const a = ACCENTS[accent] || ACCENTS.coral;
  r.setProperty("--brand", b[0]); r.setProperty("--brand-d", b[1]); r.setProperty("--brand-soft", b[2]);
  r.setProperty("--accent", a[0]); r.setProperty("--accent-d", a[1]); r.setProperty("--accent-soft", a[2]);
}

function loadRoute() {
  try { return JSON.parse(localStorage.getItem("ss.route")) || { view: "site", page: "home" }; }
  catch { return { view: "site", page: "home" }; }
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = React.useState(loadRoute);

  React.useEffect(() => { applyVars(t.brand, t.accent); }, [t.brand, t.accent]);
  React.useEffect(() => { localStorage.setItem("ss.route", JSON.stringify(route)); }, [route]);

  const go = (patch) => {
    setRoute((r) => {
      const next = { ...r, ...patch };
      if (patch.view && patch.view !== "site") { next.page = undefined; }
      if (patch.q === undefined && patch.page !== "browse") next.q = undefined;
      return next;
    });
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  let body;
  if (route.view === "learner") body = <LearnerDash go={go} />;
  else if (route.view === "instructor") body = <InstructorDash go={go} />;
  else if (route.view === "vendor") body = <VendorPanel go={go} />;
  else if (route.view === "expert") body = <ExpertConsole go={go} />;
  else if (route.view === "admin") body = <AdminApp go={go} layout={t.adminLayout} />;
  else {
    let page;
    switch (route.page) {
      case "browse": page = <BrowsePage go={go} catId={route.id} query={route.q} />; break;
      case "course": page = <CourseDetail go={go} slug={route.id} />; break;
      case "instructor-profile": page = <InstructorProfile go={go} id={route.id} />; break;
      case "repair": page = <RepairHub go={go} />; break;
      case "repair-guide": page = <RepairGuidePage go={go} slug={route.id} />; break;
      case "forum": page = <ForumPage go={go} />; break;
      case "contribute": page = <ContributePage go={go} />; break;
      case "store": page = <StorePage go={go} kind="tools" />; break;
      case "parts": page = <StorePage go={go} kind="parts" />; break;
      case "experts": page = <ExpertsPage go={go} />; break;
      case "services": page = <ExpertsPage go={go} />; break;
      case "blog": page = <BlogPage go={go} />; break;
      case "blog-post": page = <BlogPostPage go={go} slug={route.id} />; break;
      case "ai": page = <AIAssistant go={go} />; break;
      case "watch": page = <WatchPage go={go} slug={route.id} />; break;
      case "signup": page = <Signup go={go} />; break;
      case "teach": page = <BecomeInstructor go={go} />; break;
      default: page = <Home go={go} />;
    }
    const bare = route.page === "watch";
    body = (
      <div>
        {!bare && <SiteNav go={go} route={route} />}
        <div key={route.page + (route.id || "") + (route.q || "")}>{page}</div>
        {!bare && <Footer go={go} />}
      </div>
    );
  }

  return (
    <div>
      {body}
      <RoleSwitcher route={route} go={go} />
      <TweaksPanel title="Tweaks">
        <TweakSection label="Brand color" />
        <TweakColor label="Brand" value={BRANDS[t.brand][0]} options={Object.values(BRANDS).map((x) => x[0])}
          onChange={(v) => setTweak("brand", Object.keys(BRANDS).find((k) => BRANDS[k][0] === v) || "emerald")} />
        <TweakColor label="CTA accent" value={ACCENTS[t.accent][0]} options={Object.values(ACCENTS).map((x) => x[0])}
          onChange={(v) => setTweak("accent", Object.keys(ACCENTS).find((k) => ACCENTS[k][0] === v) || "coral")} />
        <TweakSection label="Admin panel" />
        <TweakRadio label="Navigation" value={t.adminLayout} options={["sidebar", "topnav"]} onChange={(v) => setTweak("adminLayout", v)} />
      </TweaksPanel>
    </div>
  );
}

function RoleSwitcher({ route, go }) {
  const roles = [
    ["site", "Browse", "search", () => go({ view: "site", page: "home" })],
    ["learner", "Learn", "user", () => go({ view: "learner" })],
    ["instructor", "Teach", "teacher", () => go({ view: "instructor" })],
    ["vendor", "Vendor", "cart", () => go({ view: "vendor" })],
    ["expert", "Expert", "play", () => go({ view: "expert" })],
    ["admin", "Admin", "shield", () => go({ view: "admin" })],
  ];
  return (
    <div style={{ position: "fixed", bottom: 18, left: "50%", transform: "translateX(-50%)", zIndex: 80, background: "var(--ink)", borderRadius: 999, padding: 5, display: "flex", gap: 3, boxShadow: "var(--shadow-lg)", maxWidth: "calc(100vw - 24px)", overflowX: "auto" }}>
      {roles.map(([v, label, icon, fn]) => {
        const active = route.view === v;
        return (
          <button key={v} onClick={fn} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 13px", borderRadius: 999, border: "none", whiteSpace: "nowrap",
            background: active ? "var(--brand)" : "transparent", color: active ? "#fff" : "oklch(0.78 0.01 260)",
            fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13 }}>
            <Icon name={icon} size={15} /> {label}
          </button>
        );
      })}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
