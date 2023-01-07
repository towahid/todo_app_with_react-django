import React, { useState } from 'react'

const TodoList = ({id,title,editClick,deleteFunc}) => {
  
  let handleClick=()=>{

    editClick({id,title})

  }
  let handleDelete=()=>{
    deleteFunc({id})
  }
  
  






  return (
    <div  className="task-wrapper flex-wrapper">

      <div  style={{flex:7}}>
            <span>{title}</span>  
      </div>

      <div style={{flex:1}}>
            <button  onClick={handleClick} className="btn btn-sm btn-outline-info">Edit</button>
      </div>
      <div style={{flex:1}}>
            <button onClick={handleDelete} className="btn btn-sm btn-outline-dark delete">Delete</button>
      </div>

    </div>
  )
}

export default TodoList