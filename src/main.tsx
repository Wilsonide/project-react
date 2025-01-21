import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './components/auth/authProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='h-full'>
      <AuthProvider>
        <App />
      </AuthProvider>
      
    </div>
    
  </StrictMode>,
)
