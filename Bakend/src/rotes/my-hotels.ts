import express ,{Response,Request} from "express"
import multer from 'multer';
import cloudinary from 'cloudinary'
import Hotel from "../models/hotel";
import { HotelTypes } from "../shared/types"
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router =express.Router();

const storage=multer.memoryStorage();

const upload=multer({
    storage:storage,
    limits:{
        fileSize: 5 * 1024 * 1024,
    }
})
// api/my-hotels
router.post("/",verifyToken,[
    body("name").notEmpty().withMessage('Name is requied'),
    body("city").notEmpty().withMessage('city is requied'),
    body("country").notEmpty().withMessage('country is requied'),
    body("description").notEmpty().withMessage('description is requied'),
    body("type").notEmpty().withMessage('type is requied'),
    body("pricePerNight").notEmpty().isNumeric().withMessage('pricePerNight is requied && must be number'),
   
    body("facilities").notEmpty().isArray().withMessage('facilities are requied'),

    body("image").notEmpty().withMessage('image is requied'),

], upload.array("imageFiles",6)
,async (req:Request, res:Response)=>{
    try{
        const imageFiles=req.files as Express.Multer.File[];
        const newHotel:HotelTypes= req.body;
         // upload the images on cloudinary
         const imageUrls = await uploadImages(imageFiles);
         newHotel.imageUrls=imageUrls;
         newHotel.lastUpdated =new Date();
         newHotel.userId= req.userId;

         // save the new hotel in our database

         const hotel= new Hotel(newHotel)
         await hotel.save();

         res.status(201).send(hotel)

    }
    catch(e){
        console.log("Error creating hotels",e);
        res.status(500).json({message:" Something went wrong"})

    }




})

router.get("/",verifyToken,async (req:Request,res:Response)=>{
    
    try{
        const hotels=await Hotel.find({userId:req.userId})
        res.json(hotels);

    }
    catch(err){
        res.status(500).json({message:"Error fecthing hotels"})

    }
})

router.get("/:id", verifyToken,async (req:Request,res:Response)=>{
    const id= req.params.id.toString();
    try{
         const hotel=await Hotel.findOne({
            _id:id,
            userId:req.userId,
         })
         if (!hotel) {
             res.status(404).json({ message: "Hotel not found" });
        }
         res.json(hotel);
  
        

    }
    catch(err){
        res.status(500).json({message:"Error fetching hotels"})

    }

})

router.put('/:hotelId',verifyToken,upload.array("imageFiles"),async(req:Request,res:Response)=>{
    try{
        const updatedHotel:HotelTypes=req.body;
        updatedHotel.lastUpdated=new Date();

        const hotel =await Hotel.findOneAndUpdate({
            _id:req.params.hotelId,userId:req.userId
        },updatedHotel,{new:true});

        if(!hotel){
            return res.status(404).json({message:"Hotel not found"});
        }
        const files=req.files as Express.Multer.File[];
        const updatedImageUrls=await uploadImages(files)

        hotel.imageUrls=[...updatedImageUrls,...(updatedHotel.imageUrls||[])];
        await hotel.save()
        res.status(201).json(hotel)
    }
    catch(err){
        res.status(500).json({message:"something went wrong"})
    }
})


async function uploadImages(imageFiles: Express.Multer.File[]) {
    const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
    });
    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
}

export default router;