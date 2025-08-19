import { useState } from 'react'
import './css/ToDo.css'
import { useRef } from 'react';
import { useEffect } from 'react';
import TodoItems from './TodoItems';
let count=0;
const ToDo = () => {

    const [todo,setTodos]= useState([]); //user state hook

    const inputRef = useRef(null);

    const add = ()=>{
        setTodos([...todo,{no:count++,text:inputRef.current.value,display:""}])
        inputRef.current.value="";
        localStorage.setItem("todo_count",count)
    }

    useEffect(()=>{
        setTodos(JSON.parse(localStorage.getItem("todo")))
        count=localStorage.getItem("todo_count")
    },[])


    useEffect(()=>{
        setTimeout(()=>{
            console.log(todo)
            localStorage.setItem("todo",JSON.stringify(todo))
        },100)
    },[todo])

   
  return (
    <div className='todo'>
        <div className="todo-header">To-Do List</div>
        <div className="todo-add">
            <input type="text" placeholder="Add Your Task" className="todo-input" ref={inputRef} />
            <div className="todo-button" onClick={()=>{add()}}>ADD</div>
        </div>
        <div className="Todo-list"></div>
        {todo.map((item,index)=>{
                return <TodoItems key={index} setTodos={setTodos} no={item.no} display={item.display} text={item.text}/>
        })}
    </div>
  )
}

export default ToDo