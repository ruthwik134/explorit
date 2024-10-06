const User = require("../models/user.js");
module.exports.userk=(req, res) => {
    req.flash("success", "successfully deleted");
    res.render("../views/users/signup.ejs");
}
module.exports.userdash= async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newuser = new User({ username, email });
        const registeredUser = await User.register(newuser, password);
        //console.log(registeredUser);
        //req.flash("success","sucessfully registered");
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "successfully deleted34");
            res.redirect("/listings");

        });
        
    }
    //res.redirect("/listings");
    catch(e){
        req.flash("success","dobbinbdi");
        res.redirect("/signup");
    }



}
module.exports.userdash=async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newuser = new User({ username, email });
        const registeredUser = await User.register(newuser, password);
        //console.log(registeredUser);
        //req.flash("success","sucessfully registered");
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "successfully deleted");
            res.redirect("/listings");

        });
        
    }
    //res.redirect("/listings");
    catch(e){
        req.flash("success","please try again");
        res.redirect("/signup");
    }



}
module.exports.userredirect=(req,res)=>{
    res.render("../views/users/login.ejs");
}
module.exports.userpostlogin=async(req,res)=>{
    //res.send("welcome to kojja fucking center");
    req.flash("success","done baby");
    //res.redirect("/listings");
    let redirecturl=res.locals.redirectUrl || "/listings";
    console.log(redirecturl);
    res.redirect(redirecturl);
    //console.log("hi");

    //res.redirect("/listings");

}
module.exports.userlogout=(req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","logged you out");
        res.redirect("/listings");
    })
}