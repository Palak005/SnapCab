import { Route, Routes } from 'react-router-dom'
import GettingStarted from './pages/GettingStarted'
import UserHome from "./pages/user/UserHome"
import UserLogin from "./pages/user/UserLogin"
import UserSignup from "./pages/user/UserSignup"
import CaptainLogin from "./pages/captain/CaptainLogin"
import CaptainSignup from "./pages/captain/CaptainSignup"
import UserProtectWrapper from './utils/UserProtectWrapper'


import './App.css'
import CaptainHome from './pages/captain/CaptainHome'
import CaptainProtectWrapper from './utils/CaptainProtectWrapper'
import UserLogout from './pages/user/UserLogout'
import CaptainLogout from './pages/captain/CaptainLogout'
import GetCoord from './pages/GetCoord'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<GettingStarted/>}/>
      <Route path='/home' element={<UserProtectWrapper><UserHome/></UserProtectWrapper>}/>
      <Route path='/login' element={<UserLogin/>}/>
      <Route path='/logout' element={<UserLogout/>}/>
      <Route path='/signup' element={<UserSignup/>}/>
      <Route path='/captain-login' element={<CaptainLogin/>}/>
      <Route path='/captain-signup' element={<CaptainSignup/>}/>
      <Route path='/captain-home' element={<CaptainProtectWrapper><CaptainHome/></CaptainProtectWrapper>}/>
      <Route path='/captain-logout' element={<CaptainLogout/>}/>
      <Route path='/map' element={<GetCoord/>}/>
    </Routes>
    </>
  )
}

export default App
