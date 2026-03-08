'use client';

import { useEffect, useState } from 'react';

type Diagnosis = {
  id: string;
  cropType: string;
  predictedDisease: string;
  confidence: number;
  imageUrl: string;
  createdAt: string;
  latitude?: number;
  longitude?: number;
};

const FILTERS = ['All', 'High confidence', 'Low confidence', 'This week'];

export default function DiagnosisHistory() {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/diagnoses')
      .then((r) => r.json())
      .then((data) => {
        setDiagnoses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = diagnoses.filter((d) => {
    const matchesSearch =
      d.predictedDisease.toLowerCase().includes(search.toLowerCase()) ||
      d.cropType.toLowerCase().includes(search.toLowerCase());
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    if (filter === 'High confidence')
      return matchesSearch && d.confidence >= 0.8;
    if (filter === 'Low confidence') return matchesSearch && d.confidence < 0.5;
    if (filter === 'This week')
      return matchesSearch && new Date(d.createdAt) >= oneWeekAgo;
    return matchesSearch;
  });

  const badgeClass = (conf: number) =>
    conf >= 0.8
      ? 'bg-green-500/10 text-green-700 border-green-500/30'
      : conf >= 0.5
        ? 'bg-yellow-500/10 text-yellow-700 border-yellow-500/30'
        : 'bg-red-500/10 text-red-600 border-red-500/30';

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-CA', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  return (
    <section className="py-8 px-16 pb-24 max-w-[1200px] mx-auto max-md:px-8">
      {/* Toolbar */}
      <div className="flex items-end justify-between mb-6 flex-wrap gap-4">
        <div>
          <div className="font-mono text-[0.6rem] tracking-[0.18em] uppercase text-sage mb-1.5 flex items-center gap-1.5 kicker-section">
            History
          </div>
          <h2 className="font-playfair text-[1.8rem] font-bold tracking-tighter text-ink">
            Recent diagnoses
          </h2>
        </div>
        <input
          type="text"
          placeholder="Search disease or crop..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="font-mono text-[0.72rem] bg-parchment border border-ink/15 rounded-md px-4 py-2 text-ink placeholder:text-muted outline-none focus:border-sage transition-colors w-60"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`font-mono text-[0.65rem] tracking-[0.08em] uppercase px-3.5 py-1.5 rounded border transition-all
              ${
                filter === f
                  ? 'bg-sage border-sage text-white'
                  : 'border-ink/12 text-muted hover:border-sage hover:text-sage bg-transparent'
              }`}
          >
            {f}
          </button>
        ))}
        <span className="font-mono text-[0.6rem] tracking-widest uppercase text-muted ml-auto">
          {filtered.length} records
        </span>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-[2fr_1fr_1.5fr_1.5fr_1fr_0.5fr] gap-4 px-5 py-2.5 font-mono text-[0.58rem] tracking-[0.12em] uppercase text-muted border-b border-ink/10 max-md:hidden">
        <span>Disease</span>
        <span>Crop</span>
        <span>Confidence</span>
        <span>Location</span>
        <span>Date</span>
        <span />
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center gap-4 py-20 border border-ink/[0.08] rounded-lg mt-1">
          <div className="w-9 h-9 border-2 border-sage/15 border-t-sage rounded-full animate-spin-slow" />
          <span className="font-mono text-[0.7rem] text-muted tracking-wider">
            Loading diagnoses...
          </span>
        </div>
      )}

      {/* Empty */}
      {!loading && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 py-20 border border-ink/[0.08] rounded-lg mt-1 text-center">
          <span className="text-4xl opacity-40">🌿</span>
          <p className="font-spectral italic text-muted">No diagnoses found.</p>
          <a
            href="/upload"
            className="font-mono text-[0.7rem] tracking-[0.08em] uppercase text-sage border border-sage/30 px-5 py-2 rounded-md hover:bg-sage/[0.08] transition-colors no-underline"
          >
            Run your first diagnosis →
          </a>
        </div>
      )}

      {/* Rows */}
      {!loading && filtered.length > 0 && (
        <div className="border border-ink/[0.08] rounded-lg overflow-hidden mt-1">
          {filtered.map((d, i) => (
            <div
              key={d.id}
              className={`grid grid-cols-[2fr_1fr_1.5fr_1.5fr_1fr_0.5fr] gap-4 items-center px-5 py-4 hover:bg-parchment transition-colors max-md:grid-cols-2 max-md:gap-2 max-md:py-5
                ${i < filtered.length - 1 ? 'border-b border-ink/[0.06]' : ''}`}
            >
              {/* Disease */}
              <div className="flex items-center gap-2.5 font-playfair text-[0.95rem] font-semibold text-ink">
                <span className="w-1.5 h-1.5 rounded-full bg-rust shrink-0" />
                {d.predictedDisease}
              </div>
              {/* Crop */}
              <div className="font-mono text-[0.72rem] text-muted capitalize">
                {d.cropType}
              </div>
              {/* Confidence */}
              <div className="flex items-center gap-2.5">
                <span
                  className={`font-mono text-[0.65rem] font-medium px-2 py-0.5 rounded border shrink-0 ${badgeClass(d.confidence)}`}
                >
                  {Math.round(d.confidence * 100)}%
                </span>
                <div className="flex-1 h-[3px] bg-ink/[0.08] rounded-full overflow-hidden">
                  <div
                    className="conf-fill"
                    style={{ width: `${d.confidence * 100}%` }}
                  />
                </div>
              </div>
              {/* Location */}
              <div className="font-mono text-[0.68rem] text-muted max-md:hidden">
                {d.latitude && d.longitude ? (
                  `${d.latitude.toFixed(2)}, ${d.longitude.toFixed(2)}`
                ) : (
                  <span className="opacity-35">—</span>
                )}
              </div>
              {/* Date */}
              <div className="font-mono text-[0.68rem] text-muted">
                {formatDate(d.createdAt)}
              </div>
              {/* Action */}
              <div className="flex justify-end">
                <a
                  href={`/dashboard/${d.id}`}
                  className="font-mono text-[0.62rem] tracking-[0.08em] uppercase text-sage border border-sage/25 px-2.5 py-1.5 rounded hover:bg-sage/[0.08] hover:border-sage transition-all no-underline whitespace-nowrap"
                >
                  View →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
