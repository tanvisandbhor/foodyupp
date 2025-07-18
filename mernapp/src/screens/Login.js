// import React, { useState } from 'react'
// import {Link ,useNavigate} from "react-router-dom"




// export default function Login() {

// const [credentials, setcredentials] = useState({email:"", password:""})


// let navigate = useNavigate()
//   const handleSubmit = async(e)=>{
//     e.preventDefault();
//     const response = await fetch("http://localhost:5000/api/loginuser",{
//      method:'POST',
//       headers:{
//             "Content-Type":'application/json'

//     },
//     body:JSON.stringify({email:credentials.email, password:credentials.password})
   
//   });
//   const json = await response.json()
//   console.log(json);

//   if(!json.success){
//     alert("Enter valid credentials")
//   }

//   if(json.success){
//     localStorage.setItem("authToken",json.authToken)
//     console.log(localStorage.getItem("authToken"))
//    navigate("/");
//   }

// }
//   const onChange=(e)=>{
//     setcredentials({...credentials,[e.target.name]:e.target.value})  

//   }   
   

//   return (
//     <>

      
//      <div className='container'> 
     
   
    
//       <form onSubmit={handleSubmit}>
        
//   <div className="mb-3">
//     <label for="exampleInputEmail" className="form-label">Email address</label>
//     <input type="email" className="form-control" id='exampleInputEmail' name='email'value={credentials.email} onChange={onChange} aria-describedby='emailHelp'/>
//     <div id='emailHelp' className='form-text'> we'll never share your email with anyone else.</div>
//   </div>

//   <div className="mb-3">
//     <label for="exampleInputPassword1" className="form-label">Password</label>
//     <input type="password" className="form-control"  name="password" id="exampleInputPassword1" value={credentials.password} onChange={onChange}/>
//   </div>

  
  
//   <button type="submit" className="btn btn-success">Login</button>
//   <Link to="/Signup" className ='m-3'>Dont have a account?</Link>
  
// </form>
// </div> 
//   </>
//   )
// }
  













import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/loginuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid credentials");
    } else {
      localStorage.setItem("authToken", json.authToken);
      navigate("/");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="container"
      style={{
        maxWidth: "400px",
        marginTop: "60px",
        padding: "30px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        borderRadius: "12px",
        backgroundColor: "#f8f9fa",
      }}
    >
      <h2 className="mb-4 text-center" style={{ color: "#2f855a" }}>
        Login to Your Account
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail"
            name="email"
            value={credentials.email}
            onChange={onChange}
            aria-describedby="emailHelp"
            required
            placeholder="Enter your email"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={credentials.password}
            onChange={onChange}
            required
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="btn btn-success w-100"
          style={{ fontWeight: "600" }}
        >
          Login
        </button>
      </form>

      <p className="mt-3 text-center">
        Don't have an account?{" "}
        <Link to="/signup" className="m-3">
          Sign up here
        </Link>
      </p>
    </div>
  );
}
