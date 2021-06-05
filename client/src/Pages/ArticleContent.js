import React , {useCallback, useContext, useEffect, useState} from "react";
import {useParams,} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {Loader} from '../components/Loader'
import ArticlesItem from '../components/ArticleItem'
import {AuthContext} from '../context/AuthContext'



function ArticleContent() {
    const auth = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [article, setArticle] = useState({})
    const [articles, setArticles] = useState([])
    const articleId = useParams().id

    const fetchArticles = useCallback(async () => {
      try {
        const fetched = await request('/api/articles-edit/articles-limit', 'POST', {limit:6})
        setArticles(fetched)
      } catch (e) {}
    }, [request])
    
    useEffect(() => {
      fetchArticles()
    }, [fetchArticles])
    
    
      useEffect(  async() => {
        
        try {
            const fetched = await request(`/api/articles-edit/${articleId}`, 'GET', null)
            setArticle(fetched)
            
            
          } catch (e) {}
      },[request,articleId])
    
      if (loading) {
        return <Loader />
      }
      if(article.img!=='placeholder.jpg'){
        return(
          <>
         <div className="row" >
            <div className="col s12 m12 l9">
            <div className="container content-article">
              <h4>{article.title}</h4>
              <p style={{ color: "#929292", fontStyle:"italic",fontSize:"1.2rem"}}>{article.createdAt}</p>
              
              <div className="img-article center-align">
                  <img className="responsive-img" src={`/images/articles/${article.img}`} alt=""/>
              </div>
              <div dangerouslySetInnerHTML={{ __html: article.sanitizedHtml }} className="flow-text">
                 
              </div>
            </div>
            </div>
            <div className="col l3 hide-on-med-and-down">
            {!loading && articles.map((article,index)=>{
                    return(
                      <ArticlesItem styleCardFontSize={'1.2rem'} styleCardHeight={'300px'} key={index} pathIMG={`/images/articles/${article.img}`} title={article.title} 
                      text={article.markdown} 
                      id={article._id}
                      link={`/articles/${article._id}`}
                      linkAdm={`/admpage/article-update/${article._id}`}/>
                    )
                  })}
                
            </div>
          
         </div>
         
          </>
      )
      } else{
        return(
          <>
         
         <div className="row" >
            <div className="col s12 m12 l9">
            <div className="container content-article">
              <h4>{article.title}</h4>
              <p style={{ color: "#929292", fontStyle:"italic",fontSize:"1.2rem"}}>{article.createdAt}</p>
              
             
              <div dangerouslySetInnerHTML={{ __html: article.sanitizedHtml }} className="flow-text">
                 
              </div>
            </div>
            </div>
            <div className="col l3 hide-on-med-and-down">
            {!loading && articles.map((article,index)=>{
                    return(
                      <ArticlesItem styleCardFontSize={'1.2rem'} styleCardHeight={'300px'} key={index} pathIMG={`/images/articles/${article.img}`} title={article.title} 
                      text={article.markdown} 
                      link={`/articles/${article._id}`}
                      id={article._id}
                      linkAdm={`/admpage/article-update/${article._id}`}/>
                    )
                  })}
                
            </div>
          
         </div>
          </>
        )
      }
        
      

   
}

export default ArticleContent 