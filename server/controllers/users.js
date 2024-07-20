const User = require("../models/userSchema.js");

//render signup page

//signup
module.exports.signup =async(req ,res)=>{
    try{
    let {username , email , password} = req.body;
    const newUser = new User({email , username});
    const registeredUser =  await User.register(newUser , password);
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err); 
        }
    // req.flash("success" , "Welcome to StockWise !");
    res.redirect("/");
    });
    
    }catch(e){
        req.flash("error" , e.message);
        res.redirect("/signup"); 
    }
    
};

//render login page

//login
module.exports.login = async(req ,res)=>{
    // req.flash("success" , "Welcome back to StockWise !");
    let redirectUrl = res.locals.redirectUrl || "/";
    res.redirect(redirectUrl);
};

//logout
module.exports.logout =  (req ,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        // req.flash("success" , "you are logged out");
        res.redirect("/");
    })
};