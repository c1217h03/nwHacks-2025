import React from "react"
// import LoginPage from '. /LoginPage'
import { Link } from 'react-router-dom'

export default function LandingPage() {
    return (
        <div class="landing-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
            <div style={{ textAlign: 'center' }}>
                {/* <h1>Play Link!</h1> */}
                <img src="../../public/name.png"></img>
                <h4 className="subtitle">Let's build a stronger community with all generations</h4>
                <div>
                    <Link to="/login">
                        <button className="login-button2" style={{ margin: '10px', padding: '10px 20px', borderRadius: '10px', backgroundColor: "#845656", color: "white" }}>Log In</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
