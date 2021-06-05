import React,{useEffect,useContext,useState} from "react";
import {Link} from 'react-router-dom'
import ArticleFormFields from "./ArticleFormFields"
import { AuthContext } from '../context/AuthContext'
import {useHttp} from "../hooks/http.hook" 
import {useMessage} from "../hooks/message.hook"

function UsersFormCreate(){

    const currentRoute= window.location.pathname
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading,error,request,clearError} = useHttp()
    const [form,setForm] = useState({
      title:'',
      text:'',
   
    }) 
    const [articles, setArticles] = useState([])
    const [file,setFile] = useState()
   
        function submitHandler(event){
            event.preventDefault()
        }

        useEffect(()=>{
            message(error)
            clearError()
          },[error,message,clearError])

          const changeHandler = e=>{
            setForm({...form, [e.target.name]: e.target.value})
          }  

         
          const createHandler= async ()=>{
            try{
                const data=await request('/api/auth/register','POST',{...form},{},"application/json")
                message(data.message)
              }catch(e){
        
              }
        }

    return(
        
        <>
        <div className="row">
        <h4 className="col s8 offset-s4">Создание пользователя</h4>
            <div className="adm-form col s12 m12">
           
                <form style={{paddingTop:"60px"}} onSubmit={submitHandler} method="post" enctype="multipart/form-data">
                <div className="row ">
                    <div class="input-field col s12 m5 offset-m3 l5 offset-l5">
                        <input value={form.login} onChange={changeHandler} id="login" name="login"  type="text" />
                        <label for="login">Логин</label>
                     </div>
                    <div class="input-field col s12 m5 offset-m3 l5 offset-l5">
                        <input value={form.password} onChange={changeHandler} id="password" name="password" type="password" />
                        <label for="password">Пароль</label>
                     </div>
                     
                    </div>
                    
                     <div className="row">
                    <div  className="input-field col s3 offset-s3  m2 offset-m4  l1 offset-l5  btn-form">
                        <button type="submit" 
                        className="btn green waves-effect waves-light"
                        disabled={loading}
                        onClick={createHandler}
                        >Создать</button>
                    </div>
                   
                           
                    </div>
                </form>               
            </div>
        </div>
           
                    
        </>
   
            
        

    )

}

export default UsersFormCreate