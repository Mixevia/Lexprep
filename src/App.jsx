import { useState, useEffect, useRef } from "react";

// ─── FONTS & LORDICONS ────────────────────────────────────────────────────────
const GlobalStyles = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Nunito:wght@300;400;500;600;700;800;900&display=swap";
    document.head.appendChild(link);
    const script = document.createElement("script");
    script.src = "https://cdn.lordicon.com/lordicon.js";
    document.head.appendChild(script);
    const style = document.createElement("style");
    style.textContent = `
      * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(180,140,30,.3); border-radius: 3px; }
      @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
      @keyframes scaleIn { from { opacity:0; transform:scale(0.85); } to { opacity:1; transform:scale(1); } }
      @keyframes shimmer { 0%,100%{opacity:1} 50%{opacity:.4} }
      @keyframes tickSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      @keyframes craneFloat { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-5px)} }
      lord-icon { display:inline-block; }
    `;
    document.head.appendChild(style);
  }, []);
  return null;
};

// ─── THEME ────────────────────────────────────────────────────────────────────
const T = {
  light: {
    bg: "#f5f1e8", card: "#ffffff", cardAlt: "#ede8db", cardHov: "#faf7f0",
    border: "#ddd0b4", borderHov: "#c9a838",
    navy: "#1d3457", navyDim: "#2c4f7c", navyLight: "#e8eef8",
    gold: "#b8891c", goldBright: "#d4a428", goldLight: "#fdf4dc", goldDeep: "#8a6210",
    text: "#181828", sub: "#52527a", muted: "#9898b8",
    success: "#186840", successBg: "#e2f5ea", successBorder: "#7ecfa0",
    error: "#c01820", errorBg: "#fce8e8", errorBorder: "#f0a0a0",
    warn: "#7a5000", warnBg: "#fef2d0", warnBorder: "#e8c878",
    navBg: "#1a2f50", navActive: "#d4a428", navText: "rgba(255,255,255,0.5)",
    divider: "#e5dccc", inputBg: "#faf8f3",
    gradHero: "linear-gradient(140deg, #1a2f50 0%, #2c4f7c 60%, #1d3457 100%)",
  },
  dark: {
    bg: "#080e1c", card: "#101d35", cardAlt: "#172440", cardHov: "#1a2a48",
    border: "#1e3050", borderHov: "#d4a428",
    navy: "#5090d0", navyDim: "#3a6aaa", navyLight: "#0e1a2e",
    gold: "#d4a428", goldBright: "#e8c050", goldLight: "#1a1200", goldDeep: "#f0d060",
    text: "#ece6dc", sub: "#8aa0bc", muted: "#425870",
    success: "#38c068", successBg: "#061e10", successBorder: "#1a6030",
    error: "#e05050", errorBg: "#1a0808", errorBorder: "#602020",
    warn: "#d4a428", warnBg: "#130e00", warnBorder: "#6a5000",
    navBg: "#060c18", navActive: "#d4a428", navText: "rgba(255,255,255,0.4)",
    divider: "#162030", inputBg: "#0e1a2e",
    gradHero: "linear-gradient(140deg, #080e1c 0%, #0e1c38 60%, #080e1c 100%)",
  },
};

const EXAM_DATE = new Date("2026-04-18T08:00:00");

const STUDY_PLAN = [
  { day:1,  topic:"Logic Patterns & Sequences",           section:"aptitude",  desc:"Number series, letter patterns, and figure sequences" },
  { day:2,  topic:"Syllogisms & Deductive Reasoning",     section:"aptitude",  desc:"Categorical syllogisms, Venn diagrams, validity testing" },
  { day:3,  topic:"Logical Puzzles & Critical Thinking",  section:"aptitude",  desc:"Truth tables, conditional statements, paradoxes" },
  { day:4,  topic:"Reading Comprehension — Main Ideas",   section:"reading",   desc:"Identifying central arguments and supporting details" },
  { day:5,  topic:"Vocabulary in Context",                section:"reading",   desc:"Word meaning, connotation, and contextual clues" },
  { day:6,  topic:"Author's Tone, Purpose & Bias",        section:"reading",   desc:"Rhetoric, inferential reading, critical evaluation" },
  { day:7,  topic:"Review: Logic & Reading",              section:"review",    desc:"Mixed practice and weakness identification" },
  { day:8,  topic:"Uganda's Constitution & Legal History",section:"gk",        desc:"1995 Constitution, amendments, historical milestones" },
  { day:9,  topic:"East African & African Affairs",       section:"gk",        desc:"EAC, AU, major treaties, current events" },
  { day:10, topic:"Legal Institutions & Concepts",        section:"gk",        desc:"Court hierarchy, rule of law, legal personnel" },
  { day:11, topic:"Ratios, Percentages & Fractions",      section:"numerical", desc:"Proportional reasoning, percentage change" },
  { day:12, topic:"Data Interpretation & Graphs",         section:"numerical", desc:"Bar charts, pie charts, tables, trend analysis" },
  { day:13, topic:"Basic Statistics & Probability",       section:"numerical", desc:"Mean, median, mode, range, simple probability" },
  { day:14, topic:"Review: GK & Numerical Skills",        section:"review",    desc:"Mixed practice, targeted weak areas" },
  { day:15, topic:"Essay Structure & Argumentation",      section:"writing",   desc:"Introduction, thesis, body paragraphs, conclusion" },
  { day:16, topic:"Legal Essay Writing Practice",         section:"writing",   desc:"Legal reasoning, precedent citation, persuasion" },
  { day:17, topic:"Critical Analysis & Evidence Use",     section:"writing",   desc:"Evidence evaluation, counter-arguments, depth" },
  { day:18, topic:"Mock Exam — Sections 1–3",             section:"mock",      desc:"Full simulation: Aptitude, Reading, General Knowledge" },
  { day:19, topic:"Mock Exam — Sections 4–5 + Review",   section:"mock",      desc:"Numerical Skills, Analytical Writing, full debrief" },
  { day:20, topic:"Targeted Revision",                    section:"review",    desc:"Focus on individual weak areas from mock exams" },
  { day:21, topic:"Final Prep & Exam Strategy",           section:"review",    desc:"Time management, exam psychology, final tips" },
];

const SM = {
  aptitude:  { color:"#3a5eaa", bg:"#eef2fc", label:"Aptitude",   emoji:"🧠" },
  reading:   { color:"#2a8060", bg:"#eaf5f0", label:"Reading",    emoji:"📖" },
  gk:        { color:"#8a5e10", bg:"#fdf4e0", label:"GK",         emoji:"🌍" },
  numerical: { color:"#7a3a9a", bg:"#f5eeff", label:"Numerical",  emoji:"🔢" },
  writing:   { color:"#aa3a40", bg:"#fdeee8", label:"Writing",    emoji:"✍️" },
  review:    { color:"#3a7a8a", bg:"#eaf5f7", label:"Review",     emoji:"🔄" },
  mock:      { color:"#1d3457", bg:"#e8eef8", label:"Mock Exam",  emoji:"📝" },
};

const TOPICS = [
  { id:"aptitude",  label:"Aptitude & Logic",      sub:"Patterns, syllogisms, puzzles" },
  { id:"reading",   label:"Reading Comprehension", sub:"Main idea, inference, vocabulary" },
  { id:"gk",        label:"General Knowledge",     sub:"Uganda, Africa, law, current affairs" },
  { id:"numerical", label:"Numerical Skills",      sub:"Ratios, data interpretation, stats" },
  { id:"writing",   label:"Analytical Writing",    sub:"Essay prompts with AI evaluation" },
];

