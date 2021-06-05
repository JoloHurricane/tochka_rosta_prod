import React from 'react'
import { Link } from 'react-router-dom'

function FollowSection(props){
return(
    <>
        <section id="section-follow" style={{backgroundColor:'#343b42'}} className=" white-text center">
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <h4>Следите за нами</h4>
                        <p>Оформите подписку на наши социальные сети</p>
                        <a href={props.organization.facebook} target="_blank" className="white-text icon-link">
                            <i className="fab fa-facebook fa-4x"></i>
                        </a>
                        <a href={props.organization.vk} target="_blank" className="white-text icon-link">
                            <i className="fab fa-vk fa-4x"></i>
                        </a>
                        <a href={props.organization.instagram} target="_blank" className="white-text icon-link">
                            <i className="fab fa-instagram fa-4x"></i>
                        </a>
                        <a href={props.organization.telegram} target="_blank" className="white-text icon-link">
                        <i class="fab fa-telegram fa-4x"></i>
                        </a>

                    </div>
                </div>
            </div>
        </section>
    </>
)
}

export default FollowSection