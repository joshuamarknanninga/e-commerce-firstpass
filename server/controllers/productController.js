// server/controllers/productController.js
const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const createProduct = async (req, res) => {
  const { name, description, price, imageUrl } = req.body;
  try {
    const newProduct = new Product({ name, description, price, imageUrl });
    const product = await newProduct.save();
    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

module.exports = { getProducts, getProductById, createProduct };
