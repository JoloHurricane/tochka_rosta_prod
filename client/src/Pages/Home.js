import React, { useCallback, useContext, useEffect, useState } from 'react'
import FollowSection from "../components/FollowSection"
import Gallery from "../components/Gallery"
import IconBoxes from "../components/IconBoxes"
import { Loader } from '../components/Loader'
import Slider from "../components/Slider"
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'


function Home(){
     const auth = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [images,setImages] = useState([])
    const [articles, setArticles] = useState([])
    const [category,setCategory] = useState({})
    const [organization,setOrganization] = useState({
      title:'',
      address:'',
      phone:'',
      phoneAdditional:'',
      email:'',
      _id:'',
      city:'',
      map:'',
      vk:'',
      instagram:'',
      facebook:'',
      telegram:''
    })

    useEffect(  async() => {
        
      try {
          const category  = await request(`/api/galleryCategory-edit/gallery-category`, 'GET', null)
          setCategory(category)
          const fetched = await request(`/api/galleryCategory-edit/images-limit`, 'POST', 
          {catId:category._id,limit:30},  {},'application/json')
          setImages(fetched)
             
        } catch (e) {}
    },[request])

    const fetchArticles = useCallback(async () => {
        try {
          const limit = 5  
          const fetched = await request('/api/articles-edit/articles-limit', 'POST', {limit:limit},
          {},'application/json')
          setArticles(fetched)
        } catch (e) {}
      }, [request])
      useEffect(() => {
        fetchArticles()
       
      }, [fetchArticles])

      const fetchOrg = useCallback(async () => {
        try {
            const fetched = await request('/api/organization-edit/organization', 
            'POST', {...organization},{},'application/json')
            
            setOrganization({...fetched})
            
           
    } catch (e) {}
  }, [request])
  
  useEffect(() => {
    fetchOrg()
    
  }, [fetchOrg]) 
  

      if (loading) {
        return <Loader/>
      }

    return(
        <>
        
        <Slider articles={articles}/>
        <IconBoxes/>
        <FollowSection organization={organization}/>
        {category!==null && <Gallery additionalClass={"center"} images={images} title={category.title} titleSection ='Фото галерея'/>}
      
        
        </>

    )
}

export default Home;