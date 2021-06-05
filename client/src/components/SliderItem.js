import React from 'react'
import {NavLink,Link} from "react-router-dom";
function SliderItem(props){
    return(
        <>
       
        <li style={{backgroundColor:"#000"}} >
        
        <img style={{opacity:"60%"}} src={props.pathIMG} alt="img"/>
       
        <div className="caption center-align">
          <Link className="slider-link" to={props.link}><h3>{props.textTitle}</h3></Link>
          <h5 className="light grey-text text-lighten-3">{props.text}</h5>
        </div>
         </li>
    

        </>
    )

}
 
export default SliderItem