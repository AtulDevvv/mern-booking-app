 import express ,{Request,Response} from "express"
const router=express.Router()
import jwt from "jsonwebtoken"
import User from "../models/user"
import {check, validationResult} from 'express-validator'
import verifyToken from "../middleware/auth"

router.get("/me", verifyToken,async(req:Request,res:Response)=>{
    const userId=req.userId;
    try{
        const user= await User.findById(userId).select("-passwword")
        if(!user){
            return res.status(400).json({message:"User not found"});

        }
        res.json(user);
    }
    
    catch(err){
        console.log(err)
    }
})

router.post("/register",[check("firstName","First Name is required").isString(),
    check("lastName","Email is required").isString(),
    check("email"," Email is required").isString(),
    check("password","Password with 6 or more characters required").isLength({min:6})
],async (req:Request,res:Response)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            message:errors.array()
        })
    }

    try{
        let user= await User.findOne({
            email:req.body.email,


        })

        if(user){
            return res.status(404).json({message:"user already exists"})
        }
        user=new User(req.body);
        await user.save();

        const token=jwt.sign({userId:user.id},process.env.JWT_SECRET_KEY as string ,{
            expiresIn:'1d',
        } );
        res.cookie("auth_token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV ==="production",
            maxAge:8640000,

        })
        return res.status(200).send({message:"User register Ok"})
    }
    catch(error){
       res.status(500).send({message:"something went wrong"})
    }
})


export default router;