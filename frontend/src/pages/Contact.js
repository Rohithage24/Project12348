// src/pages/Contact.js
import React from 'react';
import Lottie from 'lottie-react';
import contactAnimation from '../assets/contact.json';

const Contact = () => {
  return (
    <div className="contact-wrapper">
      {/* Hero Section */}
      <section className="contact-hero">
        <h1 className="contact-hero-title">Let's Connect</h1>
        <p className="contact-hero-subtitle">
          We’d love to hear from you. Whether you have a question or just want to say hi — we’re here for it.
        </p>
      </section>

      {/* Main Contact Section */}
      <div className="contact-main">
        {/* Lottie Animation */}
        <div className="contact-animation-box">
          <Lottie animationData={contactAnimation} loop={true} className="contact-lottie" />
        </div>

        {/* Contact Form */}
        <div className="contact-form-box">
          <h2 className="contact-form-title">Send a Message</h2>
          <form className="contact-form">
            <input type="text" placeholder="Your Name" className="contact-input" />
            <input type="email" placeholder="Your Email" className="contact-input" />
            <textarea rows="4" placeholder="Your Message" className="contact-textarea"></textarea>
            <button type="submit" className="contact-button">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
