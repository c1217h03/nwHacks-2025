import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import './App.css'
import LandingPage from './components/LandingPage'
import LoginPage from './components/LoginPage'
import KidsList from './components/KidsList'
import PostingPage from './components/PostingPage'
import ProfilePage from './components/ProfilePage'
import ChatWindow from './components/ChatWindow'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<PostingPage />} />
        <Route path="/kids" element={<KidsList />} />
        <Route path="/userprofile" element={<ProfilePage />} />
        {/* <Route path="/chatwindow" element={<ChatWindow />} /> */}
      </Routes>
    </Router>
  );
}

export default App;