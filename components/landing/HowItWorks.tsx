import styles from './HowItWorks.module.css';

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
    <section id="how-it-works" className={styles.section}>
      <div className={styles.header}>
        <div className={styles.kicker}>Process</div>
        <h2 className={styles.title}>
          Three steps to<br /><em>early detection</em>
        </h2>
      </div>
      <div className={styles.steps}>
        {STEPS.map((s) => (
          <div key={s.number} className={styles.step}>
            <div className={styles.stepNumber}>{s.number}</div>
            <div className={styles.stepIcon}>{s.icon}</div>
            <div className={styles.stepTitle}>{s.title}</div>
            <p className={styles.stepDesc}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}