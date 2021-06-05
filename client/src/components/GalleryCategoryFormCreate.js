import React,{useEffect, useContext,useState} from "react";
import {Link} from 'react-router-dom'
import GalleryCategoryFormFields from "./GalleryCategoryFormFields"
import { AuthContext } from '../context/AuthContext'
import {useHttp} from "../hooks/http.hook" 
import {useMessage} from "../hooks/message.hook"
import {Loader} from '../components/Loader'

function GalleryCategoryForm(){
    function submitHandler(event){
        event.preventDefault()
    }
    const currentRoute = window.location.pathname
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading,error,request,clearError} = useHttp()
    const [form,setForm] = useState({
      title:'',
      description:'',
      
    }) 
    const [file,setFile] = useState()
    
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

          const handleImageChange= e=> {
           e.preventDefault();
        
            const file = e.target.files[0]
            setFile(file)

            
         
          }
    
          const createHandler= async ()=>{
            try{
              const dataForm = new FormData()
              dataForm.append("file", file)
              const data=await request('/api/galleryCategory-edit/create','POST',{...form} , 
              {},'application/json')
              message(data.message)

              const imgdata = await request('/api/galleryCategory-edit/upload-img','POST',dataForm, 
              {},)
              message(imgdata.message)
              
            }catch(e){
      
            }
        }

        if (loading) {
          return <Loader/>
        }


        
    return(

        <>
         <div className="row">
            
            <div className="adm-form col s12 m12">
           
                <form onSubmit={submitHandler} method="post" enctype="multipart/form-data">
               
                        <GalleryCategoryFormFields title="Создание события"
                        changeHandler={changeHandler} 
                        state={form} 
                        handleImageChange={handleImageChange}
                        currentRoute={currentRoute}/>
                     <div className="row">
                    <div  className="input-field col s3 offset-s3  m2 offset-m4  l1 offset-l4  btn-form">
                        <button type="submit" className="btn green waves-effect waves-light" 
                        onClick={createHandler}
                        disabled={loading}>Создать</button>
                    </div>
                    <div  className="input-field col s4   m1  l1  btn-form">
                        <Link style={{marginLeft:'60px'}} to="/admpage/galleryCategory-update" className="btn blue waves-effect waves-light">Обновить</Link>
                    </div>
                           
                    </div>
                </form>               
            </div>
        </div>
        </>
    )


}

 export default GalleryCategoryForm;