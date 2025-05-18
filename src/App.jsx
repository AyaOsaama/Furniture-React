import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion"; 
import SignIn from "./components/SignUp/signIn";
import SignUp from "./components/SignUp/signUp";
import ForTest from "./components/forTest";
import { AuthProvider, useAuth } from "./contextAuth/AuthContext";
import ForgetPass from "./components/SignUp/forgetPass";
import NotFound from "./components/NotFound/notFound";
import Product from "./components/products/products";
import WishlistPage from "./components/wishList/wishList";
import { Provider } from "react-redux";
import store from "./Store/store";

function AnimatedRoutes() {
  // const [isAuth,setAuth]= useState(localStorage.getItem('token'))
  const location = useLocation();
  const { user } = useAuth(); 

  return (
    // <AuthProvider value={{isAuth,setAuth}}>
    <AnimatePresence mode="wait">
      <Provider store={store}>
      <Routes location={location} key={location.pathname}>
        {user ? (
          <>
            <Route path="/test" element={<ForTest />} />
          </>
        ) : (
          <>
            <Route path="/" element={<SignIn />} />
          </>
        )}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgetPass" element={<ForgetPass />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/products" element={<Product/>}/>
        <Route path="/wishlist" element={<WishlistPage/>}/>
      </Routes>
      </Provider>
    </AnimatePresence>
    // </AuthProvider>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AnimatedRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
