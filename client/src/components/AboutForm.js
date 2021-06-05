import React,{useEffect,useContext,useState,useCallback} from 'react'
import {useHttp} from "../hooks/http.hook" 
import {useMessage} from "../hooks/message.hook"
import {Loader} from '../components/Loader'


function AboutForm(){
    function submitHandler(event){
        event.preventDefault()
    }
    useEffect(() => {
        window.M.updateTextFields()
      },)
    const {loading,error,request,clearError} = useHttp()
    const message = useMessage()
    const [form,setForm] = useState({
      text:'',
   
    })

    const [disabled,setDisabled] = useState(false)
    // useEffect(() => {
    //     window.M.updateTextFields()
    //   },)

    useEffect(()=>{
        message(error)
        clearError()
      },[error,message,clearError])

   

    const changeHandler = e=>{
        setForm({...form, [e.target.name]: e.target.value})
      }  

      const fetchAbout = useCallback(async () => {
        try {
            const fetched = await request('/api/about-edit/about', 
            'GET',null,)
            if (fetched!==null){
              setDisabled(true)
            }
            setForm({...fetched})
            
           
    } catch (e) {}
  }, [request])

  

  const updateHandler= async ()=>{
    try{
     
      const data=await request(`/api/about-edit/update`,'POST',{...form} , 
      {},'application/json')
      message(data.message)
      setForm({text:data.text})
      
    
    }catch(e){

    }
}

const createHandler = async()=>{
  try{
    const data=await request(`/api/about-edit/create`,'POST',{...form} , 
    {},'application/json')
    message(data.message)
    setForm({...form,_id:data.organization._id})
    setDisabled(true)
   
    
  }catch(e){

  }
}
useEffect(() => {
  fetchAbout()
  
}, [fetchAbout]) 

if (loading) {
    return <Loader/>
  }
    return(
        <>
          <div className="row">
            
            <div className="adm-form col s12 m12">
           
                <form onSubmit={submitHandler} method="post" enctype="multipart/form-data">
                    <div class="row">

                    <h4 className="col s8 offset-s4">Изменение информации о проекте</h4>
                 
                    <div class="input-field col s8 offset-s2 l6 offset-l4  ">
                    
                     <textarea id="textarea" name="text" class="materialize-textarea"
                    value={form.text} onChange={changeHandler}></textarea>
                     <label  for="text">Текст</label>
                    </div>
                        </div>
                </form>
                        <div className="row">
                    <div  className="input-field col s3 offset-s5  m2 offset-m5  l1 offset-l4  btn-form">
                        <button disabled={loading} 
                        type="submit" 
                        className="btn blue waves-effect waves-light" 
                        onClick={updateHandler}>Обновить</button>
                    </div>
                    <div  className="input-field col s3 offset-s5  m2 offset-m5  l1 offset-l4  btn-form">
                        <button disabled={loading|| disabled} 
                        type="submit" 
                        className="btn green waves-effect waves-light" 
                        onClick={createHandler}>Создать</button>
                    </div>
                   
                    </div>
                </div>
                </div>
        </>
    )
}

export default AboutForm