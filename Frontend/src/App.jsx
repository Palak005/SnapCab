import { Route, Routes } from 'react-router-dom'
import GettingStarted from './pages/GettingStarted'
import UserHome from "./pages/user/UserHome"
import UserLogin from "./pages/user/UserLogin"
import UserSignup from "./pages/user/UserSignup"
import CaptainLogin from "./pages/captain/CaptainLogin"
import CaptainSignup from "./pages/captain/CaptainSignup"
import UserProtectWrapper from './utils/UserProtectWrapper'
import CaptainHome from './pages/captain/CaptainHome'
import CaptainProtectWrapper from './utils/CaptainProtectWrapper'
import UserLogout from './pages/user/UserLogout'
import CaptainLogout from './pages/captain/CaptainLogout'
import GetCoord from './pages/GetCoord'
import AllRides from './pages/ride/AllRides'
import './App.css'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<GettingStarted/>}/>
      <Route path='/user'>
        <Route path='createRide' element={<UserProtectWrapper><UserHome/></UserProtectWrapper>}/>
        <Route path='login' element={<UserLogin/>}/>
        <Route path='logout' element={<UserLogout/>}/>
        <Route path='signup' element={<UserSignup/>}/>
        {/* <Route path='ride/:id' element={<RideInfo/>}/>   */}
        <Route path='ride/getRide' element={<UserProtectWrapper><AllRides/></UserProtectWrapper>}/>     
      </Route>

      <Route path='/captain'>
        <Route path='login' element={<CaptainLogin/>}/>
        <Route path='signup' element={<CaptainSignup/>}/>
        <Route path='home' element={<CaptainProtectWrapper><CaptainHome/></CaptainProtectWrapper>}/>
        <Route path='logout' element={<CaptainLogout/>}/>
      </Route>
      <Route path='/map' element={<GetCoord/>}/>
    </Routes>
    </>
  )
}

export default App
