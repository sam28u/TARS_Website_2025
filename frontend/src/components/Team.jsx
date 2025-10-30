import React from "react";

// Image paths are already correctly formatted for the Next.js `public` directory
const teamimg = '/img(t).svg';
const sec = '/team/jp.webp';
const jsec1 = '/team/shruti.webp';
const jsec2 = '/team/ankit.webp';

const Team = () => {
  const secretaries = [
    { id: "4", name: "JAGADESWAR PATI", role: "SECRETARY", image: sec },
    { id: "5", name: "SHRUTI PATRO", role: "JOINT-SECRETARY", image: jsec1 },
    {
      id: "6",
      name: "ANKIT KUMAR MUDULI",
      role: "JOINT-SECRETARY",
      image: jsec2,
    },
  ];
  return (
    <div className="py-[2rem] w-[100%] md:py-[2rem] text-white flex flex-col items-center justify-center">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl our-team-title font-bold mb-7 md:mb-12 w-[80%] text-end">
        Our Team
      </h1>

      {/* Team Members */}
      <div className="flex justify-center px-[3vw] md:px-[0rem] lg:px-[3rem] xl:px-[7rem] 2xl:px-[12rem] gap-4 md:gap-10 lg:gap-16 w-full">
        {secretaries.map((i) => (
          <div
            key={i.id} // Fixed: Use a unique ID for the key
            className="flex flex-col items-center w-[40%] sm:w-[30%] md:w-auto"
          >
            {/* Circle Image */}
            <div className="w-[14vw] h-[14vw] relative sm:w-[18vw] sm:h-[18vw] md:w-[12vw] md:h-[12vw] max-w-[12rem] max-h-[12rem] mb-4">
              <img src={teamimg} className="h-full w-full" alt="" />
              <img
                src={i.image}
                className="w-[95%] h-[95%] absolute top-[0.19rem] border-none left-[0.18rem] lg:left-[0.3rem] xl:left-[0.4rem] rounded-[100%]"
                alt={i.name}
              />
            </div>

            {/* Name */}
            <h2 className="font-bold tracking-wide text-xs text-center .name-text  sm:text-base md:text-sm lg:text-lg xl:text-xl">
              {i.name}
            </h2>

            {/* Designation */}
            <p className="text-xs sm:text-sm text-center text-gray-400">
              {i.role}
            </p>
          </div>
        ))}
      </div>

      {/* Meet All */}
      <div className="mt-10 w-[80%] text-end">
        <a
          href="/teams"
          className="text-[#CAB5FF] our-team-title hover:text-purple-300 transition text-sm sm:text-base "
        >
          MEET ALL →
        </a>
      </div>
    </div>
  );
};

export default Team;

