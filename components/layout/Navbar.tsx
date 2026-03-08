import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        <span className={styles.logoAccent} />
        Bloom
      </Link>
      <div className={styles.right}>
        <Link href="#how-it-works" className={styles.link}>
          How it works
        </Link>
        <Link href="#features" className={styles.link}>
          Features
        </Link>
        <Link href="/upload" className={styles.cta}>
          Try it free →
        </Link>
      </div>
    </nav>
  );
}
