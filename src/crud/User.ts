import prisma from '../../prisma/client';
import HttpException from '../models/http-exception';
import User from '../models/User';

export const createUser = async (User: User) => {
    try{
        if(!User?.id) 
            throw new HttpException(400, 'User ID is required');
        
        if(!User?.email) 
            throw new HttpException(400, 'User email is required');

        prisma.user.findUnique({
            where: {
                email: User?.email
            }
        }).then((user:any) => {
            if(user)
                throw new HttpException(400, 'User already exists');
        }).catch((err:any) => {
            throw new HttpException(500, err?.message);
        });

        const user = await prisma.user.create({
            data: {
                id: User?.id,
                name: User?.name || "Guest",
                email: User?.email,
                email_verified: User?.email_verified || false,
                updatedAt: new Date(),
            }
        });
        return user;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}

export const updateUser = async (User: User) => {
    try{
        if(!User?.id) 
            throw new HttpException(400, 'User ID is required');
        
        let userDetail= await prisma.user.findUnique({
            where: {
                id: User?.id
            }
        });

        if(!userDetail)
            throw new HttpException(400, 'User does not exist');

        const user = await prisma.user.update({
            where: {
                id: User?.id
            },
            data: {
                name: User?.name || userDetail?.name,
                email_verified: User?.email_verified || userDetail?.email_verified,
                updatedAt: new Date(),
               
            }
        });
        return user;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}

export const deleteUser = async (id: string) => {
    try{
        if(!id) 
            throw new HttpException(400, 'User ID is required');
        
        prisma.user.findUnique({
            where: {
                id: id
            }
        }).then((user:any) => {
            if(!user)
                throw new HttpException(400, 'User does not exist');
        }).catch((err:any) => {
            throw new HttpException(500, err?.message);
        });

        const user = await prisma.user.delete({
            where: {
                id: id
            }
        });
        return user;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}

export const getUser = async (id: string) => {
    try{
        if(!id) 
            throw new HttpException(400, 'User ID is required');
        
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        });
        return user;
    }
    catch(err:any){
        throw new HttpException(500, err?.message);
    }
}