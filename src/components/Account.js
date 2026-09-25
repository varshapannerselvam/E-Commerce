import React from "react";
import { useNavigate } from "react-router-dom";
import "./Store.css";

const Account = () => {
  // Hook for navigation
  const navigate = useNavigate(); 

  const handleLogout = () => {
    navigate("/edit"); 
  };

  return (
    <div className="Create">
      <div className="Create-content">
        <h2>Your Account Profile! 🎉</h2>
        <p><strong>Name :</strong> "Varsha" </p>
        <p><strong>Email :</strong> "p.varsha@gmail.com" </p>
        <p><strong>Phone :</strong> "9043106886"</p>
        <p><strong>Address :</strong> "1/210 vellalar street, Pattukkottai, Thanjavur"</p>
        <button 
          style={{ margin: 20, width: 100 }} 
          type="submit" 
          className="account-button"
          onClick={handleLogout} 
        >
          LogOut
        </button>
      </div>
    </div>
  );
};

export default Account;
