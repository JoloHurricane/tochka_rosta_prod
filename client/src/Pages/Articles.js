import React , {useCallback, useContext, useEffect, useState} from 'react'
import ArticlesItem from '../components/ArticleItem'
import Pagination from '../components/Pagination'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'


function Articles(){
  const auth = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [articles, setArticles] = useState([])
  const [currentPage,setCurrentPage]  = useState(1)
  const [countArticles,setCountArticles] = useState(15)
  


  const fetchArticles = useCallback(async () => {
    try {
      const fetched = await request('/api/articles-edit/articles', 'GET', null)
      setArticles(fetched)
    } catch (e) {}
  }, [request])
  
  useEffect(() => {
    fetchArticles()
  }, [fetchArticles])
 
  const indexLastArticle = currentPage * countArticles
  const indexFirstArticle = indexLastArticle - countArticles
  const currentArticles = articles.slice(indexFirstArticle,indexLastArticle)

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

  if(articles==false){
    return(
      <>
      <div className="container">
        <h3>Пока нет новостей, перезагрузите страницу</h3>
      </div>
      </>
    )
  }
    return(
        <>
            <div className="container">
                <div className="row">
                  {!loading && currentArticles.map((article,index)=>{
                    return(
                      <ArticlesItem key={index} pathIMG={`/images/articles/${article.img}`} title={article.title} 
                      text={article.markdown} 
                      link={`/articles/${article._id}`}
                      id={article._id}
                      linkAdm={`/admpage/article-update/${article._id}`}/>
                    )
                  })}
                       
                        
                  <div className="row">
                  <Pagination 
                  loading={loading} 
                  countState={countArticles} 
                  totalState={articles.length} 
                  currentPage={currentPage} 
                  paginate={paginate}
                  paginateNext={paginateNext}
                  paginatePrev={paginatePrev}/>
                      
                  </div>
                </div>
            </div>
        </>
    )
}


export default Articles