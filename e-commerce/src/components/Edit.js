import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  const [account, setAccount] = useState({ name: "", email: "", password: "" });
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate(); 

  const handleLogout = () => {
    navigate("/account"); 
  };
  const handleChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (account.name && account.email && account.password) {
      setShowPopup(true); 
    }
  };


  return (
    <div className="account-container">
      <h1 className="account-title">Create Account</h1>
      <form className="account-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={account.name}
          onChange={handleChange}
          className="account-input"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={account.email}
          onChange={handleChange}
          className="account-input"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={account.password}
          onChange={handleChange}
          className="account-input"
          required
        />
        <button type="submit" className="account-button">Submit</button>
      </form>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Account Created Successfully! 🎉</h2>
            <p><strong>Name:</strong> {account.name}</p>
            <p><strong>Email:</strong> {account.email}</p>
            <button className="close-button" onClick={handleLogout}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Edit;
