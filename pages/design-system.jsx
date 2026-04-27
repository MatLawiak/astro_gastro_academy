// Design System — Astrogastro rebrand (navy + cream + mustard)
const DesignSystemPage = () => {
  const [copied, setCopied] = useState("");
  const copyFn = (t) => { navigator.clipboard?.writeText(t); setCopied(t); setTimeout(()=>setCopied(""), 1200); };

  const colors = [
    { name: "Cream",        var: "--bg",         hex: "#F4EFE4", role: "Tło główne" },
    { name: "Sand",         var: "--bg-sand",    hex: "#E8DFCC", role: "Tło drugorzędne" },
    { name: "Card cream",   var: "--bg-card",    hex: "#FBF8F1", role: "Powierzchnia kart" },
    { name: "Navy",         var: "--navy",       hex: "#0F1B2E", role: "Marka, tekst" },
    { name: "Navy 2",       var: "--navy-2",     hex: "#1C2D4A", role: "Hover na navy" },
    { name: "Mustard",      var: "--mustard",    hex: "#E2B13C", role: "Akcent — CTA" },
    { name: "Mustard deep", var: "--mustard-deep", hex: "#B5881F", role: "Hover akcentu" },
    { name: "Tomato",       var: "--tomato",     hex: "#D15A3A", role: "Pomidor — alarm/żar" },
    { name: "Olive",        var: "--olive",      hex: "#6E7A3D", role: "Sukces / zielony" },
    { name: "Ink muted",    var: "--ink-muted",  hex: "#6B7689", role: "Tekst drugorzędny" },
    { name: "Line",         var: "--line",       hex: "#D9CEB7", role: "Hairline border" },
  ];

  return (
    <div>
      <section style={{ background: "var(--navy)", color: "var(--bg-card)", borderBottom: "1.5px solid var(--line)", position: "relative", overflow: "hidden" }}>
        <div className="orbit" style={{ width: 800, height: 800, top: -300, right: -200 }}/>
        <div className="container" style={{ padding: "80px 28px 64px", position: "relative" }}>
          <div className="tiny" style={{ color: "var(--mustard)", marginBottom: 18 }}>Design system · Astrogastro</div>
          <h1 style={{ color: "var(--bg-card)", fontSize: "clamp(44px, 5.5vw, 72px)", maxWidth: 880, fontWeight: 800 }}>
            Tokeny, typografia i komponenty <span style={{ color: "var(--mustard)", fontStyle: "italic" }}>Gastronautów</span>
          </h1>
          <p style={{ color: "color-mix(in oklab, var(--bg-card) 75%, transparent)", maxWidth: 640, marginTop: 18, fontSize: 17 }}>
            Granat, kremowy i musztardowy akcent. Typografia Syne (display) + Inter (body).
            Każdy token wpięty w landing, panel admina i Astroworld ucznia.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: "64px 28px 96px" }}>
        <SystemSection eyebrow="01" title="Paleta kolorów" subtitle="Granat dominujący, krem dla powierzchni, musztarda jako jedyny CTA-akcent.">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
            {colors.map(c => (
              <button key={c.var} onClick={()=>copyFn(c.hex)} className="card" style={{
                padding: 0, textAlign: "left", cursor: "pointer", overflow: "hidden", transition: "box-shadow .15s",
              }}
              onMouseEnter={e=>e.currentTarget.style.boxShadow="var(--shadow)"}
              onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                <div style={{ height: 84, background: c.hex, borderBottom: "1.5px solid var(--line)" }} />
                <div style={{ padding: "12px 14px" }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{c.name}</div>
                  <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>{c.role}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-muted)", marginTop: 6 }}>
                    {copied === c.hex ? "skopiowano ✓" : c.hex}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </SystemSection>

        <SystemSection eyebrow="02" title="Typografia" subtitle="Syne (display, geometric grotesk) dla nagłówków, Inter dla treści, mono dla labelek.">
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32 }} className="ds-type-grid">
            <div className="card" style={{ padding: 32 }}>
              <div className="tiny" style={{ marginBottom: 20 }}>Display · Syne</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 80, lineHeight: 0.95, letterSpacing: "-0.035em", fontWeight: 800 }}>Gastronauci</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 48, lineHeight: 1.05, marginTop: 22, fontWeight: 800, letterSpacing: "-0.025em" }}>Welcome to <em style={{ color: "var(--mustard-deep)", fontStyle: "italic" }}>Astroworld</em></div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 28, marginTop: 22, fontWeight: 700 }}>Fermentacja od podstaw</div>
              <hr className="gold" style={{ margin: "28px 0" }} />
              <Row label="Hero"  sample="104 / 0.92 / -0.045em / 800" />
              <Row label="H1"    sample="56 / 1.0 / -0.025em / 800" />
              <Row label="H2"    sample="40 / 1.05 / -0.02em / 700" />
              <Row label="H3"    sample="22 / 1.2 / -0.01em / 700" />
            </div>
            <div className="card" style={{ padding: 32 }}>
              <div className="tiny" style={{ marginBottom: 20 }}>Body · Inter</div>
              <p style={{ fontSize: 18, lineHeight: 1.55 }}>
                Serwus, Gastronauto. Kursy kulinarne online prowadzone przez Kubę Linka.
                Fermentacja, kuchnia azjatycka, grill i makarony — bez ściemy, z konkretem.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ink-2)", marginTop: 14 }}>
                Każda lekcja to ok. 12-22 minut. Możesz oglądać w swoim tempie, wracać do trudniejszych fragmentów, robić listę zakupów z poziomu lekcji.
              </p>
              <hr className="gold" style={{ margin: "28px 0" }} />
              <div className="tiny" style={{ marginBottom: 12 }}>Mono · Inter sub</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.06em", color: "var(--mustard-deep)" }}>01 /04 — KOLEKTYW</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-muted)", marginTop: 10 }}>SECTION LABEL</div>
            </div>
          </div>
        </SystemSection>

        <SystemSection eyebrow="03" title="Przyciski">
          <div className="card" style={{ padding: 32 }}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
              <button className="btn primary">Wystartuj</button>
              <button className="btn secondary">Drugorzędny</button>
              <button className="btn dark">Dark navy</button>
              <button className="btn gold-outline">Gold outline</button>
              <button className="btn ghost">Ghost</button>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="btn primary lg">Duży CTA</button>
              <button className="btn secondary sm">Mały</button>
              <button className="btn primary sm"><Icon name="play" size={12}/> Z ikoną</button>
            </div>
            <hr className="gold" style={{ margin: "24px 0" }} />
            <div className="tiny">Kształt: pill (999px). Hover: ciemniejszy mustard / fill navy. Litery: uppercase, letter-spacing 0.04em, weight 700.</div>
          </div>
        </SystemSection>

        <SystemSection eyebrow="04" title="Karty, badge'e i progress">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="ds-cards-grid">
            <div className="card" style={{ overflow: "hidden" }}>
              <Photo label="ramen · steam" ratio="16/10" />
              <div style={{ padding: 18 }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                  <span className="badge level">Średni</span>
                  <span className="badge soft-accent">12h</span>
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 700 }}>Ramen & azjatyckie zupy</div>
                <div className="progress" style={{ marginTop: 14 }}><span style={{ width: "42%" }}/></div>
              </div>
            </div>
            <div className="card" style={{ padding: 22 }}>
              <div className="tiny">Statusy</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
                <span className="badge published">Opublikowany</span>
                <span className="badge draft">Szkic</span>
                <span className="badge hidden">Ukryty</span>
                <span className="badge active">Aktywny</span>
                <span className="badge warn">Wygasa</span>
              </div>
              <hr className="gold" style={{ margin: "20px 0" }}/>
              <div className="tiny">Progress</div>
              <div className="progress" style={{ marginTop: 12 }}><span style={{ width: "68%" }}/></div>
              <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>68% · 16 z 24 lekcji</div>
            </div>
            <div className="card surface-dark" style={{ padding: 22 }}>
              <div className="tiny" style={{ color: "var(--mustard)" }}>Dark surface</div>
              <h3 style={{ color: "var(--bg-card)", marginTop: 8 }}>Karta na granacie</h3>
              <p className="muted" style={{ color: "color-mix(in oklab, var(--bg-card) 70%, transparent)", fontSize: 14, marginTop: 8 }}>
                Tło sekcji „Featured”, „Final CTA” — z tym samym mustard akcentem.
              </p>
              <button className="btn gold-outline sm" style={{ marginTop: 14 }}>Akcja</button>
            </div>
          </div>
        </SystemSection>

        <SystemSection eyebrow="05" title="Formularze">
          <div className="card" style={{ padding: 32 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }} className="ds-form-grid">
              <div><label className="label">Email</label><input className="input" defaultValue="kuba@gastronauci.pl"/></div>
              <div><label className="label">Telefon</label><input className="input" placeholder="+48"/></div>
              <div><label className="label">Plan</label>
                <select className="select"><option>Miesięcznie</option><option>Rocznie</option></select>
              </div>
              <div><label className="label">Hasło</label><input className="input" type="password" defaultValue="********"/></div>
            </div>
            <div style={{ marginTop: 16 }}>
              <label className="label">Wiadomość</label>
              <textarea className="input" rows={3} defaultValue="Serwus! Mam pytanie o…"/>
            </div>
          </div>
        </SystemSection>

        <SystemSection eyebrow="06" title="Tokeny CSS">
          <pre style={{ background: "var(--navy)", color: "var(--bg-card)", padding: 24, borderRadius: "var(--r-md)", overflow: "auto", fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.6 }}>
{`--navy:        #0F1B2E
--mustard:     #E2B13C
--mustard-deep:#B5881F
--bg:          #F4EFE4
--bg-card:     #FBF8F1
--ink:         #0F1B2E
--font-display: "Syne", Georgia, serif
--font-body:    "Inter", sans-serif`}
          </pre>
        </SystemSection>
      </div>
    </div>
  );
};

const SystemSection = ({ eyebrow, title, subtitle, children }) => (
  <section style={{ marginBottom: 80 }}>
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--mustard-deep)", letterSpacing: "0.12em", marginBottom: 8, fontWeight: 700 }}>{eyebrow}</div>
      <h2>{title}</h2>
      {subtitle && <p className="muted" style={{ fontSize: 16, maxWidth: 620, marginTop: 8 }}>{subtitle}</p>}
    </div>
    {children}
  </section>
);
const Row = ({ label, sample }) => (
  <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px dashed var(--line)", fontSize: 13 }}>
    <span style={{ fontWeight: 600 }}>{label}</span>
    <span style={{ fontFamily: "var(--font-mono)", color: "var(--ink-muted)" }}>{sample}</span>
  </div>
);

Object.assign(window, { DesignSystemPage });
