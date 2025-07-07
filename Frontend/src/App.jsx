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
import GetCoord from './pages/GetCoord'
import AllRides from './pages/ride/AllRides'
import './App.css'
import Navbar from './components/Navbar'
import CaptainProfile from './pages/captain/CaptainProfile'
import AvailableRide from './pages/captain/AvailableRide'
import ActiveRide from './pages/captain/ActiveRide'
import CaptainNavbar from './pages/captain/CaptainNavbar'
import { CaptainContext } from './context/CaptainContext'

function App() {
  const [captain, setCaptain] = CaptainContext();
  
  return (
    <>
    {captain? <CaptainNavbar/> : <Navbar/>}
    <Routes>
      <Route path='/' element={<GettingStarted/>}/>
      <Route path='/user'>
        <Route path='createRide' element={<UserProtectWrapper><UserHome/></UserProtectWrapper>}/>
        <Route path='login' element={<UserLogin/>}/>
        <Route path='signup' element={<UserSignup/>}/>
        <Route path='ride/getRide' element={<UserProtectWrapper><AllRides/></UserProtectWrapper>}/>     
      </Route>

      <Route path='/captain'>
        <Route path='login' element={<CaptainLogin/>}/>
        <Route path='signup' element={<CaptainSignup/>}/>
        <Route path='home' element={<CaptainProtectWrapper><CaptainHome/></CaptainProtectWrapper>}/>
        <Route path='profile' element={<CaptainProfile/>}/>
        <Route path='ride/available' element={<AvailableRide/>}/>
        <Route path='ride/active' element={<ActiveRide/>} />
      </Route>
      <Route path='/map' element={<GetCoord/>}/>
    </Routes>
    </>
  )
}

export default App
