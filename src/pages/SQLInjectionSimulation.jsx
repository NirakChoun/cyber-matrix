import React, { useState } from 'react'
import { Database, Play, AlertTriangle, Shield, Code, CheckCircle, X } from 'lucide-react'
import './SQLInjectionSimulation.css'

const SQLInjectionSimulation = () => {
  const [userInput, setUserInput] = useState('')
  const [queryResult, setQueryResult] = useState(null)
  const [isVulnerable, setIsVulnerable] = useState(true)

  // Mock database
  const mockDatabase = [
    { id: 1, username: 'admin', password: 'admin123', email: 'admin@company.com', role: 'administrator' },
    { id: 2, username: 'john_doe', password: 'password456', email: 'john@company.com', role: 'user' },
    { id: 3, username: 'jane_smith', password: 'secret789', email: 'jane@company.com', role: 'user' },
    { id: 4, username: 'guest', password: 'guest', email: 'guest@company.com', role: 'guest' }
  ]

  const vulnerableQueries = [
    {
      name: "Basic Login Bypass",
      input: "admin' OR '1'='1",
      description: "This classic injection bypasses authentication by making the WHERE condition always true",
      explanation: "The injection turns the query into: SELECT * FROM users WHERE username = 'admin' OR '1'='1' AND password = '...' which will return all users because '1'='1' is always true."
    },
    {
      name: "Union-based Injection",
      input: "' UNION SELECT id, username, password, email, role FROM users --",
      description: "Uses UNION to combine results from another table query",
      explanation: "This attack appends additional SELECT statements to retrieve data from other parts of the database."
    },
    {
      name: "Comment-based Bypass",
      input: "admin'--",
      description: "Uses SQL comments to ignore the password check",
      explanation: "The -- comment syntax causes everything after it to be ignored, effectively removing the password requirement."
    }
  ]

  const securityMeasures = [
    {
      title: "Parameterized Queries",
      description: "Use prepared statements that separate SQL code from data",
      example: "SELECT * FROM users WHERE username = ? AND password = ?"
    },
    {
      title: "Input Validation",
      description: "Validate and sanitize all user inputs before processing",
      example: "Remove or escape special characters like quotes and semicolons"
    },
    {
      title: "Principle of Least Privilege",
      description: "Limit database user permissions to only what's necessary",
      example: "Don't use admin accounts for application database connections"
    },
    {
      title: "Error Handling",
      description: "Don't expose database errors to users",
      example: "Show generic error messages instead of SQL error details"
    }
  ]

  const executeQuery = () => {
    let result = { success: false, data: [], query: '', explanation: '' }
    
    if (isVulnerable) {
      // Simulate vulnerable query execution
      const baseQuery = `SELECT * FROM users WHERE username = '${userInput}' AND password = '[PASSWORD]'`
      result.query = baseQuery

      // Check for common SQL injection patterns
      if (userInput.includes("' OR '1'='1") || userInput.includes("' or '1'='1")) {
        result.success = true
        result.data = mockDatabase
        result.explanation = "🚨 SQL Injection Successful! The condition '1'='1' is always true, bypassing authentication."
      } else if (userInput.includes('UNION')) {
        result.success = true
        result.data = mockDatabase
        result.explanation = "🚨 UNION injection successful! Additional data has been extracted from the database."
      } else if (userInput.includes('--')) {
        result.success = true
        result.data = mockDatabase.filter(user => user.username === userInput.replace('\'--', ''))
        result.explanation = "🚨 Comment injection successful! Password check was bypassed using SQL comments."
      } else {
        // Normal query
        const user = mockDatabase.find(u => u.username === userInput)
        if (user) {
          result.success = true
          result.data = [user]
          result.explanation = "✅ Valid user found. Please enter password to complete login."
        } else {
          result.success = false
          result.explanation = "❌ User not found."
        }
      }
    } else {
      // Simulate secure query execution
      result.query = "SELECT * FROM users WHERE username = ? AND password = ?"
      const user = mockDatabase.find(u => u.username === userInput)
      if (user && !userInput.includes("'") && !userInput.includes(';')) {
        result.success = true
        result.data = [{ username: user.username, email: user.email, role: user.role }]
        result.explanation = "✅ Secure query executed. Parameterized query prevented injection."
      } else {
        result.success = false
        result.explanation = "❌ Invalid input detected or user not found. Input sanitized."
      }
    }

    setQueryResult(result)
  }

  const resetSimulation = () => {
    setUserInput('')
    setQueryResult(null)
  }

  return (
    <div className="sql-injection-simulation">
      <div className="simulation-header">
        <Database size={48} className="simulation-icon" />
        <div className="header-content">
          <h1>SQL Injection Simulation</h1>
          <p>Learn about SQL injection vulnerabilities and how to prevent them</p>
        </div>
      </div>

      <div className="warning-banner">
        <AlertTriangle size={20} />
        <span>Educational Simulation - All data is fake and contained within this simulation</span>
      </div>

      <div className="simulation-content">
        {/* Mode Toggle */}
        <div className="mode-toggle">
          <h3>Database Security Mode:</h3>
          <div className="toggle-buttons">
            <button 
              className={`toggle-btn ${isVulnerable ? 'active vulnerable' : ''}`}
              onClick={() => setIsVulnerable(true)}
            >
              <X size={16} />
              Vulnerable
            </button>
            <button 
              className={`toggle-btn ${!isVulnerable ? 'active secure' : ''}`}
              onClick={() => setIsVulnerable(false)}
            >
              <Shield size={16} />
              Secure
            </button>
          </div>
        </div>

        {/* Login Form Simulation */}
        <div className="login-simulation">
          <h2>Mock Login Form</h2>
          <div className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter username (try: admin)"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                placeholder="[This field is simulated]"
                disabled
                className="form-input disabled"
              />
            </div>
            <button 
              className="execute-btn"
              onClick={executeQuery}
              disabled={!userInput.trim()}
            >
              <Play size={16} />
              Execute Query
            </button>
          </div>
        </div>

        {/* SQL Query Display */}
        {queryResult && (
          <div className="query-display">
            <h3><Code size={20} /> Generated SQL Query:</h3>
            <div className="query-box">
              <code>{queryResult.query}</code>
            </div>
            
            <div className={`result-section ${queryResult.success ? 'success' : 'error'}`}>
              <h4>Query Result:</h4>
              <p className="explanation">{queryResult.explanation}</p>
              
              {queryResult.data.length > 0 && (
                <div className="data-table">
                  <table>
                    <thead>
                      <tr>
                        {Object.keys(queryResult.data[0]).map(key => (
                          <th key={key}>{key}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {queryResult.data.map((row, index) => (
                        <tr key={index}>
                          {Object.values(row).map((value, i) => (
                            <td key={i}>{value}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Attack Examples */}
        <div className="attack-examples">
          <h2>Common SQL Injection Attacks</h2>
          <p className="section-description">
            Try these examples in the username field above (with vulnerable mode enabled):
          </p>
          
          <div className="examples-grid">
            {vulnerableQueries.map((example, index) => (
              <div key={index} className="example-card">
                <h3>{example.name}</h3>
                <div className="example-input">
                  <code>{example.input}</code>
                  <button 
                    className="try-btn"
                    onClick={() => setUserInput(example.input)}
                  >
                    Try This
                  </button>
                </div>
                <p className="example-description">{example.description}</p>
                <div className="example-explanation">
                  <strong>How it works:</strong> {example.explanation}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Measures */}
        <div className="security-measures">
          <h2>🛡️ How to Prevent SQL Injection</h2>
          <div className="measures-grid">
            {securityMeasures.map((measure, index) => (
              <div key={index} className="measure-card">
                <h3>{measure.title}</h3>
                <p>{measure.description}</p>
                <div className="measure-example">
                  <strong>Example:</strong>
                  <code>{measure.example}</code>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="btn btn-secondary" onClick={resetSimulation}>
            Reset Simulation
          </button>
        </div>
      </div>
    </div>
  )
}

export default SQLInjectionSimulation
