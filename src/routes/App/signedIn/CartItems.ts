import express, { Request, Response } from "express";
import {
  createCartItem,
  getCartItemById,
  getCartItemsByCartId,
  updateCartItem,
  deleteCartItem,
} from "../../../crud/CartItem";

const router = express.Router();


/**
 * @swagger
 * /app/signedIn/CartItem:
 *   post:
 *     summary: Add Cart Item in the cart
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                cartId:
 *                  type: string
 *                productId:
 *                   type: string
 *                quantity:
 *                    type: number
 *                price:
 *                    type: number
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                message:
 *                  type: string
 *                             
 *              
 */

/**
 * @swagger
 * /app/signedIn/CardItem?id={id}:
 *   get:
 *     summary: fetch cart item by id
 *     parameters:
 *        - in: query
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: The Cart item id
 *     responses:
 *       200:
 *         description: Return cart item by id
 *         content:
 *           application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                    id:
 *                       type: string
 *                    cartId:
 *                       type: string
 *                    productId:
 *                       type: string
 *                    quantity:
 *                       type: number
 *                    price:
 *                       type: number
 *                    updatedAt:
 *                       type: string
 * 
 */

/**
 * @swagger
 * /app/signedIn/CardItem?cartId={cartId}:
 *   get:
 *     summary: fetch cart item by cart id
 *     parameters:
 *        - in: query
 *          name: cartId
 *          schema:
 *              type: string
 *          required: true
 *          description: The Cart item by cartId
 *     responses:
 *       200:
 *         description: Return cart item by cartId
 *         content:
 *           application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                    id:
 *                       type: string
 *                    cartId:
 *                       type: string
 *                    productId:
 *                       type: string
 *                    quantity:
 *                       type: number
 *                    price:
 *                       type: number
 *                    updatedAt:
 *                       type: string
 * 
 */

/**
 * @swagger
 * /app/signedIn/CartItem:
 *   put:
 *     summary: update Cart Item
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                cartId:
 *                  type: string
 *                productId:
 *                   type: string
 *                quantity:
 *                    type: number
 *                price:
 *                    type: number
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                message:
 *                  type: string
 *                             
 *              
 */

/**
 * @swagger
 * /app/signedIn/CartItem:
 *   delete:
 *     summary: remove Cart Item
 *     parameters:
 *        - in: query
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: The Cart item id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                message:
 *                  type: string
 *                             
 *              
 */

router.post("/", async (req: Request, res: Response) => {
  try {
    await createCartItem(req.body);
    res.status(201).json({ message: "Cart Item added successfully" });
  } catch (err: any) {
    res
      .status(err?.status || 500)
      .json({ message: "Error while adding item in cart" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const cartItem = await getCartItemById(req.params.id);

    if (!cartItem) return res.status(400).json({ message: "Cart Item not found" });

    else res.status(200).json(cartItem);

  } catch (err: any) {
    res
      .status(err?.status || 500)
      .json({ message: "Error while getting cart item" });
  }
});

router.get("/:cartId", async (req: Request, res: Response) => {
  try {
    const cartItems = await getCartItemsByCartId(req.params.cartId);

    if (!cartItems) return res.status(400).json({ message: "Cart Items not found" });

    else res.status(200).json(cartItems);

  } catch (err: any) {
    res
      .status(err?.status || 500)
      .json({ message: "Error while fetching items in cart" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    await updateCartItem(req.body);
    
    res.status(200).json({ message: "Cart Item updated successfully" });

  } catch (err: any) {
    res
      .status(err?.status || 500)
      .json({ message: "Error while updating item" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await deleteCartItem(req.params.id);
    
    res.status(200).json({ message: "Cart Item deleted successfully" });

  } catch (err: any) {
    res
      .status(err?.status || 500)
      .json({ message: "Unable to delete try again later" });
  }
});

export default router;