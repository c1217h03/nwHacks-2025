import React from "react"
// import LoginPage from '. /LoginPage'
import { Link } from 'react-router-dom'

export default function LandingPage() {
    return (
        <div class="landing-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>Welcome to Our App!</h1>
                <h4>Let's build a stronger community with all generations</h4>
                <div>
                    <Link to="/login">
                        <button style={{ margin: '10px', padding: '10px 20px' }}>Log In</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
