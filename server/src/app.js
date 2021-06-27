require('dotenv').config();
const express=require("express");
const app=express();
const User=require('./models/Users');
const cron=require("node-cron")
const PORT=process.env.PORT||3001;
require("./db/config");
const bcrypt=require("bcryptjs");
const nodemailer=require("nodemailer");
const sendgridTransport = require('nodemailer-sendgrid-transport');



app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    res.send("Hello world");
});

app.post("/register",async (req,res)=>{
    try{
        console.log(req.body.name);
        const userData=new User({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:req.body.password
        })
        console.log(req.body.email)
        const loginData=await User.findOne({email:req.body.email});
        if(loginData)
        {
            return res.json({message:"Email already registered"})
        }
        //password hashing->register.js
        //token
        
        const token=await userData.generateAuthToken();
        // console.log(token);

        const result=await userData.save();
        res.status(201).json({message:"Signedup successfully"})
        
    }catch(err){
        // res.status(400).json({message:"User already exists"});
        console.log(err)
    }
})


//login check
app.post("/login",async (req,res)=>{
    try{
        const email=req.body.email;
        const password=req.body.password;

        console.log(`${email} and ${password}`);
        const loginData=await User.findOne({email:req.body.email});

        const isMatch=await bcrypt.compare(password,loginData.password);
        
        //token
        console.log(loginData)
        const token=await loginData.generateAuthToken();
        // console.log(token);

        res.cookie("jwt",token,{
            // expires:new Date(Date.now() + 50000),
            httpOnly:true,
        });

        if(isMatch)
        {
            res.status(201).json({message:"Logged in successfully"});
        }else if(!isMatch)
        {
            res.json({message:"Oops! Incorrect credentials"})
        }
        else{
            res.json({message:"This account is not registered"});
        }
    }
    catch(err)
    {
        res.status(400).json({message:"Error logging in"});
    }
})

const transporter=nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:"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"
    }
}))

app.post("/create-sheduled-mail",async function(req,res){
    try{

        let sec="*";
        let day="*";
        let hours="*";
        let date="*";
        let month="*";
        if(req.body.sec!=="")
        {
            sec=parseInt(req.body.sec);
            
        }
        if(req.body.day!=="")
        {
            day=req.body.day;
        }
        if(req.body.date!=="")
        {
            date=req.body.date;
        }
        if(req.body.hours!=="")
        {
            hours=req.body.hours;
        }
        if(req.body.month!=="")
        {
            month=req.body.month;
        }
        const emailData={
            to:req.body.to,
            from:req.body.from,
            cc:req.body.cc,
            subject:req.body.subject,
            text:req.body.text,
            scheduled:true
        }
        cron.schedule(`${sec} * ${hours} ${date} ${month} ${day}`,async ()=>{
            
            
            transporter.sendMail({
                to:req.body.to,
                from:"aarushishanker3108@gmail.com",
                cc:req.body.cc,
                subject:req.body.subject,
                html:`
                <h2>${req.body.from} sent a mail to you</h2>
                <p>${req.body.text}</p>
                `
            })
            
            

        })
        await User.findOneAndUpdate({email:emailData.from},{
            $push:{emails:emailData}
        },{new:true})

        res.status(201).json({message:"Email scheduled successfully"})
        
}
    catch(err){
        res.json({message:err})
    }
});

app.post('/create-mail',async (req,res)=>{
    try{
        const emailData={
            to:req.body.to,
            from:req.body.from,
            cc:req.body.cc,
            subject:req.body.subject,
            text:req.body.text,
            scheduled:false
        }
        transporter.sendMail({
            to:req.body.to,
            from:"aarushishanker3108@gmail.com",
            cc:req.body.cc,
            subject:req.body.subject,
            html:`
            <h2>${req.body.from} sent a mail to you</h2>
            <p>${req.body.text}</p>
            `
        })
        
        await User.findOneAndUpdate({email:emailData.from},{
            $push:{emails:emailData}
        },{new:true})

        res.status(201).json({message:"Email sent successfully"})

    }catch(err)
    {
        res.json({message:err})
    }
})



app.post('/get-mails',async (req,res)=>{
    const userData=await User.findOne({email:req.body.from});
    console.log(userData)
    res.send(userData.emails);
})

app.post('/get-sheduled-mails',async (req,res)=>{
    const userData=await User.findOne({email:req.body.from,scheduled:true});
    console.log(userData)
    if(userData==null)
    {
        return res.json({message:"No emails"})
    }
    res.send(userData.emails);
})


app.listen(PORT,()=>{
    console.log(`Server running at Port ${PORT}`);
})

