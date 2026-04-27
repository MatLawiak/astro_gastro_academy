// Student area: dashboard, course view, lesson player, catalog, profile, pricing/checkout, errors
const StudentTopBar = ({ onNav, current }) => {
  const link = (key, label) => (
    <a href="#" onClick={(e)=>{e.preventDefault(); onNav(key);}}
      style={{
        color: current === key ? "var(--accent-deep)" : "var(--ink-2)",
        padding: "22px 2px", fontSize: 14, fontWeight: 500,
        borderBottom: current === key ? "2px solid var(--accent)" : "2px solid transparent",
      }}>{label}</a>
  );
  return (
    <header style={{
      background: "var(--bg-card)", borderBottom: "1px solid var(--line)",
      position: "sticky", top: 0, zIndex: 30,
    }}>
      <div className="container" style={{ display: "flex", alignItems: "center", height: 68, gap: 28 }}>
        <a href="#" onClick={(e)=>{e.preventDefault(); onNav("student-dashboard");}} style={{ textDecoration: "none" }}><Logo /></a>
        <nav style={{ display: "flex", alignItems: "center", gap: 24, marginLeft: 20 }} className="student-nav">
          {link("student-dashboard", "Moje kursy")}
          {link("catalog", "Katalog")}
          {link("student-profile", "Profil")}
        </nav>
        <div style={{ flex: 1 }} />
        <button className="btn ghost" style={{ padding: 8, position: "relative" }}>
          <Icon name="bell" size={18}/>
          <span style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, background: "var(--accent)", borderRadius: "50%" }}></span>
        </button>
        <Avatar name="Mateusz Kowalski" size={34} />
      </div>
    </header>
  );
};

