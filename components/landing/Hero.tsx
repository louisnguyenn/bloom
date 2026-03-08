'use client';

import { useEffect, useState } from 'react';
import styles from './Hero.module.css';

const DISEASES = [
  'Late Blight',
  'Powdery Mildew',
  'Leaf Rust',
  'Mosaic Virus',
  'Gray Mold',
];

export default function Hero() {
  const [diseaseIndex, setDiseaseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDiseaseIndex((i) => (i + 1) % DISEASES.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero}>
      {/* Left: copy */}
      <div className={styles.left}>
        <div className={styles.kicker}>AI-powered crop diagnostics</div>
        <h1 className={styles.title}>
          Detect
          <br />
          <em>disease.</em>
          <br />
          Save your
        </h1>
        <div className={styles.ticker}>
          <span className={styles.tickerWord} key={diseaseIndex}>
            harvest.
          </span>
        </div>
        <p className={styles.sub}>
          Photograph a leaf. Get an instant AI diagnosis with treatment
          guidance. Built for farmers who can&apos;t wait for an agronomist.
        </p>
        <div className={styles.actions}>
          <a href="/upload" className={styles.btnPrimary}>
            Diagnose a crop →
          </a>
          <a href="#how-it-works" className={styles.btnGhost}>
            See how it works
          </a>
        </div>
      </div>

      {/* Right: botanical illustration */}
      <div className={styles.right}>
        <div className={styles.cornerLabel}>Specimen analysis</div>
        <div className={styles.scanLine} />

        <svg
          className={styles.botanicalSvg}
          viewBox="0 0 400 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M200 440 C160 400 60 340 50 240 C40 140 100 60 200 40 C300 60 360 140 350 240 C340 340 240 400 200 440Z"
            fill="rgba(107,145,99,0.12)"
            stroke="rgba(74,103,65,0.35)"
            strokeWidth="1.5"
          />
          <path
            d="M200 440 C198 380 195 300 200 40"
            stroke="rgba(74,103,65,0.5)"
            strokeWidth="2"
            strokeLinecap="round"
          />
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

        <div className={styles.badge}>
          <div className={styles.badgeLabel}>AI Diagnosis</div>
          <div className={styles.badgeDisease}>Late Blight</div>
          <div className={styles.badgeConf}>87% confidence</div>
        </div>
      </div>
    </section>
  );
}
