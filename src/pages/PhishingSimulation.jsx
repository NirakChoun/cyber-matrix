import React, { useState } from 'react'
import { Mail, AlertTriangle, CheckCircle, X, Eye, Shield } from 'lucide-react'
import './PhishingSimulation.css'

const PhishingSimulation = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedEmail, setSelectedEmail] = useState(null)
  const [userAnswers, setUserAnswers] = useState({})

  const phishingEmails = [
    {
      id: 1,
      subject: "URGENT: Your Account Will Be Suspended",
      sender: "security@bankofsafety.com",
      isPhishing: true,
      redFlags: [
        "Urgent language to create panic",
        "Sender domain looks legitimate but has subtle differences",
        "Generic greeting instead of personal name",
        "Threatens account suspension",
        "Suspicious link that doesn't match the claimed bank"
      ],
      content: `
        Dear Valued Customer,

        Your account has been flagged for suspicious activity. To prevent suspension, 
        please verify your identity immediately by clicking the link below:

        Verify Account: http://bank-of-safety-security.com/verify

        Failure to act within 24 hours will result in permanent account closure.

        Thank you,
        Bank Security Team
      `
    },
    {
      id: 2,
      subject: "Weekly Team Meeting Reminder",
      sender: "sarah.johnson@company.com",
      isPhishing: false,
      redFlags: [],
      content: `
        Hi Team,

        Just a reminder about our weekly team meeting tomorrow at 2 PM in Conference Room B.
        
        Agenda:
        - Project updates
        - Q4 planning
        - Budget review

        Let me know if you have any items to add to the agenda.

        Best regards,
        Sarah Johnson
        Project Manager
      `
    },
    {
      id: 3,
      subject: "You've Won $1,000,000!",
      sender: "lottery@winbigtoday.org",
      isPhishing: true,
      redFlags: [
        "Too good to be true offer",
        "Asks for personal information upfront",
        "Poor grammar and spelling",
        "Generic sender domain",
        "Creates false urgency"
      ],
      content: `
        CONGRATULATIONS!!!

        You have been selected as the winner of our international lottery!
        Prize amount: $1,000,000 USD

        To claim your prize, please send us:
        - Full name
        - Address  
        - Social Security Number
        - Bank account details

        This offer expires in 48 hours!

        Contact: claimyourprize@winbigtoday.org
      `
    }
  ]

  const analysisQuestions = [
    {
      id: 1,
      question: "What are the main red flags in this email?",
      type: "multiple",
      options: [
        "Urgent language",
        "Suspicious sender",
        "Generic greeting",
        "Threatens consequences",
        "Suspicious links"
      ]
    },
    {
      id: 2,
      question: "How would you verify if this email is legitimate?",
      type: "text"
    },
    {
      id: 3,
      question: "What should you do if you receive this email?",
      type: "single",
      options: [
        "Click the link to verify",
        "Reply with your information",
        "Report as phishing and delete",
        "Forward to colleagues"
      ],
      correct: 2
    }
  ]

  const handleEmailSelect = (email) => {
    setSelectedEmail(email)
    setUserAnswers({})
  }

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  return (
    <div className="phishing-simulation">
      <div className="simulation-header">
        <Mail size={48} className="simulation-icon" />
        <div className="header-content">
          <h1>Phishing Attack Simulation</h1>
          <p>Learn to identify and defend against phishing emails</p>
        </div>
      </div>

      <div className="warning-banner">
        <AlertTriangle size={20} />
        <span>Educational Simulation - All emails are fake and for learning purposes only</span>
      </div>

      <div className="simulation-content">
        {/* Step Navigation */}
        <div className="step-navigation">
          <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <span>Choose Email</span>
          </div>
          <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <span>Analyze Content</span>
          </div>
          <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <span>Learn & Defend</span>
          </div>
        </div>

        {/* Step 1: Email Selection */}
        {currentStep === 1 && (
          <div className="email-selection">
            <h2>Select an Email to Analyze</h2>
            <div className="email-list">
              {phishingEmails.map(email => (
                <div 
                  key={email.id} 
                  className={`email-preview ${selectedEmail?.id === email.id ? 'selected' : ''}`}
                  onClick={() => handleEmailSelect(email)}
                >
                  <div className="email-header">
                    <Mail size={20} />
                    <div className="email-meta">
                      <div className="email-subject">{email.subject}</div>
                      <div className="email-sender">From: {email.sender}</div>
                    </div>
                    {selectedEmail?.id === email.id && (
                      <CheckCircle className="selected-icon" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {selectedEmail && (
              <div className="email-content">
                <h3>Email Content:</h3>
                <div className="email-body">
                  <pre>{selectedEmail.content}</pre>
                </div>
                <button 
                  className="btn btn-primary"
                  onClick={() => setCurrentStep(2)}
                >
                  Analyze This Email
                  <Eye size={16} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Analysis */}
        {currentStep === 2 && selectedEmail && (
          <div className="email-analysis">
            <h2>Email Analysis</h2>
            
            <div className="analysis-questions">
              {analysisQuestions.map(question => (
                <div key={question.id} className="question-card">
                  <h3>{question.question}</h3>
                  
                  {question.type === 'multiple' && (
                    <div className="checkbox-group">
                      {question.options.map((option, index) => (
                        <label key={index} className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={userAnswers[question.id]?.includes(option) || false}
                            onChange={(e) => {
                              const current = userAnswers[question.id] || []
                              const newAnswers = e.target.checked 
                                ? [...current, option]
                                : current.filter(item => item !== option)
                              handleAnswerChange(question.id, newAnswers)
                            }}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  )}
                  
                  {question.type === 'single' && (
                    <div className="radio-group">
                      {question.options.map((option, index) => (
                        <label key={index} className="radio-label">
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={index}
                            checked={userAnswers[question.id] === index}
                            onChange={() => handleAnswerChange(question.id, index)}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  )}
                  
                  {question.type === 'text' && (
                    <textarea
                      className="text-input"
                      placeholder="Type your answer here..."
                      value={userAnswers[question.id] || ''}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      rows="4"
                    />
                  )}
                </div>
              ))}
            </div>
            
            <button 
              className="btn btn-primary"
              onClick={() => setCurrentStep(3)}
            >
              See Results
              <Shield size={16} />
            </button>
          </div>
        )}

        {/* Step 3: Results & Learning */}
        {currentStep === 3 && selectedEmail && (
          <div className="results-section">
            <h2>Analysis Results</h2>
            
            <div className="email-verdict">
              <div className={`verdict-card ${selectedEmail.isPhishing ? 'phishing' : 'safe'}`}>
                {selectedEmail.isPhishing ? (
                  <>
                    <X size={48} className="verdict-icon" />
                    <h3>This is a PHISHING EMAIL</h3>
                  </>
                ) : (
                  <>
                    <CheckCircle size={48} className="verdict-icon" />
                    <h3>This email appears LEGITIMATE</h3>
                  </>
                )}
              </div>
            </div>

            {selectedEmail.isPhishing && (
              <div className="red-flags-section">
                <h3>🚩 Red Flags Identified:</h3>
                <ul className="red-flags-list">
                  {selectedEmail.redFlags.map((flag, index) => (
                    <li key={index}>{flag}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="learning-section">
              <h3>🛡️ How to Protect Yourself:</h3>
              <div className="protection-tips">
                <div className="tip-card">
                  <h4>Verify the Sender</h4>
                  <p>Check the email address carefully. Phishers often use domains that look similar to legitimate ones.</p>
                </div>
                <div className="tip-card">
                  <h4>Look for Red Flags</h4>
                  <p>Urgent language, threats, grammar errors, and generic greetings are common signs of phishing.</p>
                </div>
                <div className="tip-card">
                  <h4>Don't Click Suspicious Links</h4>
                  <p>Hover over links to see the actual URL before clicking. When in doubt, navigate to the site directly.</p>
                </div>
                <div className="tip-card">
                  <h4>Use Two-Factor Authentication</h4>
                  <p>Enable 2FA on important accounts to add an extra layer of security.</p>
                </div>
              </div>
            </div>

            <div className="action-buttons">
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  setCurrentStep(1)
                  setSelectedEmail(null)
                  setUserAnswers({})
                }}
              >
                Try Another Email
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PhishingSimulation
