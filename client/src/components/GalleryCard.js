import React,{useContext} from "react";
import {Link} from "react-router-dom"
import { AuthContext } from '../context/AuthContext'

function GalleryCard(props) {
    const auth = useContext(AuthContext)
    if (auth.isAuthenticated){
        return(
            <>
             <div key={props.key} className="col s12 m6">
                <div className="card card-gallery hoverable">
                    <div className="card-image waves-effect waves-block waves-light">
                        <img className="" src={props.pathIMG} alt="img"/>
                    </div>  
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">{props.title}<i class="material-icons right">more_vert</i></span>
                         <p className="link-card-gallery"><Link style={{fontSize:"1.2rem",}} className="link-card default-link" to={props.link}>Перейти</Link></p>
                         <p  style={{fontSize:"1rem",paddingTop:"5px"}} className="link-card-gallery"><Link className="link-card default-link" to={props.linkAdm}>Изменить</Link></p>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">{props.title}<i class="material-icons right">close</i></span>
                        <p>{props.description}</p>
                    </div> 
                </div>         
            </div>
            </>
        )
    }
    return(
        <>
         <div key={props.key} className="col s12 m6">
            <div className="card hoverable">
                <div className="card-image waves-effect waves-block waves-light">
                    <img className="" src={props.pathIMG} alt="img"/>
                </div>  
                <div class="card-content">
                    <span class="card-title activator grey-text text-darken-4">{props.title}<i class="material-icons right">more_vert</i></span>
                     <p className="link-card-gallery"><Link className="link-card" to={props.link}>Перейти</Link></p>
                    
                </div>
                <div class="card-reveal">
                    <span class="card-title grey-text text-darken-4">{props.title}<i class="material-icons right">close</i></span>
                    <p>{props.description}</p>
                </div> 
            </div>         
        </div>
        </>
    )
   
    
}


export default GalleryCard