const Router = require("express").Router();
const database = require("../db/database");
const notie = require("notie");
let User = database.User;


Router.get("/",(req,res)=>{
    res.render("home");
});
Router.get("/signup",(req,res)=>{
    res.render("signup");
});
Router.get("/error",(req,res)=>{
    res.render("error",{abc:"not connected  "});
});
Router.get("/login",(req,res)=>{
    res.render("login");
});
Router.post("/login",(req,res)=>{
    User.findOne({
        email: {
            $eq: req.body.email
        },
        password:{
            $eq:req.body.password
        }
    },(err,fetched)=>{
        if(err) throw err;
        else{
            if(!fetched){
               res.send("notfound")
                //res.render("error",{err:"OOPSS! not regestired try signing-up"})
            }
            else{
                res.send("logged in ");
            }
        }
    });
})
Router.post("/signup",(req,res)=>{
    var emailUser = req.body.email;
    User.findOne({
        email: {
            $eq: emailUser
        }
    }, (err, fetched) => {
        if (fetched) {
            res.send("found");
        } else {
             new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone,
                role: "user",
                firstLogin: true,
                gender:req.body.gender,
                dept: req.body.dept
            }).save((err) => {
                if (err)
                    throw err;
                    else
                    res.send("created");
            });
        }
    });
});



module.exports = Router;