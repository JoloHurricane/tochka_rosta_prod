import React , {useCallback, useContext, useEffect, useState} from "react";
import GalleryCard from "../components/GalleryCard";
import Pagination from '../components/Pagination'
import {useHttp} from '../hooks/http.hook'
import {Loader} from '../components/Loader'
import { AuthContext } from '../context/AuthContext'

function  GalleryPage() {
    const auth = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [categories, setCategories] = useState([])
    const [currentPage,setCurrentPage]  = useState(1)
    const [countCategories,setCountCategories] = useState(15)
    


    const fetchCategories = useCallback(async () => {
        try {
            const fetched = await request('/api/galleryCategory-edit/gallery-categories', 'GET', null)
            setCategories(fetched)
            
    } catch (e) {}
  }, [request])

  useEffect(() => {
    window.M.updateTextFields()
  }, )
  
  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const indexLastCategory = currentPage * countCategories
  const indexFirstCategory = indexLastCategory - countCategories
  const currentCategory = categories.slice(indexFirstCategory,indexLastCategory)

  const paginate=(pageNumber)=>{setCurrentPage(pageNumber)}

  const paginatePrev=(pageNumber)=>{
    if (currentPage!==1){
      setCurrentPage(pageNumber-1)
      
    }
 
  }

   
  const paginateNext= (pageNumber,lastIndex) => {
    if (pageNumber!==lastIndex){
      setCurrentPage(pageNumber+1)
    }
  }

  if (loading) {
    return <Loader/>
  }

  if(categories==false){
    return(
      <>
      <div className="container">
        <h3>Пока нет событий, перезагрузите страницу</h3>
      </div>
      </>
    )
  }
    return(

        <>
            <div className="container">
                <div className="row">
                  
                   {!loading && currentCategory.map((category,index)=>{
                    return(
                      <GalleryCard key={index} pathIMG={`/images/galleryCategory/${category.img}`} title={category.title} 
                      description={category.description} 
                      link={`/gallery/${category._id}`}
                      linkAdm={`/admpage/galleryCategory-update/${category._id}`}/>
                    )
                  })}
                </div>
                <div className="row">
                  <Pagination 
                  loading={loading} 
                  countState={countCategories} 
                  totalState={categories.length} 
                  currentPage={currentPage} 
                  paginate={paginate}
                  paginateNext={paginateNext}
                  paginatePrev={paginatePrev}/>
                      
                  </div>
            </div>
        </>
    )
    
}

export default GalleryPage