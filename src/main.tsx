import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import HeaderBar from './Components/HeaderBar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeaderBar />
    <App />
  </StrictMode>,
)
