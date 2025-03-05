import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/styles.scss";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
    };
  }

  toggleMenu = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  };

  render() {
    return (
      <nav className="sticky-nav">
        <div className="left">
          <Link to="/" className="logo">
            Tempo 🎸
          </Link>
        </div>
        <div className="right">
          <Link to="/shop">Shop</Link>
          <Link to="/cart" className="cart-icon">
            <i className="fas fa-shopping-cart"></i>
            <span className="cart-count">0</span>
          </Link>
        </div>

        {/* Hamburger Menu */}
        <div className="hamburger-menu">
          <div className="hamburger-icon" onClick={this.toggleMenu}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <div className={`dropdown-content ${this.state.isMenuOpen ? "show" : ""}`}>
            <Link to="/shop">Shop</Link>
            <Link to="/cart" className="cart-icon">
              <i className="fas fa-shopping-cart"></i>
              <span className="cart-count">0</span>
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
