import { NextFunction, Request, Response } from 'express';
import firebase from '../config/firebase';

const verifyToken = (req:Request, res:Response, next:NextFunction) => {
    let token:any = req.headers["x-access-token"];
    
    if (!token) {
        return res.status(403).send({
        message: "No token provided!"
        });
    }
    
    firebase.auth().verifySessionCookie(token, true).then((decodedClaims) => {
        req.body.userid = decodedClaims.uid;
        next();

    }).catch((error) => {
        return res.status(401).send({
            message: "Unauthorized!"
        });
    });
}

export default verifyToken;
