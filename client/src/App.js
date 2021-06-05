import React,{useEffect,useState,useCallback} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from "./components/Footer"
import {Loader} from "./components/Loader"
import Home from "./Pages/Home"
import Articles from './Pages/Articles'
import "./materialize.css"
import M from 'materialize-css'
import './App.css';
import ArticleContent from './Pages/ArticleContent';
import GalleryPage from './Pages/GalleryPage';
import GalleryContent from './Pages/GalleryContent';
import { AuthContext } from './context/AuthContext';
import {useAuth} from "./hooks/auth.hook"
import Login from './Pages/Login';
import Documents from './Pages/Documents'
import {useRoutesAdm} from "./routesAdm";
import ContactPage from "./Pages/ContactPage"
import AboutPage from "./Pages/AboutPage"
import NotFound from "./Pages/NotFound"
import {useHttp} from "./hooks/http.hook" 
import {useMessage} from "./hooks/message.hook"
import Events from "./Pages/Events"
import Equipment from "./Pages/EquipmentPage"

function App() {


  const {token,login,logout,userId,ready} = useAuth() 
    const isAuthenticated=!!token
    const routesAdm = useRoutesAdm(isAuthenticated)
    const {loading,error,request,clearError} = useHttp()
    const message = useMessage()
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

    if(!ready){
      return <Loader/>
  }
  
  return (
    <AuthContext.Provider value={
      {
          token,login,logout,userId,isAuthenticated,ready
      }
  }>
    <>
     
      <Router>
      <main id='main'>
        <Navbar />
        
        
        <Switch>
         
         <Route path="/gallery/:id" exact component={GalleryContent}/>
          <Route path="/articles/:id"  component={ArticleContent}/>
          <Route path="/gallery" exact component={GalleryPage}/>
          <Route path="/events" exact component={Events}/>
          <Route path="/articles" exact component={Articles}/>
          <Route path="/documents" exact component={Documents}/>
          <Route path="/contacts" exact component={ContactPage}/>
          <Route path="/about" exact component={AboutPage}/>
          <Route path="/equipment" exact component={Equipment}/>
          <Route path="/login" exact component={Login}/> 
          <Route path='/' exact component={Home} />
          {routesAdm}
          <Route  exact component={NotFound} />
        
        </Switch>
        
          
       <Switch>
         
     
       </Switch>
      
      
       
        </main>
       
     <Footer organization={organization}/>
    
       
      </Router>
      
     
   
      
    
    </>
    </AuthContext.Provider>
  );
}

export default App;
