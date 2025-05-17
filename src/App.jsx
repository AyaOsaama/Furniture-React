// import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar.jsx";
import Home from "./pages/Home.jsx";

import About from "./pages/About";
import ContactUs from "./pages/ContactUs.jsx";
import Footer from "./components/footer/footer.jsx";
import Products from "./components/products/products.jsx";

import ProductDetails from "./components/products/ProductDetails/ProductDetails.jsx";

import Blog from "./components/blog/BlogPosts/Blog.jsx";
import PostDetails from "./components/blog/PostDetailsPage/PostDetails.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/shop" element={<Shop />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/products" element={<Products />} />
<Route path="/products/:id" element={<ProductDetails />} />
<Route path="/posts" element={<Blog />}/>
<Route path="/posts/:id" element={<PostDetails />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
