
import './App.css';
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home';
import CreateEmail from './components/CreateEmail';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import History from './components/History';
import Scheduled from './components/Scheduled';
import Cookies from 'js-cookie';
import ProtectedRouter from './ProtectedRouter';
import Logout from './components/Logout'
import Navbar from './components/Navbar';

function App() {
  
  // useEffect(()=>{
  //   let temp=localStorage.getItem("loggedin");
  //   setLoggedin(temp);
  // })
  // let loggedin=localStorage.getItem("loggedin");
  const loggedIn=window.localStorage.getItem("loggedin");


  return (
    <Router>
    <div>
      <Navbar isLoggedIn={loggedIn}/>
      <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/login' component={Login} />
              <Route path='/signup' component={Signup} />
             
              <ProtectedRouter path="/create-mail" component={CreateEmail} />
              <Route path="/logout" component={Logout} />
              <Route path='/history' component={History} />
              <Route path='/scheduled-mails' component={Scheduled} />
        </Switch>
    </div>
    </Router>
  );
}

export default App;
