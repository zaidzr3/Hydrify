import express, {Request, Response} from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import cookieParser from "cookie-parser";
import path from 'path';
import {v2 as cloudinary} from 'cloudinary';
import myBeverageRoutes from './routes/my-beverages';
import beverageRoutes from "./routes/beverages";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());
app.use(express.json()) //Convert the body of API requests into Json automatically, so we don't have to do it manually in each of our endpoints
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true,
}));

app.use(express.static(path.join(__dirname, "../../Frontend/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-beverages", myBeverageRoutes);
app.use("/api/beverages", beverageRoutes );

app.get("*", (req:Request, res:Response)=>{
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
})


app.listen(7000, () => {
    console.log("server running on localhost:7000");
});

