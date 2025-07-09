import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-blue-800 p-4 text-white">
            <div className="container mx-auto justify-between items-center flex">
                <Link to="/" className="text-xl font-bold">QuickCloth</Link>
                <div>
                    <Link to="/products" className="mr-4">Products</Link>
                    <Link to="/cart" className="mr-4">Cart</Link>
                    <Link to="/order">Orders</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;