/* ----------- Student Dashboard ----------- */
const StudentDashboard = ({ onNav, setCourseView }) => (
  <div>
    <div className="container" style={{ padding: "40px 28px" }}>
      <div className="tiny" style={{ marginBottom: 10 }}>wtorek, 20 kwietnia</div>
      <h1 style={{ fontSize: 44 }}>Serwus, <em style={{ color: "var(--accent)" }}>Mateusz</em></h1>

      {/* Continue */}
      <div className="card" style={{ marginTop: 32, overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 2fr", background: "var(--bg-card)" }} className="student-continue">
        <Photo label="lekcja · dashi" ratio="16/12" />
        <div style={{ padding: 28, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div className="tiny" style={{ color: "var(--accent)", marginBottom: 10 }}>Kontynuuj naukę</div>
          <div className="muted" style={{ fontSize: 13, marginBottom: 4 }}>Azjatycki Street Food</div>
          <h2 style={{ fontSize: 30, marginBottom: 16 }}>Lekcja 2 · Sekret prawdziwego dashi</h2>
          <div style={{ maxWidth: 380, marginBottom: 18 }}>
            <div className="progress"><span style={{ width: "68%" }}></span></div>
            <div className="muted" style={{ fontSize: 13, marginTop: 6 }}>68% ukończone · 16 z 24 lekcji</div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn primary" onClick={()=>onNav("lesson")}><Icon name="play" size={14}/> Wróć do lekcji</button>
            <button className="btn ghost" onClick={()=>onNav("course")}>Zobacz kurs</button>
          </div>
        </div>
      </div>

      {/* My courses */}
      <div style={{ marginTop: 56 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 20 }}>
          <h2 style={{ fontSize: 30 }}>Twoje kursy</h2>
          <a href="#" onClick={(e)=>{e.preventDefault(); onNav("catalog");}}>Wszystkie →</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="student-courses-grid">
          {[
            { t: "Azjatycki Street Food", m: "Moduł 2 z 4", p: 0.68, status: "W trakcie", label: "azjatycki · street food" },
            { t: "Pomidolove Włochy — kuchnia włoska", m: "Moduł 1 z 4", p: 0.14, status: "Rozpoczęty", label: "włoska · pasta" },
            { t: "Owoce Morza", m: "—", p: 0, status: "Nie zaczęty", label: "owoce morza · scampi" },
          ].map((c, i) => (
            <div key={i} className="card" onClick={()=>onNav("course")}
              style={{ overflow: "hidden", background: "var(--bg-card)", cursor: "pointer", transition: "transform .15s, box-shadow .15s" }}
              onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow="var(--shadow)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}>
              <Photo label={c.label} ratio="16/9" />
              <div style={{ padding: 20 }}>
                <div className="tiny" style={{ marginBottom: 6 }}>{c.status}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, marginBottom: 6, fontWeight: 500 }}>{c.t}</h3>
                <div className="muted" style={{ fontSize: 13, marginBottom: 12 }}>{c.m}</div>
                <div className="progress"><span style={{ width: `${c.p*100}%` }}></span></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended */}
      <div style={{ marginTop: 56 }}>
        <h2 style={{ fontSize: 30, marginBottom: 20 }}>Polecane dla Ciebie</h2>
        <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 12 }}>
          {["Twoja grupa","Śniadanie na dobry start","Chleb Rafała","Pyrkę? — kuchnia wielkopolska","Twój warsztat 1:1"].map((t, i) => (
            <div key={i} className="card" style={{ width: 240, flexShrink: 0, overflow: "hidden", background: "var(--bg-card)" }}>
              <Photo label={`kurs · ${t}`} ratio="4/3" />
              <div style={{ padding: 14 }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 500 }}>{t}</div>
                <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>5 lekcji · 2h</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Access footer */}
      <div style={{
        marginTop: 56, padding: "20px 24px", borderRadius: "var(--r-md)",
        background: "color-mix(in oklab, var(--mustard) 18%, var(--bg-card))",
        border: "1px solid color-mix(in oklab, var(--mustard) 40%, var(--line))",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap",
      }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: 15 }}>Twój dostęp ważny do: <span style={{ color: "var(--umber)" }}>15 maja 2026</span></div>
          <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>Zostało 25 dni. Przedłuż teraz, by nie stracić postępu.</div>
        </div>
        <button className="btn primary" onClick={()=>onNav("pricing")}>Odnów dostęp →</button>
      </div>
    </div>
  </div>
);

/* ----------- Course view (before lesson) ----------- */
const StudentCourseView = ({ onNav }) => {
  return (
    <div>
      <section style={{ background: "var(--bg-sand)", borderBottom: "1px solid var(--line)" }}>
        <div className="container" style={{ padding: "48px 28px", display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 48, alignItems: "center" }} className="course-hero-grid">
          <div>
            <button className="btn ghost sm" onClick={()=>onNav("student-dashboard")} style={{ marginBottom: 18, color: "var(--ink-muted)" }}>
              <Icon name="chevronLeft" size={14}/> Moje kursy
            </button>
            <div className="tiny" style={{ color: "var(--accent)", marginBottom: 12 }}>Kurs podstawowy · 4 moduły</div>
            <h1 style={{ fontSize: 52 }}>Kuchnia <em style={{ color: "var(--accent)" }}>Zodiaku</em> — Podstawy</h1>
            <p style={{ marginTop: 18, fontSize: 17, maxWidth: 520, color: "var(--ink-2)" }}>
              Pokażę Ci, jak gotuje się prawdziwe azjatyckie street food —
              ramen, kimchi, pad thai, bao buns, gyoza.
              Z fundamentem, bez skrótów. Tak jak na warsztatach na Wodnej.
            </p>
            <div style={{ display: "flex", gap: 16, marginTop: 22, flexWrap: "wrap", color: "var(--ink-muted)", fontSize: 14 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon name="clock" size={14}/> 8 godzin</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon name="film" size={14}/> 24 lekcje</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon name="book" size={14}/> Podstawowy</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon name="star" size={14} style={{ color: "var(--mustard)" }}/> 4.9 (87 opinii)</span>
            </div>
            <div style={{ marginTop: 28, display: "flex", gap: 12, alignItems: "center" }}>
              <button className="btn primary lg" onClick={()=>onNav("lesson")}><Icon name="play" size={14}/> Rozpocznij kurs</button>
              <div style={{ fontSize: 13 }}>
                <div className="muted">Twój postęp</div>
                <div><strong>68%</strong> ukończone</div>
              </div>
            </div>
          </div>
          <Photo label="cover · ramen · overhead" ratio="4/5" style={{ borderRadius: "var(--r-lg)", boxShadow: "var(--shadow-lg)" }} />
        </div>
      </section>

      <div className="container" style={{ padding: "56px 28px", display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 48 }} className="course-body-grid">
        <div>
          <h2 style={{ fontSize: 28, marginBottom: 16 }}>O kursie</h2>
          <p style={{ fontSize: 16, lineHeight: 1.65, maxWidth: 640 }}>
            Ten kurs jest dla Gastronautów zafascynowanych Azją.
            Pokażę Ci, dlaczego prawdziwy ramen smakuje inaczej niż ten z barku
            i jak zrobić go w domu — z fundamentem, nie ze skrótami.
          </p>
          <div style={{ marginTop: 28, padding: 24, background: "var(--bg-card)", borderRadius: "var(--r-md)", border: "1px solid var(--line)" }}>
            <div className="tiny" style={{ marginBottom: 14 }}>Czego się nauczysz</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "Robić bulion dashi, sos sojowy do ramenu, pastę do pad thai",
                "Pracować z wokiem na pełnym ogniu — wok hei, prawdziwy smak ulicy",
                "Składać miski ramen, bao bun, banh mi — z fundamentem, nie ze skrótami",
                "Kupować składniki w sklepach azjatyckich — co jest must-have, co to ściema",
              ].map(l => (
                <li key={l} style={{ display: "flex", gap: 10, fontSize: 14 }}>
                  <Icon name="check" size={16} style={{ color: "var(--sage-deep)", flexShrink: 0, marginTop: 2 }}/>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>

          <h2 style={{ fontSize: 28, marginTop: 48, marginBottom: 16 }}>Program kursu</h2>
          <div className="card" style={{ padding: "8px 24px" }}>
            {[
              { t: "Moduł 1: Fundamenty Azji", l: "3 lekcje · 35 min", items: [
                ["Powitanie","5:30",true],["Sekret prawdziwego dashi","12:15",false],["Materiały modułu","PDF",false]
              ]},
              { t: "Moduł 2: Wok i ogień", l: "4 lekcje · 66 min", items: [
                ["Wok hei — prawdziwy ogień ulicy","18:20",false],["Pad thai od zera — pasta tamaryndowa","16:40",false]
              ]},
              { t: "Moduł 3: Składanie miski", l: "2 lekcje · 24 min", items: [] },
              { t: "Moduł 4: Praktyka", l: "5 lekcji · 58 min", items: [] },
            ].map((m, mi) => (
              <details key={mi} className="acc" open={mi === 0}>
                <summary>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span>{m.t}</span>
                    <span className="muted" style={{ fontSize: 12, fontWeight: 400 }}>{m.l}</span>
                  </div>
                </summary>
                <div style={{ padding: "6px 0 12px" }}>
                  {m.items.map(([t, d, done], i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", fontSize: 14 }}>
                      <Icon name={done ? "checkCircle" : "circle"} size={16} style={{ color: done ? "var(--sage-deep)" : "var(--line-strong)" }}/>
                      <span style={{ flex: 1 }}>{t}</span>
                      <span className="muted" style={{ fontFamily: "ui-monospace, monospace", fontSize: 12 }}>{d}</span>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>

        <aside>
          {/* Author */}
          <div className="card" style={{ padding: 24, background: "var(--bg-card)" }}>
            <div className="tiny" style={{ marginBottom: 16 }}>Autorka kursu</div>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <Avatar name="Kuba Link" size={60} tone="color-mix(in oklab, var(--sage) 40%, var(--bg-sand))"/>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 500 }}>Kuba Link</div>
                <div className="muted" style={{ fontSize: 13 }}>Chef Astrogastro · warsztaty kulinarne · live cooking · catering · Poznań</div>
              </div>
            </div>
            <p className="muted" style={{ fontSize: 13, marginTop: 14, lineHeight: 1.55 }}>
              Założyciel Astrogastro w Poznaniu na ul. Wodnej. Od dekady gotuje, uczy i robi catering.
              Tu uczy online tego samego, co na warsztatach na Wodnej.
            </p>
          </div>

          {/* Reviews */}
          <div className="card" style={{ padding: 24, marginTop: 16, background: "var(--bg-card)" }}>
            <div className="tiny" style={{ marginBottom: 12 }}>Opinie</div>
            {[
              { q: "Najlepszy kurs kulinarny, na jakim byłem.", n: "Mateusz K.", s: 5 },
              { q: "Konkretne przepisy, zero pseudonaukowych mądrości.", n: "Tomek W.", s: 5 },
              { q: "Zacząłem w końcu rozumieć, co robię.", n: "Jan S.", s: 5 },
            ].map((r, i) => (
              <div key={i} style={{ padding: "12px 0", borderTop: i===0?"none":"1px dashed var(--line)" }}>
                <div style={{ color: "var(--mustard)", fontSize: 13, marginBottom: 4 }}>{"★".repeat(r.s)}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 15, fontStyle: "italic" }}>„{r.q}”</div>
                <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>— {r.n}</div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

/* ----------- Lesson Player (flagship screen) ----------- */
const StudentLesson = ({ onNav }) => {
  const [tab, setTab] = useState("opis");
  const [notes, setNotes] = useState(() => localStorage.getItem("aga-notes") || "Mój notatnik do tej lekcji…\n\n- Zamówić kombu hidaka i katsuobushi.\n- Spróbować pierwszego dashi w sobotę.\n");
  const [saved, setSaved] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  useEffect(() => {
    setSaved(false);
    const t = setTimeout(() => { localStorage.setItem("aga-notes", notes); setSaved(true); }, 700);
    return () => clearTimeout(t);
  }, [notes]);

  const modules = [
    { t: "Moduł 1: Fundamenty Azji", open: true, items: [
      { t: "Powitanie", d: "5:30", done: true },
      { t: "Sekret prawdziwego dashi", d: "12:15", current: true },
      { t: "Mise en place", d: "8:45" },
    ]},
    { t: "Moduł 2: Wok i ogień", open: false, items: [] },
    { t: "Moduł 3: Składanie miski", open: false, items: [] },
    { t: "Moduł 4: Praktyka", open: false, items: [] },
  ];

  return (
    <div style={{ background: "var(--bg)", minHeight: "calc(100vh - 68px)" }}>
      <div className="container lesson-wrap" style={{ padding: "24px 28px 120px", display: "grid", gridTemplateColumns: "1fr 360px", gap: 28 }}>
        <main>
          <div style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 12 }}>
            <button className="btn ghost sm" onClick={()=>onNav("course")}><Icon name="chevronLeft" size={14}/> Azjatycki Street Food</button>
            <div className="muted" style={{ fontSize: 13 }}>Moduł 1 · Lekcja 2 z 24</div>
          </div>

          <VideoPlayer />

          <h1 style={{ fontSize: 34, marginTop: 24 }}>Sekret prawdziwego dashi</h1>
          <div style={{ display: "flex", gap: 16, marginTop: 10, color: "var(--ink-muted)", fontSize: 14, flexWrap: "wrap" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon name="clock" size={14}/> 12:15</span>
            <span>·</span>
            <span>Opublikowano 14.03.2026</span>
            <span>·</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--sage-deep)" }}><Icon name="checkCircle" size={14}/> Obejrzano</span>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 6, marginTop: 28, borderBottom: "1px solid var(--line)" }}>
            {[["opis","Opis"],["materialy","Materiały"],["notatki","Notatki"]].map(([id,l])=>(
              <button key={id} onClick={()=>setTab(id)} style={{
                padding: "12px 18px", fontSize: 14, fontWeight: 500,
                color: tab===id ? "var(--accent-deep)" : "var(--ink-muted)",
                borderBottom: tab===id ? "2px solid var(--accent)" : "2px solid transparent",
                marginBottom: -1,
              }}>{l}</button>
            ))}
          </div>

          <div style={{ marginTop: 24 }}>
            {tab === "opis" && (
              <div style={{ maxWidth: 680 }}>
                <p style={{ fontSize: 17, lineHeight: 1.65 }}>
                  W tej lekcji pokażę Ci, jak zrobić <strong>prawdziwe dashi</strong> —
                  bulion, który jest fundamentem całej kuchni japońskiej.
                  Bez niego nie zrobisz miso, ramenu, ani porządnego udonu.
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.6, marginTop: 10 }}>Poznasz:</p>
                <ul style={{ paddingLeft: 20, fontSize: 16, lineHeight: 1.7 }}>
                  <li>Różnica między kombu nori, hidaka i rishiri — i kiedy używać którego</li>
                  <li>Temperatura wody do kombu — dlaczego 60°C, nie wrzątek</li>
                  <li>Jak rozpoznać <em style={{color:"var(--accent)"}}>katsuobushi</em> wysokiej jakości</li>
                </ul>
                <div style={{
                  marginTop: 24, padding: "18px 22px", borderLeft: "3px solid var(--accent)",
                  background: "var(--bg-card)", borderRadius: "0 var(--r-sm) var(--r-sm) 0",
                  fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 18, color: "var(--ink-2)",
                }}>
                  „Street food w Azji to nie tanie żarcie. To technika, której uczy się latami.”
                </div>
              </div>
            )}
            {tab === "materialy" && (
              <div style={{ maxWidth: 680 }}>
                {[
                  { t: "Notatnik do lekcji 2.pdf", s: "420 KB" },
                  { t: "Lista przypraw ognia.pdf", s: "180 KB" },
                  { t: "Przepis — rozgrzewający wywar.pdf", s: "260 KB" },
                ].map((f, i) => (
                  <a key={i} href="#" onClick={(e)=>e.preventDefault()} style={{
                    display: "flex", alignItems: "center", gap: 16, padding: 18,
                    background: "var(--bg-card)", border: "1px solid var(--line)",
                    borderRadius: "var(--r-sm)", marginBottom: 10, textDecoration: "none", color: "var(--ink)",
                    transition: "background .15s",
                  }}
                  onMouseEnter={e=>e.currentTarget.style.background="var(--bg-sand)"}
                  onMouseLeave={e=>e.currentTarget.style.background="var(--bg-card)"}>
                    <div style={{ width: 42, height: 42, borderRadius: 8, background: "color-mix(in oklab, var(--accent) 12%, var(--bg-card))", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name="pdf" size={18}/>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{f.t}</div>
                      <div className="muted" style={{ fontSize: 12 }}>{f.s}</div>
                    </div>
                    <Icon name="download" size={18} style={{ color: "var(--ink-muted)" }}/>
                  </a>
                ))}
              </div>
            )}
            {tab === "notatki" && (
              <div style={{ maxWidth: 680 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <label className="tiny" style={{ margin: 0 }}>Twoje notatki · zapisują się automatycznie</label>
                  <span style={{ fontSize: 12, color: saved ? "var(--sage-deep)" : "var(--ink-muted)" }}>
                    {saved ? "✓ zapisano" : "pisanie…"}
                  </span>
                </div>
                <textarea className="input" rows={10} value={notes} onChange={e=>setNotes(e.target.value)}
                  style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.6 }}/>
                <div style={{ marginTop: 10, fontSize: 12, color: "var(--ink-muted)" }}>
                  Notatki są prywatne i widoczne tylko dla Ciebie.
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Sidebar */}
        <aside className="lesson-sidebar" style={{ position: "sticky", top: 88, alignSelf: "start", maxHeight: "calc(100vh - 100px)", overflow: "auto" }}>
          <LessonSidebar modules={modules} />
        </aside>
      </div>

      {/* Sticky bottom nav */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 25,
        background: "color-mix(in oklab, var(--bg-card) 92%, transparent)",
        backdropFilter: "blur(10px) saturate(1.1)",
        borderTop: "1px solid var(--line)",
      }}>
        <div className="container" style={{ padding: "14px 28px", display: "flex", alignItems: "center", gap: 12, justifyContent: "space-between" }}>
          <button className="btn ghost lesson-prev"><Icon name="chevronLeft" size={16}/> Poprzednia</button>
          <button className="btn secondary lesson-show-list" onClick={()=>setSheetOpen(true)} style={{ display: "none" }}>
            <Icon name="menu" size={14}/> Lista lekcji
          </button>
          <button className="btn primary"><Icon name="check" size={14}/> Oznacz jako ukończoną</button>
          <button className="btn ghost">Następna <Icon name="chevronRight" size={16}/></button>
        </div>
      </div>

      {sheetOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 40, background: "rgba(43,31,24,0.5)" }} onClick={()=>setSheetOpen(false)}>
          <div onClick={e=>e.stopPropagation()} style={{
            position: "absolute", bottom: 0, left: 0, right: 0, maxHeight: "80vh", overflow: "auto",
            background: "var(--bg-card)", borderRadius: "var(--r-lg) var(--r-lg) 0 0", padding: 18,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h3 style={{ fontSize: 20 }}>Lista lekcji</h3>
              <button className="btn ghost" onClick={()=>setSheetOpen(false)}><Icon name="close" size={16}/></button>
            </div>
            <LessonSidebar modules={modules} embedded />
          </div>
        </div>
      )}
    </div>
  );
};

const VideoPlayer = () => {
  const [playing, setPlaying] = useState(false);
  return (
    <div style={{ position: "relative", aspectRatio: "16/9", borderRadius: "var(--r-lg)", overflow: "hidden", background: "var(--bg-deep)", boxShadow: "var(--shadow-lg)" }}>
      <div className="placeholder-photo" style={{
        position: "absolute", inset: 0, borderRadius: 0,
        background: `linear-gradient(135deg, rgba(255,255,255,0.03), rgba(0,0,0,0.2)),
          repeating-linear-gradient(135deg, rgba(184,80,66,0.18) 0 22px, rgba(92,58,46,0.25) 22px 44px)`,
        color: "color-mix(in oklab, var(--bg) 85%, transparent)",
      }}>
        <div className="lbl" style={{
          background: "rgba(43,31,24,0.55)", border: "1px solid rgba(255,255,255,0.12)",
          color: "color-mix(in oklab, var(--bg) 85%, transparent)",
        }}>video embed · Google Drive · lesson 02</div>
      </div>
      <button onClick={()=>setPlaying(p=>!p)} style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        background: "transparent",
      }} aria-label={playing?"Pause":"Play"}>
        <span style={{
          width: 76, height: 76, borderRadius: "50%",
          background: "color-mix(in oklab, var(--bg-card) 96%, transparent)",
          color: "var(--accent)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
        }}>
          <Icon name={playing ? "pause" : "play"} size={28}/>
        </span>
      </button>
      <div style={{
        position: "absolute", left: 16, right: 16, bottom: 14,
        display: "flex", alignItems: "center", gap: 12, color: "var(--bg)",
      }}>
        <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,0.18)", borderRadius: 4, overflow: "hidden" }}>
          <div style={{ width: "32%", height: "100%", background: "var(--accent)" }}/>
        </div>
        <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 12 }}>03:58 / 12:15</span>
      </div>
    </div>
  );
};

const LessonSidebar = ({ modules, embedded = false }) => {
  const [open, setOpen] = useState(() => modules.reduce((a, m, i) => ({ ...a, [i]: m.open }), {}));
  return (
    <div className={embedded ? "" : "card"} style={{ padding: embedded ? 0 : 18, background: "var(--bg-card)" }}>
      {!embedded && <>
        <div className="tiny" style={{ marginBottom: 4 }}>Kurs</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 500, marginBottom: 8 }}>Azjatycki Street Food</div>
        <div style={{ marginBottom: 16 }}><div className="progress"><span style={{ width: "68%" }}></span></div></div>
      </>}
      {modules.map((m, i) => (
        <div key={i} style={{ borderTop: i===0?"none":"1px solid var(--line)" }}>
          <button onClick={()=>setOpen(o=>({...o, [i]: !o[i]}))} style={{
            display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "12px 4px",
            textAlign: "left", fontSize: 14, fontWeight: 600,
          }}>
            <Icon name="chevronDown" size={14} style={{ transform: open[i] ? "none" : "rotate(-90deg)", transition: "transform .15s", color: "var(--accent)" }}/>
            <span style={{ flex: 1 }}>{m.t}</span>
          </button>
          {open[i] && m.items.length > 0 && (
            <div style={{ paddingBottom: 8 }}>
              {m.items.map((it, j) => (
                <div key={j} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 12px",
                  borderRadius: "var(--r-sm)", cursor: "pointer",
                  background: it.current ? "color-mix(in oklab, var(--accent) 14%, var(--bg-card))" : "transparent",
                  color: it.current ? "var(--accent-deep)" : "var(--ink-2)",
                  border: it.current ? "1px solid color-mix(in oklab, var(--accent) 40%, transparent)" : "1px solid transparent",
                  fontSize: 13,
                }}>
                  <Icon name={it.done ? "checkCircle" : it.current ? "play" : "circle"} size={14}
                    style={{ color: it.done ? "var(--sage-deep)" : it.current ? "var(--accent)" : "var(--line-strong)" }}/>
                  <span style={{ flex: 1, fontWeight: it.current ? 600 : 500 }}>{it.t}</span>
                  <span className="muted" style={{ fontSize: 11, fontFamily: "ui-monospace, monospace" }}>{it.d}</span>
                </div>
              ))}
            </div>
          )}
          {open[i] && m.items.length === 0 && (
            <div className="muted" style={{ fontSize: 12, padding: "0 12px 12px" }}>Zablokowane — ukończ poprzedni moduł</div>
          )}
        </div>
      ))}
    </div>
  );
};

/* ----------- Profile ----------- */
const StudentProfile = ({ onNav }) => (
  <div className="container" style={{ padding: "40px 28px", maxWidth: 960 }}>
    <h1 style={{ fontSize: 40, marginBottom: 8 }}>Twój <em style={{ color: "var(--accent)" }}>profil</em></h1>
    <p className="muted" style={{ marginBottom: 32 }}>Dane osobowe, plan dostępu, historia płatności.</p>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }} className="profile-grid-2">
      <div className="card" style={{ padding: 28 }}>
        <div className="tiny" style={{ marginBottom: 18 }}>Moje dane</div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 22 }}>
          <Avatar name="Mateusz Kowalski" size={64} tone="color-mix(in oklab, var(--sage) 40%, var(--bg-sand))"/>
          <button className="btn ghost sm">Zmień zdjęcie</button>
        </div>
        <div style={{ display: "grid", gap: 14 }}>
          <div><label className="label">Imię</label><input className="input" defaultValue="Mateusz Kowalski"/></div>
          <div><label className="label">Email</label><input className="input" defaultValue="mateusz@gmail.com"/></div>
          <div><label className="label">Hasło</label><input className="input" type="password" defaultValue="**********"/></div>
        </div>
        <button className="btn primary" style={{ marginTop: 18 }}>Zapisz zmiany</button>
      </div>
      <div className="card" style={{ padding: 28, background: "color-mix(in oklab, var(--mustard) 18%, var(--bg-card))", borderColor: "color-mix(in oklab, var(--mustard) 40%, var(--line))" }}>
        <div className="tiny" style={{ marginBottom: 18 }}>Mój dostęp</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 500 }}>Rocznie</div>
        <div className="muted italic" style={{ fontFamily: "var(--font-display)", fontSize: 16, marginTop: 4 }}>dostęp do całego Astroworld</div>
        <div style={{ marginTop: 20, padding: "14px 16px", background: "var(--bg-card)", borderRadius: "var(--r-sm)", border: "1px solid var(--line)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
            <span>Wygasa</span><strong>15.05.2026</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginTop: 6, color: "var(--ink-muted)" }}>
            <span>Zostało</span><span>25 dni</span>
          </div>
        </div>
        <button className="btn primary full" style={{ marginTop: 20 }} onClick={()=>onNav("pricing")}>Odnów dostęp</button>
        <div className="muted" style={{ fontSize: 12, marginTop: 12, textAlign: "center" }}>
          Historia: 3 zakupy, łącznie 327 zł
        </div>
      </div>
    </div>

    <div className="card" style={{ padding: 28 }}>
      <div className="tiny" style={{ marginBottom: 18 }}>Historia płatności</div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead>
          <tr style={{ textAlign: "left" }}>
            {["Data","Kwota","Plan","Status","Faktura"].map(h => (
              <th key={h} className="tiny" style={{ padding: "10px 0", borderBottom: "1px solid var(--line)" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ["14.02.2026","249 zł","Rocznie"],
            ["12.02.2025","39 zł","Miesięcznie"],
            ["12.01.2025","39 zł","Miesięcznie"],
          ].map((r,i)=>(
            <tr key={i} style={{ borderTop: "1px solid var(--line)" }}>
              <td style={{ padding: "14px 0", fontFamily: "ui-monospace, monospace" }}>{r[0]}</td>
              <td>{r[1]}</td>
              <td>{r[2]}</td>
              <td><span className="badge published">Opłacone</span></td>
              <td><button className="btn ghost sm"><Icon name="download" size={14}/> PDF</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

/* ----------- Catalog ----------- */
const Catalog = ({ onNav }) => {
  const [level, setLevel] = useState("all");
  const levels = [["all","Wszystkie"],["p","Podstawowy"],["s","Średni"],["z","Zaawansowany"]];
  const items = [
    { t: "Azjatycki Street Food", l: "Podstawowy", d: "8h · 24 lekcje", access: true },
    { t: "Pomidolove Włochy — kuchnia włoska", l: "Średni", d: "12h · 36 lekcji", access: true },
    { t: "Owoce Morza", l: "Każdy", d: "6h · 18 lekcji", access: true },
    { t: "Twoja grupa — warsztaty (min. 6 osób)", l: "Podstawowy", d: "5h · 12 lekcji", access: false },
    { t: "Śniadanie na dobry start", l: "Podstawowy", d: "3h · 8 lekcji", access: true },
    { t: "CHLEB RAFAŁA — warsztaty z wypieku", l: "Zaawansowany", d: "10h · 28 lekcji", access: false },
    { t: "Twój warsztat 1:1 — dla profesjonalistów", l: "Średni", d: "7h · 20 lekcji", access: true },
    { t: "Twój warsztat 1:1", l: "Każdy", d: "4h · 10 lekcji", access: true },
    { t: "Astrovoucher — warsztaty kulinarne", l: "Zaawansowany", d: "9h · 22 lekcje", access: false },
  ];
  return (
    <div className="container" style={{ padding: "40px 28px" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 20 }}>
        <div>
          <h1 style={{ fontSize: 44 }}>Katalog kursów</h1>
          <p className="muted" style={{ marginTop: 6 }}>12 kursów, nowe co miesiąc.</p>
        </div>
        <div style={{ display: "flex", gap: 6, background: "var(--bg-card)", padding: 4, borderRadius: 999, border: "1px solid var(--line)" }}>
          {levels.map(([id, l]) => (
            <button key={id} onClick={()=>setLevel(id)} style={{
              padding: "8px 16px", fontSize: 13, fontWeight: 500, borderRadius: 999,
              background: level === id ? "var(--ink)" : "transparent",
              color: level === id ? "var(--bg)" : "var(--ink-2)",
            }}>{l}</button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="catalog-grid">
        {items.map((c, i) => (
          <div key={i} className="card" style={{ overflow: "hidden", background: "var(--bg-card)", position: "relative", cursor: c.access ? "pointer" : "default" }}
            onClick={()=>c.access && onNav("course")}>
            {!c.access && (
              <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "rgba(43,31,24,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ padding: "10px 16px", background: "var(--bg-card)", borderRadius: 999, display: "flex", alignItems: "center", gap: 8, boxShadow: "var(--shadow)" }}>
                  <Icon name="lock" size={14}/> <span style={{ fontSize: 13, fontWeight: 600 }}>Wykup dostęp</span>
                </div>
              </div>
            )}
            <Photo label={`kurs · ${c.t.split("—")[0].trim().toLowerCase()}`} ratio="16/10" />
            <div style={{ padding: 20 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <span className="badge level">{c.l}</span>
                <span className="badge soft-accent">{c.d}</span>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 500 }}>{c.t}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ----------- Pricing page ----------- */
const PricingPage = ({ onNav }) => (
  <div className="container" style={{ padding: "40px 28px" }}>
    <div style={{ textAlign: "center", marginBottom: 48 }}>
      <div className="tiny" style={{ color: "var(--accent)", marginBottom: 12 }}>Cennik</div>
      <h1 style={{ fontSize: 52 }}>Wybierz plan, <em style={{ color: "var(--accent)" }}>który pasuje</em></h1>
      <p className="muted" style={{ fontSize: 17, maxWidth: 540, margin: "14px auto 0" }}>
        W każdym planie masz pełny dostęp do wszystkich 12 kursów, materiałów PDF i certyfikatów.
      </p>
    </div>
    <Pricing onNav={onNav} compact />
    <div style={{ maxWidth: 520, margin: "56px auto 0" }}>
      <div className="card" style={{ padding: 24 }}>
        <label className="label">Masz kupon?</label>
        <div style={{ display: "flex", gap: 8 }}>
          <input className="input" placeholder="np. WIOSNA26"/>
          <button className="btn secondary">Zastosuj</button>
        </div>
      </div>
      <label style={{ display: "flex", gap: 10, alignItems: "flex-start", margin: "20px 0 0", fontSize: 13, color: "var(--ink-muted)" }}>
        <input type="checkbox" defaultChecked style={{ accentColor: "var(--accent)", marginTop: 3 }}/>
        Akceptuję <a href="#">regulamin</a> i <a href="#">politykę prywatności</a>.
      </label>
      <button className="btn primary full lg" style={{ marginTop: 18 }} onClick={()=>onNav("checkout")}>Przejdź do płatności Hotpay →</button>
      <div style={{ marginTop: 20, textAlign: "center", color: "var(--ink-muted)", fontSize: 13 }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 10, color: "var(--ink-2)" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon name="blik" size={18}/> BLIK</span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon name="card" size={16}/> Karta</span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>Przelew</span>
        </div>
        Płatności zabezpieczone SSL · obsługuje <strong>Hotpay</strong>
      </div>
    </div>
  </div>
);

/* ----------- Error / empty states ----------- */
const ErrorState = ({ kind, onNav }) => {
  const cfg = {
    "404": { title: "Ta lekcja nie istnieje", text: "Możliwe, że została usunięta lub link jest nieaktualny.", cta: "Wróć do katalogu", next: "catalog", icon: "eyeOff" },
    "403": { title: "Twój dostęp wygasł", text: "Aby wrócić do kursów, przedłuż plan. Twój postęp zostanie zachowany.", cta: "Odnów dostęp", next: "pricing", icon: "lock" },
    "video": { title: "Nie możemy załadować lekcji", text: "Odśwież stronę albo spróbuj ponownie za chwilę. Jeśli problem się powtórzy, napisz do nas.", cta: "Odśwież stronę", next: "student-dashboard", icon: "film" },
  }[kind];
  return (
    <div className="container" style={{ padding: "120px 28px", textAlign: "center", maxWidth: 520 }}>
      <div style={{ width: 88, height: 88, margin: "0 auto 24px", borderRadius: "50%", background: "var(--bg-sand)", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name={cfg.icon} size={36}/>
      </div>
      <h1 style={{ fontSize: 40 }}>{cfg.title}</h1>
      <p className="muted" style={{ marginTop: 14, fontSize: 17 }}>{cfg.text}</p>
      <button className="btn primary lg" style={{ marginTop: 28 }} onClick={()=>onNav(cfg.next)}>{cfg.cta}</button>
    </div>
  );
};

Object.assign(window, {
  StudentTopBar, StudentDashboard, StudentCourseView, StudentLesson,
  StudentProfile, Catalog, PricingPage, ErrorState,
});
