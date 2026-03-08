import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-5 bg-cream/90 backdrop-blur-md border-b border-ink/8">
      <Link
        href="/"
        className="font-playfair text-2xl font-bold text-ink tracking-tight flex items-center gap-2 no-underline"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-sage inline-block" />
        Bloom
      </Link>
      <div className="flex items-center gap-10">
        <Link
          href="/#how-it-works"
          className="font-mono text-[0.7rem] tracking-widest uppercase text-muted hover:text-ink transition-colors no-underline"
        >
          How it works
        </Link>
        <Link
          href="/#features"
          className="font-mono text-[0.7rem] tracking-widest uppercase text-muted hover:text-ink transition-colors no-underline"
        >
          Features
        </Link>
        <Link
          href="/upload"
          className="font-mono text-[0.7rem] tracking-[0.08em] uppercase bg-ink text-cream px-5 py-2 rounded no-underline hover:bg-ink-light transition-colors"
        >
          Try it free →
        </Link>
      </div>
    </nav>
  );
}
