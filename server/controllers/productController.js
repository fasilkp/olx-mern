import productModel from "../models/productModel.js";
import UserModel from "../models/userModel.js";

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
        const search= req.query.search ?? ""
        console.log(search)
        let products = await productModel.find({name:new RegExp(search, 'i')}).lean()
        res.json({error:false, products})
    }catch(err){
        res.json({error:true, err, message:"something went wrong"})
    }
}

export const getProduct=async (req, res)=>{
    try{
        let product = await productModel.findById(req.params.id)
        let user;
        if(product){
            user= await UserModel.findById(product.userId);
        }
        console.log(product)
        res.json({error:false, product, user})
    }catch(err){
        res.json({error:true, err, message:"something went wrong"})
    }
}

