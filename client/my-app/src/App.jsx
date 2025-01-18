import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

function LandingPage() {
  return (

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome to Our App!</h1>
        <h4>Let's build a stronger community with all generations</h4>
        <div>
          <button style={{ margin: '10px', padding: '10px 20px' }}>Sign Up</button>
          <Link to="/login">
            <button style={{ margin: '10px', padding: '10px 20px' }}>Log In</button>
          </Link>
        </div>
      </div>
    </div>

  )
}

export default App
