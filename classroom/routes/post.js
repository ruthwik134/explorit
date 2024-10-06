const express=require("express");
const app=express();
const router=express.Router();
router.get("/",(req,res)=>{
    res.send("this are users");
})

router.get("/:id",(req,res)=>{
    res.send("this are users");
})


router.post("/",(req,res)=>{
    res.send("joker");

});

router.delete("/:id/delete",(req,res)=>{
    res.send("dlete");
})


module.exports=router