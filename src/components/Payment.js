import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { FcOk } from "react-icons/fc";
import { MdOutlineCreditScore } from "react-icons/md";
import { FcApproval } from "react-icons/fc";

const Payment = () => {
  const navigate = useNavigate();


  const [userDetails, setUserDetails] = useState(() => {
    return JSON.parse(localStorage.getItem("userDetails")) || {
      name: "",
      email: "",
      password: "",
      address: "",
      pincode: "",
      city: "",
      state: "",
    };
  });

  // Order summary
  const [basket, setBasket] = useState([]);
  const GST_PERCENTAGE = 0.18;
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem("cart")) || [];
    setBasket(storedBasket);
  }, []);

  useEffect(() => {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
  }, [userDetails]);

  // Handling input changes
  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  // Form validation
  const validateForm = () => {
    let errors = {};
    if (!userDetails.name.trim()) errors.name = "Name is required!";
    if (!userDetails.email.includes("@")) errors.email = " Enter a valid email!";
    if (userDetails.password.length < 6) errors.password = " Password must be at least 6 characters!";
    if (!userDetails.address.trim()) errors.address = " Address is required!";
    if (!/^\d{6}$/.test(userDetails.pincode)) errors.pincode = " Enter a valid 6-digit pincode!";
    if (!userDetails.city.trim()) errors.city = "City is required!";
    if (!userDetails.state.trim()) errors.state = "State is required!";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  // Total price calculation
  const getTotalPrice = () => basket.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  const gstAmount = getTotalPrice() * GST_PERCENTAGE;
  const finalTotal = getTotalPrice() + gstAmount;

  // Handle Cash on Delivery
  const handleCOD = () => {
    const errors = validateForm();
    if (errors) {
      alert(Object.values(errors).join("\n"));
      return;
    }

    alert(" Your order has been placed successfully!");
    localStorage.removeItem("cart");
    localStorage.removeItem("userDetails");
    navigate("/cart");
  };

  // Handle Online Payment
  const handleOnlinePayment = () => {
    const errors = validateForm();
    if (errors) {
      alert(Object.values(errors).join("\n"));
      return;
    }

    // Show QR code popup
    document.getElementById("qr-popup").style.display = "block";

    setTimeout(() => {
      setPaymentSuccess(true);
      alert(<FcOk />,"Payment Successful! Your order has been placed.");
      localStorage.removeItem("cart");
      localStorage.removeItem("userDetails");
      document.getElementById("qr-popup").style.display = "none";
      navigate("/cart");
    }, 15000);
  };

  return (
    <div className="payment-container">
      <h2> <MdOutlineCreditScore /> Payment Details</h2>

      {/* User Details Form */}
      <form className="payment-form">
        <input type="text" name="name" placeholder="Full Name" value={userDetails.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={userDetails.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={userDetails.password} onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" value={userDetails.address} onChange={handleChange} />
        <input type="text" name="pincode" placeholder="Pincode" value={userDetails.pincode} onChange={handleChange} />
        <input type="text" name="city" placeholder="City" value={userDetails.city} onChange={handleChange} />
        <input type="text" name="state" placeholder="State" value={userDetails.state} onChange={handleChange} />
      </form>

      {/* Order Summary */}
      <div className="order-summary">
        <h3> Order Summary</h3>
        {basket.length === 0 ? (
          <p className="empty-cart">🛒 Your cart is empty.</p>
        ) : (
          basket.map((item) => (
            <p key={item.id}>
              {item.title} - ₹{item.price.toFixed(2)} x {item.quantity || 1}
            </p>
          ))
        )}
        <p>GST (18%): ₹{gstAmount.toFixed(2)}</p>
        <h3> Total: ₹{finalTotal.toFixed(2)}</h3>
      </div>

      {/* Payment Options */}
      <div className="payment-options">
        <button className="cod-btn" onClick={handleCOD}> Cash on Delivery</button>
        <button className="online-btn" onClick={handleOnlinePayment}> Online Payment</button>
      </div>

      {/* QR Code Popup */}
      <div id="qr-popup" className="qr-popup" style={{ display: "none" }}>
        <h3> Scan to Pay</h3>
        <QRCodeCanvas
          value={`upi://pay?pa=p.varshavkm@oksbi&pn=YourName&mc=0000&tid=123456789&tr=987654321&tn=Order Payment&am=${finalTotal.toFixed(2)}&cu=INR`}
          size={200}
        />

        {paymentSuccess ? (
          <p style={{ color: "green", fontWeight: "bold" }}><FcApproval /> Payment Successful! Your order is confirmed.</p>
        ) : (
          <p style={{ color: "red", fontWeight: "bold" }}>⌛ Waiting for payment confirmation...</p>
        )}
      </div>
    </div>
  );
};

export default Payment;
