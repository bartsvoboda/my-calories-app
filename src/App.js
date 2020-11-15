import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import NavbarMenu from './components/navbarmenu.component';
import UserStatus from './components/user-status.component';


function App() {
  return (
    <Router>
       <div className="container">
      <NavbarMenu />
      <br/>
      <Route path="/user/status" exact component= {UserStatus} />
      </div>
    </Router>
     
  );
}

export default App;