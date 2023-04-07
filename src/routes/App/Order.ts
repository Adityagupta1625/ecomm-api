import { getOrderDetailsbyId,getOrderDetailsbyUserId } from "../../crud/OrderDetails";
import express, { Request, Response } from 'express';
import HttpException from '../../models/http-exception';
import verifyToken from "../../middleware/verify";

const app=express();
const router=express.Router();

router.use(verifyToken);

router.get('/:id',async (req:Request,res:Response)=>{
    try{
        const id:any=req.query.id;
        const results=await getOrderDetailsbyId(id);
        if(!results) return res.status(400).send('No Order found');

        else return res.status(200).json(results);
    }
    catch(err:any){
        res.status(err?.status || 500).json({message:"Error while fetching orders"});
    }
})

router.get('/:userId',async (req:Request,res:Response)=>{
    try{
        const userId:any=req.query.userId;
        const results=await getOrderDetailsbyUserId(userId);

        if(!results) return res.status(400).send('No Order found');

        else return res.status(200).json(results);
    }
    catch(err:any){
        res.status(err?.status || 500).json({message:"Error while fetching orders"});
    }
})
