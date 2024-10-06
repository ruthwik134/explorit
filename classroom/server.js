const express=require("express");
const app=express();
const users=require("./routes/user.js");
const posts=require("./routes/post.js");
const session=require('express-session');
const path = require("path");
const flash=require("connect-flash");
const engine=require("ejs-mate");
app.engine("ejs",engine);
app.set("viewengine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(session({secret:"dhammu",resave:false,saveUninitialized:false}));
app.use(flash());
app.use((req,res,next)=>{
    console.log("bhai");
    res.locals.messages=req.flash("error");
    res.locals.error=req.flash("sucess");
    
    next();
})



app.get("/register",(req,res)=>{
    let {name="anynomous"}=req.query;
    //req.flash("sucess","user sucessfully registered");
    //req.flash("error","error benn done gone case");
    //req.session.name=name;
    //console.log(req);
    if(name==="anynomous"){
        req.flash("sucess","user sucessfully registered");
    }
    else{
        console.log("hi");
        req.flash("error","error has been done please recheck");

    }

    res.redirect("/hello");

})
app.get("/hello",(req,res)=>{
    
    //console.log(req);
    //res.send(`the hello ${req.session.name}`);
    res.render("view.ejs",{name:req.session.name});

});



app.get("/test",(req,res)=>{
    res.send("test sucessful");


})
app.get("/recount",(req,res)=>{
    if(req.session.count){
        req.session.count++;
    }
    else{
        req.session.count=1;
    }
    res.send(`the count is ${req.session.count} times`);
});
app.get("/",(req,res)=>{
    res.send("sending response");
});



app.listen(8080,()=>{
    console.log("listening");

});

app.use("/users",users);
app.use("/posts",posts);
