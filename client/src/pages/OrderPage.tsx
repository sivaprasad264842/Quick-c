import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../services/api';
import { Client } from '@stomp/stompjs';
import { Order } from '../services/api';

const OrderPage: React.FC = () => {
    const { data: orders = [] } = useQuery<Order[], Error>({
        queryKey: ['orders'],
        queryFn: getOrders,
    });
    const [orderUpdates, setOrderUpdates] = useState<any[]>([]);

    useEffect(() => {
        const client = new Client({
            brokerURL: 'ws://localhost:8080/ws', // TODO: Manipulate data here - Update with deployed WebSocket URL
            onConnect: () => {
                client.subscribe('/topic/orders/user-id', (message) => {
                    setOrderUpdates((prev) => [...prev, JSON.parse(message.body)]);
                });
            },
        });
        client.activate();
        return () => void  client.deactivate();
    }, []);

    // TODO: Manipulate data here - Filter or transform orders/orderUpdates (e.g., sort by date, filter by status)
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-quickc-blue">Your Orders</h2>
            {[...orders, ...orderUpdates].length === 0 ? (
                <p>No orders yet.</p>
            ) : (
                [...orders, ...orderUpdates].map((order: Order) => (
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