const mongoose=require("mongoose");
const initdata=require("./data.js");

const listing=require("../models/listing.js");
main().then(()=>{
    console.log("the db is connected");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wandelust');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const initdb=async ()=>{
    await listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj,owner:'66be111cb75230fdedfa230f'}));
    await listing.insertMany(initdata.data);
    console.log("sai ruthwik");
}
initdb();