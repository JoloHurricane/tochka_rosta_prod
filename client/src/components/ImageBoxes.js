import React from 'react'
import CardIcon from './CardIcon'
import CardImage from './CardImage'

function ImageBoxes(){
    return(
        <>
        <section id="imageBoxes" className="scrollspy" >
            <div className="container ">
                <div className="row">
                    <h4 className="center">
                    <span className="red-text darken-3-text">Popular</span> Places</h4>
                   <CardImage pathIMG="/images/resort1.jpg" title="Doms some tiel" text="amet consectetur adipisicing elit. 
                   Voluptas aliquid fugiat corporis laudantium, architecto"/>
                   <CardImage pathIMG="/images/resort2.jpg" title="Doms some tiel" text="amet consectetur adipisicing elit. 
                   Voluptas aliquid fugiat corporis laudantium, architecto"/>
                   <CardImage pathIMG="/images/resort3.jpg" title="Doms some tiel" text="amet consectetur adipisicing elit. 
                   Voluptas aliquid fugiat corporis laudantium, architecto"/>
                </div>
            </div>
            </section>
        </>

    )

}

export default ImageBoxes