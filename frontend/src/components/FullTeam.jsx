import React, { useRef, useEffect, useState } from "react";
const teamimg = '/img(t).svg'; // fallback image
import Link from 'next/link';
// authorities
const dkrout = '/team/dkrout.webp'
const sridhar = '/team/sridhar.webp'
// secretaries
const sec = '/team/jp.webp'
const jsec1 = '/team/shruti.webp'
const jsec2 = '/team/ankit.webp'
// leads
const akash = '/team/akash.webp'
const swaroop = '/team/swaroop.webp'
const gashish = '/team/ganta_ashish.webp'
const satyajit = '/team/satyajit.webp'
// members
const abhayPratapSingh = '/team/AbhayPratapSingh.webp';
const abhijeetRaj = '/team/AbhijeetRaj.webp';
const ashisKumarSarkar = '/team/AshisKumarSarkar.webp';
const atulKumar = '/team/AtulKumar.webp';
const ayushKumar = '/team/AyushKumar.webp';
const debiPrasadSahoo = '/team/DebiPrasadSahoo.webp';
const eklavyaAnandSingh = '/team/EklavyaAnandSingh.webp';
const harshYadav = '/team/HarshYadav.webp';
const louhanRout = '/team/LouhanRout.webp';
const manishaMohanty = '/team/ManishaMohanty.webp';
const nimishBothe = '/team/NimishBothe.webp';
const nirmalKumarPatra = '/team/NirmalKumarPatra.webp';
const ommPrakashSahoo = '/team/OmmPrakashSahoo.webp';
const piyushPriyaranjan = '/team/PiyushPriyaranjan.webp';
const pratyushaSathapathy = '/team/PratyushaSatapathy.webp';
const rathikrindSaathwik = '/team/RathikrindaSaathwik.webp';
const rishalSwain = '/team/RishalSwain.webp';
const rudraPrasadMishra = '/team/RudraPrasadMishra.webp';
const sipraSwagatika = '/team/SipraSwagatika.webp';
const snehalSubudhi = '/team/SnehalSubudhi.webp';
const sundramKumar = '/team/SundramKumar.webp';



