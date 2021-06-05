import React from "react";
import {NavLink,Link} from "react-router-dom";


function NavbarAdmItem(props){
    return(
        <>
            <li  ><NavLink activeClassName={props.classActive} className={props.class} to={props.link}>{props.title}</NavLink></li>
        </>

    )

}

export default NavbarAdmItem