const FEATURES = [
  {
    icon: '🌿',
    tag: 'Core',
    title: 'Image-based disease detection',
    desc: 'Upload any leaf photo and get an instant ML-powered diagnosis. No expertise required — our model has been trained on hundreds of crop disease variants.',
  },
  {
    icon: '✦',
    tag: 'AI',
    title: 'Gemini-generated treatment plans',
    desc: 'Once a disease is identified, Bloom generates tailored treatment and prevention guidance using Google Gemini — specific to your crop type and region.',
  },
  {
    icon: '📋',
    tag: 'Data',
    title: 'Diagnosis history & logging',
    desc: 'Every diagnosis is stored in your personal history. Review past reports, track recurring problems, and share data with agronomists or cooperatives.',
  },
  {
    icon: '🗺',
    tag: 'Coming soon',
    title: 'Regional outbreak detection',
    desc: 'Aggregated diagnosis data will power a regional disease heatmap — helping farmers and agricultural agencies detect outbreaks before they spread.',
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-parchment border-t border-ink/[0.08]">
      <div className="py-28 px-16 max-w-[1200px] mx-auto max-md:px-8 max-md:py-16">
        <div className="mb-16">
          <div className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-sage mb-3 flex items-center gap-2 kicker-section">
            Features
          </div>
          <h2 className="font-playfair text-fluid-h2 font-bold tracking-tighter leading-tight text-ink">
            Built for farmers,
            <br />
            <em className="italic text-rust">not agronomists</em>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-[2px] bg-ink/[0.08] rounded-lg overflow-hidden max-md:grid-cols-1">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-cream hover:bg-parchment-dark transition-colors p-10"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-11 h-11 border border-ink/[0.12] rounded-md flex items-center justify-center text-xl bg-parchment-dark">
                  {f.icon}
                </div>
                <span className="font-mono text-[0.6rem] tracking-widest uppercase text-muted bg-ink/[0.06] px-2 py-0.5 rounded">
                  {f.tag}
                </span>
              </div>
              <div className="font-playfair text-[1.15rem] font-bold text-ink mb-2.5 tracking-tight">
                {f.title}
              </div>
              <p className="font-spectral text-[0.88rem] leading-relaxed text-muted font-light">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
