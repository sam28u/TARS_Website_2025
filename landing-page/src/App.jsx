import { useState, useEffect } from 'react'
import './App.css'
import desktopBorder from './assets/desktop-border.svg'
import mobileBorder from './assets/mobile-border.svg'
import tarsLogo from './assets/tars-logo.svg'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [borderSrc, setBorderSrc] = useState(desktopBorder)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
      setIsMenuOpen(false)
      setBorderSrc(window.innerWidth <= 767 ? mobileBorder : desktopBorder)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="
      flex justify-top items-start
      m-0 p-0
      min-h-screen min-w-[200px]

      bg-custom-dark-gradient-tars

      md:items-start md:justify-center
      lg:text-[17px] lg:items-start lg:justify-center
      xl:text-[18px] xl:items-start xl:justify-center 
    ">
      {/* ... background container... */}

      <div className="
      relative
      w-full max-w-[1228px]
      mt-[20px]
      m-0
      p-0
      top-[5%]
      box-border

      sm:overflow-hidden
      md:p-[10px] md:top-[10px]
      lg:p-[20px]
    ">
        {/* ... desktop border container... */}
        
        <img
          id="border"
          className="
            flex w-full h-auto max-w-[1220px]
            max-[767px]:overflow-hidden
          "
          src={borderSrc}
          alt="Border"
        />
          {/* ... border... */}

        <img
          className="
            flex absolute justify-center align-middle z-[100]
            top-[15%] left-[25%]
            max-w-[500px] w-[50%] h-auto
            
            sm:w-[50%] sm:h-[auto] sm:left-[25%] sm:top-[15%] sm:z-[1]
            md:w-[35%] md:h-[auto] md:top-[25%] md:left-[58%] md:justify-end md:align
            lg:w-[55%] lg:h-[55%] lg:top-[25%] lg:left-[52%]
          "
          src={tarsLogo}
          alt="TARS Logo"
        />
        {/* ... Logo... */}

        <div className="
          flex flex-col
          absolute
          justify-start items-start
          text-[#CAB5FF]
          font-kode
          top-[60%] left-[10%]
          m-0 p-0
          max-w-[600px] w-[90%] 
          z-[1000]

          sm:w-[70%] sm:left-[10%] sm:top-[60%] sm:z-[1000]
          md:top-[45%] md:w-[50%] md:left-[8%]
          lg:top-[45%] lg:w-[60%] lg:left-[10%] 
        ">
          {/* ... content div... */}

          <p className="
            m-0 p-0 pb-[2%] text-[4vw]
            sm:text-[3.5vw] sm:pb-[4%]
            md:text-[2vw] md:pb-[3%]
            lg:text-[clamp(1rem,2vw,1.5rem)] lg:pb-[1%]
          ">WELCOME to</p>
            {/*first-line*/}

          <p className="
              m-0 p-0 pb-[3%] text-[6vw] z-10
              sm:text-[6vw] sm:pb-[3%]
              md:text-[4vw] md:pb-[3%]
              lg:text-[clamp(2rem,4vw,3rem)] lg:pb-[4%]
            ">
            The Automatic & 
            <br />
            Robotic Society
          </p>
            {/*second-line*/}

          <p className="
            m-0 p-0 text-[2.7vw] w-[77%]
            sm:text-[2.5vw] sm:w-[90%]
            md:text-[1.5vw] md:w-[90%]
            lg:text-[clamp(1rem,1.5vw,1rem)] lg:w-[100%]
          ">
            We are the autonomous and robotics society of IIIT Bhubaneswar.Here we do some crazy stuff .
          </p>
           {/*Third-line*/}
        </div>

        <a
          href="#"
          className="
            absolute m-0 p-0
            font-[Maztech] text-[#CAB5FF] no-underline
            flex items-start justify-start
            cursor-pointer
            text-[9vw] top-0 left-[5%]

            md:text-[5.3vw] md:top-[1.2%] md:left-[1%]
            lg:text-[clamp(3rem,5.3vw,4rem)] lg:top-[2%] lg:left-[1%]
          ">
          TARS
        </a>
        {/*...Tars...*/}


        <button
          id="nav-menu"
          onClick={toggleMenu}
          className="
            absolute top-[2%] right-[6%]
            text-[7vw] text-[#cab5ffe1]
            border-0 bg-none cursor-pointer
            z-[10002]
            md:hidden
          ">
          {isMenuOpen ? '✕' : '☰'}
        </button>
        {/*...Hamburger Menu Toggle...*/}


        <div id="mobile-blur-shape" className={isMenuOpen ? 'show' : ''}>
          <svg width="0" height="0" style={{position: 'absolute'}}>
            <defs>
              <clipPath id="mobileShape" clipPathUnits="objectBoundingBox">
                <path d="M 0.898936 0.00256 C 0.952548 0.00256 0.996011 0.030446 0.996011 0.064846 L 0.996011 0.935154 C 0.996011 0.969553 0.952548 0.99744 0.898936 0.99744 L 0.101064 0.99744 C 0.047451 0.99744 0.003989 0.969553 0.003989 0.935154 L 0.003989 0.134812 C 0.003989 0.100412 0.047451 0.072526 0.101064 0.072526 L 0.263298 0.072526 C 0.291205 0.072526 0.31383 0.058009 0.31383 0.040102 C 0.31383 0.019354 0.340027 0.00256 0.37234 0.00256 L 0.898936 0.00256 Z"></path>
              </clipPath>
            </defs>
          </svg>
        </div>
        
          <nav 
            id="nav" 
            className={`nav-bar ${screenWidth >= 768? '': isMenuOpen? 'show': 'hidden'}`}>
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
