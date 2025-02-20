import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './components/auth/authProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800"'>
      <AuthProvider>
        <App />
      </AuthProvider>
      
    </div>
    
  </StrictMode>,
)
