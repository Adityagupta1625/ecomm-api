interface OrderItems {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    price: number;
    updatedAt: Date;
}

export default OrderItems;