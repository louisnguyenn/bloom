'use client';

import { useEffect, useState } from 'react';

type Stats = {
  totalDiagnoses: number;
  mostCommonDisease: string;
  avgConfidence: number;
  diagnosesThisWeek: number;
};

export default function StatsGrid() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stats')
      .then((r) => r.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const cards = [
    {
      label: 'Total diagnoses',
      value: loading ? '—' : (stats?.totalDiagnoses ?? 0),
      unit: '',
      icon: '🔬',
      desc: 'All time',
    },
    {
      label: 'This week',
      value: loading ? '—' : (stats?.diagnosesThisWeek ?? 0),
      unit: '',
      icon: '📅',
      desc: 'Last 7 days',
    },
    {
      label: 'Avg confidence',
      value: loading ? '—' : `${Math.round((stats?.avgConfidence ?? 0) * 100)}`,
      unit: '%',
      icon: '📊',
      desc: 'Across all scans',
    },
    {
      label: 'Top disease',
      value: loading ? '—' : (stats?.mostCommonDisease ?? 'None'),
      unit: '',
      icon: '⚠️',
      desc: 'Most detected',
    },
  ];

  return (
    <section className="pt-32 pb-6 px-16 max-w-[1200px] mx-auto max-md:px-8 max-md:pt-24">
      <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
        <div>
          <div className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-sage mb-2 flex items-center gap-2 kicker-section">
            Overview
          </div>
          <h1 className="font-playfair text-fluid-h2 font-bold tracking-tighter text-ink">
            Your crop health <em className="italic text-rust">at a glance</em>
          </h1>
        </div>
        <a
          href="/upload"
          className="font-mono text-[0.7rem] tracking-[0.08em] uppercase bg-sage text-white px-5 py-2.5 rounded-md no-underline hover:bg-sage-light hover:-translate-y-px transition-all whitespace-nowrap"
        >
          ＋ New diagnosis
        </a>
      </div>

      <div className="grid grid-cols-4 gap-[1.5px] bg-ink/[0.08] rounded-xl overflow-hidden max-lg:grid-cols-2 max-sm:grid-cols-1">
        {cards.map((c) => (
          <div
            key={c.label}
            className="bg-cream hover:bg-parchment transition-colors p-7 flex gap-4 items-start"
          >
            <div className="text-2xl shrink-0 mt-0.5">{c.icon}</div>
            <div className="min-w-0">
              <div className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-muted mb-1.5">
                {c.label}
              </div>
              <div className="font-playfair text-[1.8rem] font-bold text-ink tracking-tighter leading-none truncate">
                {c.value}
                <span className="text-sage text-base font-normal">
                  {c.unit}
                </span>
              </div>
              <div className="font-mono text-[0.58rem] tracking-[0.08em] uppercase text-muted mt-1.5">
                {c.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
