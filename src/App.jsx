// import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar.jsx";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs.jsx";
import Footer from "./components/footer/footer.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<ContactUs />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
