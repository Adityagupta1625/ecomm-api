import prisma from '../../prisma/client';
import HttpException from '../models/http-exception';
import ProductInventory from '../models/ProductInventory';
import uuid from 'uuid';

export const createProductInventory = async (ProductInventory: ProductInventory) => {
    try{
        if(!ProductInventory?.productId)
            throw new HttpException(400, 'Product ID is required');
        
        prisma.productInventory.findUnique({
            where: {
                productId: ProductInventory?.productId
            }
        }).then((productInventoryDetail) => {
            if(productInventoryDetail)
                throw new HttpException(400, 'Product already exist');
        })
        
        const productInventory = await prisma.productInventory.create({
            data: {
                id: uuid.v4(),
                quantity: ProductInventory?.quantity || 0,
                productId: ProductInventory?.productId,
                updatedAt: new Date(),
            }
        });

        return productInventory;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}

export const updateProductInventory = async (ProductInventory: ProductInventory) => {
    try{
        if(!ProductInventory?.id)
            throw new HttpException(400, 'ID is required');
        
        let productInventoryDetail= await prisma.productInventory.findUnique({
            where: {
                id: ProductInventory?.id
            }
        });

        if(!productInventoryDetail)
            throw new HttpException(400, 'Product does not exist');

        const productInventory = await prisma.productInventory.update({
            where: {
                id: ProductInventory?.id
            },
            data: {
                productId: ProductInventory?.productId || productInventoryDetail?.productId,
                quantity: ProductInventory?.quantity || productInventoryDetail?.quantity,
                updatedAt: new Date(),
            }
        });

        return productInventory;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}

export const deleteProductInventory = async (id: string) => {
    try{
        if(!id)
            throw new HttpException(400, 'ID is required');
        
        const productInventory = await prisma.productInventory.delete({
            where: {
                id: id
            }
        });
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}

export const getProductInventoryAll = async (id: string) => {
    try{
        const inventory=prisma.productInventory.findMany();
        return inventory;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}

export const getProductInventoryById = async (id: string) => {
    try{
        if(!id)
            throw new HttpException(400, 'ID is required');
        
        const inventory=prisma.productInventory.findUnique({
            where: {
                id: id
            }
        });
        return inventory;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}

export const getProductInventoryByProductId = async (productId: string) => {
    try{
        if(!productId)
            throw new HttpException(400, 'Product ID is required');
        
        const inventory=prisma.productInventory.findUnique({
            where: {
                productId: productId
            }
        });
        return inventory;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}