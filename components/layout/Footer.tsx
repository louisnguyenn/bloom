import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>Bloom 🌱</div>
      <div className={styles.text}>
        Early crop disease detection · Powered by Gemini AI
      </div>
      <div className={styles.text}>Built for farmers</div>
    </footer>
  );
}
