// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import CartPage from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductDetail from '../components/ProductDetail';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/products" exact component={Products} />
        <Route path="/products/:id" component={ProductDetail} />
        <Route path="/cart" component={CartPage} />
        <Route path="/checkout" component={Checkout} />
      </Switch>
    </Router>
  );
}

export default App;
