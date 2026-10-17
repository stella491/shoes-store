import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './Contexts/CartContext'
import { AuthProvider } from './Contexts/AuthContext'


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </CartProvider>
  </StrictMode>,
);
