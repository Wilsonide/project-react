'use client'
import useAuth from '@/hooks/useAuth'
import { Navigate, useLocation, Outlet } from 'react-router-dom'

type AllowedRoles = {
  role: 'USER' | 'ADMIN'
}

const RequireAuth = ({role}:AllowedRoles) => {
    const { Auth } = useAuth()
    const location = useLocation()
    /* const location = window.location.pathname */
  return (
    Auth?.role === role
        ? 
        <Outlet/>
        : Auth?.accessToken
          ? <Navigate to = "/auth/unauthorized" replace state={{from: location}}/>
          : <Navigate to='/' replace state={{from: location}}/>
  )
}

export default RequireAuth