// /Routes/myorderData.js

const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
  try {
    const { email, order_data, order_date } = req.body;

    const existingOrder = await Order.findOne({ email });

    if (!existingOrder) {
      await Order.create({
        email,
        order_data: [{ order_date, items: order_data }]
      });
      return res.status(200).json({ success: true, message: "Order created." });
    }

    await Order.findOneAndUpdate(
      { email },
      { $push: { order_data: { order_date, items: order_data } } }
    );

    res.status(200).json({ success: true, message: "Order added to existing user." });

  } catch (error) {
    console.error("Order creation error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.post('/myorderData', async (req, res) => {
  try {
        const userEmail = req.body.email;
    const myData = await Order.findOne({ email: req.body.email });

    if (!myData) {
      return res.status(404).json({ success: false, message: "No orders found" });
    }

    res.status(200).json({
      orderData: {
        order_data: myData.order_data
      }
    });
  } catch (error) {
    console.error("Server error in /myorderData:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
