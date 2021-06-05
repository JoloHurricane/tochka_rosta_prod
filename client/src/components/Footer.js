import React from "react"
import { Link, NavLink } from 'react-router-dom';

function Footer(props){
    return(
   
        <footer id="footer" style={{backgroundColor:'#343b42'}} className="page-footer  white-text center">
        <div className="container">
            <div className="row">
              <div className="col l5 s12">
                  <div style={{width:'',}} className="img-footer center-align hide-on-med-only">
                    <img className="responsive-img" src="/images/logo-footer.png"></img>
                  </div>
                  <div >
                  <a  href={props.organization.facebook} target="_blank" className="white-text icon-link">
                            <i className="fab fa-facebook fa-3x"></i>
                        </a>
                        <a style={{marginLeft:"15px"}} target="_blank"  href={props.organization.vk} className="white-text icon-link">
                            <i className="fab fa-vk fa-3x"></i>
                        </a>
                        <a style={{marginLeft:"15px"}} target="_blank"  href={props.organization.instagram} className="white-text icon-link">
                            <i className="fab fa-instagram fa-3x"></i>
                        </a>
                        <a style={{marginLeft:"15px",}} target="_blank"  href={props.organization.telegram} className="white-text icon-link">
                        <i class="fab fa-telegram fa-3x"></i>
                        </a>
                  </div>
               
                <p className="grey-text text-lighten-4"><i  className="material-icons">location_on</i>{props.organization.city} {props.organization.title}, {props.organization.address}</p>
                <p className="grey-text text-lighten-4"><i style={{marginRight:'6px'}}  className="material-icons">local_phone</i>{props.organization.phone}</p>
              </div>
              <div className="col l3 s12">
              <ul>
                <li><Link  className="grey-text text-lighten-3 default-link footer-link" to="/about">О проекте</Link></li>
                <li><Link className="grey-text text-lighten-3 default-link footer-link" to="/contacts">Контакты</Link></li>
                  
                  
                </ul>
              </div>
              <div className="col l4 s12">
                
                <ul>
                    <li><Link className="grey-text text-lighten-3 default-link footer-link" to="/articles">Новости</Link></li>
                    <li><Link className="grey-text text-lighten-3 default-link footer-link" to="/gallery">События</Link></li>  
                    <li><Link className="grey-text text-lighten-3 default-link footer-link" to="/documents">Документы</Link></li>
                    <li><Link className="grey-text text-lighten-3 default-link footer-link" to="/events">Предстоящие события</Link></li>
                 
                  
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container">
            © {new Date().getFullYear()} Точка роста
            
            </div>
          </div>
        </footer>
 
    )
   
}

export default Footer 