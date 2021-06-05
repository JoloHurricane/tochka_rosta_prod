import React from 'react'
import { Link } from 'react-router-dom'

function CardIcon(props){
    return(
        <>
            <div className="col s12 m6">
                        <div className="card-panel center-align hoverable">
                            <i style={{color:'#343b42'}} className={props.icon}></i>
                            <h4 style={{fontSize:'1.8rem',}} className="center-align">{props.title}</h4>
                            <p style={{fontSize:'1.1rem'}} className="center-align">{props.text}</p>
                            <Link to={props.link} className='default-link' style={{fontSize:'1.4rem'}} >Перейти</Link>
                        </div>
                    </div>
        </>
    )
}

export default CardIcon