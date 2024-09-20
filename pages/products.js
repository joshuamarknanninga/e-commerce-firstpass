// src/pages/Products.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setProducts } from '../redux/actions/productActions';

const Products = () => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        dispatch(setProducts(response.data));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <div>
      <h1>Products</h1>
      <div className="products-list">
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <Link to={`/products/${product._id}`}>
                <img src={product.imageUrl} alt={product.name} />
                <h3>{product.name}</h3>
                <p>${product.price}</p>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
