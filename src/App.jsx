import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';
function App() {
  const [todo, settodo] = useState(" ")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)
  useEffect(() => {
    let todoString= localStorage.getItem("todos")
    if(todoString){

    let todos = JSON.parse(localStorage.getItem("todos"))
    settodos(todos)}
  }, [])

  const save = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  const toggleFinished = (e)=>{
    setshowFinished(!showFinished)
  }
  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    settodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id != id;
    })
    settodos(newTodos)
    save();
  }
  const handleDelete = (e, id) => {

    let newTodos = todos.filter(item => {
      return item.id != id;
    })
    settodos(newTodos)
  }
  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    save();

  }
  const handleChange = (e) => {
    settodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let Index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[Index].isCompleted = !newTodos[Index].isCompleted;
    settodos(newTodos)
    save();

  }
  return (
    <>
      <Navbar />
      <div className="mx-auto md:container my-5 rounded-xl p-5 bg-violet-100 min-h-screen md:w-1/2 w-[90%]">
      <h1 className='font-bold text-center text-xl'>Task manager - Just Do it</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md disabled:bg-violet-700'>Save</button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <h2 className="text-lg font-bold my-4">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to Display</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className=" todo flex md:w-1/2 justify-between my-3">
              <div className="flex gap-5">
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id='' />
                <div className={item.isCompleted ? "line-through" : ""} >{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete /></button>
              </div>
            </div>
          })}

        </div>
      </div>

    </>
  )
}

export default App