import React from 'react'
import CardIcon from './CardIcon'

function IconBoxes(){
    return(
        <>
        <section id="iconBoxes" className="grey lighten-4">
            <div className="container">
                <div className="row">
                  <CardIcon icon="fas fa-dove fa-4x" title="Контакты" text="Свяжитесь с нами" link={"/contacts"}/>

                    <CardIcon icon="fas fa-id-badge fa-4x" title="Наш проект" text="Узнайте о нас больше"link={"/about"}/>
                                 
                </div>
            </div> 
            </section>
        </>
    )
}

export default IconBoxes