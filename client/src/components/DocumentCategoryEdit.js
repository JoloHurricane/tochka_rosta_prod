import React, {useEffect,useContext,useState,useCallback} from 'react'
import {useParams} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import {useHttp} from "../hooks/http.hook" 
import {useMessage} from "../hooks/message.hook"
import {Loader} from '../components/Loader'
import DocumentCategoryFields from '../components/DocumentCategoryFields'
import M from "materialize-css"


function GalleryCategoryFormEdit(){
    function submitHandler(event){
        event.preventDefault()
    }

    const auth = useContext(AuthContext)
    const currentRoute = window.location.pathname
    const message = useMessage()
    const {loading,error,request,clearError} = useHttp()
    const [form,setForm] = useState({
      title:'',
     
      
    }) 
    const [categories, setCategories] = useState([])
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



        const fetchCategories = useCallback(async () => {
          try {
                const fetched = await request('/api/documents-edit/documents-categories', 'GET', null)
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

        
        
       
          useEffect(async()=>{
            if (id!==''){
              const fetched = await request(`/api/documents-edit/documents-categories/${id}`, 'GET', null)
                  
                  setForm({...form,title:fetched.title})
        
               
              
        } },[id,request])

          const deleteHandler = async()=>{
              try{
                const data=await request(`/api/documents-edit/delete/${id}`,'POST',{} , 
                {},'application/json')
                message(data.message)
                const newArr = categories.filter(elem => elem._id !== id)
                setCategories([...newArr])
                setForm({title:''})
              }catch(e){}
          }
    
          const updateHandler= async ()=>{
            try{
              
              const data=await request(`/api/documents-edit/update/${id}`,'POST',{...form} , 
              {},'application/json')
              message(data.message)
              const newArr = categories.filter(elem => elem._id == id)
              newArr[0].title=form.title
              const newArrFull=categories.filter(elem => elem._id !== id)
              setCategories([...newArr,...newArrFull])
              
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
               
                        <DocumentCategoryFields 
                         changeHandler={changeHandler} 
                         state={form} 
                         handleSearch={handleSearch}
                         handleSelect={handleSelect}
                         title="Обновление категории документов"
                         categories={categories}
                         stateSearch={searchTerm}
                         currentRoute={currentRoute}/>
                     <div className="row">
                    <div  className="input-field col s3 offset-s5  m2 offset-m5  l1 offset-l4  btn-form">
                        <button onClick={updateHandler} type="submit" className="btn blue waves-effect waves-light">Обновить</button>
                    </div>
                   
                           
                    </div>
                </form>
                <div  className="form-delete col s1 offset-s5  m1 offset-m5  l1 offset-l4 ">
                     <form onSubmit={submitHandler} method="post">
                        <button type="submit" className="btn red accent-3 waves-effect waves-light modal-trigger" 
                        data-target="modal1">Удалить</button> 
                    </form> 
            </div>           
            </div>
        </div>
        </>
    )
}

export default GalleryCategoryFormEdit