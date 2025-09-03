import React, { useEffect, useState } from 'react'
import large from '../assets/large(lit).svg'
import small from '../assets/small(lit).svg'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// Sample card data
const cards = [
  {
    id: 1,
    title: "AI Assistants",
    desc: "Virtual assistants like ChatGPT and Copilot are transforming how people work, code, and create content.",
    img: "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    title: "Quantum Computing",
    desc: "Tech giants are racing to build stable quantum processors capable of solving problems classical computers can't.",
    img: "https://images.unsplash.com/photo-1666112835156-c65bb806ac73?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 3,
    title: "5G Expansion",
    desc: "With faster speeds and low latency, 5G networks are powering IoT, AR/VR, and smart city applications.",
    img: "https://plus.unsplash.com/premium_photo-1733259750830-4cc0bd8d3979?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 4,
    title: "Green Tech",
    desc: "From solar energy breakthroughs to EV batteries, innovations in clean tech are reducing carbon footprints.",
    img: "https://plus.unsplash.com/premium_photo-1679607677942-d07fcab72502?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 5,
    title: "Cybersecurity",
    desc: "As cyberattacks grow, companies are adopting AI-driven threat detection and zero-trust security models.",
    img: "https://plus.unsplash.com/premium_photo-1701179596614-9c64f50cda76?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 6,
    title: "AR & VR",
    desc: "Immersive AR/VR experiences are reshaping gaming, education, and remote collaboration.",
    img: "https://images.unsplash.com/photo-1736502408052-d97c63e04388?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
]

const Projects = () => {
  const [api, setApi] = useState()
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  // Auto-scroll functionality
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
        }, 3000) // Auto-scroll every 3 seconds
      }
    }

    const stopAutoScroll = () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval)
      }
    }

    // Start auto-scroll
    startAutoScroll()

    // Stop auto-scroll on user interaction
    const handlePointerDown = () => {
      setIsUserInteracting(true)
      stopAutoScroll()
    }

    const handleSettle = () => {
      setTimeout(() => {
        setIsUserInteracting(false)
      }, 2000) // Resume after 2 seconds of no interaction
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

  // Resume auto-scroll when user stops interacting
  useEffect(() => {
    if (!api || isUserInteracting) return

    const autoScrollInterval = setInterval(() => {
      api.scrollNext()
    }, 3000)

    return () => {
      clearInterval(autoScrollInterval)
    }
  }, [api, isUserInteracting])

  // Handle dot click
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

      <div className='absolute top-[10vw] sm:top-[10vw] left-[1.2vw] md:top-[3rem] w-[90%] md:left-[1.7rem] lg:top-[3rem] lg:left-[2.3rem] '>
        <div className='text-end w-full'>
          <h1 className='text-[6vw] sm:text-[3rem] md:text-[1.5rem] xl:text-[2.5rem] pr-[0rem] md:pr-[0rem] text-[#CAB5FF]'>Projects</h1>
        </div>

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
            {cards.map((card) => (
              <CarouselItem key={card.id} className="relative flex justify-center">
                <div className="w-full flex flex-col pl-[1rem] sm:pl-[0rem] md:gap-[1rem] my-[1vw] sm:my-[1rem] md:my-[1rem] lg:my-[2rem] xl:my-[3rem] 2xl:my-[4rem] items-center md:flex-row lg:gap-[1.5rem] justify-center xl:pl-[1rem] xl:gap-[3rem]">
                  <img
                    src={card.img}
                    alt={card.title}
                    className=" w-[100%] md:w-[12rem] aspect-4/3 lg:w-[17rem] xl:w-[21rem] 2xl:w-[25rem] object-cover object-center rounded-2xl shadow-md "
                  />
                  <div className='h-full md:pt-[1rem]'>
                    <h1 className="text-[5vw] my-[2.5vw] sm:text-[2rem] sm:my-[1rem] md:text-sm lg:text-base xl:text-lg 2xl:text-xl font-semibold">
                      {card.title}
                    </h1>
                    <h3 className="text-[3vw] sm:text-[1rem] md:text-[0.6rem] md:mt-[0.7rem] lg:text-sm xl:text-base 2xl:text-lg text-gray-300">
                      {card.desc}
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
            
            {/* Dot indicators */}
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
      </div>
    </div>
  )
}

export default Projects