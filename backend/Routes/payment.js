const express = require('express');
const router = express.Router();
const { createOrder } = require('../controllers/paymentController');

//  Add log inside actual route:
router.post('/create-order', (req, res, next) => {
  //  actually logs on request
  next();
}, createOrder);

module.exports = router;
