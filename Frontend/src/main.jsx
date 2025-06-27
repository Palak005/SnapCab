import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContextProvider from './context/UserContext.jsx'
import CaptainContextProvider from './context/CaptainContext.jsx'
import {Toaster} from "react-hot-toast";
import { SocketContextProvider } from './context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SocketContextProvider>
    <BrowserRouter>
    <CaptainContextProvider>
    <UserContextProvider>
      <App />
    </UserContextProvider>
    </CaptainContextProvider>
    </BrowserRouter>
    </SocketContextProvider>
    <Toaster/>
  </StrictMode>
)
