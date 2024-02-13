import { Navigate, Outlet } from "react-router-dom"
import React, {useContext} from 'react'
import { AuthContext } from "../AuthContext"

export default function PrivateRoutes() {

  const {currentUser} = useContext(AuthContext)

  return (
    currentUser !== null ? <Outlet /> : <Navigate to='/'/>
  )
}
