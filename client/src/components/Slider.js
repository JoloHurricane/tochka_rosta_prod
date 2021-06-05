import React,{useEffect} from 'react'
import SliderItem from './SliderItem'
import M from "materialize-css"
import {Loader} from '../components/Loader'
import {useHttp} from '../hooks/http.hook'



function Slider(props){
    const {request, loading} = useHttp()
    useEffect(()=>{
    
        var elems = document.querySelectorAll('.slider');
        var instances = M.Slider.init(elems, {});
      
    },)
    if (loading) {
        return <Loader/>
      }
    return(
        <>
        <div className="container">
            <div className="slider hoverable">
                <ul className="slides">
                {!loading && props.articles.map((article,index)=>{
                    return(
                       <SliderItem
                     pathIMG={`/images/articles/${article.img}`}
                     textTitle={article.title}
                     link={`/articles/${article._id}`}
                     
                     />
                    )
                  })}
                    
                     {/* <SliderItem
                     pathIMG="/images/resort3.jpg"
                     textTitle="Right Aligned Caption"
                     text="Here's our small slogan3"
                     /> */}
                   
                </ul>

            </div>
            </div>
        </>
    )
}
export default Slider