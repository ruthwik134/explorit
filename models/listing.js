const mongoose=require("mongoose");
const review=require("./reviews.js");
const schema=mongoose.Schema;

const listingschema=new schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    image:{
        filename:String,
        url:String,
    },
    price:{type:Number},
    location:{type:String},
    country:{type:String},
    reviews:[
        {
            type:schema.Types.ObjectId,
            ref:"review",
        }
    ],
    owner:{
        type:schema.Types.ObjectId,
        ref:"User",


    },
    geometry:{
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
          },
          coordinates: {
            type: [Number],
            required: true
          }
    }
});;
listingschema.post("findOneAndDelete",async(listing)=>{
    if(listing.reviews.length){    
    const res=await review.deleteMany({_id:{$in:listing.reviews}});
    }
    console.log("hi");
    //console.log(res);
})
const listing=mongoose.model("listing",listingschema);
module.exports=listing;