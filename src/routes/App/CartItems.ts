import express, {Request,Response} from 'express';
import { createCartItem,getCartItemById,getCartItemsByCartId,updateCartItem,
deleteCartItem } from '../../crud/CartItem';
import verifyToken from '../../middleware/verify';

const router=express.Router();

router.use(verifyToken);

router.post('/',async(req:Request,res:Response)=>{
    try{
        const cartItem=await createCartItem(req.body);
        res.status(201).json({message:'Cart Item created successfully'});
    }catch(err: any){
        res.status(err?.status || 500).json({message:"Error while adding item in cart"});
    }
});

router.get('/:id',async(req:Request,res:Response)=>{
    try{
        const cartItem=await getCartItemById(req.params.id);
        res.status(200).json(cartItem);
    }catch(err: any){
        res.status(err?.status || 500).json({message:"Error while getting cart item"});
    }
})

router.get('/:cartId',async(req:Request,res:Response)=>{
    try{
        const cartItems=await getCartItemsByCartId(req.params.cartId);
        res.status(200).json(cartItems);
    }catch(err: any){
        res.status(err?.status || 500).json({message:"Error while fetching items in cart"});
    }
})

router.put('/:id',async(req:Request,res:Response)=>{
    try{
        const cartItem=await updateCartItem(req.body);
        res.status(200).json(cartItem);
    }catch(err: any){
        res.status(err?.status || 500).json({message:"Error while updating item"});
    }
})

router.delete('/:id',async(req:Request,res:Response)=>{
    try{
        const cartItem=await deleteCartItem(req.params.id);
        res.status(200).json({message:'Cart Item deleted successfully'});
    }catch(err: any){
        res.status(err?.status || 500).json({message:"Unable to delete try again later"});
    }
})