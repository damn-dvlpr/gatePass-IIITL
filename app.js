const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const bcrypt = require("bcrypt");
const saltRounds=10;
mongoose.connect('mongodb://localhost:27017/gatePass',{ useNewUrlParser: true });
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

var userSchema=new mongoose.Schema({                        //for maintaining every student's database
    name:String,
    phone:Number,  
    password:{
        type:String,
        required:true
    },  
    rollNo:{
        type:String,
        unique:true
    },
    available:{
        type:Boolean,
        default:true
    }
});

userSchema.pre("save",function(next){                   //before saving password, hashing it
    var user = this;
    bcrypt.hash(user.password, saltRounds, function (err, hash){
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    })
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

// seed();                                //seeds the database

app.get("/",(req,res)=>{
    res.send("Hello There!");
});
app.get("/signup",(req,res)=>{
    res.render("signup.ejs")
})
app.post("/signup",(req,res)=>{
    // console.log(req.body);
    var newUser={
        rollNo:req.body.rollNo,
        password:req.body.password
    }
    User.create(newUser,(err,createdData)=>{
        if(!err)
        console.log(createdData);
        else{
            res.send(err);
        }
    })
})
app.get("/login",(req,res)=>{
    res.render("login.ejs");
})
app.post("/login",(req,res)=>{
    var reqdRollNo=req.body.rollNo.toString();
    User.findOne({rollNo:reqdRollNo},(err,foundData)=>{
        bcrypt.compare(req.body.password, foundData.password , function(err, bcryptres) {
            if(bcryptres==true){
                res.send("success");
            }
            else if(err){
                res.send(err);
            }
            else{
                res.send("combination doesnot exist");
            }
        });    
    });
    // console.log(reqdUser);
    
})
app.listen(8080,()=>{
    console.log("Server running on port 8080");
})
// function seed(){
//     User.remove({},(err)=>{
//         if(!err){
//             console.log("deleted all Users!");
//         }
//     });
//     Outpass.remove({},(err)=>{
//         if(!err){
//             console.log("deleted all Outpasses!");
//         }
//     });    
//     User.create({
//         rollNo:"lit2018009",
//         name:"Naimishrr"
//     },(err,res)=>{
//         console.log(res);
//     });
//     Outpass.create({reason:"market"},(err,res)=>{
//         console.log(res);
//     })
// }