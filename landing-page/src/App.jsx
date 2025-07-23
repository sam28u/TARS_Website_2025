import { useState, useEffect } from 'react'
import './App.css'
import desktopBorder from './assets/desktop-border.svg'
import mobileBorder from './assets/mobile-border.svg'
import tarsLogo from './assets/tars-logo.svg'

function App() {
  const [showSlide, setShowSlide] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
  const timer = setTimeout(() => setShowSlide(false), 1000);
  return () => clearTimeout(timer);
  }, []);

   useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleMenu = () => setIsMenuOpen(open => !open)

  return (
    <div className="
      flex justify-top items-start
      m-0 p-5
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
      md:p-[10px] 
      lg:p-[20px]
    ">
        {/* ... desktop border container... */}
        
    <img
      src={mobileBorder}
      alt="Mobile Border"
      className="block md:hidden w-full max-w-[1220px] h-auto"
    />
    <img
      src={desktopBorder}
      alt="Desktop Border"
      className="hidden md:block w-full max-w-[1220px] h-auto"
    />
      {/* ... border... */}

      <img
      className={`
        flex absolute justify-center items-center z-[100]
        top-[15%] left-[25%]
        max-w-[500px] w-[50%] h-auto

        sm:w-[50%] sm:left-[25%] sm:top-[15%]
        md:w-[35%] md:top-[25%] md:left-[58%]
        lg:w-[35%] lg:top-[25%] lg:left-[58%]

       ${showSlide ? 'animate-slideUp' : ''}
        hover:animate-float`}
      src={tarsLogo}
      alt="TARS Logo" />
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

            opacity-0 animate-slideUp animation-delay-200
          ">WELCOME to</p>
            {/*first-line*/}

          <p className="
              m-0 p-0 pb-[3%] text-[6vw] z-10
              sm:text-[6vw] sm:pb-[3%]
              md:text-[4vw] md:pb-[3%]
              lg:text-[clamp(2rem,4vw,3rem)] lg:pb-[4%]

              opacity-0 animate-slideUp animation-delay-900
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

            opacity-0 animate-slideUp animation-delay-1600
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
            text-[8vw] top-0 left-[5%]
            shimmer
            sm:text-[8vw] sm:top-[0%]
            md:text-[5vw] md:top-[1.2%] md:left-[1%]
            lg:text-[clamp(3rem,5.3vw,4rem)] lg:top-[2%] lg:left-[1%]
          ">
          TARS
        </a>
        {/*...Tars...*/}

        {/* Mobile Navigation - Only show on screens <= 767px */}
       {windowWidth <= 767 && (
          <>
            <button
            onClick={toggleMenu}
            className="
              absolute top-[5%] right-[8%]
              w-[5vw] h-[5vw]
              flex flex-col justify-between items-center
              bg-none border-none cursor-pointer
              z-[10002]
              md:hidden
            "
            aria-label="Navigation menu"
          >
            {/* Top bar */}
            <span
              className={`
                block h-[10%] w-full bg-[#cab5ffe1] rounded
                transform transition-transform duration-300
                ${isMenuOpen ? 'rotate-45 translate-y-[600%]' : ''}
              `}
            />
            {/* Middle bar */}
            <span
              className={`
                block h-[10%] w-full bg-[#cab5ffe1] rounded
                transition-opacity duration-300
                ${isMenuOpen ? 'opacity-0' : 'opacity-100'}
              `}
            />
            {/* Bottom bar */}
            <span
              className={`
                block h-[10%] w-full bg-[#cab5ffe1] rounded
                transform transition-transform duration-300
                ${isMenuOpen ? '-rotate-45 -translate-y-[300%]' : ''}
              `}
            />
          </button>
            {/*..... Hamburger button......*/}

            <div id="mobile-blur-shape" className={isMenuOpen ? 'show' : ''}>
              <svg width="0" height="0" style={{position: 'absolute'}}>
                <defs>
                  <clipPath id="mobileShape" clipPathUnits="objectBoundingBox">
                    <path d="M 0.898936 0.00256 C 0.952548 0.00256 0.996011 0.030446 0.996011 0.064846 L 0.996011 0.935154 C 0.996011 0.969553 0.952548 0.99744 0.898936 0.99744 L 0.101064 0.99744 C 0.047451 0.99744 0.003989 0.969553 0.003989 0.935154 L 0.003989 0.134812 C 0.003989 0.100412 0.047451 0.072526 0.101064 0.072526 L 0.263298 0.072526 C 0.291205 0.072526 0.31383 0.058009 0.31383 0.040102 C 0.31383 0.019354 0.340027 0.00256 0.37234 0.00256 L 0.898936 0.00256 Z"></path>
                  </clipPath>
                </defs>
              </svg>
            </div>
             {/*..... Specific clip path for glass blur effect......*/}
            
            <nav 
              className={`mobile-nav-bar md:hidden ${isMenuOpen ? 'show' : 'hidden'}`}>
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
          </>
        )}
  
          <nav id="desktop-nav" className="md:flex nav-bar">
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