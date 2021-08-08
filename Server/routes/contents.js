const express=require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');
const Manager = mongoose.model('Manager');
router.post('/getCustomers', async (req,res)=>{
    Manager.find({email:req.body.email})
    .then(result=>{
        // console.log(result[0].Customers);
        // console.log(result[0].name);
        res.send(result[0].Customers)
    })
})
router.post('/sendMessage', async (req,res)=>{
    const {email,message}=req.body;
        Customer.findOneAndUpdate({"email":email}, {
            $push: { messages: { "message": message} }
        }, {
            new: true
        })
        .exec((err, result) => {
           console.log('Pushed');
        })
    return res.status(201).json({ message: 'Message sent successfully !' });
})
router.post('/getMessages',async(req,res)=>{
    await Customer.find({email:req.body.email})
    .then(result=>{
        res.send(result[0].messages);
    })
})
router.post('/review',async(req,res)=>{
    let manager;
    var rating=req.body.review;
    console.log(rating)
    await Customer.find({email:req.body.email})
    .then(result=>{
        manager=result[0].Manager;
    })
    await Manager.findOneAndUpdate({"name":manager},{
        $set:{"reviews":rating}},
        {
            new:true,
        })
        .exec((err,result)=>{
            res.status(201).json({message:"Posted"});
        })
})
module.exports=router;
