import React from 'react'
import video from "../assets/demo.mp4"
import large from '../assets/in(r).svg'
import small from '../assets/out(r).svg'
export const Recap = () => {
    return (
        // <div className='w-full'>
        //     <div className='bg-gradient-to-tr relative w-full from-[#000000] via-[#160441] via-[#2D0886] to-[#450DCB] flex justify-center py-7  md:py-12 lg:py-16'>
        //         <div className='relative w-[90vw]'>
        //             <img className='w-full' src="bg.svg" alt="" />
        //         </div>
        //         <div className='absolute top-0 p-[3vw] w-[90vw]'>
        //             <div className='text-end text-[#CAB5FF] font-[700] text-[3.5vw] md:text-[4.5vw] my-5 mb-[2vw] sm:my-[3.5vw] kode-mono sm:mb-[1.2vw] md:my-[3.5vw] md:mb-[1.5vw] lg:my-[2.5vw] lg:mb-[0vw]'>2K24 recap</div>
        // <div className='relative'>
        //     <video
        //         className='absolute h-full w-full rounded-[3.6vw] object-fill bottom-0 top-0'
        //         controls
        //         autoPlay
        //         muted
        //         loop
        //         disablePictureInPicture
        //         src={video}
        //     ></video>
        //     <img
        //         className='w-full relative z-10 pointer-events-none'
        //         src="bg2.svg"
        //         alt=""
        //     />
        // </div>
        //         </div>
        //     </div>
        // </div>
        <div className='py-[1rem] relative kode-mono'>
            <img src={large} className=' w-full' alt="" />

            <div className='absolute top-[4.5vw] left-[1rem]  sm:left-[1.5rem] md:top-[2rem] w-[90%] md:left-[1.7rem] lg:top-[2.3rem] lg:left-[2.3rem] xl:top-[3rem] xl:left-[2.5rem] 2xl:top-[3.5rem] 2xl:left-[3rem]'>
                <div className='text-end w-full'>
                    <h1 className='text-[5vw] sm:text-[2rem] md:text-[1.5rem] lg:text-[2rem] xl:text-[2.5rem] 2xl:text-[3rem] pr-[2rem] md:pr-[0rem] text-[#CAB5FF]'>RECAP</h1>
                </div>
                <div className='relative'>
                    <img
                        className='w-full z-10 pointer-events-none'
                        src={small}
                        alt=""
                    />
                    <video
                        className='absolute h-[100%] w-full rounded-[3vw] p-[2px] sm:rounded-[1.2rem] md:p-[2.5px] md:rounded-[1rem] lg:rounded-[1.7rem] lg:p-[3px] xl:rounded-[2.05rem] 2xl:rounded-[2.4rem] object-fill bottom-0 top-0 z-100'
                        controls
                        autoPlay
                        muted
                        loop
                        disablePictureInPicture
                        src={video}
                    ></video>
                    
                </div>

            </div>
        </div>
    )
}
