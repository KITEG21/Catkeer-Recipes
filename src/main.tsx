import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import HeaderBar from './components/HeaderBar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeaderBar />
    <App />
    <footer> <a href='https://github.com/KITEG21' target="_blank">Gabriel Rodriguez 2025 @KITEG21</a></footer>
  </StrictMode>,
)
