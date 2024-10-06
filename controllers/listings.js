const listing = require("../models/listing.js");
const mbxgeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxgeocoding({ accessToken: mapToken });

    
module.exports.index = async (req, res) => {
    //res.locals.msg=req.flash("success");
    const model1 = await listing.find({});
    res.render("listings/index.ejs", { model1 });
}
module.exports.smallfill=async(req,res)=>{
    const k = await listing.find({ country: new RegExp(req.query.filter, 'i') });
    const k2=await listing.find({location:new RegExp(req.query.filter,'i')});
    if(k.length>0){
        const model2=k;
        res.render("listings/serch.ejs",{model2});
        console.log("hi ra puka");
    }
    else if(k2.length>0){
        model2=k2;
        res.render("listings/serch.ejs",{model2});

    }
    else{
        res.status(404).send("not found");
    }
    
}

module.exports.showlis = async (req, res) => {
    let { id } = req.params;
    //console.log(id);
    const k = await listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    console.log(k);
    if (!k) {
        req.flash("success", "new listing not ");
        res.redirect("/listings");
    }
    console.log(k);

    res.render("listings/show.ejs", { k });



}

module.exports.showlis2 = async (req, res, next) => {
    let response=await geocodingClient.forwardGeocode({
        query: req.body.hi2.location,
        limit: 1
      })
        .send()
    //console.log(response.body.features[0].geometry); 
    //res.send("done");
    const url = req.file.path;
    const name = req.file.filename;
    const newlistings = new listing(req.body.hi2);
    newlistings.owner = req.user._id;
    //console.log(newlistings);
    //console.log(req.body.hi2);
    newlistings.image = { url, name };
    newlistings.geometry=response.body.features[0].geometry;
    await newlistings.save();
    console.log(newlistings);
    //console.log(req.user._id);
    req.flash("sucess", "successfully entered the details");
    res.redirect("/listings");

}
module.exports.edit = async (req, res) => {
    let { id } = req.params;
    const lis1 = await listing.findById(id);
    if (!lis1) {
        req.flash("success", "they donot exist");
        res.redirect("/listings");
    }
    let originalimage=lis1.image.url;
    originalimage=originalimage.replace("/upload","/upload/h_100,w_100");

    res.render("listings/edit.ejs", { lis1 ,originalimage});


}
module.exports.update = async (req, res) => {
    if (!req.body.hi2) {
        throw new Expresserror(400, "enetr valid one");
    }
    let { id } = req.params;




    console.log(id);
    let Listing = await listing.findByIdAndUpdate(id, { ...req.body.hi2 });
    if (req.file) {
        const url = req.file.path;
        const filename = req.file.filename;
        Listing.image = { url, filename };
    }
    await Listing.save();
    console.log("hi");
    console.log(id);
    console.log(req.body.hi2);
    res.redirect(`/listings/shows/${id}`);
    //res.redirect("/listings");


};
module.exports.delete = async (req, res) => {
    let { id } = req.params;
    req.flash("success", "successfully deleted");
    await listing.findByIdAndDelete(id);
    res.redirect("/listings");
};