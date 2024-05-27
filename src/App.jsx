import "./styles.css";
import { NewToDoForm } from "./NewFormToDo";
import { useState, useEffect } from "react"
import { ToDoList } from "./ToDoList";

export default function App(){
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if(localValue== null) return []

    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

function toggleToDo(id, completed){
  setTodos(currentToDos => {
    return currentToDos.map(todo => {
      if(todo.id === id){
        return {...todo, completed}
      }

      return todo
  })
})
}

function deleteToDo(id){
  setTodos(currentToDos => {
    return currentToDos.filter(todo => todo.id !== id)
  })
}

function addToDo(title){
        setTodos(currentToDos => {
        return [
          ...currentToDos,
          {
            id: crypto.randomUUID(), title, completed: false
          },
        ]
      })
}

  return (
    <>
    <NewToDoForm onAdd={addToDo} />
    <h1 className="header">To do List</h1>
    <ToDoList todos={todos} toggleToDo={toggleToDo} deleteToDo={deleteToDo}/>
    </>
  )
}
