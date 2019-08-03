const express = require("express");
const database = require("./db/database.js");
const ejs = require("ejs");
const path = require("path");
const bodyParser = require("body-parser");
let session = require('express-session');
const nodemailer = require('nodemailer');
const secret  = require("./secret");
const mainRoute = require('./routes/main');

const app = express();
//setting thigs up
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("views", path.join(__dirname, "views"));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


let  smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: secret.id,
        pass: secret.pass
    }
});
// setting upn routes
app.use("/",mainRoute);



// strting a server
app.listen(4000,(err)=>{
  if(err) throw err;
  else console.log("lsitening to 4000");
})