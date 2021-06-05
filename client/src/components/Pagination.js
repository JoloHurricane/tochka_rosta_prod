import React from 'react'
import {Loader} from '../components/Loader'

function Pagination(props){
    if (props.loading) {
        return <Loader/>
      }

    const pageNumbers=[]
    for(let i=1;i<=Math.ceil(props.totalState/props.countState);i++){
        pageNumbers.push(i)
    }
    return(
        <div className="col s12">
        <ul className="pagination">
            <li className="waves-effect"><a  onClick={()=>props.paginatePrev(props.currentPage)}   href="#!"><i class="material-icons">chevron_left</i></a></li>
            {pageNumbers.map(number=>(
                 <li key={number} className="waves-effect"><a onClick={()=>props.paginate(number)} href="#!">{number}</a></li>
            ))}
           
           
            <li className="waves-effect"><a onClick={()=>props.paginateNext(props.currentPage,pageNumbers.length)} href="#!"><i class="material-icons">chevron_right</i></a></li>
          </ul>
        </div>
    )
}

export default Pagination