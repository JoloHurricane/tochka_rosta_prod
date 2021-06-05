import React, {useState, useEffect,useContext,useCallback} from 'react'
import { Link, useHistory} from 'react-router-dom';
import M from 'materialize-css'
import NavbarNavigation from "./NavbarNavigation";
import NavbarNavigationItem from "./NavbarNavigationItem"

import { AuthContext } from '../context/AuthContext'

function Navbar({isAuthentificated}){

    const auth = useContext(AuthContext)
    const history = useHistory()
    const [click, setClick] = useState(false)
    const hanldeClick = () => setClick(!click) 

    const initDrop = useCallback(async () => {
        try {
            let elems =  document.querySelectorAll('.dropdown-trigger');
            window.M.Dropdown.init(elems, {inDuration: 300, outDuration: 225});
        } catch (e) {}
      }, [])
     useEffect(()=>{
         initDrop()
     },[initDrop]
     )
    useEffect(()=>{
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems, {});
     
              },);
        
   
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
      }

if(auth.isAuthentificated||auth.token){
    return(
        <>
         <NavbarNavigation class="sidenav" id="mobile-nav" classChild="" classActiveChild="is-active"/>
         <ul id="dropdown1" style={{width:'200px', backgroundColor:'#343b42',}} class="dropdown-content">
            <li className="dropdown-item"> <Link  style={{color:"white"}} to="/gallery">События</Link></li>
            <li className="dropdown-item"> <Link  style={{color:"white"}}  to="/events">Предстоящие События</Link></li>
         
            </ul>
         <div className="navbar-fixed hoverable hide-on-med-and-down auth-nav">
            <nav className=" blue-grey darken-3 navbar" >
                <div className="">
                    <div className="nav-wrapper" style={{paddingLeft:"60px"}}>
                        <div className='brand-logo'>
                        <Link to='/' onClick={hanldeClick} ></Link >
                       
                        </div>
                       
               
                      
                            <ul className="auth-navbar-navigation">
                            <NavbarNavigationItem  link="/" click={logoutHandler} title="Выход" class={"right hide-on-med-and-down adm-nav-top"} classActive={"is-active"}/>
                            <NavbarNavigationItem  link="/admpage"  title="Админ панель" class={"right hide-on-med-and-down adm-nav-top"} classActive={"is-active"}/>
                            </ul>
                        
                    </div>
                </div>
            </nav>
        </div>
        <div className="navbar-fixed hoverable">
            <nav className="red darken-3 main-nav navbar" >
                <div className="">
                    <div className="nav-wrapper" style={{paddingLeft:"60px"}} >
                        <div className='brand-logo'>
                        
                        <Link to='/' onClick={hanldeClick} ><img className="responsive-img" src="/images/some_logo.png"></img></Link >
                  
                        </div>
                       
               
                        <Link to='#' className='sidenav-trigger' data-target="mobile-nav"> 
                             <i className="material-icons">menu</i>
                         </Link>
                            <NavbarNavigation class="right hide-on-med-and-down sila" classChild="navLink" classActiveChild="is-active"/>

                    </div>
                </div>
            </nav>
        </div>
        
        </>

    )
}
return(
    
        <>
         <NavbarNavigation class="sidenav" id="mobile-nav" classChild="" classActiveChild="is-active"/>
         <ul id="dropdown1" style={{width:'200px', backgroundColor:'#343b42',}}  class="dropdown-content">
            <li className="dropdown-item"> <Link  style={{color:"white"}}  to="/gallery">События</Link></li>
            <li className="dropdown-item"> <Link   style={{color:"white"}}  to="events">Предстоящие События</Link></li>
         
            </ul>
        <div className="navbar-fixed hoverable">
            <nav className="red darken-3 main-nav navbar" >
                <div className="">
                    <div className="nav-wrapper" style={{paddingLeft:"60px"}}>
                        <div className='brand-logo'>
                        <Link to='/' onClick={hanldeClick} ><img className="responsive-img" src="/images/some_logo.png"></img></Link >
                      
                        </div>
                       
               
                        <Link to='#' className='sidenav-trigger' data-target="mobile-nav"> 
                             <i className="material-icons">menu</i>
                         </Link>
                            <NavbarNavigation class="right hide-on-med-and-down sila" classChild="navLink" classActiveChild="is-active"/>
                        
                    </div>
                </div>
            </nav>
        </div>
        
        </>

    
)
   
}

export default Navbar;