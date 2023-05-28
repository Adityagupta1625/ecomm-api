import prisma from "../../prisma/client";
import HttpException from "../models/http-exception";
import CartItem from "../models/CartItem";
import { getProductbyId } from "./Product";
import { v4 as uuidv4 } from 'uuid';


export const createCartItem = async (CartItem: CartItem) => {
  try {
    if (!CartItem?.cartId) throw new HttpException(400, "Cart id is required");

    if (!CartItem?.productId)
      throw new HttpException(400, "Product id is required");

    const product = await getProductbyId(CartItem?.productId);

    let quantity: number = CartItem?.quantity || 1;
    
    let price: any = product?.price?product?.price* quantity:0;

    const cartItem = await prisma.cartItem.create({
      data: {
        id: uuidv4(),
        cartId: CartItem?.cartId,
        productId: CartItem?.productId,
        quantity: CartItem?.quantity || 1,
        price: price,
        updatedAt: new Date(),
      },
    });
    return cartItem;
  } catch (err: any) {
    throw new HttpException(500, err?.message);
  }
};

export const getCartItemById = async (id: string) => {
  try {
    const cartItem = await prisma.cartItem.findUnique({
      where: {
        id: id,
      },
    });
    return cartItem;
  } catch (err: any) {
    throw new HttpException(500, err?.message);
  }
};

export const getCartItemsByCartId = async (cartId: string) => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: {
        cartId: cartId,
      },
    });
    return cartItems;
  } catch (err: any) {
    throw new HttpException(500, err?.message);
  }
};

export const updateCartItem = async (CartItem: CartItem) => {
  try {
    if (!CartItem?.id) throw new HttpException(400, "Cart item id is required");

    const cartItem = await getCartItemById(CartItem?.id);

    if (!cartItem) throw new HttpException(400, "Cart item not found");

    const product = await getProductbyId(cartItem?.productId);

    let quantity: number = CartItem?.quantity || cartItem?.quantity;
    let price: any = product?.price?product?.price* quantity:0;

    const updatedCartItem = await prisma.cartItem.update({
      where: {
        id: CartItem?.id,
      },
      data: {
        quantity: CartItem?.quantity || cartItem?.quantity,
        price: price,
        updatedAt: new Date(),
      },
    });
    return updatedCartItem;
  } catch (err: any) {
    throw new HttpException(500, err?.message);
  }
};

export const deleteCartItem = async (id: string) => {
  try {
    const cartItem = await getCartItemById(id);

    if (!cartItem) throw new HttpException(400, "Cart item not found");

    const deletedCartItem = await prisma.cartItem.delete({
      where: {
        id: id,
      },
    });
    return deletedCartItem;
  } catch (err: any) {
    throw new HttpException(500, err?.message);
  }
};
