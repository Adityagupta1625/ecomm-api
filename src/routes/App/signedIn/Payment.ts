import express, { Request, Response } from 'express';
import { createOrderDetails, } from '../../../crud/OrderDetails';
import { createOrderItems} from '../../../crud/OrderItems';
import { getUser } from '../../../crud/User';
import { getUserAddressbyUserId } from '../../../crud/UserAddress';
import OrderDetails from '../../../models/OrderDetails';
import OrderItems from '../../../models/OrderItems';
import Stripe from 'stripe';
import uuid from 'uuid';

const router=express.Router();

router.post('/',async (req:Request,res:Response)=>{
    try{
        const orderDetails: OrderDetails = {
            id: uuid.v4(),
            userId: req.body?.userId,
            total: 0,
            paymentId: "",
            status: "Payment Pending",
            updatedAt: new Date(),
        };
        const results = await createOrderDetails(orderDetails);
        const userId = req.body?.userId;
        const user = await getUser(userId);
        const userAddress = await getUserAddressbyUserId(userId);

        const orderItems = req.body?.orderItems;
        orderItems.forEach(async (item:any) => {
            const orderItem:OrderItems = {
                id: uuid.v4(),
                orderId: results.id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
                updatedAt: new Date(),
            };
            await createOrderItems(orderItem);
        });

        const stripe:any=new Stripe(process.env.STRIPE_SECRET_KEY || "",{
            apiVersion: '2022-11-15',
        });

        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body?.total,
            currency: 'inr',
            description: 'Payment for order',
            payment_method_types: ['card'],
            email: user?.email,
            shipping: {
                name: user?.name,
                address: {
                    line1: userAddress[0]?.address_line1,
                    line2: userAddress[0]?.address_line2,
                    postal_code: userAddress[0]?.pincode,
                    city: userAddress[0]?.city,
                    state: userAddress[0]?.state,
                    country: userAddress[0]?.country,
                    mobile: userAddress[0]?.mobile,
                    tel: userAddress[0]?.telephone,
                },
            },
            line_items: orderItems.map((item:any) => {
                return {
                    name: item.name,
                    description: item.description,
                    amount: item.price,
                    currency: 'inr',
                    quantity: item.quantity,
                };
            }),
        });

        res.status(200).json({clientSecret: paymentIntent.client_secret});
    }
    catch(err:any){
        res.status(err?.status).json({message:err?.message || "Something went wrong"});
    }
});

export default router;

