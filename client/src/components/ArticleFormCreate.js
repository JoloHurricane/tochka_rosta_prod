import React,{useEffect,useContext,useState} from "react";
import {Link} from 'react-router-dom'
import ArticleFormFields from "./ArticleFormFields"
import { AuthContext } from '../context/AuthContext'
import {useHttp} from "../hooks/http.hook" 
import {useMessage} from "../hooks/message.hook"

function ArticleForm(){

    const currentRoute= window.location.pathname
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading,error,request,clearError} = useHttp()
    const [form,setForm] = useState({
      title:'',
      text:'',
      date:'',
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

          const handleImageChange= e=> {
           e.preventDefault();
        
            const file = e.target.files[0]
            setFile(file)

            
            
          }
    
          const createHandler= async ()=>{
            try{
              const dataForm = new FormData()
              dataForm.append("file", file)
              const data=await request('/api/articles-edit/create','POST',{...form} , 
              {Authorization: `Bearer ${auth.token}`},'application/json')
              message(data.message)
             

              const imgdata = await request('/api/articles-edit/upload-img','POST',dataForm, 
              {},)
              message(imgdata.message)
              
            }catch(e){
      
            }
        }

    return(
        
        <>
        <div className="row">
            
            <div className="adm-form col s12 m12">
           
                <form onSubmit={submitHandler} method="post" enctype="multipart/form-data">
               
                        <ArticleFormFields 
                        changeHandler={changeHandler} 
                        state={form} 
                        title="Создание новости"
                        articles={articles}
                        handleImageChange={handleImageChange}
                        currentRoute={currentRoute}/>
                     <div className="row">
                    <div  className="input-field col s3 offset-s3  m2 offset-m4  l1 offset-l4  btn-form">
                        <button type="submit" 
                        className="btn green waves-effect waves-light"
                        disabled={loading}
                        onClick={createHandler}
                        >Создать</button>
                    </div>
                    <div  className="input-field col s4   m1  l1  btn-form">
                        <Link style={{marginLeft:'60px'}} to="/admpage/article-update" className="btn blue waves-effect waves-light">Обновить</Link>
                    </div>
                           
                    </div>
                </form>               
            </div>
        </div>
           
                    
        </>
   
            
        

    )

}

export default ArticleForm