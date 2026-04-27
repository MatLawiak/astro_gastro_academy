// Root app: routing, tweaks panel, edit-mode integration
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "terracotta",
  "accentIntensity": 100,
  "heroVariant": "editorial"
}/*EDITMODE-END*/;

const ACCENTS = {
  terracotta: { main: "#B85042", deep: "#8E3A2E", ink: "#FBF6EC", label: "Terakota" },
  sage:       { main: "#617F54", deep: "#4D6543", ink: "#FBF6EC", label: "Szałwia" },
  mustard:    { main: "#B8831F", deep: "#8C611A", ink: "#FBF6EC", label: "Musztarda" },
  burgundy:   { main: "#7C2E3A", deep: "#5B2029", ink: "#FBF6EC", label: "Burgund" },
  umber:      { main: "#5C3A2E", deep: "#3D2619", ink: "#FBF6EC", label: "Umbra" },
};

const App = () => {
  const [view, setView] = useState(() => localStorage.getItem("aga-view") || "landing");
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => { localStorage.setItem("aga-view", view); window.scrollTo(0, 0); }, [view]);

  // Apply accent to :root via style vars
  useEffect(() => {
    const a = ACCENTS[tweaks.accent] || ACCENTS.terracotta;
    const intensity = Math.max(60, Math.min(140, tweaks.accentIntensity)) / 100;
    // Blend toward base for softer, away from white for stronger
    const blend = (hex, pct) => {
      // pct < 1 = closer to cream, > 1 = darker; implement as OKLCH-ish via simple RGB
      const n = parseInt(hex.slice(1), 16);
      const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
      if (pct <= 1) {
        const mix = 1 - pct;
        return `rgb(${Math.round(r + (250 - r) * mix * 0.35)}, ${Math.round(g + (237 - g) * mix * 0.35)}, ${Math.round(b + (224 - b) * mix * 0.35)})`;
      } else {
        const over = pct - 1;
        return `rgb(${Math.round(r * (1 - over * 0.4))}, ${Math.round(g * (1 - over * 0.4))}, ${Math.round(b * (1 - over * 0.4))})`;
      }
    };
    document.documentElement.style.setProperty("--accent", blend(a.main, intensity));
    document.documentElement.style.setProperty("--accent-deep", blend(a.deep, intensity));
    document.documentElement.style.setProperty("--accent-ink", a.ink);
  }, [tweaks.accent, tweaks.accentIntensity]);

  // Edit-mode protocol
  useEffect(() => {
    const handler = (e) => {
      if (!e.data || typeof e.data !== "object") return;
      if (e.data.type === "__activate_edit_mode") setEditMode(true);
      if (e.data.type === "__deactivate_edit_mode") setEditMode(false);
    };
    window.addEventListener("message", handler);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", handler);
  }, []);

  const updateTweak = (key, val) => {
    setTweaks(t => ({ ...t, [key]: val }));
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [key]: val } }, "*");
  };

  const nav = (key) => setView(key);

  const isPublic = ["landing", "catalog", "pricing", "checkout", "design-system", "err-404", "err-403", "err-video"].includes(view);
  const isAdmin = view.startsWith("admin-");
  const isStudent = ["student-dashboard", "course", "lesson", "student-profile"].includes(view);

  return (
    <div data-screen-label={viewLabel(view)}>
      {isPublic && <PublicNav onNav={nav} current={view} />}
      {isStudent && <StudentTopBar onNav={nav} current={view} />}

      {view === "landing" && <LandingPage onNav={nav} heroVariant={tweaks.heroVariant} />}
      {view === "catalog" && <Catalog onNav={nav} />}
      {view === "pricing" && <PricingPage onNav={nav} />}
      {view === "checkout" && <CheckoutPage onNav={nav} />}
      {view === "design-system" && <DesignSystemPage />}

      {view === "err-404" && <ErrorState kind="404" onNav={nav} />}
      {view === "err-403" && <ErrorState kind="403" onNav={nav} />}
      {view === "err-video" && <ErrorState kind="video" onNav={nav} />}

      {isAdmin && (
        <AdminShell view={view} setView={setView} onNav={nav}>
          {view === "admin-dashboard" && <AdminDashboard setView={setView} />}
          {view === "admin-courses" && <AdminCourses setView={setView} />}
          {view === "admin-course-edit" && <AdminCourseEdit setView={setView} />}
          {view === "admin-students" && <AdminStudents />}
          {view === "admin-payments" && <AdminEmpty title="Płatności" text="Transakcje, statusy Hotpay i zwroty — w kolejnym sprincie." icon="card" />}
          {view === "admin-stats" && <AdminEmpty title="Statystyki" text="Szczegółowe wykresy retencji i konwersji — w kolejnym sprincie." icon="chart" />}
          {view === "admin-settings" && <AdminSettings />}
        </AdminShell>
      )}

      {view === "student-dashboard" && <StudentDashboard onNav={nav} />}
      {view === "course" && <StudentCourseView onNav={nav} />}
      {view === "lesson" && <StudentLesson onNav={nav} />}
      {view === "student-profile" && <StudentProfile onNav={nav} />}

      {isPublic && <Footer onNav={nav} />}

      {/* In-page nav chip (dev-ish, helps jump between screens) */}
      <NavChip view={view} onNav={nav} />

      {/* Tweaks panel */}
      {editMode && <TweaksPanel tweaks={tweaks} updateTweak={updateTweak} />}
    </div>
  );
};

