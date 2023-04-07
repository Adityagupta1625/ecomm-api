import prisma from '../../prisma/client';
import HttpException from '../models/http-exception';
import Product from '../models/Product';
import uuid from 'uuid';

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
                id: uuid.v4(),
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
            include: {
                category: true,
                discount: true,
            }
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
        const product = await prisma.product.findUnique({
            where: {
                id: id,
            },
            include: {
                category: true,
                discount: true,
            }
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
            include: {
                category: true,
                discount: true,
            }
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
                categoryId: Product?.categoryId || productDetail?.categoryId,
                discountId: Product?.discountId || productDetail?.discountId,
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