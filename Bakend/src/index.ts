import express ,{Request,Response}from 'express';
import cors from 'cors'
import "dotenv/config";
import mongoose from "mongoose"
import userRouter from './rotes/users'
import userRoutes from './rotes/auth'
import cookieParser from 'cookie-parser'
import path from 'path';
import {v2 as cloudinary} from 'cloudinary'
import myHotelsRoutes from './rotes/my-hotels'
import hotelRoutes from "./rotes/hotels"
import bookingsRoutes from "./rotes/my-bookings"
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET

})

mongoose.set('debug', true);
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:',err);
});
    

   

const app= express()
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
}));

app.use(express.static(path.join(__dirname,"","../../frontend/dist")))

app.use("/api/users",userRouter)
app.use("/api/auth",userRoutes)
app.use('/api/my-hotels', myHotelsRoutes)
app.use('/api/hotels',hotelRoutes)
app.use('/api/my-bookings',bookingsRoutes)

app.get("*",(req:Request,res:Response)=>{
  res.sendFile(path.join(__dirname,"../../frontend/dist/index.html"))

})

app.listen(3000,()=>{
    console.log('server is running')
})

