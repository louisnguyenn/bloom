const STEPS = [
  {
    number: '01',
    icon: '📸',
    title: 'Photograph the leaf',
    desc: 'Take a close-up photo of a diseased or suspicious leaf using your phone. Any clear image works — no lab equipment needed.',
  },
  {
    number: '02',
    icon: '🔬',
    title: 'AI detects the disease',
    desc: 'Our ML model analyzes the image and identifies the most likely disease from thousands of crop disease patterns, with a confidence score.',
  },
  {
    number: '03',
    icon: '💊',
    title: 'Get a treatment plan',
    desc: 'Gemini AI generates specific treatment and prevention advice for your crop type. Your diagnosis is logged to help track regional outbreaks.',
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-28 px-16 max-w-[1200px] mx-auto max-md:px-8 max-md:py-16"
    >
      <div className="mb-16">
        <div className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-sage mb-3 flex items-center gap-2 kicker-section">
          Process
        </div>
        <h2 className="font-playfair text-fluid-h2 font-bold tracking-tighter leading-tight text-ink">
          Three steps to
          <br />
          <em className="italic text-rust">early detection</em>
        </h2>
      </div>

      <div className="grid grid-cols-3 border border-ink/10 rounded-lg overflow-hidden max-md:grid-cols-1">
        {STEPS.map((s, i) => (
          <div
            key={s.number}
            className={`p-10 relative hover:bg-parchment transition-colors ${i < STEPS.length - 1 ? 'border-r border-ink/[0.08] max-md:border-r-0 max-md:border-b' : ''}`}
          >
            <div className="font-playfair text-[4rem] font-black text-ink/[0.06] leading-none absolute top-6 right-8 tracking-tighter select-none">
              {s.number}
            </div>
            <div className="text-[1.8rem] mb-5">{s.icon}</div>
            <div className="font-playfair text-xl font-bold text-ink mb-3 tracking-tight">
              {s.title}
            </div>
            <p className="font-spectral text-[0.9rem] leading-relaxed text-muted font-light">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
