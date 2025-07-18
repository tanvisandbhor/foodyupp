import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
  console.log("🛠 MyOrder component mounted");

  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    const userEmail = localStorage.getItem('userEmail');

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/myorderData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: userEmail })
      });

      const data = await response.json();
      // Defensive check to ensure orderData exists
      if (data && data.orderData && data.orderData.order_data) {
        setOrderData(data.orderData.order_data);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />

      <div className='container'>
        <div className='row'>
          {orderData.length !== 0
            ? orderData.slice(0).reverse().map((order, index) => (
                <div key={index} className='w-100'>
                  <div className='m-auto mt-5 fs-3'>
                    <hr />
                    Order Date: {order.order_date}
                    <hr />
                  </div>
                  <div className='row'>
                    {order.items.map((item, idx) => (
                      <div key={idx} className='col-12 col-md-6 col-lg-3'>
                        <div
                          className='card mt-3'
                          style={{ width: '16rem', maxHeight: '360px' }}
                        >
                          <img
                            src={item.img}
                            className='card-img-top'
                            alt={item.name}
                            style={{ height: '120px', objectFit: 'fill' }}
                          />
                          <div className='card-body'>
                            <h5 className='card-title'>{item.name}</h5>
                            <div className='container w-100 p-0'>
                              <span className='m-1'>{item.qty}</span>
                              <span className='m-1'>{item.size}</span>
                              <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                ₹{item.price}/-
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            : <div className="text-center fs-3 mt-5">No Orders Found</div>}
        </div>
      </div>

      <Footer />
    </div>
  );
}




