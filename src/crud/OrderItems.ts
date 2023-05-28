import prisma from '../../prisma/client';
import HttpException from '../models/http-exception';
import OrderItems from '../models/OrderItems';
import {getProductbyId} from './Product'
import { v4 as uuidv4 } from 'uuid';

export const createOrderItems = async (OrderItems: OrderItems) => {
    try{
        
        if(!OrderItems?.orderId) 
            throw new HttpException(400, 'Order id is required');
        
        if(!OrderItems?.productId)
            throw new HttpException(400, 'Product id is required');
        
        const product = await getProductbyId(OrderItems?.productId);
        let price: number = product?.price || 0;

        const orderItems = await prisma.orderItems.create({
            data: {
                id: uuidv4(),
                orderId: OrderItems?.orderId,
                productId: OrderItems?.productId,
                quantity: OrderItems?.quantity || 1,
                price: OrderItems?.quantity? price * OrderItems?.quantity : price,
                updatedAt: new Date(),
            }
        });
        return orderItems;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}

export const getOrderItemsbyOrderId = async (orderId: string) => {
    if(!orderId) 
        throw new HttpException(400, 'Order id is required');
    try{
        const orderItems = await prisma.orderItems.findMany({
            where: {
                orderId: orderId,
            },
            include: {
                product: true,
            }
        });
        return orderItems;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}

export const getOrderItemsbyId = async (id: string) => {
    if(!id) 
        throw new HttpException(400, 'Order item id is required');
    try{
        const orderItems = await prisma.orderItems.findUnique({
            where: {
                id: id,
            },
            include: {
                orderDetails: true,
                product: true,
            }
        });
        return orderItems;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}

export const getOrderItemsbyProductId = async (productId: string) => {
    if(!productId) 
        throw new HttpException(400, 'Product id is required');
    try{
        const orderItems = await prisma.orderItems.findMany({
            where: {
                productId: productId,
            },
            include: {
                orderDetails: true,
            }
        });
        return orderItems;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}

export const updateOrderItems = async (OrderItems: OrderItems) => {
    try{
        
        if(!OrderItems?.id) 
            throw new HttpException(400, 'Order item id is required');
        
        const orderItemsdetails = await getOrderItemsbyId(OrderItems?.id);

        let price: number = orderItemsdetails?.price || 0;
        
        if(OrderItems?.quantity){
            let qty: number = orderItemsdetails?.quantity || 1;
            price= price * qty;
        }

        const orderItems = await prisma.orderItems.update({
            where: {
                id: OrderItems?.id,
            },
            data: {
                orderId: OrderItems?.orderId || orderItemsdetails?.orderId,
                productId: OrderItems?.productId || orderItemsdetails?.productId,
                quantity: OrderItems?.quantity || orderItemsdetails?.quantity,
                price:  orderItemsdetails?.price || price,
                updatedAt: new Date(),
            }
        });
        return orderItems;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}

export const deleteOrderItems = async (id: string) => {
    if(!id) 
        throw new HttpException(400, 'Order item id is required');
    try{
        const orderItems = await prisma.orderItems.delete({
            where: {
                id: id,
            }
        });
        return orderItems;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}