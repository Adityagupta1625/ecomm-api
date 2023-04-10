import {getProductCategorybyId,getProductCategorybyName,getProductCategoryAll } from "../../../crud/ProductCategory";
import express, { Request, Response } from 'express';
const router=express.Router();


/**
 * @swagger
 * /app/notsignedIn/ProductCategory:
 *   get:
 *     summary: fetchs all product categories
 *     responses:
 *       200:
 *         description: Return all product categories
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
 *                          
 *                          description:
 *                               type: string
 *                          
 *                          updatedAt:
 *                              type: string
 */

/**
 * @swagger
 * /app/notsignedIn/ProductCategory?name={name}:
 *   get:
 *     summary: fetches product category by name
 *     parameters:
 *        - in: query
 *          name: name
 *          schema:
 *              type: string
 *          required: true
 *          description: The category name
 *     responses:
 *       200:
 *         description: Return product category by name
 *         content:
 *              application/json:
 *                  schema:
 *                     type: object
 *                     properties:
 *                          id:
 *                             type: string
 *                          name:
 *                            type: string  
 *                          
 *                          description:
 *                               type: string
 *                          
 *                          updatedAt:
 *                              type: string
 * 
 */

/**
 * @swagger
 * /app/notsignedIn/ProductCategory?id={id}:
 *   get:
 *     summary: fetches product category by id
 *     parameters:
 *        - in: query
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: The product category id
 *     responses:
 *       200:
 *         description: Return product category by id
 *         content:
 *              application/json:
 *                  schema:
 *                        type: object
 *                        properties:
 *                          id:
 *                             type: string
 *                          name:
 *                            type: string  
 *                          
 *                          description:
 *                               type: string
 *                          
 *                          updatedAt:
 *                              type: string
 */

router.get('/', async (req:Request, res:Response) => {
    try{
        const results=await getProductCategoryAll();

        if(!results) return res.status(400).json({message:"No Product category found"});

        else return res.send(200).json(results);

    }
    catch(err:any){
        res.status(err?.status || 500).json({message:"Error while fetching categories"});
    }
});

router.get('/:id', async (req:Request, res:Response) => {
    try{
        const id:any=req.query.id;
        const results=await getProductCategorybyId(id);

        if(!results) return res.status(400).json({message:"Product category does not exist"});

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

        if(!results) return res.status(400).json({message:"Product category does not exist"});

        else return res.send(200).json(results);
    }
    catch(err:any){
        res.status(err?.status || 500).json({message:"Error while fetching categories"});
    }
});

export default router;