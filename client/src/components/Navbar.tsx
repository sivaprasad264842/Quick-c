import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-blue-600 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">QuickCloth</Link>
                <div>
                    <Link to="/products" className="mr-4 hover:underline">Products</Link>
                    <Link to="/cart" className="mr-4 hover:underline">Cart</Link>
                    <Link to="/order" className="hover:underline">Orders</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;