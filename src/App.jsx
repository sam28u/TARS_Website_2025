import React, { useRef } from 'react';
import Landing from "./components/Landing";
import Aboutus from "./components/Aboutus";
import LatestInTech from "./components/LatestInTech"
import Footer from './components/Footer'
import "./index.css";

function App() {
  // Create refs for each section component
  const aboutUsRef = useRef(null);
  const latestRef = useRef(null);
  const pastRef = useRef(null);
  const projectsRef = useRef(null);
  const ourTeamRef = useRef(null);
  const galleryRef = useRef(null);
  const liveeventsRef = useRef(null);

  const sectionRefs = {
    aboutUsRef,
    latestRef,
    pastRef,
    projectsRef,
    ourTeamRef,
    galleryRef,
    liveeventsRef,
  };

  return (
    <div className='bg-custom-dark-gradient-tars '>
      <Landing refs={sectionRefs} />
      {/* Attach ref to the Aboutus component */}
      <div ref={aboutUsRef}>
        <Aboutus />
      </div>
      {/* Pass the refs object to LatestInTech */}
      <LatestInTech refs={sectionRefs} />
      <Footer />
      {/* <FullTeam /> */}
    </div>
  );
}

export default App;