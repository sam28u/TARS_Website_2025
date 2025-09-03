// import './App.css';
// import './index.css';
import React, { useEffect, useState } from 'react';
import desktopBorder from '../assets/desktop-border(le).svg';
import mobileBorder from '../assets/mobile-border(le).svg';
import desktopRect from '../assets/desktop-inner-rectangle(le).svg';
import mobileRect from '../assets/mobile-inner-rectangle(le).svg';

// Import all the card images
import spongeBallsImg from '../assets/SpongeBalls(le).jpeg';
import minecraftImg from '../assets/Minecraft(le).jpeg';
import downloadImg from '../assets/download(le).jpeg';
import onePieceImg from '../assets/OnePiece(le).jpeg';
import bleachImg from '../assets/bleach(le).jpeg';
import placeholderImg from '../assets/SpongeBalls(le).jpeg';

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;

  const cards = [
    { img: spongeBallsImg, desc: 'Spongebob' },
    { img: minecraftImg, desc: 'minecraft' },
    { img: downloadImg, desc: 'Minecraft 2' },
    { img: onePieceImg, desc: 'one piece' },
    { img: bleachImg, desc: 'bleach' },
    { img: placeholderImg, desc: 'placeholder' },
  ];

  return (
    <div className="custom-bg w-full flex justify-center overflow-x-hidden py-7 md:py-12 lg:py-16">
      {/* <div className="relative w-[90vw] flex justify-center box-border p-[4vw] sm:p-0 md:w-[80vw]"> */}
      <div className="relative w-full flex justify-center box-border  sm:p-0 ">
        <img
          src={isMobile ? mobileBorder : desktopBorder}
          alt="Responsive Border"
          className="w-full"
          draggable="false"
        />

        {/* Scrollable div */}
        <div className="absolute w-[80%] h-[80%] top-[15%] overflow-y-auto flex flex-col items-center gap-y-[5%] scroll-hide
          sm:top-[12%] 
          md:top-[15%] md:w-[95%] md:h-[80%]
          lg:top-[17%]"
        >
          {cards.map((card, index) => (
            <div key={index} className="relative w-[100%]">
              <img
                src={isMobile ? mobileRect : desktopRect}
                alt={`Rectangle ${index + 1}`}
                className="w-[100%]"
                draggable="false"
              />
              
              <div className="absolute inset-1 flex flex-col items-center justify-center rounded-[7vw] sm:rounded-[3.2rem] overflow-hidden 
                md:rounded-[1rem] md:inset-0.5 
                lg:rounded-[1.1rem] lg:inset-1 
                xl:rounded-[1.7rem] xl:inset-1
                2xl:rounded-[2rem] 2xl:inset-1
                "
              >
                <div className="absolute inset-0 bg-black/40 sm:z-10" />
                
                <div className="absolute flex items-center justify-center text-white text-center z-20 border">
                  <p className="font-semibold">{card.desc}</p>
                </div>
                
                {/* Image wrapper */}
                <div className="w-full h-full">
                  <img
                    src={card.img}
                    alt={card.desc}
                    className="w-full h-full object-cover rounded-[2vw] 
                      md:w-[30%] h-[20%]"
                    draggable="false"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;