import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

const verifyToken = (req:Request, res:Response, next:NextFunction) => {
    let token:any = req.headers["x-access-token"];
    
    if (!token) {
        return res.status(403).send({
        message: "No token provided!"
        });
    }
    
    jwt.verify(token, process.env.SECRET || "", (err:any, decoded:any) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        
        next();
    });
}

export default verifyToken;