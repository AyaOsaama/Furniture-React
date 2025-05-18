import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion"; 
import SignIn from "./components/SignUp/signIn";
import SignUp from "./components/SignUp/signUp";
import ForTest from "./components/forTest";
import { AuthProvider, useAuth } from "./contextAuth/AuthContext";
import ForgetPass from "./components/SignUp/forgetPass";
import NotFound from "./components/NotFound/notFound";

function AnimatedRoutes() {
  const location = useLocation();
  const { user } = useAuth(); 

  return (
    <AnimatePresence mode="wait">
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
      </Routes>
    </AnimatePresence>
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
