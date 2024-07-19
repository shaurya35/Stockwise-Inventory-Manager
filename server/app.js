const express = require("express") //require express
const app = express(); //set function in app
const mongoose = require("mongoose"); //mongo database install
const path = require("path");


const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/userSchema.js");

const MongoUrl = "mongodb://127.0.0.1:27017/StockWise";

main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(MongoUrl);
}

app.use("/" ,(req , res)=>{
    res.send("i am root");
})

app.listen(8080 , ()=>{
    console.log("server is connected to port 8080");
})