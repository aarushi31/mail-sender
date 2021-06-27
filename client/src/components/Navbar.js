import React from 'react'
import '../App.css';
import {Link} from "react-router-dom";
function Navbar(props) {
const links=()=>{
    if(props.isLoggedIn){
        return(
            <ul>
             <li><Link to={'/'}  style={{color:"white",textDecoration:"none"}} className="nav-link logo">Mail-Sender</Link></li>
             <li><Link to={'/create-mail'} style={{color:"white",textDecoration:"none"}} className="nav-link">Create email</Link></li>
            <li><Link to={'/logout'} style={{color:"white",textDecoration:"none"}} className="nav-link">Logout</Link></li>
            </ul>
        )
    }
    else{
        return(
            <ul>
                 <li><Link to={'/'}  style={{color:"white",textDecoration:"none"}} className="nav-link logo">Mail-Sender</Link></li>
                <li><Link to={'/login'} style={{color:"white",textDecoration:"none"}} className="nav-link">Login</Link></li>
                <li><Link to={'/signup'} style={{color:"white",textDecoration:"none"}} className="nav-link">Signup</Link></li>
                <li><Link to={'/create-mail'} style={{color:"white",textDecoration:"none"}} className="nav-link">Create email</Link></li>
            </ul>
        )
    }
}
    return (
        <div>
            <nav>
      
      
         
          {links()}
          
       
      </nav>
        </div>
    )
}

export default Navbar
