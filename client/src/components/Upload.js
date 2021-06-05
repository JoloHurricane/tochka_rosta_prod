import React ,{useEffect,useContext,useState} from 'react'
import { AuthContext } from '../context/AuthContext'
import {useHttp} from "../hooks/http.hook" 
import {useMessage} from "../hooks/message.hook"
import {Loader} from "../components/Loader"
 
function Upload(){
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading,error,request,clearError} = useHttp()
    function submitHandler(event){
        event.preventDefault()
    }

    const [files,setFiles] = useState()

    
    const handleImageChange= e=> {
        e.preventDefault();
         const files = e.target.files
         setFiles(files)
       }

    const uploadHandler= async ()=>{
        try{
          const dataForm = new FormData()
          for (const f of files){
            dataForm.append("files", f)
          }
          for(const [key,value] of dataForm){
          }
       
          
        
            const imgdata = await request('/api/upload','POST',dataForm, 
            {},)
            message(imgdata.message)
          
          
        }catch(e){
           
        }
    }
if (loading){
	return <Loader/>
}
    return(
        <>
             <div className="row">
            
            <div className="adm-form col s12 m12">
           
                <form onSubmit={submitHandler} method="post" enctype="multipart/form-data">
               
                <div class="row">
                <h4 className="col s8 offset-s4">Загрузка файлов</h4>
               
                    
                   
                    <div className="input-field label-file-input col s3 offset-s2  m6 offset-m5  l1 offset-l4">
                        <label for="file">Файлы</label>
                      
                    </div>
                    <div className="input-field label-file-input col s2 m6 offset-m5  l4">
                     
                        <input onChange={handleImageChange} type="file" id="files" name="files" multiple/>
                    </div>
                     </div>
                     <div className="row">
                    <div  className="input-field col s3 offset-s3  m2 offset-m4  l1 offset-l4  btn-form">
                        <button onClick={uploadHandler} type="submit" className="btn green waves-effect waves-light">Загрузить</button>
                    </div>
                   
                           
                    </div>
                </form>               
            </div>
        </div>
        </>
    )
}
export default Upload
