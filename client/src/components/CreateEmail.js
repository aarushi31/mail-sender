import React,{useState} from 'react'
import {Button} from '@material-ui/core'
import '../css/CreateM.css';
import TextEditor from './TextEditor';
import axios from "axios";


function CreateEmail() {
    let postdata={
        to:"",
        from:"",
        cc:"",
        subject:"",
        text:"",
        day:"",
        date:"",
        hours:"",
        sec:"",
        month:""
    }

    const [to,setTo]=useState("");
    const [from,setFrom]=useState("");
    const [cc,setCc]=useState("");
    const [subject,setSubject]=useState("");
    const [text,setText]=useState("");
    const [day,setDay]=useState("");
    const [sec,setSec]=useState("");
    const [hours,setHours]=useState("");
    const [date,setDate]=useState("");
    const [month,setMonth]=useState("");



    const handleSubmit=async (e)=>{
        e.preventDefault();
        postdata.to=to;
        postdata.from=window.localStorage.getItem("email")
        postdata.cc=cc;
        postdata.subject=subject;
        postdata.text=text;
        postdata.sec=sec;
        postdata.date=date;
        postdata.day=day;
        postdata.hours=hours;
        postdata.month=month

        if(to===""){
            window.alert("Please enter the to field");
        }
        else{
            axios.post("/create-sheduled-mail",postdata)
            .then((response)=>{
                window.alert(response.data.message);
            })

            setTo("");
            setCc("");
            setSubject("");
            setText("");
            setSec("");
            setDate("");
            setDate("");
            setHours("");
            setMonth("");
        }
        
    }

    const sendEmail=(e)=>{
        e.preventDefault();
        postdata.to=to;
        postdata.from=window.localStorage.getItem("email")
        postdata.cc=cc;
        postdata.subject=subject;
        postdata.text=text;


        if(to===""){
            window.alert("Please enter the to field");
        }
        else{
            axios.post("/create-mail",postdata)
            .then((response)=>{
                window.alert(response.data.message);
            })

            setTo("");
            setCc("");
            setSubject("");
            setText("");
            setSec("");
            setDate("");
            setDate("");
            setHours("");
            setMonth("");
        }
    }

    return (
        <div>
            <div className="header">
                <h2>Let's get started</h2>
                <div className="btns">
                <Button variant="outlined" color="primary" href="/history">
                    History
                </Button>
                <Button variant="outlined" color="primary" href="/scheduled-mails">
                    Scheduled mails
                </Button>
                </div>
            </div>
            <div className="create-container">
                <h3>Schedule your mail here:</h3>
                <input type="number" placeholder="Enter the time interval(in seconds)" style={{width:"50%"}} value={sec} onChange={(e)=>setSec(e.target.value)} /><br/><br/>
                <p>Or</p>
                <label>Enter day(0-7) and hours(0-23) to schedule the mail for weekly basis</label><br/><br/>
                <input type="number" placeholder="Day" style={{width:"50%"}} value={day} onChange={(e)=>setDay(e.target.value)}/><br/><br/>
                <input type="number" placeholder="Hours" style={{width:"50%"}} value={hours} onChange={(e)=>setHours(e.target.value)}/><br/><br/>
                <p>Or</p>
                <label>Enter day(1-31) and hours(0-23) to schedule the mail for monthly basis</label><br/><br/>
                <input type="number" placeholder="Date" style={{width:"50%"}} value={date} onChange={(e)=>setDate(e.target.value)}/><br/><br/>
                <input type="number" placeholder="Hours" style={{width:"50%"}}value={hours} onChange={(e)=>setHours(e.target.value)}/><br/><br/>
                <p>Or</p>
                <label>Enter month(1-12), date(1-31) and hours(0-23) to schedule the mail for yearly basis</label><br/><br/>
                <input type="number" placeholder="Month" style={{width:"50%"}} value={month} onChange={(e)=>setMonth(e.target.value)}/><br/><br/>
                <input type="number" placeholder="Date" style={{width:"50%"}} value={date} onChange={(e)=>setDate(e.target.value)}/><br/><br/>
                <input type="number" placeholder="Hours" style={{width:"50%"}} value={hours} onChange={(e)=>setHours(e.target.value)}/><br/><br/>
                

                <Button variant="outlined" color="primary" onClick={handleSubmit}>
                    Schedule
                </Button><br/><br/>
                <label>To </label><br/><br/>
                <input type="text" placeholder="Email address" style={{width:"100%"}} value={to} onChange={(e)=>setTo(e.target.value)} /><br/><br/>
                <label>Cc </label><br/><br/>
                <input type="text" placeholder="Email address" style={{width:"100%"}} value={cc} onChange={(e)=>setCc(e.target.value)}/><br/><br/>
                <label>Subject </label><br/><br/>
                <input type="text" placeholder="Subject" style={{width:"100%"}} value={subject} onChange={(e)=>setSubject(e.target.value)} /><br/><br/>
                <label>Type your email </label><br/><br/>
                <textarea type="text" placeholder="Text" style={{width:"100%",height:"40%"}} value={text} onChange={(e)=>setText(e.target.value)}/><br/>
                {/* <TextEditor/> */}
                <Button variant="contained" color="primary" onClick={sendEmail}>
                Send Now
            </Button>
            </div>
        </div>
    )
}

export default CreateEmail
