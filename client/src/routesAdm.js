import React from "react"
import { Switch, Route, useHistory, Redirect} from 'react-router-dom'
import AdmPage from "./Pages/AdmPage"
import LoginPage from "./Pages/Login";

export const useRoutesAdm = (isAuthenticated,token) => {
    
    if (isAuthenticated||token) {
        return (
  
      <Route path="/admpage">
          <AdmPage/>
      </Route>
     
            )
    }
    // return <Redirect to="/login"></Redirect>
}