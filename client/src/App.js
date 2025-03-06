import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Featured from "./components/Featured";
import "./css/styles.scss";

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/shop" element={<h2>Shop Page</h2>} />
          <Route path="/cart" element={<h2>Cart Page</h2>} />
        </Routes>
        <Featured />
        <Footer />
      </Router>
    );
  }
}

export default App;


