import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import Page from './CustomerFacing/Pages/Page'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './CustomerFacing/Pages/Login'
import SignUp from './CustomerFacing/Pages/SignUp'
import AdminLogin from './Admin/Pages/AdminLogin'
import { Toaster } from 'react-hot-toast'
import VerifyEmail from './CustomerFacing/Pages/VerifyEmail'
import ResetPassword from './CustomerFacing/Pages/ResetPassword'
import ProtectedRoute from './Admin/Pages/Main'
import PurchaseFail from './CustomerFacing/Pages/Esewa/PurchaseFail'
import PurchaseSuccess from './CustomerFacing/Pages/Esewa/PurchaseSuccess'
import { CartProvider } from './Utils/CartContext'
import PaymentSuccess from './CustomerFacing/Pages/Esewa/PaymentSuccess'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_ID}>
      <Toaster toastOptions={{
        style:{
          
        },
        
      }} />
      <CartProvider>

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Page />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/signup' element={<SignUp />}/>
            <Route path='/verifyemail' element={<VerifyEmail />}/>
            <Route path='/resetpassword' element={<ResetPassword />}/>
            <Route path='/esewa/purchase_fail' element={<PurchaseFail />}/>
            <Route path='/esewa/purchase_success' element={<PurchaseSuccess />}/>
            <Route path='/esewa/payment_success' element={<PaymentSuccess />}/>

            <Route path='/admin'>
            <Route path='' element={<ProtectedRoute />}/>
              {/* <Route path=''  element={<AdminPage />}/> */}
              <Route path='login'  element={<AdminLogin/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  )
}

export default App
