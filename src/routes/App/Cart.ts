import express, { Request, Response } from "express";
import HttpException from "../../models/http-exception";
import { getCartbyId,getCartbyUserId } from "../../crud/Cart";
import verifyToken from "../../middleware/verify";
const router = express.Router();


router.use(verifyToken);

router.get('/:id', async (req:Request, res:Response) => {
    try{
       const id:any=req.query.id;
       const cart=await getCartbyId(id);

       if(!cart) return res.send(401).send('Invalid Id')

       else return res.send(200).json(cart);
    }
    catch(err:any){
        res.status(err?.status || 500).json({message:"Error while getting cart"});
    }
});


router.get('/:userId', async (req:Request, res:Response) => {
    try{
       const userId:any=req.query.userId;
       const cart=await getCartbyUserId(userId);

       if(!cart) return res.send(401).send('Invalid userId')

       else return res.send(200).json(cart);
    }
    catch(err:any){
        res.status(err?.status || 500).json({message:"Error while getting cart"});
    }
});