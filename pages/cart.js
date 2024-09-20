// src/pages/Cart.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateCartQuantity } from '../redux/actions/cartActions';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId, quantity) => {
    dispatch(updateCartQuantity(productId, quantity));
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item._id}>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>${item.price}</p>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item._id, Number(e.target.value))}
                min="1"
              />
              <button onClick={() => handleRemoveItem(item._id)}>Remove</button>
            </div>
          ))}
          <h2>Total Amount: ${totalAmount}</h2>
          <Link to="/checkout">
            <button>Proceed to Checkout</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
