import express, {Request, Response} from "express";
import multer from 'multer';
import cloudinary from 'cloudinary';
import Beverage, { BeverageType } from "../models/beverage";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 5 * 1024 * 1024, //5MB maximum
    },
});
    
router.post("/",verifyToken, [
    body("name").notEmpty().withMessage('Name is required'),
    body("city").notEmpty().withMessage('City is required'),
    body("country").notEmpty().withMessage('Country is required'),
    body("description").notEmpty().withMessage('Description is required'),
    body("type").notEmpty().withMessage('Type is required'),
    body("pricePerNight").notEmpty().isNumeric().withMessage('price per night is required and must be a number'),
    body("facilities").notEmpty().isArray().withMessage('Fcilities are required'),    
    ],
    upload.array("imageFiles", 6), async(req: Request, res:Response) => {
        try{
            const imageFiles = req.files as Express.Multer.File[];
            const newBeverage: BeverageType = req.body;

            const imageUrls = await uploadImages(imageFiles);
        
            newBeverage.imageUrls = imageUrls;
            newBeverage.lastUpdated = new Date();
            newBeverage.userId = req.userId;

            const beverage = new Beverage(newBeverage);
            await beverage.save();

            res.status(201).send(beverage);

        }catch(e){
            console.log("Error creating a new beverage: ", e);
            res.status(500).json({message:"Something went wrong"});
        }
    }
);

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