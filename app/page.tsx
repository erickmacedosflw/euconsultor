"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "revealed" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ── SVG Mockups ─────────────────────────────────────────── */

function MockupDashboard() {
  return (
    <svg viewBox="0 0 680 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="mockup-svg" aria-hidden>
      {/* window chrome */}
      <rect width="680" height="420" rx="16" fill="#f8f5fc"/>
      <rect width="680" height="48" rx="0" fill="#8756b5"/>
      <rect y="0" width="680" height="48" rx="16" fill="#8756b5"/>
      <rect y="32" width="680" height="16" fill="#8756b5"/>
      {/* dots */}
      <circle cx="24" cy="24" r="6" fill="rgba(255,255,255,.35)"/>
      <circle cx="44" cy="24" r="6" fill="rgba(255,255,255,.35)"/>
      <circle cx="64" cy="24" r="6" fill="rgba(255,255,255,.35)"/>
      {/* title bar text */}
      <rect x="80" y="17" width="120" height="14" rx="4" fill="rgba(255,255,255,.5)"/>
      {/* sidebar */}
      <rect x="0" y="48" width="56" height="372" fill="#f0ebf8"/>
      <rect x="16" y="72" width="24" height="24" rx="6" fill="#8756b5"/>
      <rect x="16" y="112" width="24" height="24" rx="6" fill="#d5c0ec"/>
      <rect x="16" y="152" width="24" height="24" rx="6" fill="#d5c0ec"/>
      <rect x="16" y="192" width="24" height="24" rx="6" fill="#d5c0ec"/>
      <rect x="16" y="232" width="24" height="24" rx="6" fill="#d5c0ec"/>
      {/* month label */}
      <rect x="76" y="68" width="110" height="18" rx="4" fill="#8756b5"/>
      {/* day pills row */}
      {[0,1,2,3,4,5,6,7].map((i) => (
        <g key={i}>
          <rect x={76 + i*72} y="100" width="54" height="40" rx="8" fill={i===0?"#8756b5":"white"} opacity={i===0?1:0.9}/>
          <rect x={84 + i*72} y="108" width="20" height="8" rx="2" fill={i===0?"rgba(255,255,255,.7)":"#d5c0ec"}/>
          <rect x={84 + i*72} y="120" width="28" height="8" rx="2" fill={i===0?"rgba(255,255,255,.5)":"#ede8f5"}/>
        </g>
      ))}
      {/* chart area */}
      <rect x="76" y="152" width="580" height="200" rx="12" fill="white" opacity="0.9"/>
      <rect x="96" y="168" width="80" height="12" rx="3" fill="#8756b5"/>
      {/* bars */}
      {[60,90,40,75,55,85,65,50,80].map((h,i) => (
        <rect key={i} x={110 + i*56} y={340-h} width="32" height={h} rx="6" fill={i===3?"#8756b5":"#d5c0ec"} opacity="0.85"/>
      ))}
      {/* bottom stat cards */}
      <rect x="76" y="364" width="180" height="46" rx="10" fill="white" opacity="0.9"/>
      <rect x="92" y="376" width="60" height="8" rx="2" fill="#d5c0ec"/>
      <rect x="92" y="390" width="100" height="10" rx="2" fill="#8756b5"/>
      <rect x="272" y="364" width="180" height="46" rx="10" fill="white" opacity="0.9"/>
      <rect x="288" y="376" width="60" height="8" rx="2" fill="#d5c0ec"/>
      <rect x="288" y="390" width="100" height="10" rx="2" fill="#8756b5"/>
      <rect x="468" y="364" width="180" height="46" rx="10" fill="white" opacity="0.9"/>
      <rect x="484" y="376" width="60" height="8" rx="2" fill="#d5c0ec"/>
      <rect x="484" y="390" width="100" height="10" rx="2" fill="#8756b5"/>
    </svg>
  );
}

