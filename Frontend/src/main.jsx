import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContextProvider from './context/UserContext.jsx'
import CaptainContextProvider from './context/CaptainContext.jsx'
import {Toaster} from "react-hot-toast";
import { SocketContextProvider } from './context/SocketContext.jsx'
import { UserRideContextProvider } from './context/UserRideContext.jsx'
import { CaptainRideContextProvider } from './context/CaptainRideContext.jsx'


createRoot(document.getElementById('root')).render(
  <SocketContextProvider>
    <BrowserRouter>
    <CaptainContextProvider>
    <UserContextProvider>
      <CaptainRideContextProvider>
      <UserRideContextProvider>
      <App />
      </UserRideContextProvider>
      </CaptainRideContextProvider>
    </UserContextProvider>
    </CaptainContextProvider>
    </BrowserRouter>
    <Toaster/>
  </SocketContextProvider>
)
