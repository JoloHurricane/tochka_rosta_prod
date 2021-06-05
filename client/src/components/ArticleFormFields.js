import React,{useEffect} from "react";
import M from "materialize-css";

function ArticleFormFields(props){
    useEffect(()=>{
        var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
    },)
 if (props.articleId==undefined && props.currentRoute!=='/admpage/article-create'){
    return(
        <>
          <div class="row">
             

                <h4 className="col s8 offset-s4">{props.title}</h4>
                <div class="input-field col s8 offset-s2 l6 offset-l4">
                    <input onChange={props.handleSearch} value={props.stateSearch} name="search" type="text"></input>
                    <label  for="seacrh">Поиск</label>
                </div>
                   <div class="input-field col s8 offset-s2 l6 offset-l4">
                    <select onChange={props.handleSelect} value={props.idSelect} >
                    <option value="" disabled selected>Сделайте выбор</option>
                    {props.articles.filter((val)=>{
                        if (props.stateSearch==""){
                            return val
                        } else if (val.title.toLowerCase().includes(props.stateSearch.toLowerCase())){
                            return val
                        }
                    }).map((article,index)=>{
                        return(<option key={index} value={article._id}>{article.title}</option>)
                  })}
                        
                    </select>


                    <label>Выберите Cтатью</label>
                </div>
                    <div class="input-field col s8 offset-s2 l6 offset-l4  ">
                        <input id="title" name="title" type="text" className=""
                        value={props.state.title} onChange={props.changeHandler}/>
                        <label  for="title">Название</label>
                    </div>
                    <div class="input-field col s8 offset-s2 l6 offset-l4  ">
                         <input id="date" name="date" type="text" class="" 
                         value={props.state.date} onChange={props.changeHandler}/>
                        <label for="date">Дата</label>
                    </div>
                  
                  

                    <div class="input-field col s8 offset-s2 l6 offset-l4  ">
                        <textarea id="textarea" name="text" class="materialize-textarea"
                        value={props.state.text} onChange={props.changeHandler}></textarea>
                        <label for="text">Текст</label>
                    </div>
                    <div style={{marginRight:"15px !important"}} className="input-field label-file-input col s3 offset-s2  m6 offset-m5  l1 offset-l4">
                        <label for="file">Изображение</label>
                     
                    </div>
                    <div style={{marginLeft:"15px"}} className="input-field label-file-input col s2 m6 offset-m5  l4">
                     
                        <input onChange={props.handleImageChange} type="file" id="file" name="file"/>
                    </div>
                     </div>

        </>

    )
 }
 return(
    <>
      <div class="row">

            <h4 className="col s8 offset-s4">{props.title}</h4>
           
                <div class="input-field col s8 offset-s2 l6 offset-l4  ">
                    <input id="title" name="title" type="text" className=""
                    value={props.state.title} onChange={props.changeHandler}/>
                    <label  for="title">Название</label>
                </div>
                <div class="input-field col s8 offset-s2 l6 offset-l4  ">
                     <input id="date" name="date" type="text" class="" 
                     value={props.state.date} onChange={props.changeHandler}/>
                    <label for="date">Дата</label>
                </div>
              
              

                <div class="input-field col s8 offset-s2 l6 offset-l4  ">
                    <textarea id="textarea" name="text" class="materialize-textarea"
                    value={props.state.text} onChange={props.changeHandler}></textarea>
                    <label for="text">Текст</label>
                </div>
                <div className="input-field label-file-input col s3 offset-s2  m6 offset-m5  l1 offset-l4">
                    <label for="file">Изображение</label>
                  
                </div>
                <div className="input-field label-file-input col s2 m6 offset-m5  l4">
                 
                    <input onChange={props.handleImageChange} type="file" id="file" name="file"/>
                </div>
                 </div>

    </>

)
   
}

export default ArticleFormFields
