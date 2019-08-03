const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/sqpay", {
  useNewUrlParser: true
});
const Schema = mongoose.Schema;
let db = mongoose.connection;
db.on('open', () => {
  console.log("Connectes sucessfully to db");
});

db.on("error", (err)=> {
  console.log("Could not connect to mongo server!");
  return console.log(err);
});


const userSchema = new mongoose.Schema({
  name:{
      type:String,
      required:true
  },
  password:{
      type:String,
      required:true
  },
  firstLogin:Boolean,
  role:{
      type:String,
      required:true,
      enum:['admin','user'],
  },
  phone:{
      type:String,
      required:true
  },
  email:{
      type:String,
      required:true
  },
  gender:{
      type:String,
      enum:['Male','Female'],
  },
 dept:{
   type :String,
   required: true
 },
 card:{
   type:Number,
 }

});

const User = mongoose.model("user",userSchema);
module.exports = {
    User:User
}