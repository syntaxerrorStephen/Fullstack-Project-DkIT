import React, { Component } from "react";
import "../css/styles.scss";

class Header extends Component {
  render() {
    return (
      <div className="index-header">
        <video autoPlay muted loop id="headerVideo">
          <source src="assets/video.mp4" type="video/mp4" />
        </video>
        <div className="index-overlay"></div>
        <div className="header-text">
          <h2>It's All About Tempo</h2>
          <h3>See It, Love It, Play It</h3>
          <p>
            Browse our impressive collection of instruments that are bound to turn you into a king.
          </p>
          <a href="/shop">Shop Now</a>
        </div>
      </div>
    );
  }
}

export default Header;