const PAPERS = [
  { year:2025, note:"Strong constitutional law & current affairs focus",   diff:"Hard",   color:"#c01820" },
  { year:2024, note:"Data interpretation section expanded significantly",  diff:"Hard",   color:"#c01820" },
  { year:2023, note:"Analytical writing rubric introduced this year",      diff:"Medium", color:"#8a6210" },
  { year:2022, note:"Classic balanced format — excellent baseline paper",  diff:"Medium", color:"#8a6210" },
  { year:2021, note:"Post-COVID adjustments to timing & format",           diff:"Easy",   color:"#186840" },
  { year:2020, note:"Pre-restructure format — great for historical context",diff:"Easy",  color:"#186840" },
];

const SQS = {
  2025:["Which Article of the 1995 Uganda Constitution grants the High Court unlimited original jurisdiction in civil and criminal matters?","The EAC was revived in the year 2000 — name the three original signatory states and the treaty that established it.","A farmer earns UGX 1.2 million monthly and saves 35% of income. What are total savings after 8 months?"],
  2024:["If the legal aid sector receives 22% of a UGX 5 billion national budget, what is the sector's exact allocation?","What common law principle allows courts to depart from an earlier binding precedent decided per incuriam?","Identify the logical fallacy: 'Every lawyer I have met was dishonest, therefore all lawyers are dishonest.'"],
  2023:["Write an analytical essay (600 words) arguing for or against: 'Access to justice in Uganda is a privilege of the wealthy, not a right.'","The Universal Declaration of Human Rights was adopted in which year, and what was the voting outcome?","What is the primary statutory function of the Uganda Law Reform Commission and the Act that created it?"],
  2022:["Define the doctrine of judicial precedent (stare decisis) and explain how it operates in Uganda's court hierarchy.","Train A travels at 80 km/h and Train B at 120 km/h. They depart simultaneously from cities 500 km apart. When do they meet?","What does the Latin maxim 'Audi alteram partem' mean, and in which branch of law is it most frequently applied?"],
  2021:["Uganda ratified the African Charter on Human and Peoples' Rights in which year, and what monitoring body does it establish?","Identify the main argument in the passage and state whether the conclusion logically follows from the given premises.","40% of a class of 60 students passed. 25% of those who passed were female. How many female students passed?"],
  2020:["What is the significance of Magna Carta (1215) in the development of constitutional governance and rule of law?","Complete the analogy: Judge is to Courtroom as Lecturer is to ___. Justify your answer in two sentences.","A contractor charges UGX 450,000 per day. A project takes 3 weeks and 4 days. What is the total cost?"],
};

const QUOTES = [
  { text:"Justice is the constant and perpetual will to allot every man his due.", author:"Justinian I" },
  { text:"Wherever law ends, tyranny begins.", author:"John Locke" },
  { text:"Law is reason, free from passion.", author:"Aristotle" },
  { text:"The first duty of society is justice.", author:"Alexander Hamilton" },
  { text:"To no man will we sell, to no man deny or delay right or justice.", author:"Magna Carta, 1215" },
  { text:"Knowledge of laws is not enough; we must also apply them.", author:"Cicero" },
  { text:"The good of the people is the greatest law.", author:"Marcus Tullius Cicero" },
];

