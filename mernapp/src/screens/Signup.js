


import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });

    const json = await response.json();
    console.log("Signup response:", json);

    if (json.success === true) {
      alert("✅ User created successfully! Please login.");
    } else {
      alert("❌ Please enter valid credentials.");
    }
  } catch (error) {
    console.error("Signup error:", error);
    alert("Something went wrong. Try again later.");
  }
};

  

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="container"
      style={{
        maxWidth: "450px",
        marginTop: "50px",
        padding: "30px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        borderRadius: "12px",
        backgroundColor: "#f8f9fa",
      }}
    >
      <h2 className="mb-4 text-center" style={{ color: "#2f855a" }}>
        Create an Account
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credentials.name}
            onChange={onChange}
            required
            placeholder="Your full name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            aria-describedby="emailHelp"
            required
            placeholder="example@mail.com"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            required
            placeholder="Choose a strong password"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="geolocation" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="geolocation"
            name="geolocation"
            value={credentials.geolocation}
            onChange={onChange}
            placeholder="Your location"
          />
        </div>

        <button
          type="submit"
          className="btn btn-success w-100"
          style={{ fontWeight: "600" }}
        >
          Submit
        </button>
      </form>

      <p className="mt-3 text-center">
        Already a user?{" "}
        <Link to="/login" className="btn btn-danger btn-sm px-3">
          Login
        </Link>
      </p>
    </div>
  );
}
