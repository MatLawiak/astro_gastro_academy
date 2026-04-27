// Shared primitives: icons, placeholders, navigation, utilities
// Exported to window at the bottom

const { useState, useEffect, useRef, useMemo, useCallback } = React;

/* ---------------- Icons (original line-icon set) ---------------- */
const Icon = ({ name, size = 18, stroke = 1.6, style }) => {
  const sw = stroke;
  const common = {
    width: size, height: size, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round",
    style, "aria-hidden": true,
  };
  const paths = {
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    close: <><path d="M6 6l12 12" /><path d="M18 6l-12 12" /></>,
    chevronRight: <path d="M9 6l6 6-6 6" />,
    chevronLeft: <path d="M15 6l-6 6 6 6" />,
    chevronDown: <path d="M6 9l6 6 6-6" />,
    arrowRight: <><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></>,
    check: <path d="M5 12l4 4 10-10" />,
    play: <path d="M8 5v14l11-7z" fill="currentColor" stroke="none" />,
    playOutline: <path d="M8 5v14l11-7z" />,
    pause: <><rect x="7" y="5" width="3.5" height="14" /><rect x="13.5" y="5" width="3.5" height="14" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></>,
    bell: <><path d="M18 16v-5a6 6 0 10-12 0v5l-2 2h16z" /><path d="M10 21a2 2 0 004 0" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></>,
    book: <><path d="M4 4h10a4 4 0 014 4v12H8a4 4 0 01-4-4V4z" /><path d="M4 4v12a4 4 0 014-4h10" /></>,
    users: <><circle cx="9" cy="8" r="3.5" /><path d="M2 20c0-3 3-5 7-5s7 2 7 5" /><path d="M16 4a3.5 3.5 0 010 7" /><path d="M20 20c0-2.5-1.5-4-4-4.5" /></>,
    card: <><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18" /><path d="M7 15h4" /></>,
    chart: <><path d="M4 20V8" /><path d="M10 20V4" /><path d="M16 20v-8" /><path d="M22 20H2" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" /></>,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    dots: <><circle cx="5" cy="12" r="1.3" fill="currentColor" /><circle cx="12" cy="12" r="1.3" fill="currentColor" /><circle cx="19" cy="12" r="1.3" fill="currentColor" /></>,
    drag: <><circle cx="9" cy="6" r="1.3" fill="currentColor" /><circle cx="9" cy="12" r="1.3" fill="currentColor" /><circle cx="9" cy="18" r="1.3" fill="currentColor" /><circle cx="15" cy="6" r="1.3" fill="currentColor" /><circle cx="15" cy="12" r="1.3" fill="currentColor" /><circle cx="15" cy="18" r="1.3" fill="currentColor" /></>,
    pdf: <><path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z" /><path d="M14 3v6h6" /><path d="M8 15h8" /><path d="M8 18h5" /></>,
    film: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M7 5v14" /><path d="M17 5v14" /><path d="M3 10h4" /><path d="M3 14h4" /><path d="M17 10h4" /><path d="M17 14h4" /></>,
    note: <><path d="M4 4h12l4 4v12H4z" /><path d="M8 10h8" /><path d="M8 14h8" /><path d="M8 18h5" /></>,
    lock: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 118 0v3" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    star: <path d="M12 3l2.7 5.8 6.3.8-4.6 4.4 1.2 6.3L12 17.3 6.4 20.3l1.2-6.3L3 9.6l6.3-.8z" />,
    leaf: <><path d="M4 20c0-8 7-15 16-15-1 11-8 15-15 15z" /><path d="M4 20l9-9" /></>,
    moon: <path d="M20 14.5A8 8 0 1110 4a6.5 6.5 0 0010 10.5z" />,
    constellation: <><circle cx="4" cy="8" r="1.2" fill="currentColor" /><circle cx="10" cy="4" r="1.2" fill="currentColor" /><circle cx="14" cy="12" r="1.2" fill="currentColor" /><circle cx="20" cy="7" r="1.2" fill="currentColor" /><circle cx="19" cy="18" r="1.2" fill="currentColor" /><path d="M4 8l6-4 4 8 6-5M14 12l5 6" /></>,
    wand: <><path d="M5 19l10-10" /><path d="M15 5l4 4" /><path d="M17 3l1 2M21 7l-2 1M13 3l1 2" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></>,
    eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
    eyeOff: <><path d="M3 3l18 18" /><path d="M10.6 6.1A10 10 0 0112 6c6.5 0 10 7 10 7a17 17 0 01-3.3 4.1M6.6 6.6A17 17 0 002 12s3.5 7 10 7c1.4 0 2.7-.3 3.9-.7" /></>,
    download: <><path d="M12 4v12" /><path d="M7 11l5 5 5-5" /><path d="M5 20h14" /></>,
    external: <><path d="M14 4h6v6" /><path d="M20 4l-9 9" /><path d="M20 14v6H4V4h6" /></>,
    edit: <><path d="M4 20h4l10-10-4-4L4 16z" /><path d="M14 6l4 4" /></>,
    copy: <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V5a2 2 0 00-2-2H5a2 2 0 00-2 2v9a2 2 0 002 2h3" /></>,
    trash: <><path d="M4 7h16" /><path d="M10 11v6M14 11v6" /><path d="M6 7l1 13h10l1-13" /><path d="M9 7V4h6v3" /></>,
    upload: <><path d="M12 4v12" /><path d="M7 9l5-5 5 5" /><path d="M5 20h14" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".5" fill="currentColor" /></>,
    youtube: <><rect x="3" y="6" width="18" height="12" rx="3" /><path d="M10 9v6l5-3z" fill="currentColor" stroke="none" /></>,
    facebook: <><path d="M14 21v-7h3l1-4h-4V8a1 1 0 011-1h3V3h-3a5 5 0 00-5 5v2H7v4h3v7z" /></>,
    home: <><path d="M3 11l9-7 9 7v9a2 2 0 01-2 2h-4v-6H9v6H5a2 2 0 01-2-2z" /></>,
    checkCircle: <><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></>,
    circle: <circle cx="12" cy="12" r="7" />,
    blik: <><rect x="3" y="6" width="18" height="12" rx="2" /><text x="12" y="15" fontSize="7" fontWeight="700" textAnchor="middle" fill="currentColor" stroke="none" fontFamily="ui-monospace,monospace">BLIK</text></>,
    file: <><path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z" /><path d="M14 3v6h6" /></>,
    folder: <><path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></>,
  };
  return <svg {...common}>{paths[name] || null}</svg>;
};

