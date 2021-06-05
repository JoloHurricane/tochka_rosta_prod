import React, {useState,useContext, useEffect} from 'react'
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'


function ArticlesItem(props){
    const auth = useContext(AuthContext)
    const cardStyle = {
       height:props.styleCardHeight,
      
      }

      
 
 
    const linkTarget= {
        pathname: `/articles/${props.id}`,
        key: Math.random(), // we could use Math.random, but that's not guaranteed unique.
        state: {
          applied: true
        }
      };

      const clickHanler = ()=>{
         
      }

    const fonts={
        fontSize:props.styleCardFontSize
    }

    if (auth.isAuthenticated){
        return(
            <>
                    <div key={props.key} className="col s12">
                          
                            <div style = {cardStyle} className="card medium hoverable waves-effect waves-block waves-light">
                                <div className="card-image">
                                    <img src={props.pathIMG} alt=""/>
                                   
                                </div>
                                <div style={fonts} className="card-title">{props.title}</div>
                                {/* <div className="card-content dark-text" dangerouslySetInnerHTML={{ __html:props.text }}/> */}
                              
                                <div class="card-action">
                              
                                <Link  className="blue-text default-link" onClick={clickHanler}   to={linkTarget}>Перейти</Link>
                                <Link className="blue-text default-link" to={props.linkAdm}>Изменить</Link>
                                
                                </div>
                            </div>
                            
                        </div>
            </>
        )
    }
    return(
        <>
                <div className="col s12">
                      
                        <div className="card medium hoverable">
                            <Link to={props.link}> <div className="card-image">
                                <img src={props.pathIMG} alt=""/>
                               
                            </div></Link>
                            <div className="card-title">{props.title}</div>
                            <div className="card-content dark-text" dangerouslySetInnerHTML={{ __html:props.text }}/>
                            <div class="card-action">
                            <Link  className="blue-text default-link" to={props.link}>Перейти</Link>
                           

                            
                            </div>
                        </div>
                        
                    </div>
        </>
    )

   
}

export default ArticlesItem