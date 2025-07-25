import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HomePage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
        // TODO: Manipulate data here - e.g., redirect to /products?search={searchQuery} or filter locally
    };

    // TODO: Manipulate data here - Modify the categories array to add/remove categories or change images
    const categories = [
        { name: 'Men', image: 'https://via.placeholder.com/300x200?text=Men' },
        { name: 'Women', image: 'https://via.placeholder.com/300x200?text=Women' },
        { name: 'Kids', image: 'https://via.placeholder.com/300x200?text=Kids' },
        { name: 'Gym Wear', image: 'https://via.placeholder.com/300x200?text=Gym+Wear' },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-quickc-blue text-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold">QuickC</Link>
                    <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-4">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for clothes..."
                                className="w-full p-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-quickc-blue"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-quickc-blue p-2 rounded-lg hover:bg-blue-100"
                            >
                                🔍
                            </button>
                        </div>
                    </form>
                    <div className="space-x-4">
                        <Link to="/wishlist" className="hover:text-blue-200">
                            <span role="img" aria-label="wishlist">❤️</span> Wishlist
                        </Link>
                        <Link to="/cart" className="hover:text-blue-200">
                            <span role="img" aria-label="cart">🛒</span> Cart
                        </Link>
                    </div>
                </div>
            </header>

            <section className="py-12 bg-white">
                <div className="container mx-auto">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={50}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000 }}
                        className="rounded-lg overflow-hidden"
                    >
                        <SwiperSlide>
                            <img src="https://via.placeholder.com/1200x400?text=QuickC+Sale+Up+to+50%25+Off" alt="Banner 1" className="w-full h-64 object-cover" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://via.placeholder.com/1200x400?text=New+Arrivals+Men+&+Women" alt="Banner 2" className="w-full h-64 object-cover" />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>

            <section className="py-12">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-8 text-quickc-blue">Shop by Category</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((category) => (
                            <Link
                                to={`/products?category=${category.name.toLowerCase()}`}
                                key={category.name}
                                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                            >
                                <img src={category.image} alt={category.name} className="w-full h-40 object-cover rounded-t-lg" />
                                <h3 className="text-xl font-semibold text-center mt-2 text-quickc-blue">{category.name}</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;