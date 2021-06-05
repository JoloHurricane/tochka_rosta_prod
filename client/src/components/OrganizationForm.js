import React,{useEffect,useContext,useState,useCallback} from 'react'
import {useHttp} from "../hooks/http.hook" 
import {useMessage} from "../hooks/message.hook"
import {Loader} from '../components/Loader'

function OrganizationForm(){
    function submitHandler(event){
        event.preventDefault()
    }
    const {loading,error,request,clearError} = useHttp()
    const message = useMessage()
    const [form,setForm] = useState({
      title:'',
      address:'',
      phone:'',
      phoneAdditional:'',
      email:'',
      _id:'',
      city:'',
      map:'',
      vk:'',
      instagram:'',
      facebook:'',
      telegram:''
    })

    const [disabled,setDisabled] = useState(false)
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

      const fetchOrg = useCallback(async () => {
        try {
            const fetched = await request('/api/organization-edit/organization', 
            'POST', {...form},{},'application/json')
            if (fetched!==null){
              setDisabled(true)
            }
            setForm({...fetched})
            
           
    } catch (e) {}
  }, [request])

  

  const updateHandler= async ()=>{
    try{
     
      const data=await request(`/api/organization-edit/update`,'POST',{...form} , 
      {},'application/json')
      message(data.message)
    
    }catch(e){

    }
}

const createHandler = async()=>{
  try{
    const data=await request(`/api/organization-edit/create`,'POST',{...form} , 
    {},'application/json')
    message(data.message)
    setForm({...form,_id:data.organization._id})
    setDisabled(true)
   
    
  }catch(e){

  }
}
useEffect(() => {
  fetchOrg()
  
}, [fetchOrg]) 

if (loading) {
    return <Loader/>
  }
    return(
        <>
          <div className="row">
            
            <div className="adm-form col s12 m12">
           
                <form onSubmit={submitHandler} method="post" enctype="multipart/form-data">
                    <div class="row">

                    <h4 className="col s8 offset-s4">Организация</h4>

                    <div class="input-field col s8 offset-s2 l6 offset-l4  ">
                     <input id="title" name="title" type="text" className=""
                    value={form.title} onChange={changeHandler}/>
                     <label  for="title">Наименование</label>
                    </div>
                    <div class="input-field col s8 offset-s2 l6 offset-l4  ">
                    <input id="city" name="city" type="text" class="" 
                    value={form.city} onChange={changeHandler}/>
                    <label for="city">Город</label>
                    </div>
                     <div class="input-field col s8 offset-s2 l6 offset-l4  ">
                    <input id="address" name="address" type="text" class="" 
                    value={form.address} onChange={changeHandler}/>
                    <label for="address">Адрес</label>
                    </div>
                    <div class="input-field col s8 offset-s2 l6 offset-l4  ">
                    <input id="phone" name="phone" type="text" class="" 
                    value={form.phone} onChange={changeHandler}/>
                    <label for="phone">Телефон</label>
                    </div>
                    <div class="input-field col s8 offset-s2 l6 offset-l4  ">
                    <input id="phoneAdditional" name="phoneAdditional" type="text" class="" 
                    value={form.phoneAdditional} onChange={changeHandler}/>
                    <label for="phoneAdditional">Доп. Телефон</label>
                    </div>
                    <div class="input-field col s8 offset-s2 l6 offset-l4  ">
                    <input id="map" name="map" type="text" class="" 
                    value={form.map} onChange={changeHandler}/>
                    <label for="map">Cсылка Google карты</label>
                    </div>
                   
                    <div class="input-field col s8 offset-s2 l6 offset-l4  ">
                    <input id="email" name="email" type="text" class="" 
                    value={form.email} onChange={changeHandler}/>
                    <label for="email">Email</label>
                    </div>

                    <div class="input-field col s8 offset-s2 l6 offset-l4  ">
                    <input  name="vk" type="text" class="" 
                    value={form.vk} onChange={changeHandler}/>
                    <label for="vk">Ссылка vk</label>
                    </div>

                    <div class="input-field col s8 offset-s2 l6 offset-l4  ">
                    <input  name="instagram" type="text" class="" 
                    value={form.instagram} onChange={changeHandler}/>
                    <label for="instagram">Ссылка instagram</label>
                    </div>

                    <div class="input-field col s8 offset-s2 l6 offset-l4  ">
                    <input name="facebook" type="text" class="" 
                    value={form.facebook} onChange={changeHandler}/>
                    <label for="facebook">Ссылка facebook</label>
                    </div>

                    
                    <div class="input-field col s8 offset-s2 l6 offset-l4  ">
                    <input name="telegram" type="text" class="" 
                    value={form.telegram} onChange={changeHandler}/>
                    <label for="telegram">Ссылка telegram</label>
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

export default OrganizationForm