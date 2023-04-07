import prisma from '../../prisma/client';
import HttpException from '../models/http-exception';
import ProductCategory from '../models/ProductCategory';
import uuid from 'uuid';

export const createProductCategory = async (ProductCategory: ProductCategory) => {
    try{
        if(!ProductCategory?.id) 
            throw new HttpException(400, 'Product Category ID is required');
        
        if(!ProductCategory?.name) 
            throw new HttpException(400, 'Product Category name is required');
        
        const productCategory = await prisma.productCategory.create({
            data: {
                id: uuid.v4(),
                name: ProductCategory?.name.toLowerCase(),
                description: ProductCategory?.description || "",
                updatedAt: new Date(),
            }
        });
        return productCategory;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}

export const updateProductCategory = async (ProductCategory: ProductCategory) => {
    try{
        if(!ProductCategory?.id) 
            throw new HttpException(400, 'Product Category ID is required');
        
        let productCategoryDetail= await getProductCategorybyId(ProductCategory?.id);

        if(!productCategoryDetail)
            throw new HttpException(400, 'Product Category does not exist');

        const productCategory = await prisma.productCategory.update({
            where: {
                id: ProductCategory?.id
            },
            data: {
                name: ProductCategory?.name || productCategoryDetail?.name,
                description: ProductCategory?.description || productCategoryDetail?.description,
                updatedAt: new Date(),
            }
        });
        return productCategory;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}

export const deleteProductCategory = async (id: string) => {
    try{
        if(!id) 
            throw new HttpException(400, 'Product Category ID is required');
        
        let productCategoryDetail= await getProductCategorybyId(id);

        if(!productCategoryDetail)
            throw new HttpException(400, 'Product Category does not exist');

        await prisma.productCategory.delete({
            where: {
                id: id
            }
        });
        
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}

export const getProductCategorybyId = async (id: string) => {
    try{
        if(!id) 
            throw new HttpException(400, 'Product Category ID is required');
        
        let productCategory= await prisma.productCategory.findUnique({
            where: {
                id: id
            }
        });

        return productCategory;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}

export const getProductCategorybyName = async (name: string) => {
    try{
        if(!name) 
            throw new HttpException(400, 'Product Category name is required');
        
        let productCategory= await prisma.productCategory.findUnique({
            where: {
                name: name
            }
        });

        return productCategory;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}

export const getProductCategoryAll = async () => {
    try{
        let productCategoryDetail= await prisma.productCategory.findMany();
        return productCategoryDetail;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}