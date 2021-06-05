import React,{useState,useEffect, useContext,useCallback} from "react";
import { AuthContext } from '../context/AuthContext'
import {useHttp} from "../hooks/http.hook" 
import {useMessage} from "../hooks/message.hook"
import {useHistory} from "react-router-dom"


function Login(params) {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading,error,request,clearError} = useHttp()
    const [form,setForm] = useState({
      login:'',
      password:''
    }) 
    const [disabled,setDisabled] = useState(false)
    useEffect(() => {
        window.M.updateTextFields()
      },)

    useEffect(()=>{
   
        message(error)
        clearError()
      },[error,message,clearError])

      const fetchUsers = useCallback(async () => {
        try {
            const fetched = await request('/api/auth/users', 
            'GET',null,)
            if (fetched!==null){
              setDisabled(true)
            }
           
    } catch (e) {}
  }, [request])

  useEffect(() => {
    fetchUsers()
    
  }, [fetchUsers]) 
     

      const changeHandler = e=>{
        setForm({...form, [e.target.name]: e.target.value})
      }  

      const registerHandler= async ()=>{
        try{
          const data=await request('/api/auth/register','POST',{...form},{},"application/json")
          message(data.message)
        }catch(e){
  
        }
    }
  
    const loginHandler= async ()=>{
      try{
        const data=await request('/api/auth/login','POST',{...form},{},"application/json")
        auth.login(data.token,data.userId)
        history.push(`/admpage`)
      }catch(e){
  
      }
  }

    function submitHandler(event){
        event.preventDefault()
    }
    return(
        <>
            <div className="container ">
                <h4>Вход</h4>
                <form className="login-form" onSubmit={submitHandler}>
                    <div className="row ">
                    <div class="input-field col s12 m5 offset-m3">
                        <input value={form.login} onChange={changeHandler} id="login" name="login"  type="text" />
                        <label for="login">Логин</label>
                     </div>
                    <div class="input-field col s12 m5 offset-m3">
                        <input value={form.password} onChange={changeHandler} id="password" name="password" type="password" />
                        <label for="password">Пароль</label>
                     </div>
                     <div className="col s6 m1 offset-m5 offset-s4">
                        <button  disabled={loading} onClick={loginHandler} className="btn waves-effect blue waves-light red darken-3" type="submit">Войти</button>
                     </div>
                     {!disabled && <div className="col s6 m1 offset-m5 offset-s4">
                        <button  disabled={loading || disabled} onClick={registerHandler} className="btn waves-effect waves-light green darken-3" type="submit">Регистрация</button>
                     </div> }
                     
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login