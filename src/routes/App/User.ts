import express, { NextFunction, Request, Response } from 'express';
import {getUser,updateUser,deleteUser} from '../../crud/User';
import verifyToken from '../../middleware/verify';
import HttpException from '../../models/http-exception';

const app=express();
const router=express.Router();

router.use(verifyToken);
router.get('/', (req:Request, res:Response) => {
    try{
        let id:string=req.body?.id;
        getUser(id).then((user:any) => {
            if(user){
                res.status(200).json(user);
            } 
        });
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
});

router.put('/', (req:Request, res:Response) => {
    try{
        let user:any=req.body;
        updateUser(user).then((user:any) => {
            if(user){
                res.status(200).json(user);
            } 
        });
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
});

router.delete('/', (req:Request, res:Response) => {
    try{
        let id:string=req.body?.id;
        deleteUser(id).then((user:any) => {
            if(user){
                res.status(200).json(user);
            } 
        });
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
    
});