/* --------------- Photo placeholder --------------- */
const Photo = ({ label, ratio = "16/9", src, className = "", style = {} }) => {
  if (src) {
    return (
      <div className={className} style={{ aspectRatio: ratio, overflow: "hidden", ...style }} aria-label={label}>
        <img src={src} alt={label} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
    );
  }
  return (
    <div className={`placeholder-photo ${className}`} style={{ aspectRatio: ratio, ...style }} aria-label={label}>
      <div className="lbl">{label}</div>
    </div>
  );
};

/* --------------- Round avatar placeholder --------------- */
const Avatar = ({ name, size = 40, tone }) => {
  const initials = name.split(" ").map(s => s[0]).slice(0,2).join("").toUpperCase();
  const bg = tone || "color-mix(in oklab, var(--sage) 40%, var(--bg-sand))";
  return (
    <div aria-hidden style={{
      width: size, height: size, borderRadius: "50%",
      background: bg, color: "var(--umber)",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      fontWeight: 600, fontSize: size * 0.38, fontFamily: "var(--font-body)",
      border: "1px solid var(--line)", flexShrink: 0,
    }}>{initials}</div>
  );
};

/* --------------- Constellation dot decoration --------------- */
const ConstellationDots = ({ style }) => (
  <svg width="160" height="60" viewBox="0 0 160 60" style={{ opacity: 0.35, ...style }} aria-hidden>
    <g fill="none" stroke="var(--accent)" strokeWidth="0.7" strokeLinecap="round">
      <line x1="10" y1="30" x2="50" y2="15" />
      <line x1="50" y1="15" x2="90" y2="35" />
      <line x1="90" y1="35" x2="130" y2="20" />
      <line x1="130" y1="20" x2="150" y2="45" />
    </g>
    {[[10,30],[50,15],[90,35],[130,20],[150,45]].map(([x,y],i) =>
      <circle key={i} cx={x} cy={y} r="2" fill="var(--accent)" />)}
  </svg>
);

