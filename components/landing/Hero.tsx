'use client';

import Link from "next/link";
import { useEffect, useRef, useState } from 'react';

const DISEASES = [
  'Late Blight',
  'Powdery Mildew',
  'Leaf Rust',
  'Mosaic Virus',
  'Gray Mold',
];

export default function Hero() {
  const [diseaseIndex, setDiseaseIndex] = useState(0);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDiseaseIndex((i) => (i + 1) % DISEASES.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Spectral:ital,wght@0,300;0,400;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --ink: #1c1510;
          --ink-light: #3d3028;
          --rust: #8b3a1a;
          --rust-light: #b85c32;
          --sage: #4a6741;
          --sage-light: #6b9163;
          --parchment: #f2ead8;
          --parchment-dark: #e8dcc0;
          --cream: #faf6ec;
          --gold: #c4932a;
          --muted: #8a7d6b;
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--cream);
          color: var(--ink);
          font-family: 'Spectral', serif;
          overflow-x: hidden;
        }

        /* ── TEXTURE OVERLAY ── */
        body::before {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          background-repeat: repeat;
        }

        /* ── NAV ── */
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 3rem;
          background: rgba(250,246,236,0.88);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(28,21,16,0.08);
        }

        .nav-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--ink);
          text-decoration: none;
          letter-spacing: -0.02em;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .nav-logo-accent {
          width: 6px;
          height: 6px;
          background: var(--sage);
          border-radius: 50%;
          display: inline-block;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 2.5rem;
        }

        .nav-link {
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s;
        }

        .nav-link:hover { color: var(--ink); }

        .nav-cta {
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: var(--ink);
          color: var(--cream);
          padding: 0.55rem 1.25rem;
          border-radius: 4px;
          text-decoration: none;
          transition: background 0.2s;
        }

        .nav-cta:hover { background: var(--ink-light); }

        /* ── HERO ── */
        .hero {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding-top: 5rem;
          position: relative;
          overflow: hidden;
        }

        .hero-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 5rem 3rem 5rem 4rem;
          position: relative;
          z-index: 2;
          animation: heroFadeUp 0.8s ease both;
        }

        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-kicker {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--sage);
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .hero-kicker::before {
          content: '';
          width: 32px;
          height: 1px;
          background: var(--sage);
          display: block;
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 5.5vw, 5.5rem);
          font-weight: 900;
          line-height: 1.0;
          letter-spacing: -0.03em;
          color: var(--ink);
          margin-bottom: 0.5rem;
        }

        .hero-title em {
          font-style: italic;
          color: var(--rust);
        }

        .disease-ticker {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 5.5vw, 5.5rem);
          font-weight: 400;
          font-style: italic;
          color: var(--sage);
          letter-spacing: -0.03em;
          line-height: 1.0;
          margin-bottom: 1.75rem;
          height: 1.1em;
          overflow: hidden;
          position: relative;
        }

        .ticker-word {
          display: block;
          animation: tickerSlide 0.4s ease;
        }

        @keyframes tickerSlide {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-sub {
          font-size: 1.05rem;
          font-weight: 300;
          line-height: 1.75;
          color: var(--ink-light);
          max-width: 420px;
          margin-bottom: 2.5rem;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .btn-primary {
          font-family: 'DM Mono', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: var(--sage);
          color: white;
          padding: 0.85rem 2rem;
          border-radius: 4px;
          text-decoration: none;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-primary:hover {
          background: var(--sage-light);
          transform: translateY(-1px);
        }

        .btn-ghost {
          font-family: 'Spectral', serif;
          font-style: italic;
          font-size: 0.95rem;
          color: var(--muted);
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: all 0.2s;
        }

        .btn-ghost:hover {
          color: var(--ink);
          border-bottom-color: var(--ink);
        }

        /* hero right - botanical illustration panel */
        .hero-right {
          position: relative;
          background: var(--parchment);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: heroFadeIn 1s ease 0.3s both;
        }

        @keyframes heroFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .hero-right::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 30% 20%, rgba(107,145,99,0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(139,58,26,0.08) 0%, transparent 50%);
        }

        /* SVG botanical illustration */
        .botanical-svg {
          width: 85%;
          max-width: 440px;
          position: relative;
          z-index: 2;
        }

        .scan-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(to right, transparent, rgba(74,103,65,0.5), transparent);
          animation: scanDown 3s ease-in-out infinite;
          z-index: 3;
          top: 20%;
        }

        @keyframes scanDown {
          0% { top: 15%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 85%; opacity: 0; }
        }

        .detection-badge {
          position: absolute;
          bottom: 2.5rem;
          right: 2.5rem;
          background: rgba(250,246,236,0.92);
          border: 1px solid rgba(74,103,65,0.25);
          border-radius: 8px;
          padding: 1rem 1.25rem;
          z-index: 4;
          backdrop-filter: blur(8px);
          animation: badgePop 0.5s ease 1.2s both;
        }

        @keyframes badgePop {
          from { opacity: 0; transform: scale(0.9) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .badge-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 0.3rem;
        }

        .badge-disease {
          font-family: 'Playfair Display', serif;
          font-size: 1rem;
          color: var(--ink);
          font-weight: 700;
        }

        .badge-conf {
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          color: var(--sage);
          margin-top: 0.2rem;
        }

        .corner-label {
          position: absolute;
          top: 1.5rem;
          left: 1.5rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem;
          color: rgba(28,21,16,0.25);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          writing-mode: vertical-lr;
          transform: rotate(180deg);
        }

        /* ── DIVIDER ── */
        .rule {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 0 4rem;
          margin: 0;
        }

        .rule-line {
          flex: 1;
          height: 1px;
          background: rgba(28,21,16,0.12);
        }

        .rule-ornament {
          font-size: 1.1rem;
          color: var(--sage);
          opacity: 0.5;
        }

        /* ── STATS BAND ── */
        .stats-band {
          background: var(--ink);
          padding: 3rem 4rem;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
        }

        .stat {
          text-align: center;
          padding: 0 2rem;
          border-right: 1px solid rgba(255,255,255,0.08);
        }

        .stat:last-child { border-right: none; }

        .stat-number {
          font-family: 'Playfair Display', serif;
          font-size: 3rem;
          font-weight: 900;
          color: var(--parchment);
          line-height: 1;
          letter-spacing: -0.04em;
        }

        .stat-number span {
          color: var(--sage-light);
        }

        .stat-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(242,234,216,0.4);
          margin-top: 0.5rem;
        }

        /* ── HOW IT WORKS ── */
        .section {
          padding: 7rem 4rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-header {
          margin-bottom: 4rem;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }

        .section-kicker {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--sage);
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .section-kicker::before {
          content: '§';
          color: var(--rust);
          font-size: 0.8rem;
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 3.5vw, 3rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.15;
          color: var(--ink);
        }

        .section-title em {
          font-style: italic;
          color: var(--rust);
        }

        /* Steps */
        .steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border: 1px solid rgba(28,21,16,0.1);
          border-radius: 8px;
          overflow: hidden;
        }

        .step {
          padding: 2.5rem;
          border-right: 1px solid rgba(28,21,16,0.08);
          position: relative;
          transition: background 0.3s;
        }

        .step:last-child { border-right: none; }
        .step:hover { background: var(--parchment); }

        .step-number {
          font-family: 'Playfair Display', serif;
          font-size: 4rem;
          font-weight: 900;
          color: rgba(28,21,16,0.06);
          line-height: 1;
          position: absolute;
          top: 1.5rem;
          right: 2rem;
          letter-spacing: -0.05em;
        }

        .step-icon {
          font-size: 1.8rem;
          margin-bottom: 1.25rem;
        }

        .step-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
        }

        .step-desc {
          font-size: 0.9rem;
          line-height: 1.7;
          color: var(--muted);
          font-weight: 300;
        }

        /* ── FEATURES ── */
        .features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          background: rgba(28,21,16,0.08);
          border-radius: 8px;
          overflow: hidden;
        }

        .feature-card {
          background: var(--cream);
          padding: 2.5rem;
          transition: background 0.25s;
        }

        .feature-card:hover { background: var(--parchment); }

        .feature-icon-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }

        .feature-icon {
          width: 44px;
          height: 44px;
          border: 1px solid rgba(28,21,16,0.12);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          background: var(--parchment-dark);
        }

        .feature-tag {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          background: rgba(28,21,16,0.06);
          padding: 0.2rem 0.5rem;
          border-radius: 3px;
        }

        .feature-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 0.6rem;
          letter-spacing: -0.02em;
        }

        .feature-desc {
          font-size: 0.88rem;
          line-height: 1.75;
          color: var(--muted);
          font-weight: 300;
        }

        /* ── CTA SECTION ── */
        .cta-section {
          background: var(--parchment);
          border-top: 1px solid rgba(28,21,16,0.1);
          border-bottom: 1px solid rgba(28,21,16,0.1);
          padding: 7rem 4rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: 'BLOOM';
          position: absolute;
          font-family: 'Playfair Display', serif;
          font-size: 18vw;
          font-weight: 900;
          color: rgba(28,21,16,0.03);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          white-space: nowrap;
          pointer-events: none;
          letter-spacing: -0.05em;
        }

        .cta-inner {
          position: relative;
          z-index: 2;
          max-width: 600px;
          margin: 0 auto;
        }

        .cta-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4.5vw, 4rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          color: var(--ink);
          line-height: 1.1;
          margin-bottom: 1.25rem;
        }

        .cta-title em {
          font-style: italic;
          color: var(--rust);
        }

        .cta-sub {
          font-size: 1rem;
          color: var(--muted);
          margin-bottom: 2.5rem;
          font-style: italic;
          font-weight: 300;
        }

        .cta-btn {
          font-family: 'DM Mono', monospace;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: var(--ink);
          color: var(--cream);
          padding: 1rem 2.5rem;
          border-radius: 4px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          transition: all 0.2s;
        }

        .cta-btn:hover {
          background: var(--rust);
          transform: translateY(-2px);
        }

        /* ── FOOTER ── */
        .footer {
          background: var(--ink);
          color: rgba(242,234,216,0.4);
          padding: 2.5rem 4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .footer-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--parchment);
        }

        .footer-text {
          font-family: 'DM Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .hero { grid-template-columns: 1fr; min-height: auto; }
          .hero-right { min-height: 50vw; }
          .hero-left { padding: 3rem 2rem; }
          .stats-band { grid-template-columns: 1fr; gap: 2rem; padding: 3rem 2rem; }
          .stat { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.08); padding: 1.5rem 0; }
          .stat:last-child { border-bottom: none; }
          .section { padding: 4rem 2rem; }
          .steps { grid-template-columns: 1fr; }
          .step { border-right: none; border-bottom: 1px solid rgba(28,21,16,0.08); }
          .step:last-child { border-bottom: none; }
          .features-grid { grid-template-columns: 1fr; }
          .cta-section { padding: 5rem 2rem; }
          .footer { flex-direction: column; gap: 1rem; text-align: center; }
          .nav { padding: 1rem 1.5rem; }
          .nav-right { gap: 1rem; }
          .section-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className="nav">
        <Link href="/" className="nav-logo">
          <span className="nav-logo-accent" /> Bloom
        </Link>
        <div className="nav-right">
          <a href="#how-it-works" className="nav-link">
            How it works
          </a>
          <a href="#features" className="nav-link">
            Features
          </a>
          <a href="/upload" className="nav-cta">
            Try it free →
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-kicker">AI-powered crop diagnostics</div>
          <h1 className="hero-title">
            Detect
            <br />
            <em>disease.</em>
            <br />
            Save your
          </h1>
          <div className="disease-ticker">
            <span className="ticker-word" key={diseaseIndex}>
              harvest.
            </span>
          </div>
          <p className="hero-sub">
            Photograph a leaf. Get an instant AI diagnosis with treatment
            guidance. Built for farmers who can&apos;t wait for an agronomist.
          </p>
          <div className="hero-actions">
            <a href="/upload" className="btn-primary">
              Diagnose a crop →
            </a>
            <a href="#how-it-works" className="btn-ghost">
              See how it works
            </a>
          </div>
        </div>

        <div className="hero-right">
          <div className="corner-label">Specimen analysis</div>
          <div className="scan-line" />

          {/* Botanical leaf SVG */}
          <svg
            className="botanical-svg"
            viewBox="0 0 400 480"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Main leaf shape */}
            <path
              d="M200 440 C160 400 60 340 50 240 C40 140 100 60 200 40 C300 60 360 140 350 240 C340 340 240 400 200 440Z"
              fill="rgba(107,145,99,0.12)"
              stroke="rgba(74,103,65,0.35)"
              strokeWidth="1.5"
            />
            {/* Midrib */}
            <path
              d="M200 440 C198 380 195 300 200 40"
              stroke="rgba(74,103,65,0.5)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Veins left */}
            <path
              d="M198 120 C170 115 130 105 90 110"
              stroke="rgba(74,103,65,0.3)"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M197 160 C165 155 120 148 80 158"
              stroke="rgba(74,103,65,0.3)"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M196 200 C160 195 115 192 75 205"
              stroke="rgba(74,103,65,0.3)"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M196 240 C162 237 120 237 82 250"
              stroke="rgba(74,103,65,0.3)"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M196 280 C165 278 125 280 92 292"
              stroke="rgba(74,103,65,0.3)"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M197 320 C170 320 135 323 108 335"
              stroke="rgba(74,103,65,0.3)"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M198 360 C178 362 155 367 138 378"
              stroke="rgba(74,103,65,0.3)"
              strokeWidth="1"
              strokeLinecap="round"
            />
            {/* Veins right */}
            <path
              d="M202 120 C230 115 270 105 310 110"
              stroke="rgba(74,103,65,0.3)"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M203 160 C235 155 280 148 320 158"
              stroke="rgba(74,103,65,0.3)"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M204 200 C240 195 285 192 325 205"
              stroke="rgba(74,103,65,0.3)"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M204 240 C238 237 280 237 318 250"
              stroke="rgba(74,103,65,0.3)"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M204 280 C235 278 275 280 308 292"
              stroke="rgba(74,103,65,0.3)"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M203 320 C230 320 265 323 292 335"
              stroke="rgba(74,103,65,0.3)"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M202 360 C222 362 245 367 262 378"
              stroke="rgba(74,103,65,0.3)"
              strokeWidth="1"
              strokeLinecap="round"
            />
            {/* Disease spots */}
            <ellipse
              cx="145"
              cy="195"
              rx="18"
              ry="14"
              fill="rgba(139,58,26,0.18)"
              stroke="rgba(139,58,26,0.35)"
              strokeWidth="1"
            />
            <ellipse
              cx="258"
              cy="230"
              rx="14"
              ry="10"
              fill="rgba(139,58,26,0.14)"
              stroke="rgba(139,58,26,0.3)"
              strokeWidth="1"
            />
            <ellipse
              cx="170"
              cy="280"
              rx="10"
              ry="8"
              fill="rgba(139,58,26,0.12)"
              stroke="rgba(139,58,26,0.28)"
              strokeWidth="1"
            />
            <ellipse
              cx="230"
              cy="165"
              rx="8"
              ry="6"
              fill="rgba(139,58,26,0.1)"
              stroke="rgba(139,58,26,0.25)"
              strokeWidth="1"
            />
            {/* Spot indicators */}
            <circle
              cx="145"
              cy="195"
              r="22"
              fill="none"
              stroke="rgba(139,58,26,0.4)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <circle
              cx="258"
              cy="230"
              r="18"
              fill="none"
              stroke="rgba(139,58,26,0.3)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            {/* Crosshair */}
            <line
              x1="125"
              y1="195"
              x2="132"
              y2="195"
              stroke="rgba(139,58,26,0.6)"
              strokeWidth="1"
            />
            <line
              x1="158"
              y1="195"
              x2="165"
              y2="195"
              stroke="rgba(139,58,26,0.6)"
              strokeWidth="1"
            />
            <line
              x1="145"
              y1="173"
              x2="145"
              y2="180"
              stroke="rgba(139,58,26,0.6)"
              strokeWidth="1"
            />
            <line
              x1="145"
              y1="210"
              x2="145"
              y2="217"
              stroke="rgba(139,58,26,0.6)"
              strokeWidth="1"
            />
            {/* Annotation lines */}
            <line
              x1="167"
              y1="183"
              x2="188"
              y2="165"
              stroke="rgba(139,58,26,0.4)"
              strokeWidth="0.75"
            />
            <line
              x1="188"
              y1="165"
              x2="225"
              y2="165"
              stroke="rgba(139,58,26,0.4)"
              strokeWidth="0.75"
            />
            <text
              x="228"
              y="162"
              fontFamily="DM Mono, monospace"
              fontSize="8"
              fill="rgba(139,58,26,0.7)"
              letterSpacing="0.05em"
            >
              LESION DETECTED
            </text>
          </svg>

          <div className="detection-badge">
            <div className="badge-label">AI Diagnosis</div>
            <div className="badge-disease">Late Blight</div>
            <div className="badge-conf">87% confidence</div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="stats-band">
        <div className="stat">
          <div className="stat-number">
            38<span>%</span>
          </div>
          <div className="stat-label">
            of global crops lost to disease annually
          </div>
        </div>
        <div className="stat">
          <div className="stat-number">
            ~85<span>%</span>
          </div>
          <div className="stat-label">detection accuracy via ML model</div>
        </div>
        <div className="stat">
          <div className="stat-number">
            &lt;10<span>s</span>
          </div>
          <div className="stat-label">from photo to full diagnosis</div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div id="how-it-works">
        <div className="section">
          <div className="section-header">
            <div>
              <div className="section-kicker">Process</div>
              <h2 className="section-title">
                Three steps to
                <br />
                <em>early detection</em>
              </h2>
            </div>
          </div>

          <div className="steps">
            <div className="step">
              <div className="step-number">01</div>
              <div className="step-icon">📸</div>
              <div className="step-title">Photograph the leaf</div>
              <p className="step-desc">
                Take a close-up photo of a diseased or suspicious leaf using
                your phone. Any clear image works — no lab equipment needed.
              </p>
            </div>
            <div className="step">
              <div className="step-number">02</div>
              <div className="step-icon">🔬</div>
              <div className="step-title">AI detects the disease</div>
              <p className="step-desc">
                Our ML model analyzes the image and identifies the most likely
                disease from thousands of crop disease patterns, with a
                confidence score.
              </p>
            </div>
            <div className="step">
              <div className="step-number">03</div>
              <div className="step-icon">💊</div>
              <div className="step-title">Get a treatment plan</div>
              <p className="step-desc">
                Gemini AI generates specific treatment and prevention advice for
                your crop type. Your diagnosis is logged to help track regional
                outbreaks.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div
        id="features"
        style={{
          background: 'var(--parchment)',
          borderTop: '1px solid rgba(28,21,16,0.08)',
        }}
      >
        <div className="section">
          <div className="section-header">
            <div>
              <div className="section-kicker">Features</div>
              <h2 className="section-title">
                Built for farmers,
                <br />
                <em>not agronomists</em>
              </h2>
            </div>
          </div>

          <div className="features-grid" ref={featuresRef}>
            <div className="feature-card">
              <div className="feature-icon-row">
                <div className="feature-icon">🌿</div>
                <span className="feature-tag">Core</span>
              </div>
              <div className="feature-title">Image-based disease detection</div>
              <p className="feature-desc">
                Upload any leaf photo and get an instant ML-powered diagnosis.
                No expertise required — our model has been trained on hundreds
                of crop disease variants.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-row">
                <div className="feature-icon">✦</div>
                <span className="feature-tag">AI</span>
              </div>
              <div className="feature-title">
                Gemini-generated treatment plans
              </div>
              <p className="feature-desc">
                Once a disease is identified, Bloom generates tailored treatment
                and prevention guidance using Google Gemini — specific to your
                crop type and region.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-row">
                <div className="feature-icon">📋</div>
                <span className="feature-tag">Data</span>
              </div>
              <div className="feature-title">Diagnosis history & logging</div>
              <p className="feature-desc">
                Every diagnosis is stored in your personal history. Review past
                reports, track recurring problems, and share data with
                agronomists or cooperatives.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-row">
                <div className="feature-icon">🗺</div>
                <span className="feature-tag">Coming soon</span>
              </div>
              <div className="feature-title">Regional outbreak detection</div>
              <p className="feature-desc">
                Aggregated diagnosis data will power a regional disease heatmap
                — helping farmers and agricultural agencies detect outbreaks
                before they spread.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="cta-section">
        <div className="cta-inner">
          <h2 className="cta-title">
            Your crop can&apos;t wait
            <br />
            for <em>an appointment.</em>
          </h2>
          <p className="cta-sub">
            Free to use. No signup required. Just a photo.
          </p>
          <a href="/upload" className="cta-btn">
            Diagnose a crop now →
          </a>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-logo">Bloom 🌱</div>
        <div className="footer-text">
          Early crop disease detection · Powered by Gemini AI
        </div>
        <div className="footer-text">Built for farmers</div>
      </footer>
    </>
  );
}
