const express=require("express");
const mongoose=require("mongoose");
mongoose.connect('mongodb://localhost:27017/gatePass',{ useNewUrlParser: true });
const app=express();

var userSchema=new mongoose.Schema({                        //for maintaining every student's database
    name:String,
    phone:Number,    
    rollNo:{
        type:String,
        unique:true
    },
    available:{
        type:Boolean,
        default:true
    }
});

var outpassSchema=new mongoose.Schema({                          //for everytime he goes out
    outTime:{
        type:Date,
        default:Date.now()
    },
    reason:String,
    inTime:{
        type:Date,
    },
});

const User = mongoose.model('User', userSchema);
const Outpass=mongoose.model('Outpass', outpassSchema);
seed();                                //seeds the database
app.get("/",(req,res)=>{
    res.send("Hello There!");
});
app.listen(8080,()=>{
    console.log("Server running on port 8080");
})
function seed(){
    User.remove({},(err)=>{
        if(!err){
            console.log("deleted all Users!");
        }
    });
    Outpass.remove({},(err)=>{
        if(!err){
            console.log("deleted all Outpasses!");
        }
    });    
    User.create({
        rollNo:"lit2018009",
        name:"Naimishrr"
    },(err,res)=>{
        console.log(res);
    });
    Outpass.create({reason:"market"},(err,res)=>{
        console.log(res);
    })
}