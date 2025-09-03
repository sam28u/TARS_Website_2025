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

const Corousel = () => {
  const [api, setApi] = useState()
  const [isUserInteracting, setIsUserInteracting] = useState(false)

  // Auto-scroll functionality
  useEffect(() => {
    if (!api) return

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

  return (
    <div className='py-[1rem] relative kode-mono'>
      <img src={large} className='hidden md:block w-full' alt="" />
      <img src={small} className='md:hidden w-full' alt="" />

      <div className='absolute top-[13vw] sm:top-[7vw] left-[1rem] md:top-[2rem] w-[90%] md:left-[1.7rem] lg:top-[3rem] lg:left-[2.3rem] '>
        <div className='text-end w-full'>
          <h1 className='text-[5vw] sm:text-[2rem] md:text-[1.5rem] xl:text-[2.5rem] pr-[2rem] md:pr-[0rem] text-[#CAB5FF]'>LATEST IN TECH</h1>
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
              <CarouselItem key={card.id} className="w-full md:basis-1/3 lg:basis-1/3 flex justify-center">
                <div className='relative'>
                  <img src={small} className="rounded h-[80vw] md:h-auto " alt="" />
                  <div className='absolute top-[3.5vw] left-[3.5vw] md:top-[0.6rem] md:left-[0.6rem]
                  xl:top-[0.7rem] xl:left-[0.7rem]
                  2xl:top-[0.9rem] 2xl:left-[0.9rem] 
                  '>
                    <img
                      src={card.img}
                      alt={card.title}
                      className="h-[42vw] md:h-[7rem] lg:h-[10.2rem] rounded-3xl xl:h-[13.2rem] 2xl:h-[15.7rem] aspect-[4/4] object-cover object-center md:rounded-xl lg:rounded-2xl xl:rounded-3xl shadow-md "
                    />
                    <h1 className='my-[1rem] text-[4.5vw] w-[42vw] md:text-[0.8rem] md:my-[0.1rem] md:w-[7rem]
                    lg:text-[1rem] lg:my-[0.3rem] lg:w-[10rem]
                    xl:text-[1.2rem] xl:my-[0.5rem] xl:w-[12rem] 
                    2xl:text-[1.5rem] 2xl:my-[0.5rem] 2xl:w-[15rem]'>{card.title}</h1>
                    <h3 className='my-[1rem] text-[1.5vw] w-[42vw]
                    md:text-[0.4rem] md:my-[0.1rem] md:w-[7rem]
                    lg:text-[0.5rem] lg:my-[0.3rem] lg:w-[10rem]
                    xl:text-[0.6rem] xl:my-[0.5rem] xl:w-[12rem]
                    2xl:text-[0.8rem] 2xl:my-[0.5rem] 2xl:w-[16rem]'>{card.desc}</h3>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Controls below right */}
          <div className="flex justify-end gap-2 md:gap-2 mt-4 pr-[2rem] md:pr-[0rem]">
            <CarouselPrevious 
              className="bg-transparent cursor-pointer hover:bg-white hover:text-black transition-all duration-400 border-none text-white p-2 rounded-full static"
              
            />
            <CarouselNext 
              className="bg-transparent cursor-pointer hover:bg-white hover:text-black transition-all duration-400 border-none text-white p-2 rounded-full static"
              
            />
          </div>
        </Carousel>
      </div>
    </div>
  )
}

export default Corousel


