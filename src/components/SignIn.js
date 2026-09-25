import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = ({ setSignIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email) newErrors.email = "Email is required!";
    if (!formData.password) newErrors.password = "Password is required!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      let users = JSON.parse(localStorage.getItem("users")) || [];

      // Check if the email and password match any user
      const user = users.find(user => user.email === formData.email && user.password === formData.password);

      if (user) {
        alert(`Welcome, ${user.name}! Login Successful.`);
        setSignIn(true);
        navigate("/store"); 
      } else {
        alert("Incorrect email or password! Please try again.");
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="para">Email :</h2>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        {errors.email && <p className="error">{errors.email}</p>}

        <h2 className="para">Password :</h2>
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        {errors.password && <p className="error">{errors.password}</p>}

        <button type="submit">Sign In</button>
      </form>
      <p>Don't have an account? <a href="/signup">Sign Up</a></p>
    </div>
  );
};

export default SignIn;