// ─── LOGO SVG (Crane on Shield — Logo 4) ─────────────────────────────────────
function CraneLogo({ size = 52 }) {
  const id = useRef(`l${Math.random().toString(36).slice(2,7)}`).current;
  return (
    <svg width={size} height={size * 1.22} viewBox="0 0 100 122" xmlns="http://www.w3.org/2000/svg" style={{ overflow:"visible" }}>
      <defs>
        <linearGradient id={`sa${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1d3457"/>
          <stop offset="100%" stopColor="#2c4f7c"/>
        </linearGradient>
        <linearGradient id={`gb${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0d860"/>
          <stop offset="100%" stopColor="#b8891c"/>
        </linearGradient>
        <filter id={`sf${id}`}>
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#00000045"/>
        </filter>
      </defs>
      {/* Shield body */}
      <path d="M10 30 L50 20 L90 30 L90 76 Q90 104 50 118 Q10 104 10 76Z"
        fill={`url(#sa${id})`} filter={`url(#sf${id})`}/>
      {/* Gold outer border */}
      <path d="M10 30 L50 20 L90 30 L90 76 Q90 104 50 118 Q10 104 10 76Z"
        fill="none" stroke={`url(#gb${id})`} strokeWidth="2"/>
      {/* Gold inner border */}
      <path d="M16 34 L50 25 L84 34 L84 75 Q84 100 50 112 Q16 100 16 75Z"
        fill="none" stroke="#c9a030" strokeWidth="1" opacity="0.5"/>

      {/* Corner filigree */}
      <path d="M18 42 Q14 38 17 33 Q20 38 18 42Z" fill="#c9a030" opacity="0.6"/>
      <path d="M82 42 Q86 38 83 33 Q80 38 82 42Z" fill="#c9a030" opacity="0.6"/>

      {/* Open book */}
      <path d="M21 82 Q50 75 50 75 L50 94 Q50 94 21 100Z" fill="#f0e0b0"/>
      <path d="M79 82 Q50 75 50 75 L50 94 Q50 94 79 100Z" fill="#e0d0a0"/>
      <line x1="50" y1="75" x2="50" y2="94" stroke="#c9a030" strokeWidth="1.8"/>
      {/* Book page lines */}
      <line x1="28" y1="82" x2="46" y2="79" stroke="#1d3457" strokeWidth="0.7" opacity="0.4"/>
      <line x1="28" y1="86" x2="46" y2="83" stroke="#1d3457" strokeWidth="0.7" opacity="0.4"/>
      <line x1="28" y1="90" x2="46" y2="87" stroke="#1d3457" strokeWidth="0.7" opacity="0.3"/>
      <line x1="54" y1="79" x2="72" y2="82" stroke="#1d3457" strokeWidth="0.7" opacity="0.4"/>
      <line x1="54" y1="83" x2="72" y2="86" stroke="#1d3457" strokeWidth="0.7" opacity="0.4"/>
      <line x1="54" y1="87" x2="72" y2="90" stroke="#1d3457" strokeWidth="0.7" opacity="0.3"/>

      {/* Gavel */}
      <rect x="33" y="60" width="16" height="6" rx="3" fill={`url(#gb${id})`}
        transform="rotate(-35 41 63)"/>
      <line x1="47" y1="65" x2="60" y2="77" stroke="#c9a030" strokeWidth="2.2" strokeLinecap="round"/>

      {/* LEX·PREP text */}
      <text x="50" y="54" textAnchor="middle" fill="#e8c848" fontSize="6.5"
        fontWeight="800" fontFamily="Georgia,serif" letterSpacing="2">LEX·PREP</text>

      {/* Laurel branches */}
      <path d="M18 86 Q11 80 12 70 Q16 76 18 74 Q14 67 18 61"
        fill="none" stroke="#c9a030" strokeWidth="1.4" strokeLinecap="round"/>
      <ellipse cx="15" cy="70" rx="2.2" ry="1.4" fill="#c9a030" opacity="0.55" transform="rotate(-22 15 70)"/>
      <ellipse cx="14.5" cy="77" rx="2.2" ry="1.4" fill="#c9a030" opacity="0.55" transform="rotate(-12 14.5 77)"/>
      <path d="M82 86 Q89 80 88 70 Q84 76 82 74 Q86 67 82 61"
        fill="none" stroke="#c9a030" strokeWidth="1.4" strokeLinecap="round"/>
      <ellipse cx="85" cy="70" rx="2.2" ry="1.4" fill="#c9a030" opacity="0.55" transform="rotate(22 85 70)"/>
      <ellipse cx="85.5" cy="77" rx="2.2" ry="1.4" fill="#c9a030" opacity="0.55" transform="rotate(12 85.5 77)"/>

      {/* ── CRANE ── */}
      {/* Body */}
      <ellipse cx="50" cy="21" rx="12" ry="7" fill="#f8f4ee"/>
      <ellipse cx="50" cy="21" rx="12" ry="7" fill="none" stroke="#1d3457" strokeWidth="0.9"/>
      {/* Left wing */}
      <path d="M39 22 Q29 18 24 25 Q32 21 38 27Z" fill="#eeece6" stroke="#1d3457" strokeWidth="0.7"/>
      {/* Right wing */}
      <path d="M61 22 Q71 18 76 25 Q68 21 62 27Z" fill="#eeece6" stroke="#1d3457" strokeWidth="0.7"/>
      {/* Red wing accent */}
      <path d="M58 20 Q63 18 65 21.5 Q60 19 58 22Z" fill="#cc2200" opacity="0.9"/>
      {/* Tail feathers */}
      <path d="M61 24 Q70 24 73 19 Q66 24 63 28Z" fill="#d8d4cc" stroke="#1d3457" strokeWidth="0.5"/>
      {/* Neck */}
      <path d="M44 15 Q43 8 39 3" stroke="#f8f4ee" strokeWidth="5" strokeLinecap="round"/>
      <path d="M44 15 Q43 8 39 3" stroke="#1d3457" strokeWidth="1" strokeLinecap="round" fill="none"/>
      {/* Head */}
      <ellipse cx="38" cy="2.5" rx="4.5" ry="3.6" fill="#f8f4ee" stroke="#1d3457" strokeWidth="0.9"/>
      <circle cx="36" cy="2.2" r="1" fill="#1d3457"/>
      {/* Red crown patch */}
      <ellipse cx="39.5" cy="0.8" rx="3.2" ry="1.8" fill="#cc2200"/>
      {/* Gold crest feathers */}
      <path d="M39.5 -1.5 Q38 -6 39 -9 Q40.5 -5.5 39.5 -1.5" fill="#e8c848"/>
      <path d="M41.5 -2 Q44 -7 47 -8 Q44 -4 41.5 -2" fill="#d4a828" opacity="0.9"/>
      <path d="M37.5 -2 Q35 -7 32 -7.5 Q35 -4 37.5 -2" fill="#d4a828" opacity="0.9"/>
      <path d="M43 -2.5 Q46 -6 49.5 -6.5 Q46 -3.5 43 -2.5" fill="#c9a020" opacity="0.7"/>
      {/* Beak */}
      <path d="M34.5 2.5 L27.5 1.5 L34.5 3.8Z" fill="#c09020" stroke="#9a7010" strokeWidth="0.3"/>
      {/* Scales of justice from beak */}
      <line x1="27.5" y1="1.5" x2="27.5" y2="8.5" stroke="#e8c848" strokeWidth="1"/>
      <line x1="23" y1="8.5" x2="32" y2="8.5" stroke="#e8c848" strokeWidth="1"/>
      <path d="M22 8.5 Q25 12.5 28 8.5" stroke="#e8c848" strokeWidth="1" fill="none"/>
      <path d="M28 10 Q31.5 14.5 35 10" stroke="#e8c848" strokeWidth="1" fill="none"/>
    </svg>
  );
}

// ─── COUNTDOWN HOOK ───────────────────────────────────────────────────────────
function useCountdown() {
  const calc = () => {
    const d = EXAM_DATE - new Date();
    if (d <= 0) return { days:0, hours:0, minutes:0, seconds:0 };
    return {
      days: Math.floor(d / 86400000),
      hours: Math.floor((d % 86400000) / 3600000),
      minutes: Math.floor((d % 3600000) / 60000),
      seconds: Math.floor((d % 60000) / 1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => { const id = setInterval(() => setT(calc()), 1000); return () => clearInterval(id); }, []);
  return t;
}

// ─── STORAGE ──────────────────────────────────────────────────────────────────
const store = {
  get: (k, def) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch { return def; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

// ─── PRIMITIVES ───────────────────────────────────────────────────────────────
function Card({ children, c, style = {}, onClick, lift = true }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: c.card,
        border: `1.5px solid ${hov && onClick && lift ? c.borderHov : c.border}`,
        borderRadius: 20, padding: 20, transition: "all 0.22s ease",
        transform: hov && onClick && lift ? "translateY(-3px)" : "none",
        boxShadow: hov && onClick && lift ? "0 14px 40px rgba(0,0,0,0.13)" : "0 2px 12px rgba(0,0,0,0.06)",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Badge({ label, color }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
      background: color + "22", color, display: "inline-block", lineHeight: 1.5,
    }}>
      {label}
    </span>
  );
}

function Btn({ children, onClick, style = {}, disabled, variant = "primary", c }) {
  const [hov, setHov] = useState(false);
  const base = {
    width: "100%", padding: "15px 24px", border: "none", borderRadius: 15,
    fontWeight: 700, fontSize: 15, cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: "'Nunito', sans-serif", transition: "all 0.2s ease",
    opacity: disabled ? 0.5 : 1,
  };
  const variants = {
    primary: { background: hov && !disabled ? `linear-gradient(135deg,${c.navyDim},${c.navy})` : `linear-gradient(135deg,${c.navy},${c.navyDim})`, color: "#fff", boxShadow: hov && !disabled ? "0 8px 24px rgba(29,52,87,0.4)" : "none" },
    gold: { background: hov && !disabled ? `linear-gradient(135deg,${c.goldDeep || c.gold},${c.goldBright})` : `linear-gradient(135deg,${c.navy},${c.goldBright})`, color: "#fff", boxShadow: hov && !disabled ? "0 8px 24px rgba(180,130,30,0.4)" : "none" },
    ghost: { background: hov && !disabled ? c.cardAlt : "transparent", border: `1.5px solid ${c.border}`, color: c.sub },
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ ...base, ...variants[variant], ...style }}
    >
      {children}
    </button>
  );
}

// ─── SPLASH ───────────────────────────────────────────────────────────────────
function Splash({ onDone }) {
  const [phase, setPhase] = useState(0);
  const [prog, setProg] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 100);
    const t2 = setTimeout(() => setPhase(2), 700);
    const iv = setInterval(() => setProg(p => {
      if (p >= 100) { clearInterval(iv); setTimeout(onDone, 450); return 100; }
      return p + 1.4;
    }), 50);
    return () => { clearTimeout(t1); clearTimeout(t2); clearInterval(iv); };
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 999, overflow: "hidden",
      background: "linear-gradient(160deg, #0f1f38 0%, #1a2f50 50%, #0d1a30 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28,
    }}>
      {/* Decorative rings */}
      {[500, 360, 240].map((r, i) => (
        <div key={i} style={{
          position: "absolute", width: r, height: r, borderRadius: "50%",
          border: `1px solid rgba(212,164,40,${0.05 + i * 0.04})`,
          top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        }}/>
      ))}
      {/* Shimmer dots */}
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: "absolute", width: 3, height: 3, borderRadius: "50%",
          background: `rgba(212,164,40,0.4)`,
          top: `${15 + Math.sin(i * 0.8) * 35 + 30}%`,
          left: `${10 + (i * 12)}%`,
          animation: `shimmer 2s ease ${i * 0.25}s infinite`,
        }}/>
      ))}

      <div style={{
        opacity: phase >= 1 ? 1 : 0,
        transform: phase >= 1 ? "scale(1) translateY(0)" : "scale(0.6) translateY(30px)",
        transition: "all 1s cubic-bezier(.34,1.56,.64,1)",
        animation: phase >= 2 ? "craneFloat 3s ease-in-out infinite" : "none",
      }}>
        <CraneLogo size={120}/>
      </div>

      <div style={{ opacity: phase >= 2 ? 1 : 0, transition: "opacity 0.7s ease", textAlign: "center" }}>
        <div style={{
          fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 800,
          color: "#d4a428", letterSpacing: 3, lineHeight: 1,
        }}>
          LexPrep
        </div>
        <div style={{
          fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 8,
          letterSpacing: 5, textTransform: "uppercase", fontFamily: "'Nunito', sans-serif",
        }}>
          Uganda · Law Pre-Entry Exams
        </div>
      </div>

      <div style={{ width: 240, opacity: phase >= 2 ? 1 : 0, transition: "opacity 0.5s ease 0.4s" }}>
        <div style={{ height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 4, overflow: "hidden" }}>
          <div style={{
            width: `${prog}%`, height: "100%", borderRadius: 4,
            background: "linear-gradient(90deg, #b8891c, #f0d060, #b8891c)",
            transition: "width 0.07s linear",
          }}/>
        </div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 10, textAlign: "center", fontFamily: "'Nunito', sans-serif" }}>
          Preparing your study environment…
        </div>
      </div>
    </div>
  );
}

