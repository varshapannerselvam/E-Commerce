import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/NavBar";
import Store from "./components/Store";
import Account from "./components/Account";
import Wishlist from "./components/WishList";
import Basket from "./components/Basket";
import Edit from "./components/Edit";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Payment from "./components/Payment";
import ProductDetail from "./components/ProductDetail"; 

const App = () => {
  // State for authentication and search
  const [searchText, setSearchText] = useState(""); 
  const [isSignedIn, setSignedIn] = useState(() => {
    return localStorage.getItem("isSignedIn") === "true";
  });

  useEffect(() => {
    localStorage.setItem("isSignedIn", isSignedIn);
  }, [isSignedIn]);

  return (
    <BrowserRouter>
      {!isSignedIn ? (
        <Routes>
          <Route path="/signin" element={<SignIn setSignIn={setSignedIn} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/signin" />} /> 
        </Routes>
      ) : (
        <>
          <Navbar setSearchText={setSearchText} />
          <Routes>
            <Route path="/" element={<Store searchText={searchText} />} />  
            <Route path="/account" element={<Account />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Basket />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="/logout" element={<SignOut setSignIn={setSignedIn} />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/product/:id" element={<ProductDetail />} /> 
            <Route path="*" element={<Navigate to="/" />} /> 
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
};

// Logout Component
const SignOut = ({ setSignIn }) => {
  setTimeout(() => {
    setSignIn(false);
  }, 500);
  return <h2 className="message">Logging out...</h2>;
};

export default App;
