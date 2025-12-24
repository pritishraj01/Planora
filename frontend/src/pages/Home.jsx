import axios from 'axios'
import React, { useContext, useState, useEffect } from 'react'
import { dataContext } from '../UserContext'
import { useNavigate } from 'react-router-dom'

function Home() {
  let { backendUrl, setUserData, userData } = useContext(dataContext)
  let [title, setTitle] = useState(null)
  let [works, setWorks] = useState([])
  let navigate = useNavigate()

  let handleLogout = async () => {
    try {
      await axios.get(`${backendUrl}/api/logout`, { withCredentials: true })
      setUserData(null)
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  let createWorkspace = async () => {
    try {
      await axios.post(`${backendUrl}/api/createworkspace`, { title }, { withCredentials: true })
      await getWorkspace()
      setTitle("")
    } catch (error) {
      console.log(error)
    }
  }

  let getWorkspace = async () => {
    try {
      let result = await axios.get(`${backendUrl}/api/getworkspace`, { withCredentials: true })
      setWorks(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  let deleteWorkSpace = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/deleteWorkspace/${id}`, { withCredentials: true })
      await getWorkspace()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (userData) getWorkspace()
  }, [userData])

  return (
    <div style={pageStyle}>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        style={logoutBtn}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.06)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >
        Logout
      </button>

      {/* HEADER */}
      <h1 style={titleStyle}>Your Spaces</h1>
      <p style={subtitleStyle}>Plan first. Focus later.</p>

      {/* CREATE */}
      <div style={createPanel}>
        <input
          type="text"
          placeholder="Create a workspace"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
          onFocus={e => e.currentTarget.style.boxShadow = "0 0 0 4px rgba(251,146,60,0.35)"}
          onBlur={e => e.currentTarget.style.boxShadow = "none"}
        />
        <button
          onClick={createWorkspace}
          style={createBtn}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
        >
          Create
        </button>
      </div>

      {/* EMPTY */}
      {works.length === 0 && (
        <div style={emptyState}>
          <h3>No workspaces yet 🌱</h3>
          <p>This is your planning area</p>
        </div>
      )}

      {/* GRID */}
      <div style={grid}>
        {works.map(item => (
          <div
            key={item._id}
            style={card}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-8px)"
              e.currentTarget.style.boxShadow = "0 18px 36px rgba(0,0,0,0.18)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 12px 26px rgba(0,0,0,0.14)"
            }}
          >
            <h3
              style={cardTitle}
              onClick={() => navigate(`/workspace/${item._id}`)}
            >
              {item.title}
            </h3>

            <div style={cardActions}>
              <button
                style={openBtn}
                onClick={() => navigate(`/workspace/${item._id}`)}
              >
                Open →
              </button>
              <button
                style={deleteBtn}
                onClick={() => deleteWorkSpace(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

/* 🎨 WARM PEACH THEME (HOME ONLY) */

const pageStyle = {
  width: "100vw",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #fff1e6, #fde2cf, #fcd5ce)",
  padding: "28px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative"
}

const logoutBtn = {
  position: "absolute",
  top: "16px",
  right: "16px",
  padding: "10px 18px",
  borderRadius: "20px",
  border: "none",
  background: "#fb923c",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
  transition: "all 0.25s ease"
}

const titleStyle = {
  fontSize: "34px",
  fontWeight: 800,
  marginTop: "42px",
  color: "#7c2d12"
}

const subtitleStyle = {
  marginBottom: "22px",
  color: "#9a3412"
}

const createPanel = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
  justifyContent: "center",
  marginBottom: "30px",
  padding: "16px",
  borderRadius: "24px",
  background: "linear-gradient(135deg, #ffedd5, #fed7aa)",
  boxShadow: "0 14px 32px rgba(0,0,0,0.12)"
}

const inputStyle = {
  padding: "12px 16px",
  borderRadius: "16px",
  border: "2px solid #fdba74",
  outline: "none",
  background: "#fff7ed",
  color: "#7c2d12",
  minWidth: "240px",
  fontSize: "14px"
}

const createBtn = {
  padding: "12px 22px",
  borderRadius: "16px",
  border: "none",
  background: "#fb923c",
  fontWeight: 700,
  cursor: "pointer",
  color: "#fff",
  transition: "all 0.25s ease"
}

const emptyState = {
  textAlign: "center",
  color: "#9a3412",
  marginBottom: "24px"
}

const grid = {
  width: "100%",
  maxWidth: "900px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "26px",
  marginTop: "20px"
}

const card = {
  background: "linear-gradient(135deg, #fff7ed, #ffedd5)",
  borderRadius: "26px",
  padding: "22px",
  boxShadow: "0 12px 26px rgba(0,0,0,0.14)",
  transition: "all 0.3s ease"
}

const cardTitle = {
  fontSize: "18px",
  fontWeight: 700,
  marginBottom: "16px",
  cursor: "pointer",
  color: "#7c2d12"
}

const cardActions = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
}

const openBtn = {
  background: "#fed7aa",
  border: "none",
  borderRadius: "14px",
  padding: "8px 14px",
  fontWeight: 600,
  cursor: "pointer",
  color: "#7c2d12"
}

const deleteBtn = {
  background: "#fecaca",
  border: "none",
  borderRadius: "14px",
  padding: "8px 14px",
  fontWeight: 600,
  cursor: "pointer",
  color: "#7f1d1d"
}

export default Home
