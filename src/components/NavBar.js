import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GrBasket } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setSearchText }) => {
  const navigate = useNavigate(); 
  const [wishlistCount, setWishlistCount] = useState(0);

  // Load wishlist count on mount
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistCount(storedWishlist.length);
  }, []);

  // Listen for localStorage changes (for real-time updates)
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlistCount(updatedWishlist.length);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    navigate("/SignIn"); 
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Logo</h1>
      </div>
      <input
        type="search"
        name="Query"
        placeholder="Search...."
        className="search-box"
        onChange={(e) => {
          setSearchText(e.target.value.toLowerCase());
        }}
      />
      <div className="nav-links">
        <Link to="/">Store</Link>
        <Link to="/account">Account</Link>
        <Link to="/wishlist" className="Wishlist-link">
          Wish List {wishlistCount > 0 && (
            <span className="wishlist-badge">{wishlistCount}</span>
          )}
        </Link>
        <Link to="/cart" className="Basket">
          Basket <GrBasket />
        </Link>
        <button>
          <Link to="/logout" className="logout" onClick={handleLogout}>
            LogOut
          </Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
