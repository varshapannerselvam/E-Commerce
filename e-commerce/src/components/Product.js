import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import { AiTwotoneHeart } from "react-icons/ai";

const ProductCard = ({ product, updateWishlist  }) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  /* Check if the product is already in the wishlist */
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setLiked(wishlist.some((item) => item.id === product.id))
  }, [product.id]);


  const handleWishlist = (e) => {
    e.stopPropagation();
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (liked) {
      /* Remove from wishlist */
      const updatedWishlist = wishlist.filter((item) => item.id !== product.id)
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))
      if(updateWishlist){
        updateWishlist()
      }
    } else {
      /* Add to wishlist */
      wishlist.push(product)
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }

    setLiked(!liked);
  };


  return (
    <div className="product-card" onClick={() => navigate(`/product/${product.id}`, { state: product })}>
      <div className="wishlist-icon" onClick={handleWishlist}>
        {liked ? <FcLike /> : <AiTwotoneHeart />}
      </div>

      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description.slice(0, 50)}...</p>
      <h3 className="price">${product.price}</h3>

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
    </div>
  );
};

export default ProductCard;