function MockupAgenda() {
  return (
    <svg viewBox="0 0 640 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="mockup-svg" aria-hidden>
      <rect width="640" height="400" rx="16" fill="#f8f5fc"/>
      <rect width="640" height="48" rx="16" fill="#8756b5"/>
      <rect y="32" width="640" height="16" fill="#8756b5"/>
      <rect x="76" y="17" width="90" height="14" rx="4" fill="rgba(255,255,255,.5)"/>
      <rect x="0" y="48" width="52" height="352" fill="#f0ebf8"/>
      {[0,1,2,3,4].map(i=>(
        <rect key={i} x="14" y={72+i*40} width="24" height="24" rx="5" fill={i===1?"#8756b5":"#d5c0ec"}/>
      ))}
      {/* Calendar grid */}
      {["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"].map((d,i)=>(
        <text key={d} x={66+i*82} y="84" fontSize="10" fill="#8756b5" fontWeight="700">{d}</text>
      ))}
      {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21].map((n,i)=>{
        const col=i%7, row=Math.floor(i/7);
        const x=60+col*82, y=100+row*72;
        const isToday=n===24, hasEvent=n===3||n===7||n===15;
        return (
          <g key={n}>
            <rect x={x} y={y} width="72" height="60" rx="8" fill={isToday?"rgba(135,86,181,.08)":"white"} opacity=".85"/>
            <text x={x+8} y={y+18} fontSize="12" fill={isToday?"#8756b5":"#3a2654"} fontWeight={isToday?"700":"500"}>{n}</text>
            {hasEvent && <rect x={x+8} y={y+24} width={n===3?48:56} height="16" rx="4" fill="#8756b5" opacity=".85"/>}
            {hasEvent && <rect x={x+8} y={y+24} width={n===3?48:56} height="16" rx="4" fill="#8756b5" opacity=".85"/>}
          </g>
        );
      })}
      {/* Right panel */}
      <rect x="636" y="48" width="0" height="352" fill="#e8e0f5"/>
    </svg>
  );
}

function MockupKm() {
  return (
    <svg viewBox="0 0 640 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="mockup-svg" aria-hidden>
      <rect width="640" height="380" rx="16" fill="#f8f5fc"/>
      <rect width="640" height="48" rx="16" fill="#8756b5"/>
      <rect y="32" width="640" height="16" fill="#8756b5"/>
      <rect x="76" y="17" width="110" height="14" rx="4" fill="rgba(255,255,255,.5)"/>
      <rect x="0" y="48" width="52" height="332" fill="#f0ebf8"/>
      {[0,1,2,3,4].map(i=>(
        <rect key={i} x="14" y={72+i*40} width="24" height="24" rx="5" fill={i===2?"#8756b5":"#d5c0ec"}/>
      ))}
      {/* Month selector */}
      <rect x="72" y="68" width="500" height="40" rx="10" fill="white" opacity=".9"/>
      {[1,2,3,4,5,6,7].map((n,i)=>(
        <g key={n}>
          <rect x={88+i*68} y="76" width="52" height="24" rx="6" fill={n===1?"#8756b5":"transparent"}/>
          <rect x={94+i*68} y="82" width="20" height="8" rx="2" fill={n===1?"rgba(255,255,255,.8)":"#d5c0ec"}/>
          <rect x={94+i*68} y="93" width="28" height="4" rx="2" fill={n===1?"rgba(255,255,255,.5)":"transparent"}/>
        </g>
      ))}
      {/* KM total bar */}
      <rect x="72" y="122" width="560" height="36" rx="10" fill="white" opacity=".9"/>
      <rect x="92" y="134" width="60" height="12" rx="3" fill="#d5c0ec"/>
      <rect x="540" y="130" width="80" height="18" rx="4" fill="#8756b5"/>
      {/* Table header */}
      <rect x="72" y="170" width="560" height="28" rx="6" fill="#f0ebf8"/>
      {[0,1,2,3,4].map(i=>(
        <rect key={i} x={92+i*108} y="178" width={80} height="12" rx="3" fill="#d5c0ec"/>
      ))}
      {/* Table rows */}
      {[0,1,2].map(row=>(
        <g key={row}>
          <rect x="72" y={210+row*52} width="560" height="44" rx="8" fill="white" opacity=".8"/>
          <rect x="92" y={222+row*52} width="100" height="12" rx="3" fill="#3a2654"/>
          <rect x="220" y={222+row*52} width="64" height="12" rx="3" fill="#d5c0ec"/>
          <rect x="328" y={222+row*52} width="48" height="12" rx="3" fill="#d5c0ec"/>
          <rect x="424" y={222+row*52} width="48" height="12" rx="3" fill="#8756b5"/>
        </g>
      ))}
    </svg>
  );
}

