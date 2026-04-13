import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PortfolioPage from './PortfolioPage'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PortfolioPage />
  </StrictMode>,
)
