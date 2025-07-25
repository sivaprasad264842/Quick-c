import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { createPaymentOrder, placeOrder, getCart } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { CartItem, Order } from '../services/api';

const CheckoutPage: React.FC = () => {
    const { data: cart = [] } = useQuery<CartItem[], Error>({
        queryKey: ['cart'],
        queryFn: getCart,
    });
    const [orderId, setOrderId] = useState('');
    const mutation = useMutation<{ orderId: string }, Error, { amount: number }>({
        mutationFn: createPaymentOrder,
    });
    const placeOrderMutation = useMutation<Order, Error, { userId: string; items: CartItem[]; status: string; paymentId: string }>({
        mutationFn: placeOrder,
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (cart.length > 0) {
            const total = cart.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);
            mutation.mutate({ amount: total }, {
                onSuccess: (data) => setOrderId(data.orderId),
            });
        }
    }, [cart]);

    const handlePayment = () => {
        if (!orderId || cart.length === 0) return;

        const options = {
            key: 'rzp_test_your_key_id', // TODO: Replace with your Razorpay Test Key ID
            amount: cart.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0) * 100,
            currency: 'INR',
            order_id: orderId,
            name: 'QuickCloth',
            description: 'Clothing Order',
            handler: function (response: any) {
                placeOrderMutation.mutate({
                    userId: 'user_id', // TODO: Manipulate data here - Replace with actual user ID from auth
                    items: cart,
                    status: 'Processing',
                    paymentId: response.razorpay_payment_id,
                }, {
                    onSuccess: () => navigate('/order'),
                });
            },
            prefill: { email: 'user@example.com', contact: '6302263892' },
            theme: { color: '#2563eb' },
        };
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
    };

    const total = cart.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-quickc-blue">Checkout</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {cart.map((item: CartItem) => (
                        <div key={item.productId} className="border p-4 mb-4 rounded flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <p>₹{item.price} x {item.quantity}</p>
                            </div>
                        </div>
                    ))}
                    <div className="mt-4 text-right">
                        <p className="text-xl font-bold">Total: ₹{total}</p>
                        <button
                            onClick={handlePayment}
                            className="bg-quickc-blue text-white px-4 py-2 rounded hover:bg-blue-700 mt-2"
                        >
                            Pay with Razorpay
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CheckoutPage;