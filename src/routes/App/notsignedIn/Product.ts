import {getProducts,getProductbyId,getProductbyCategory } from "../../../crud/Product";
import express, { Request, Response } from 'express';
const router=express.Router();


/**
 * @swagger
 * /app/notsignedIn/Product:
 *   get:
 *     summary: fetchs all products
 *     responses:
 *       200:
 *         description: Return all products
 * 
 *         
 *                 
 */

/**
 * @swagger
 * /app/notsignedIn/Product:
 *   get:
 *     summary: fetchs all products
 *     responses:
 *       200:
 *         description: Return all products
 *         content:
 *              application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                        type: object
 *                        properties:
 *                          id:
 *                             type: string
 *                          name:
 *                            type: string  
 *                          price:
 *                              type: number
 *                          description:
 *                               type: string
 *                          categoryId:
 *                                type: string
 *                          discountId:
 *                              type: string
 *                          updatedAt:
 *                              type: string
 */

/**
 * @swagger
 * /app/notsignedIn/Product?categoryId={categoryId}:
 *   get:
 *     summary: fetchs all products by category
 *     parameters:
 *        - in: query
 *          name: categoryId
 *          schema:
 *              type: string
 *          required: true
 *          description: The category id
 *     responses:
 *       200:
 *         description: Return all products
 *         content:
 *              application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                        type: object
 *                        properties:
 *                          id:
 *                             type: string
 *                          name:
 *                            type: string  
 *                          price:
 *                              type: number
 *                          description:
 *                               type: string
 *                          categoryId:
 *                                type: string
 *                          discountId:
 *                              type: string
 *                          updatedAt:
 *                              type: string
 */

/**
 * @swagger
 * /app/notsignedIn/Product?id={id}:
 *   get:
 *     summary: fetchs all product by id
 *     parameters:
 *        - in: query
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: The product id
 *     responses:
 *       200:
 *         description: Return product by id
 *         content:
 *              application/json:
 *                  schema:
 *                        type: object
 *                        properties:
 *                          id:
 *                             type: string
 *                          name:
 *                            type: string  
 *                          price:
 *                              type: number
 *                          description:
 *                               type: string
 *                          categoryId:
 *                                type: string
 *                          discountId:
 *                              type: string
 *                          updatedAt:
 *                              type: string
 */


router.get('/',async (req:Request,res:Response)=>{
    try{
        const results=await getProducts();

        if(!results) return res.status(400).json({message:"No Product found"});

        else return res.status(200).json(results);
    }
    catch(err:any){
        res.status(err?.status || 500).json({message:"Error while fetching products"});
    }
});

router.get('/:id',async (req:Request,res:Response)=>{
    try{
        const id:any=req.query.id;
        const results=await getProductbyId(id);

        if(!results) return res.status(400).json({message:"No Product found"});

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

        if(!results) return res.status(400).json({message:"No Product found"});

        else return res.status(200).json(results);
    }
    catch(err:any){
        res.status(err?.status || 500).json({message:"Error while fetching products"});
    }
});

export default router;