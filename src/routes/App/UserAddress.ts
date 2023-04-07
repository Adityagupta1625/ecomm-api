import express, { Request, Response } from "express";
import {
  getUserAddressbyId,
  getUserAddressbyUserId,
  deleteUserAddress,
  createUserAddress,
  updateUserAddress,
} from "../../crud/UserAddress";
import verifyToken from "../../middleware/verify";
import HttpException from "../../models/http-exception";
import UserAddress from "../../models/UserAddress";

const router = express.Router();

router.use(verifyToken);

router.post("/", async (req: Request, res: Response) => {
  try {
    const address: UserAddress = req.body;
    await createUserAddress(address);
    return res.sendStatus(201);
  } catch (err: any) {
    res.status(err?.status || 500).json({message:"Error while adding address"});
  }
});

router.put("/", async (req: Request, res: Response) => {
  try {
    const address: UserAddress = req.body;
    const results = await updateUserAddress(address);
    return res.status(201).json(results);
  } catch (err: any) {
    res.status(err?.status || 500).json({message:"Error while updating address"});
  }
});

router.delete("/", async (req: Request, res: Response) => {
  try {
    const id: any = req.body.id;
    await deleteUserAddress(id);
    return res.sendStatus(200);
  } catch (err: any) {
    res.status(err?.status || 500).json({message:"Error while deleting address"});
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id: any = req.query.id;
    const results = await getUserAddressbyId(id);

    if (!results) return res.status(400).send("Address not found");
    else return res.send(200).json(results);
  } catch (err: any) {
    res.status(err?.status || 500).json({message:"Error while fetching address"});
  }
});

router.get("/:userId", async (req: Request, res: Response) => {
  try {
    const userid: any = req.query.userId;
    const results = await getUserAddressbyUserId(userid);
    if (!results) return res.status(400).send("Address not found");
    else return res.send(200).json(results);
  } catch (err: any) {
    res.status(err?.status || 500).json({message:"Error while fetching address"});
  }
});

export default router;
