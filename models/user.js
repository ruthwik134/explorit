const mongoose=require("mongoose");
const schema=mongoose.Schema;
const PassportLocalMongoose=require("passport-local-mongoose");

const userschema=new schema({
    email:{
        type:String,
        required:true,
    },
});
userschema.plugin(PassportLocalMongoose);
module.exports=mongoose.model('User',userschema);