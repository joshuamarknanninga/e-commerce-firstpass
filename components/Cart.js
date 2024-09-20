// src/components/Cart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Fetch cart items from local storage or API
    const fetchCartItems = async () => {
      const items = JSON.parse(localStorage.getItem('cart')) || [];
      setCartItems(items);
      calculateTotal(items);
    };
    fetchCartItems();
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(total);
  };

  const handleRemoveItem = (productId) => {
    const updatedCartItems = cartItems.filter(item => item._id !== productId);
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    calculateTotal(updatedCartItems);
  };

  const handleQuantityChange = (productId, quantity) => {
    const updatedCartItems = cartItems.map(item => {
      if (item._id === productId) {
        item.quantity = quantity;
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    calculateTotal(updatedCartItems);
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post('/api/orders', {
        products: cartItems,
        totalAmount
      });
      console.log('Order successful:', response.data);
      setCartItems([]);
      localStorage.removeItem('cart');
      setTotalAmount(0);
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item._id}>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>${item.price}</p>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                min="1"
              />
              <button onClick={() => handleRemoveItem(item._id)}>Remove</button>
            </div>
          ))}
          <h2>Total Amount: ${totalAmount}</h2>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
