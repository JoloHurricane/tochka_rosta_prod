import React,{useEffect,useCallback,useState,useContext} from 'react'
import M from 'materialize-css'
import { AuthContext } from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from "../hooks/message.hook"
import {Link} from 'react-router-dom'

function Events(){
    const auth = useContext(AuthContext)
    const {loading,error,request,clearError} = useHttp()
    const message = useMessage()
    const [events, setEvents] = useState([])
     
  
    useEffect(()=>{
    
        var elems = document.querySelectorAll('.parallax');
        var instances = M.Parallax.init(elems, );
    },)
    useEffect(()=>{
              message(error)
              clearError()
            },[error,message,clearError])

    
            const fetchEvents = useCallback(async () => {
                try {
                      const fetched = await request('/api/events-edit/events', 'GET', null)
                      setEvents(fetched)
                      
                     
              } catch (e) {}
            }, [request])
            
            useEffect(() => {
              fetchEvents()
              
            }, [fetchEvents])  

    if (loading) {
    return <Loader/>
  }

  
    
    return(
        <>
        <div style={{backgroundColor:"#000",position:"relative"}}>
   
                <div className="parallax-container">
                        <div className="parallax"><img className="" alt="asd" src="/images/event3.jpg"></img></div>
                    
                    </div>
                    <h2   className="big-title color white-text center-align">Предстоящие события</h2> 
         </div>
        <div className="container">
            <div className="row">
                <div className="col s12">
                    
                    <h3></h3>
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
                       
                      </tr>
                    )
                  })}
         
         
        </tbody>
      </table>
                </div>
                </div>
            </div>
           
        </div>
        </>
    )
}

export default Events