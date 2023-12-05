import Input from '../form/input/Input'
import Select from '../form/select/Select'
import styles from './ProjectForm.module.css'
import SubmitButton from '../form/submitButton/SubmitButton'

import { useEffect, useState } from 'react'


export default function ProjectForm({ btnText }) {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <form className={styles.form}>
      <Input
        type='text'
        text='Nome do projeto'
        name='name'
        placeholder='Insira o nome do projeto' />
      <Input
        type='number'
        text='Orçamento do projeto'
        name='budget'
        placeholder='Insira o orçamento total' />

      <Select
        name='category_id'
        text='Selecione a categoria'
        options={categories} />

      <SubmitButton text={btnText} />
    </form>
  )
}