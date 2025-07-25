import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getProducts, addToCart } from '../services/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Product, CartItem } from '../services/api';

const ProductPage: React.FC = () => {
    const { data: products = [], isLoading } = useQuery<Product[], Error>({
        queryKey: ['products'],
        queryFn: getProducts,
    });
    const mutation = useMutation<CartItem, Error, { productId: string; name: string; price: number; quantity: number }>({
        mutationFn: addToCart,
    });

    const handleAddToCart = (product: Product) => {
        mutation.mutate({
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
        });
    };

    // TODO: Manipulate data here - Modify how products are filtered based on category or add custom filters
    const params = new (URLSearchParams as any)(window.location.search);
    const category = params.get('category');
    const filteredProducts = category
        ? products.filter((product: Product) => product.category === category)
        : products;

    if (isLoading) return <div className="text-center">Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-quickc-blue">Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredProducts.map((product: Product) => (
                    <div key={product.id} className="border p-4 rounded shadow">
                        <Swiper modules={[Navigation]} spaceBetween={10} slidesPerView={1} navigation>
                            {product.images?.map((img: string, idx: number) => (
                                <SwiperSlide key={idx}>
                                    <img src={img || `https://via.placeholder.com/300?text=${product.name}`} alt={product.name} className="w-full h-48 object-cover" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                        <p>₹{product.price}</p>
                        <button
                            onClick={() => handleAddToCart(product)}
                            className="bg-quickc-blue text-white px-4 py-2 rounded mt-2 hover:bg-blue-700"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductPage;