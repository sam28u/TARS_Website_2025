import { useState, useEffect } from 'react'
import './App.css'
import desktopBorder from './assets/desktop-border.svg'
import mobileBorder from './assets/mobile-border.svg'
import tarsLogo from './assets/tars-logo.svg'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [borderSrc, setBorderSrc] = useState(desktopBorder)


  useEffect(() => {
    const updateBorder = () => {
      if (window.innerWidth <= 768) {
        setBorderSrc(mobileBorder)
      } else {
        setBorderSrc(desktopBorder)
      }
    }

    updateBorder()
    window.addEventListener('resize', updateBorder)
    
    return () => window.removeEventListener('resize', updateBorder)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMenuOpen(false)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="body-container">
      <div className="desktop-border-container">
        
        <img id="border" className="dsk-border" src={borderSrc} alt="Border" />
        
        <img className="logo" src={tarsLogo} alt="TARS Logo" />

        <div className="content">
          <p className="first-line">WELCOME to</p>
          <p className="second-line">
            The Automatic & 
            <br />
            Robotic Society
          </p>
          <p className="third-line">
            We are the autonomous and robotics society of IIIT Bhubaneswar.Here we do some crazy stuff .
          </p>
        </div>

        <a href="#">
      <div class="tars-logo">TARS</div>
        </a>


        <button className="nav-menu" id="nav-menu" onClick={toggleMenu}>
          {isMenuOpen ? '✕' : '☰'}
        </button>

        <div id="mobile-blur-shape" className={isMenuOpen ? 'show' : ''}>
          <svg width="0" height="0" style={{position: 'absolute'}}>
            <defs>
              <clipPath id="mobileShape" clipPathUnits="objectBoundingBox">
                <path d="M 0.898936 0.00256 C 0.952548 0.00256 0.996011 0.030446 0.996011 0.064846 L 0.996011 0.935154 C 0.996011 0.969553 0.952548 0.99744 0.898936 0.99744 L 0.101064 0.99744 C 0.047451 0.99744 0.003989 0.969553 0.003989 0.935154 L 0.003989 0.134812 C 0.003989 0.100412 0.047451 0.072526 0.101064 0.072526 L 0.263298 0.072526 C 0.291205 0.072526 0.31383 0.058009 0.31383 0.040102 C 0.31383 0.019354 0.340027 0.00256 0.37234 0.00256 L 0.898936 0.00256 Z"></path>
              </clipPath>
            </defs>
          </svg>
        </div>
        
        <nav id="nav" className={`nav-bar ${isMenuOpen ? 'show' : ''}`}>
          <ul>
            <li><a className="nav-list" href="#about-us">About Us</a></li>
            <li><a className="nav-list" href="#blogs">Blogs</a></li>
            <li><a className="nav-list" href="#past">Past</a></li>
            <li><a className="nav-list" href="#projects">Projects</a></li>
            <li><a className="nav-list" href="#team">Our Team</a></li>
            <li><a className="nav-list" href="#gallery">Gallery</a></li>
            <li><a className="nav-list" href="#events">Events</a></li>
          </ul>
        </nav>
        
      </div>
    </div>
  )
}

export default App

