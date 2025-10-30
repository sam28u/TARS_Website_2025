import React from 'react'

// Use public/ files via absolute paths in Next.js
const large = '/in(r).svg'
const small = '/out(r).svg'
export const Recap = () => {
    return (
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
                        src="https://res.cloudinary.com/dxfl4y6bw/video/upload/v1761032150/demo_c_upt0jn.mp4"
                    ></video>
                    
                </div>

            </div>
        </div>
    )
}
