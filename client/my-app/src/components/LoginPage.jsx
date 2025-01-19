import React from "react"

export default function LoginPage() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>Login</h1>
                <div class = "login_form">
                    <label for="first">Email:</label>
                    <input type="text" id="first" name="first" 
                        placeholder="Enter your email" required/>

                    <label for="password">Community Code:</label>
                    <input type="password" id="password" name="password" 
                        placeholder="Enter your community code" required/>
                    <button type="submit"> Submit </button>
                </div>
            </div>
        </div>
    )
}
