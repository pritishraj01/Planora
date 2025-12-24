import React, { useContext } from 'react'
import { Navigate, Route, Routes } from "react-router-dom"
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import { dataContext } from './UserContext'
import Workspace from './pages/Workspace'

function App() {
  let { userData } = useContext(dataContext)

  return (
    <Routes>
      <Route path='/signup' element={userData ? <Navigate to={"/"} /> : <Signup />} />
      <Route path='/login' element={userData ? <Navigate to={"/"} /> : <Login />} />
      <Route path='/' element={userData ? <Home /> : <Navigate to={"/login"} />} />
      <Route path='/workspace/:workspaceId' element={userData ? <Workspace /> : <Navigate to={"/login"} />} />
    </Routes>
  )
}

export default App
