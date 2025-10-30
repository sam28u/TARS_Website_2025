"use client";

import { useState, useEffect } from "react";

// In Next.js, files in the `public` folder are served from the root.
// They should be referenced with a leading slash, not imported from an assets folder.
const desktopBorder = "/desktop-border(lp).svg";
const mobileBorder = "/mobile-border(lp).svg";
const tarsLogo = "/tars-logo(lp).svg";

// Accept the 'refs' object as a prop
function Landing({ refs }) {
  const [showSlide, setShowSlide] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Initialize state to 0 on the server and let the client-side effect update it.
  const [windowWidth, setWindowWidth] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setShowSlide(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function to reset scroll when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isClient) return;
    // This effect runs only on the client, where `window` is available.
    const handleResize = () => setWindowWidth(window.innerWidth);
    
    // Set the initial width once the component mounts in the browser
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isClient]);

  const toggleMenu = () => setIsMenuOpen((open) => !open);

  const handleScroll = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close the mobile menu after scrolling
      setIsMenuOpen(false);
    }
  };

  return (
    <div
      className="
      flex justify-top items-start
      m-0 p-5
      min-w-[200px]
      overflow-x-hidden
      md:items-start md:justify-center
      lg:text-[17px] lg:items-start lg:justify-center
      xl:text-[18px] xl:items-start xl:justify-center 
    "
    >
      {/* ... background container... */}

      <div
        className="
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
    "
      >
        {/* ... desktop border container... */}

        <img
          src={mobileBorder}
          draggable="false"
          alt="Mobile Border"
          className="block md:hidden w-full min-w-[150px] max-w-[767px] h-auto"
        />
        <img
          src={desktopBorder}
          draggable="false"
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

       ${showSlide ? "animate-slideUp" : ""}
        hover:animate-float`}
          src={tarsLogo}
          draggable="false"
          alt="TARS Logo"
        />
        {/* ... Logo... */}

        <div
          className="
          flex flex-col
          absolute
          justify-start items-start
          text-[#CAB5FF]
          font-kode
          select-none cursor-default
          top-[55%] left-[10%]
          m-0 p-0
          max-w-[600px] w-[90%] 
          z-[1000]

          sm:w-[70%] sm:left-[10%] sm:top-[60%] sm:z-[1000]
          md:top-[40%] md:w-[50%] md:left-[8%]
          lg:top-[40%] lg:w-[60%] lg:left-[10%] 
        "
        >
          {/* ... content div... */}

          <p
            className="
            m-0 p-0 pb-[2%] text-[4vw] 
            sm:text-[3.5vw] sm:pb-[4%]
            md:text-[2vw] md:pb-[3%]
            lg:text-[clamp(1rem,2vw,1.5rem)] lg:pb-[1%]

            opacity-0 animate-slideUp animation-delay-200
          "
          >
            WELCOME to
          </p>
          {/*first-line*/}

          <p
            className="
              m-0 p-0 pb-[3%] text-[6vw] z-10
              sm:text-[6vw] sm:pb-[3%]
              md:text-[4vw] md:pb-[3%]
              lg:text-[clamp(2rem,4vw,3rem)] lg:pb-[4%]

              opacity-0 animate-slideUp animation-delay-900
            "
          >
            The Automatic &
            <br />
            Robotic Society
          </p>
          {/*second-line*/}

          <p
            className="
            m-0 p-0 text-[2.7vw] w-[77%]
            sm:text-[2.5vw] sm:w-[90%]
            md:text-[1.5vw] md:w-[90%]
            lg:text-[clamp(1rem,1.5vw,1rem)] lg:w-[100%]
            opacity-0 animate-slideUp animation-delay-1600
          "
          >
            We are the autonomous and robotics society of IIIT Bhubaneswar.Here
            we do some crazy stuff .
          </p>
          {/*Third-line*/}
          <button
            className="relative group w-fit cursor-pointer mt-12 font-bold hover:text-white duration-300 text-[4vw] 
            sm:text-[3.5vw] 
            md:text-[2vw] 
            lg:text-[clamp(1rem,2vw,1.5rem)] 
            opacity-0 animate-slideUp animation-delay-1600"
            onClick={()=>{
              const link = document.createElement('a');
              link.href = '/annual-report.pdf';
              link.download = 'annual-report.pdf';
              link.click();
            }}
          >
            Annual Report
            <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-white transition-all duration-500 group-hover:w-full"></span>
          </button>
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
          "
        >
          TARS
        </a>
        {/*...Tars...*/}

        {/* Mobile Navigation - Only show on screens <= 767px */}
        {isClient && windowWidth <= 767 && (
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
                ${isMenuOpen ? "rotate-45 translate-y-[600%]" : ""}
              `}
              />
              {/* Middle bar */}
              <span
                className={`
                block h-[10%] w-full bg-[#cab5ffe1] rounded
                transition-opacity duration-300
                ${isMenuOpen ? "opacity-0" : "opacity-100"}
              `}
              />
              {/* Bottom bar */}
              <span
                className={`
                block h-[10%] w-full bg-[#cab5ffe1] rounded
                transform transition-transform duration-300
                ${isMenuOpen ? "-rotate-45 -translate-y-[300%]" : ""}
              `}
              />
            </button>
            {/*..... Hamburger button......*/}
            
            {/* NEW BLUR OVERLAY: This is a more reliable way to create the blur effect */}
            {isMenuOpen && (
              <div 
                onClick={toggleMenu}
                className="fixed inset-0 z-[10001] bg-black/30 backdrop-blur-lg transition-opacity duration-300"
              ></div>
            )}


            <nav
              className={`mobile-nav-bar md:hidden ${
                isMenuOpen ? "show" : "hidden"
              }`}
            >
              <ul>
                <li onClick={() => handleScroll(refs.aboutUsRef)}>
                  <a className="nav-list nav-tap-animation" href="#about-us">
                    About Us
                  </a>
                </li>
                <li onClick={() => handleScroll(refs.latestRef)}>
                  <a className="nav-list nav-tap-animation" href="#latest">
                    Latest
                  </a>
                </li>
                <li onClick={() => handleScroll(refs.pastRef)}>
                  <a className="nav-list nav-tap-animation" href="#past">
                    Past
                  </a>
                </li>
                <li onClick={() => handleScroll(refs.projectsRef)}>
                  <a className="nav-list nav-tap-animation" href="#projects">
                    Projects
                  </a>
                </li>
                <li onClick={() => handleScroll(refs.ourTeamRef)}>
                  <a className="nav-list nav-tap-animation" href="#team">
                    Our Team
                  </a>
                </li>
                <li onClick={() => handleScroll(refs.galleryRef)}>
                  <a className="nav-list nav-tap-animation" href="#gallery">
                    Gallery
                  </a>
                </li>
                <li onClick={() => handleScroll(refs.liveeventsRef)}>
                  <a className="nav-list nav-tap-animation" href="#events">
                    Events
                  </a>
                </li>
              </ul>
            </nav>
          </>
        )}

        <nav id="desktop-nav" className="md:flex nav-bar">
          <ul className="flex flex-row items-center justify-center w-full">
            <li>
              <a
                className="nav-list"
                onClick={() => handleScroll(refs.aboutUsRef)}
              >
                <span className="relative hover:text-white-400 cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-white before:h-[2px] before:w-0 hover:before:w-full before:bottom-0 before:left-0 before:origin-left">
                  About Us
                </span>
              </a>
            </li>
            <li>
              <a
                className="nav-list"
                onClick={() => handleScroll(refs.latestRef)}
              >
                <span className="relative hover:text-white-400 cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-white before:h-[2px] before:w-0 hover:before:w-full before:bottom-0 before:left-0 before:origin-left">
                  Blogs
                </span>
              </a>
            </li>
            <li>
              <a
                className="nav-list"
                onClick={() => handleScroll(refs.pastRef)}
              >
                <span className="relative hover:text-white-400 cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-white before:h-[2px] before:w-0 hover:before:w-full before:bottom-0 before:left-0 before:origin-left">
                  Past
                </span>
              </a>
            </li>
            <li>
              <a
                className="nav-list"
                onClick={() => handleScroll(refs.projectsRef)}
              >
                <span className="relative hover:text-white-400 cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-white before:h-[2px] before:w-0 hover:before:w-full before:bottom-0 before:left-0 before:origin-left">
                  Projects
                </span>
              </a>
            </li>
            <li>
              <a
                className="nav-list"
                onClick={() => handleScroll(refs.ourTeamRef)}
              >
                <span className="relative hover:text-white-400 cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-white before:h-[2px] before:w-0 hover:before:w-full before:bottom-0 before:left-0 before:origin-left">
                  Our Team
                </span>
              </a>
            </li>
            <li>
              <a
                className="nav-list"
                onClick={() => handleScroll(refs.galleryRef)}
              >
                <span className="relative hover:text-white-400 cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-white before:h-[2px] before:w-0 hover:before:w-full before:bottom-0 before:left-0 before:origin-left">
                  Gallery
                </span>
              </a>
            </li>
            <li>
              <a
                className="nav-list"
                onClick={() => handleScroll(refs.liveeventsRef)}
              >
                <span className="relative hover:text-white-400 cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-white before:h-[2px] before:w-0 hover:before:w-full before:bottom-0 before:left-0 before:origin-left">
                  Events
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Landing;

