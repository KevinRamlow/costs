import Message from "../../layout/message/Message";
import LinkButton from "../../layout/button/LinkButton";
import Container from '../../layout/container/Container'

import { useLocation } from 'react-router-dom'

import styles from './Projects.module.css'

export default function Projects() {
  const location = useLocation()
  let message = ''

  if (location.state) {
    message = location.state.message
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus projetos</h1>
        <LinkButton to='/newproject' text='Criar projetos'/>
      </div>
      {message && <Message type='success' msg={message}/>}
      <Container customClass='start'>
        <p>Projetos...</p>
      </Container>
    </div>
  )
}