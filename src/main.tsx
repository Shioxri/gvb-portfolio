import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import '@fontsource-variable/instrument-sans'
// Wordmark only: geometric and open, so the name has room to breathe.
import '@fontsource-variable/sora'
// Only the 500 face is loaded, so every mono label (weight 400 by default)
// resolves to it and reads a touch heavier than Plex's thin regular.
import '@fontsource/ibm-plex-mono/500.css'
import './styles/base.css'

import App from './App'

const container = document.getElementById('root')
if (!container) throw new Error('Root element #root is missing from index.html')

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
