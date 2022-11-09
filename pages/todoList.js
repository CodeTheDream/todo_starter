import React, { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios';
import { useRouter } from 'next/router'

function List() {
  const [todoList, setTodoList] = useState([])
  const router = useRouter()
  const list = router.query.slug
  console.log('list', list)
  const getData = async () => {
    try {
      const response = await axios.get('/api/todo')
      const data = response.data.data
      if (list === 'work') {
        setTodoList(data.filter((item) =>
          item.category === 'Work'
        ))
      } else {
        setTodoList(data.filter((item) =>
          item.category === 'personal'
        ))
      }

    } catch (error) {
      console.log('message', error)
    }
  }
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/todo/${id}`)
      setTodoList((prev) => prev.filter((item) => item._id !== id))

    } catch (error) {
      console.log(error)
    }
  }
  const updateTodo = (id, status) => {
    axios.put(`/api/todo/${id}`, {
      completed: status
    }).then((res) => {
      console.log(res)
      if (res.status == 200) {
        getData()
      }
    }).catch((error) => {
      console.log(error)
    })
  }


  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <section className={styles.cardSection} >
        <h1 className={styles.indexH1}>List of todos</h1>
        <div className={styles.cardIndexDiv}>
          {
            todoList.map((todo) => {
              return (
                <>
                  <div key={todo._id} className={styles.cardIndex}>
                    <div >
                      <input type="checkbox"
                        checked={todo.completed}
                        onChange={() => updateTodo(todo._id, !todo.completed)
                        } />
                      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</span>
                    </div>
                    <button onClick={() => handleDelete(todo._id)}>Delete</button>
                  </div>
                </>
              )
            })
          }
        </div>
      </section>
    </>
  )
}

export default List

