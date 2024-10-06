const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Expresserror = require("../utils/expresserror.js");
const review=require("../models/reviews.js");
const {listingschema,reviewschema}=require("../schema.js");
const listing = require("../models/listing.js");
const {reviewvalidation,inLoggedIn,imowner,reviewowner}=require("../middleware.js");
const reviewcontroller=require("../controllers/review.js")


//const {inLoggedIn,imowner,reviewowner}=require("../middleware.js");




router.post("/",inLoggedIn,reviewvalidation,wrapAsync(reviewcontroller.reviewhi));


router.delete("/reviews/:reviewsId",inLoggedIn,reviewowner,wrapAsync(reviewcontroller.reviewvbai));

module.exports=router;