import mongoose from "mongoose";

export type BeverageType = {
    _id: string;
    userId: string;
    name: string;
    foodType: string;
    country: string;
    description: string;
    flavor: string;
    numberOfServings: number;
    caloriesPerServing: number;
    nutritionalFacts: string[];
    price: number;
    starRating: number;
    imageUrls: string[];
    lastUpdated: Date;
    seller: string;
    dietType: string;
}

const beverageSchema = new mongoose.Schema<BeverageType>({
    userId: {type: String, required: true},
    name: {type:String, required: true},
    foodType: {type:String, required: true},
    country: {type:String, required: true},
    description: {type:String, required: true},
    flavor: {type:String, required: true},
    numberOfServings: {type:Number, required: true},
    caloriesPerServing: {type:Number, required: true},
    nutritionalFacts: [{type:String, required: true}],
    price: {type:Number, required: true},
    starRating: {type:Number, required: true, min:1, max:5},
    imageUrls: [{type:String, required:true}],
    lastUpdated: [{type:Date, required:true}],
    seller:{type:String, required: true},
    dietType:{type:String, required: true}
});

const Beverage = mongoose.model<BeverageType>("Beverage", beverageSchema);
export default Beverage;