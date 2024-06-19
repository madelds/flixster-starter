import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2>About Us</h2>
          <p>Discover and enjoy personalized movie recommendations with Flixster.</p>
        </div>
        <div className="footer-section">
          <h2>Contact Us</h2>
          <p>Email: <a href="mailto:flixster@flixster.com">flixster@flixster.com</a></p>
          <p>Phone: <a href="tel:+1234567890">(123) 456-7890</a></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
