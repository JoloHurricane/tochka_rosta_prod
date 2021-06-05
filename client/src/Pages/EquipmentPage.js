import React,{useEffect,useCallback,useState} from 'react'
import M from 'materialize-css'
import {Loader} from "../components/Loader"
import {useHttp} from "../hooks/http.hook" 
import {useMessage} from "../hooks/message.hook"

function AboutPage(){
    const {loading,error,request,clearError} = useHttp()
    const message = useMessage()
    useEffect(()=>{
        var elems = document.querySelectorAll('.parallax');
        var instances = M.Parallax.init(elems, );
    },)

    const [equipment,setAbout] = useState({
        text:'',
      })
    
      const fetchAbout = useCallback(async () => {
          try {
              const fetched = await request('/api/equipment-edit/equipment', 
              'GET', null,{},)
              setAbout({...fetched})
              
             
      } catch (e) {}
    }, [request])
    
    useEffect(() => {
      fetchAbout()
    },[fetchAbout])
    
      if(loading){
        return <Loader/>
    }
    return(
        <>
         <div style={{backgroundColor:"#000",position:"relative"}}>
   
   <div className="parallax-container">
         <div className="parallax"><img className="" alt="asd" src="/images/equip1.jpeg"></img></div>
       
     </div>
     <h2   className="title-parallax color white-text center-align">Оборудование</h2> 
    </div>
    <div className="row container" dangerouslySetInnerHTML={{ __html: equipment.text }} >

      
    </div>
        </>
    )

}
export default AboutPage