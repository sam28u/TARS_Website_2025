"use client";

import { useState, useEffect } from "react";

// In Next.js, files in the `public` folder are served from the root.
// They should be referenced with a leading slash, not imported.
const desktopBorder = "/desktop-border(le).svg";
const mobileBorder = "/mobile-border(le).svg";
const desktopRect = "/desktop-inner-rectangle(le).svg";
const mobileRect = "/mobile-inner-rectangle(le).svg";

// --- Removed all unused/hardcoded image imports ---

function LiveEvents() {
  const [windowWidth, setWindowWidth] = useState(0);

  // --- State for data fetching ---
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- New useEffect for data fetching ---
  useEffect(() => {
    // Assumes your API route is /api/liveevents based on your model name
    const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/live-events`;

    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();

        const eventList = Array.isArray(data) ? data : data.data || [];

        // Map backend fields to frontend fields
        const formattedData = eventList.map((item) => ({
          id: item._id,             // Use _id for the unique key
          img: item.imageUrl,
          desc: item.desc || "Event", // Fallback: Update your model!
          link: item.link || "#",     // Fallback: Update your model!
        }));

        setCards(formattedData);
        setError(null);
      } catch (err) {
        console.error("Error fetching live events:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []); // Runs once on mount

  // --- This window logic is unchanged ---
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth <= 768;

  // --- Hardcoded 'cards' array removed ---

  return (
    <div className="custom-bg w-full flex justify-center overflow-x-hidden py-7 md:py-12 lg:py-16">
      <div className="relative w-full flex justify-center box-border sm:p-0 ">
        <img
          src={isMobile ? mobileBorder : desktopBorder}
          alt="Responsive Border"
          className="w-full"
          draggable="false"
        />

        {/* Scrollable div */}
        <div
          className="absolute w-[80%] rounded-4xl h-[80%] top-[15%] overflow-y-auto flex flex-col items-center gap-y-[5%] scroll-hide
          sm:top-[12%] 
          md:top-[15%] md:w-[95%] md:h-[80%]
          lg:top-[17%] brightness-140"
        >
          {/* --- Loading and Error handling --- */}
          {loading && (
            <div className="flex justify-center items-center h-full">
              <p className="text-white text-lg">Loading events...</p>
            </div>
          )}

          {error && (
            <div className="flex justify-center items-center h-full">
              <p className="text-red-500 text-lg">Error: {error}</p>
            </div>
          )}

          {/* --- Render events only when data is ready --- */}
          {!loading && !error && cards.map((card) => (
            <div key={card.id} className="relative w-[100%]"> {/* Changed key to card.id */}
              <img
                src={isMobile ? mobileRect : desktopRect}
                alt={`Rectangle for ${card.desc}`}
                className="w-[100%]"
                draggable="false"
              />
              <a href={card.link} target="_blank" rel="noopener noreferrer">
                <div
                  className="absolute inset-1 flex flex-col items-center justify-center rounded-[7vw] sm:rounded-[3.2rem] overflow-hidden 
                  md:rounded-[1rem] md:inset-0.5 
                  lg:rounded-[1.1rem] lg:inset-1 
                  xl:rounded-[1.7rem] xl:inset-1
                  2xl:rounded-[2rem] 2xl:inset-1
                  "
                >
                  <div className="absolute inset-0 bg-black/40 sm:z-10" />
                  <div className="w-full h-full">
                    <img
                      src={card.img}
                      alt={card.desc}
                      className="w-full h-full md:object-cover rounded-[2vw] 
                      md:w-full "
                      draggable="false"
                    />
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LiveEvents;