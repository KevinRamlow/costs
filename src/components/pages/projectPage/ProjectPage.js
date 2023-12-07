import styles from './ProjectPage.module.css'

import Loading from '../../loading/Loading'
import Message from '../../layout/message/Message'
import Container from '../../layout/container/Container'
import ProjectForm from '../../project/projectForm/ProjectForm'
import ServiceForm from '../../service/serviceForm/ServiceForm'
import ServiceCard from '../../service/serviceCard/ServiceCard'

import { v4 as uuidv4 } from 'uuid'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ProjectPage() {
  const { id } = useParams()

  const [project, setProject] = useState([])
  const [services, setServices] = useState([])
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [message, setMessage] = useState()
  const [type, setType] = useState()

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      })
        .then(resp => resp.json())
        .then(data => {
          setProject(data)
          setServices(data.services)
        })
        .catch(err => console.log(err))
    }, 500)
  }, [id])

  function editPost(project) {
    setMessage('')

    if (project.budget < project.cost) {
      setMessage('O orçamento não pode ser menor que o custo do projeto!')
      setType('error')
      setTimeout(() => {
        setMessage('')
      }, 600);
      return false
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(project)
    })
      .then(resp => resp.json())
      .then(data => {
        setProject(data)
        setShowProjectForm(false)
        setMessage('Projeto atualizado!')
        setType('success')
      })
      .catch(err => console.log(err))
  }

  function createService(project) {
    const latestService = project.services[project.services.length - 1]

    latestService.id = uuidv4()

    const latestServiceCost = latestService.cost
    const newCost = parseFloat(project.cost) + parseFloat(latestServiceCost)

    if (newCost > parseFloat(project.budget)) {
      setMessage('Orçamento ultrapassado, verifique o valor do serviço')
      setType('error')
      project.services.pop()
      setTimeout(() => {
        setMessage('')
      }, 600);
      return false
    }

    project.cost = newCost

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(project)
    })
      .then(resp => resp.json())
      .then(data => {
        setServices(data.services)
        setShowServiceForm(false)
      })
      .catch(err => console.log(err))
  }

  function removeService(id, cost) {
    setMessage('')
    const servicesUpdated = project.services.filter(
      (service) => service.id !== id
    )

    const projectUpdated = project
    projectUpdated.services = servicesUpdated
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(projectUpdated)
    })
      .then(resp => resp.json())
      .then((data) => {
        setProject(projectUpdated)
        setServices(servicesUpdated)
        setMessage('Serviço removido com sucesso!')
        setType('success')
      })
      .catch(err => console.log(err))
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm)
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm)
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass='column'>
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria:</span> {project.category.name}
                  </p>
                  <p>
                    <span>Total de orçamento:</span> R${project.budget}
                  </p>
                  <p>
                    <span>Total utilizado:</span> R${project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText='Concluir edição'
                    projectData={project} />
                </div>
              )}
            </div>
            <div className={styles.service_form_container}>
              <h2>Adicione um serviço</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
              </button>
              <div className={styles.project_info}>
                {showServiceForm && <ServiceForm
                  handleSubmit={createService}
                  btnText='Adicionar serviço'
                  projectData={project}
                />}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass='start'>
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                  />
                ))
              }
              {services.length === 0 && <p>Não há serviços cadastrados</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}