import React,{useEffect, useContext,useState} from "react";
import {Link} from 'react-router-dom'
import DocumentCategoryFields from './DocumentCategoryFields'
import { AuthContext } from '../context/AuthContext'
import {useHttp} from "../hooks/http.hook" 
import {useMessage} from "../hooks/message.hook"

function DocumentCategoryCreate(){
    function submitHandler(event){
        event.preventDefault()
    }
    const currentRoute = window.location.pathname
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading,error,request,clearError} = useHttp()
    const [form,setForm] = useState({
      title:'',   
    }) 
   
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

     
    
          const createHandler= async ()=>{
            try{
             
              const data=await request('/api/documents-edit/create','POST',{...form} , 
              {},'application/json')
              message(data.message)
              
  
            }catch(e){
      
            }
        }
    return(

        <>
         <div className="row">
            
            <div className="adm-form col s12 m12">
           
                <form onSubmit={submitHandler} method="post" enctype="multipart/form-data">
               
                        <DocumentCategoryFields title="Создание категории файлов"
                        changeHandler={changeHandler} 
                        state={form} 
                        currentRoute={currentRoute}/>
                     <div className="row">
                    <div  className="input-field col s3 offset-s3  m2 offset-m4  l1 offset-l4  btn-form">
                        <button type="submit" className="btn green waves-effect waves-light" 
                        onClick={createHandler}
                        disabled={loading}>Создать</button>
                    </div>
                    <div  className="input-field col s4   m1  l1  btn-form">
                        <Link style={{marginLeft:'60px'}} to="/admpage/documentCategory-update" className="btn blue waves-effect waves-light">Обновить</Link>
                    </div>
                           
                    </div>
                </form>               
            </div>
        </div>
        </>
    )


}

 export default DocumentCategoryCreate;