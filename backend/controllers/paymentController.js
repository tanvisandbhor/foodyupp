const razorpay = require('../utils/razorpay');

exports.createOrder = async (req, res) => {
    const { amount } = req.body;

    try {
        const options = {
            amount: amount * 100, // Razorpay expects amount in paise
            currency: "INR",
            receipt: "receipt_" + Date.now(),
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json({ success: true, order });
    } catch (err) {
        console.error("Razorpay Order Error:", err);
        res.status(500).json({ success: false, error: "Server Error" });
    }
};
