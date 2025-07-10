import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Database, Zap, Shield, AlertTriangle, BookOpen } from 'lucide-react'
import './Home.css'

const Home = () => {
  const attackTypes = [
    {
      icon: Mail,
      title: 'Phishing Attacks',
      description: 'Learn how cybercriminals use deceptive emails and websites to steal personal information.',
      features: ['Email analysis', 'Fake website detection', 'Social engineering tactics'],
      path: '/phishing',
      difficulty: 'Beginner',
      color: 'warning'
    },
    {
      icon: Database,
      title: 'SQL Injection',
      description: 'Understand how attackers exploit database vulnerabilities to access sensitive data.',
      features: ['Input validation', 'Database security', 'Query manipulation'],
      path: '/sql-injection',
      difficulty: 'Intermediate',
      color: 'danger'
    },
    {
      icon: Zap,
      title: 'DoS Attacks',
      description: 'Explore how Denial of Service attacks overwhelm systems and networks.',
      features: ['Traffic flooding', 'Resource exhaustion', 'Mitigation strategies'],
      path: '/dos',
      difficulty: 'Advanced',
      color: 'success'
    }
  ]

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-icon">
            <Shield size={80} />
          </div>
          <h1 className="hero-title">Welcome to CyberMatrix</h1>
          <p className="hero-subtitle">
            Learn cybersecurity through interactive simulations and hands-on experience
          </p>
          <div className="hero-warning">
            <AlertTriangle size={20} />
            <span>Educational Use Only - Safe Learning Environment</span>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="features-overview">
        <h2 className="section-title">What You'll Learn</h2>
        <div className="features-grid">
          <div className="feature-card">
            <BookOpen className="feature-icon" />
            <h3>Interactive Learning</h3>
            <p>Hands-on simulations that let you experience attacks safely</p>
          </div>
          <div className="feature-card">
            <Shield className="feature-icon" />
            <h3>Defense Strategies</h3>
            <p>Learn how to protect against common cyber threats</p>
          </div>
          <div className="feature-card">
            <AlertTriangle className="feature-icon" />
            <h3>Risk Awareness</h3>
            <p>Understand the real-world impact of cybersecurity threats</p>
          </div>
        </div>
      </section>

      {/* Attack Simulations */}
      <section className="attack-simulations">
        <h2 className="section-title">Cybersecurity Simulations</h2>
        <div className="simulations-grid">
          {attackTypes.map((attack, index) => (
            <div key={index} className={`simulation-card ${attack.color}`}>
              <div className="simulation-header">
                <attack.icon size={40} className="simulation-icon" />
                <div className="simulation-meta">
                  <h3>{attack.title}</h3>
                  <span className={`difficulty ${attack.difficulty.toLowerCase()}`}>
                    {attack.difficulty}
                  </span>
                </div>
              </div>
              
              <p className="simulation-description">{attack.description}</p>
              
              <div className="simulation-features">
                <h4>What you'll learn:</h4>
                <ul>
                  {attack.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <Link to={attack.path} className="simulation-button">
                Start Simulation
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Safety Notice */}
      <section className="safety-notice">
        <div className="notice-content">
          <AlertTriangle size={48} className="notice-icon" />
          <div className="notice-text">
            <h3>Important Safety Notice</h3>
            <p>
              All simulations in this platform are designed for educational purposes only. 
              They run in a controlled, safe environment that cannot harm real systems. 
              The knowledge gained here should only be used for defensive cybersecurity purposes.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
