import React ,{useEffect,useContext,useState,useCallback} from "react";
import ArticleFormFields from "./ArticleFormFields";
import {useParams} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import {useHttp} from "../hooks/http.hook" 
import {useMessage} from "../hooks/message.hook"
import {Loader} from '../components/Loader'
import M from "materialize-css"


let paramId = ''

function ArticleFormEdit(){
    const currentRoute= window.location.pathname
    const auth = useContext(AuthContext)
    const articleId = useParams().id
    const message = useMessage()
    const {loading,error,request,clearError} = useHttp()
    const [form,setForm] = useState({
      title:'',
      text:'',
      date:'',
      _id:'',
    })
    const [id,setId] = useState('') 
    const [searchTerm,setSearchTerm] = useState('')
    const [articles, setArticles] = useState([])
    const [file,setFile] = useState()

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

    const handleSelect=(e)=>{
      
        setId(e.target.value)
        
        
    }
    const handleSearch=(e)=>{
        setSearchTerm(e.target.value)
    }

    

      const changeHandler = e=>{
        setForm({...form, [e.target.name]: e.target.value})
      }  

      
      const handleImageChange= e=> {
        e.preventDefault();
     
         const file = e.target.files[0]
         setFile(file)

         
       }


          const fetchArticles = useCallback(async () => {
            try {
                const fetched = await request('/api/articles-edit/articles', 'GET', null)
                setArticles(fetched)
               
               
        } catch (e) {}
      }, [request])

     

      useEffect(()=>{
        message(error)
        clearError()
      },[error,message,clearError])
      
      useEffect( async () => {
        fetchArticles()
        
      }, [fetchArticles])

        useEffect( async() => {
        
            try {
                const currentRoute= window.location.pathname
                if(currentRoute!=='/admpage/article-update'){
                    const fetched = await request(`/api/articles-edit/${articleId}`, 'GET', null)
                    setForm({...form,title:fetched.title,date:fetched.createdAt,text:fetched.sanitizedHtml})
                }
               
               
              } catch (e) {}
          },[request])


          useEffect(async()=>{
              if (id!==''){
                const fetched = await request(`/api/articles-edit/${id}`, 'GET', null)
                    setForm({...form,title:fetched.title,date:fetched.createdAt,text:fetched.sanitizedHtml})
          
              }
                    
          },[id,request])


          const deleteHandler = async()=>{
              try{
                
                if(articleId!==undefined){
                  const data=await request(`/api/articles-edit/delete/${articleId}`,'POST',{} , 
                  {},'application/json')
                  message(data.message)
                }else{
                 const  data=await request(`/api/articles-edit/delete/${id}`,'POST',{} , 
                {},'application/json')
                message(data.message)
                const newArr = articles.filter(elem => elem._id !== id)
                setArticles([...newArr])
                setForm({title:'',text:'',date:''})
                }
                
               
              }catch(e){}
          }
    
          const updateHandler= async ()=>{
            try{
         
              const dataForm = new FormData()
              dataForm.append("file", file)
              if (articleId!==undefined){
                const data=await request(`/api/articles-edit/update/${articleId}`,'POST',{...form} , 
                {},'application/json')
                message(data.message)
              }
              else{
                const  data=await request(`/api/articles-edit/update/${id}`,'POST',{...form} , 
                {},'application/json')
                message(data.message)
                const newArr = articles.filter(elem => elem._id == id)
                newArr[0].title=form.title
                const newArrFull=articles.filter(elem => elem._id !== id)
                setArticles([...newArr,...newArrFull])
                
              }
             
              
                if (file !== undefined){
                    const imgdata = await request('/api/articles-edit/upload-img','POST',dataForm, 
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
           
                <form onSubmit={submitHandler} method="post" encType="multipart/form-data">
               
                        <ArticleFormFields 
                        changeHandler={changeHandler} 
                        state={form}
                        idSelect={id} 
                        handleImageChange={handleImageChange}
                        handleSearch={handleSearch}
                        handleSelect={handleSelect}
                        articles={articles}
                        stateSearch={searchTerm}
                        title="Обновление новости"
                        articleId={articleId}
                        currentRoute={currentRoute}
                        />
                     <div className="row">
                    <div  className="input-field col s3 offset-s5  m2 offset-m5  l1 offset-l4  btn-form">
                        <button disabled={loading} 
                        type="submit" 

                        className="btn blue waves-effect waves-light" 
                        onClick={updateHandler}>Обновить</button>
                    </div>
                    <div  className="input-field col s3 offset-s5  m2 offset-m5  l1 offset-l4  btn-form">
                        <button disabled={loading} 
                        type="submit" 
                        style={{marginLeft:'20px'}}
                        className="btn red accent-3 waves-effect waves-light modal-trigger" 
                        
                        data-target="modal1">Удалить</button>
                    </div>
                
             
                   
                           
                    </div>
                </form>
                  
            </div>
        </div>
        </>

    )
}

export default ArticleFormEdit