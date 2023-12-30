import { Navigate, Route, Routes } from "react-router-dom"
import { WelcomeScreen } from "../Pages/WelcomeScreen"

export const AuthRoutes = () => {
  return (
    <Routes>
        {/* <Route path="login"     element={ <LoginScreen/>      }/>
        <Route path="register"  element={ <RegisterScreen/>   } /> */}
        <Route path="login" element={<WelcomeScreen/>}/>

        <Route path='/*'        element={ <Navigate to="/auth/login"/> } />
    </Routes>
  )
}
