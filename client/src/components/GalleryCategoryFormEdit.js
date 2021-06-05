import React, {useEffect,useContext,useState,useCallback} from 'react'
import GalleryCategoryFormFields from './GalleryCategoryFormFields'
import {useParams} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import {useHttp} from "../hooks/http.hook" 
import {useMessage} from "../hooks/message.hook"
import {Loader} from '../components/Loader'
import M from "materialize-css"


function GalleryCategoryFormEdit(){
    function submitHandler(event){
        event.preventDefault()
    }

    const auth = useContext(AuthContext)
    const categoryId = useParams().id
    const currentRoute = window.location.pathname
    const message = useMessage()
    const {loading,error,request,clearError} = useHttp()
    const [form,setForm] = useState({
      title:'',
      description:'',
      
    }) 
    const [categories, setCategories] = useState([])
    const [file,setFile] = useState()
    const [searchTerm,setSearchTerm] = useState('')
    const [id,setId] = useState('') 
    
  const handleSearch=(e)=>{
    setSearchTerm(e.target.value)
}
  const handleSelect=(e)=>{
  setId(e.target.value)
  
  }
    

        function submitHandler(event){
            event.preventDefault()
        }

        useEffect(()=>{
          var elems = document.querySelectorAll('.modal');
          var instances = M.Modal.init(elems, {});
        })
        useEffect(() => {
            window.M.updateTextFields()
          },)

        useEffect(  async() => {
        
            try {
                const currentRoute= window.location.pathname
                if(currentRoute!=='/admpage/galleryCategory-update'){
                    const fetched = await request(`/api/galleryCategory-edit/${categoryId}`, 'GET', null)
                    setForm({...form,title:fetched.title,description:fetched.description})
                    setId(fetched._id)
                }
              
              } catch (e) {}
          },[request])

        const fetchCategories = useCallback(async () => {
          try {
                const fetched = await request('/api/galleryCategory-edit/gallery-categories', 'GET', null)
                setCategories(fetched)
                
               
        } catch (e) {}
      }, [request])
      
      useEffect(() => {
        fetchCategories()
        
      }, [fetchCategories])
    
    

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
          useEffect(async()=>{
            if (id!==''){
              const fetched = await request(`/api/galleryCategory-edit/${id}`, 'GET', null)
                  setForm({...form,title:fetched.title,description:fetched.description})
        
            }
               
              
        },[id,request])

          const deleteHandler = async()=>{
              try{
                
                if(categoryId!==undefined){
                  const data=await request(`/api/galleryCategory-edit/delete/${categoryId}`,'POST',{} , 
                  { },'application/json')
                  message(data.message)
                }else{
                   const data=await request(`/api/galleryCategory-edit/delete/${id}`,'POST',{} , 
                  { },'application/json')
                  message(data.message)
                  const newArr = categories.filter(elem => elem._id !== id)
                  setCategories([...newArr])
                  setForm({title:'',description:'',})
                }
                
               
              }catch(e){}
          }
    
          const updateHandler= async ()=>{
            try{
              const dataForm = new FormData()
              dataForm.append("file", file)
           
              if (categoryId!==undefined){
                  const data=await request(`/api/galleryCategory-edit/update/${categoryId}`,'POST',{...form} , 
              {},'application/json')
              message(data.message)
              }else{
                const data=await request(`/api/galleryCategory-edit/update/${id}`,'POST',{...form} , 
              {},'application/json')
                  message(data.message)
                  const newArr = categories.filter(elem => elem._id == id)
                  newArr[0].title=form.title
                  const newArrFull=categories.filter(elem => elem._id !== id)
                  setCategories([...newArr,...newArrFull])
              }
            
                if (file !== undefined){
                    const imgdata = await request('/api/galleryCategory-edit/upload-img','POST',dataForm, 
                    {},)
                    message(imgdata.message)
                }
            
              
            }catch(e){
      
            }
        }
        if (loading) {
          return <Loader/>
        }
    return(

        <>
        <div id="modal1" class="modal">
        <div class="modal-content">
          <h4>Подтверждение действия</h4>
          <p>Вы точно хотите удалить?</p>
        </div>
        <div class="modal-footer">
        <a  href="#!" class="modal-close waves-effect waves-green btn-flat">Закрыть</a>
          <a onClick={deleteHandler} href="#!" class="modal-close waves-effect waves-green btn-flat">Согласен</a>
        </div>
    </div>
          <div className="row">
            
            <div className="adm-form col s12 m12">
           
                <form onSubmit={submitHandler} method="post" enctype="multipart/form-data">
               
                        <GalleryCategoryFormFields 
                         changeHandler={changeHandler} 
                         state={form} 
                         handleImageChange={handleImageChange}
                         handleSearch={handleSearch}
                         handleSelect={handleSelect}
                         title="Обновление данных события"
                         categories={categories}
                         stateSearch={searchTerm}
                         categoryId={categoryId}
                         currentRoute={currentRoute}/>
                     <div className="row">
                    <div  className="input-field col s3 offset-s5  m2 offset-m5  l1 offset-l4  btn-form">
                        <button onClick={updateHandler} type="submit" className="btn blue waves-effect waves-light">Обновить</button>
                    </div>
                   
                           
                    </div>
                </form>
                <div  className="form-delete col s1 offset-s5  m1 offset-m5  l1 offset-l4 ">
                     <form onSubmit={submitHandler} method="post">
                        <button 
                        type="submit" 
                        className="btn red accent-3 waves-effect waves-light modal-trigger" 
                        data-target="modal1">Удалить</button> 
                    </form> 
            </div>           
            </div>
        </div>
        </>
    )
}

export default GalleryCategoryFormEdit