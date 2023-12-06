import Message from "../../layout/message/Message";
import LinkButton from "../../layout/button/LinkButton";
import Container from '../../layout/container/Container';
import ProjectCard from "../../project/projectCard/ProjectCard";

import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import styles from './Projects.module.css';
import Loading from "../../loading/Loading";

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [removeLoading, setRemoveLoading] = useState(false)

  const location = useLocation()
  let message = ''

  if (location.state) {
    message = location.state.message
  }

  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:5000/projects', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      })
        .then(resp => resp.json())
        .then(data => {
          setProjects(data)
          setRemoveLoading(true)
        })
        .catch(err => console.log(err))
    }, 500)
  }, [])

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus projetos</h1>
        <LinkButton to='/newproject' text='Criar projetos' />
      </div>

      {message && <Message type='success' msg={message} />}

      <Container customClass='start'>
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              name={project.name}
              id={project.id}
              budget={project.budget}
              category={project.category.name}
              key={project.id}
            />
          ))
        }

        {!removeLoading && <Loading />}
        {removeLoading && projects.length === 0 && (
          <p>Não há projetos cadastrados!</p>
        )}
      </Container>
    </div>
  )
}