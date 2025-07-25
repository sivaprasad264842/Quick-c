import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-quickc-blue text-white p-4 shadow-md sticky top-0 z-10">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">QuickC</Link>
                <div className="flex items-center space-x-4">
                    <Link to="/wishlist" className="hover:text-blue-200">
                        <span role="img" aria-label="wishlist"></span> Wishlist
                    </Link>
                    <Link to="/cart" className="hover:text-blue-200">
                        <span role="img" aria-label="cart">🛒</span> Cart
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;