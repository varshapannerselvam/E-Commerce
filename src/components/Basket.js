import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Basket = () => {
  const [basket, setBasket] = useState([]);
  const navigate = useNavigate();

  /* Load basket from localStorage on mount */
  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem("cart")) || [];
    setBasket(storedBasket);
  }, []);

  /* Function to remove product from basket */
  const removeFromBasket = (id) => {
    const updatedBasket = basket.filter((item) => item.id !== id);
    setBasket(updatedBasket);
    localStorage.setItem("cart", JSON.stringify(updatedBasket));
  };

  /* Calculate total price */
  const getTotalPrice = () => {
    return basket.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  /* Navigate to Payment Page with selected product */
  const BuyFromBasket = (item) => {
    localStorage.setItem("selectedProduct", JSON.stringify(item));
    navigate("/payment");
  };

  return (
    <div className="basket-container">
      <h2>🛒 Your Basket</h2>
      {basket.length === 0 ? (
        <p className="empty-basket">Your basket is empty.</p>
      ) : (
        <div>
          {basket.map((item) => (
            <div key={item.id} className="basket-item">
              <img src={item.thumbnail} alt={item.title} className="basket-img" />
              <div>
                <p>{item.title} - ₹{item.price} x {item.quantity}</p>
              </div>
              <button className="buy-btn" onClick={() => BuyFromBasket(item)}>Buy</button>
              <button className="remove-btn" onClick={() => removeFromBasket(item.id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ₹{getTotalPrice()}</h3>
        </div>
      )}
    </div>
  );
};

export default Basket;
