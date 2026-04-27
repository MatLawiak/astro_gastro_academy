// Landing page — Astrogastro rebrand (navy + mustard, Gastronauci, Kuba Link)
const LandingPage = ({ onNav, heroVariant = "editorial" }) => {
  return (
    <div>
      {heroVariant === "editorial" && <HeroEditorial onNav={onNav} />}
      {heroVariant === "asymmetric" && <HeroAsymmetric onNav={onNav} />}
      {heroVariant === "fullbleed" && <HeroFullBleed onNav={onNav} />}

      <LogoBar />
      <WhatYouLearn />
      <FeaturedCourses onNav={onNav} />
      <AboutKuba />
      <HowItWorks />
      <Pricing onNav={onNav} />
      <Testimonials />
      <Faq />
      <FinalCta onNav={onNav} />
    </div>
  );
};

const Greeting = () => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 14px 6px 10px", background: "var(--navy)", color: "var(--mustard)", borderRadius: 999, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700 }}>
    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--mustard)" }}/>
    Serwus, Gastronauto!
  </div>
);

/* HERO A · Editorial */
const HeroEditorial = ({ onNav }) => (
  <section style={{ paddingTop: 40, paddingBottom: 60, position: "relative", overflow: "hidden" }}>
    <div className="orbit" style={{ width: 900, height: 900, top: -500, right: -300 }}/>
    <div className="orbit" style={{ width: 1200, height: 1200, top: -700, right: -500, opacity: .5 }}/>
    <div className="container" style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 56, alignItems: "center", position: "relative" }} className="hero-grid">
      <div>
        <Greeting />
        <h1 style={{ fontSize: "var(--fs-hero)", marginTop: 28, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
          Gotuj jak <span style={{ color: "var(--mustard-deep)", fontStyle: "italic", fontFamily: "var(--font-display)" }}>Gastronauta</span>.
        </h1>
        <p style={{ fontSize: 19, lineHeight: 1.5, color: "var(--ink-2)", marginTop: 22, maxWidth: 520 }}>
          Kursy kulinarne online prowadzone przez <strong>Kubę Linkę</strong> — szefa, podróżnika.<br/>
          Poleć z nami na orbitę smaku i dołącz do społeczności świadomych Gastronautów!
        </p>
        <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
          <button className="btn primary lg" onClick={()=>onNav("pricing")}>Wystartuj · 39 zł / mc</button>
          <button className="btn ghost lg" style={{ gap: 10 }} onClick={()=>onNav("lesson")}>
            <Icon name="playOutline" /> Zobacz darmowy odcinek
          </button>
        </div>
        <div style={{ marginTop: 42, display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex" }}>
            {["Jan K","Tomek S","Marta W","Olga P"].map((n,i)=>(
              <div key={n} style={{ marginLeft: i===0?0:-10, borderRadius:"50%", border: "2px solid var(--bg)" }}>
                <Avatar name={n} size={36}/>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>2 400+ Gastronautów w kolektywie</div>
            <div className="muted" style={{ fontSize: 12 }}>★★★★★ · 4,9 na trustpilot</div>
          </div>
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <Photo
          src="https://astrogastro.eu/wp-content/uploads/2025/06/Astrogastro-Post-1-of-19-min-980x1225.jpg"
          label="Astrogastro — Kuba Linek"
          ratio="4/5"
          style={{ boxShadow: "var(--shadow-lg)", borderRadius: "var(--r-lg)" }}
        />
        <div className="card soft" style={{
          position: "absolute", left: -30, bottom: 30, padding: "14px 18px",
          display: "flex", alignItems: "center", gap: 12, boxShadow: "var(--shadow-lg)", maxWidth: 280, background: "var(--navy)", color: "var(--bg-card)", border: "none",
        }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--mustard)", display:"flex", alignItems:"center", justifyContent:"center", color: "var(--navy)" }}>
            <Icon name="play" size={16} />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Odcinek tygodnia</div>
            <div style={{ fontSize: 11, opacity: 0.7 }}>Ramen tonkotsu · 22 min</div>
          </div>
        </div>
        <div style={{
          position: "absolute", right: -16, top: 30, padding: "10px 18px",
          background: "var(--mustard)", color: "var(--navy)",
          borderRadius: 999, fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
          boxShadow: "var(--shadow)",
        }}>
          12 kursów · 240+ lekcji
        </div>
      </div>
    </div>
  </section>
);

const HeroAsymmetric = ({ onNav }) => (
  <section style={{ padding: "60px 0 40px", position: "relative", overflow: "hidden" }}>
    <div className="container" style={{ position: "relative", textAlign: "center", paddingTop: 40 }}>
      <Greeting />
      <h1 style={{ fontSize: "clamp(44px, 6.5vw, 96px)", lineHeight: 1.0, letterSpacing: "-0.02em", fontWeight: 700, maxWidth: 1100, margin: "28px auto 0" }}>
        Gotuj jak <span style={{ fontStyle: "italic", color: "var(--mustard-deep)" }}>Gastronauta.</span>
      </h1>
      <p style={{ fontSize: 19, color: "var(--ink-2)", marginTop: 28, maxWidth: 580, marginLeft: "auto", marginRight: "auto" }}>
        Kursy Kuby Linka. Fermentacja, azjatyckie podstawy, grill, makarony. Bez ściemy, z konkretem.
      </p>
      <div style={{ display: "flex", gap: 14, marginTop: 32, justifyContent: "center", flexWrap: "wrap" }}>
        <button className="btn primary lg" onClick={()=>onNav("pricing")}>Wystartuj · 39 zł / mc</button>
        <button className="btn ghost lg" onClick={()=>onNav("lesson")}><Icon name="playOutline" /> Darmowy odcinek</button>
      </div>
      <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "1.2fr 0.8fr 1fr", gap: 18 }}>
        <Photo label="ramen · steam · overhead" ratio="3/2" style={{ borderRadius: "var(--r-lg)", alignSelf: "end" }} />
        <Photo label="włoska · pomidory" ratio="3/4" style={{ borderRadius: "var(--r-lg)", transform: "translateY(-40px)" }} />
        <Photo label="grill · bbq · płomień" ratio="3/2" style={{ borderRadius: "var(--r-lg)", alignSelf: "start" }} />
      </div>
    </div>
  </section>
);

const HeroFullBleed = ({ onNav }) => (
  <section style={{ position: "relative", minHeight: 640, background: "var(--navy)", color: "var(--bg-card)", overflow: "hidden" }}>
    <div className="orbit" style={{ width: 800, height: 800, top: -300, left: -200, borderColor: "rgba(226,177,60,0.25)" }}/>
    <div className="orbit" style={{ width: 500, height: 500, bottom: -200, right: -100, borderColor: "rgba(226,177,60,0.35)" }}/>
    <div className="container" style={{ position: "relative", padding: "100px 28px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }} className="hero-grid">
      <div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 14px", background: "var(--mustard)", color: "var(--navy)", borderRadius: 999, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700 }}>
          Serwus, Gastronauto
        </div>
        <h1 style={{ fontSize: "clamp(40px, 5.5vw, 76px)", lineHeight: 1.05, color: "var(--bg-card)", marginTop: 24, fontWeight: 700, letterSpacing: "-0.02em" }}>
          Gotuj jak <span style={{ color: "var(--mustard)", fontStyle: "italic" }}>Gastronauta.</span>
        </h1>
        <p style={{ fontSize: 19, color: "color-mix(in oklab, var(--bg-card) 80%, transparent)", marginTop: 24, maxWidth: 520 }}>
          Kursy kulinarne online od Kuby Linka. Fermentacja, azjatyckie podstawy, grill, makarony — z ludźmi, którzy naprawdę gotują.
        </p>
        <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
          <button className="btn primary lg" onClick={()=>onNav("pricing")}>Wystartuj · 39 zł / mc</button>
          <button className="btn lg" style={{ background: "transparent", color: "var(--mustard)", border: "1.5px solid var(--mustard)" }} onClick={()=>onNav("lesson")}>
            <Icon name="playOutline" /> Darmowy odcinek
          </button>
        </div>
      </div>
      <div><Photo label="grill · płomień · moody" ratio="1/1" style={{ borderRadius: "var(--r-lg)", boxShadow: "0 30px 60px rgba(0,0,0,0.5)" }} /></div>
    </div>
  </section>
);

const LogoBar = () => (
  <section style={{ padding: "28px 0", borderTop: "1.5px solid var(--line)", borderBottom: "1.5px solid var(--line)", background: "var(--bg-sand)" }}>
    <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 28 }}>
      <div className="tiny" style={{ whiteSpace: "nowrap" }}>Gotują z nami</div>
      {["Magazyn Kuchnia", "Usta Magazyn", "Gastronauci", "Kuchnia+", "Radio Nowy Świat", "Vogue Polska"].map(b => (
        <div key={b} style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "var(--ink-muted)", letterSpacing: "-0.01em" }}>{b}</div>
      ))}
    </div>
  </section>
);

const WhatYouLearn = () => {
  const items = [
    { icon: "wand", title: "Fermentacja",        desc: "Kiszenie, zakwasy, miso, kombucha. Słoik po słoiku." },
    { icon: "constellation", title: "Kuchnia azjatycka", desc: "Ramen, kimchi, curry — bez skrótów i bez „coś na bazie sojówki”." },
    { icon: "leaf", title: "Grill & BBQ",        desc: "Low & slow, Maillard, dymy, marynaty. Rozumiesz ogień." },
    { icon: "book", title: "Makarony od zera",   desc: "Tagliatelle, cacio e pepe, carbonara. Rzymski stół u Ciebie." },
  ];
  return (
    <section style={{ padding: "100px 0" }}>
      <div className="container">
        <SectionHead eyebrow="Program" title={<>Czego tu si臋 <span style={{color:"var(--mustard-deep)", fontStyle:"italic"}}>nauczysz</span></>} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }} className="pp-grid">
          {items.map((it) => (
            <div key={it.title} className="card" style={{ padding: 26, background: "var(--bg-card)" }}>
              <div style={{
                width: 48, height: 48, borderRadius: 10,
                background: "var(--navy)", color: "var(--mustard)",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                marginBottom: 18,
              }}>
                <Icon name={it.icon} size={22} />
              </div>
              <h3 style={{ fontSize: 22 }}>{it.title}</h3>
              <p className="muted" style={{ fontSize: 14, marginTop: 8 }}>{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const COURSES = [
  { id: "fermentacja", title: "Fermentacja od podstaw", duration: "8h · 24 lekcje", level: "Podstawowy", label: "słoiki · fermentacja · overhead" },
  { id: "ramen", title: "Ramen & azjatyckie zupy", duration: "12h · 36 lekcji", level: "Średniozaawansowany", label: "ramen · tonkotsu · steam" },
  { id: "grill", title: "Grill low & slow", duration: "10h · 30 lekcji", level: "Każdy poziom", label: "brisket · dym · nocą" },
];
const FeaturedCourses = ({ onNav }) => (
  <section style={{ padding: "80px 0", background: "var(--navy)", color: "var(--bg-card)", position: "relative" }}>
    <div className="container">
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 48, gap: 20, flexWrap: "wrap" }}>
        <div style={{ maxWidth: 640 }}>
          <div className="tiny" style={{ color: "var(--mustard)", marginBottom: 14 }}>Featured</div>
          <h2 style={{ color: "var(--bg-card)", fontSize: "clamp(32px, 3.6vw, 48px)" }}>Trzy kursy, od których <span style={{ color: "var(--mustard)", fontStyle: "italic" }}>ludzie zaczynają</span></h2>
        </div>
        <button className="btn gold-outline" onClick={()=>onNav("catalog")}>Cały katalog</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="courses-grid">
        {COURSES.map(c => (
          <article key={c.id} onClick={()=>onNav("course")}
            style={{ background: "var(--bg-card)", color: "var(--ink)", borderRadius: "var(--r-md)", overflow: "hidden", cursor: "pointer", transition: "transform .2s" }}
            onMouseEnter={e=>e.currentTarget.style.transform="translateY(-4px)"}
            onMouseLeave={e=>e.currentTarget.style.transform=""}>
            <Photo label={c.label} ratio="16/10" />
            <div style={{ padding: 22 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <span className="badge level">{c.level}</span>
                <span className="badge soft-accent">{c.duration}</span>
              </div>
              <h3 style={{ fontSize: 22, marginBottom: 14 }}>{c.title}</h3>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ color: "var(--mustard-deep)", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Zobacz kurs →</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const AboutKuba = () => (
  <section style={{ padding: "120px 0" }}>
    <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 56, alignItems: "center" }} className="hero-grid">
      <Photo
        src="https://astrogastro.eu/wp-content/uploads/2025/06/Astrogastro-Post-1-of-19-min-980x1225.jpg"
        label="Kuba Linek — Astrogastro"
        ratio="4/5"
        style={{ borderRadius: "var(--r-lg)", boxShadow: "var(--shadow-lg)" }}
      />
      <div>
        <div className="tiny" style={{ color: "var(--mustard-deep)", marginBottom: 14 }}>Twój kapitan</div>
        <h2>Kuba Link. Gastronauta, szef, kolekcjoner ostrych noży.</h2>
        <p style={{ fontSize: 17, marginTop: 18, maxWidth: 560 }}>
          Przez dekadę gotował w restauracjach w Tokio, Kopenhadze i Warszawie. Założyciel kolektywu <strong>Gastronauci</strong>,
          autor książki „Niebieska kuchnia”, prowadzący cykl „Serwus!” na YouTube (380 000 subów).
        </p>
        <p style={{ fontSize: 17, marginTop: 8, maxWidth: 560 }}>
          Nie uczy „trików” ani „life hacków”. Uczy <em>rozumienia smaku</em> i pracy w kuchni tak, żeby gotowanie w weekend nie było karą.
        </p>
        <div style={{ display: "flex", gap: 28, marginTop: 32, flexWrap: "wrap" }}>
          {[["10+","lat w restauracjach"],["2 400+","Gastronautów"],["12","kursów online"]].map(([v,l])=>(
            <div key={l}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 700, color: "var(--navy)", lineHeight: 1 }}>{v}</div>
              <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const HowItWorks = () => {
  const steps = [
    { n: "01", title: "Zarejestruj się", desc: "Bez karty. Tylko email — i masz dostęp do bezpłatnych odcinków." },
    { n: "02", title: "Wybierz plan", desc: "Subskrypcja miesięczna 39 zł lub roczna 249 zł — w każdym pełen dostęp do wszystkich kursów." },
    { n: "03", title: "Oglądaj, gotuj, wracaj", desc: "Lekcje w swoim tempie. PDF-y, listy zakupów, notatki." },
    { n: "04", title: "Gadaj z kolektywem", desc: "Dyskord Gastronautów — pytasz, pokazujesz efekty, dostajesz feedback." },
  ];
  return (
    <section style={{ padding: "120px 0", background: "var(--bg-sand)", borderTop: "1.5px solid var(--line)", borderBottom: "1.5px solid var(--line)" }}>
      <div className="container">
        <SectionHead eyebrow="Jak to działa" title={<>Cztery kroki do <span style={{color:"var(--mustard-deep)", fontStyle:"italic"}}>własnej kuchni</span></>} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }} className="how-grid">
          {steps.map((s) => (
            <div key={s.n}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--mustard-deep)", fontWeight: 700, marginBottom: 12 }}>{s.n} /04</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, marginBottom: 8, letterSpacing: "-0.01em" }}>{s.title}</div>
              <div className="muted" style={{ fontSize: 14 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = ({ onNav, compact = false }) => {
  const plans = [
    { id: "monthly", label: "Miesięcznie", price: "39 zł", sub: "subskrypcja miesięczna · anulujesz kiedy chcesz", perks: ["Pełny dostęp do 12 kursów","Dyskord Gastronautów","Materiały PDF i listy zakupów","Certyfikat ukończenia"], ribbon: null },
    { id: "yearly",  label: "Rocznie",     price: "249 zł", sub: "oszczędzasz 47% — płatność raz w roku", badge: "Najlepszy wybór", perks: ["Wszystko z planu miesięcznego","Rok pełnego dostępu","Bonus: e-book Niebieska kuchnia","Q&A 1:1 z Kubą (30 min)"], ribbon: "accent" },
  ];
  return (
    <section style={{ padding: compact ? "40px 0" : "120px 0" }}>
      <div className="container">
        {!compact && <SectionHead eyebrow="Cennik" title={<>Wybierz plan, <span style={{color:"var(--mustard-deep)", fontStyle:"italic"}}>i jedziemy</span></>} subtitle="Pełny dostęp do wszystkich kursów, materiałów i Dyskorda Gastronautów w każdym planie." />}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, maxWidth: 860, margin: "0 auto" }} className="pricing-grid">
          {plans.map(p => (
            <div key={p.id} className="card" style={{
              padding: 28, position: "relative",
              background: p.ribbon === "accent" ? "var(--navy)" : "var(--bg-card)",
              color: p.ribbon === "accent" ? "var(--bg-card)" : "var(--ink)",
              borderColor: p.ribbon === "accent" ? "var(--navy)" : "var(--line)",
              boxShadow: p.ribbon === "accent" ? "var(--shadow-lg)" : "none",
              transform: p.ribbon === "accent" ? "translateY(-8px)" : "none",
            }}>
              {p.badge && (
                <div style={{ position: "absolute", top: -14, left: 24, background: "var(--mustard)", color: "var(--navy)", padding: "6px 14px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", borderRadius: 999, textTransform: "uppercase" }}>{p.badge}</div>
              )}
              <div className="tiny" style={{ color: p.ribbon === "accent" ? "var(--mustard)" : "var(--ink-muted)" }}>{p.label}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 56, fontWeight: 700, lineHeight: 1, marginTop: 10, letterSpacing: "-0.03em" }}>{p.price}</div>
              <div style={{ fontSize: 14, marginTop: 6, opacity: 0.75 }}>{p.sub}</div>
              <hr style={{ margin: "22px 0", border: "none", borderTop: "1px solid " + (p.ribbon === "accent" ? "rgba(255,255,255,0.15)" : "var(--line)") }} />
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {p.perks.map(perk => (
                  <li key={perk} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14 }}>
                    <Icon name="check" size={16} style={{ color: p.ribbon === "accent" ? "var(--mustard)" : "var(--olive)", marginTop: 3, flexShrink: 0 }} />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
              <button className={`btn ${p.ribbon === "accent" ? "primary" : "secondary"} full`} style={{ marginTop: 24 }} onClick={()=>onNav("checkout")}>
                Biorę {p.label}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const items = [
    { name: "Jan K.", city: "Warszawa", quote: "Pierwszy kurs online, z którego faktycznie coś zostało w głowie. Fermentację mam w krwi, literalnie.", tone: "mustard" },
    { name: "Marta W.", city: "Gdańsk", quote: "Kuba mówi po ludzku, pokazuje błędy i nie udaje. To nie YouTube, to konkretna szkoła.", tone: "tomato" },
    { name: "Tomek S.", city: "Kraków", quote: "Ramen tonkotsu w niedzielę u mnie w domu. Dawniej nierealne. Teraz sobotni rytuał.", tone: "olive" },
  ];
  return (
    <section style={{ padding: "120px 0" }}>
      <div className="container">
        <SectionHead eyebrow="Opinie" title={<>Co m贸wi膮 <span style={{color:"var(--mustard-deep)", fontStyle:"italic"}}>Gastronauci</span></>} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="testimonials-grid">
          {items.map((t, i) => (
            <figure key={i} className="card" style={{ padding: 28, background: "var(--bg-card)", margin: 0 }}>
              <div style={{ color: "var(--mustard)", fontSize: 14, marginBottom: 14 }}>★★★★★</div>
              <blockquote style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 19, lineHeight: 1.35, fontWeight: 500 }}>
                „{t.quote}”
              </blockquote>
              <figcaption style={{ marginTop: 22, display: "flex", alignItems: "center", gap: 12 }}>
                <Avatar name={t.name} size={40}/>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                  <div className="muted" style={{ fontSize: 12 }}>{t.city}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

const Faq = () => {
  const items = [
    ["Jak długo mam dostęp?", "Subskrypcja miesięczna odnawia się automatycznie co miesiąc — anulujesz kiedy chcesz. Plan roczny daje 365 dni jednorazowej płatności. W każdej chwili możesz zmienić plan z panelu Astroworld."],
    ["Czy mogę oglądać na telefonie?", "Tak. Platforma działa w przeglądarce mobilnej, bez instalowania aplikacji. Lekcje zoptymalizowane pod mały ekran."],
    ["Jak działa płatność BLIK?", "Klikasz plan → przekierowanie do Hotpay → wybierasz BLIK i wklejasz kod z banku. Dostęp masz od razu."],
    ["Co jeśli zrezygnuję?", "Plan nie odnawia się automatycznie. Jeżeli nie przedłużysz — dostęp wygasa w ostatnim dniu. Bez haczyków."],
    ["Czy dostanę fakturę VAT?", "Tak — faktura pojawia się w „Historii płatności” od razu po zaksięgowaniu. PDF do pobrania."],
    ["Czy są certyfikaty?", "Po ukończeniu kursu dostajesz imienny certyfikat PDF. Możesz go wrzucić na LinkedIna czy do CV."],
  ];
  return (
    <section style={{ padding: "100px 0", background: "var(--bg-sand)", borderTop: "1.5px solid var(--line)", borderBottom: "1.5px solid var(--line)" }}>
      <div className="container" style={{ maxWidth: 820 }}>
        <SectionHead eyebrow="FAQ" title={<>Masz <span style={{color:"var(--mustard-deep)", fontStyle:"italic"}}>pytania</span>?</>} subtitle="Jeśli czegoś brakuje — napisz na kontakt@astrogastro.eu." />
        <div className="card" style={{ padding: "8px 28px", background: "var(--bg-card)" }}>
          {items.map(([q, a], i) => (
            <details key={i} className="acc"><summary>{q}</summary><div>{a}</div></details>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCta = ({ onNav }) => (
  <section style={{ padding: "120px 0" }}>
    <div className="container">
      <div className="surface-dark" style={{ borderRadius: "var(--r-lg)", padding: "80px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="orbit" style={{ width: 600, height: 600, top: -300, right: -200 }}/>
        <div className="tiny" style={{ color: "var(--mustard)", marginBottom: 16 }}>Ostatnia rzecz</div>
        <h2 style={{ color: "var(--bg-card)", fontSize: "clamp(40px, 5.5vw, 72px)", fontWeight: 700 }}>
          Serwus. <span style={{ color: "var(--mustard)", fontStyle: "italic" }}>Jedziemy?</span>
        </h2>
        <p style={{ color: "color-mix(in oklab, var(--bg-card) 75%, transparent)", maxWidth: 520, margin: "16px auto 32px", fontSize: 17 }}>
          Pierwszy odcinek czeka. Wybierz plan i gotuj po swojemu — razem z kolektywem.
        </p>
        <button className="btn primary lg" onClick={()=>onNav("pricing")}>Wybieram plan →</button>
      </div>
    </div>
  </section>
);

const SectionHead = ({ eyebrow, title, subtitle }) => (
  <div style={{ marginBottom: 56, maxWidth: 780 }}>
    <div className="tiny" style={{ color: "var(--mustard-deep)", marginBottom: 14 }}>{eyebrow}</div>
    <h2>{title}</h2>
    {subtitle && <p className="muted" style={{ marginTop: 14, fontSize: 17 }}>{subtitle}</p>}
  </div>
);

Object.assign(window, { LandingPage, Pricing });
