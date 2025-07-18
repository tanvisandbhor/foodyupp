const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  order_data: [
    {
      order_date: { type: String, required: true },
      items: [
        {
          id: String,
          name: String,
          qty: Number,
          size: String,
          price: Number,
          img: String
        }
      ]
    }
  ]
});

module.exports = mongoose.model('orders', OrderSchema);
