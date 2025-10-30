import "../../src/app/globals.css";
import React from 'react';
const logo = '/logo(lit).svg';
const tars = '/TARS(lit).svg';


const Tarslogo = () => {
  return (
    <div className='flex flex-col gap-7 items-center py-[3rem] shimmer'>
      <div>
        <img src={logo} className=" p-min(3vw , 3rem)" alt="TARS Logo" />
      </div>
      <div>
        {/* <img src={tars} alt="TARS Logo small" /> */}
        <div className="shimmer flex flex-col font-[Maztech] text-[3.5rem] sm:text-[5rem] md:text-[5rem]">
          <span>T</span>
          <span>A</span>
          <span>R</span>
          <span>S</span>
        </div>
      </div>
    </div>
  );
};

export default Tarslogo;