const listing=require("./models/listing.js");
const {listingschema,reviewschema}=require("./schema.js");
const Expresserror=require("./utils/expresserror.js");
const review=require("./models/reviews.js");

module.exports.inLoggedIn=(req,res,next)=>{
    console.log(req.path,"...",req.originalUrl);
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        //console.log(req.session.redirectUrl);
        req.flash("error","you must be logged in");
        return res.redirect("/login");
    };
    next();
    
};

module.exports.savedin=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
        //console.log(res.locals.redirectUrl);
    }
    next();
}

module.exports.imowner=async(req,res,next)=>{
    let { id } = req.params;
    //console.log(req.body.hi2);
    console.log(id);
    let listing1=await listing.findById(id);
    if(!listing1.owner.equals(res.locals.curruser._id)){
        req.flash("error","you have no permission to edit");
        return res.redirect(`/listings/shows/${id}`);
    }

    next();
}

module.exports.validateListing=(req,res,next)=>{
    //console.log(req.body);
    let {error}=listingschema.validate(req.body);
    if(error){
        throw new Expresserror(400,error);
    }
    else{
        next();
    }
}

module.exports.reviewvalidation=(req,res,next)=>{
    let {error}=reviewschema.validate(req.body);
    if(error){
        throw new Expresserror(400,error);
    }
    else{
        next();
    }
}


module.exports.reviewowner=async(req,res,next)=>{
    let { id,reviewsId } = req.params;
    //console.log(req.body.hi2);
    let review1=await review.findById(reviewsId);
    if(!review1.author.equals(res.locals.curruser._id)){
        req.flash("error","you have no permission to delete");
        return res.redirect(`/listings/shows/${id}`);
    }

    next();
}


