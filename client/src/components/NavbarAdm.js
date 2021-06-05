import React from "react";
import NavbarAdmItem from "./NavbarAdmItem";
function NavbarAdm(props){
  

    return(
        <>
       
            <ul className={props.class} id={props.id}>
            <NavbarAdmItem link="/admpage/organization" title="Организация" class={props.classChild} classActive={props.classActiveChild}/>
            <NavbarAdmItem link="/admpage/about" title="О проекте" class={props.classChild} classActive={props.classActiveChild}/>
               <NavbarAdmItem link="/admpage/article-create" title="Новости" class={props.classChild} classActive={props.classActiveChild}/>
               <NavbarAdmItem link="/admpage/galleryCategory-create" title="События" class={props.classChild} classActive={props.classActiveChild}/>
               <NavbarAdmItem link="/admpage/galleryImage-add" title="Контент события" class={props.classChild} classActive={props.classActiveChild}/>
               <NavbarAdmItem link="/admpage/documentCategory-create" title="Документы" class={props.classChild} classActive={props.classActiveChild}/>
               <NavbarAdmItem link="/admpage/documentFile-add" title="Файлы документов" class={props.classChild} classActive={props.classActiveChild}/>
               <NavbarAdmItem link="/admpage/events-edit" title="Будущие события" class={props.classChild} classActive={props.classActiveChild}/>
               <NavbarAdmItem link="/admpage/equipment-edit" title="Оборудование" class={props.classChild} classActive={props.classActiveChild}/>
               <NavbarAdmItem link="/admpage/upload" title="Загрузка файлов" class={props.classChild} classActive={props.classActiveChild}/>
               <NavbarAdmItem link="/admpage/users-create" title="Пользователи" class={props.classChild} classActive={props.classActiveChild}/>
            </ul>
             
   
            
        </>

    )
}

export default NavbarAdm