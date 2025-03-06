import React, { Component } from "react";
import "../css/styles.scss";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h2>TEMPO 🎸</h2>
            </div>
            <div className="footer-links">
              <ul>
                <li><a href="#">Back To Top</a></li>
                <li><a href="#">Shop</a></li>
                <li><a href="#">Cart</a></li>
              </ul>
            </div>
            <div className="social-icons">
              <a href="#"><img src="/assets/facebook.png" alt="Facebook" /></a>
              <a href="#"><img src="/assets/twitter.png" alt="X" /></a>
              <a href="#"><img src="/assets/instagram.png" alt="Instagram" /></a>
            </div>
          </div>
          <div className="footer-info">
            <p>&copy; Tempo Music LTD | Groovy Man</p>
            <p>12 Piano St, Co Dublin</p>
            <p>Built by Brandyvie & Stephen 🤘</p>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
