import React,{useEffect,useContext} from "react";
import NavbarAdm from "../components/NavbarAdm";
import {Link,Switch,Route} from "react-router-dom";
import ArticleFormCreate from "../components/ArticleFormCreate";
import ArticleFormEdit from "../components/ArticleFormEdit";
import AdmDefault from "../components/AdmDefault"
import M from 'materialize-css'
import GalleryCategoryFormCreate from "../components/GalleryCategoryFormCreate";
import GalleryCategoryFormEdit from "../components/GalleryCategoryFormEdit";
import GalleryImageFormAdd from "../components/GalleryImageFormAdd";
import { AuthContext } from '../context/AuthContext'
import {Loader} from "../components/Loader"
import Upload from "../components/Upload";
import Organization from "../components/OrganizationForm"
import DocumentCategoryCreate from "../components/DocumentCategoryCreate"
import DocumentCategoryUpdate from "../components/DocumentCategoryEdit"
import DocumentFileUpload from "../components/DocumentFileUpload"
import EventsEdit from "../components/EventsEdit"
import EventsUpdate from "../components/EventsUpdate"
import UsersFormCreate from '../components/UsersFormCreate'
import AboutForm from '../components/AboutForm'
import EquipmentForm from '../components/EquipmentForm'

function AdmPage(){

    const auth = useContext(AuthContext)

    useEffect(()=>{
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems, {});
      
    },)

    
  
  
    return(

        <>
       
            <div class="row">
            
            <Link to='#' id="sidenav-trigger-adm" className='sidenav-trigger  hide-on-large-only blue-grey-text' data-target="mobile-nav-adm"> 
                             <i className="material-icons">menu</i></Link>
                             <NavbarAdm class="sidenav" id="mobile-nav-adm" classChild="adm-item-mobile" classActiveChild="is-active-adm-moobile"/>
                <div class="col s3 m2 side-nav blue-grey darken-1  hide-on-med-and-down">
                   
                    <NavbarAdm class="side-nav-adm blue-grey darken-1 " classChild="adm-item white-text" classActiveChild="is-active-adm"/>
                </div>

                <div class="col s12 m12 ">
             

                        <Switch>
                            <Route path="/admpage/" exact component={AdmDefault}></Route>
                            <Route path="/admpage/upload" exact component={Upload}></Route>
                            <Route path="/admpage/organization" exact component={Organization}></Route>
                            <Route path="/admpage/events-edit" exact component={EventsEdit}></Route>
                            <Route path="/admpage/eventUpdate/:id" exact component={EventsUpdate}></Route>
                            <Route path="/admpage/article-create" exact  component={ArticleFormCreate}/>
                            <Route path="/admpage/article-update" exact  component={ArticleFormEdit}/>
                            <Route path="/admpage/article-update/:id" exact  component={ArticleFormEdit}/>
                            <Route path="/admpage/galleryCategory-create" exact component={GalleryCategoryFormCreate}/>
                            <Route path="/admpage/galleryCategory-update" exact component={GalleryCategoryFormEdit}/>
                            <Route path="/admpage/galleryCategory-update/:id" exact component={GalleryCategoryFormEdit}/>
                            <Route path="/admpage/galleryImage-add" exact component={GalleryImageFormAdd}/>
                            <Route path="/admpage/documentCategory-create" exact component={DocumentCategoryCreate}/>
                            <Route path="/admpage/documentCategory-update" exact component={DocumentCategoryUpdate}/>
                            <Route path="/admpage/documentFile-add" exact component={DocumentFileUpload}/>
                            <Route path="/admpage/users-create" exact component={UsersFormCreate}/>
                            <Route path="/admpage/about" exact component={AboutForm}/>
                            <Route path="/admpage/equipment-edit" exact component={EquipmentForm}/>
                        </Switch>
                  
                    
                </div>  
            </div>
        </>
    )

}

export default AdmPage