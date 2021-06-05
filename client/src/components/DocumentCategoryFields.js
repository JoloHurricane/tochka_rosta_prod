import React,{useEffect} from "react";
import M from "materialize-css";

function DocumentCategoryFormFields(props){
    useEffect(()=>{
        var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
    },)

    if (props.currentRoute!=='/admpage/documentCategory-create'){
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
                        {props.categories.filter((val)=>{
                            if (props.stateSearch==""){
                                return val
                            } else if (val.title.toLowerCase().includes(props.stateSearch.toLowerCase())){
                                return val
                            }
                        }).map((category,index)=>{
                            return(<option key={index} value={category._id}>{category.title}</option>)
                      })}
                            
                        </select>
    
    
                        <label>Выберите категорию</label>
                    </div>
                    
                    <div class="input-field col s8 offset-s2 l6 offset-l4  ">
                        <input id="title" name="title" type="text" class=""
                           value={props.state.title} onChange={props.changeHandler}/>
                            <label for="title">Название</label>
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
                        <input id="name" name="title" type="text" class="" 
                        value={props.state.title} onChange={props.changeHandler}/>
                        <label for="name">Название</label>
                    </div>

                     </div>
        </>
    )
}

export default DocumentCategoryFormFields
