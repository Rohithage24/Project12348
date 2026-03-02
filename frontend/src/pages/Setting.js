import React, { useState } from 'react';
import { useAuth } from "../context/AuthProvider";
import Lottie from "lottie-react";
import SettingsAnimation from "../animations/profile.json"; // Reusing or use a gear animation

const Settings = () => {
  const [auth, setAuth] = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="dashboard-container settings-page">
      <div className="settings-layout">
        
        {/* SIDE NAV */}
        <aside className="settings-sidebar">
          <div className="settings-intro">
            <div className="settings-icon">
               <Lottie animationData={SettingsAnimation} loop={true} style={{width: 80}} />
            </div>
            <h3>Account Control</h3>
          </div>
          <nav className="settings-nav">
            <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>User Profile</button>
            {/* <button className={activeTab === 'ai' ? 'active' : ''} onClick={() => setActiveTab('ai')}>AI Preferences</button> */}
            <button className={activeTab === 'security' ? 'active' : ''} onClick={() => setActiveTab('security')}>Security</button>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="settings-content">
          {activeTab === 'profile' && (
            <div className="settings-section animate-fade">
              <h2>Profile Information</h2>
              <div className="input-group">
                <label>Full Name</label>
                <input type="text" defaultValue={auth?.user?.Name} placeholder="Your Name" />
              </div>
              <div className="input-group">
                <label>Email Address</label>
                <input type="email" defaultValue={auth?.user?.gmail} />
              </div>
              <div className="input-group">
                <label>Mobile Number</label>
                <input type="text" defaultValue={auth?.user?.mobile} />
              </div>
              <button className="cta-btn save-btn">Update Profile</button>
            </div>
          )}

          {/* {activeTab === 'ai' && (
            <div className="settings-section animate-fade">
              <h2>AI Personalization</h2>
              <p style={{color: 'var(--text-dim)'}}>Adjust how the AI interacts with your learning path.</p>
              <div className="toggle-item">
                <div>
                  <h4>Proactive Hints</h4>
                  <p>AI will suggest hints before you ask.</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="toggle-item">
                <div>
                  <h4>Difficulty Scaling</h4>
                  <p>Auto-adjust test difficulty based on performance.</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
            </div>
          )} */}

          {activeTab === 'security' && (
            <div className="settings-section animate-fade">
              <h2>Security</h2>
              <div className="input-group">
                <label>Current Password</label>
                <input type="password" placeholder="••••••••" />
              </div>
              <div className="input-group">
                <label>New Password</label>
                <input type="password" placeholder="Min 8 characters" />
              </div>
              <button className="cta-btn" style={{background: 'var(--accent-purple)'}}>Change Password</button>
              
              <div className="danger-zone">
                <h4>Danger Zone</h4>
                <p>Once you delete your account, there is no going back.</p>
                <button className="btn-delete">Delete Account</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Settings;