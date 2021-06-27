import React, { useState,useEffect } from 'react'
import '../css/History.css' 
import axios from "axios";

function Scheduled() {

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
                 <h1 className="history-heading">You don't have any scheduled mails</h1>
                    <img src="/images/schedule.svg" style={{width:"25vw"}}/>
            </center>
            )
        }
        else{
            return(
                <div>
                <h1 className="history-heading">Scheduled Emails</h1>
                {
                    emails.map((email,idx)=>{
                        if(email.scheduled==true){
                        return(
                            <ul className="history-card">
                            <li>To : {email.to}</li>
                            <li>Cc: {email.cc}</li>
                            <li>Subject: {email.subject}</li>
                            <li>Email: {email.text}</li>
                            </ul>
                        )}
                    })
                }
                </div>
            )
        }
    }

    return(
        <div>
            {showContent()}
        </div>
    )

}
export default Scheduled
