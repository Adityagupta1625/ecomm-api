interface CartItem {
    id: string;
    cartId: string;
    productId: string;
    quantity: number;
    price: number;
    updatedAt: Date;
}

export default CartItem;