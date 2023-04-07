import express, {Request, Response } from 'express';
import {getUser,updateUser,deleteUser} from '../../crud/User';
import verifyToken from '../../middleware/verify';

const router=express.Router();


router.use(verifyToken);
router.get('/', async (req:Request, res:Response) => {
    try{
        let id:string=req.body?.id;
        const user=await getUser(id);
        if(!user) return res.status(400).send('User does not exists');

        else return res.status(200).json(user);
    }
    catch(err:any){
        res.status(err?.status || 500).json({message:"Error while fetching user"});
    }
});

router.put('/', async(req:Request, res:Response) => {
    try{
        let user:any=req.body;
        let updatedUser:any=await updateUser(user);

        return res.status(200).json(updatedUser);
    }
    catch(err:any){
        res.status(err?.status || 500).json({message:"Error while updating user"});
    }
});

router.delete('/', async (req:Request, res:Response) => {
    try{
        let id:string=req.body?.id;
        await deleteUser(id);
        return res.sendStatus(200);
    }
    catch(err:any){ 
        res.status(err?.status || 500).json({message:"Error while deleting user"});
    }
});

export default router;