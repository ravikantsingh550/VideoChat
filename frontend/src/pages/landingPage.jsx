import React from 'react'
import "../App.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className='landingPageContainer'>
      <nav>
        <div className='navHeader'>
          <h2>Apna Video Call</h2>
        </div>
        <div className='navList'>
          <p>Join as guest</p>
          <p>Register</p>
          <div role='button'>
            <p>Login</p>
          </div>
        </div>
        
      </nav>

      <div className="landingMainContainer">
        <div>
          <h1><span style={{color:"#FF9839"}}>Connects</span> with your Loved Ones</h1>
          <p className='paragraph'>Cover a distance by apna video call</p>
          <div role='button'>
            <Link to={"/home"}>Get Started</Link>
          </div>
        </div>
        <div>
          <img src='/mobile.png' alt=''/>
        </div>
      </div>
    </div>
  )
}
