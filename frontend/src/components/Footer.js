// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="wave-divider"></div>

      <div className="footer-container">
        {/* Branding */}
        <div className="footer-section">
          <h2 className="footer-logo">MockPrep 🚀</h2>
          <p className="footer-text">
            Ace your interviews with confidence! Curated questions, clean UI, and real preparation.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Connect */}
        <div className="footer-section">
          <h3 className="footer-heading">Connect</h3>
          <div className="footer-icons">
            <a href="https://github.com" target="_blank" rel="noreferrer"><FaGithub size={24} /></a>
            <a href="https://www.linkedin.com/in/charwak-bhonde-41a436259" target="_blank" rel="noreferrer"><FaLinkedin size={24} /></a>
            <a href="mailto:charwakbhonde123@gmail.com"><FaEnvelope size={24} /></a>
          </div>
        </div>

        {/* Developers */}
        <div className="footer-section">
          <h3 className="footer-heading">Developers</h3>
          <p className="footer-text">
            Aniruddha Saraf<br />
            Rohit Hage<br />
            Vedant Khairkar<br />
            Shatayu Balapure<br />
            Charwak Bhonde
          </p>
        </div>
      </div>

      {/* Back to top */}
      <div className="top-btn-container">
        <button onClick={scrollToTop} className="top-btn">
          <FaArrowUp /> Top
        </button>
      </div>

      {/* Bottom line */}
      <div className="bottom-line">
        <p>© {new Date().getFullYear()} MockPrep. Crafted with ❤️ by our dev team.</p>
      </div>
    </footer>
  );
};

export default Footer;
