const argon2 = require("argon2");
const express = require("express");
const UserModel = require("../Models/user.Model");
const jwt = require('jsonwebtoken');
const UserRounter = express.Router();

UserRounter.post("/signup", async(req,res)=>{
    try{
        
        let obj = {...req.body};
        console.log(obj);
        const hash = await argon2.hash(obj.password);
        obj.password = hash;
        const data = new UserModel(obj);
        await data.save();
        console.log(data);
        let token = jwt.sign(data[0].email, 'masai');
        res.status(200).json({message:"user Created",token:token});
    }
    catch(err){
        console.log(err.message);
        res.json(err.message);
    }
});

UserRounter.post("/login",async(req,res)=>{
    try{
  
        const data = await  UserModel.find({email:req.body.email});
        console.log(data);
        if(data.length)
        {
            if(await argon2.verify(data[0].password,req.body.password))
            {
                let token = jwt.sign(data[0].email, 'masai');
                res.status(201).json({message : " Logged in",token:token});
            }
            else
            {
                res.status(200).json("Entered Wrong credentials please check it");
            }
        }
        else
        res.status(400).json({message : "Enter Valid Email id or Signup"});
    }
    catch(err){
        console.log(err.message);
        res.json(err.message);
    }
})
module.exports = UserRounter;