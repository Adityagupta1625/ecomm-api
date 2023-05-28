import prisma from '../../prisma/client';
import HttpException from '../models/http-exception';
import OrderDetails from '../models/OrderDetails';
import { v4 as uuidv4 } from 'uuid';


export const createOrderDetails = async (OrderDetails: OrderDetails) => {
    try{
        
        if(!OrderDetails?.userId) 
            throw new HttpException(400, 'User id is required');
        
        const orderDetails = await prisma.orderDetails.create({
            data: {
                id: uuidv4(),
                userId: OrderDetails?.userId,
                total: OrderDetails?.total || 0,
                paymentId: OrderDetails?.paymentId || "",
                status: OrderDetails?.status || "pending",
                updatedAt: new Date(),
            }
        });
        return orderDetails;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}

export const getOrderDetailsbyUserId = async (userId: string) => {
    if(!userId) 
        throw new HttpException(400, 'User id is required');
    try{
        const orderDetails = await prisma.orderDetails.findMany({
            where: {
                userId: userId,
            }
        });
        return orderDetails;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}

export const getOrderDetailsbyId = async (id: string) => {
    if(!id) 
        throw new HttpException(400, 'Order id is required');
    try{
        const orderDetails = await prisma.orderDetails.findUnique({
            where: {
                id: id,
            }
        });
        return orderDetails;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}

export const updateOrderDetails = async (OrderDetails: OrderDetails) => {
    try{
        
        if(!OrderDetails?.id) 
            throw new HttpException(400, 'Order id is required');
        
        const oldorderDetails = await prisma.orderDetails.findUnique({
            where: {
                id: OrderDetails?.id,
            }
        });
        
        const orderDetails = await prisma.orderDetails.update({
            where: {
                id: OrderDetails?.id,
            },
            data: {
                userId: OrderDetails?.userId || oldorderDetails?.userId,
                total: OrderDetails?.total || oldorderDetails?.total,
                paymentId: OrderDetails?.paymentId || oldorderDetails?.paymentId,
                status: OrderDetails?.status || oldorderDetails?.status,
                updatedAt: new Date(),
            }
        });
        return orderDetails;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}

export const deleteOrderDetails = async (id: string) => {
    if(!id) 
        throw new HttpException(400, 'Order id is required');
    try{
        const orderDetails = await prisma.orderDetails.delete({
            where: {
                id: id,
            }
        });
        return orderDetails;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}
