import productModel from "../models/productModel.js";

export const addProduct=(req, res)=>{
        const image = req.file;
        const {name, category, description, price}=req.body;
        console.log(req.body, image)
}