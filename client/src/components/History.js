import React, { useState,useEffect } from 'react'
import '../css/History.css' 
import axios from "axios";

function History() {

    const [emails,setEmails]=useState([{}]);

    let postData={
        from:window.localStorage.getItem("email")
    }
    useEffect(()=>{
        axios.post('/get-mails',postData)
        .then(response=>{
            console.log(response.data[0]);
            setEmails(response.data)
        })
    },[])
    
    const showContent=()=>{
        if(!emails){
            return(
            <center>
                 <h1 className="history-heading">You don't have any mails in history</h1>
                    <img src="/images/history.svg" style={{width:"25vw"}}/>
            </center>
            )
        }
        else{
            return(
                <div>
                <h1 className="history-heading">Past Emails</h1>
                {
                    emails.map((email,idx)=>{
                        return(
                            <ul className="history-card">
                            <li>To : {email.to}</li>
                            <li>Cc: {email.cc}</li>
                            <li>Subject: {email.subject}</li>
                            <li>Email: {email.text}</li>
                            </ul>
                        )
                    })
                }
                </div>
            )
        }
    }
    return (
        <div>
              {showContent()}
        </div>
    )
}

export default History
