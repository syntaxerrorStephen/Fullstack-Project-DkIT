import React, { Component } from "react";
import "../css/styles.scss";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h2>SPORT @ DKIT</h2>
            </div>
            <div className="footer-links">
              <ul>
                <li><a href="#">Back To Top</a></li>
                <li><a href="#">Demo</a></li>
                <li><a href="#">Demo</a></li>
                <li><a href="#">Demo</a></li>
              </ul>
            </div>
            <div className="social-icons">
              <a href="#"><img src="/assets/facebook.png" alt="Facebook" /></a>
              <a href="#"><img src="/assets/twitter.png" alt="Twitter" /></a>
              <a href="#"><img src="/assets/instagram.png" alt="Instagram" /></a>
            </div>
          </div>
          <div className="footer-info">
            <p>&copy; Sport @ DkIT | A Healthy Campus Initiative</p>
            <p>Dundalk, Co Louth</p>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
