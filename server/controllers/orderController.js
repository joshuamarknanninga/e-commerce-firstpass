// server/controllers/orderController.js
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

const createOrder = async (req, res) => {
  const { products, totalAmount } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const order = new Order({
      user: userId,
      products,
      totalAmount,
      status: 'Pending'
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const getOrderById = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findById(orderId).populate('user').populate('products.product');
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const getUserOrders = async (req, res) => {
  const userId = req.params.userId;

  try {
    const orders = await Order.find({ user: userId }).populate('products.product');
    res.json(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  createOrder,
  getOrderById,
  getUserOrders
};
