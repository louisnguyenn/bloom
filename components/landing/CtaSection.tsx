import styles from './CtaSection.module.css';

export default function CtaSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>
          Your crop can&apos;t wait
          <br />
          for <em>an appointment.</em>
        </h2>
        <p className={styles.sub}>
          Free to use. No signup required. Just a photo.
        </p>
        <a href="/upload" className={styles.btn}>
          Diagnose a crop now →
        </a>
      </div>
    </section>
  );
}
