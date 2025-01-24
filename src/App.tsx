import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import Page from './CustomerFacing/Pages/Page'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './CustomerFacing/Pages/Login'
import SignUp from './CustomerFacing/Pages/SignUp'
import Dashboard from './Admin/Pages/Dashboard'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
        {/* <Page /> */}
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_ID}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Page />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/signup' element={<SignUp />}/>

            <Route path='/admin'>
                <Route path='' element={<Dashboard />}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  )
}

export default App
