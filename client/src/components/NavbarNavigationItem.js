import React,{useEffect} from "react";
import {NavLink,Link} from "react-router-dom";
import M from 'materialize-css'

function NavbarNavigationItem(props){
   
    return(
        <>
        <li  ><NavLink data-target={props.dataTarget} onClick={props.click} activeClassName={props.classActive} className={props.class+' '+props.classAdditional} to={props.link}>{props.title}<i class="material-icons right">{props.titleIcon}</i></NavLink></li>
    </>
    )
}

export default NavbarNavigationItem