/* --------------- Logo --------------- */
const Logo = ({ size = 44, compact = false }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
    <img
      src="https://astrogastro.eu/wp-content/uploads/2024/10/logo_navyblue-480x274.png"
      alt="Astrogastro"
      style={{ height: size, width: "auto", display: "block" }}
    />
    {!compact && (
      <div style={{ lineHeight: 1, fontFamily: "var(--font-body)", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--ink-muted)", fontWeight: 600 }}>
        .eu / kursy
      </div>
    )}
  </div>
);

/* --------------- Top nav (public site) --------------- */
const PublicNav = ({ onNav, current }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll); onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const link = (key, label) => (
    <a href="#" onClick={(e)=>{e.preventDefault(); onNav(key); setOpen(false);}}
       className={current===key ? "active" : ""}
       style={{
         color: "var(--ink)", fontSize: 13, fontWeight: 500, letterSpacing: "0.01em",
         padding: "6px 4px", borderBottom: current===key ? "1.5px solid var(--accent)" : "1.5px solid transparent",
         textDecoration: "none",
       }}>{label}</a>
  );
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: scrolled ? "color-mix(in oklab, var(--bg) 92%, transparent)" : "transparent",
      backdropFilter: scrolled ? "saturate(1.1) blur(10px)" : "none",
      borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      transition: "all .25s ease",
    }}>
      <div className="container" style={{ height: "var(--nav-h)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#" onClick={(e)=>{e.preventDefault(); onNav("landing");}} style={{ textDecoration: "none" }}><Logo /></a>
        <nav className="public-nav-links" style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {link("landing", "Start")}
          {link("catalog", "Kursy")}
          {link("design-system", "Design system")}
          {link("admin-dashboard", "Panel admina")}
          {link("student-dashboard", "Astroworld")}
        </nav>
        <div className="public-nav-cta" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button className="btn ghost sm" onClick={()=>onNav("student-dashboard")}>Zaloguj się</button>
          <button className="btn primary sm" onClick={()=>onNav("pricing")}>Wypróbuj</button>
        </div>
        <button className="public-nav-burger" aria-label="Menu" onClick={()=>setOpen(v=>!v)} style={{
          display: "none", width: 40, height: 40, alignItems: "center", justifyContent: "center",
          borderRadius: 8, border: "1px solid var(--line)",
        }}>
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
      {open && (
        <div style={{ background: "var(--bg-card)", borderTop: "1px solid var(--line)", padding: "12px 20px" }}>
          {[["landing","Start"],["catalog","Kursy"],["design-system","Design system"],["admin-dashboard","Panel admina"],["student-dashboard","Astroworld"]].map(([k,l])=>(
            <a key={k} href="#" onClick={(e)=>{e.preventDefault(); onNav(k); setOpen(false);}}
              style={{ display: "block", padding: "12px 0", fontSize: 16, color: "var(--ink)", borderBottom: "1px solid var(--line)" }}>{l}</a>
          ))}
          <div style={{ display:"flex", gap: 10, paddingTop: 14 }}>
            <button className="btn secondary full" onClick={()=>onNav("student-dashboard")}>Zaloguj się</button>
            <button className="btn primary full" onClick={()=>onNav("pricing")}>Wypróbuj</button>
          </div>
        </div>
      )}
    </header>
  );
};

