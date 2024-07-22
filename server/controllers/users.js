const User = require("../models/userSchema.js");

//render signup page
module.exports.renderSignupForm = (req, res) => {
    res.render("../user/signup.ejs");
};

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
    res.redirect("/api/companies");
    });
    
    }catch(e){
        res.redirect("/signup"); 
    }
    
};

//render login page
module.exports.renderLoginForm = (req, res) => {
    res.render("../user/login.ejs");
};

//login
module.exports.login = async(req ,res)=>{
    let redirectUrl = res.locals.redirectUrl || "/api/companies";
    res.redirect(redirectUrl);
};

//logout
module.exports.logout =  (req ,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        res.redirect("/api/companies");
    })
};