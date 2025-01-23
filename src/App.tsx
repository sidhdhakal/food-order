import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import Page from './Pages/Page'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_ID}>
        {/* <Page /> */}
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Page />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/signup' element={<SignUp />}/>
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  )
}

export default App
