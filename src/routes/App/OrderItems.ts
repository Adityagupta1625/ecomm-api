import { getOrderItemsbyId,getOrderItemsbyOrderId } from "../../crud/OrderItems";

import express, { Request, Response } from 'express';
import HttpException from '../../models/http-exception';

const app=express();
const router=express.Router();

router.get('/:id',async (req:Request,res:Response)=>{
    try{
        const id:any=req.query.id;
        const results=await getOrderItemsbyId(id);
        if(!results) return res.status(400).send('No Order found');

        else return res.status(200).json(results);
    }
    catch(err:any){
        res.status(err?.status || 500).json({message:"Error while fetching order items"});
    }
})

router.get('/:orderId',async (req:Request,res:Response)=>{
    try{
        const orderId:any=req.query.orderId;
        const results=await getOrderItemsbyOrderId(orderId);

        if(!results) return res.status(400).send('No Order found');

        else return res.status(200).json(results);
    }
    catch(err:any){
        res.status(err?.status || 500).json({message:"Error while fetching order items"});
    }
})