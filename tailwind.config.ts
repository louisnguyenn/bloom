import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1c1510',
        'ink-light': '#3d3028',
        rust: '#8b3a1a',
        'rust-light': '#b85c32',
        sage: '#4a6741',
        'sage-light': '#6b9163',
        parchment: '#f2ead8',
        'parchment-dark': '#e8dcc0',
        cream: '#faf6ec',
        muted: '#8a7d6b',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        spectral: ['Spectral', 'serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      animation: {
        'hero-up': 'heroFadeUp 0.8s ease both',
        'hero-in': 'heroFadeIn 1s ease 0.3s both',
        'badge-pop': 'badgePop 0.5s ease 1.2s both',
        scan: 'scanDown 3s ease-in-out infinite',
        ticker: 'tickerSlide 0.4s ease',
        'slide-up': 'slideUp 0.4s ease',
        'spin-slow': 'spin 0.9s linear infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
      },
      keyframes: {
        heroFadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        heroFadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        badgePop: {
          from: { opacity: '0', transform: 'scale(0.9) translateY(8px)' },
          to: { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        scanDown: {
          '0%': { top: '15%', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { top: '85%', opacity: '0' },
        },
        tickerSlide: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.8)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
