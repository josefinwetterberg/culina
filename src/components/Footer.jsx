import styles from './footer.module.css'; 

export default function Footer() {
  
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerText}>
        <p>&copy; 2025 Culina. All rights reserved.</p>
          <p>Created by Josefin, Kasper & Mahtias</p>
          </div>
      </div>
    </footer>
  );
}