// Team data divided into sections
const teamData = {
  authorities: [
    { id: "1", name: "DEEPAK KUMAR ROUT", role: "MENTOR", image: dkrout, about: "UI/UX lover." },
    { id: "2", name: "VENKATA SRIDHAR THATIPARTHI", role: "MENTOR", image: sridhar, about: "Deployment pro." },
  ],
  secretaries: [
    { id: "4", name: "JAGADESWAR PATI", role: "SECRETARY", image: sec },
    { id: "5", name: "SHRUTI PATRO", role: "JOINT-SECRETARY", image: jsec1 },
    { id: "6", name: "ANKIT KUMAR MUDULI", role: "JOINT-SECRETARY", image: jsec2 },
  ],
  leads: [
    { id: "7", name: "AKASH", role: "MARKETING AND SPONSORSHIP", image: akash, about: "Pixel perfect." },
    { id: "8", name: "SWAROOP", role: "TECH", image: swaroop, about: "Loves models." },
    { id: "9", name: "ASHISH", role: "MEDIA ", image: gashish, about: "Query queen." },
    { id: "10", name: "SATYAJIT", role: "GRAPHICS", image: satyajit, about: "Does it all." },
  ],
  members: [
    { id: "11", name: "ABHAY PRATAP SINGH", role: "MARKETING AND OUTREACH", image: abhayPratapSingh },
    { id: "12", name: "ABHIJEET RAJ", role: "RESEARCH AND CONTENT", image: abhijeetRaj },
    { id: "14", name: "ASHIS KUMAR SARKAR", role: "TECH", image: ashisKumarSarkar },
    { id: "15", name: "ATUL KUMAR", role: "TECH", image: atulKumar },
    { id: "16", name: "AYUSH KUMAR", role: "RESEARCH AND CONTENT", image: ayushKumar },
    { id: "17", name: "DEBI PRASAD SAHOO", role: "RESEARCH AND CONTENT", image: debiPrasadSahoo },
    { id: "18", name: "EKLAVYA ANAND SINGH", role: "RESEARCH AND CONTENT", image: eklavyaAnandSingh },
    { id: "19", name: "HARSH YADAV", role: "TECH", image: harshYadav },
    { id: "20", name: "LOUHAN ROUT", role: "TECH", image: louhanRout },
    { id: "21", name: "MANISHA MOHANTY", role: "MEDIA AND GRAPHICS", image: manishaMohanty },
    { id: "22", name: "NIMISH BOTHE", role: "TECH", image: nimishBothe },
    { id: "23", name: "NIRMAL KUMAR PATRA", role: "TECH", image: nirmalKumarPatra },
    { id: "24", name: "OMM PRAKASH SAHOO", role: "TECH", image: ommPrakashSahoo },
    { id: "25", name: "PIYUSH PRIYARANJAN", role: "TECH", image: piyushPriyaranjan },
    { id: "26", name: "PRATYUSHA SATAPATHY", role: "TECH", image: pratyushaSathapathy },
    { id: "27", name: "RATHIKRIND SAATHWIK", role: "MEDIA AND GRAPHICS", image: rathikrindSaathwik },
    { id: "28", name: "RISHAL SWAIN", role: "TECH", image: rishalSwain },
    { id: "29", name: "RUDRA PRASAD MISHRA", role: "TECH", image: rudraPrasadMishra },
    { id: "30", name: "SIPRA SWAGATIKA", role: "TECH", image: sipraSwagatika },
    { id: "31", name: "SNEHAL SUBUDHI", role: "TECH", image: snehalSubudhi },
    { id: "33", name: "SUNDRAM KUMAR", role: "TECH", image: sundramKumar },
  ],
};

// TeamMember card component
function TeamMember({ member }) {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center transform transition duration-700 ease-out 
                  ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
    >
      {/* Circle Image */}
      <div className="w-[20vw] h-[20vw] relative sm:w-[22vw] sm:h-[22vw] md:w-[16vw] md:h-[16vw] lg:w-[14vw] lg:h-[14vw] max-w-[12rem] max-h-[12rem] mb-4">
        <img src={teamimg} className="h-full w-full" alt="" />
        {member.image && (
          <img
            src={member.image}
            className="w-[95%] h-[95%] absolute top-[0.25rem] left-[0.35rem] rounded-full object-cover"
            alt={member.name}
          />
        )}
      </div>

      {/* Name */}
      <h2 className="font-bold tracking-wide text-sm sm:text-base md:text-lg text-center">
        {member.name}
      </h2>

      {/* Role */}
      <p className="text-xs sm:text-sm text-gray-400 text-center">{member.role}</p>
    </div>
  );
}


// Component for a section
function TeamSection({ title, members }) {
  return (
    <div className="w-full mb-12">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 border-b border-gray-600 pb-2 text-center sm:text-left">
        {title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 w-full">
        {members.map((member) => (
          <TeamMember key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}

// FullTeam component
function FullTeam() {

  // --- ADD THIS HOOK ---
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // The empty array [] ensures this runs only once when the component mounts

  return (
    <div className="py-[2rem] container mx-auto w-[100%] px-[5vw] md:py-[5rem] bg-transparent text-white flex flex-col items-center justify-center">
      {/* Title and Back Link */}
      <div className="flex w-full mb-8 items-center justify-between">
  <Link href="/" className="text-blue-400 hover:underline">← Back</Link>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
          Our Team
        </h1>
      </div>

      {/* Team Sections */}
      <TeamSection title="Authorities" members={teamData.authorities} />
      <TeamSection title="Secretaries" members={teamData.secretaries} />
      <TeamSection title="Leads" members={teamData.leads} />
      <TeamSection title="Members" members={teamData.members} />
    </div>
  );
}

export default FullTeam;
