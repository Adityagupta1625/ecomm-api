import {getProductCategorybyId,getProductCategorybyName,getProductCategoryAll } from "../../crud/ProductCategory";
import express, { Request, Response } from 'express';
import HttpException from '../../models/http-exception';

const router=express.Router();

router.get('/', async (req:Request, res:Response) => {
    try{
        const results=await getProductCategoryAll();
        return res.send(200).json(results);
    }
    catch(err:any){
        res.status(err?.status || 500).json({message:"Error while fetching categories"});
    }
});

router.get('/:id', async (req:Request, res:Response) => {
    try{
        const id:any=req.query.id;
        const results=await getProductCategorybyId(id);
        if(!results) return res.status(400).send('Product category does not exist');

        else return res.send(200).json(results);
    }
    catch(err:any){
        res.status(err?.status || 500).json({message:"Error while fetching category"});
    }
});

router.get('/:name', async (req:Request, res:Response) => {
    try{
        const name:any=req.query.name;
        const results=await getProductCategorybyName(name);

        if(!results) return res.status(400).send('Product category does not exist');

        else return res.send(200).json(results);
    }
    catch(err:any){
        res.status(err?.status || 500).json({message:"Error while fetching categories"});
    }
});

export default router;