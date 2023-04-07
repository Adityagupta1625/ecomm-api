interface OrderDetails {
    id: string;
    userId: string;
    total: number;
    paymentId: string;
    status: string;
    updatedAt: Date;
}

export default OrderDetails;