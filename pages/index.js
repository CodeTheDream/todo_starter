import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'

const Index = () => {
  const [todoType, setTodoType] = useState()
  const [userInput, setUserInput] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/todo',
        {
          title: userInput,
          completed: false,
          category: todoType
        }

      ).then((response) => console.log('sucess', response))
    } catch (error) {
      console.log('Message', error)
    }
  }
  const handleChange = (e) => {
    setUserInput(e.target.value)

  }
  const handleClick = (list) => {
    router.push({
      pathname: '/todoList',
      query: { slug: list }
    })
  }

  return (

    <div className={styles.indexMainDiv}>
      <section className={styles.cardSectionIndex}>
        <div className={styles.cardIndex}>Work <span onClick={() => handleClick('work')}>view</span></div>
        <div className={styles.cardIndex}>Personal <span onClick={() => handleClick('personal')}>view</span></div>
      </section>
      <section className={styles.cardSection2}>
        <h1 className={styles.indexH1}>Add Todo</h1>
        <form onSubmit={handleSubmit} className={styles.form} >
          <div className={styles.newInput}>
            <div className={styles.inputDropdown}>
              <input type="text" placeholder="Enter your todo..." onChange={handleChange} className={styles.todoInput} />
              <select onClick={(e) => setTodoType(e.target.value)} >
                <option>Work</option>
                <option>Personal</option>
              </select>
            </div>
            <button type="submit" className={styles.addBtn}>Add</button>
          </div>
        </form>
      </section>
    </div>
  )

}
export default Index;
