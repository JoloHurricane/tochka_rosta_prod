import React , {useCallback, useContext, useEffect, useState} from "react";
import DocumentFileUploadFields from './DocumentFileUploadFields'
import {NavLink,Link} from "react-router-dom";
import {useHttp} from '../hooks/http.hook'
import {Loader} from '../components/Loader'
import {useMessage} from "../hooks/message.hook"

function DocumentFileUpload(){
    function submitHandler(event){
        event.preventDefault()
    }
   
    const {request, loading} = useHttp()
    const message = useMessage()
    const [form,setForm] = useState({id:''})
    const [categories, setCategories] = useState([])
    const [searchTerm,setSearchTerm] = useState('')
    const [files,setFiles] = useState()
    

    const handleSelect=(e)=>{
      
        setForm({...form,id:e.target.value})
    }
      
    const handleImageChange= e=> {
        e.preventDefault();
     
         const files = e.target.files
         
         setFiles(files)

        
         
       }

    const handleSearch=(e)=>{
        setSearchTerm(e.target.value)
       
    }

    const fetchCategories = useCallback(async () => {
        try {
            const fetched = await request('/api/documents-edit/documents-categories', 'GET', null)
            setCategories(fetched)
           
           
    } catch (e) {}
  }, [request])
  
  useEffect(() => {
    fetchCategories()
    
  }, [fetchCategories])

  if (loading) {
    return <Loader/>
  }

 
  const createImg = async()=>{
    try{
        const dataForm = new FormData()
        for (const f of files){
          dataForm.append("files", f)
        }
        const data=await request(`/api/documents-edit/add-file-create`,'POST',{...form} , 
        {},'application/json')
         message(data.message)
        const images = await request(`/api/documents-edit/add-file`,'POST',dataForm, 
        {},)
        message(images.message)
    }catch(e){}
}



    return(
        <>
             <div className="row">
            
            <div className="adm-form col s12 m12">
           
                <form onSubmit={submitHandler} method="post" enctype="multipart/form-data">
               
                        <DocumentFileUploadFields 
                        handleSearch={handleSearch} 
                        handleSelect={handleSelect} 
                        categories={categories} 
                        stateSearch={searchTerm}
                        handleImageChange={handleImageChange}
                        title="Загрузка файлов для категории документов"/>
                     <div className="row">
                    <div  className="input-field col s3 offset-s3  m2 offset-m4  l1 offset-l4  btn-form">
                        <button onClick={createImg} type="submit" className="btn green waves-effect waves-light">Создать</button>
                    </div>
                    {/* <div  className="input-field col s3 offset-s3  m2 offset-m4  l1 offset-l4  btn-form">
                        <button onClick={check} type="submit" className="btn waves-effect waves-light">Check</button>
                    </div> */}
                    <div  className="input-field col s4   m1  l1  btn-form">
                        <Link to="/admpage/galleryCategory-update" className="btn blue waves-effect waves-light disabled">Обновить</Link>
                    </div>
                           
                    </div>
                </form>               
            </div>
        </div>
        </>
    )
}

export default DocumentFileUpload