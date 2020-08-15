import React from 'react';
import './App.css';
import "./index.css";
import flower from './flower.jpg'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/home.component";

function App() {
  return (<Router>
    <div className="App" style={{marginTop:"57px", backgroundImage :`url(${flower})` }}>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        
        <div className="container">
            <Link className="navbar-brand">REMO FILE MANAGER</Link>
        </div> 
         
        </nav>
        
        <div >
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path="/home" component={Home} />
          </Switch>
        </div>
      
    </div>
    </Router>
  );
}

export default App;
