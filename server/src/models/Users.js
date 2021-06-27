const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken")
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:3
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
    emails:[
        { 
        to:{
            type:String,
            required:true
        },
        cc:{
            type:String,
        },
        subject:{
            type:String,
        },
        text:{
            type:String,
        },
        scheduled:{
            type:Boolean
        }
    
    }
    ]
});

//generating tokens
userSchema.methods.generateAuthToken=async function()
{
    try
    {
        const tokenn=jwt.sign({_id:this._id.toString()},"Thisismysecretkeyforthemailsenderapp^%$FG^");
        this.tokens=this.tokens.concat({token:tokenn})
        await this.save();
        console.log(tokenn);
        return tokenn;
    }
    catch(err)
    {
        res.send(err);
    }
}

//called before save method in app.js
//password hashing
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
    this.password=await bcrypt.hash(this.password,10);
    }
    next(); //call the save method now
})

const User=new mongoose.model("USER",userSchema);
module.exports=User;