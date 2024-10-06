const review=require("../models/reviews.js");
const listing = require("../models/listing.js");
module.exports.reviewhi=async(req,res)=>{
    console.log(req.body);
    let id=req.params.id;
    console.log(id);
    const lis=await listing.findById(id);
    //console.log(lis);
    const newreview=new review(req.body.review);
    newreview.author=req.user._id;
    console.log(newreview);
    lis.reviews.push(newreview);
    console.log(newreview);
    console.log(lis);

    await newreview.save();
    await lis.save();
    req.flash("success","the review is saved sucessfully");
    
    console.log("new review done");
    //res.send("sending from ground report");
    res.redirect(`/listings/shows/${id}`);
    
}

module.exports.reviewvbai=async(req,res)=>{
    let{id,reviewsId}=req.params;
    await listing.findByIdAndUpdate(id,{ $pull:{reviews:reviewsId } });
    await review.findByIdAndDelete(reviewsId);
    req.flash("success","deleted sucessfully");
    res.redirect(`/listings/shows/${id}`);
    
}