import React, { useEffect } from 'react'
import Home from './Home'


function Logout() {

    useEffect(()=>{
        localStorage.clear();
    },[])

    const reload=()=>{
        window.location.reload();
        window.location.href="/login";
    }
    reload();
    return (
        <Home/>
    )
}

export default Logout
