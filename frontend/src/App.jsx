import { useState } from 'react'
import './App.css'
import {Route , BrowserRouter as Router , Routes} from "react-router-dom";
import LandingPage from './pages/landingPage.jsx';
import Authentication from './pages/authentication.jsx';
import { AuthProvider } from './contexts/authContext.jsx';
import VideoMeetComponent from './pages/VideoMeet.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Router>
  <AuthProvider>

      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/auth' element={<Authentication/>}/>
        <Route path="/:url" element={<VideoMeetComponent/>}/>
      </Routes>
      </AuthProvider>
     </Router>
    </>
  )
}

export default App
