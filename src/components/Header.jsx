import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Shield, Home, Mail, Database, Zap, Menu, X } from 'lucide-react'
import './Header.css'

const Header = () => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/phishing', icon: Mail, label: 'Phishing' },
    { path: '/sql-injection', icon: Database, label: 'SQL Injection' },
    { path: '/dos', icon: Zap, label: 'DoS Attack' }
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <Shield className="logo-icon" />
          <h1 className="logo-text">CyberMatrix</h1>
          <span className="logo-subtitle">Educational Platform</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="navigation desktop-nav">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`nav-link ${location.pathname === path ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <div className="security-notice">
          <span className="security-badge">EDUCATIONAL USE ONLY</span>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-navigation">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`mobile-nav-link ${location.pathname === path ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
        <div className="mobile-security-notice">
          <span className="mobile-security-badge">EDUCATIONAL USE ONLY</span>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={closeMobileMenu}
        />
      )}
    </header>
  )
}

export default Header
