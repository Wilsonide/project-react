import React, { createContext, useState } from 'react'

type AuthType = {
  accessToken: string,
  email: string,
  name: string,
  role: string,
  profile: string
  emailVerified: boolean | undefined,
}

type AuthContextType = {
  Auth : AuthType| undefined
  setAuth:  React.Dispatch<React.SetStateAction<AuthType>>
}

const AuthContext = createContext<AuthContextType>({
  Auth: {
    accessToken: '',
    email: '',
    name: '',
    role: '',
    profile: '',
    emailVerified: false,
  },
  setAuth: function (): void {
  }
})

export const AuthProvider = ({children}:{children: React.ReactNode}) => {
  const [Auth, setAuth] = useState<AuthType>({
    accessToken: '',
    email: '',
    name: '',
    role: '',
    profile: '',
    emailVerified: false,
})
  return (
    <AuthContext.Provider value={{Auth, setAuth}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContext