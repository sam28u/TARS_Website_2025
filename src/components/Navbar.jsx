import React from 'react';
import nav from '../assets/nav(lit).svg';

const Navbar = ({ refs }) => {
    const handleScroll = (ref) => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    return (
        <div className="relative inline-block">
            <img className="py-[3vw]" src={nav} alt="" />

            <div className="absolute md:top-[5rem] md:text-[0.9rem] lg:text-[1rem] md:left-[1.3rem] lg:top-[7rem] lg:left-[2.5rem]">
                <ul className='text-[#CAB5FF] flex flex-col md:gap-[min(2.5rem,200px)] lg:gap-[min(4.5rem,200px)] kode-mono'>
                    <li
                        className="relative group w-fit cursor-pointer font-bold hover:text-white duration-300"
                        onClick={() => handleScroll(refs.aboutUsRef)}
                    >
                        About Us
                        <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-white transition-all duration-500 group-hover:w-full"></span>
                    </li>
                    <li
                        className="relative group w-fit cursor-pointer font-bold hover:text-white duration-300"
                        onClick={() => handleScroll(refs.latestRef)}
                    >
                        Latest
                        <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-white transition-all duration-500 group-hover:w-full"></span>
                    </li>
                    <li
                        className="relative group w-fit cursor-pointer font-bold hover:text-white duration-300"
                        onClick={() => handleScroll(refs.pastRef)}
                    >
                        Past
                        <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-white transition-all duration-500 group-hover:w-full"></span>
                    </li>
                    <li
                        className="relative group w-fit cursor-pointer font-bold hover:text-white duration-300"
                        onClick={() => handleScroll(refs.projectsRef)}
                    >
                        Projects
                        <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-white transition-all duration-500 group-hover:w-full"></span>
                    </li>
                    <li
                        className="relative group w-fit cursor-pointer font-bold hover:text-white duration-300"
                        onClick={() => handleScroll(refs.ourTeamRef)}
                    >
                        Our Team
                        <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-white transition-all duration-500 group-hover:w-full"></span>
                    </li>
                    <li
                        className="relative group w-fit cursor-pointer font-bold hover:text-white duration-300"
                        onClick={() => handleScroll(refs.galleryRef)}
                    >
                        Gallery
                        <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-white transition-all duration-500 group-hover:w-full"></span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;