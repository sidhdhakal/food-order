import { createRoot } from 'react-dom/client'

console.log("ENV URL:", import.meta.env.VITE_BACKEND_URL); 
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <App />
)
