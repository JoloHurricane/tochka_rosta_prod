import React, {useEffect,useState,useCallback} from 'react'
import M from 'materialize-css'
import { Link, NavLink } from 'react-router-dom';
import {Loader} from "../components/Loader"
import {useHttp} from "../hooks/http.hook" 
import {useMessage} from "../hooks/message.hook"
function ContactPage(){
    const {loading,error,request,clearError} = useHttp()
    const message = useMessage()
  useEffect(()=>{
    
    var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems, );
},)

const [organization,setOrganization] = useState({
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

  const fetchOrg = useCallback(async () => {
      try {
          const fetched = await request('/api/organization-edit/organization', 
          'POST', {...organization},{},'application/json')
          
          setOrganization({...fetched})
          
         
  } catch (e) {}
}, [request])

useEffect(() => {
  fetchOrg()
},[fetchOrg])

  if(loading){
    return <Loader/>
}
return(
    <>
    <div style={{backgroundColor:"#000",position:"relative"}}>
   
      <div className="parallax-container" style={{opacity:'55% !important'}}>
            <div className="parallax"><img className="" alt="asd" src="../../images/contact2.jpeg"></img></div>
          
        </div>
        <h2   className="title-parallax color white-text center-align">Контакты</h2> 
    </div>
   
     
    <div className="row container" style={{marginTop:"20px"}}>
        <div className="col s12 m6">
        <div className="card-panel dark-text center hoverable">
                            <i className="material-icons">email</i>
                            
                            <ul className="collection with-header">
                                <li className="collection-header">
                                <h5>Свяжитесь с нами</h5>
                                </li>
                                <li className="collection-item">{organization.title}</li>
                                <li className="collection-item">Город: {organization.city}</li>
                               
                                    <li className="collection-item">Адрес: {organization.address}</li>
                                    <li className="collection-item">Email: {organization.email}</li>
                                    <li className="collection-item">Телефон:{organization.phone}</li>
                                    <li className="collection-item">Доп. Телефон: {organization.phoneAdditional}</li>
                                    
                            </ul>
                            <div>
                            <a style={{color:'#343b42'}} href={organization.facebook} target="_blank" className="dark-text icon-link">
                            <i className="fab fa-facebook fa-2x"></i>
                        </a>
                        <a  style={{marginLeft:"15px",color:'#343b42'}} target="_blank" href={organization.vk} className="dark-text icon-link">
                            <i className="fab fa-vk fa-2x"></i>
                        </a>
                        <a style={{marginLeft:"15px",color:'#343b42'}} target="_blank" href={organization.instagram} className="dark-text icon-link">
                            <i className="fab fa-instagram fa-2x"></i>
                        </a>
                        <a style={{marginLeft:"15px",color:'#343b42'}} target="_blank" href={organization.telegram} className="dark-text icon-link">
                        <i class="fab fa-telegram fa-2x"></i>
                        </a>
                            </div>
                        </div>
        </div>
        <div className="col s12 m6">
        <iframe src={organization.map} style={{border:"0",width:"100%",paddingTop:"6px",  height:"400px"}}  allowfullscreen="" loading="lazy"></iframe>
        </div>
    </div>
  
    </>
)
}

export default ContactPage
