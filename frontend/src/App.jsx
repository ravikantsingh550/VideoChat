import { useState } from 'react'
import './App.css'
import {Route , BrowserRouter as Router , Routes} from "react-router-dom";
import LandingPage from './pages/landingPage.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
      </Routes>
     </Router>
    </>
  )
}

export default App
