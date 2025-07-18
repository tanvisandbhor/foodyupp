import React from 'react'
import Delete from '@mui/icons-material/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div className="text-center mt-5 fs-3">
        🛒 Your cart is currently empty!
      </div>
    )
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail") || "guest@example.com";
    let response = await fetch(`${process.env.REACT_APP_BASE_URL}/orderData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    console.log("JSON RESPONSE:::::", response.status);
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);


  const handlePayNow = async () => {
  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/payment/create-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ amount: totalPrice })
  });

  const order = await response.json();

  if (!order.success) {
    alert("Failed to create order");
    return;
  }

 const razorpayKey = process.env.REACT_APP_RAZORPAY_KEY_ID;


  

  const options = {
    key: razorpayKey,
    amount: order.order.amount,
    currency: "INR",
    name: "Go Food",
    description: "Order Payment",
    order_id: order.order.id,
    handler: async function (response) {
      alert("✅ Payment successful!");
      await handleCheckOut(); // place order
    },
    prefill: {
      email: localStorage.getItem("userEmail") || "guest@example.com",
    },
    theme: {
      color: "#198754"
    }
  };

  const rzp1 = new window.Razorpay(options);
  rzp1.open();
};



  return (
    <div className="container mt-5">
      <h2 className="text-center text-success mb-4">🧾 Your Cart Summary</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered shadow">
          <thead className="bg-success text-white text-center fs-5">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Qty</th>
              <th>Size</th>
              <th>Amount</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody className="text-center align-middle">
            {data.map((food, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>₹{food.price}/-</td>
                <td>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => dispatch({ type: "REMOVE", index })}>
                    <Delete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <h4 className="text-success">Total: ₹{totalPrice}/-</h4>
        <div>
          <button className="btn btn-outline-primary me-3" onClick={handleCheckOut}>
            🧾 Check Out
          </button>
          <button className="btn btn-success "onClick={handlePayNow}>
            💳 Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}
