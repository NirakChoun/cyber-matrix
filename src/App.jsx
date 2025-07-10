import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import PhishingSimulation from './pages/PhishingSimulation'
import SQLInjectionSimulation from './pages/SQLInjectionSimulation'
import DoSSimulation from './pages/DoSSimulation'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/phishing" element={<PhishingSimulation />} />
            <Route path="/sql-injection" element={<SQLInjectionSimulation />} />
            <Route path="/dos" element={<DoSSimulation />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
