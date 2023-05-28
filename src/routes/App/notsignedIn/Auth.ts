import express, { Request, Response } from "express";
import { createUser, getUser } from "../../../crud/User";
import HttpException from "../../../models/http-exception";
import firebase from "../../../config/firebase";
import { createCart } from "../../../crud/Cart";
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
    let id = req.body?.id;
    if (!id) return res.status(400).send("No id provided");
    

    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    firebase
      .auth()
      .createSessionCookie(id, { expiresIn })
      .then((sessionCookie) => {
        // Set cookie policy for session cookie.
        const options = { maxAge: expiresIn, httpOnly: true, secure: true };
        firebase
          .auth()
          .verifyIdToken(id)
          .then(async (decodedClaims) => {
            if (!decodedClaims)
              throw new HttpException(500, "Error while decoding claims");

            const user: any = await getUser(decodedClaims?.uid);
            if (user) return res.status(400).send("User already exists");

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

            res.cookie("session", sessionCookie, options);
            res.status(200).send(decodedClaims?.uid);
            console.log(decodedClaims);
          })
          .catch((error) => {
            res.status(401).send("UNAUTHORIZED REQUEST!");
          });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error?.message || "UNAUTHORIZED REQUEST!");
      });
  } catch (err: any) {
    res.status(err?.status || 500).json({message:"Error while creating session cookie"});
  }
});

export default router;