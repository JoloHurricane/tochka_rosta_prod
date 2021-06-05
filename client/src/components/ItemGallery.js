import React from 'react'


function ItemGallery(props){
    return(
        <>
         <div className="col s12 m3">
             <div className="img-container">
             <img  src={props.pathIMG} 
            className="materialboxed responsive-img" alt="img"/>
             </div>
           
        </div>
        </>

    )
}

export default ItemGallery