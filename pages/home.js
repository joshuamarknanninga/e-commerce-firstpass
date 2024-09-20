// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('/api/products/featured');
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div>
      <h1>Welcome to Our E-commerce Site</h1>
      <p>Find the best products at unbeatable prices!</p>

      <h2>Featured Products</h2>
      <div className="featured-products">
        {featuredProducts.length === 0 ? (
          <p>No featured products available.</p>
        ) : (
          featuredProducts.map(product => (
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

export default Home;
