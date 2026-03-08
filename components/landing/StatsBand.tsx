const STATS = [
  {
    number: '38',
    unit: '%',
    label: 'of global crops lost to disease annually',
  },
  { number: '~85', unit: '%', label: 'detection accuracy via ML model' },
  { number: '<10', unit: 's', label: 'from photo to full diagnosis' },
];

export default function StatsBand() {
  return (
    <div className="bg-ink grid grid-cols-3 px-16 py-12 max-md:grid-cols-1 max-md:px-8 max-md:gap-8">
      {STATS.map((s, i) => (
        <div
          key={s.label}
          className={`text-center px-8 ${i < STATS.length - 1 ? 'border-r border-white/[0.08] max-md:border-r-0 max-md:border-b max-md:pb-8' : ''}`}
        >
          <div className="font-playfair text-5xl font-black text-parchment leading-none tracking-tighter">
            {s.number}
            <span className="text-sage-light">{s.unit}</span>
          </div>
          <div className="font-mono text-[0.65rem] tracking-widest uppercase text-parchment/40 mt-2">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
