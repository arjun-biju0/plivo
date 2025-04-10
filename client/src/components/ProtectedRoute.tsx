// src/components/ProtectedRoute.tsx
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

interface Props {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
    }
  }, [])

  return <>{children}</>
}

export default ProtectedRoute
