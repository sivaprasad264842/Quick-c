import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getCart, updateCart, removeFromCart } from '../services/api';
import { Link } from 'react-router-dom';
import { CartItem } from '../services/api';

const CartPage: React.FC = () => {
    const { data: cart = [], isLoading, refetch } = useQuery<CartItem[], Error>({
        queryKey: ['cart'],
        queryFn: getCart,
    });
    const updateMutation = useMutation<CartItem, Error, { productId: string; quantity: number }>({
        mutationFn: updateCart,
        onSuccess: () => refetch(),
    });
    const removeMutation = useMutation<void, Error, string>({
        mutationFn: removeFromCart,
        onSuccess: () => refetch(),
    });

    const handleUpdate = (productId: string, quantity: number) => {
        if (quantity > 0) updateMutation.mutate({ productId, quantity });
    };

    const handleRemove = (productId: string) => removeMutation.mutate(productId);

    if (isLoading) return <div className="text-center">Loading...</div>;

    // TODO: Manipulate data here - Modify cart items (e.g., apply discounts, remove items programmatically)
    const total = cart.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-quickc-blue">Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {cart.map((item: CartItem) => (
                        <div key={item.productId} className="border p-4 mb-4 rounded flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <p>₹{item.price} x {item.quantity}</p>
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => handleUpdate(item.productId, parseInt(e.target.value))}
                                    className="w-16 p-1 border rounded"
                                />
                            </div>
                            <button
                                onClick={() => handleRemove(item.productId)}
                                className="text-red-600 hover:text-red-800"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="mt-4 text-right">
                        <p className="text-xl font-bold">Total: ₹{total}</p>
                        <Link to="/checkout" className="bg-quickc-blue text-white px-4 py-2 rounded hover:bg-blue-700 mt-2 inline-block">
                            Proceed to Checkout
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;