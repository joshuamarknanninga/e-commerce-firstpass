// src/components/Checkout.js
import React, { useState } from 'react';
import axios from 'axios';

const Checkout = () => {
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [totalAmount, setTotalAmount] = useState(
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleShippingChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    try {
      const order = {
        products: cartItems,
        totalAmount,
        shippingInfo,
        paymentInfo
      };
      const response = await axios.post('/api/orders', order);
      console.log('Order successful:', response.data);
      localStorage.removeItem('cart');
      setCartItems([]);
      setTotalAmount(0);
      // Redirect to order confirmation page or display success message
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <h2>Shipping Information</h2>
      <form>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={shippingInfo.address}
          onChange={handleShippingChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={shippingInfo.city}
          onChange={handleShippingChange}
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={shippingInfo.postalCode}
          onChange={handleShippingChange}
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={shippingInfo.country}
          onChange={handleShippingChange}
        />
      </form>

      <h2>Payment Information</h2>
      <form>
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={paymentInfo.cardNumber}
          onChange={handlePaymentChange}
        />
        <input
          type="text"
          name="expiryDate"
          placeholder="Expiry Date"
          value={paymentInfo.expiryDate}
          onChange={handlePaymentChange}
        />
        <input
          type="text"
          name="cvv"
          placeholder="CVV"
          value={paymentInfo.cvv}
          onChange={handlePaymentChange}
        />
      </form>

      <h2>Total Amount: ${totalAmount}</h2>
      <button onClick={handleCheckout}>Confirm Order</button>
    </div>
  );
};

export default Checkout;
