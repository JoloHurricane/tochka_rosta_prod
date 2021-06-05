import React from "react"

function CardImage(props){
    return (
        <>
         <div className="col s12 m4">
                        <div className="card hoverable">
                            <div className="card-image">
                                <img src={props.pathIMG} alt="img"></img>
                                <span className="card-title">{props.title}</span>
                            </div>
                            <div className="card-content">
                                <p>{props.text}</p> 
                            </div>
                        </div>
            </div>
        </>
    )

}

export default CardImage