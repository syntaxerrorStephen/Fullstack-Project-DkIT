import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Featured from "./components/Featured";
import Products from "./components/Products";
import Cart from "./components/Cart";
import ProductPage from "./components/ProductPage"; 
import "./css/styles.scss";

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<><Header /><Featured /></>}/>
          <Route path="/shop" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/:id" element={<ProductPage />} />
        </Routes>
        <Footer />
      </Router>
    );
  }
}

export default App;


