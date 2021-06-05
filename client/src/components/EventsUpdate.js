import React,{useEffect, useContext,useState,useCallback} from "react";
import {Link} from 'react-router-dom'
import DocumentCategoryFields from './DocumentCategoryFields'
import { AuthContext } from '../context/AuthContext'
import {useHttp} from "../hooks/http.hook" 
import {useMessage} from "../hooks/message.hook"
import {useParams} from 'react-router-dom'

function EventsUpdate(){
    function submitHandler(event){
        event.preventDefault()
    }
    const eventId = useParams().id
    const currentRoute = window.location.pathname
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading,error,request,clearError} = useHttp()
    const [form,setForm] = useState({
      title:'',
      createdAt:'',
      createdEnd:''
    
      
    }) 

        useEffect(()=>{
            message(error)
            clearError()
          },[error,message,clearError])

          const changeHandler = e=>{
            setForm({...form, [e.target.name]: e.target.value})
          }  

          const fetchEvents = useCallback(async () => {
            try {
                  const fetched = await request(`/api/events-edit/events/${eventId}`, 'GET', null)
             
                  setForm({...form,...fetched})
                  
                 
          } catch (e) {}
        }, [request])
        
        useEffect(() => {
          window.M.updateTextFields()
        },)
        useEffect(() => {
          fetchEvents()
          
        }, [fetchEvents])
    
          const updateHandler= async ()=>{
            try{
             
              const data=await request(`/api/events-edit/update/${eventId}`,'POST',{...form} , 
              {},'application/json')
              message(data.message)
              
  
            }catch(e){
      
            }
        }
    return(

        <>
         <div className="row">
            
            <div className="adm-form col s12 m12">
           
                <form onSubmit={submitHandler} method="post" enctype="multipart/form-data" style={{paddingTop:"40px"}}>
                  <div className="input-field col offset-l2 s4">
                   <input id="title" name="title" type="text" class="" 
                      value={form.title} onChange={changeHandler}  />
                    <label for="title">Название</label>
                  </div>
                  <div className="input-field col s4 l2">
                    <input id="date" name="createdAt" type="text" class="" 
                        value={form.createdAt} onChange={changeHandler} />
                      <label for="date">Дата начала</label>
                    </div> 
                  <div className="input-field col s4 l2">
                    <input id="dateEnd" name="createdEnd" type="text" class="" 
                          value={form.createdEnd} onChange={changeHandler}   />
                      <label for="dateEnd">Дата конца</label>
                    </div> 
                  <div className="input-field col s2">
                  <button onClick={updateHandler}  type="submit" className="btn blue waves-effect waves-light">Обновить</button>
                    </div>    
                </form> 

            </div>
     
        </div>
        </>
    )


}

 export default EventsUpdate;