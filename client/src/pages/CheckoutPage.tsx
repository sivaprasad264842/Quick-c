import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { createPaymentOrder, placeOrder, getCart } from '../services/api';
import { useNavigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
    const [orderId, setOrderId] = useState('');
    const { data: cart, isLoading } = useQuery(['cart'], getCart);
    const mutation = useMutation(createPaymentOrder);
    const navigate = useNavigate();

    useEffect(() => {
        if (cart) {
            const total = cart.reduce((sum: number, item: any): number => sum + item.price * item.quantity, 0);
            mutation.mutate({ amount: total }, {
                onSuccess: (data: any) => setOrderId(data.orderId),
            });
        }
    }, [cart]);

    const handlePayment = () => {
        const options = {
            key: 'rzp_test_your_key_id',
            amount: cart.reduce((sum: number, item: any): number => sum + item.price * item.quantity, 0) * 100,
            currency: 'INR',
            order_id: orderId,
            name: 'QuickCloth',
            description: 'Clothing Order',
            handler: function (response: any) {
                placeOrder({
                    userId: 'user-id',
                    items: cart,
                    status: 'Processing',
                    paymentId: response.razorpay_payment_id,
                }).then(() => navigate('/order'));
            },
            prefill: {
                email: 'user@example.com',
                contact: '6302263892',
            },
            theme: {
                color: '#2563eb',
            },
        };
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
    };

    if (isLoading || !orderId) return <div className="text-center">Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            <button
                onClick={handlePayment}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Pay with Razorpay
            </button>
        </div>
    );
};

export default CheckoutPage;