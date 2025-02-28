import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const location = useLocation();
  const product = location.state;
  const navigate = useNavigate();

  if (!product) {
    return <h2>Product not found!</h2>;
  }

  /* Function to add product to cart */
  const addToCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = storedCart.find((item) => item.id === product.id);

    let updatedCart;
    if (existingItem) {
      updatedCart = storedCart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...storedCart, { ...product, quantity: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Added to Cart!");
  };

  return (
    <div className="product-details">
      <button onClick={() => navigate(-1)}>← Back</button>

      <img src={product.thumbnail} alt={product.title} />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <h3>Price: ₹{product.price}</h3>

      {/* Rating Stars */}
      <div className="star-rating">
        {[...Array(5)].map((_, i) => {
          const starValue = i + 1;
          return (
            <span
              key={i}
              className={
                product.rating >= starValue
                  ? "star full"
                  : product.rating >= starValue - 0.5
                  ? "star half"
                  : "star empty"
              }
            >
              ★
            </span>
          );
        })}
      </div>

      {/* Add to Cart Button */}
      <button className="add-to-cart-btn" onClick={addToCart}>
        🛒 Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;
