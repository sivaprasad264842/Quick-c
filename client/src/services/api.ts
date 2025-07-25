import axios from 'axios';

export interface Product {
    id: string;
    name: string;
    price: number;
    category?: string;
    images?: string[];
}

export interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
}

export interface Order {
    id: string;
    userId: string;
    items: CartItem[];
    status: string;
    paymentId: string;
}

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // TODO: Manipulate data here - Update to deployed backend URL (e.g., https://quickcloth-backend.onrender.com/api)
});

api.interceptors.request.use((config) => {
    let token: string | null = null;
    if (typeof window !== 'undefined' && window.localStorage) {
        token = window.localStorage.getItem('token') ?? null;
    }
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const login = async (data: { email: string; password: string }) => {
    try {
        const response = await api.post('/auth/login', data);
        return response.data;
    } catch (error) {
        throw new Error(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};

export const googleLogin = async () => {
    // TODO: Manipulate data here - Implement Google OAuth redirect (e.g., window.location.href = 'your-google-oauth-url')
};

export const getProducts = async (): Promise<Product[]> => {
    try {
        const response = await api.get('/products');
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch products: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};

export const addToCart = async (item: { productId: string; name: string; price: number; quantity: number }): Promise<CartItem> => {
    try {
        const response = await api.post('/cart', item);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to add to cart: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};

export const getCart = async (): Promise<CartItem[]> => {
    try {
        const response = await api.get('/cart');
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch cart: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};

export const updateCart = async ({ productId, quantity }: { productId: string; quantity: number }): Promise<CartItem> => {
    try {
        const response = await api.put(`/cart/${productId}`, { quantity });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to update cart: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};

export const removeFromCart = async (productId: string): Promise<void> => {
    try {
        await api.delete(`/cart/${productId}`);
    } catch (error) {
        throw new Error(`Failed to remove from cart: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};

export const createPaymentOrder = async (data: { amount: number }): Promise<{ orderId: string }> => {
    try {
        const response = await api.post('/payments/order', data);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to create payment order: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};

export const placeOrder = async (order: { userId: string; items: CartItem[]; status: string; paymentId: string }): Promise<Order> => {
    try {
        const response = await api.post('/orders', order);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to place order: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};

export const getOrders = async (): Promise<Order[]> => {
    try {
        const response = await api.get('/orders');
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch orders: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};