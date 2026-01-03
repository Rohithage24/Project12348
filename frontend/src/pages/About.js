import React from 'react';
import Lottie from 'lottie-react';
import aboutAnimation from '../animations/about.json';

const About = () => {
  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <div style={styles.heroSection}>
        <div style={styles.textContent}>
          <h1 style={styles.heading}>About Interview Prep</h1>
          <p style={styles.subtext}>
            Empowering developers to master technical interviews with confidence.
          </p>
        </div>
        <div style={styles.animationBox}>
          <Lottie animationData={aboutAnimation} loop />
        </div>
      </div>

      {/* Feature Cards */}
      <div style={styles.cardSection}>
        <h2 style={styles.sectionTitle}>Why Choose Us?</h2>
        <div style={styles.cardContainer}>
          {features.map((feature, idx) => (
            <div key={idx} style={styles.card}>
              <div style={styles.cardIcon}>{feature.icon}</div>
              <h3 style={styles.cardTitle}>{feature.title}</h3>
              <p style={styles.cardText}>{feature.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline / Journey */}
      <div style={styles.timelineSection}>
        <h2 style={styles.sectionTitle}>Your Learning Journey</h2>
        <div style={styles.timeline}>
          {journey.map((step, idx) => (
            <div key={idx} style={styles.timelineItem}>
              <div style={styles.timelineCircle}>{idx + 1}</div>
              <div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call-to-Action */}
      <div style={styles.ctaSection}>
        <h2 style={styles.ctaHeading}>Ready to Start?</h2>
        <p style={styles.ctaText}>Join us today and prepare to ace your interviews like a pro.</p>
        <button style={styles.ctaButton}>Get Started</button>
      </div>
    </div>
  );
};

// Features for cards
const features = [
  {
    icon: '💡',
    title: 'Interactive Practice',
    text: 'Hands-on problems and challenges to sharpen your skills.',
  },
  {
    icon: '📊',
    title: 'Progress Tracking',
    text: 'Monitor your growth and stay motivated throughout your journey.',
  },
  {
    icon: '🤝',
    title: 'Peer Collaboration',
    text: 'Learn, share, and grow with fellow learners and mentors.',
  },
];

// Timeline steps
const journey = [
  { title: 'Start with Basics', desc: 'Begin with core coding and logic-building exercises.' },
  { title: 'Daily Challenges', desc: 'Improve steadily with curated daily problems.' },
  { title: 'Mock Interviews', desc: 'Simulate real interviews and get feedback.' },
  { title: 'Get Hired', desc: 'Be confident and prepared for your big opportunity!' },
];

const styles = {
  page: {
    padding: '40px 20px',
    fontFamily: 'Segoe UI, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
    color: '#2c3e50',
  },
  heroSection: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '40px',
    marginBottom: '60px',
  },
  textContent: {
    flex: 1,
    minWidth: '300px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '36px',
    marginBottom: '10px',
    color: '#1e3d58',
  },
  subtext: {
    fontSize: '18px',
    color: '#555',
  },
  animationBox: {
    flex: 1,
    maxWidth: '400px',
    minWidth: '280px',
  },
  cardSection: {
    marginBottom: '60px',
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: '28px',
    marginBottom: '20px',
    color: '#1e3d58',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '30px',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '16px',
    width: '280px',
    textAlign: 'center',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
  },
  cardIcon: {
    fontSize: '40px',
    marginBottom: '12px',
  },
  cardTitle: {
    fontSize: '20px',
    marginBottom: '10px',
    color: '#34495e',
  },
  cardText: {
    fontSize: '16px',
    color: '#555',
  },
  timelineSection: {
    marginBottom: '60px',
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
    maxWidth: '700px',
    margin: '0 auto',
  },
  timelineItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    backgroundColor: '#ecf0f1',
    padding: '16px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
  },
  timelineCircle: {
    backgroundColor: '#1abc9c',
    color: '#fff',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    textAlign: 'center',
    lineHeight: '40px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  ctaSection: {
    textAlign: 'center',
    backgroundColor: '#1e3d58',
    color: '#fff',
    padding: '50px 20px',
    borderRadius: '20px',
  },
  ctaHeading: {
    fontSize: '28px',
    marginBottom: '10px',
  },
  ctaText: {
    fontSize: '18px',
    marginBottom: '20px',
  },
  ctaButton: {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#00b894',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
};

export default About;
