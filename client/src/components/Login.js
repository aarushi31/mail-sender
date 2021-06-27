import React,{useState} from 'react';
import '../css/login.css'
import { FormControl,InputLabel,Input,FormHelperText,Button } from '@material-ui/core';
import {GoogleLogin} from 'react-google-login'
import Icon from "./icon";
import axios from "axios"
import {Redirect} from "react-router-dom";

function Login() {
    let postdata={
        email:"",
        password:""
    }

    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");

    const googleSuccess=async (res)=>{
        //console.log(res?.profileObj)
        try{
            
            postdata.email = res.profileObj.email;
            postdata.password = res.profileObj.googleId;
            axios.post('/login',postdata)
                .then((response)=>{
                    console.log(response);
                    localStorage.setItem("loggedin",true);
                    localStorage.setItem("email",postdata.email);
                    window.location.href="/create-mail";
                })
            
        }
        catch(err)
        {
            console.log(err)
        }



    }
    const googleFailure=()=>{
        window.alert("Google signin was unsuccessful. Try again later")
    }

    const handlesubmit=(e)=>{
        e.preventDefault();
        postdata.email=email;
        postdata.password=password;
        if(email===""||password==="")
        {
            window.alert("Enter valid inputs")
        }
        else{
            axios.post('/login',postdata)
            .then((response)=>{
                console.log(response.data.message)
                if(response.status===201)
                {
                    localStorage.setItem("loggedin",true);
                    localStorage.setItem("email",postdata.email);
                    window.location.href="/create-mail";
                }
            })
            
        }
    }


    return (
        <div className="body">
           <div className="container">
            <center><h2 className="heading">Login | <a style={{color:"blue",fontWeight:"300",textDecoration:"none"}} href="/signup">Create an account</a></h2>
            <FormControl>
                <InputLabel htmlFor="my-input">Email address</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" value={email} onChange={(e)=>setemail(e.target.value)}/>
                <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
            </FormControl>
            <br/><br/>
            <FormControl>
                <InputLabel htmlFor="my-input">Password</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" type="password" value={password} onChange={(e)=>setpassword(e.target.value)} />
            </FormControl>
            <br/><br/>
            <Button variant="contained" color="primary" onClick={handlesubmit}>
                Login
            </Button>
            <br/><br/>
            <h3 className="or">Or</h3>
            <br/><br/>
            <GoogleLogin
                clientId="158634981732-ho0882p8bbut0d6jmavcp7rc15i0q6sr.apps.googleusercontent.com"
                render={(renderProps)=>(
                    <Button className="googleButton" color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant="contained">
                        Google Login
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

export default Login
