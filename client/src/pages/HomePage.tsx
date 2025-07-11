import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper';

const HomePage: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Welcome to QuickCloth</h1>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
            >
                <SwiperSlide><img src="https://via.placeholder.com/1200x400?text=Banner+1" alt="Banner 1" className="w-full h-64 object-cover" /></SwiperSlide>
                <SwiperSlide><img src="https://via.placeholder.com/1200x400?text=Banner+2" alt="Banner 2" className="w-full h-64 object-cover" /></SwiperSlide>
            </Swiper>
            <Link to="/products" className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Shop Now
            </Link>
        </div>
    );
};

export default HomePage;