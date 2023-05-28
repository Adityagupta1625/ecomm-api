import prisma from '../../prisma/client';
import HttpException from '../models/http-exception';
import Product from '../models/Product';
import { v4 as uuidv4 } from 'uuid';

export const createProduct = async (Product: Product) => {
    try{
        
        if(!Product?.name) 
            throw new HttpException(400, 'Product name is required');
        
        if(!Product?.price) 
            throw new HttpException(400, 'Product price is required');
        
        if(!Product?.categoryId) 
            throw new HttpException(400, 'Product category is required');
        
        
        const product = await prisma.product.create({
            data: {
                id: uuidv4(),
                name: Product?.name.toLowerCase(),
                price: Product?.price,
                description: Product?.description || "",
                categoryId: Product?.categoryId,
                discountId: Product?.discountId || "",
                updatedAt: new Date(),
            }
        });
        return product;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}

export const getProducts = async () => {
    try{
        const products = await prisma.product.findMany({
            select:{
                
                id:true,
                name:true,
                price:true,
                description:true,
                discount:true,
                category:true,
                updatedAt:true,
                createdAt:true,

            },
        });
        
        return products;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}

export const getProductbyId = async (id: string) => {
    if(!id) 
        throw new HttpException(400, 'Product id is required');
    try{
        const product = await prisma.product.findFirst({
            where: {
                id: id,
            },
            select:{
                
                id:true,
                name:true,
                price:true,
                description:true,
                discount:true,
                category:true,
                updatedAt:true,
                createdAt:true,

            },
        });
        return product;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}

export const getProductbyCategory = async (categoryId: string) => {
    if(!categoryId) 
        throw new HttpException(400, 'Product id is required');
    try{
        const product = await prisma.product.findMany({
            where: {
                categoryId:categoryId,
            },
            select:{
                discount:true,
                category:true,
                id:true,
                name:true,
                price:true,
                description:true,
                updatedAt:true,
                createdAt:true,    
            },
            
            
        });
        return product;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}

export const updateProduct = async (Product: Product) => {
    if(!Product?.id) 
        throw new HttpException(400, 'Product id is required');
    try{
        const productDetail= await getProductbyId(Product?.id);

        const product = await prisma.product.update({
            where: {
                id: Product?.id,
            },
            data: {
                name: Product?.name.toLowerCase() || productDetail?.name,
                price: Product?.price || productDetail?.price,
                description: Product?.description || productDetail?.description,
                categoryId: Product?.categoryId || productDetail?.category?.id,
                discountId: Product?.discountId || productDetail?.discount?.id,
                updatedAt: new Date(),
            }
        });
        return product;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}

export const deleteProduct = async (id: string) => {
    if(!id) 
        throw new HttpException(400, 'Product id is required');
    try{
        const product=await getProductbyId(id);
        
        if(!product) throw new HttpException(400,'Product does not exists');

        await prisma.product.delete({
            where: {
                id: id,
            }
        });
        
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}