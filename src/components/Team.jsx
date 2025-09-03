import React from "react";
import "../ourteam.css"
import teamimg from '../assets/img(t).svg'

const Team = () => {
  return (
    <div className="py-[2rem] w-[100%] md:py-[2rem] text-white flex flex-col items-center justify-center">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl our-team-title font-bold mb-7 md:mb-12 w-[80%] text-end">
        Our Team
      </h1>

      {/* Team Members */}
      <div className="flex  justify-between px-[3vw] md:px-[0rem] lg:px-[3rem] xl:px-[7rem] 2xl:px-[12rem] gap-4 md:gap-16 w-full">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center w-[40%] sm:w-[30%] md:w-auto">
            {/* Circle Image */}
            <div className="w-[14vw] h-[14vw] sm:w-[18vw] sm:h-[18vw] md:w-[12vw] md:h-[12vw] max-w-[7rem] max-h-[7rem]   mb-4">
              <img src={teamimg} className="h-full w-full" alt="" />
            </div>

            {/* Name */}
            <h2 className="font-bold tracking-wide text-xs  .name-text  sm:text-base md:text-lg">NAME</h2>

            {/* Designation */}
            <p className="text-xs sm:text-sm text-gray-400">DESIGNATION</p>
          </div>
        ))}
      </div>

      {/* Meet All */}
      <div className="mt-10 w-[80%]  text-end">
        <a
          href="#"
          className="text-[#CAB5FF] our-team-title hover:text-purple-300 transition text-sm sm:text-base "
        >
          MEET ALL →
        </a>
      </div>
    </div>
  );
};

export default Team;
