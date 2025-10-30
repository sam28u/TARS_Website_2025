import React, { useEffect, useState } from "react";
// Reference public assets via absolute paths
const large = "/large(lit).svg";
const small = "/small(lit).svg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Corousel = () => {
  const [api, setApi] = useState();
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  // const cards = [
  //   {
  //     id: 1,
  //     title: "Carbon Capture & Utilization (CCUS)",
  //     desc: "Turning pollution into power — capturing CO₂ from air and transforming it into fuels, materials, and cleaner air.",
  //     img: carboncapture,
  //   },
  //   {
  //     id: 2,
  //     title: "Space-Based Solar Power (SBSP)",
  //     desc: "Collecting sunlight in space and beaming it to Earth — providing 24/7 clean energy and revolutionizing global power supply.",
  //     img: sbsp,
  //   },
  //   {
  //     id: 3,
  //     title: "Biodegradable Electronics (Leaftronics)",
  //     desc: "Eco-friendly circuits made from natural materials — reducing e-waste and paving the way for sustainable gadgets.",
  //     img: leafronics,
  //   },
  //   {
  //     id: 4,
  //     title: "Next-Gen Solar Materials (Perovskite Cells)",
  //     desc: "Ultra-efficient solar panels that harvest more light with less cost — powering cities, satellites, and space stations.",
  //     img: perovskite,
  //   },
  //   {
  //     id: 5,
  //     title: "Electrochemical CO₂ Conversion",
  //     desc: "Using electricity to recycle carbon — converting captured CO₂ into fuels and chemicals for a greener circular economy.",
  //     img: electrochemical,
  //   },
  //   {
  //     id: 6,
  //     title: "Advanced Space Propulsion (Electric Thrusters)",
  //     desc: "Electric engines driving the future of exploration — faster, cleaner, and more efficient missions to the Moon and beyond.",
  //     img: electricThrusters,
  //   },
  //   {
  //     id: 7,
  //     title: "Neuromorphic Chips",
  //     desc: "Chips that mimic the human brain — enabling ultra-efficient AI and faster decision-making.",
  //     img: neuromorphic,
  //   },
  //   {
  //     id: 8,
  //     title: "Self-Powered Sensors (Energy Harvesting)",
  //     desc: "Tiny sensors that generate their own energy from motion, heat, or light.",
  //     img: sensors,
  //   },
  //   {
  //     id: 9,
  //     title: "Printed & Flexible Electronics",
  //     desc: "Circuits printed on paper, plastic, or fabric — foldable, wearable, and low-cost.",
  //     img: flexible,
  //   },
  //   {
  //     id: 10,
  //     title: "Bioelectronic Interfaces",
  //     desc: "Connecting electronics directly with living tissues for neural and health applications.",
  //     img: bioelectronic,
  //   },
  //   {
  //     id: 11,
  //     title: "Nanogenerators",
  //     desc: "Devices that convert small movements or vibrations into electricity.",
  //     img: nanogenerators,
  //   },
  // ];
  // --- State for data fetching ---
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // This is the API route you specified
  const api_url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/latest`;

  // --- New useEffect for data fetching ---
  useEffect(() => {
    const fetchTech = async () => {
      try {
        setLoading(true);
        const response = await fetch(api_url);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();

        // Handle if API returns an object { data: [...] } or just [...]
        const techList = Array.isArray(data) ? data : data.data || [];

        // Map backend fields to frontend fields
        const formattedData = techList.map((item) => ({
          id: item._id, // Map _id to id
          title: item.title,
          desc: item.summary, // Map summary to desc
          img: item.imageUrl, // Map imageUrl to img
        }));

        setCards(formattedData);
        setError(null);
      } catch (err) {
        console.error("Error fetching latest-in-tech:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTech();
  }, [api_url]); // Runs when api_url changes (or once on mount)

  // --- Auto-scroll functionality (unchanged) ---
  useEffect(() => {
    if (!api) return;

    let autoScrollInterval;

    const startAutoScroll = () => {
      if (!isUserInteracting) {
        autoScrollInterval = setInterval(() => {
          api.scrollNext();
        }, 3000);
      }
    };

    const stopAutoScroll = () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
      }
    };

    startAutoScroll();

    const handlePointerDown = () => {
      setIsUserInteracting(true);
      stopAutoScroll();
    };

    const handleSettle = () => {
      setTimeout(() => {
        setIsUserInteracting(false);
      }, 2000);
    };

    api.on("pointerDown", handlePointerDown);
    api.on("settle", handleSettle);

    return () => {
      stopAutoScroll();
      if (api) {
        api.off("pointerDown", handlePointerDown);
        api.off("settle", handleSettle);
      }
    };
  }, [api, isUserInteracting]);

  return (
    <div className="py-[1rem] relative kode-mono">
      <img src={large} className="hidden md:block w-full" alt="" />
      <img src={small} className="md:hidden w-full" alt="" />

      <div className="absolute top-[13vw] sm:top-[7vw] left-[1rem] md:top-[2rem] w-[90%] md:left-[1.7rem] lg:top-[3rem] lg:left-[2.3rem] ">
        <div className="text-end w-full">
          <h1 className="text-[5vw] sm:text-[2rem] md:text-[1.5rem] xl:text-[2.5rem] pr-[2rem] md:pr-[0rem] text-[#CAB5FF]">
            LATEST IN TECH
          </h1>
        </div>

        {/* --- Loading and Error handling --- */}
        {loading && (
          <div className="flex justify-center items-center h-40">
            <p className="text-white text-lg">Loading tech news...</p>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center h-40">
            <p className="text-red-500 text-lg">Error: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              loop: true,
              align: "start",
            }}
            onMouseEnter={() => setIsUserInteracting(true)}
            onMouseLeave={() => setIsUserInteracting(false)}
          >
            <CarouselContent className="gap-4 my-[4vw] md:my-[0.5rem] lg:my-[0.5rem] 2xl:my-[1.2rem]">
              {/* This map now uses the 'cards' state */}
              {cards.map((card) => (
                <CarouselItem
                  key={card.id}
                  className="w-full md:basis-1/3 lg:basis-1/3 flex justify-center"
                >
                  <div className="relative">
                    <img
                      src={small}
                      className="rounded h-[80vw] md:h-auto "
                      alt=""
                    />
                    <div
                      className="absolute top-[3.5vw] left-[3.5vw] md:top-[0.6rem] md:left-[0.6rem]
                    xl:top-[0.7rem] xl:left-[0.7rem]
                    2xl:top-[0.9rem] 2xl:left-[0.9rem] 
                    "
                    >
                      <div className="h-[42vw] md:h-[7rem] lg:h-[10.2rem] rounded-3xl xl:h-[13.2rem] 2xl:h-[15.7rem] aspect-[4/4] object-cover object-center md:rounded-xl lg:rounded-2xl xl:rounded-3xl shadow-md overflow-hidden ">
                        <img
                          src={card.img} // Now uses card.img which comes from item.imageUrl
                          alt={card.title}
                          className="w-full h-full object-cover hover:scale-110 ease-in-out duration-500 "
                        />
                      </div>
                      <h1
                        className="mt-[0.5rem] mb-[0.1rem] text-[3.5vw] w-[42vw] md:text-[0.5rem] md:my-[0.3rem] md:w-[7rem]
                      lg:text-[0.7rem] lg:my-[0.3rem] lg:w-[10rem]
                      xl:text-[0.9rem] xl:my-[0.5rem] xl:w-[12rem] 
                      2xl:text-[1.2rem] 2xl:my-[0.5rem] 2xl:w-[15rem]"
                      >
                        {card.title} {/* From item.title */}
                      </h1>
                      <h3
                        className="text-[1.9vw] w-[42vw]
                      md:text-[0.3rem] md:my-[0.1rem] md:w-[7rem]
                      lg:text-[0.5rem] lg:my-[0.3rem] lg:w-[10rem]
                      xl:text-[0.5rem] xl:my-[0.5rem] xl:w-[12rem]
                      2xl:text-[0.7rem] 2xl:my-[0.5rem] 2xl:w-[16rem]"
                      >
                        {card.desc} {/* From item.summary */}
                      </h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Controls below right */}
            <div className="flex justify-end gap-2 md:gap-2 mt-4 pr-[2rem] md:pr-[0rem]">
              <CarouselPrevious className="bg-transparent cursor-pointer hover:bg-white hover:text-black transition-all duration-400 border-none text-white p-2 rounded-full static" />
              <CarouselNext className="bg-transparent cursor-pointer hover:bg-white hover:text-black transition-all duration-400 border-none text-white p-2 rounded-full static" />
            </div>
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default Corousel;
