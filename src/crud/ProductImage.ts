import prisma from '../../prisma/client';
import HttpException from '../models/http-exception';
import ProductImage from '../models/ProductImage';
import uuid from 'uuid';

export const createProductImage = async (ProductImage: ProductImage) => {
    try{
        
        if(!ProductImage?.productId) 
            throw new HttpException(400, 'Product id is required');
        
        if(!ProductImage?.image) 
            throw new HttpException(400, 'Product image is required');
        
        const productImage = await prisma.productImage.create({
            data: {
                id: uuid.v4(),
                productId: ProductImage?.productId,
                image: ProductImage?.image,
                updatedAt: new Date(),
                main: ProductImage?.main || false,
            }
        });
        return productImage;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}

export const getProductImagesbyProductId = async (productId: string) => {
    if(!productId) 
        throw new HttpException(400, 'Product id is required');
    try{
        const productImages = await prisma.productImage.findMany({
            where: {
                productId: productId,
            }
        });
        return productImages;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}

export const getProductImage = async (id: string) => {
    if(!id) 
        throw new HttpException(400, 'Product image id is required');
    try{
        const productImage = await prisma.productImage.findUnique({
            where: {
                id: id,
            }
        });
        return productImage;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }

}

export const getProductImages = async () => {
    try{
        const productImages = await prisma.productImage.findMany();
        return productImages;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}

export const updateProductImage = async (ProductImage: ProductImage) => {
    if(!ProductImage?.id) 
        throw new HttpException(400, 'Product image id is required');
    try{
        const productImagedetails = await prisma.productImage.findUnique({
            where: {
                id: ProductImage?.id,
            }
        });
        if(!productImagedetails)
            throw new HttpException(400, 'Product image not found');

        const productImage = await prisma.productImage.update({
            where: {
                id: ProductImage?.id,
            },
            data: {
                productId: ProductImage?.productId || productImagedetails?.productId,
                image: ProductImage?.image || productImagedetails?.image,
                updatedAt: new Date(),
                main: ProductImage?.main || productImagedetails?.main,
            }
        });
        return productImage;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}

export const deleteProductImagesbyProductId = async (productId: string) => {
    if(!productId) 
        throw new HttpException(400, 'Product id is required');
    try{
        const productImages = await prisma.productImage.deleteMany({
            where: {
                productId: productId,
            }
        });
        return productImages;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}

export const deleteProductImage = async (id: string) => {
    if(!id) 
        throw new HttpException(400, 'Product image id is required');
    try{
        const productImage = await prisma.productImage.delete({
            where: {
                id: id,
            }
        });
        return productImage;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}