function MockupCliente() {
  return (
    <svg viewBox="0 0 640 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="mockup-svg" aria-hidden>
      <rect width="640" height="420" rx="16" fill="#f8f5fc"/>
      <rect width="640" height="48" rx="16" fill="#8756b5"/>
      <rect y="32" width="640" height="16" fill="#8756b5"/>
      <rect x="76" y="17" width="60" height="14" rx="4" fill="rgba(255,255,255,.5)"/>
      <rect x="0" y="48" width="52" height="372" fill="#f0ebf8"/>
      {[0,1,2,3,4].map(i=>(
        <rect key={i} x="14" y={72+i*40} width="24" height="24" rx="5" fill={i===0?"#8756b5":"#d5c0ec"}/>
      ))}
      {/* form card */}
      <rect x="160" y="68" width="440" height="340" rx="16" fill="white" opacity=".95"/>
      <rect x="184" y="92" width="120" height="14" rx="4" fill="#3a2654"/>
      {/* fields */}
      {[0,1,2,3,4,5].map(i=>(
        <g key={i}>
          <rect x="184" y={122+i*44} width="92" height="10" rx="3" fill="#d5c0ec"/>
          <rect x="184" y={136+i*44} width="392" height="28" rx="8" fill="#f8f5fc"/>
        </g>
      ))}
      {/* save button */}
      <rect x="184" y="392" width="120" height="36" rx="999" fill="#8756b5"/>
      <rect x="324" y="392" width="120" height="36" rx="999" fill="#f0ebf8"/>
    </svg>
  );
}

/* ── Features data ──────────────────────────────────────── */

const features = [
  { icon: "🏢", title: "Empresas", short: "Organize contratos", desc: "Cadastre e gerencie todas as empresas que contratam seus servicos." },
  { icon: "👥", title: "Clientes", short: "Historico completo", desc: "Controle clientes e propriedades dentro de cada empresa atendida." },
  { icon: "📅", title: "Agenda", short: "Visitas planejadas", desc: "Programe atendimentos, acompanhe o mes e evite conflitos de horario." },
  { icon: "📋", title: "Registros", short: "Sem perder nada", desc: "Documente atividades, fotos, videos e observacoes no campo." },
  { icon: "📄", title: "Relatorios PDF", short: "Profissional", desc: "Gere e exporte relatorios padronizados em minutos." },
  { icon: "🚗", title: "Quilometragem", short: "KM por visita", desc: "Registre deslocamentos e totalize km rodados por periodo." },
  { icon: "💰", title: "Despesas", short: "Custo organizado", desc: "Lance gastos operacionais com comprovantes anexados." },
  { icon: "📊", title: "Financeiro", short: "Saiba o que cobrar", desc: "Visualize o valor a receber de cada empresa de forma clara." },
  { icon: "🔗", title: "Compartilhamento", short: "Envie pelo WhatsApp", desc: "Compartilhe relatorios por link sem precisar de e-mail ou impressao." },
];



const faq = [
  { q: "O sistema funciona no celular?", a: "Sim. Foi pensado para quem atende em campo e precisa acessar informacoes de qualquer lugar." },
  { q: "Posso registrar atendimentos durante a visita?", a: "Sim. Voce documenta atividades, km, despesas e arquivos no momento do atendimento." },
  { q: "Os relatorios podem ser enviados por WhatsApp?", a: "Sim. Compartilhe relatorios por link diretamente no WhatsApp sem precisar de e-mail." },
  { q: "Preciso de internet para usar?", a: "Para a maioria das funcoes sim. O acesso e pelo navegador ou app, com sincronizacao automatica." },
];

const audiences = ["Consultores Agro", "Veterinarios", "Zootecnistas", "Agronomos", "Consultores Tecnicos"];

