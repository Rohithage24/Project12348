import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="main-footer">
      {/* Top Border Glow Line */}
      <div className="footer-glow-line"></div>

      <div className="footer-container">
        {/* Branding */}
        <div className="footer-section">
          <h2 className="footer-logo">MockPrep <span>🚀</span></h2>
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
            <a href="https://github.com" target="_blank" rel="noreferrer"><FaGithub size={20} /></a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin size={20} /></a>
            <a href="mailto:charwakbhonde123@gmail.com"><FaEnvelope size={20} /></a>
          </div>
        </div>

        {/* Developers */}
        <div className="footer-section">
          <h3 className="footer-heading">Developers</h3>
          <p className="dev-list">
            Aniruddha Saraf • Rohit Hage • Vedant Khairkar • Shatayu Balapure • Charwak Bhonde
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} MockPrep. Build yourself. Created by Panchtatva</p>
        <button onClick={scrollToTop} className="top-btn">
          <FaArrowUp /> <span>Top</span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;