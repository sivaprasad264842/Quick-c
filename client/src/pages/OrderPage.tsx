import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../services/api';
import { Client } from '@stomp/stompjs';

const OrderPage: React.FC = () => {
    const { data: orders, isLoading } = useQuery(['orders'], getOrders);
    const [orderUpdates, setOrderUpdates] = useState<any[]>([]);

    useEffect(() => {
        const client = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            onConnect: () => {
                client.subscribe('/topic/orders/user-id', (message) => {
                    setOrderUpdates((prev) => [...prev, JSON.parse(message.body)]);
                });
            },
        });
        client.activate();
        return () => client.deactivate();
    }, []);

    if (isLoading) return <div className="text-center">Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
            {orderUpdates.length === 0 ? (
                <p>No orders yet.</p>
            ) : (
                orderUpdates.map((order: any) => (
                    <div key={order.id} className="border p-4 mb-4 rounded shadow">
                        <h3 className="font-semibold">Order ID: {order.id}</h3>
                        <p>Status: {order.status}</p>
                        <p>Payment ID: {order.paymentId}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default OrderPage;