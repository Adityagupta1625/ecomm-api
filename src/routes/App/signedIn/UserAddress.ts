import express, { Request, Response } from "express";
import {
  getUserAddressbyId,
  getUserAddressbyUserId,
  deleteUserAddress,
  createUserAddress,
  updateUserAddress,
} from "../../../crud/UserAddress";
import UserAddress from "../../../models/UserAddress";

const router = express.Router();

/**
 * @swagger
 * /app/signedIn/UserAddress?id={id}:
 *   get:
 *     summary: fetch user address by id
 *     parameters:
 *        - in: query
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: The id of address
 *     responses:
 *       200:
 *         description: Return user address by id
 *         content:
 *           application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                    id:
 *                       type: string
 *                    userId:
 *                       type: string
 *                    address_line1:
 *                       type: string
 *                    address_line2:
 *                       type: string
 *                    city:
 *                       type: string
 *                    state:
 *                       type: string
 *                    country:
 *                       type: string
 *                    pincode:
 *                       type: string
 *                    mobile:
 *                       type: string
 *                    telephone:
 *                        type: string
 *                    updatedAt:
 *                        type: string
 *
 */

/**
 * @swagger
 * /app/signedIn/UserAddress?userId={userId}:
 *   get:
 *     summary: fetch user address by userId
 *     parameters:
 *        - in: query
 *          name: userId
 *          schema:
 *              type: string
 *          required: true
 *          description: The userId of user
 *     responses:
 *       200:
 *         description: Return user address by userId
 *         content:
 *           application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                    id:
 *                       type: string
 *                    userId:
 *                       type: string
 *                    address_line1:
 *                       type: string
 *                    address_line2:
 *                       type: string
 *                    city:
 *                       type: string
 *                    state:
 *                       type: string
 *                    country:
 *                       type: string
 *                    pincode:
 *                       type: string
 *                    mobile:
 *                       type: string
 *                    telephone:
 *                        type: string
 *                    updatedAt:
 *                        type: string
 *
 *
 */

/**
 * @swagger
 * /app/signedIn/UserAddress:
 *   delete:
 *     summary: remove user address by id
 *     parameters:
 *        - in: query
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: The userId of user
 *     responses:
 *       200:
 *         description: Return user address by id
 *         content:
 *           application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                    type: string
 *
 *
 */

/**
 * @swagger
 * /app/signedIn/UserAddress:
 *   put:
 *     summary: update User Adressdetails
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *                 type: object
 *                 properties:
 *                    id:
 *                       type: string
 *                    userId:
 *                       type: string
 *                    address_line1:
 *                       type: string
 *                    address_line2:
 *                       type: string
 *                    city:
 *                       type: string
 *                    state:
 *                       type: string
 *                    country:
 *                       type: string
 *                    pincode:
 *                       type: string
 *                    mobile:
 *                       type: string
 *                    telephone:
 *                        type: string
 *                    updatedAt:
 *                        type: string
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

/**
 * @swagger
 * /app/signedIn/UserAddress:
 *   post:
 *     summary: add User Adressdetails
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *                 type: object
 *                 properties:
 *                    id:
 *                       type: string
 *                    userId:
 *                       type: string
 *                    address_line1:
 *                       type: string
 *                    address_line2:
 *                       type: string
 *                    city:
 *                       type: string
 *                    state:
 *                       type: string
 *                    country:
 *                       type: string
 *                    pincode:
 *                       type: string
 *                    mobile:
 *                       type: string
 *                    telephone:
 *                        type: string
 *                    updatedAt:
 *                        type: string
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

router.post("/", async (req: Request, res: Response) => {
  try {
    const address: UserAddress = req.body;
    await createUserAddress(address);
    return res.sendStatus(201).json({ message: "Address added successfully" });
  } catch (err: any) {
    res
      .status(err?.status || 500)
      .json({ message: "Error while adding address" });
  }
});

router.put("/", async (req: Request, res: Response) => {
  try {
    const address: UserAddress = req.body;
    const results = await updateUserAddress(address);
    return res.status(201).json(results);
  } catch (err: any) {
    res
      .status(err?.status || 500)
      .json({ message: "Error while updating address" });
  }
});

router.delete("/", async (req: Request, res: Response) => {
  try {
    const id: any = req.body.id;
    await deleteUserAddress(id);
    return res
      .sendStatus(200)
      .json({ message: "Address deleted successfully" });
  } catch (err: any) {
    res
      .status(err?.status || 500)
      .json({ message: "Error while deleting address" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  if (req.query.userId) {
    try {
      const userid: any = req.query.userId;
      const results = await getUserAddressbyUserId(userid);
      if (!results)
        return res.status(400).json({ message: "Address not found" });
      else return res.send(200).json(results);
    } catch (err: any) {
      res
        .status(err?.status || 500)
        .json({ message: "Error while fetching address" });
    }
  } 
  
  else if(req.query.id) {
    try {
      const id: any = req.query.id;
      const results = await getUserAddressbyId(id);

      if (!results)
        return res.status(400).json({ message: "Address not found" });
      else return res.send(200).json(results);
    } catch (err: any) {
      res
        .status(err?.status || 500)
        .json({ message: "Error while fetching address" });
    }
  }
});

export default router;