// ─── TOP BAR ──────────────────────────────────────────────────────────────────
function TopBar({ dark, setDark, c }) {
  return (
    <div style={{
      height: 60, background: c.navBg, borderBottom: "1px solid rgba(255,255,255,0.06)",
      display: "flex", alignItems: "center", padding: "0 18px", gap: 12, flexShrink: 0,
    }}>
      <CraneLogo size={40}/>
      <div style={{ flex: 1, lineHeight: 1 }}>
        <div style={{
          fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 800,
          color: "#d4a428", letterSpacing: 1.5,
        }}>
          LexPrep
        </div>
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: 3, textTransform: "uppercase", marginTop: 1 }}>
          Law Pre-Entry Prep
        </div>
      </div>
      <button
        onClick={() => { const nd = !dark; setDark(nd); store.set("lp_dark", nd); }}
        style={{
          width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)", cursor: "pointer", fontSize: 16,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.2s",
        }}
      >
        {dark ? "☀️" : "🌙"}
      </button>
    </div>
  );
}

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id:"home",     label:"Home",     licon:"https://cdn.lordicon.com/wmwqvixz.json",  emoji:"🏛️" },
  { id:"plan",     label:"Plan",     licon:"https://cdn.lordicon.com/rcndjyhd.json",  emoji:"📅" },
  { id:"practice", label:"Practice", licon:"https://cdn.lordicon.com/imamsnbq.json", emoji:"🎯" },
  { id:"papers",   label:"Papers",   licon:"https://cdn.lordicon.com/stipfqkk.json",  emoji:"📄" },
  { id:"extra",    label:"Extra",    licon:"https://cdn.lordicon.com/nobvwgyv.json",  emoji:"🏆" },
];

