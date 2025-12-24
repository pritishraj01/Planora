import React, { useContext, useState, useEffect } from 'react'
import { dataContext } from '../UserContext'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function Workspace() {
  let { backendUrl } = useContext(dataContext)
  let { workspaceId } = useParams()
  let [task, setTask] = useState(null)
  let [workspaceWork, setWorkspaceWork] = useState([])

  let createTask = async () => {
    try {
      await axios.post(
        `${backendUrl}/api/createtask`,
        { task, workspaceId },
        { withCredentials: true }
      )
      await getTask()
      setTask("")
    } catch (error) {
      console.log(error)
    }
  }

  let getTask = async () => {
    try {
      let result = await axios.get(
        `${backendUrl}/api/gettask/${workspaceId}`,
        { withCredentials: true }
      )
      setWorkspaceWork(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  let toggleTask = async (id) => {
    try {
      let result = await axios.put(
        `${backendUrl}/api/toogleTask/${id}`,
        {},
        { withCredentials: true }
      )
      const updatedWork = result.data
      setWorkspaceWork(arr =>
        arr.map(item => item._id === updatedWork._id ? updatedWork : item)
      )
    } catch (error) {
      console.log(error)
    }
  }

  let deleteTask = async (id) => {
    try {
      await axios.delete(
        `${backendUrl}/api/deleteTask/${id}`,
        { withCredentials: true }
      )
      await getTask()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTask()
  }, [])

  return (
    <div style={pageStyle}>
      <div style={container}>

        {/* HEADER */}
        <h1 style={title}>Focus Mode</h1>
        <p style={subtitle}>One task at a time</p>

        {/* ADD TASK */}
        <div style={addPanel}>
          <input
            type="text"
            placeholder="Add a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            style={input}
            onFocus={e => e.currentTarget.style.boxShadow = "0 0 0 4px rgba(251,146,60,0.35)"}
            onBlur={e => e.currentTarget.style.boxShadow = "none"}
          />
          <button
            style={addBtn}
            onClick={createTask}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-3px)"
              e.currentTarget.style.boxShadow = "0 10px 22px rgba(251,146,60,0.5)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "none"
            }}
          >
            Add
          </button>
        </div>

        {/* EMPTY */}
        {workspaceWork.length === 0 && (
          <div style={emptyState}>
            <h3>No tasks yet🦥</h3>
            <p>This is your execution zone</p>
          </div>
        )}

        {/* TASK LIST */}
        <div style={list}>
          {workspaceWork.map(item => (
            <div
              key={item._id}
              style={{
                ...taskCard,
                background: item.completed
                  ? "linear-gradient(135deg, #fde68a, #facc15)"
                  : "linear-gradient(135deg, #fff7ed, #ffedd5)"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-6px)"
                e.currentTarget.style.boxShadow = "0 16px 34px rgba(0,0,0,0.18)"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "0 12px 26px rgba(0,0,0,0.14)"
              }}
            >
              <p
                style={{
                  ...taskText,
                  textDecoration: item.completed ? "line-through" : "none",
                  opacity: item.completed ? 0.8 : 1
                }}
              >
                {item.task}
              </p>

              <div style={actions}>
                <button
                  style={{
                    ...completeBtn,
                    background: item.completed ? "#22c55e" : "#fb923c",
                    color: "#fff"
                  }}
                  onClick={() => toggleTask(item._id)}
                >
                  {item.completed ? "Done" : "Complete"}
                </button>

                <button
                  style={deleteBtn}
                  onClick={() => deleteTask(item._id)}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "#ef4444"
                    e.currentTarget.style.color = "#fff"
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "#fecaca"
                    e.currentTarget.style.color = "#7f1d1d"
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

/* 🎨 WARM PEACH – FOCUS VARIANT */

const pageStyle = {
  width: "100vw",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #fde2cf, #fcd5ce)",
  display: "flex",
  justifyContent: "center",
  padding: "28px"
}

const container = {
  width: "100%",
  maxWidth: "720px"
}

const title = {
  fontSize: "34px",
  fontWeight: 800,
  color: "#7c2d12",
  textAlign: "center"
}

const subtitle = {
  textAlign: "center",
  marginBottom: "22px",
  color: "#9a3412"
}

const addPanel = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
  background: "linear-gradient(135deg, #ffedd5, #fed7aa)",
  padding: "16px",
  borderRadius: "24px",
  marginBottom: "28px",
  boxShadow: "0 14px 32px rgba(0,0,0,0.12)"
}

const input = {
  flex: 1,
  padding: "14px 16px",
  borderRadius: "18px",
  border: "2px solid #fdba74",
  outline: "none",
  background: "#fff7ed",
  fontSize: "14px",
  color: "#7c2d12"
}

const addBtn = {
  padding: "14px 22px",
  borderRadius: "18px",
  border: "none",
  fontWeight: 700,
  cursor: "pointer",
  background: "#fb923c",
  color: "#fff",
  transition: "all 0.25s ease"
}

const emptyState = {
  textAlign: "center",
  color: "#9a3412",
  marginBottom: "22px"
}

const list = {
  display: "flex",
  flexDirection: "column",
  gap: "18px"
}

const taskCard = {
  borderRadius: "26px",
  padding: "20px",
  boxShadow: "0 12px 26px rgba(0,0,0,0.14)",
  transition: "all 0.3s ease",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
}

const taskText = {
  fontSize: "15px",
  fontWeight: 600,
  maxWidth: "65%",
  color: "#7c2d12"
}

const actions = {
  display: "flex",
  gap: "10px"
}

const completeBtn = {
  padding: "10px 16px",
  borderRadius: "16px",
  border: "none",
  fontWeight: 600,
  cursor: "pointer"
}

const deleteBtn = {
  padding: "10px 16px",
  borderRadius: "16px",
  border: "none",
  background: "#fecaca",
  color: "#7f1d1d",
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 0.2s ease"
}

export default Workspace
