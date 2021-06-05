import React,{useEffect, useContext,useState,useCallback} from "react";
import {Link} from 'react-router-dom'
import DocumentCategoryFields from './DocumentCategoryFields'
import { AuthContext } from '../context/AuthContext'
import {useHttp} from "../hooks/http.hook" 
import {useMessage} from "../hooks/message.hook"
import {useParams} from 'react-router-dom'

function EventsEdit(){
    function submitHandler(event){
        event.preventDefault()
    }
    const currentRoute = window.location.pathname
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading,error,request,clearError} = useHttp()
    const [form,setForm] = useState({
      title:'',
      date:'',
      deteEnd:'',
      _id:''
      
    
      
    }) 
  
    const [id,setId] = useState('')

    const [events, setEvents] = useState([])
   

    useEffect(() => {
      window.M.updateTextFields()
    },)

        useEffect(()=>{
            message(error)
            clearError()
          },[error,message,clearError])

          const changeHandler = e=>{
            setForm({...form, [e.target.name]: e.target.value})
          }  

          const fetchEvents = useCallback(async () => {
            try {
                  const fetched = await request('/api/events-edit/events', 'GET', null)
                  setEvents(fetched)
                  
                 
          } catch (e) {}
        }, [request])
        
        useEffect(() => {
          fetchEvents()
          
        }, [fetchEvents])

        const deleteHandler = async(e)=>{
          try{
            const data=await request(`/api/events-edit/delete/${e.target.name}`,'POST',{} , 
            {},'application/json')
            message(data.message)
           const newArr = events.filter(elem => elem._id !== e.target.name);
            
             setEvents([...newArr])
            
          }catch(e){}

      }
      
          const createHandler= async ()=>{
            try{
             
              const data=await request('/api/events-edit/create','POST',{...form} , 
              {},'application/json')
              message(data.message)
              setEvents(prevArr=>[{title:form.title,createdAt:data.createdAt,createdEnd:data.createdEnd,_id:data._id},...prevArr,])
            
           
              
              
  
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
                    <input id="date" name="date" type="text" class="" 
                        value={form.date} onChange={changeHandler} />
                      <label for="date">Дата начала</label>
                    </div> 
                  <div className="input-field col s4 l2">
                    <input id="dateEnd" name="dateEnd" type="text" class="" 
                          value={form.dateEnd} onChange={changeHandler}   />
                      <label for="dateEnd">Дата конца</label>
                    </div> 
                  <div className="input-field col s2">
                  <button onClick={createHandler}  type="submit" className="btn green waves-effect waves-light">Создать</button>
                    </div>    
                </form> 

            </div>
            <div className="col s12 m12">
                <div className="table col s12 m10 offset-m2 ">
                <table>
        <thead>
          <tr>
              <th>Название</th>
              <th>Дата начала</th>
              <th>Дата окончания</th>
              <th></th>
              <th></th>
          </tr>
        </thead>

        <tbody>
        {!loading && events.map((event,index)=>{
                    return(
                      <tr key={index}>
                        <td>{event.title}</td>
                        <td>{event.createdAt}</td>
                        <td>{event.createdEnd}</td>
                        <td> <Link className="btn blue waves-effect waves-light btn-small" to={`/admpage/eventUpdate/${event._id}`}>Обновить</Link></td>
                        <td> <button name={event._id} onClick={deleteHandler} type="submit" className="btn red waves-effect waves-light btn-small">Удалить</button></td>
                      </tr>
                    )
                  })}
         
         
        </tbody>
      </table>
                </div>
            </div>
        </div>
        </>
    )


}

 export default EventsEdit;