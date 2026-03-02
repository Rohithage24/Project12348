import React from 'react';
import Lottie from 'lottie-react';
import contactAnimation from '../assets/contact.json';

const Contact = () => {
  return (
    <div className="contact-wrapper">
      {/* Hero Section */}
      <section className="contact-hero">
        <h1 className="contact-hero-title">Let's <span className="highlight">Connect</span></h1>
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
          <div className="form-glass-layer">
            <h2 className="contact-form-title">Send a Message</h2>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="input-container">
                <input type="text" placeholder="Your Name" className="contact-input" required />
              </div>
              <div className="input-container">
                <input type="email" placeholder="Your Email" className="contact-input" required />
              </div>
              <div className="input-container">
                <textarea rows="4" placeholder="Your Message" className="contact-textarea" required></textarea>
              </div>
              <button type="submit" className="contact-button">
                Send Message 🚀
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;