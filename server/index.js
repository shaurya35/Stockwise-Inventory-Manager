if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}


const express = require('express');
const app = express();
const mongoose = require("mongoose");
const path = require("path");


const session = require("express-session");
const MongoStore = require("connect-mongo");
// const flash = require("connect-flash");  //make a .ejs flash file or make a .jsx flash file
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/userSchema.js");

const userRouter = require("./routes/user.js");



const DatabaseURL = process.env.ATLASDB_URL;

main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(DatabaseURL);
}

app.use(express.urlencoded({ extended:true }));

const store = MongoStore.create({
    mongoUrl : dbUrl,
    crypto :{
        secret:process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

// store.on("error" , ()=>{
//     console.log("Error in MONGO Session Store" , err);
// });

const sessionOptions ={
    store ,
    secret:process.env.SECRET,
    resave:false ,
    saveUninitialized :true ,
    cookie:{
    expires :Date.now() + 7 * 24 * 60 * 60 * 1000 ,
    maxAge :7 * 24 * 60 * 60 * 1000 ,
    httpOnly:true ,
    },
};


app.use(session(sessionOptions));
// app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use("/" , userRouter);

app.listen(8080  ,()=>{
    console.log("server is listening to port 8080");
})