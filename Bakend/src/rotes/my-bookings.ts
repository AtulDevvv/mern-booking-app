import express ,{Request,Response}from "express";
import verifyToken from "../middleware/auth";
import Hotel from "../models/hotel";
import { HotelTypes } from "../shared/types";

const router= express.Router();

router.get("/", verifyToken,async(req:Request,res:Response)=>{
     try{
         const hotels=await Hotel.find({
            bookings:{$elemMatch:{userId:req.userId}}
         })

         if(hotels){
            console.log( "hotels are :-")
            console.log(hotels[0])

         }
         if(!hotels){
            console.log("no hotel found")
         }
         const result= hotels.map((hotel)=>{
            const userBookings= hotel.bookings.filter((booking)=>booking.userId===req.userId);

            const hotelWithUserBookings:HotelTypes={
               ...hotel.toObject(),
               bookings:userBookings,

            }
            return hotelWithUserBookings;
         })
         
         res.status(200).send(result)

     }
     catch(err){  
        console.log(err)
        res.status(500).json({message:" some wrong !"})
     }
})

export default router;