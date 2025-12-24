import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { dataContext } from '../UserContext'
import axios from "axios"

function Login() {
  let { backendUrl, setUserData } = useContext(dataContext)
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [user, setUser] = useState("")
  let [loading, setLoading] = useState(false)
  let navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      let result = await axios.post(`${backendUrl}/api/login`, {
        email, password
      }, { withCredentials: true })
      setUser(result.data.message)
      setUserData(result.data)
      navigate("/")
    } catch (error) {
      setUser(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={pageStyle}>
      <form
        onSubmit={handleLogin}
        style={cardStyle}
        onMouseEnter={e => e.currentTarget.style.transform = "translateY(-6px)"}
        onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
      >

        <h1 style={titleStyle}>Welcome Back 👋</h1>
        <p style={subtitleStyle}>Login to continue your journey</p>

        {/* EMAIL */}
        <div style={fieldStyle}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* PASSWORD */}
        <div style={fieldStyle}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          style={{
            ...buttonStyle,
            opacity: loading ? 0.6 : 1
          }}
          onMouseEnter={e => !loading && (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          {loading ? "Logging in..." : "Login ✨"}
        </button>

        {/* SIGNUP */}
        <p style={linkStyle} onClick={() => navigate("/signup")}>
          Don’t have an account?
          <span style={{ color: "#ff6b6b", fontWeight: 600 }}> Signup</span>
        </p>

        {/* MESSAGE */}
        {user && (
          <p style={messageStyle}>{user}</p>
        )}

      </form>
    </div>
  )
}

/* 🌈 PLAYFUL, EYE-FRIENDLY STYLES */

const pageStyle = {
  width: "100vw",
  height: "100vh",
  background: "linear-gradient(135deg, #a1c4fd, #c2e9fb)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px"
}

const cardStyle = {
  width: "100%",
  maxWidth: "420px",
  background: "rgba(255,255,255,0.7)",
  borderRadius: "28px",
  padding: "36px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
  transition: "all 0.3s ease",
  color: "#333"
}

const titleStyle = {
  textAlign: "center",
  fontSize: "30px",
  fontWeight: 800,
  marginBottom: "6px",
  color: "#1e3a8a"
}

const subtitleStyle = {
  textAlign: "center",
  fontSize: "14px",
  marginBottom: "26px",
  color: "#555"
}

const fieldStyle = {
  marginBottom: "16px"
}

const inputStyle = {
  width: "100%",
  padding: "13px",
  borderRadius: "16px",
  border: "none",
  outline: "none",
  marginTop: "6px",
  background: "#f1f5f9",
  fontSize: "14px",
  transition: "all 0.2s ease"
}

const buttonStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "18px",
  border: "none",
  background: "linear-gradient(135deg, #84fab0, #8fd3f4)",
  fontWeight: 800,
  fontSize: "16px",
  color: "#000",
  marginTop: "10px",
  cursor: "pointer",
  transition: "all 0.25s ease"
}

const linkStyle = {
  textAlign: "center",
  marginTop: "18px",
  cursor: "pointer",
  color: "#444"
}

const messageStyle = {
  textAlign: "center",
  marginTop: "12px",
  color: "#16a34a",
  fontWeight: 600
}

export default Login
