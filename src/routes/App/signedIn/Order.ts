import { getOrderDetailsbyId,getOrderDetailsbyUserId } from "../../../crud/OrderDetails";
import express, { Request, Response } from 'express';

const router=express.Router();

/**
 * @swagger
 * /app/signedIn/Order?id={id}:
 *   get:
 *     summary: fetch order details by  id
 *     parameters:
 *        - in: query
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: The order details id
 *     responses:
 *       200:
 *         description: Return order details via id
 *         content:
 *           application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                    id:
 *                       type: string
 *                    userId:
 *                       type: string
 *                    total:
 *                       type: number
 *                    paymentId:
 *                       type: string
 *                    status:
 *                       type: string
 *                    updatedAt:
 *                       type: string
 * 
 */

/**
 * @swagger
 * /app/signedIn/Order?userId={userId}:
 *   get:
 *     summary: fetch order details by user id
 *     parameters:
 *        - in: query
 *          name: userId
 *          schema:
 *              type: string
 *          required: true
 *          description: The userId
 *     responses:
 *       200:
 *         description: Return order details via userId
 *         content:
 *           application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                    id:
 *                       type: string
 *                    userId:
 *                       type: string
 *                    total:
 *                       type: number
 *                    paymentId:
 *                       type: string
 *                    status:
 *                       type: string
 *                    updatedAt:
 *                       type: string
 * 
 */


router.get('/:id',async (req:Request,res:Response)=>{
    try{
        const id:any=req.query.id;
        const results=await getOrderDetailsbyId(id);

        if(!results) return res.status(400).json({message:"No Order found"});

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

        if(!results) return res.status(400).json({message:"No Order found"});
        
        else return res.status(200).json(results);
    }
    catch(err:any){
        res.status(err?.status || 500).json({message:"Error while fetching orders"});
    }
})

export default router;