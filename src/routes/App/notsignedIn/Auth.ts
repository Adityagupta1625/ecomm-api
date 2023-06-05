import express, { Request, Response } from "express";
import { createUser, getUser } from "../../../crud/User";
import HttpException from "../../../models/http-exception";
import firebase from "../../../config/firebase";
import { createCart } from "../../../crud/Cart";
import { error } from "console";
const router = express.Router();


/**
 * @swagger
 * /app/notsignedIn/Auth/register-login:
 *   post:
 *     summary: register and login user
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *     responses:
 *       200:
 *         description: Return the uid of the user that was created or logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                id:
 *                  type: string
 *                  description: The uid of the user          
 *              
 */

router.post("/register-login", (req: Request, res: Response) => {
  try {
    let id:string = req.body?.id;
    
    if (!id) return res.status(400).send("No id provided");
    
    firebase.auth().verifyIdToken(id).then(async(decodedClaims)=>{
      if (!decodedClaims)
          throw new HttpException(500, "Error while decoding claims");
      
      const expiresIn = 60 * 60 * 24 * 5 * 1000;
      
      firebase.auth().createSessionCookie(id,{expiresIn}).then(
        async (sessionCookie)=>{
          const options = { maxAge: expiresIn, httpOnly: true, secure: true };

          const user: any = await getUser(decodedClaims?.uid);
          
          if (!user){            
            createUser({
              id: decodedClaims?.uid,
              name: decodedClaims?.name,
              email: decodedClaims?.email,
              email_verified: decodedClaims?.email_verified,
            });
              
            createCart({
                userId: decodedClaims?.uid,
                total: 0,
                id:"",
                updatedAt:new Date()
            });

          }

          res.cookie("token", sessionCookie, options);
          res.status(200).send(decodedClaims?.uid);
          
      }).catch((error)=>{
        res.status(400).send({"message":error?.message});
      })
    }).catch((error)=>{
      res.status(401).send({"message":error?.message});
    });
    
  } catch (err: any) {
    res.status(err?.status || 500).json({message:"Error while creating session cookie"});
  }
});

export default router;