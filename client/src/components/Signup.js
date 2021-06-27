import React,{useState} from 'react';
import '../css/login.css'
import { FormControl,InputLabel,Input,FormHelperText,Button } from '@material-ui/core';
import {GoogleLogin} from 'react-google-login'
import Icon from "./icon"
import axios from "axios"

function Signup() {

    let postdata={
        name:"",
        email:"",
        phone:"",
        password:""
    }
 
    const [name,setname]=useState("");
    const [email,setemail]=useState("");
    const [phone,setphone]=useState("");
    const [password,setpassword]=useState("");

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }

    const googleSuccess=async (res)=>{
        //console.log(res)
        try{
                
                postdata.name = res.profileObj.name;
                postdata.email = res.profileObj.email;
                postdata.phone = "";
                postdata.password = res.profileObj.googleId;

                axios.post('/register',postdata)
                .then((response)=>{
                    console.log(response);
                    if(response.status==201){
                        window.alert("Registration successful");
                        window.location.href="/login"
                    }
                })

        }
        catch(err)
        {
            console.log(err);
        }
        
    }
    const googleFailure=()=>{
        window.alert("Google signin was unsuccessful. Try again later")
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        postdata.name=name;
        postdata.email=email;
        postdata.phone=phone;
        postdata.password=password;
        
        if(email===""||name===""||password==="")
        {
            window.alert("Please give valid input");
        }else if(password.length<4)
        {
            window.alert("Please enter a strong password");
        }else if(!validateEmail(email))
        {
            window.alert("Please enter a valid email Id");
        }
        else if(phone.length!=10)
        {
            window.alert("Please enter valid phone no.");
        }else{
            axios.post('/register',postdata)
                .then((response)=>{
                    console.log(response);
                    // if(response.status==201){
                    //     console.log("Registration successful")
                    // }
                    // else if(response.status==400){
                    //     console.log("User already exists")
                    // }
                    window.alert(response.data.message)
                    window.location.href="/login";
                })

        }
    }

    return (
        <div className="body">
           <div className="container">
            <center><h2 className="heading">Signup | <a style={{color:"blue",fontWeight:"300",textDecoration:"none"}} href="/login">Already have an account?</a></h2>
            <FormControl>
                <InputLabel htmlFor="my-input">Full Name</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" value={name} onChange={(e)=>setname(e.target.value)} />
                
            </FormControl>
            <br/><br/>
            <FormControl>
                <InputLabel htmlFor="my-input">Mobile no.</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" value={phone} onChange={(e)=>setphone(e.target.value)}/>
                
            </FormControl>
            <br/><br/>
            <FormControl>
                <InputLabel htmlFor="my-input">Email address</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" value={email} onChange={(e)=>setemail(e.target.value)}/>
                <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
            </FormControl>
            <br/><br/>
            <FormControl>
                <InputLabel htmlFor="my-input">Password</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" type="password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
            </FormControl>
            <br/><br/>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Create an account
            </Button>
            <br/><br/>
            <h3 className="or">Or</h3>
            <br/>
            <GoogleLogin
                clientId="158634981732-ho0882p8bbut0d6jmavcp7rc15i0q6sr.apps.googleusercontent.com"
                render={(renderProps)=>(
                    <Button className="googleButton" color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant="contained">
                        Google Signin
                    </Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin"
            />
            </center>
            </div> 
        </div>
    )
}

export default Signup
