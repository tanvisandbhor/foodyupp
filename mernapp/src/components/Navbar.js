import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cart from '../screens/Cart';
import Modal from '../Modal';
import { useCart } from './ContextReducer';
import Badge from 'react-bootstrap/Badge';
 

const Navbar = () => {
let data = useCart();

  const [CartView, setCartView] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic" to="/">FoodYup</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link className="nav-link active fs-5 text-white" aria-current="page" to="/">Home</Link>
            </li>
            {
              (localStorage.getItem("authToken")) ? 
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/myorder">My Orders</Link>
                </li> 
              : ""
            }
          </ul>

          {
            (!localStorage.getItem("authToken")) ? 
              <div className='d-flex'>
                <Link className="btn bg-white text-success mx-1 m-2" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1 m-2" to="/Signup">Signup</Link>
              </div>
            :
              <div>
                <div className="btn bg-white text-success mx-1 m-2" onClick={() => { setCartView(true) }}>
                  My Cart
                  <Badge pill bg="danger ms-2"> {data.length} </Badge>
                </div>

                {CartView ? <Modal onClose={() => setCartView(false)}> <Cart /></Modal> : null}

                <div className="btn bg-white text-danger mx-1 m-2" onClick={handleLogout}>
                  LogOut
                </div>
              </div>
          }
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