/* ── Countdown Timer ────────────────────────────────────── */

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-04-27T00:00:00-03:00").getTime();

    function updateCountdown() {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown-grid">
      <div className="countdown-unit">
        <div className="countdown-value">{String(timeLeft.days).padStart(2, "0")}</div>
        <div className="countdown-label">Dias</div>
      </div>
      <div className="countdown-unit">
        <div className="countdown-value">{String(timeLeft.hours).padStart(2, "0")}</div>
        <div className="countdown-label">Horas</div>
      </div>
      <div className="countdown-unit">
        <div className="countdown-value">{String(timeLeft.minutes).padStart(2, "0")}</div>
        <div className="countdown-label">Minutos</div>
      </div>
      <div className="countdown-unit">
        <div className="countdown-value">{String(timeLeft.seconds).padStart(2, "0")}</div>
        <div className="countdown-label">Segundos</div>
      </div>
    </div>
  );
}

/* ── Signup Modal ───────────────────────────────────────── */

type ModalStep = "closed" | "form" | "success";

function SignupModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [empresa, setEmpresa] = useState("");
  const [consultor, setConsultor] = useState("");
  const [email, setEmail] = useState("");
  const [areaAtuacao, setAreaAtuacao] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on overlay click
  function handleOverlay(e: React.MouseEvent) {
    if (e.target === overlayRef.current) onClose();
  }

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  function validate() {
    const e: Record<string, string> = {};
    if (!empresa.trim()) e.empresa = "Informe o nome da empresa.";
    if (!consultor.trim()) e.consultor = "Informe seu nome completo.";
    if (!email.trim()) e.email = "Informe seu e-mail.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "E-mail inválido.";
    if (!areaAtuacao.trim()) e.areaAtuacao = "Informe sua área de atuação.";
    return e;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setSubmitError("");
    setLoading(true);
    try {
      const response = await fetch("/api/pre-inscricao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          empresa: empresa.trim(),
          nomecompleto: consultor.trim(),
          email: email.trim(),
          area: areaAtuacao.trim(),
        }),
      });

      if (!response.ok) {
        let apiMessage = "";
        try {
          const data = await response.json() as { error?: string };
          if (typeof data.error === "string") apiMessage = data.error;
        } catch {
          apiMessage = "";
        }

        if (response.status >= 500) {
          const fallback = "Estamos com instabilidade no envio da pré-inscrição. Tente novamente em instantes.";
          setSubmitError(apiMessage ? `${fallback} (${apiMessage})` : fallback);
        } else {
          setSubmitError(apiMessage || "Não foi possível concluir a pré-inscrição. Tente novamente.");
        }
        return;
      }

      setStep("success");
    } catch (error) {
      console.error("Erro ao enviar pré-inscrição:", error);
      setSubmitError("Não foi possível conectar ao servidor. Verifique sua internet e tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const content = (
    <div className="modal-overlay" ref={overlayRef} onClick={handleOverlay} role="dialog" aria-modal="true">
      <div className="modal-box">
        <button className="modal-close" onClick={onClose} aria-label="Fechar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className="modal-logo">
          <Image src="/logo.png" alt="Eu, Consultor" width={180} height={50} style={{ height: 40, width: "auto" }} />
        </div>

        {step === "form" ? (
          <>
            <h2 className="modal-title">Faça sua pré-inscrição</h2>
            <p className="modal-sub">Preencha os dados abaixo e seja um dos primeiros a usar o app com desconto exclusivo.</p>
            <form className="modal-form" onSubmit={handleSubmit} noValidate>
              <div className="modal-field">
                <label htmlFor="empresa">Nome da empresa</label>
                <input
                  id="empresa"
                  type="text"
                  placeholder="Ex: Agro Consultoria Silva"
                  value={empresa}
                  onChange={e => setEmpresa(e.target.value)}
                  className={errors.empresa ? "input-error" : ""}
                />
                {errors.empresa && <span className="field-error">{errors.empresa}</span>}
              </div>
              <div className="modal-field">
                <label htmlFor="consultor">Seu nome completo</label>
                <input
                  id="consultor"
                  type="text"
                  placeholder="Ex: João da Silva"
                  value={consultor}
                  onChange={e => setConsultor(e.target.value)}
                  className={errors.consultor ? "input-error" : ""}
                />
                {errors.consultor && <span className="field-error">{errors.consultor}</span>}
              </div>
              <div className="modal-field">
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  type="email"
                  placeholder="voce@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={errors.email ? "input-error" : ""}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>
              <div className="modal-field">
                <label htmlFor="areaAtuacao">Área de atuação</label>
                <input
                  id="areaAtuacao"
                  type="text"
                  placeholder="Ex: Zootecnista, Veterinário, Agrônomo"
                  value={areaAtuacao}
                  onChange={e => setAreaAtuacao(e.target.value)}
                  className={errors.areaAtuacao ? "input-error" : ""}
                />
                {errors.areaAtuacao && <span className="field-error">{errors.areaAtuacao}</span>}
              </div>
              {submitError && <p className="field-error" role="alert" aria-live="assertive">{submitError}</p>}
              <button type="submit" className="modal-submit" disabled={loading}>
                {loading ? <span className="modal-spinner" /> : "Fazer pré-inscrição →"}
              </button>
            </form>
          </>
        ) : (
          <div className="modal-success">
            <div className="modal-success__icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8756b5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h2 className="modal-title">Acesso enviado!</h2>
            <p className="modal-sub">
              Enviamos um e-mail para <strong>{email}</strong> com o link de acesso ao Eu, Consultor e um tutorial completo para você começar ainda hoje.
            </p>
            <p className="modal-success__tip">Não encontrou? Verifique sua caixa de spam.</p>
            <button className="modal-submit" onClick={onClose}>Fechar</button>
          </div>
        )}
      </div>
    </div>
  );
  return createPortal(content, document.body);
}

