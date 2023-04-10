import express, {Request, Response } from 'express';
import {getUser,updateUser,deleteUser} from '../../../crud/User';

const router=express.Router();

/**
 * @swagger
 * /app/signedIn/User?id={id}:
 *   get:
 *     summary: fetch user by id
 *     parameters:
 *        - in: query
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: The uid of the user
 *     responses:
 *       200:
 *         description: Return user by id
 *         content:
 *           application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                    id:
 *                       type: string
 *                    name:
 *                       type: string
 *                    email:
 *                       type: string
 *                    email_verified:
 *                       type: boolean
 *                    
 * 
 */

/**
 * @swagger
 * /app/signedIn/User:
 *   put:
 *     summary: update User details
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  id:
 *                     type: string
 *                  name:
 *                     type: string
 *                  email:
 *                     type: string
 *                  email_verified:
 *                     type: boolean
 *     
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                message:
 *                  type: string
 *                             
 *              
 */





router.get('/:id', async (req:Request, res:Response) => {
    try{
        let id:any=req.query?.id;
        const user=await getUser(id);
        if(!user) return res.status(400).json({message:"User not found"});

        else return res.status(200).json(user);
    }
    catch(err:any){
        res.status(err?.status || 500).json({message:"Error while fetching user"});
    }
});

router.put('/', async(req:Request, res:Response) => {
    try{
        let user:any=req.body;
        await updateUser(user);

        return res.status(200).json({message:"User updated successfully"});
    }
    catch(err:any){
        res.status(err?.status || 500).json({message:"Error while updating user"});
    }
});


export default router;