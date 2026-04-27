// Admin panel: shell + dashboard + courses list + course edit + lesson modal + students + settings
const AdminShell = ({ view, setView, onNav, children }) => {
  const items = [
    { id: "admin-dashboard", icon: "home",     label: "Pulpit" },
    { id: "admin-courses",   icon: "book",     label: "Kursy" },
    { id: "admin-students",  icon: "users",    label: "Uczniowie" },
    { id: "admin-payments",  icon: "card",     label: "Płatności" },
    { id: "admin-stats",     icon: "chart",    label: "Statystyki" },
    { id: "admin-settings",  icon: "settings", label: "Ustawienia" },
  ];
  const crumbs = {
    "admin-dashboard": ["Pulpit"],
    "admin-courses": ["Kursy"],
    "admin-course-edit": ["Kursy", "Azjatycki Street Food"],
    "admin-students": ["Uczniowie"],
    "admin-payments": ["Płatności"],
    "admin-stats": ["Statystyki"],
    "admin-settings": ["Ustawienia"],
  };
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      {/* Sidebar */}
      <aside style={{
        width: 260, flexShrink: 0, background: "var(--bg-card)", borderRight: "1px solid var(--line)",
        display: "flex", flexDirection: "column", padding: "22px 18px", position: "sticky", top: 0, height: "100vh",
      }} className="admin-sidebar">
        <div style={{ padding: "4px 8px 24px" }}><Logo /></div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {items.map(it => {
            const active = view === it.id || (it.id === "admin-courses" && view === "admin-course-edit");
            return (
              <button key={it.id} onClick={()=>setView(it.id)} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "11px 12px",
                borderRadius: "var(--r-sm)", textAlign: "left",
                background: active ? "color-mix(in oklab, var(--accent) 14%, var(--bg-card))" : "transparent",
                color: active ? "var(--accent-deep)" : "var(--ink-2)",
                fontWeight: active ? 600 : 500, fontSize: 14,
                transition: "background .15s ease",
              }}
              onMouseEnter={e=>{ if(!active) e.currentTarget.style.background = "rgba(0,0,0,0.03)"; }}
              onMouseLeave={e=>{ if(!active) e.currentTarget.style.background = "transparent"; }}
              >
                <Icon name={it.icon} size={18} />
                {it.label}
              </button>
            );
          })}
        </nav>
        <div style={{ marginTop: "auto", padding: 12, borderTop: "1px solid var(--line)", display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar name="Kuba Link" size={36} tone="color-mix(in oklab, var(--sage) 40%, var(--bg-sand))" />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Kuba Link</div>
            <div className="muted" style={{ fontSize: 11 }}>Właścicielka</div>
          </div>
          <button className="btn ghost sm" style={{ marginLeft: "auto", padding: 6 }} onClick={()=>onNav("landing")} title="Wyloguj / strona">
            <Icon name="external" size={16} />
          </button>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Top bar */}
        <header style={{
          height: 64, borderBottom: "1px solid var(--line)", background: "var(--bg)",
          display: "flex", alignItems: "center", padding: "0 32px", gap: 20,
          position: "sticky", top: 0, zIndex: 10,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--ink-muted)" }}>
            {(crumbs[view] || []).map((c, i, arr) => (
              <React.Fragment key={i}>
                <span style={{ color: i === arr.length - 1 ? "var(--ink)" : "var(--ink-muted)", fontWeight: i === arr.length - 1 ? 600 : 500 }}>{c}</span>
                {i < arr.length - 1 && <Icon name="chevronRight" size={14} />}
              </React.Fragment>
            ))}
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ position: "relative", width: 280 }}>
            <Icon name="search" size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--ink-muted)" }} />
            <input className="input" placeholder="Szukaj kursu, ucznia, płatności…" style={{ paddingLeft: 38 }} />
          </div>
          <button className="btn ghost" style={{ position: "relative", padding: 8 }}>
            <Icon name="bell" size={18} />
            <span style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, background: "var(--accent)", borderRadius: "50%" }}></span>
          </button>
        </header>
        <main style={{ padding: "32px" }}>{children}</main>
      </div>
    </div>
  );
};

