// src/pages/Contact.js

import React from 'react';
import Lottie from 'lottie-react';
import contactAnimation from '../assets/contact.json'; // Make sure this Lottie file exists

const Contact = () => {
  return (
    <div style={styles.wrapper}>
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <h1 style={styles.heroTitle}>Let's Connect</h1>
        <p style={styles.heroSubtitle}>We’d love to hear from you. Whether you have a question or just want to say hi — we’re here for it.</p>
      </section>

      {/* Main Contact Section */}
      <div style={styles.mainSection}>
        {/* Lottie Animation */}
        <div style={styles.animationBox}>
          <Lottie animationData={contactAnimation} loop={true} style={styles.lottie} />
        </div>

        {/* Contact Form */}
        <div style={styles.formBox}>
          <h2 style={styles.formTitle}>Send a Message</h2>
          <form style={styles.form}>
            <input type="text" placeholder="Your Name" style={styles.input} />
            <input type="email" placeholder="Your Email" style={styles.input} />
            <textarea rows="4" placeholder="Your Message" style={styles.textarea}></textarea>
            <button type="submit" style={styles.button}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    backgroundColor: '#ecf6fd',
    padding: '0',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  heroSection: {
    textAlign: 'center',
    padding: '60px 20px 30px',
    background: 'linear-gradient(to right, #3498db, #6dd5fa)',
    color: 'white',
  },
  heroTitle: {
    fontSize: '40px',
    margin: '0',
  },
  heroSubtitle: {
    fontSize: '18px',
    marginTop: '10px',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  mainSection: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '40px 20px',
    gap: '30px',
  },
  animationBox: {
    flex: '1 1 350px',
    maxWidth: '500px',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    padding: '20px',
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
  formBox: {
    flex: '1 1 350px',
    maxWidth: '500px',
    padding: '30px',
    backdropFilter: 'blur(8px)',
    background: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '20px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
  },
  formTitle: {
    fontSize: '28px',
    color: '#3498db',
    marginBottom: '20px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px 15px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '16px',
    transition: '0.3s ease',
    outline: 'none',
  },
  textarea: {
    padding: '12px 15px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '16px',
    resize: 'none',
    transition: '0.3s ease',
    outline: 'none',
  },
  button: {
    padding: '14px',
    fontSize: '16px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: '0.3s ease',
  },
};

export default Contact;