const viewLabel = (v) => ({
  "landing": "01 Landing",
  "catalog": "02 Catalog",
  "pricing": "03 Pricing",
  "checkout": "04 Checkout",
  "design-system": "05 Design System",
  "admin-dashboard": "10 Admin · Dashboard",
  "admin-courses": "11 Admin · Courses",
  "admin-course-edit": "12 Admin · Course edit",
  "admin-students": "13 Admin · Students",
  "admin-payments": "14 Admin · Payments",
  "admin-stats": "15 Admin · Stats",
  "admin-settings": "16 Admin · Settings",
  "student-dashboard": "20 Student · Dashboard",
  "course": "21 Student · Course",
  "lesson": "22 Student · Lesson player",
  "student-profile": "23 Student · Profile",
  "err-404": "90 Error · 404",
  "err-403": "91 Error · 403",
  "err-video": "92 Error · video",
}[v] || v);

/* --- Nav chip: collapsible screen picker --- */
const NavChip = ({ view, onNav }) => {
  const [open, setOpen] = useState(false);
  const groups = [
    ["Publiczne", [
      ["landing","Landing"], ["catalog","Katalog"], ["pricing","Cennik"], ["checkout","Płatność"], ["design-system","Design system"],
    ]],
    ["Admin", [
      ["admin-dashboard","Pulpit"], ["admin-courses","Kursy"], ["admin-course-edit","Edycja kursu"],
      ["admin-students","Uczniowie"], ["admin-settings","Ustawienia"],
    ]],
    ["Strefa ucznia", [
      ["student-dashboard","Dashboard"], ["course","Widok kursu"], ["lesson","Lekcja (player)"], ["student-profile","Profil"],
    ]],
    ["Błędy", [
      ["err-404","404"], ["err-403","Dostęp wygasł"], ["err-video","Błąd video"],
    ]],
  ];
  return (
    <div style={{ position: "fixed", bottom: 20, left: 20, zIndex: 60, fontFamily: "var(--font-body)" }}>
      {open && (
        <div className="card" style={{
          padding: 16, marginBottom: 10, width: 260, background: "var(--bg-card)",
          boxShadow: "var(--shadow-lg)", maxHeight: "80vh", overflow: "auto",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div className="tiny">Nawigacja (prototyp)</div>
            <button className="btn ghost sm" style={{ padding: 4 }} onClick={()=>setOpen(false)}><Icon name="close" size={14}/></button>
          </div>
          {groups.map(([g, items]) => (
            <div key={g} style={{ marginBottom: 12 }}>
              <div className="muted" style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 6, fontWeight: 600 }}>{g}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {items.map(([id, l]) => (
                  <button key={id} onClick={()=>{onNav(id); setOpen(false);}} style={{
                    textAlign: "left", padding: "7px 10px", borderRadius: 6, fontSize: 13,
                    background: view===id ? "color-mix(in oklab, var(--accent) 14%, var(--bg-card))" : "transparent",
                    color: view===id ? "var(--accent-deep)" : "var(--ink-2)",
                    fontWeight: view===id ? 600 : 500,
                  }}>{l}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <button onClick={()=>setOpen(o=>!o)} style={{
        padding: "10px 16px", borderRadius: 999,
        background: "var(--ink)", color: "var(--bg)",
        display: "flex", alignItems: "center", gap: 10, fontSize: 13, fontWeight: 500,
        boxShadow: "var(--shadow-lg)",
      }}>
        <Icon name="grid" size={14}/>
        <span>{viewLabel(view)}</span>
      </button>
    </div>
  );
};

/* --- Tweaks Panel (accent intensity) --- */
const TweaksPanel = ({ tweaks, updateTweak }) => {
  return (
    <div style={{
      position: "fixed", bottom: 20, right: 20, zIndex: 70, width: 320,
      background: "var(--bg-card)", borderRadius: "var(--r-md)", boxShadow: "var(--shadow-lg)",
      border: "1px solid var(--line)", padding: 20, fontFamily: "var(--font-body)",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 500 }}>Tweaks</div>
          <div className="muted" style={{ fontSize: 11 }}>Zmiany są zapisywane na dysku</div>
        </div>
        <Icon name="wand" size={18} style={{ color: "var(--accent)" }}/>
      </div>

      <div style={{ marginBottom: 18 }}>
        <label className="label">Kolor akcentu</label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
          {Object.entries(ACCENTS).map(([k, a]) => (
            <button key={k} onClick={()=>updateTweak("accent", k)}
              title={a.label} style={{
                aspectRatio: "1", borderRadius: 8, background: a.main,
                border: tweaks.accent === k ? "2px solid var(--ink)" : "1px solid var(--line)",
                boxShadow: tweaks.accent === k ? "0 0 0 3px color-mix(in oklab, var(--ink) 12%, transparent)" : "none",
                position: "relative",
              }}>
              {tweaks.accent === k && <div style={{ position: "absolute", inset: 0, display:"flex", alignItems:"center", justifyContent:"center", color: "white" }}><Icon name="check" size={14}/></div>}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 11, color: "var(--ink-muted)" }}>
          {Object.entries(ACCENTS).map(([k, a]) => (
            <span key={k} style={{ fontWeight: tweaks.accent === k ? 600 : 400, color: tweaks.accent === k ? "var(--ink)" : "var(--ink-muted)" }}>{a.label}</span>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <label className="label" style={{ marginBottom: 0 }}>Intensywność akcentu</label>
          <span style={{ fontSize: 12, fontFamily: "ui-monospace, monospace", color: "var(--ink-muted)" }}>{tweaks.accentIntensity}%</span>
        </div>
        <input type="range" min="60" max="140" step="5" value={tweaks.accentIntensity}
          onChange={e=>updateTweak("accentIntensity", Number(e.target.value))}
          style={{ width: "100%", accentColor: "var(--accent)" }}/>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--ink-muted)" }}>
          <span>subtelny</span><span>wyrazisty</span>
        </div>
      </div>

      <div>
        <label className="label">Wariant hero (landing)</label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
          {[
            ["editorial","Split"],
            ["asymmetric","Centered"],
            ["fullbleed","Dark"],
          ].map(([id, l]) => (
            <button key={id} onClick={()=>updateTweak("heroVariant", id)} style={{
              padding: "10px 6px", fontSize: 12, borderRadius: 6,
              background: tweaks.heroVariant === id ? "var(--ink)" : "transparent",
              color: tweaks.heroVariant === id ? "var(--bg)" : "var(--ink-2)",
              border: "1px solid var(--line)", fontWeight: 500,
            }}>{l}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* --- Simple checkout stub --- */
const CheckoutPage = ({ onNav }) => (
  <div className="container" style={{ padding: "40px 28px", maxWidth: 640 }}>
    <button className="btn ghost sm" onClick={()=>onNav("pricing")} style={{ marginBottom: 20 }}><Icon name="chevronLeft" size={14}/> Wróć do planów</button>
    <h1 style={{ fontSize: 40 }}>Płatność</h1>
    <p className="muted" style={{ marginTop: 6 }}>Wybrany plan: <strong>90 dni</strong> — 199 zł</p>

    <div className="card" style={{ padding: 28, marginTop: 28 }}>
      <div style={{ display: "grid", gap: 16 }}>
        <div><label className="label">Email</label><input className="input" defaultValue="mateusz@gmail.com"/></div>
        <div><label className="label">Imię i nazwisko</label><input className="input" defaultValue="Mateusz Kowalski"/></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div><label className="label">NIP (opcjonalnie)</label><input className="input" placeholder="dla faktury firmowej"/></div>
          <div><label className="label">Kod pocztowy</label><input className="input" defaultValue="02-495"/></div>
        </div>
      </div>
      <hr className="gold" style={{ margin: "24px 0" }}/>
      <div className="tiny" style={{ marginBottom: 12 }}>Metoda płatności</div>
      <div style={{ display: "grid", gap: 10 }}>
        {[
          { id: "blik", icon: "blik", label: "BLIK", desc: "Zapłać kodem z aplikacji bankowej" },
          { id: "card", icon: "card", label: "Karta", desc: "Visa, Mastercard" },
          { id: "transfer", icon: "download", label: "Szybki przelew", desc: "mBank, ING, PKO…" },
        ].map((p, i) => (
          <label key={p.id} style={{
            display: "flex", gap: 14, padding: 14, borderRadius: "var(--r-sm)",
            border: i === 0 ? "1.5px solid var(--accent)" : "1px solid var(--line)",
            background: i === 0 ? "color-mix(in oklab, var(--accent) 8%, var(--bg-card))" : "var(--bg-card)",
            cursor: "pointer",
          }}>
            <input type="radio" name="pay" defaultChecked={i===0} style={{ accentColor: "var(--accent)" }}/>
            <Icon name={p.icon} size={20} style={{ color: "var(--accent)" }}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{p.label}</div>
              <div className="muted" style={{ fontSize: 12 }}>{p.desc}</div>
            </div>
          </label>
        ))}
      </div>
      <button className="btn primary full lg" style={{ marginTop: 20 }} onClick={()=>onNav("student-dashboard")}>
        Zapłać 199 zł →
      </button>
      <div style={{ textAlign: "center", color: "var(--ink-muted)", fontSize: 12, marginTop: 14 }}>
        Płatność obsługiwana przez Hotpay · SSL
      </div>
    </div>
  </div>
);

Object.assign(window, { App });

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
