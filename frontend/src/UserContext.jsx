import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const dataContext = createContext()
function UserContext({ children }) {
  let [userData, setUserData] = useState(null)
  let backendUrl = "https://planora-backend-web.onrender.com"
  let navigate= useNavigate()

  const getUserData = async () => {
    try {
      let result = await axios.get(`${backendUrl}/api/getme`, { withCredentials: true })
      setUserData(result.data)
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  const value = {
    backendUrl,
    userData,
    setUserData, getUserData
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <div>
      <dataContext.Provider value={value}>
        {children}
      </dataContext.Provider>
    </div>
  )
}


export default UserContext
