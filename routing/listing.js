const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingschema,reviewschema}=require("../schema.js");
const Expresserror = require("../utils/expresserror.js");
const listing = require("../models/listing.js");
const {inLoggedIn,imowner,validateListing}=require("../middleware.js");
const path = require("path");
const listingcontroller=require("../controllers/listings.js");
const multer  = require('multer');
const {storage}=require("../cloudconfig.js");
const upload = multer({ storage });




router.get("/",wrapAsync(listingcontroller.index) );
router.get("/filter",wrapAsync(listingcontroller.smallfill));

router.get("/shows/:id", listingcontroller.showlis);

router.get("/new",inLoggedIn, (req, res) => {
    
    res.render("listings/new.ejs");
})
//router.get("/listings/:id/delete",(req,res)=>{
    //res.redirect("/listings");
//})

router.post("/show2",upload.single("hi2[image]"),validateListing,wrapAsync(listingcontroller.showlis2));
//router.post("/show2",upload.single("hi2[image]"),(req,res)=>{
    //res.send(req.file);
//});

router.get("/:id/edit", inLoggedIn,imowner,listingcontroller.edit);


router.put("/update/:id",upload.single("hi2[image]"), inLoggedIn,imowner,wrapAsync(listingcontroller.update));

router.delete("/:id/delete",inLoggedIn, imowner,listingcontroller.delete);



module.exports=router;