function BottomNav({ tab, setTab, c }) {
  return (
    <div style={{
      height: 64, background: c.navBg, borderTop: "1px solid rgba(255,255,255,0.06)",
      display: "flex", alignItems: "stretch", flexShrink: 0,
    }}>
      {NAV_ITEMS.map(item => {
        const active = tab === item.id;
        return (
          <button key={item.id} onClick={() => setTab(item.id)} style={{
            flex: 1, background: "transparent", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", gap: 4, position: "relative", padding: "8px 4px 6px",
            transition: "all 0.2s",
          }}>
            {active && <div style={{
              position: "absolute", top: 0, left: "18%", right: "18%",
              height: 2.5, background: c.navActive, borderRadius: "0 0 4px 4px",
            }}/>}
            <lord-icon
              src={item.licon}
              trigger={active ? "loop" : "hover"}
              colors={`primary:${active ? c.navActive : "rgba(255,255,255,0.4)"},secondary:${c.navActive}`}
              style={{ width: 24, height: 24 }}
            />
            <span style={{ fontSize: 10, fontWeight: active ? 800 : 500, fontFamily: "'Nunito',sans-serif",
              color: active ? c.navActive : "rgba(255,255,255,0.4)", letterSpacing: 0.3 }}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── HOME TAB ─────────────────────────────────────────────────────────────────
function HomeTab({ c, dark, progress, setTab }) {
  const tm = useCountdown();
  const quote = QUOTES[Math.floor(Date.now() / 86400000) % QUOTES.length];
  const done = Object.values(progress).filter(Boolean).length;
  const pct = Math.round((done / 21) * 100);
  const next = STUDY_PLAN.find(d => !progress[d.day]) || STUDY_PLAN[20];
  const meta = SM[next.section];

  const TimeBox = ({ val, lbl }) => (
    <div style={{ textAlign: "center" }}>
      <div style={{
        background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(212,164,40,0.45)",
        borderRadius: 14, width: 62, height: 62, display: "flex",
        alignItems: "center", justifyContent: "center",
        fontSize: 26, fontWeight: 800, color: "#e8c848", fontFamily: "'Playfair Display', serif",
        boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
      }}>
        {String(val).padStart(2, "0")}
      </div>
      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", marginTop: 5,
        textTransform: "uppercase", letterSpacing: 1.8, fontFamily: "'Nunito',sans-serif" }}>
        {lbl}
      </div>
    </div>
  );

  return (
    <div style={{ overflowY: "auto", height: "100%" }}>
      <div style={{ padding: "22px 18px 16px", maxWidth: 560, margin: "0 auto" }}>
        {/* Greeting */}
        <p style={{ fontSize: 11, color: c.muted, letterSpacing: 3, textTransform: "uppercase",
          marginBottom: 5, fontFamily: "'Nunito',sans-serif" }}>
          Good day, Counselor-in-Training
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700,
          color: c.text, marginBottom: 22, lineHeight: 1.2 }}>
          Ready to study today?
        </h1>

        {/* Countdown hero */}
        <div style={{
          background: c.gradHero, borderRadius: 24, padding: "22px 18px", marginBottom: 16,
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)", position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180,
            borderRadius: "50%", border: "1px solid rgba(212,164,40,0.1)" }}/>
          <div style={{ position: "absolute", bottom: -20, left: -20, width: 120, height: 120,
            borderRadius: "50%", border: "1px solid rgba(212,164,40,0.08)" }}/>
          <div style={{ fontSize: 10, color: "rgba(200,175,90,0.65)", letterSpacing: 3,
            textTransform: "uppercase", marginBottom: 16, fontFamily: "'Nunito',sans-serif" }}>
            ⚖️  Exam Countdown — April 18, 2026
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 18 }}>
            <TimeBox val={tm.days} lbl="Days"/>
            <div style={{ display: "flex", alignItems: "center", color: "#c9a030", fontSize: 22,
              paddingBottom: 22, fontWeight: 300 }}>:</div>
            <TimeBox val={tm.hours} lbl="Hours"/>
            <div style={{ display: "flex", alignItems: "center", color: "#c9a030", fontSize: 22,
              paddingBottom: 22, fontWeight: 300 }}>:</div>
            <TimeBox val={tm.minutes} lbl="Mins"/>
            <div style={{ display: "flex", alignItems: "center", color: "#c9a030", fontSize: 22,
              paddingBottom: 22, fontWeight: 300 }}>:</div>
            <TimeBox val={tm.seconds} lbl="Secs"/>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ flex: 1, height: 5, background: "rgba(255,255,255,0.1)",
              borderRadius: 4, overflow: "hidden" }}>
              <div style={{
                width: `${pct}%`, height: "100%",
                background: "linear-gradient(90deg, #b8891c, #f0d060)",
                borderRadius: 4, transition: "width 0.6s ease",
              }}/>
            </div>
            <span style={{ fontSize: 11, color: "rgba(240,208,80,0.85)", fontWeight: 800,
              flexShrink: 0, fontFamily: "'Nunito',sans-serif" }}>
              {pct}% done
            </span>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          <Card c={c}>
            <div style={{ fontSize: 10, color: c.muted, textTransform: "uppercase",
              letterSpacing: 2, marginBottom: 8, fontFamily: "'Nunito',sans-serif" }}>Progress</div>
            <div style={{ fontSize: 34, fontWeight: 800, color: c.navy,
              fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>
              {done}
              <span style={{ fontSize: 16, color: c.muted, fontWeight: 400 }}>/21</span>
            </div>
            <div style={{ fontSize: 12, color: c.sub, marginTop: 4, fontFamily: "'Nunito',sans-serif" }}>
              days completed
            </div>
          </Card>
          <Card c={c}>
            <div style={{ fontSize: 10, color: c.muted, textTransform: "uppercase",
              letterSpacing: 2, marginBottom: 8, fontFamily: "'Nunito',sans-serif" }}>Status</div>
            <div style={{ fontSize: 34, fontWeight: 800, color: c.gold,
              fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>
              {tm.days}
            </div>
            <div style={{ fontSize: 12, marginTop: 4, fontWeight: 700, fontFamily: "'Nunito',sans-serif",
              color: tm.days <= 3 ? c.error : tm.days <= 7 ? c.warn : c.success }}>
              {tm.days <= 3 ? "🔴 Final push!" : tm.days <= 7 ? "🟡 Almost there" : "🟢 On track"}
            </div>
          </Card>
        </div>

        {/* Next session */}
        <Card c={c} style={{ marginBottom: 16, borderLeft: `4px solid ${meta.color}` }}>
          <div style={{ fontSize: 10, color: c.muted, letterSpacing: 3, textTransform: "uppercase",
            marginBottom: 10, fontFamily: "'Nunito',sans-serif" }}>
            Next Study Session
          </div>
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ fontSize: 32, lineHeight: 1, flexShrink: 0 }}>{meta.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, color: c.text, fontSize: 15,
                fontFamily: "'Nunito', sans-serif" }}>
                Day {next.day}: {next.topic}
              </div>
              <div style={{ fontSize: 13, color: c.sub, marginTop: 4, lineHeight: 1.6,
                fontFamily: "'Nunito',sans-serif" }}>
                {next.desc}
              </div>
              <div style={{ marginTop: 10 }}>
                <Badge label={`${meta.emoji} ${meta.label}`} color={meta.color}/>
              </div>
            </div>
          </div>
        </Card>

        {/* Daily wisdom */}
        <Card c={c} style={{ marginBottom: 16, borderTop: `3px solid ${c.gold}`, padding: "16px 20px" }}>
          <div style={{ fontSize: 10, color: c.gold, letterSpacing: 3, textTransform: "uppercase",
            marginBottom: 12, fontWeight: 800, fontFamily: "'Nunito',sans-serif" }}>
            ✦  Daily Wisdom
          </div>
          <blockquote style={{ margin: 0, fontFamily: "'Playfair Display', serif",
            fontStyle: "italic", fontSize: 15, color: c.text, lineHeight: 1.85 }}>
            "{quote.text}"
          </blockquote>
          <div style={{ marginTop: 10, fontSize: 12, color: c.muted, fontFamily: "'Nunito',sans-serif" }}>
            — {quote.author}
          </div>
        </Card>

        {/* Quick access */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 10, color: c.muted, fontWeight: 800, letterSpacing: 2.5,
            textTransform: "uppercase", marginBottom: 12, fontFamily: "'Nunito',sans-serif" }}>
            Quick Access
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {[
              { label: "Study Plan", icon: "📅", tab: "plan",     col: c.navy },
              { label: "Practice",   icon: "🎯", tab: "practice", col: "#2a8060" },
              { label: "Papers",     icon: "📄", tab: "papers",   col: "#aa3a40" },
            ].map(x => (
              <Card key={x.tab} c={c} onClick={() => setTab(x.tab)}
                style={{ textAlign: "center", padding: "16px 8px", borderTop: `3px solid ${x.col}` }}>
                <div style={{ fontSize: 24 }}>{x.icon}</div>
                <div style={{ fontSize: 12, color: c.sub, marginTop: 6, fontWeight: 700,
                  fontFamily: "'Nunito',sans-serif" }}>
                  {x.label}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── STUDY PLAN TAB ───────────────────────────────────────────────────────────
function StudyPlanTab({ c, progress, setProgress }) {
  const done = Object.values(progress).filter(Boolean).length;
  const pct = Math.round((done / 21) * 100);

  return (
    <div style={{ overflowY: "auto", height: "100%" }}>
      <div style={{ padding: "22px 18px", maxWidth: 560, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700,
          color: c.text, marginBottom: 4 }}>21-Day Study Plan</h2>
        <p style={{ color: c.sub, fontSize: 13, marginBottom: 18, fontFamily: "'Nunito',sans-serif" }}>
          Your structured path to exam success
        </p>

        {/* Overall progress */}
        <Card c={c} style={{ marginBottom: 22, padding: "16px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: c.text, fontFamily: "'Nunito',sans-serif" }}>
              {done}/21 days completed
            </span>
            <span style={{ fontSize: 16, fontWeight: 900, color: c.gold, fontFamily: "'Playfair Display',serif" }}>
              {pct}%
            </span>
          </div>
          <div style={{ height: 8, background: c.cardAlt, borderRadius: 4, overflow: "hidden" }}>
            <div style={{
              width: `${pct}%`, height: "100%",
              background: `linear-gradient(90deg, ${c.navy}, ${c.goldBright})`,
              borderRadius: 4, transition: "width 0.6s ease",
            }}/>
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
            {Object.entries(SM).map(([k, v]) => {
              const cnt = STUDY_PLAN.filter(d => d.section === k && progress[d.day]).length;
              const tot = STUDY_PLAN.filter(d => d.section === k).length;
              if (!tot) return null;
              return (
                <span key={k} style={{ fontSize: 10, color: v.color, background: v.color + "18",
                  padding: "2px 9px", borderRadius: 20, fontWeight: 700, fontFamily: "'Nunito',sans-serif" }}>
                  {v.emoji} {cnt}/{tot}
                </span>
              );
            })}
          </div>
        </Card>

        {/* Weeks */}
        {[1, 2, 3].map(w => (
          <div key={w} style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3.5, textTransform: "uppercase",
              color: c.gold, marginBottom: 12, fontFamily: "'Nunito',sans-serif" }}>
              Week {w}  ·  {["Foundation", "Knowledge Building", "Synthesis & Mock"][w - 1]}
            </div>
            {STUDY_PLAN.filter(d => d.day >= (w - 1) * 7 + 1 && d.day <= w * 7).map(day => {
              const m = SM[day.section];
              const isDone = !!progress[day.day];
              return (
                <div key={day.day} style={{
                  display: "flex", gap: 14, alignItems: "flex-start",
                  background: c.card, borderRadius: 16, padding: "13px 16px", marginBottom: 9,
                  border: `1.5px solid ${isDone ? m.color + "60" : c.border}`,
                  borderLeft: `4px solid ${isDone ? m.color : c.border}`,
                  opacity: isDone ? 0.68 : 1, transition: "all 0.22s ease",
                }}>
                  <button
                    onClick={() => {
                      const np = { ...progress, [day.day]: !progress[day.day] };
                      setProgress(np);
                      store.set("lp_progress", np);
                    }}
                    style={{
                      width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                      border: `2px solid ${isDone ? m.color : c.muted}`,
                      background: isDone ? m.color : "transparent",
                      cursor: "pointer", color: "white", fontSize: 15,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.2s", marginTop: 1,
                    }}
                  >
                    {isDone ? "✓" : ""}
                  </button>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 11, color: c.muted, fontWeight: 700,
                        fontFamily: "'Nunito',sans-serif" }}>Day {day.day}</span>
                      <Badge label={`${m.emoji} ${m.label}`} color={m.color}/>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: 14, color: c.text, marginTop: 4,
                      textDecoration: isDone ? "line-through" : "none",
                      fontFamily: "'Nunito', sans-serif" }}>
                      {day.topic}
                    </div>
                    <div style={{ fontSize: 12, color: c.sub, marginTop: 3, lineHeight: 1.6,
                      fontFamily: "'Nunito',sans-serif" }}>
                      {day.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PRACTICE TAB ─────────────────────────────────────────────────────────────
function PracticeTab({ c }) {
  const [topic, setTopic] = useState(null);
  const [q, setQ] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sel, setSel] = useState(null);
  const [sub, setSub] = useState(false);
  const [score, setScore] = useState({ ok: 0, total: 0 });
  const [streak, setStreak] = useState(0);

  async function gen(t) {
    setLoading(true); setQ(null); setSel(null); setSub(false);
    const tm = TOPICS.find(x => x.id === t);
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 1000,
          messages: [{ role: "user", content: `Generate ONE challenging multiple-choice question for the Makerere University LLB pre-entry exam on the topic: "${tm.label}" (${tm.sub}).

Return ONLY valid JSON — no markdown, no explanation, no backticks:
{"question":"full question text","options":["A. ...","B. ...","C. ...","D. ..."],"answer":0,"explanation":"Why the correct answer is right, with an exam tip."}

"answer" is the 0-based index of the correct option.` }] }),
      });
      const d = await r.json();
      const text = d.content.map(b => b.text || "").join("");
      setQ(JSON.parse(text.replace(/```json|```/g, "").trim()));
    } catch { setQ({ error: true }); }
    setLoading(false);
  }

  const topM = topic ? SM[topic] : {};

  if (!topic) return (
    <div style={{ overflowY: "auto", height: "100%" }}>
      <div style={{ padding: "22px 18px", maxWidth: 560, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700,
          color: c.text, marginBottom: 4 }}>AI Practice</h2>
        <p style={{ color: c.sub, fontSize: 13, marginBottom: 18, fontFamily: "'Nunito',sans-serif" }}>
          Fresh AI-generated questions every session
        </p>
        {TOPICS.map(t => {
          const m = SM[t.id];
          return (
            <Card key={t.id} c={c} style={{ marginBottom: 12, borderLeft: `4px solid ${m.color}` }}
              onClick={() => { setTopic(t.id); gen(t.id); }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ fontSize: 30, lineHeight: 1 }}>{m.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, color: c.text, fontSize: 15,
                    fontFamily: "'Nunito',sans-serif" }}>{t.label}</div>
                  <div style={{ fontSize: 12, color: c.sub, marginTop: 3,
                    fontFamily: "'Nunito',sans-serif" }}>{t.sub}</div>
                </div>
                <div style={{ fontSize: 22, color: c.muted }}>›</div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );

  return (
    <div style={{ overflowY: "auto", height: "100%" }}>
      <div style={{ padding: "22px 18px", maxWidth: 560, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <button onClick={() => { setTopic(null); setQ(null); setScore({ ok: 0, total: 0 }); setStreak(0); }}
            style={{ background: c.cardAlt, border: `1.5px solid ${c.border}`, borderRadius: 12,
              padding: "8px 16px", cursor: "pointer", color: c.sub, fontSize: 13,
              fontFamily: "'Nunito',sans-serif", fontWeight: 600 }}>
            ← Back
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: c.text, fontWeight: 700 }}>
              {TOPICS.find(t => t.id === topic)?.label}
            </div>
            <div style={{ fontSize: 12, color: c.muted, marginTop: 2, fontFamily: "'Nunito',sans-serif" }}>
              Score: <b style={{ color: c.success }}>{score.ok}</b>/{score.total}
              {streak >= 3 && <span style={{ marginLeft: 8, color: c.gold }}>🔥 {streak}-streak!</span>}
            </div>
          </div>
          <button onClick={() => gen(topic)}
            style={{ background: `linear-gradient(135deg,${c.navy},${c.navyDim})`, border: "none",
              borderRadius: 12, padding: "8px 16px", cursor: "pointer", color: "white",
              fontSize: 13, fontWeight: 700, fontFamily: "'Nunito',sans-serif" }}>
            Skip →
          </button>
        </div>

        {loading && (
          <Card c={c} style={{ textAlign: "center", padding: "56px 20px" }}>
            <div style={{ fontSize: 40, marginBottom: 14, animation: "craneFloat 1.8s ease-in-out infinite" }}>⚖️</div>
            <div style={{ color: c.sub, fontSize: 14, fontFamily: "'Nunito',sans-serif" }}>Generating your question…</div>
            <div style={{ width: 60, height: 3, background: `linear-gradient(90deg,${c.navy},${c.gold})`,
              borderRadius: 2, margin: "14px auto 0", animation: "shimmer 1.4s ease infinite" }}/>
          </Card>
        )}

        {!loading && q && !q.error && (
          <>
            <Card c={c} style={{ marginBottom: 14 }}>
              <Badge label={`${topM.emoji} ${topM.label}`} color={topM.color}/>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: c.text,
                lineHeight: 1.8, margin: "14px 0 0" }}>
                {q.question}
              </p>
            </Card>

            <div style={{ marginBottom: 14 }}>
              {q.options.map((opt, i) => {
                let bg = c.card, border = c.border, col = c.text, fw = 400;
                if (sel === i && !sub) { bg = c.goldLight; border = c.goldBright; fw = 700; }
                if (sub && i === q.answer) { bg = c.successBg; border = c.successBorder; col = c.success; fw = 700; }
                if (sub && sel === i && i !== q.answer) { bg = c.errorBg; border = c.errorBorder; col = c.error; fw = 700; }
                return (
                  <div key={i} onClick={() => !sub && setSel(i)} style={{
                    background: bg, border: `2px solid ${border}`, borderRadius: 14,
                    padding: "13px 18px", marginBottom: 9,
                    cursor: sub ? "default" : "pointer", color: col,
                    fontSize: 14, fontWeight: fw, transition: "all 0.2s",
                    lineHeight: 1.55, fontFamily: "'Nunito',sans-serif",
                  }}>
                    {opt}
                  </div>
                );
              })}
            </div>

            {sub && (
              <Card c={c} style={{ marginBottom: 14,
                borderLeft: `4px solid ${sel === q.answer ? c.success : c.error}` }}>
                <div style={{ fontWeight: 800, marginBottom: 8, fontSize: 15,
                  color: sel === q.answer ? c.success : c.error, fontFamily: "'Nunito',sans-serif" }}>
                  {sel === q.answer ? "✓  Correct!" : "✗  Not quite"}
                </div>
                <div style={{ fontSize: 13, color: c.sub, lineHeight: 1.75,
                  fontFamily: "'Nunito',sans-serif" }}>
                  {q.explanation}
                </div>
              </Card>
            )}

            {!sub ? (
              <Btn c={c} disabled={sel === null} onClick={() => {
                if (sel === null) return;
                setSub(true);
                if (sel === q.answer) { setScore(s => ({ ok: s.ok + 1, total: s.total + 1 })); setStreak(s => s + 1); }
                else { setScore(s => ({ ...s, total: s.total + 1 })); setStreak(0); }
              }}>Submit Answer</Btn>
            ) : (
              <Btn c={c} variant="gold" onClick={() => gen(topic)}>Next Question →</Btn>
            )}
          </>
        )}

        {!loading && q?.error && (
          <Card c={c} style={{ textAlign: "center", padding: 40, borderColor: c.error }}>
            <div style={{ fontSize: 14, color: c.error, marginBottom: 16, fontFamily: "'Nunito',sans-serif" }}>
              Failed to generate. Check your connection.
            </div>
            <Btn c={c} onClick={() => gen(topic)} style={{ width: "auto", padding: "10px 28px" }}>Retry</Btn>
          </Card>
        )}
      </div>
    </div>
  );
}

// ─── PAST PAPERS TAB ──────────────────────────────────────────────────────────
function PapersTab({ c }) {
  const [open, setOpen] = useState(null);

  return (
    <div style={{ overflowY: "auto", height: "100%" }}>
      <div style={{ padding: "22px 18px", maxWidth: 560, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700,
          color: c.text, marginBottom: 4 }}>Past Papers</h2>
        <p style={{ color: c.sub, fontSize: 13, marginBottom: 16, fontFamily: "'Nunito',sans-serif" }}>
          MUK LLB Pre-Entry — 2020 to 2025
        </p>

        <Card c={c} style={{ marginBottom: 18, borderLeft: `4px solid ${c.gold}`,
          background: c.goldLight }}>
          <div style={{ fontSize: 13, color: c.warn || c.gold, lineHeight: 1.7,
            fontFamily: "'Nunito',sans-serif" }}>
            <strong>📚 Exam Strategy:</strong> Begin with 2024–2023 to master the current format, then work backwards for patterns. Always attempt under timed conditions: Aptitude (30 min) · Reading (25 min) · GK (20 min) · Numerical (25 min) · Writing (40 min).
          </div>
        </Card>

        {PAPERS.map(p => (
          <Card key={p.year} c={c} style={{ marginBottom: 12, padding: 0, overflow: "hidden" }} lift={false}>
            <div onClick={() => setOpen(open === p.year ? null : p.year)}
              style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", cursor: "pointer" }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14, flexShrink: 0,
                background: `linear-gradient(135deg, ${c.navy}, ${c.navyDim})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Playfair Display', serif", fontSize: 13, fontWeight: 800, color: "#d4a428",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}>
                {p.year}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, color: c.text, fontSize: 14,
                  fontFamily: "'Nunito',sans-serif" }}>
                  MUK LLB Pre-Entry {p.year}
                </div>
                <div style={{ fontSize: 12, color: c.sub, marginTop: 3,
                  fontFamily: "'Nunito',sans-serif" }}>
                  {p.note}
                </div>
                <div style={{ marginTop: 6 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, padding: "2px 9px",
                    borderRadius: 20, color: p.color, background: p.color + "18",
                    fontFamily: "'Nunito',sans-serif" }}>
                    {p.diff}
                  </span>
                </div>
              </div>
              <div style={{ color: c.muted, fontSize: 22, transition: "transform 0.25s",
                transform: open === p.year ? "rotate(90deg)" : "none" }}>›</div>
            </div>

            {open === p.year && (
              <div style={{ borderTop: `1px solid ${c.divider}`, padding: "16px 20px",
                background: c.cardAlt, animation: "fadeUp 0.25s ease" }}>
                <div style={{ fontSize: 10, color: c.muted, letterSpacing: 2.5, textTransform: "uppercase",
                  marginBottom: 12, fontWeight: 800, fontFamily: "'Nunito',sans-serif" }}>
                  Sample Questions
                </div>
                {(SQS[p.year] || []).map((q, i, arr) => (
                  <div key={i} style={{
                    fontSize: 13, color: c.sub, padding: "11px 0", lineHeight: 1.7,
                    borderBottom: i < arr.length - 1 ? `1px solid ${c.divider}` : "none",
                    fontFamily: "'Nunito',sans-serif",
                  }}>
                    <span style={{ color: c.gold, fontWeight: 800, marginRight: 6 }}>Q{i + 1}.</span>
                    {q}
                  </div>
                ))}
                <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                  <button style={{
                    flex: 1, padding: "12px 0", borderRadius: 12, border: "none",
                    background: `linear-gradient(135deg, ${c.navy}, ${c.navyDim})`,
                    color: "white", fontWeight: 700, fontSize: 13, cursor: "pointer",
                    fontFamily: "'Nunito',sans-serif",
                  }}>
                    📥 Download Paper
                  </button>
                  <button style={{
                    padding: "12px 18px", borderRadius: 12,
                    border: `1.5px solid ${c.border}`, background: "transparent",
                    color: c.sub, fontSize: 13, cursor: "pointer", fontFamily: "'Nunito',sans-serif",
                  }}>
                    Answers
                  </button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── EXTRA / CHALLENGE TAB ───────────────────────────────────────────────────
function ExtraTab({ c }) {
  const [topic, setTopic] = useState(null);
  const [diff, setDiff] = useState("medium");
  const [qs, setQs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ans, setAns] = useState({});
  const [sub, setSub] = useState(false);

  async function genBatch() {
    setLoading(true); setQs([]); setAns({}); setSub(false);
    const tm = TOPICS.find(t => t.id === topic);
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 1000,
          messages: [{ role: "user", content: `Generate exactly 5 ${diff}-difficulty multiple-choice questions for the MUK LLB pre-entry exam on "${tm.label}" (${tm.sub}).

Return ONLY a valid JSON array — no markdown, no backticks, nothing else:
[{"question":"...","options":["A. ...","B. ...","C. ...","D. ..."],"answer":0,"explanation":"..."}]

Exactly 5 objects. "answer" is 0-based index.` }] }),
      });
      const d = await r.json();
      const text = d.content.map(b => b.text || "").join("");
      setQs(JSON.parse(text.replace(/```json|```/g, "").trim()));
    } catch { setQs([{ error: true }]); }
    setLoading(false);
  }

  const correct = sub ? qs.filter((q, i) => ans[i] === q.answer).length : 0;
  const allAns = Object.keys(ans).length === qs.length && qs.length > 0;

  if (!topic) return (
    <div style={{ overflowY: "auto", height: "100%" }}>
      <div style={{ padding: "22px 18px", maxWidth: 560, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700,
          color: c.text, marginBottom: 4 }}>Challenge Mode</h2>
        <p style={{ color: c.sub, fontSize: 13, marginBottom: 18, fontFamily: "'Nunito',sans-serif" }}>
          5 questions per session — test your complete knowledge
        </p>
        {TOPICS.map(t => {
          const m = SM[t.id];
          return (
            <Card key={t.id} c={c} style={{ marginBottom: 12, borderLeft: `4px solid ${m.color}` }}
              onClick={() => setTopic(t.id)}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ fontSize: 30, lineHeight: 1 }}>{m.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, color: c.text, fontSize: 15,
                    fontFamily: "'Nunito',sans-serif" }}>{t.label}</div>
                  <div style={{ fontSize: 12, color: c.sub, marginTop: 3,
                    fontFamily: "'Nunito',sans-serif" }}>{t.sub}</div>
                </div>
                <div style={{ fontSize: 22, color: c.muted }}>›</div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );

  return (
    <div style={{ overflowY: "auto", height: "100%" }}>
      <div style={{ padding: "22px 18px", maxWidth: 560, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <button onClick={() => { setTopic(null); setQs([]); }}
            style={{ background: c.cardAlt, border: `1.5px solid ${c.border}`, borderRadius: 12,
              padding: "8px 16px", cursor: "pointer", color: c.sub, fontSize: 13,
              fontFamily: "'Nunito',sans-serif", fontWeight: 600 }}>
            ← Back
          </button>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: c.text, fontWeight: 700 }}>
              {TOPICS.find(t => t.id === topic)?.label}
            </div>
            <div style={{ fontSize: 12, color: c.muted, fontFamily: "'Nunito',sans-serif" }}>
              5-Question Challenge
            </div>
          </div>
        </div>

        {!qs.length && !loading && (
          <Card c={c}>
            <div style={{ fontSize: 15, fontWeight: 800, color: c.text, marginBottom: 14,
              fontFamily: "'Nunito',sans-serif" }}>Select Difficulty</div>
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              {[
                ["easy",   "🟢", c.success, c.successBg],
                ["medium", "🟡", c.warn,    c.warnBg],
                ["hard",   "🔴", c.error,   c.errorBg],
              ].map(([d, icon, col, bg]) => (
                <button key={d} onClick={() => setDiff(d)} style={{
                  flex: 1, padding: "13px 6px",
                  border: `2px solid ${diff === d ? col : c.border}`,
                  background: diff === d ? bg : c.card, color: diff === d ? col : c.sub,
                  borderRadius: 14, cursor: "pointer", fontWeight: 800, fontSize: 13,
                  textTransform: "capitalize", fontFamily: "'Nunito',sans-serif", transition: "all 0.2s",
                }}>
                  {icon} {d}
                </button>
              ))}
            </div>
            <Btn c={c} onClick={genBatch}>Generate 5 Questions</Btn>
          </Card>
        )}

        {loading && (
          <Card c={c} style={{ textAlign: "center", padding: "56px 20px" }}>
            <div style={{ fontSize: 40, marginBottom: 14, animation: "craneFloat 1.8s ease-in-out infinite" }}>📚</div>
            <div style={{ color: c.sub, fontSize: 14, fontFamily: "'Nunito',sans-serif" }}>
              Generating 5 questions…
            </div>
          </Card>
        )}

        {qs.length > 0 && !loading && (
          <>
            {sub && (
              <Card c={c} style={{
                marginBottom: 18, textAlign: "center",
                background: correct >= 4 ? c.successBg : correct >= 3 ? c.goldLight : c.errorBg,
                borderColor: correct >= 4 ? c.successBorder : correct >= 3 ? c.goldBright : c.errorBorder,
                animation: "scaleIn 0.4s ease",
              }}>
                <div style={{ fontSize: 40, marginBottom: 6 }}>
                  {correct >= 4 ? "🏆" : correct >= 3 ? "🎯" : correct >= 2 ? "📈" : "💪"}
                </div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 800, color: c.text }}>
                  {correct}/5
                </div>
                <div style={{ color: c.sub, fontSize: 14, marginTop: 6, fontFamily: "'Nunito',sans-serif" }}>
                  {correct >= 4 ? "Excellent! You're well-prepared." : correct >= 2 ? "Good effort — keep practising daily!" : "Every attempt builds your foundation. Keep going!"}
                </div>
              </Card>
            )}

            {qs.map((q, qi) => {
              if (q.error) return (
                <Card key={qi} c={c} style={{ marginBottom: 12, borderColor: c.error }}>
                  <div style={{ color: c.error, fontSize: 13, fontFamily: "'Nunito',sans-serif" }}>Failed to generate this question.</div>
                </Card>
              );
              const a = ans[qi];
              return (
                <Card key={qi} c={c} style={{ marginBottom: 14 }} lift={false}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 11, color: c.muted, fontWeight: 800, fontFamily: "'Nunito',sans-serif" }}>
                      Question {qi + 1} of 5
                    </span>
                    {sub && (
                      <span style={{ fontSize: 12, fontWeight: 800, fontFamily: "'Nunito',sans-serif",
                        color: a === q.answer ? c.success : c.error }}>
                        {a === q.answer ? "✓ Correct" : "✗ Incorrect"}
                      </span>
                    )}
                  </div>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 15,
                    color: c.text, margin: "0 0 14px", lineHeight: 1.8 }}>
                    {q.question}
                  </p>
                  {q.options.map((opt, oi) => {
                    let bg = c.card, border = c.border, col = c.text, fw = 400;
                    if (a === oi && !sub) { bg = c.goldLight; border = c.goldBright; fw = 700; }
                    if (sub && oi === q.answer) { bg = c.successBg; border = c.successBorder; col = c.success; fw = 700; }
                    if (sub && a === oi && oi !== q.answer) { bg = c.errorBg; border = c.errorBorder; col = c.error; fw = 700; }
                    return (
                      <div key={oi} onClick={() => !sub && setAns(x => ({ ...x, [qi]: oi }))} style={{
                        background: bg, border: `1.5px solid ${border}`, borderRadius: 12,
                        padding: "11px 16px", marginBottom: 7, cursor: sub ? "default" : "pointer",
                        color: col, fontSize: 13, fontWeight: fw, transition: "all 0.18s",
                        lineHeight: 1.55, fontFamily: "'Nunito',sans-serif",
                      }}>
                        {opt}
                      </div>
                    );
                  })}
                  {sub && (
                    <div style={{ marginTop: 10, padding: "12px 14px", background: c.cardAlt,
                      borderRadius: 12, fontSize: 12, color: c.sub, lineHeight: 1.75,
                      fontFamily: "'Nunito',sans-serif" }}>
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </Card>
              );
            })}

            {!sub ? (
              <Btn c={c} disabled={!allAns} onClick={() => { if (allAns) setSub(true); }}
                style={{ marginBottom: 10 }}>
                Submit All ({Object.keys(ans).length}/5 answered)
              </Btn>
            ) : (
              <Btn c={c} variant="gold" onClick={() => { setQs([]); setAns({}); setSub(false); }}>
                Try Another Round →
              </Btn>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function LexPrep() {
  const [dark, setDark] = useState(() => store.get("lp_dark", false));
  const [progress, setProgress] = useState(() => store.get("lp_progress", {}));
  const [splash, setSplash] = useState(true);
  const [tab, setTab] = useState("home");
  const c = T[dark ? "dark" : "light"];

  return (
    <>
      <GlobalStyles/>
      <div style={{
        width: "100%", height: "100vh", display: "flex", flexDirection: "column",
        background: c.bg, color: c.text, overflow: "hidden", fontFamily: "'Nunito', sans-serif",
      }}>
        {splash && <Splash onDone={() => setSplash(false)}/>}
        <TopBar dark={dark} setDark={setDark} c={c}/>
        <div style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
          {tab === "home"     && <HomeTab c={c} dark={dark} progress={progress} setTab={setTab}/>}
          {tab === "plan"     && <StudyPlanTab c={c} progress={progress} setProgress={setProgress}/>}
          {tab === "practice" && <PracticeTab c={c}/>}
          {tab === "papers"   && <PapersTab c={c}/>}
          {tab === "extra"    && <ExtraTab c={c}/>}
        </div>
        <BottomNav tab={tab} setTab={setTab} c={c}/>
      </div>
    </>
  );
}
