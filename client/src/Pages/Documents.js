import React,{useEffect,useCallback,useState,useContext} from 'react'
import M from 'materialize-css'
import { AuthContext } from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {useHttp} from '../hooks/http.hook'

function Documents(){
    const auth = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [categories, setCategories] = useState([])
    const [files, setFiles] = useState([])

    const fetchCategories = useCallback(async () => {
        try {
          const fetched = await request('/api/documents-edit/documents-categories', 'GET', null)
          setCategories(fetched)
       
        } catch (e) {}
      }, [request])

      const fetchFiles = useCallback(async () => {
        try {
            const fetched = await request('/api/documents-edit/files', 'GET', null)
            setFiles(fetched)
        } catch (e) {}
      }, [request])
      
      useEffect(() => {
        fetchCategories()
        fetchFiles()
      
      }, [fetchCategories,fetchFiles])



    useEffect(()=>{
        
        var elem = document.querySelector('.collapsible.expandable');
        var instance = M.Collapsible.init(elem, {
        accordion: false
});
    
    if (loading) {
    return <Loader/>
  }

  const check = ()=>{
      
  }
            
    })
    return(
        <>
        <div className="container">
            <div className="row">
                <div className="col s12">
                    {/* <a href="/images/articles/text.txt" rel="noopener" download>ssss</a> */}
                    <h3>Документы</h3>
                    <ul class="collapsible expandable">
                    {!loading && categories.map((category,index)=>{
                    return(
                     <li>
                         <div class="collapsible-header">{category.title}</div>
                         <div class="collapsible-body" ><span>Выберите файл для скачивания</span></div>
                         {files.filter((val)=>{
                        if (val.category===category._id){
                            return val
                        } 
                    }).map((file,index)=>{
                        return(<div class="collapsible-body"><span><a download href={`/documents/${category.title}/${file.file}`}>{file.file}</a></span></div>)
                  })}
                            
                     </li> 
                    )
                  })}

                       
                </ul>
                </div>
            </div>
           
        </div>
        </>
    )
}

export default Documents
