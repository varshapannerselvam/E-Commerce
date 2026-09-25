import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!formData.name) newErrors.name = "Name is required!";
    if (!formData.email) newErrors.email = "Email is required!";
    else if (!regex.test(formData.email)) newErrors.email = "Invalid email format!";
    
    if (!formData.password) newErrors.password = "Password is required!";
    if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = "Passwords do not match!";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      let users = JSON.parse(localStorage.getItem("users")) || []; 
      
      /* Check if email already exists*/
      if (users.some(user => user.email === formData.email)) {
        alert("Email already registered! Please Sign In.");
        return;
      }

      users.push({ name: formData.name, email: formData.email, password: formData.password });
      localStorage.setItem("users", JSON.stringify(users)); 

      alert("Signup Successful!");
      navigate("/signin");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="heading">Sign Up</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        {errors.name && <p className="error">{errors.name}</p>}

        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        {errors.email && <p className="error">{errors.email}</p>}

        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        {errors.password && <p className="error">{errors.password}</p>}

        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a href="/signin">Sign In</a></p>
    </div>
  );
};

export default SignUp;
