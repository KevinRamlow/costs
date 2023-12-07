import styles from './Footer.module.css'

import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.social_list}>
        <li>
          <FaInstagram />
        </li>
        <li>
          <FaGithub />
        </li>
        <li>
          <FaLinkedin />
        </li>
      </ul>
      <p className={styles.copy_right}>
        <span className={styles.copy_right_costs}>Costs </span>
        <span className={styles.skDev}>&copy; SK dev</span>
      </p>
    </footer>
  )
}