/* ----------- Admin Dashboard ----------- */
const AdminDashboard = ({ setView }) => (
  <div style={{ maxWidth: 1200 }}>
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 28 }}>
      <div>
        <h1 style={{ fontSize: 36 }}>Dzień dobry, <em style={{ color: "var(--accent)" }}>Kuba</em></h1>
        <p className="muted" style={{ marginTop: 6 }}>Oto co dzieje się dziś w Astroworld.</p>
      </div>
      <button className="btn primary" onClick={()=>setView("admin-course-edit")}><Icon name="plus" size={16}/> Nowy kurs</button>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }} className="admin-stats">
      <StatCard label="Aktywni uczniowie" value="127" delta="12 w tym tygodniu" />
      <StatCard label="Przychód miesięczny" value="8 450 zł" delta="23%" />
      <StatCard label="Nowe rejestracje" value="18" delta="w tym tygodniu" />
      <StatCard label="Wygasające dostępy" value="7" delta="w ciągu 7 dni" deltaTone="down" />
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 20, marginBottom: 24 }} className="admin-two-col">
      {/* Todo */}
      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22 }}>Do zrobienia</h3>
          <span className="badge warn">3 pilne</span>
        </div>
        {[
          { icon: "card", text: "3 płatności czekają na weryfikację", cta: "Sprawdź" },
          { icon: "users", text: "5 uczniów czeka na aktywację konta", cta: "Aktywuj" },
          { icon: "note", text: "2 komentarze pod lekcjami", cta: "Zobacz" },
        ].map((it, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderTop: i===0?"none":"1px solid var(--line)" }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: "color-mix(in oklab, var(--accent) 10%, var(--bg-card))", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name={it.icon} size={16} />
            </div>
            <div style={{ flex: 1, fontSize: 14 }}>{it.text}</div>
            <button className="btn ghost sm">{it.cta} →</button>
          </div>
        ))}
      </div>
      {/* Activity */}
      <div className="card" style={{ padding: 24 }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: 18 }}>Ostatnia aktywność</h3>
        {[
          { who: "Mateusz K.", what: "zaczął kurs", obj: "Azjatycki Street Food", time: "2 min" },
          { who: "Tomek W.", what: "nowa płatność", obj: "199 zł", time: "18 min" },
          { who: "Jan S.", what: "ukończył kurs", obj: "Pomidolove Włochy", time: "1 godz." },
          { who: "Julia P.", what: "zarejestrował się", obj: "", time: "3 godz." },
        ].map((a, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderTop: i===0?"none":"1px solid var(--line)" }}>
            <Avatar name={a.who} size={32} />
            <div style={{ flex: 1, fontSize: 13, lineHeight: 1.35 }}>
              <span style={{ fontWeight: 600 }}>{a.who}</span> <span className="muted">{a.what}</span>{" "}
              {a.obj && <span style={{ color: "var(--accent-deep)" }}>{a.obj}</span>}
            </div>
            <div className="muted" style={{ fontSize: 11 }}>{a.time}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Chart */}
    <div className="card" style={{ padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22 }}>Przychody — ostatnie 30 dni</h3>
        <div style={{ display: "flex", gap: 8 }}>
          <span className="badge level">30 dni</span>
          <span className="badge soft-accent">8 450 zł</span>
        </div>
      </div>
      <RevenueChart />
    </div>
  </div>
);

const RevenueChart = () => {
  // generate sample data
  const data = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 30; i++) {
      const base = 200 + 80 * Math.sin(i / 3) + i * 12;
      const noise = (Math.sin(i * 1.3) + 1) * 60;
      pts.push(base + noise);
    }
    return pts;
  }, []);
  const max = Math.max(...data);
  const w = 800, h = 200;
  const path = data.map((v, i) => `${i === 0 ? "M" : "L"} ${(i / (data.length - 1)) * w} ${h - (v / max) * h * 0.9 - 10}`).join(" ");
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="200" preserveAspectRatio="none">
      <defs>
        <linearGradient id="rev-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map(p => (
        <line key={p} x1="0" x2={w} y1={h*p} y2={h*p} stroke="var(--line)" strokeWidth="1" strokeDasharray="4 4" />
      ))}
      <path d={area} fill="url(#rev-fill)" />
      <path d={path} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((v, i) => i % 5 === 0 && (
        <circle key={i} cx={(i / (data.length - 1)) * w} cy={h - (v / max) * h * 0.9 - 10} r="3" fill="var(--accent)" />
      ))}
    </svg>
  );
};

