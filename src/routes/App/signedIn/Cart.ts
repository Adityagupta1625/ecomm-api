import express, { Request, Response } from "express";
import { getCartbyId,getCartbyUserId } from "../../../crud/Cart";
const router = express.Router();

/**
 * @swagger
 * /app/signedIn/Card?id={id}:
 *   get:
 *     summary: fetch cart by id
 *     parameters:
 *        - in: query
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: The Cart id
 *     responses:
 *       200:
 *         description: Return cart by id
 *         content:
 *              application/json:
 *                  schema:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: string
 *                          userId:
 *                              type: string
 *                          total:
 *                              type: number
 *                          updatedAt:
 *                              type: string
 * 
 */

/**
 * @swagger
 * /app/signedIn/Card?userId={userId}:
 *   get:
 *     summary: fetch cart by userId
 *     parameters:
 *        - in: query
 *          name: userId
 *          schema:
 *              type: string
 *          required: true
 *          description: The userId
 *     responses:
 *       200:
 *         description: Return cart by userId
 *         content:
 *              application/json:
 *                  schema:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: string
 *                          userId:
 *                              type: string
 *                          total:
 *                              type: number
 *                          updatedAt:
 *                              type: string
 */


router.get('/:id', async (req:Request, res:Response) => {
    try{
       const id:any=req.query.id;
       const cart=await getCartbyId(id);

       if(!cart) return res.send(401).json({message:"Cart not found"});

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

       if(!cart) return res.send(401).json({message:"Cart not found"});

       else return res.send(200).json(cart);
    }
    catch(err:any){
        res.status(err?.status || 500).json({message:"Error while getting cart"});
    }
});

export default router;