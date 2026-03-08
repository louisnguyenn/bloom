export default function CtaSection() {
  return (
    <section className="bg-parchment border-t border-ink/10 border-b py-28 px-16 text-center relative overflow-hidden cta-watermark max-md:py-20 max-md:px-8">
      <div className="relative z-10 max-w-[600px] mx-auto">
        <h2 className="font-playfair text-fluid-cta font-black tracking-tighter text-ink leading-tight mb-5">
          Your crop can&apos;t wait
          <br />
          for <em className="italic text-rust">an appointment.</em>
        </h2>
        <p className="font-spectral italic text-[1rem] text-muted mb-10 font-light">
          Free to use. No signup required. Just a photo.
        </p>
        <a
          href="/upload"
          className="font-mono text-[0.8rem] tracking-widest uppercase bg-ink text-cream px-10 py-4 rounded no-underline inline-flex items-center gap-2 hover:bg-rust hover:-translate-y-0.5 transition-all"
        >
          Diagnose a crop now →
        </a>
      </div>
    </section>
  );
}
