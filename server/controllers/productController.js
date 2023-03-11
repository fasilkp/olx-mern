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

export const getProducts=async (req, res)=>{
    try{
        let products = await productModel.find().lean()
        res.json({error:false, products})
    }catch(err){
        res.json({error:true, err, message:"something went wrong"})
    }
}

export const getProduct=async (req, res)=>{
    try{
        let product = await productModel.findById(req.params.id)
        res.json({error:false, product})
    }catch(err){
        res.json({error:true, err, message:"something went wrong"})
    }
}

