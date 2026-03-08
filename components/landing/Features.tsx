import styles from './Features.module.css';

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
    <section id="features" className={styles.wrapper}>
      <div className={styles.section}>
        <div className={styles.header}>
          <div className={styles.kicker}>Features</div>
          <h2 className={styles.title}>
            Built for farmers,
            <br />
            <em>not agronomists</em>
          </h2>
        </div>
        <div className={styles.grid}>
          {FEATURES.map((f) => (
            <div key={f.title} className={styles.card}>
              <div className={styles.iconRow}>
                <div className={styles.icon}>{f.icon}</div>
                <span className={styles.tag}>{f.tag}</span>
              </div>
              <div className={styles.cardTitle}>{f.title}</div>
              <p className={styles.cardDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
