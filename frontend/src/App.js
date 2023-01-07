import React from 'react';
import './App.css';
import {useEffect ,useState} from 'react'
import TodoList from './component/TodoList';

function App() {

  const [todos,setTodos]=useState([])
  const [note ,setNote]=useState(null)
  const [value,setValue]=useState('')
  const [editing,setEditing]=useState(false)
  const [noteid,setNoteid]=useState(null)


  useEffect(()=>{
    getNotes()

  },[])
 
 
  let getNotes=async()=>{
  let response =await fetch('http://127.0.0.1:8000/api/list/')
  let data=await response.json()
  setTodos(data)
 }

 let handleSubmit=(e)=>{
  e.preventDefault()
  if(editing){
    editFunc()
  }else{
    createNote()
  }
 }



 let createNote= async (e)=>{
        
    
          fetch('http://127.0.0.1:8000/api/create/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note)
          }).then((response)  => {
          getNotes()
          setNote(null)
          setValue('')
          }).catch(function(error){
          console.log('ERROR:', error)
            })

            console.log("createnote-note",note)
            console.log("createnote-t-value",value)
            
        }
      


 
 let editFunc=()=>{


  fetch(`http://127.0.0.1:8000/api/update/${noteid}/`, {
    method:'POST',
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify(note)
  }).then(() => {
    getNotes()
    setNote(null)
    setValue('')
    setEditing(false)

  })

 }

let handleChange = (value) => {
  setNote(note => ({ ...note, 'title': value }))
  console.log('Handle Change:', note)
 
  setValue(value)
}




    let editClick=({id,title})=>{

      // console.log(id.id)
      console.log(title)
      setValue(title)
      setEditing(true)
      setNoteid(id)
      console.log(id)
    }

        
 let deleteFunc=({id})=>{

    fetch(`http://127.0.0.1:8000/api/delete/${id}/`, {
      method:'DELETE',
       headers:{
        'Content-type':'application/json',
       },
        }).then(res=>{getNotes()})
        }


                                
    return(
    <div className="App">
      <div className='form-wrapper'>
        <form id="form">
            <div className="flex-wrapper">
                <div style={{flex: 6}}>
                    <input onChange ={(e)=>handleChange(e.target.value)} value={value} className="form-control" id="title" type="text" name="title" placeholder="Add task.." />
                </div>

                <div style={{flex: 1}}>
                    <input id="submit" onClick={handleSubmit} value='submit' className="btn btn-warning" type="button" name="Add" />
              </div>
            </div>
        </form>
      </div>
      <div className='list-wrapper'>
            
                    {todos.map(function(todo, index){
                      return(
                         < TodoList deleteFunc={deleteFunc} editClick={editClick} id={todo.id} title={todo.title}/>
                        )
                    })}
              </div>    
    </div>
  );
};
export default App
