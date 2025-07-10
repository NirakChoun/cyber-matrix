import React from 'react'
import { Shield, AlertTriangle, Book } from 'lucide-react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-brand">
            <Shield className="footer-logo" />
            <span>CyberMatrix</span>
          </div>
          <p className="footer-description">
            Educational cybersecurity platform for learning about threats in a safe environment.
          </p>
        </div>

        <div className="footer-section">
          <h3><Book size={18} /> Educational Resources</h3>
          <ul className="footer-links">
            <li>OWASP Security Guidelines</li>
            <li>NIST Cybersecurity Framework</li>
            <li>Security Best Practices</li>
            <li>Incident Response Guide</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3><AlertTriangle size={18} /> Important Notice</h3>
          <div className="disclaimer">
            <p>
              <strong>⚠️ EDUCATIONAL USE ONLY</strong>
            </p>
            <p>
              This platform is designed for educational purposes. 
              All simulations are contained and safe. Do not use these 
              techniques for malicious purposes.
            </p>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 CyberMatrix Educational Platform. Built for cybersecurity education.</p>
      </div>
    </footer>
  )
}

export default Footer
