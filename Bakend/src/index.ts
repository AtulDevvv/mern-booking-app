import express ,{Request,Response}from 'express';
import cors from 'cors'
import "dotenv/config";
import mongoose from "mongoose"
import userRouter from './rotes/users'
import userRoutes from './rotes/auth'
import cookieParser from 'cookie-parser'
import path from 'path';

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

app.listen(3000,()=>{
    console.log('server is running')
})

