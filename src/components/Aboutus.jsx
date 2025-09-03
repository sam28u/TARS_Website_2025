import borderDesktop from "../assets/desktop-border(au).svg";
import borderMobile from "../assets/mobile-border(au).svg";
import tarsIcon from "../assets/tars-icon(au).svg";

export default function App() {
  return (
    <div className="flex justify-top items-start m-0 p-5 min-w-[200px] overflow-x-hidden md:items-start md:justify-center lg:text-[17px] lg:items-start lg:justify-center xl:text-[18px] xl:items-start xl:justify-center">
      <div className="relative w-full max-w-[1228px] mt-[20px] m-0 p-0 top-[5%] box-border sm:overflow-hidden md:p-[10px] lg:p-[20px]">
        <img
          src={borderMobile}
          draggable="false"
          alt="Mobile Border"
          className="block md:hidden w-full min-w-[150px] max-w-[767px] h-auto"
        />
        <img
          src={borderDesktop}
          draggable="false"
          alt="Desktop Border"
          className="hidden md:block w-full max-w-[1220px] h-auto"
        />
        <img
          className="hidden md:block absolute z-[100] top-[15%] left-[25%] max-w-[500px] w-[50%] h-auto sm:w-[50%] sm:left-[25%] sm:top-[15%] md:w-[35%] md:top-[25%] md:left-[8%] lg:w-[35%] lg:top-[25%] lg:left-[8%] hover:animate-float"
          src={tarsIcon}
          draggable="false"
          alt="TARS Logo"
        />
        <div className="flex flex-col absolute justify-start items-start text-[#CAB5FF] font-kode select-none cursor-default top-[10%] left-[10%] m-0 p-0 max-w-[600px] w-[80%] z-[1000] sm:w-[80%] sm:left-[10%] sm:top-[10%] sm:z-[1000] md:top-[15%] md:w-[45%] md:left-[50%] lg:top-[10%] lg:w-[45%] lg:left-[50%] xl:top-[10%]">
          <p className="m-0 p-0 pb-[2%] text-[5vw] sm:text-[5.5vw] sm:pb-[4%] md:text-[5vw] md:pb-[3%] lg:text-5rem xl:text-[4rem] lg:pb-[1%] opacity-0 animate-slideUp animation-delay-200">
            About Us
          </p>
          <p className="m-0 p-0 pb-[3%] text-[3.3vw] z-10 sm:text-[3.5vw] sm:pb-[3%] md:text-[1.8vw] md:pb-[3%] lg:text-3rem xl:text-[1.5rem] lg:pb-[4%] opacity-0 animate-slideUp animation-delay-900">
            Robots are taking over! <br />
            If you ever wanted to know the ins and outs of robotics, or better, make your own robots, then this is the place for you. <br />
            We are an engineering society dedicated to the fields of automation and robotics. We include members from all branches, be it circuital or non-circuital with only one thing in common:CURIOSITY.
            We empower students to bridge theory and implementation, enabling solutions that merge embedded hardware, machine learning, AI, and automation.
          </p>
        </div>
      </div>
    </div>
  );
}
