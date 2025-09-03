// src/pages/FullTeam.jsx

import React from "react";

const teamMembers = [
  {
    id: "1",
    name: "Alice",
    role: "Frontend Developer",
    image: "",
    about: "UI/UX lover.",
  },
  {
    id: "2",
    name: "Bob",
    role: "Backend Developer",
    image: "",
    about: "Node.js expert.",
  },
  {
    id: "3",
    name: "Charlie",
    role: "DevOps Engineer",
    image: "",
    about: "Deployment pro.",
  },
  {
    id: "4",
    name: "David",
    role: "Product Manager",
    image: "",
    about: "Visionary planner.",
  },
  {
    id: "5",
    name: "Eva",
    role: "QA Engineer",
    image: "",
    about: "Bug hunter.",
  },
  {
    id: "6",
    name: "Frank",
    role: "Security Analyst",
    image: "",
    about: "Keeps it safe.",
  },
  {
    id: "7",
    name: "Grace",
    role: "UI Designer",
    image: "",
    about: "Pixel perfect.",
  },
  {
    id: "8",
    name: "Helen",
    role: "AI Developer",
    image: "",
    about: "Loves models.",
  },
  {
    id: "9",
    name: "Ivy",
    role: "Database Admin",
    image: "",
    about: "Query queen.",
  },
  {
    id: "10",
    name: "Jack",
    role: "Full Stack Dev",
    image: "",
    about: "Does it all.",
  },
];

function FullTeam() {
  return (
    <div className="py-[2rem] container mx-auto w-[100%] px-[5vw] md:py-[5rem] bg-blue-200 to-black text-white flex flex-col items-center justify-center">
      {/* Title */}
      <div className="flex w-full our-team-title justify-between   ">
        <a href="">back</a>
        <h1 className="text-2xl our-team-title sm:text-3xl md:text-4xl font-bold mb-7 md:mb-12 text-center">
          Our Team
        </h1>
        
      </div>

      {/* Team Members */}
      <div className="grid grid-cols-3 gap-8 w-full">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <div key={i} className="flex flex-col items-center">
            {/* Circle Image */}
            <div className="w-[20vw] h-[20vw] sm:w-[14vw] sm:h-[14vw] md:w-[10vw] md:h-[10vw] max-w-[10rem] max-h-[10rem] rounded-full bg-gray-800 mb-4">
              
            </div>
      
            {/* Name */}
            <h2 className="font-bold tracking-wide text-sm sm:text-base md:text-lg">
              NAME
            </h2>

            {/* Designation */}
            <p className="text-xs sm:text-sm text-gray-400">DESIGNATION</p>
          </div>
        ))}
      </div>

      {/* Meet All */}
    </div>
  );
}

export default FullTeam;
