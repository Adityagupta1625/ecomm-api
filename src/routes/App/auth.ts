import express, { NextFunction, Request, Response } from 'express';
import {createUser,getUser} from '../../crud/User';
import User from '../../models/User';
import HttpException from '../../models/http-exception';
import jwt from 'jsonwebtoken';

const app=express();
const router=express.Router();

function createToken(id:string){
    var token = jwt.sign({ id:id }, process.env.SECRET_TOKEN || "");
    return token;
}

router.post('/signup', (req:Request, res:Response) => {
    try{
        let user:User = req.body;
        createUser(user).then((user:any) => {
            if(user){
                const token = createToken(user.id);
                res.cookie('token', token, { httpOnly: true });
                res.status(200).json(user);
            } 
        });
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
});

router.post('/login', (req:Request, res:Response) => {
    try{
        let id:string=req.body?.id;
        getUser(id).then((user:any) => {
            if(user){
                const token = createToken(user.id);
                res.cookie('token', token, { httpOnly: true });
                res.status(200).json(user);
            } 
        });
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
});

