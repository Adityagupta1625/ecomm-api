import { getOrderItemsbyId,getOrderItemsbyOrderId } from "../../../crud/OrderItems";
import express, { Request, Response } from 'express';
const router=express.Router();

/**
 * @swagger
 * /app/signedIn/OrderItems?id={id}:
 *   get:
 *     summary: fetch order items via id
 *     parameters:
 *        - in: query
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: The id of order item
 *     responses:
 *       200:
 *         description: Return order items via id
 *         content:
 *           application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                    id:
 *                       type: string
 *                    orderId:
 *                       type: string
 *                    productId:
 *                       type: string
 *                    quantity:
 *                       type: number
 *                    price:
 *                       type: number
 *                    updatedAt:
 *                       type: string
 * 
 */

/**
 * @swagger
 * /app/signedIn/OrderItems?orderId={orderId}:
 *   get:
 *     summary: fetch order items via order id
 *     parameters:
 *        - in: query
 *          name: orderId
 *          schema:
 *              type: string
 *          required: true
 *          description: The userId of user
 *     responses:
 *       200:
 *         description: Return order items via userId
 *         content:
 *           application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                    id:
 *                       type: string
 *                    orderId:
 *                       type: string
 *                    productId:
 *                       type: string
 *                    quantity:
 *                       type: number
 *                    price:
 *                       type: number
 *                    updatedAt:
 *                       type: string
 * 
 */


router.get('/:id',async (req:Request,res:Response)=>{
    try{
        const id:any=req.query.id;
        const results=await getOrderItemsbyId(id);

        if(!results) return res.status(400).json({message:"No Order found"});

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

        if(!results) return res.status(400).json({message:"No Order found"});

        else return res.status(200).json(results);
    }
    catch(err:any){
        res.status(err?.status || 500).json({message:"Error while fetching order items"});
    }
})

export default router;