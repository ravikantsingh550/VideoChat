import { useState } from 'react'
import './App.css'
import {Route , BrowserRouter as Router , Routes} from "react-router-dom";
import LandingPage from './pages/landingPage.jsx';
import Authentication from './pages/authentication.jsx';
import { AuthProvider } from './contexts/authContext.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Router>
  <AuthProvider>

      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/auth' element={<Authentication/>}/>
      </Routes>
      </AuthProvider>
     </Router>
    </>
  )
}

export default App
