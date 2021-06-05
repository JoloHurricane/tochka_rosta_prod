import React,{useEffect,useState,useCallback,useContext} from 'react'
import Gallery from "../components/Gallery";
import {useHttp} from '../hooks/http.hook'
import {Loader} from '../components/Loader'
import {useParams} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function GalleryContent() {
  const auth = useContext(AuthContext)
  const {request, loading} = useHttp()
  const categoryId = useParams().id
  const [images, setImages] = useState([])
  const [category,setCategory] = useState({})
  useEffect(  async() => {
        
    try {
        const cat  = await request(`/api/galleryCategory-edit/${categoryId}`, 'GET', null)
        setCategory(cat)
        const fetched = await request(`/api/galleryCategory-edit/images`, 'POST', 
        {catId:categoryId},  {},'application/json')
        setImages(fetched)
           
      } catch (e) {}
  },[request])

    return(
      <>
        
                <Gallery additionalClass={"left-align"} date={category.createdAt} titleSection={category.title} title={category.title} text={category.description} images={images} loading={loading}/>
        
      </>

    )
    
}

export default GalleryContent
