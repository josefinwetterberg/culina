import styles from './footer.module.css'; 

export default function Footer() {
  
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>&copy; 2025 Recipe Finder. All rights reserved.</p>
        <p>Created by Josefin, Kasper & Mahtias</p>
      </div>
    </footer>
  );
}