/* ── Page ───────────────────────────────────────────────── */

export default function Home() {
  const [modal, setModal] = useState<ModalStep>("closed");
  const openModal = () => setModal("form");
  const closeModal = () => setModal("closed");

  return (
    <div className="page-root">
      {modal !== "closed" && <SignupModal onClose={closeModal} />}

      {/* NAV */}
      <nav className="nav">
        <Link href="/" className="nav__brand-logo">
          <Image src="/logo.png" alt="Eu, Consultor" width={160} height={44} priority style={{ height: 36, width: 'auto' }} />
        </Link>
        <div className="nav__links">
          <a href="#funcionalidades">Funcionalidades</a>
          <a href="#na-pratica">Na prática</a>
          <a href="#plano">Plano</a>
        </div>
        <button className="nav__cta" onClick={openModal}>Fazer pré-inscrição</button>
      </nav>

      {/* HERO */}
      <section className="hero-wrap">
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="hero-pill reveal revealed">Software para consultores de campo</div>
            <h1 className="hero-h1 reveal revealed" style={{ transitionDelay: "80ms" }}>
              Sua consultoria<br />
              <span className="hero-h1-accent">organizada</span><br />
              de verdade.
            </h1>
            <p className="hero-sub reveal revealed" style={{ transitionDelay: "160ms" }}>
              Cadastre empresas, registre atendimentos, gere relatorios em PDF
              e controle o que deve ser cobrado — tudo em um so lugar.
            </p>
            <div className="hero-actions reveal revealed" style={{ transitionDelay: "240ms" }}>
              <button className="btn btn-primary" onClick={openModal}>Fazer pré-inscrição →</button>
            </div>
            <div className="hero-trust reveal revealed" style={{ transitionDelay: "320ms" }}>
              {audiences.map(a => <span key={a} className="trust-pill">{a}</span>)}
            </div>
          </div>
          <div className="hero-photo-col reveal revealed" style={{ transitionDelay: "200ms" }}>
            <div className="hero-photo-glow" />
            <div className="hero-photo-wrap">
              <Image
                src="/hero-consultor.png"
                alt="Consultor agronomo no campo com tablet"
                width={640}
                height={720}
                priority
                className="hero-photo-img"
              />
              <div className="hero-float-card hero-float-card--top">
                <span className="float-dot" />
                <div>
                  <small>Atendimento registrado</small>
                  <strong>Fazenda Aurora &middot; hoje 09:14</strong>
                </div>
              </div>
              <div className="hero-float-card hero-float-card--bottom">
                <span className="float-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8756b5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                </span>
                <div>
                  <small>Relatorio gerado</small>
                  <strong>PDF pronto para enviar</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COUNTDOWN / LAUNCH */}
      <section className="section-wrap section-countdown">
        <Reveal>
          <div className="countdown-header">
            <div className="section-label">Lançamento em breve</div>
            <h2 className="section-h2">Faltam poucos dias para você revolucionar sua gestão.</h2>
            <p className="section-sub">
              O Eu, Consultor será lançado oficialmente em <strong>27 de abril de 2026</strong>.
              Faça sua pré-inscrição agora e garanta 3 meses com <strong>20% de desconto</strong> nas primeiras mensalidades.
            </p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <CountdownTimer />
        </Reveal>
        <Reveal delay={200}>
          <div className="countdown-cta">
            <div className="countdown-offer-badge">🎁 Oferta de lançamento</div>
            <p className="countdown-offer-text">
              Seja um dos primeiros a usar o app e ganhe <strong>20% de desconto</strong> nos 3 primeiros meses!
            </p>
            <button className="btn btn-primary btn-lg" onClick={openModal}>
              Fazer pré-inscrição e garantir desconto →
            </button>
          </div>
        </Reveal>
      </section>

            {/* PROBLEMA */}
      <section className="section-wrap section-problem">
        <Reveal>
          <div className="section-label">O problema</div>
          <h2 className="section-h2">Sua gestao ainda esta no papel?</h2>
          <p className="section-sub">Consultores perdem tempo, dinheiro e credibilidade com uma rotina desorganizada.</p>
        </Reveal>
        <div className="problems-grid">
          {[
            { icon: "📓", text: "Atendimentos anotados em cadernos e perdidos depois" },
            { icon: "📱", text: "Informacoes espalhadas em mensagens e planilhas" },
            { icon: "❓", text: "Sem saber exatamente quanto cobrar de cada empresa" },
            { icon: "🕐", text: "Horas perdidas montando relatorios manualmente" },
          ].map((p, i) => (
            <Reveal key={p.text} delay={i * 80}>
              <div className="problem-card">
                <span className="problem-icon">{p.icon}</span>
                <p>{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SOLUCAO */}
      <section className="section-wrap section-solution">
        <div className="solution-left">
          <Reveal>
            <div className="section-label section-label--light">A solucao</div>
            <h2 className="section-h2 section-h2--light">O Eu, Consultor resolve tudo isso.</h2>
            <p className="section-sub section-sub--light">
              Um sistema feito para a realidade de quem atende em campo.
              Rapido de usar, profissional para apresentar.
            </p>
          </Reveal>
          <div className="solution-items">
            {[
              { icon: "✅", t: "Tudo em um lugar", d: "Agenda, clientes, despesas e financeiro centralizados." },
              { icon: "✅", t: "Registro no campo", d: "Documente cada visita no momento em que acontece." },
              { icon: "✅", t: "Relatorio em minutos", d: "PDF gerado e enviado por link sem retrabalho." },
            ].map((item, i) => (
              <Reveal key={item.t} delay={i * 100}>
                <div className="solution-item">
                  <span>{item.icon}</span>
                  <div>
                    <strong>{item.t}</strong>
                    <p>{item.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal delay={200} className="solution-right">
          <div className="solution-mockup-frame">
            <MockupAgenda />
          </div>
        </Reveal>
      </section>

      {/* FUNCIONALIDADES */}
      <section className="section-wrap" id="funcionalidades">
        <Reveal>
          <div className="section-label">Funcionalidades</div>
          <h2 className="section-h2">Tudo que voce precisa, nada que voce nao usa.</h2>
        </Reveal>
        <div className="features-grid">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 50}>
              <div className="feature-card">
                <span className="feature-icon-big">{f.icon}</span>
                <div className="feature-label">{f.short}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* KM / CLIENTE screenshots */}
      <section className="section-wrap section-screens" id="na-pratica">
        <Reveal>
          <div className="screens-header">
            <div className="section-label">Veja na prática</div>
            <h2 className="section-h2">Interfaces pensadas<br />para o campo.</h2>
            <p className="section-sub">Rápido de acessar, fácil de entender, profissional de apresentar.</p>
            <div className="screens-platform-badges">
              <span className="platform-badge">📱 iPhone e Android</span>
              <span className="platform-badge">💻 Computador</span>
              <span className="platform-badge">📟 Tablet</span>
              <span className="platform-badge platform-badge--highlight">Sem instalação · Funciona no navegador</span>
            </div>
          </div>
        </Reveal>
        <div className="screens-grid">
          <Reveal delay={0}>
            <div className="screen-item">
              <Image
                src="/image_desktop_menu_app.jpeg"
                alt="Menu principal do Eu, Consultor no desktop"
                width={800}
                height={500}
                className="screen-img"
              />
              <span>🏠 Menu e Visão Geral</span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="screen-item">
              <Image
                src="/image_desktop_calendar.jpeg"
                alt="Agenda de atendimentos do Eu, Consultor no desktop"
                width={800}
                height={500}
                className="screen-img"
              />
              <span>📅 Agenda de Atendimentos</span>
            </div>
          </Reveal>
        </div>
        <Reveal delay={200}>
          <div className="screens-mobile-callout">
            <span className="screens-mobile-callout__icon">📲</span>
            <div className="screens-mobile-callout__text">
              <strong>Na palma da mão, onde você estiver.</strong>
              <p>Acesse do celular na fazenda, do tablet no escritório ou do computador em casa. Eu, Consultor é multiplataforma e responsivo — funciona no navegador de qualquer dispositivo, sem baixar nada.</p>
            </div>
            <div className="screens-mobile-callout__devices">
              <div className="device-chip">📱 Celular</div>
              <div className="device-chip">💻 Notebook</div>
              <div className="device-chip">📟 Tablet</div>
              <div className="device-chip">🖥️ Desktop</div>
            </div>
          </div>
        </Reveal>
      </section>



      {/* PLANO */}
      <section className="section-wrap" id="plano">
        <Reveal>
          <div className="section-label">Plano</div>
          <h2 className="section-h2">Simples, completo e pensado para você.</h2>
          <p className="section-sub">O Plano Profissional foi feito para consultores independentes que querem controle real da própria operação — de qualquer dispositivo.</p>
        </Reveal>
        <Reveal delay={100}>
          <div className="pricing-card">
            <div className="pricing-top">
              <div>
                <div className="pricing-badge">✦ Plano Profissional · Uso pessoal</div>
                <h3>Comece agora com o Plano Profissional</h3>
                <p>Tudo que você precisa para gerenciar clientes, visitas, km e cobranças — na palma da mão ou no computador, sem precisar instalar nada.</p>
              </div>
              <div className="pricing-actions">
                <button className="btn btn-primary btn-lg" onClick={openModal}>Fazer pré-inscrição →</button>
              </div>
            </div>
            <div className="pricing-features">
              {[
                "1 consultor",
                "Cadastro de empresas",
                "Cadastro de clientes",
                "Agenda de atendimentos",
                "Registro completo de atendimentos",
                "Relatorios digitais em PDF",
                "Controle de quilometragem",
                "Controle de despesas",
                "Controle financeiro por empresa",
                "Compartilhamento por link",
              ].map(item => (
                <div key={item} className="pricing-feature-item">
                  <span className="pricing-check">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA FINAL */}
      <section className="section-wrap section-cta">
        <Reveal>
          <div className="cta-inner">
            <h2>Comece hoje mesmo.</h2>
            <p>Controle completo dos seus atendimentos, clientes e cobrancas em um unico sistema.</p>
            <div className="cta-actions">
              <button className="btn btn-primary btn-lg" onClick={openModal}>Fazer pré-inscrição →</button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="section-wrap section-faq">
        <Reveal>
          <div className="section-label">FAQ</div>
          <h2 className="section-h2">Perguntas frequentes.</h2>
        </Reveal>
        <div className="faq-grid">
          {faq.map((item, i) => (
            <Reveal key={item.q} delay={i * 80}>
              <details className="faq-item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <Image src="/logo-white.png" alt="Eu, Consultor" width={180} height={50} style={{ height: 38, width: 'auto', marginBottom: 10 }} />
            <p>Software profissional para consultores autônomos.</p>
          </div>
          <nav className="footer-nav">
            <Link href="/politica-de-privacidade">Privacidade</Link>
            <Link href="/contato">Contato</Link>
            <Link href="/suporte">Suporte</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
