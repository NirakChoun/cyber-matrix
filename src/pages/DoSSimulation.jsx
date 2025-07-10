import React, { useState, useEffect, useMemo } from 'react'
import { Zap, Play, Pause, RotateCcw, TrendingUp, Server, AlertTriangle, Shield } from 'lucide-react'
import './DoSSimulation.css'

const DoSSimulation = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [attackType, setAttackType] = useState('volumetric')
  const [serverHealth, setServerHealth] = useState(100)
  const [requestCount, setRequestCount] = useState(0)
  const [responseTime, setResponseTime] = useState(50)
  const [attackLog, setAttackLog] = useState([])
  const [mitigationEnabled, setMitigationEnabled] = useState(false)

  const attackTypes = useMemo(() => ({
    volumetric: {
      name: 'Volumetric Attack',
      description: 'Overwhelms the target with high-volume traffic',
      icon: TrendingUp,
      intensity: 10,
      examples: ['UDP Flood', 'ICMP Flood', 'DNS Amplification']
    },
    protocol: {
      name: 'Protocol Attack',
      description: 'Exploits weaknesses in network protocols',
      icon: Server,
      intensity: 15,
      examples: ['SYN Flood', 'Ping of Death', 'Smurf Attack']
    },
    application: {
      name: 'Application Layer Attack',
      description: 'Targets specific application vulnerabilities',
      icon: Zap,
      intensity: 8,
      examples: ['HTTP Flood', 'Slowloris', 'SSL Exhaustion']
    }
  }), [])

  const mitigationStrategies = [
    {
      name: 'Rate Limiting',
      description: 'Limit the number of requests per user/IP',
      effectiveness: 70
    },
    {
      name: 'DDoS Protection Service',
      description: 'Cloud-based traffic filtering and scrubbing',
      effectiveness: 90
    },
    {
      name: 'Load Balancing',
      description: 'Distribute traffic across multiple servers',
      effectiveness: 60
    },
    {
      name: 'Firewall Rules',
      description: 'Block traffic from suspicious sources',
      effectiveness: 50
    }
  ]

  useEffect(() => {
    let interval
    if (isRunning) {
      interval = setInterval(() => {
        const currentAttack = attackTypes[attackType]
        const baseIntensity = mitigationEnabled ? currentAttack.intensity * 0.3 : currentAttack.intensity
        
        // Update metrics
        setRequestCount(prev => prev + Math.floor(Math.random() * baseIntensity * 100) + baseIntensity * 50)
        
        if (!mitigationEnabled) {
          setServerHealth(prev => Math.max(0, prev - baseIntensity * 2))
          setResponseTime(prev => Math.min(5000, prev + baseIntensity * 10))
        } else {
          setServerHealth(prev => Math.min(100, prev + 2))
          setResponseTime(prev => Math.max(50, prev - 5))
        }
        
        // Add log entry
        setAttackLog(prev => {
          const newEntry = {
            timestamp: new Date().toLocaleTimeString(),
            message: mitigationEnabled 
              ? `Mitigation active: ${currentAttack.name} partially blocked`
              : `${currentAttack.name} in progress - Server health declining`,
            type: mitigationEnabled ? 'mitigation' : 'attack'
          }
          return [newEntry, ...prev.slice(0, 9)] // Keep last 10 entries
        })
      }, 1000)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, attackType, mitigationEnabled, attackTypes])

  const startAttack = () => {
    setIsRunning(true)
    setAttackLog(prev => [{
      timestamp: new Date().toLocaleTimeString(),
      message: `Starting ${attackTypes[attackType].name}...`,
      type: 'start'
    }, ...prev])
  }

  const stopAttack = () => {
    setIsRunning(false)
    setAttackLog(prev => [{
      timestamp: new Date().toLocaleTimeString(),
      message: 'Attack stopped',
      type: 'stop'
    }, ...prev])
  }

  const resetSimulation = () => {
    setIsRunning(false)
    setServerHealth(100)
    setRequestCount(0)
    setResponseTime(50)
    setAttackLog([])
    setMitigationEnabled(false)
  }

  const getHealthColor = () => {
    if (serverHealth > 70) return 'var(--success-color)'
    if (serverHealth > 30) return 'var(--warning-color)'
    return 'var(--danger-color)'
  }

  const getHealthStatus = () => {
    if (serverHealth > 70) return 'Healthy'
    if (serverHealth > 30) return 'Degraded'
    if (serverHealth > 0) return 'Critical'
    return 'Offline'
  }

  return (
    <div className="dos-simulation">
      <div className="simulation-header">
        <Zap size={48} className="simulation-icon" />
        <div className="header-content">
          <h1>DoS Attack Simulation</h1>
          <p>Learn about Denial of Service attacks and defense strategies</p>
        </div>
      </div>

      <div className="warning-banner">
        <AlertTriangle size={20} />
        <span>Educational Simulation - All traffic is simulated and contained</span>
      </div>

      <div className="simulation-content">
        {/* Attack Configuration */}
        <div className="attack-config">
          <h2>Attack Configuration</h2>
          <div className="config-grid">
            <div className="attack-type-selector">
              <h3>Select Attack Type:</h3>
              <div className="attack-types">
                {Object.entries(attackTypes).map(([key, attack]) => (
                  <div 
                    key={key}
                    className={`attack-card ${attackType === key ? 'selected' : ''}`}
                    onClick={() => !isRunning && setAttackType(key)}
                  >
                    <attack.icon size={32} />
                    <h4>{attack.name}</h4>
                    <p>{attack.description}</p>
                    <div className="examples">
                      <strong>Examples:</strong>
                      <ul>
                        {attack.examples.map((example, index) => (
                          <li key={index}>{example}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mitigation-toggle">
              <h3>Defense Systems:</h3>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={mitigationEnabled}
                  onChange={(e) => setMitigationEnabled(e.target.checked)}
                />
                <span className="slider"></span>
                <span className="toggle-label">
                  {mitigationEnabled ? 'Mitigation Enabled' : 'No Protection'}
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Server Metrics Dashboard */}
        <div className="metrics-dashboard">
          <h2>Server Health Dashboard</h2>
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-header">
                <Server size={24} />
                <span>Server Health</span>
              </div>
              <div className="metric-value" style={{ color: getHealthColor() }}>
                {serverHealth}%
              </div>
              <div className="metric-status" style={{ color: getHealthColor() }}>
                {getHealthStatus()}
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: `${serverHealth}%`,
                    backgroundColor: getHealthColor()
                  }}
                ></div>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <TrendingUp size={24} />
                <span>Total Requests</span>
              </div>
              <div className="metric-value">
                {requestCount.toLocaleString()}
              </div>
              <div className="metric-status">
                {isRunning ? 'Incoming Traffic' : 'Idle'}
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <Zap size={24} />
                <span>Response Time</span>
              </div>
              <div className="metric-value">
                {responseTime}ms
              </div>
              <div className="metric-status">
                {responseTime > 1000 ? 'Slow' : responseTime > 200 ? 'Normal' : 'Fast'}
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="control-panel">
          <h2>Simulation Controls</h2>
          <div className="controls">
            {!isRunning ? (
              <button className="control-btn start-btn" onClick={startAttack}>
                <Play size={20} />
                Start Attack
              </button>
            ) : (
              <button className="control-btn stop-btn" onClick={stopAttack}>
                <Pause size={20} />
                Stop Attack
              </button>
            )}
            
            <button className="control-btn reset-btn" onClick={resetSimulation}>
              <RotateCcw size={20} />
              Reset
            </button>
          </div>
        </div>

        {/* Attack Log */}
        <div className="attack-log">
          <h2>Attack Log</h2>
          <div className="log-container">
            {attackLog.length === 0 ? (
              <div className="log-empty">No activity yet. Start an attack to see logs.</div>
            ) : (
              attackLog.map((entry, index) => (
                <div key={index} className={`log-entry ${entry.type}`}>
                  <span className="log-timestamp">{entry.timestamp}</span>
                  <span className="log-message">{entry.message}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Mitigation Strategies */}
        <div className="mitigation-strategies">
          <h2>🛡️ DoS Mitigation Strategies</h2>
          <div className="strategies-grid">
            {mitigationStrategies.map((strategy, index) => (
              <div key={index} className="strategy-card">
                <h3>{strategy.name}</h3>
                <p>{strategy.description}</p>
                <div className="effectiveness">
                  <span>Effectiveness:</span>
                  <div className="effectiveness-bar">
                    <div 
                      className="effectiveness-fill"
                      style={{ width: `${strategy.effectiveness}%` }}
                    ></div>
                  </div>
                  <span>{strategy.effectiveness}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Best Practices */}
        <div className="best-practices">
          <h2>💡 DoS Protection Best Practices</h2>
          <div className="practices-grid">
            <div className="practice-card">
              <Shield className="practice-icon" />
              <h3>Network Monitoring</h3>
              <p>Implement real-time monitoring to detect unusual traffic patterns early.</p>
            </div>
            <div className="practice-card">
              <Server className="practice-icon" />
              <h3>Redundancy</h3>
              <p>Use multiple servers and data centers to distribute load and prevent single points of failure.</p>
            </div>
            <div className="practice-card">
              <TrendingUp className="practice-icon" />
              <h3>Scalability</h3>
              <p>Design systems that can automatically scale to handle traffic spikes.</p>
            </div>
            <div className="practice-card">
              <Zap className="practice-icon" />
              <h3>Incident Response</h3>
              <p>Have a clear incident response plan for DoS attacks, including communication protocols.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoSSimulation
