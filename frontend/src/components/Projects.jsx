import React, { useEffect, useState } from 'react'
const large = '/large(lit).svg'
const small = '/small(lit).svg'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// --- Removed all hardcoded image imports (Agriculture, sandrover, etc.) ---
// --- Removed hardcoded 'cards' array ---

const Projects = () => {
  const [api, setApi] = useState()
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  // --- State for data fetching ---
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- New useEffect for data fetching ---
  useEffect(() => {
    // Assumes your API route is /api/projects based on your model name
    const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects`;

    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();

        // Handle if API returns an object { data: [...] } or just [...]
        const projectList = Array.isArray(data) ? data : data.data || [];

        // Map backend fields (Project model) to frontend fields (component needs)
        const formattedData = projectList.map((item) => ({
          id: item._id,             // Map _id to id
          title: item.title,
          desc: item.description,   // Map description to desc
          img: item.imageUrl        // Map imageUrl to img
        }));

        setCards(formattedData);
        setError(null);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []); // Empty dependency array ensures this runs once on mount

  // --- Auto-scroll functionality (unchanged) ---
  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })

    let autoScrollInterval

    const startAutoScroll = () => {
      if (!isUserInteracting) {
        autoScrollInterval = setInterval(() => {
          api.scrollNext()
        }, 3000)
      }
    }

    const stopAutoScroll = () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval)
      }
    }

    startAutoScroll()

    const handlePointerDown = () => {
      setIsUserInteracting(true)
      stopAutoScroll()
    }

    const handleSettle = () => {
      setTimeout(() => {
        setIsUserInteracting(false)
      }, 2000)
    }

    api.on('pointerDown', handlePointerDown)
    api.on('settle', handleSettle)

    return () => {
      stopAutoScroll()
      if (api) {
        api.off('pointerDown', handlePointerDown)
        api.off('settle', handleSettle)
        api.off("select")
      }
    }
  }, [api, isUserInteracting])

  // --- handleDotClick (unchanged) ---
  const handleDotClick = (index) => {
    if (api) {
      api.scrollTo(index)
      setIsUserInteracting(true)
      setTimeout(() => {
        setIsUserInteracting(false)
      }, 2000)
    }
  }

  return (
    <div className='py-[1rem] relative kode-mono'>
      <img src={large} className='hidden md:block w-full' alt="" />
      <img src={small} className='md:hidden w-full' alt="" />

      <div className='absolute top-[7vw] sm:top-[10vw] left-[1.5vw] sm:left-[3vw] md:top-[2rem] w-[90%] md:left-[1.7rem] lg:top-[3rem] lg:left-[2.3rem]'>
        <div className='text-end w-full'>
          <h1 className='text-[6vw] sm:text-[3rem] md:text-[1.5rem] xl:text-[2.5rem] pr-[0rem] md:pr-[0rem] text-[#CAB5FF]'>Projects</h1>
        </div>

        {/* --- Loading and Error handling --- */}
        {loading && (
          <div className="flex justify-center items-center h-40">
            <p className="text-white text-lg">Loading projects...</p>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center h-40">
            <p className="text-red-500 text-lg">Error: {error}</p>
          </div>
        )}

        {/* --- Render carousel only when data is ready --- */}
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
            <CarouselContent className="gap-4 my-[0vw] md:my-[0.5rem] lg:my-[0.5rem] 2xl:my-[1.2rem]">
              {/* This map now uses the 'cards' state */}
              {cards.map((card) => (
                <CarouselItem key={card.id} className="relative flex justify-center">
                  <div className="w-full flex flex-col pl-[1rem] sm:pl-[0rem] md:gap-[1rem] my-[1vw] sm:my-[1rem] md:my-[1rem] lg:my-[2rem] xl:my-[3rem] 2xl:my-[4rem] items-center md:flex-row lg:gap-[1.5rem] justify-center xl:pl-[1rem] xl:gap-[3rem]">
                    <img
                      src={card.img} // From item.imageUrl
                      alt={card.title}
                      className=" w-[100%] md:w-[12rem] aspect-4/3 lg:w-[17rem] xl:w-[21rem] 2xl:w-[25rem] object-cover object-top rounded-2xl shadow-md"
                    />
                    <div className='h-full md:pt-[1rem]'>
                      <h1 className="text-[5vw] my-[2.5vw] sm:text-[2rem] sm:my-[1rem] md:text-sm lg:text-base xl:text-lg 2xl:text-xl font-semibold">
                        {card.title} {/* From item.title */}
                      </h1>
                      <h3 className="text-[3vw] sm:text-[1rem] md:text-[0.6rem] md:mt-[0.7rem] lg:text-sm xl:text-base 2xl:text-lg text-gray-300">
                        {card.desc} {/* From item.description */}
                      </h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Controls with dot indicators */}
            <div className="text-end md:flex justify-between items-start gap-4 md:gap-4 mt-4 md:pr-[0rem]">
              <CarouselPrevious
                className="bg-transparent cursor-pointer hover:bg-white hover:text-black transition-all duration-400 border-none text-white p-2 rounded-full static"
              />
              
              <div className=" gap-2 hidden md:flex items-center justify-center">
                {Array.from({ length: count }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`w-2 h-2 cursor-pointer rounded-full transition-all duration-300 ${
                      current === index + 1
                        ? 'bg-[#CAB5FF] scale-125'
                        : 'bg-gray-500 hover:bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <CarouselNext
                className="bg-transparent cursor-pointer hover:bg-white hover:text-black transition-all duration-400 border-none text-white p-2 rounded-full static"
              />
            </div>
          </Carousel>
        )}
      </div>
    </div>
  )
}

export default Projects