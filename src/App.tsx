import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import Page from './CustomerFacing/Pages/Page'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './CustomerFacing/Pages/Login'
import SignUp from './CustomerFacing/Pages/SignUp'
import AdminPage from './Admin/Pages/AdminMain'
import AdminLogin from './Admin/Pages/AdminLogin'
import { Toaster } from 'react-hot-toast'
import VerifyEmail from './CustomerFacing/Pages/VerifyEmail'
import ResetPassword from './CustomerFacing/Pages/ResetPassword'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_ID}>
      <Toaster toastOptions={{
        style:{
          
        },
        
      }} />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Page />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/signup' element={<SignUp />}/>
            <Route path='/verifyemail' element={<VerifyEmail />}/>
            <Route path='/resetpassword' element={<ResetPassword />}/>

            <Route path='/admin'>
              <Route path=''  element={<AdminPage />}/>
              <Route path='login'  element={<AdminLogin/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  )
}

export default App
