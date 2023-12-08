import styles from './NavBar.module.css'

import Container from "../container/Container"
import logo from '../../../img/costs_logo.png'

import { Link } from "react-router-dom"

export default function NavBar() {
  return (
    <nav className={styles.navBar}>
      <Container>
        <Link to='/'>
          <img src={logo} alt='Costs' />
        </Link>

        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to='/'>Home</Link>
          </li>
          <li className={styles.item}>
            <Link to='/projects'>Projetos</Link>
          </li>
        </ul>
      </Container>
    </nav>
  )
}