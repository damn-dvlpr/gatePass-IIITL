const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("./models/UserModel")
const Outpass=require("./models/OutpassModel")
mongoose.connect('mongodb://localhost:27017/gatePass', { useNewUrlParser: true });
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// seed();                                //seeds the database

app.get("/", (req, res) => {
    res.send("Hello There!");
});
app.get("/signup", (req, res) => {
    res.render("signup.ejs")
})
app.post("/signup", (req, res) => {
    // console.log(req.body);
    var newUser = {
        rollNo: req.body.rollNo,
        password: req.body.password,
        name:req.body.Name,
        phone:req.body.phone
    }
    User.create(newUser, (err, createdData) => {
        if (!err)
            console.log(createdData);
        else {
            console.log(err);
        }
    })
})
app.get("/login", (req, res) => {
    res.render("login.ejs");
})
app.post("/login", (req, res) => {
    var reqdRollNo = req.body.rollNo.toString();
    User.findOne({ rollNo: reqdRollNo }, (err, foundData) => {
        bcrypt.compare(req.body.password, foundData.password, function (err, bcryptres) {
            if (bcryptres == true) {
                res.send("success");
            }
            else if (err) {
                res.send(err);
            }
            else {
                res.send("combination doesnot exist");
            }
        });
    });
    // console.log(reqdUser);

})
app.listen(8080, () => {
    console.log("Server running on port 8080");
})
// function seed() {
    // User.remove({},(err)=>{
    //     if(!err){
    //         console.log("deleted all Users!");
    //     }
    // });
    // Outpass.remove({},(err)=>{
    //     if(!err){
    //         console.log("deleted all Outpasses!");
    //     }
    // });    
//     User.create({
//         rollNo: "lit2018009",
//         password:"xxx",
//         name: "Naimishrr"
//     }, (err, res) => {
//         if (!err) {
//             console.log(res);
//             Outpass.create({ reason: "markiiit" }, (err, res) => {
//                 console.log(res);
//                 User.findOne({ rollNo: "lit2018009" }, (err, returnedUser) => {
//                     returnedUser.outPassInformation.push(res);
//                     returnedUser.save();
//                     console.log(returnedUser);
//                 })
//             })
//         }
//     }
//     )
// }