import prisma from "../../prisma/client";
import HttpException from "../models/http-exception";
import Cart from "../models/Cart";
import uuid from "uuid";

export const createCart = async (Cart: Cart) => {
  try {
    if (!Cart?.userId) throw new HttpException(400, "User id is required");

    const alreadycart = await getCartbyUserId(Cart?.userId);

    if(alreadycart) throw new HttpException(400,"Cart already exist");

    const cart = await prisma.cart.create({
      data: {
        id: uuid.v4(),
        userId: Cart?.userId,
        total: Cart?.total || 0,
        updatedAt: new Date(),
      },
    });
    return cart;
  } catch (err: any) {
    throw new HttpException(500, err?.message);
  }
};

export const getCartbyUserId = async (userId: string) => {
  if (!userId) throw new HttpException(400, "User id is required");
  try {
    const cart = await prisma.cart.findUnique({
      where: {
        userId: userId,
      },
    });
    return cart;
  } catch (err: any) {
    throw new HttpException(500, err?.message);
  }
};

export const getCartbyId = async (id: string) => {
  if (!id) throw new HttpException(400, "Cart id is required");
  try {
    const cart = await prisma.cart.findUnique({
      where: {
        id: id,
      },
    });
    return cart;
  } catch (err: any) {
    throw new HttpException(500, err?.message);
  }
};

export const updateCart = async (Cart: Cart) => {
  if (!Cart?.id) throw new HttpException(400, "Cart id is required");

  try {
    const cart=getCartbyId(Cart?.id);

    if(!cart) throw new HttpException(400,'Cart does not exists');

    const updatedcart = await prisma.cart.update({
      where: {
        id: Cart?.id,
      },
      data: {
        total: Cart?.total,
        updatedAt: new Date(),
      },
    });
    return updatedcart;
    
  } catch (err: any) {
    throw new HttpException(500, err?.message);
  }
};

export const deleteCart = async (id: string) => {
  if (!id) throw new HttpException(400, "Cart id is required");

  try {
    const cart=await getCartbyId(id);

    if(!cart) throw new HttpException(400,'Cart does not exists');

    await prisma.cart.delete({
      where:{
        id:id
      }
    })

  } catch (err: any) {
    throw new HttpException(500, err?.message);
  }
};
