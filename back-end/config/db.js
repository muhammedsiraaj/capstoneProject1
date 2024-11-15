import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://sirajmuhd123:773610@cluster0.ikw6a.mongodb.net/food-order-website').then(()=>console.log("DB Connected"));
}