/* ----------- Courses list ----------- */
const AdminCourses = ({ setView }) => {
  const courses = [
    { id: 1, title: "Azjatycki Street Food", status: "published", modules: 3, lessons: 24, students: 87, label: "azjatycki · street food" },
    { id: 2, title: "Pomidolove Włochy — kuchnia włoska", status: "published", modules: 4, lessons: 36, students: 52, label: "włoska · pomidory" },
    { id: 3, title: "Owoce Morza", status: "draft", modules: 2, lessons: 8, students: 0, label: "owoce morza · plating" },
  ];
  return (
    <div style={{ maxWidth: 1200 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 36 }}>Kursy <span className="muted" style={{ fontSize: 24, fontWeight: 400 }}>({courses.length})</span></h1>
          <p className="muted" style={{ marginTop: 6 }}>Twórz, edytuj i publikuj kursy online.</p>
        </div>
        <button className="btn primary" onClick={()=>setView("admin-course-edit")}><Icon name="plus" size={16}/> Nowy kurs</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }} className="admin-courses-grid">
        {courses.map(c => (
          <div key={c.id} className="card" style={{ overflow: "hidden", cursor: "pointer", transition: "box-shadow .2s ease" }}
            onClick={()=>setView("admin-course-edit")}
            onMouseEnter={e=>e.currentTarget.style.boxShadow="var(--shadow)"}
            onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
            <Photo label={c.label} ratio="16/7" />
            <div style={{ padding: 22 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <span className={`badge ${c.status}`}>● {c.status === "published" ? "Opublikowany" : "Szkic"}</span>
                <button className="btn ghost sm" onClick={(e)=>e.stopPropagation()}><Icon name="dots" size={16}/></button>
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: 12 }}>{c.title}</h3>
              <div style={{ display: "flex", gap: 18, fontSize: 13, color: "var(--ink-muted)" }}>
                <span><strong style={{ color: "var(--ink)" }}>{c.modules}</strong> moduły</span>
                <span><strong style={{ color: "var(--ink)" }}>{c.lessons}</strong> lekcji</span>
                <span><strong style={{ color: "var(--ink)" }}>{c.students}</strong> uczniów</span>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 18, paddingTop: 16, borderTop: "1px solid var(--line)" }}>
                <button className="btn ghost sm" onClick={(e)=>{e.stopPropagation(); setView("admin-course-edit");}}><Icon name="edit" size={14}/> Edytuj</button>
                <button className="btn ghost sm" onClick={(e)=>e.stopPropagation()}><Icon name="copy" size={14}/> Duplikuj</button>
                <button className="btn ghost sm" onClick={(e)=>e.stopPropagation()}><Icon name="eyeOff" size={14}/> Ukryj</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ----------- Course edit ----------- */
const AdminCourseEdit = ({ setView }) => {
  const [title, setTitle] = useState("Azjatycki Street Food");
  const [editing, setEditing] = useState(false);
  const [published, setPublished] = useState(true);
  const [modals, setModal] = useState(null); // null | 'add-lesson'
  const [structure, setStructure] = useState([
    { id: "m1", title: "Moduł 1: Fundamenty Azji", open: true, items: [
      { id: "l1", kind: "video", title: "Powitanie", dur: "5:30", done: true },
      { id: "l2", kind: "video", title: "Sekret prawdziwego dashi", dur: "12:15" },
      { id: "l3", kind: "doc",   title: "Materiały do modułu 1", dur: "PDF" },
    ]},
    { id: "m2", title: "Moduł 2: Wok i ogień", open: true, items: [
      { id: "l4", kind: "video", title: "Wok hei — prawdziwy ogień ulicy", dur: "18:20" },
      { id: "l5", kind: "video", title: "Pad thai od zera — pasta tamaryndowa", dur: "16:40" },
      { id: "l6", kind: "video", title: "Kimchi — fermentacja krok po kroku", dur: "14:10" },
      { id: "l7", kind: "video", title: "Ramen — bulion, makaron, dodatki", dur: "17:05" },
    ]},
    { id: "m3", title: "Moduł 3: Składanie miski", open: false, items: [
      { id: "l8", kind: "video", title: "Wiosna na talerzu", dur: "12:00" },
      { id: "l9", kind: "video", title: "Letnia lekkość", dur: "11:30" },
    ]},
  ]);

  const toggleModule = (id) => setStructure(s => s.map(m => m.id === id ? { ...m, open: !m.open } : m));

  return (
    <div style={{ maxWidth: 1200 }}>
      {/* Top */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
        <button className="btn ghost sm" onClick={()=>setView("admin-courses")}><Icon name="chevronLeft" size={16}/> Wróć</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 28 }} className="admin-edit-grid">
        <div>
          {editing ? (
            <input autoFocus value={title} onChange={e=>setTitle(e.target.value)} onBlur={()=>setEditing(false)}
              onKeyDown={e=>e.key==="Enter" && setEditing(false)}
              style={{
                fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 500, color: "var(--ink)",
                background: "transparent", border: "none", outline: "1.5px dashed var(--accent)",
                outlineOffset: 4, width: "100%", borderRadius: 4,
              }} />
          ) : (
            <h1 onClick={()=>setEditing(true)} style={{ cursor: "text", fontSize: 36 }} title="Kliknij, aby edytować">{title}</h1>
          )}
          <p className="muted" style={{ marginTop: 8 }}>Struktura kursu — przeciągnij, aby zmienić kolejność.</p>

          <div className="card" style={{ padding: 8, marginTop: 24 }}>
            {structure.map((m, mi) => (
              <div key={m.id} style={{ borderBottom: mi === structure.length - 1 ? "none" : "1px solid var(--line)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 12px" }}>
                  <div style={{ color: "var(--ink-muted)", cursor: "grab" }}><Icon name="drag" size={14}/></div>
                  <button onClick={()=>toggleModule(m.id)} style={{ display:"flex", alignItems:"center", gap: 8, flex: 1, textAlign: "left", padding: 0 }}>
                    <Icon name="chevronDown" size={16} style={{ transform: m.open ? "none" : "rotate(-90deg)", transition: "transform .15s ease", color: "var(--accent)" }}/>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 500 }}>{m.title}</span>
                    <span className="badge level" style={{ marginLeft: 8, fontSize: 11 }}>{m.items.length} {m.items.length === 1 ? "element" : "elementy"}</span>
                  </button>
                  <button className="btn ghost sm"><Icon name="dots" size={14}/></button>
                </div>
                {m.open && (
                  <div style={{ paddingLeft: 48, paddingBottom: 10 }}>
                    {m.items.map(it => (
                      <div key={it.id} style={{
                        display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
                        background: "var(--bg)", borderRadius: "var(--r-sm)", marginBottom: 6,
                        border: "1px solid var(--line)",
                      }}>
                        <div style={{ color: "var(--ink-muted)", cursor: "grab" }}><Icon name="drag" size={14}/></div>
                        <div style={{
                          width: 28, height: 28, borderRadius: 6,
                          background: it.kind === "video" ? "color-mix(in oklab, var(--accent) 12%, var(--bg-card))" : "color-mix(in oklab, var(--sage) 14%, var(--bg-card))",
                          color: it.kind === "video" ? "var(--accent)" : "var(--sage-deep)",
                          display: "flex", alignItems: "center", justifyContent: "center"
                        }}>
                          <Icon name={it.kind === "video" ? "film" : "pdf"} size={14}/>
                        </div>
                        <div style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{it.title}</div>
                        {it.done && <span className="badge published" style={{ fontSize: 10 }}>✓ Gotowe</span>}
                        <div className="muted" style={{ fontSize: 12, fontFamily: "ui-monospace, monospace" }}>{it.dur}</div>
                        <button className="btn ghost sm"><Icon name="dots" size={14}/></button>
                      </div>
                    ))}
                    <button className="btn ghost sm" onClick={()=>setModal("add-lesson")} style={{ marginTop: 6, color: "var(--accent)", fontWeight: 600 }}>
                      <Icon name="plus" size={14}/> Dodaj lekcję
                    </button>
                  </div>
                )}
              </div>
            ))}
            <button className="btn secondary" style={{ margin: 16, width: "calc(100% - 32px)" }}><Icon name="plus" size={14}/> Dodaj moduł</button>
          </div>
        </div>

        {/* Right panel */}
        <aside style={{ position: "sticky", top: 90, alignSelf: "start" }}>
          <div className="card" style={{ padding: 22 }}>
            <div className="tiny" style={{ marginBottom: 12 }}>Publikacja</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{published ? "Opublikowany" : "Szkic"}</div>
                <div className="muted" style={{ fontSize: 12 }}>{published ? "Widoczny dla uczniów" : "Tylko Ty widzisz"}</div>
              </div>
              <Toggle on={published} onToggle={()=>setPublished(!published)} />
            </div>
            <hr className="gold" style={{ margin: "14px 0" }} />
            <div className="tiny" style={{ marginBottom: 10 }}>Miniatura</div>
            <Photo label="thumbnail 16:9" ratio="16/9" style={{ marginBottom: 10 }} />
            <button className="btn secondary full sm"><Icon name="upload" size={14}/> Wgraj zdjęcie</button>
            <hr className="gold" style={{ margin: "14px 0" }} />
            <div style={{ fontSize: 12, color: "var(--ink-muted)", display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Utworzono</span><span>14.03.2026</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Ostatnia zmiana</span><span>dziś, 10:24</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Aktywni uczniowie</span><span style={{ color: "var(--ink)", fontWeight: 600 }}>87</span></div>
            </div>
          </div>
          <button className="btn primary full" style={{ marginTop: 14 }}>Zapisz zmiany</button>
        </aside>
      </div>

      {modals === "add-lesson" && <AddLessonModal onClose={()=>setModal(null)} />}
    </div>
  );
};