/* --------------- Footer --------------- */
const Footer = ({ onNav }) => (
  <footer style={{ borderTop: "1px solid var(--line)", background: "var(--bg-sand)", marginTop: 80 }}>
    <div className="container" style={{ padding: "56px 28px 28px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40 }} className="footer-grid">
        <div>
          <Logo />
          <p className="muted" style={{ marginTop: 14, maxWidth: 300, fontSize: 14 }}>
            Kursy kulinarne online dla Gastronautów. Warsztaty z Kubą Linkiem — to samo, co na Wodnej w Poznaniu, tylko online.
          </p>
        </div>
        <div>
          <div className="tiny" style={{ marginBottom: 10 }}>Platforma</div>
          <div className="stack gap-2" style={{ fontSize: 14 }}>
            <a href="#" onClick={(e)=>{e.preventDefault(); onNav("catalog");}}>Katalog kursów</a>
            <a href="#" onClick={(e)=>{e.preventDefault(); onNav("pricing");}}>Cennik</a>
            <a href="#" onClick={(e)=>{e.preventDefault(); onNav("student-dashboard");}}>Zaloguj się</a>
          </div>
        </div>
        <div>
          <div className="tiny" style={{ marginBottom: 10 }}>Info</div>
          <div className="stack gap-2" style={{ fontSize: 14 }}>
            <a href="#">Regulamin</a>
            <a href="#">Polityka prywatności</a>
            <a href="#">Kontakt</a>
          </div>
        </div>
        <div>
          <div className="tiny" style={{ marginBottom: 10 }}>Dołącz</div>
          <div style={{ display: "flex", gap: 10 }}>
            <a href="#" aria-label="Instagram" style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid var(--line-strong)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--ink)" }}><Icon name="instagram" size={16} /></a>
            <a href="#" aria-label="YouTube" style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid var(--line-strong)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--ink)" }}><Icon name="youtube" size={16} /></a>
            <a href="#" aria-label="Facebook" style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid var(--line-strong)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--ink)" }}><Icon name="facebook" size={16} /></a>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--ink-muted)" }}>
        <div>© 2026 astrogastro.eu · Wszystkie prawa zastrzeżone.</div>
        <div>Made with care in Poland.</div>
      </div>
    </div>
  </footer>
);

/* --------------- Botanical sprig SVG --------------- */
const Sprig = ({ style, size = 110, color = "var(--sage-deep)" }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" style={{ position: "absolute", pointerEvents: "none", opacity: 0.45, color, ...style }} aria-hidden>
    <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
      <path d="M60 110 C 62 80, 68 50, 80 20" />
      <path d="M68 88 Q 80 82, 86 70" />
      <path d="M65 72 Q 78 66, 82 54" />
      <path d="M72 58 Q 86 54, 92 44" />
      <path d="M76 44 Q 88 40, 92 32" />
      <path d="M68 88 Q 56 86, 48 76" />
      <path d="M65 72 Q 52 70, 44 58" />
      <path d="M72 58 Q 60 54, 52 44" />
    </g>
    <g fill="currentColor" opacity="0.5">
      <ellipse cx="84" cy="68" rx="6" ry="3" transform="rotate(-30 84 68)" />
      <ellipse cx="82" cy="50" rx="6" ry="3" transform="rotate(-30 82 50)" />
      <ellipse cx="50" cy="74" rx="6" ry="3" transform="rotate(30 50 74)" />
      <ellipse cx="48" cy="56" rx="6" ry="3" transform="rotate(30 48 56)" />
      <ellipse cx="90" cy="34" rx="5" ry="2.5" transform="rotate(-25 90 34)" />
    </g>
  </svg>
);

/* --------------- Stat card --------------- */
const StatCard = ({ label, value, delta, deltaTone = "up" }) => (
  <div className="card soft" style={{ padding: 20, borderRadius: "var(--r-md)" }}>
    <div className="tiny" style={{ marginBottom: 8 }}>{label}</div>
    <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 500, color: "var(--ink)", lineHeight: 1 }}>{value}</div>
      {delta && (
        <div style={{ fontSize: 12, color: deltaTone === "up" ? "var(--sage-deep)" : "var(--terracotta-deep)", fontWeight: 600 }}>
          {deltaTone === "up" ? "▲" : "▼"} {delta}
        </div>
      )}
    </div>
  </div>
);

Object.assign(window, {
  Icon, Photo, Avatar, ConstellationDots, Logo, PublicNav, Footer, Sprig, StatCard,
});
