if(process.env.NODE_ENV !="production"){
    require('dotenv').config();
}


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing.js");
const review=require("./models/reviews.js");
const methodOverride = require("method-override");
const engine = require("ejs-mate");
const path = require("path");
const wrapAsync = require("./utils/wrapAsync.js");
const Expresserror = require("./utils/expresserror.js");
const {listingschema,reviewschema}=require("./schema.js");
const listings=require("./routing/listing.js");
const reviews=require("./routing/review.js");
const session=require("express-session");
const MongoStore = require('connect-mongo');

const flash=require("connect-flash");
const passport=require("passport");
const Localstrategy=require("passport-local");
const user=require("./classroom/routes/user.js");
const User=require("./models/user.js");
const userRouter=require("./routing/user.js");
const listingcontroller=require("./controllers/listings.js");

app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.engine("ejs", engine);
app.set("viewengine", "ejs");
app.set("views", path.join(__dirname, "views"));
const cookiesParser=require("cookie-parser");
app.use(cookiesParser('secretcode'));
const dburl=process.env.ATLASDB_URL;
const store=MongoStore.create({
    mongoUrl:dburl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
});
store.on("error",()=>{
    console.log("error in the above declaration please try it agaian",err);
})
const sessionoptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true
    ,cookie:{
        expires:Date.now()+1000*60*60*24*3,
        maxAge:1000*60*60*24*3,
        httpOnly:true,

    }};


app.use(session(sessionoptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new Localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error = req.flash('error');
    res.locals.curruser=req.user;
    console.log(res.locals.success);
    console.log("hi");
    next();


});


//app.use((req,res,next)=>{
    //res.locals.success=req.flash("success");
    //next();
//})
app.get("/",wrapAsync(listingcontroller.index) );
app.get("/hi",(req,res)=>{
    res.redirect("/listings");
})

app.get("/getcookiedag",(req,res)=>{
    console.log(req.cookies);

})
app.get("/helloi",(req,res)=>{
    console.log("hi");
    res.send("hello,world");
});
app.get("/userparser",(req,res)=>{
    res.cookie("name","sai",{signed:"true"});
    res.cookie("philing","ranga",{signed:"true"});
    res.send("sending raining fall");
});
app.get("/verfication",(req,res)=>{
    console.log(req.signedCookies);
    res.send("hello world");

})

app.listen(8080, () => {
    console.log("listening 8080")});

main().then(() => {
    console.log("the db is connected");
})
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(dburl);

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//app.get("/", (req, res) => {
    //console.log(listing);
    //res.send("app i slistening");
//});
app.get("/getcookies",(req,res)=>{
    res.cookie("grt8","hello");
    res.cookie("name","rod");
    res.send("anything from the");
})


//const validateListing=(req,res,next)=>{
    //console.log(req.body);
    //let {error}=listingschema.validate(req.body);
    //if(error){
       // throw new Expresserror(400,error);
    //}
    //else{
        //next();
    //}
//}
//const reviewvalidation=(req,res,next)=>{
    //let {error}=reviewschema.validate(req.body);
   // if(error){
      //  throw new Expresserror(400,error);
   // }
    //else{
     //   next();
   // }
//}

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error = req.flash('error');
    res.locals.curruser=req.user;
    console.log(res.locals.success);
    console.log("hi");
    next();


});

app.get("/demouser",async(req,res)=>{
    let fakeUser= new User({
        email:"sairuthwik@gmail.com",
        username:"deltain"
    })
    const registereduser=await User.register(fakeUser,"saiguruju");//no data base checking it will do it directly with out any intervention.
    res.send(registereduser);
})

app.use("/listings",listings);
app.use("/listings/:id",reviews);
app.use("/",userRouter);
//app.get("/listings/new",async(req,res)=>{
//    const listing1=new listing({
//        title:"uagag",
//        description:"this about the autjor",
//        location:"hyderabad",
//        country:"india",
//    });pillahook

//    await listing1.save();
//    console.log("saved");
//   res.send("sucessfully saved");
//})
//app.get("/listings", async (req, res) => {
    //const model1 = await listing.find({});
    //res.render("listings/index.ejs", { model1 });
//})

//app.get("/listings/shows/:id", async (req, res) => {
   // let { id } = req.params;
    //console.log(id);
    //const k = await listing.findById(id).populate("reviews");
    //res.render("listings/show.ejs", { k });



//});

//app.get("/listings/new", (req, res) => {
    //res.render("listings/new.ejs");
//})

//app.post("/listings/show2",validateListing, wrapAsync(async (req, res, next) => {
    //const newlistings = new listing(req.body.hi2);
    //await newlistings.save();
    //res.redirect("/listings");

//}));

//app.get("/listings/:id/edit", async (req, res) => {
    //let { id } = req.params;
    //const lis1 = await listing.findById(id);
    //res.render("listings/edit.ejs", { lis1 });


//})

//app.put("/listings/update/:id", wrapAsync(async (req, res) => {
    //if(!req.body.hi2){
        //throw new Expresserror(400,"enetr valid one");
    //}
    
    
    
    //let { id } = req.params;
    //console.log(req.body
    //console.log(id);
    //await listing.findByIdAndUpdate(id, { ...req.body.hi2 });
    //console.log("hi");
    //console.log(id);
    //res.redirect(`/listings/shows/${id}`);
    //res.redirect("/listings");


//}));

//app.delete("/listings/:id/delete", async (req, res) => {
    //let { id } = req.params;
    //await listing.findByIdAndDelete(id);
    //res.redirect("/listings");
//})
//app.all("*", (req, res, next) => {
//    next(new Expresserror(404, "pagenotfound"));

//})
//app.post("/listings/:id",reviewvalidation,wrapAsync(async(req,res)=>{
    //let id=req.params.id;
    //console.log(id);
    //const lis=await listing.findById(id);
    //console.log(lis);
    //const newreview=new review(req.body.review);
    //lis.reviews.push(newreview);

    //await newreview.save();
    //await lis.save();
    //console.log("new review done");
    //res.send("sending from ground report");
    //res.redirect(`/listings/shows/${id}`);
    
//}));

//app.delete("/listing/:id/reviews/:reviewsId",wrapAsync(async(req,res)=>{
    //let{id,reviewsId}=req.params;
    //await listing.findByIdAndUpdate(id,{ $pull:{reviews:reviewsId } });
    //await review.findByIdAndDelete(reviewsId);
    //res.redirect(`/listings/shows/${id}`);
    
//}));


app.use((err, req, res, next) => {
    //res.send(err);
    let { status = 500, message = "something went wrong" } = err;
    req.flash(err);
    console.log(err);
    //console.log(status);
    //console.log("ho")
    res.status(status).render("error.ejs", { message });

});

//app.post("/hi",async(req,res)=>{
    //let id=req.params.id;
    //const listing=await listing.findById(id);
    //const newreview=new review(req.body.review);
    //listing.review.push(newreview);

    //await newreview.save();
    //await listing.save();

    //console.log("new review done");
    //res.send("done with the one ");

//});



//const mayya=()=>{
    //const we=listing.findById({title:"Cozy Beachfront Cottage"});
    //console.log(we);
//};

//mayya();
//app.use((err, req, res, next) => {
    //res.send(err);
    //let { status = 500, message = "something went wrong" } = err;
    //console.log(status);
    //res.status(status).send(message);
    //res.render("error.ejs",{message});

//});

