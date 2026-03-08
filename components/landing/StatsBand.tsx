import styles from './StatsBand.module.css';

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
    <div className={styles.band}>
      {STATS.map((s) => (
        <div key={s.label} className={styles.stat}>
          <div className={styles.number}>
            {s.number}
            <span>{s.unit}</span>
          </div>
          <div className={styles.label}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}
