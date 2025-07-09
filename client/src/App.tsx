import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderPage from './pages/OrderPage';

const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/product" component={ProductPage} />
                <Route path="/cart" component={CartPage} />
                <Route path="/checkout" component={CheckoutPage} />
                <Route path="/order" component={OrderPage} />
            </Switch>
        </Router>
    );
};

export default App;