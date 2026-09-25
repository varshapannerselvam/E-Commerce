import React, { useState, useEffect } from "react";
import Product from "./Product";
import { FcLike } from "react-icons/fc";

const WishList = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
    console.log(storedWishlist)
  }, []);

  /* Function to update wishlist when an item is removed/added*/
  const updateWishlist = () => {
    const updatedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(updatedWishlist);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="home-container">

      <h2 style={{margin:20}}>My Wishlist <FcLike /></h2>
      <div className="product-grid">
        {wishlist.length > 0 ? (
          wishlist.map(
            (product) =>
                <Product
                  key={product.id}
                  product={product}
                  updateWishlist={updateWishlist} 
                />
          )
        ) : (
          <p>No items in your wishlist.</p>
        )}

      </div>
    </div>
  );
};

export default WishList;
