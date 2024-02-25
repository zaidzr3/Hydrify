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

router.get("/", verifyToken, async (req: Request, res: Response) => {
    try {
      const beverages = await Beverage.find({ userId: req.userId });
      res.json(beverages);
    } catch (error) {
      res.status(500).json({ message: "Error fetching beverages" });
    }
  });

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
    const id = req.params.id.toString();
    try {
      const beverage = await Beverage.findOne({
        _id: id,
        userId: req.userId,
      });
      res.json(beverage);
    } catch (error) {
      res.status(500).json({ message: "Error fetching beverages" });
    }
  });
  
  router.put(
    "/:beverageId",
    verifyToken,
    upload.array("imageFiles"),
    async (req: Request, res: Response) => {
      try {
        const updatedBeverage: BeverageType = req.body;
        updatedBeverage.lastUpdated = new Date();
  
        const beverage = await Beverage.findOneAndUpdate(
          {
            _id: req.params.beverageId,
            userId: req.userId,
          },
          updatedBeverage,
          { new: true }
        );
  
        if (!beverage) {
          return res.status(404).json({ message: "Beverage not found" });
        }
  
        const files = req.files as Express.Multer.File[];
        const updatedImageUrls = await uploadImages(files);
  
        beverage.imageUrls = [
          ...updatedImageUrls,
          ...(updatedBeverage.imageUrls || []),
        ];
  
        await beverage.save();
        res.status(201).json(beverage);
      } catch (error) {
        res.status(500).json({ message: "Something went throw" });
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