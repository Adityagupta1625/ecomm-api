import {getProducts,getProductbyId,getProductbyCategory } from "../../crud/Product";
import express, { Request, Response } from 'express';
import HttpException from '../../models/http-exception';

const app=express();
const router=express.Router();

router.get('/',async (req:Request,res:Response)=>{
    try{
        const results=await getProducts();
        return res.status(200).json(results);
    }
    catch(err:any){
        res.status(err?.status || 500).json({message:"Error while fetching products"});
    }
});

router.get('/:id',async (req:Request,res:Response)=>{
    try{
        const id:any=req.query.id;
        const results=await getProductbyId(id);
        if(!results) return res.status(400).send('No Product found');

        else return res.status(200).json(results);
    }
    catch(err:any){
        res.status(err?.status || 500).json({message:"Error while fetching product"});
    }
});

router.get('/:categoryId',async (req:Request,res:Response)=>{
    try{
        const categoryId:any=req.query.categoryId;
        const results=await getProductbyCategory(categoryId);

        if(!results) return res.status(400).send('No Product found');

        else return res.status(200).json(results);
    }
    catch(err:any){
        res.status(err?.status || 500).json({message:"Error while fetching products"});
    }
});

export default router;