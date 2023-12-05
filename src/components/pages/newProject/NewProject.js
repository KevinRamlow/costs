import styles from './NewProject.module.css'
import ProjectForm from '../../project/ProjectForm'

export default function NewProject() {
  return (
    <section className={styles.newproject_container}>
      <h1>Criar projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm />
    </section>
  )
}