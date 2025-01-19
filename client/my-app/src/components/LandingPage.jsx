import React from "react"

export default function LandingPage() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>Welcome to Our App!</h1>
                <h4>Let's build a stronger community with all generations</h4>
                <div>
                    <button style={{ margin: '10px', padding: '10px 20px' }}>Sign Up</button>
                    <button style={{ margin: '10px', padding: '10px 20px' }}>Log In</button>
                </div>
            </div>
        </div>
    )
}
