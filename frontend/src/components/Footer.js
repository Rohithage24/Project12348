// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className='footer-higth' style={footerStyle}>
      <div style={waveDivider}></div>

      <div style={footerContainer}>
        {/* Branding */}
        <div style={section}>
          <h2 style={logoStyle}>MockPrep 🚀</h2>
          <p style={textStyle}>
            Ace your interviews with confidence! Curated questions, clean UI, and real preparation.
          </p>
        </div>

        {/* Quick Links */}
        <div style={section}>
          <h3 style={headingStyle}>Quick Links</h3>
          <ul style={linkListStyle}>
            <li><Link to="/" style={linkStyle}>Home</Link></li>
            <li><Link to="/about" style={linkStyle}>About</Link></li>
            <li><Link to="/contact" style={linkStyle}>Contact</Link></li>
          </ul>
        </div>

        {/* Connect */}
        <div style={section}>
          <h3 style={headingStyle}>Connect</h3>
          <div style={iconContainer}>
            <a href="https://github.com" target="_blank" rel="noreferrer" style={iconStyle}><FaGithub size={24} /></a>
            <a href="https://www.linkedin.com/in/charwak-bhonde-41a436259" target="_blank" rel="noreferrer" style={iconStyle}><FaLinkedin size={24} /></a>
            <a href="mailto:charwakbhonde123@gmail.com" style={iconStyle}><FaEnvelope size={24} /></a>
          </div>
        </div>

        {/* Developers */}
        <div style={section}>
          <h3 style={headingStyle}>Developers</h3>
          <p style={textStyle}>
            Aniruddha Saraf<br />
            Rohit Hage<br />
            Vedant Khairkar<br />
            Shatayu Balapure<br />
            Charwak Bhonde
          </p>
        </div>
      </div>

      {/* Back to top */}
      <div style={topBtnContainer}>
        <button onClick={scrollToTop} style={topBtn}>
          <FaArrowUp /> Top
        </button>
      </div>

      {/* Bottom line */}
      <div style={bottomLine}>
        <p>© {new Date().getFullYear()} MockPrep. Crafted with ❤️ by our dev team.</p>
      </div>
    </footer>
  );
};

// ===== Styles =====
const footerStyle = {
  background: 'linear-gradient(to right, #1e3c72, #2a5298)',
  color: '#f5f5f5',
  paddingTop: '40px',
  fontFamily: 'Arial, sans-serif',
};

const waveDivider = {
  height: '30px',
  background: 'url("https://www.svgbackgrounds.com/wp-content/uploads/2021/05/wave-9.svg") repeat-x',
  backgroundSize: 'cover',
  marginTop: '-30px',
};

const footerContainer = {
  display: 'flex',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  padding: '0 20px 40px',
};

const section = {
  flex: '1 1 250px',
  margin: '20px',
};

const logoStyle = {
  fontSize: '1.8rem',
  fontWeight: 'bold',
  marginBottom: '10px',
  color: '#ffffff',
};

const textStyle = {
  fontSize: '0.95rem',
  lineHeight: '1.6',
};

const headingStyle = {
  fontSize: '1.2rem',
  marginBottom: '12px',
  borderBottom: '2px solid #fff',
  display: 'inline-block',
  paddingBottom: '4px',
};

const linkListStyle = {
  listStyle: 'none',
  padding: 0,
};

const linkStyle = {
  color: '#f5f5f5',
  textDecoration: 'none',
  marginBottom: '8px',
  display: 'block',
  transition: 'color 0.3s ease',
};

const iconContainer = {
  display: 'flex',
  gap: '16px',
  marginTop: '10px',
};

const iconStyle = {
  color: '#f5f5f5',
  transition: 'transform 0.3s, color 0.3s',
};

const topBtnContainer = {
  textAlign: 'center',
  marginTop: '-100px', // pulls button upward
  position: 'relative',
  zIndex: 1,
};


const topBtn = {
  background: '#f39c12',
  color: '#fff',
  border: 'none',
  padding: '10px 18px',
  borderRadius: '25px',
    justifyContent : 'center',
  cursor: 'pointer',
  fontSize: '0.9rem',
  transition: 'background 0.3s ease',
};

const bottomLine = {
  textAlign: 'center',
  padding: '15px 0',
  backgroundColor: '#112d4e',
  fontSize: '0.85rem',
};

export default Footer;
