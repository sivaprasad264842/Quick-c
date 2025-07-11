import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = async (data: { email: string; password: string }) => {
    const response = await api.post('/auth/login', data);
    return response.data;
};

export const googleLogin = async () => {
    // Handled via redirect
};

export const getProducts = async () => {
    const response = await api.get('/products');
    return response.data;
};

export const addToCart = async (item: { productId: string; name: string; price: number; quantity: number }) => {
    const response = await api.post('/cart', item);
    return response.data;
};

export const getCart = async () => {
    const response = await api.get('/cart');
    return response.data;
};

export const updateCart = async ({ productId, quantity }: { productId: string; quantity: number }) => {
    const response = await api.put(`/cart/${productId}`, { quantity });
    return response.data;
};

export const removeFromCart = async (productId: string) => {
    const response = await api.delete(`/cart/${productId}`);
    return response.data;
};

export const createPaymentOrder = async (data: { amount: number }) => {
    const response = await api.post('/payments/order', data);
    return response.data;
};

export const placeOrder = async (order: { userId: string; items: any[]; status: string; paymentId: string }) => {
    const response = await api.post('/orders', order);
    return response.data;
};

export const getOrders = async () => {
    const response = await api.get('/orders');
    return response.data;
};