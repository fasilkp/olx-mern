import productModel from "../models/productModel.js";

export const addProduct=async (req, res)=>{
    try{
        const image = req.file;
        let product = await productModel.create({...req.body, category:req.body.category.toLowerCase(), image})
        res.json({error:false})
    }catch(err){
        res.json({error:true, err, message:"something went wrong"})
    }
}

