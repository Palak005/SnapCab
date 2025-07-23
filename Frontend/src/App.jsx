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
import UserRecentRides from './pages/user/UserRecentRides'
import UserProfile from './pages/user/UserProfile'

function App() {
  const [captain, setCaptain] = CaptainContext();
  
  return (
    <>
    <Routes>
      <Route path='/' element={<GettingStarted/>}/>
      <Route path='/user' element={<Navbar/>}>
        <Route path='login' element={<UserLogin/>}/>
        <Route path='signup' element={<UserSignup/>}/>
        <Route element={<UserProtectWrapper/>}>
        <Route path='createRide' element={<UserHome/>}/>
          <Route path='ride/getRide' element={<AllRides/>}/>     
          <Route path='ride/completed' element={<UserRecentRides/>}/> 
          <Route path='profile' element={<UserProfile/>}/> 
        </Route>
      </Route>
      <Route path='/captain' element={<CaptainNavbar/>}>
        <Route path='login' element={<CaptainLogin/>}/>
        <Route path='signup' element={<CaptainSignup/>}/>
        <Route element={<CaptainProtectWrapper/>}>
          <Route path='home' element={<CaptainHome/>}/>
          <Route path='profile' element={<CaptainProfile/>}/>
          <Route path='ride/available' element={<AvailableRide/>}/>
          <Route path='ride/active' element={<ActiveRide/>} />
          <Route path='ride/completed' element={<ActiveRide/>} />
        </Route>
      </Route>
    </Routes>
    </>
  )
}

export default App
