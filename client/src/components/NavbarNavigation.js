import React,{useContext,useEffect,useCallback} from "react";
import NavbarNavigationItem from "./NavbarNavigationItem";
import {NavLink, useHistory} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import M from 'materialize-css'

function NavbarNavigation(props){
    const auth = useContext(AuthContext)
    const history = useHistory()
    

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
      }
  

     if (auth.isAuthenticated ||auth.token){
         return(
            <>
            <ul className={props.class} id={props.id}>
                <NavbarNavigationItem  link="/" click={logoutHandler} title="Выход" classAdditional={'hide-on-large-only'} class={props.classChild} classActive={props.classActiveChild}/>
                <NavbarNavigationItem  link="/admpage"  title="Админ панель" classAdditional={'hide-on-large-only'} class={props.classChild} classActive={props.classActiveChild}/>
                <NavbarNavigationItem link="/" title="Главная" class={props.classChild+" "+"hide-on-large-only"} classActive={props.classActiveChild}/>
                <NavbarNavigationItem link="/gallery" title="События" 
                class={props.classChild + " "+ 'dropdown-trigger' + ' '+ "hide-on-med-and-down"} dataTarget={"dropdown1"} 
                titleIcon={'arrow_drop_down'} classActive={props.classActiveChild}/>
                <NavbarNavigationItem link="/gallery" title="События" 
                class={props.classChild + " " + "hide-on-large-only"} 
                classActive={props.classActiveChild}/>
                <NavbarNavigationItem link="/events" title="Будущие события" 
                class={props.classChild + " " + "hide-on-large-only"} 
                classActive={props.classActiveChild}/>
                <NavbarNavigationItem link="/articles" title="Новости" class={props.classChild} classActive={props.classActiveChild}/>
                <NavbarNavigationItem link="/equipment" title="Оборудование" class={props.classChild} classActive={props.classActiveChild}/>
                <NavbarNavigationItem link="/documents" title="Документы" class={props.classChild} classActive={props.classActiveChild}/>
                <NavbarNavigationItem link="/contacts" title="Контакты" class={props.classChild} classActive={props.classActiveChild}/>
                <NavbarNavigationItem link="/about" title="О проекте" class={props.classChild} classActive={props.classActiveChild}/>
                            
             </ul>
            </> 
         )
     }

    return(
        <>
        <ul className={props.class} id={props.id}>
        <NavbarNavigationItem link="/" title="Главная" class={props.classChild+" "+"hide-on-large-only"} classActive={props.classActiveChild}/>
        <NavbarNavigationItem link="/gallery" title="События" class={props.classChild + " "+'dropdown-trigger' + ' '+ "hide-on-med-and-down"} 
        dataTarget={"dropdown1"} classActive={props.classActiveChild} titleIcon={'arrow_drop_down'}/>
          <NavbarNavigationItem link="/gallery" title="События" 
                class={props.classChild + " " + "hide-on-large-only"} 
                classActive={props.classActiveChild}/>
                 <NavbarNavigationItem link="/events" title="Будущие события" 
                class={props.classChild + " " + "hide-on-large-only"} 
                classActive={props.classActiveChild}/>
            <NavbarNavigationItem link="/articles" title="Новости" class={props.classChild} classActive={props.classActiveChild}/>
            <NavbarNavigationItem link="/equipment" title="Оборудование" class={props.classChild} classActive={props.classActiveChild}/>
            <NavbarNavigationItem link="/documents" title="Документы" class={props.classChild} classActive={props.classActiveChild}/>
            <NavbarNavigationItem link="/contacts" title="Контакты" class={props.classChild} classActive={props.classActiveChild}/> 
            <NavbarNavigationItem link="/about" title="О проекте" class={props.classChild} classActive={props.classActiveChild}/>         
         </ul>
        </>

    )
}

export default NavbarNavigation