import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import RootLayout from "./layouts/RootLayout"
import RequireAuth from "./components/auth/RequireAuth"
import { LoginForm } from "./components/auth/LoginForm"
import { RegisterForm } from "./components/auth/RegisterForm"
import Unauthorized from "./components/auth/unauthorised"
import { ResetForm } from "./components/auth/ResetForm"
import { NewPasswordForm } from "./components/auth/NewPasswordForm"
import LandingLayout from "./layouts/LandingLayout"
import PersistLogin from "./components/auth/PersistLogin"
import AuthLayout from "./layouts/AuthLayout"
import Verificationpage from "./components/auth/VerifyEmail"

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<LandingLayout/>}/>
        <Route element={<PersistLogin/>}>
          <Route element ={<RequireAuth role='USER'/>}>
            <Route element={<RootLayout/>}>
              <Route path='/dashboard' element={<Home/>}/>
              <Route path="/about"element={<About/>}/>
            </Route>
          </Route>
        </Route>
        
        <Route path="/auth" element={<AuthLayout/>}>
          <Route path="login" element={<LoginForm/>}/>
          <Route path="register" element={<RegisterForm/>}/>
          <Route path ='unauthorized' element={<Unauthorized/>}/>
          <Route path ='newpassword' element={<NewPasswordForm/>}/>
          <Route path ='reset' element={<ResetForm/>}/>
          <Route path = 'verification' element={<Verificationpage/>}/>
        </Route>
        </>
    )
  )

  return (
    <RouterProvider router={router}/>
  )
}

export default App