const Toggle = ({ on, onToggle }) => (
  <button onClick={onToggle} style={{
    width: 44, height: 24, borderRadius: 999,
    background: on ? "var(--sage-deep)" : "var(--ink-faint)",
    position: "relative", transition: "background .15s",
  }} aria-pressed={on}>
    <span style={{
      position: "absolute", top: 2, left: on ? 22 : 2,
      width: 20, height: 20, borderRadius: "50%", background: "var(--bg-card)",
      transition: "left .15s", boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
    }} />
  </button>
);

/* ---------- Add lesson modal ---------- */
const AddLessonModal = ({ onClose }) => {
  const [kind, setKind] = useState("video");
  const [driveUrl, setDriveUrl] = useState("");
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(43,31,24,0.55)",
      zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
      backdropFilter: "blur(3px)",
    }} onClick={onClose}>
      <div className="card" style={{ width: 640, maxWidth: "100%", maxHeight: "90vh", overflow: "auto", background: "var(--bg-card)", padding: 32 }} onClick={e=>e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <h2 style={{ fontSize: 28 }}>Nowa lekcja</h2>
          <button className="btn ghost" onClick={onClose}><Icon name="close" size={18}/></button>
        </div>

        <div style={{ marginBottom: 18 }}>
          <label className="label">Tytuł lekcji</label>
          <input className="input" placeholder="np. Sekret prawdziwego dashi" />
        </div>

        <div style={{ marginBottom: 18 }}>
          <label className="label">Typ lekcji</label>
          <div style={{ display: "flex", gap: 8 }}>
            {[
              { id: "video", label: "Wideo", icon: "film" },
              { id: "text", label: "Tekst", icon: "note" },
              { id: "both", label: "Wideo + tekst", icon: "book" },
            ].map(t => (
              <button key={t.id} onClick={()=>setKind(t.id)} style={{
                flex: 1, padding: "12px 14px", borderRadius: "var(--r-sm)",
                border: kind === t.id ? "1.5px solid var(--accent)" : "1px solid var(--line)",
                background: kind === t.id ? "color-mix(in oklab, var(--accent) 10%, var(--bg-card))" : "transparent",
                color: kind === t.id ? "var(--accent-deep)" : "var(--ink-2)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 14, fontWeight: 500,
              }}>
                <Icon name={t.icon} size={16}/> {t.label}
              </button>
            ))}
          </div>
        </div>

        {kind !== "text" && (
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
              <label className="label" style={{ marginBottom: 0 }}>Link z Google Drive</label>
              <button className="btn ghost sm" style={{ padding: "2px 8px", fontSize: 12, color: "var(--accent)" }}>? Pomoc</button>
            </div>
            <input className="input" value={driveUrl} onChange={e=>setDriveUrl(e.target.value)} placeholder="https://drive.google.com/file/d/…" />
            <div style={{ fontSize: 12, color: "var(--ink-muted)", marginTop: 6, lineHeight: 1.4 }}>
              Wklej link udostępniania z Google Drive. Plik musi być ustawiony jako <strong>„Każdy z linkiem”</strong>.
            </div>
          </div>
        )}

        <div style={{ marginBottom: 18 }}>
          <label className="label">Opis lekcji</label>
          <div style={{ border: "1px solid var(--line)", borderRadius: "var(--r-sm)", background: "var(--bg-card)" }}>
            <div style={{ display: "flex", gap: 4, padding: 6, borderBottom: "1px solid var(--line)" }}>
              {["B","i","🔗","•","1."].map(s => (
                <button key={s} className="btn ghost sm" style={{ padding: "4px 10px", fontSize: 13, fontWeight: s==="B"?700:s==="i"?400:500, fontStyle: s==="i"?"italic":"normal" }}>{s}</button>
              ))}
            </div>
            <textarea rows="4" style={{
              width: "100%", border: "none", outline: "none", padding: 12, background: "transparent",
              fontFamily: "inherit", fontSize: 14, resize: "vertical",
            }} placeholder="Opisz czego uczy ta lekcja…"/>
          </div>
        </div>

        <div style={{ marginBottom: 18 }}>
          <label className="label">Materiały do pobrania</label>
          <div style={{
            border: "2px dashed var(--line-strong)", borderRadius: "var(--r-md)", padding: 20,
            textAlign: "center", background: "var(--bg)", color: "var(--ink-muted)",
          }}>
            <Icon name="upload" size={20}/>
            <div style={{ fontSize: 14, marginTop: 8 }}>Przeciągnij pliki tutaj lub <a href="#" onClick={e=>e.preventDefault()} style={{ color: "var(--accent)" }}>dodaj z Drive</a></div>
          </div>
        </div>

        <label style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <input type="checkbox" style={{ accentColor: "var(--accent)", width: 18, height: 18 }}/>
          <span style={{ fontSize: 14 }}>Darmowa lekcja (próbka) — dostępna bez logowania</span>
        </label>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, paddingTop: 20, borderTop: "1px solid var(--line)" }}>
          <button className="btn ghost" onClick={onClose}>Anuluj</button>
          <button className="btn secondary" onClick={onClose}>Zapisz jako szkic</button>
          <button className="btn primary" onClick={onClose}>Opublikuj</button>
        </div>
      </div>
    </div>
  );
};

/* ----------- Students list ----------- */
const AdminStudents = () => {
  const [tab, setTab] = useState("all");
  const tabs = [["all","Wszyscy",127],["active","Aktywni",89],["expiring","Wygasający",7],["expired","Wygasłi",31]];
  const rows = [
    { n: "Mateusz Kowalski", e: "mateusz@gmail.com", plan: "90 dni", until: "12.05.26", p: 0.75, status: "active" },
    { n: "Tomek Wiśniewski", e: "tomek.w@gmail.com", plan: "365 dni", until: "22.11.26", p: 0.32, status: "active" },
    { n: "Jan Szymański", e: "jan.s@onet.pl", plan: "30 dni", until: "27.04.26", p: 1.0, status: "expiring" },
    { n: "Piotr Piotrowski", e: "p.piotrowski@gmail.com", plan: "90 dni", until: "02.07.26", p: 0.5, status: "active" },
    { n: "Kuba Link", e: "k.nowak@wp.pl", plan: "30 dni", until: "20.04.26", p: 0.14, status: "expiring" },
    { n: "Filip Lewandowski", e: "filip@interia.pl", plan: "365 dni", until: "15.03.27", p: 0.88, status: "active" },
  ];
  const filtered = tab === "all" ? rows : rows.filter(r => r.status === tab);
  return (
    <div style={{ maxWidth: 1200 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 36 }}>Uczniowie</h1>
          <p className="muted" style={{ marginTop: 6 }}>Zarządzaj dostępami i planami.</p>
        </div>
        <div style={{ position: "relative", width: 260 }}>
          <Icon name="search" size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--ink-muted)" }} />
          <input className="input" placeholder="Szukaj po imieniu lub email…" style={{ paddingLeft: 38 }}/>
        </div>
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 20, borderBottom: "1px solid var(--line)" }}>
        {tabs.map(([id, label, n]) => (
          <button key={id} onClick={()=>setTab(id)} style={{
            padding: "10px 16px", fontSize: 14, fontWeight: 500,
            color: tab === id ? "var(--accent-deep)" : "var(--ink-muted)",
            borderBottom: tab === id ? "2px solid var(--accent)" : "2px solid transparent",
            marginBottom: -1,
          }}>{label} <span className="muted" style={{ fontSize: 12, marginLeft: 4 }}>({n})</span></button>
        ))}
      </div>

      <div className="card" style={{ overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "var(--bg-sand)", textAlign: "left" }}>
              {["Imię i email","Plan","Dostęp do","Postęp","Akcje"].map(h => (
                <th key={h} className="tiny" style={{ padding: "14px 18px", borderBottom: "1px solid var(--line)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={i} style={{ borderTop: "1px solid var(--line)", transition: "background .15s" }}
                onMouseEnter={e=>e.currentTarget.style.background="var(--bg-sand)"}
                onMouseLeave={e=>e.currentTarget.style.background=""}>
                <td style={{ padding: "14px 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Avatar name={r.n} size={34} />
                    <div>
                      <div style={{ fontWeight: 600 }}>{r.n}</div>
                      <div className="muted" style={{ fontSize: 12 }}>{r.e}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "14px 18px" }}><span className="badge level">{r.plan}</span></td>
                <td style={{ padding: "14px 18px", fontFamily: "ui-monospace, monospace", fontSize: 13 }}>{r.until}</td>
                <td style={{ padding: "14px 18px" }}>
                  <div style={{ width: 120 }}>
                    <div className="progress"><span style={{ width: `${r.p*100}%` }}></span></div>
                    <div className="muted" style={{ fontSize: 11, marginTop: 4 }}>{Math.round(r.p*100)}%</div>
                  </div>
                </td>
                <td style={{ padding: "14px 18px" }}><button className="btn ghost sm"><Icon name="dots" size={14}/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ----------- Settings ----------- */
const AdminSettings = () => {
  const [tab, setTab] = useState("general");
  const tabs = [["general","Ogólne"],["payments","Płatności"],["plans","Plany cenowe"],["coupons","Kupony"],["emails","Emaile"],["integrations","Integracje"]];
  return (
    <div style={{ maxWidth: 1000 }}>
      <h1 style={{ fontSize: 36, marginBottom: 6 }}>Ustawienia</h1>
      <p className="muted" style={{ marginBottom: 28 }}>Wszystko, co działa w tle Twojej platformy.</p>

      <div style={{ display: "flex", gap: 4, marginBottom: 28, borderBottom: "1px solid var(--line)", flexWrap: "wrap" }}>
        {tabs.map(([id, label]) => (
          <button key={id} onClick={()=>setTab(id)} style={{
            padding: "10px 16px", fontSize: 14, fontWeight: 500,
            color: tab === id ? "var(--accent-deep)" : "var(--ink-muted)",
            borderBottom: tab === id ? "2px solid var(--accent)" : "2px solid transparent",
            marginBottom: -1,
          }}>{label}</button>
        ))}
      </div>

      {tab === "general" && (
        <div className="card" style={{ padding: 32 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
            <div><label className="label">Nazwa platformy</label><input className="input" defaultValue="Astro Gastro Academy"/></div>
            <div><label className="label">Domena</label><input className="input" defaultValue="astrogastro.eu"/></div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label className="label">Tagline</label>
            <input className="input" defaultValue="Kursy online, które łączą mądrość gwiazd z kuchnią prawdziwą."/>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 20, marginBottom: 20, alignItems: "center" }}>
            <div>
              <label className="label">Logo</label>
              <div style={{ width: 140, height: 80, borderRadius: "var(--r-sm)", background: "var(--bg-sand)", border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Logo compact />
              </div>
            </div>
            <div>
              <label className="label">Kolor główny</label>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--accent)", border: "1px solid var(--line)" }}/>
                <input className="input" defaultValue="#B85042" style={{ fontFamily: "ui-monospace, monospace", maxWidth: 200 }}/>
              </div>
            </div>
          </div>
          <hr className="gold" style={{ margin: "28px 0" }} />
          <button className="btn primary">Zapisz zmiany</button>
        </div>
      )}
      {tab === "payments" && (
        <div className="card" style={{ padding: 32 }}>
          <div className="tiny" style={{ marginBottom: 10 }}>Hotpay — dane integracji</div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, marginBottom: 18 }}>Połącz swoje konto Hotpay</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div><label className="label">Sekret API</label><input className="input" type="password" defaultValue="************"/></div>
            <div><label className="label">Hasło notyfikacji</label><input className="input" type="password" defaultValue="************"/></div>
          </div>
          <div style={{ marginTop: 20, padding: 16, background: "color-mix(in oklab, var(--sage) 14%, var(--bg-card))", borderRadius: "var(--r-sm)", display: "flex", gap: 12, alignItems: "flex-start" }}>
            <Icon name="check" size={16} style={{ color: "var(--sage-deep)", marginTop: 2 }}/>
            <div style={{ fontSize: 13 }}>
              <strong>Połączone.</strong> Ostatnia notyfikacja otrzymana 18 min temu.
            </div>
          </div>
          <hr className="gold" style={{ margin: "28px 0" }} />
          <button className="btn primary">Zapisz zmiany</button>
        </div>
      )}
      {tab === "plans" && (
        <div className="card" style={{ padding: 32 }}>
          {[["30 dni","79","Elastyczny miesięczny"],["90 dni","199","Najpopularniejszy"],["365 dni","599","Roczny dostęp"]].map(([l,p,s],i)=>(
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 120px 2fr auto", gap: 14, padding: "14px 0", borderTop: i===0?"none":"1px solid var(--line)", alignItems: "end" }}>
              <div><label className="label">Nazwa</label><input className="input" defaultValue={l}/></div>
              <div><label className="label">Cena (zł)</label><input className="input" defaultValue={p}/></div>
              <div><label className="label">Podtytuł</label><input className="input" defaultValue={s}/></div>
              <button className="btn ghost" style={{ padding: 10 }}><Icon name="dots" size={16}/></button>
            </div>
          ))}
          <hr className="gold" style={{ margin: "28px 0" }} />
          <button className="btn primary">Zapisz zmiany</button>
        </div>
      )}
      {tab === "coupons" && (
        <div className="card" style={{ padding: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22 }}>Aktywne kupony</h3>
            <button className="btn primary sm"><Icon name="plus" size={14}/> Nowy kupon</button>
          </div>
          {[["WIOSNA26","20%","125 użyć","30.05.26"],["LETNI","-50 zł","38 użyć","01.09.26"]].map(([c,v,u,d],i)=>(
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr auto", padding: "14px 0", borderTop: i===0?"none":"1px solid var(--line)", alignItems: "center", fontSize: 14 }}>
              <div style={{ fontFamily: "ui-monospace, monospace", fontWeight: 700, color: "var(--accent)" }}>{c}</div>
              <div>{v}</div>
              <div className="muted">{u}</div>
              <div className="muted">do {d}</div>
              <button className="btn ghost sm"><Icon name="dots" size={14}/></button>
            </div>
          ))}
        </div>
      )}
      {(tab === "emails" || tab === "integrations") && (
        <div className="card" style={{ padding: 48, textAlign: "center" }}>
          <div style={{ width: 64, height: 64, margin: "0 auto 18px", borderRadius: "50%", background: "var(--bg-sand)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-muted)" }}>
            <Icon name={tab === "emails" ? "note" : "settings"} size={24}/>
          </div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: 8 }}>{tab === "emails" ? "Szablony emaili" : "Integracje"}</h3>
          <p className="muted" style={{ maxWidth: 360, margin: "0 auto" }}>
            {tab === "emails" ? "Szablony: powitanie, potwierdzenie, wygasanie. Edycja w kolejnym sprincie."
              : "Google Drive, n8n API key, webhooki — sekcja w budowie."}
          </p>
        </div>
      )}
    </div>
  );
};

/* ----------- Stub for payments / stats tabs ----------- */
const AdminEmpty = ({ title, text, icon }) => (
  <div style={{ padding: 64, textAlign: "center", maxWidth: 520, margin: "40px auto" }}>
    <div style={{ width: 72, height: 72, margin: "0 auto 20px", borderRadius: "50%", background: "var(--bg-sand)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-muted)" }}>
      <Icon name={icon} size={28}/>
    </div>
    <h2 style={{ fontSize: 28 }}>{title}</h2>
    <p className="muted" style={{ marginTop: 10 }}>{text}</p>
  </div>
);

Object.assign(window, {
  AdminShell, AdminDashboard, AdminCourses, AdminCourseEdit,
  AdminStudents, AdminSettings, AdminEmpty, Toggle, AddLessonModal,
});
