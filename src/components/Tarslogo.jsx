import React from 'react';
import logo from '../assets/logo(lit).svg';
import tars from '../assets/TARS(lit).svg';

const Tarslogo = () => {
  return (
    <div className='flex flex-col gap-7 items-center py-[3rem]'>
      <div>
        <img src={logo} className=" p-min(3vw , 3rem)" alt="TARS Logo" />
      </div>
      <div>
        <img src={tars} alt="TARS Logo small" />
      </div>
    </div>
  );
};

export default Tarslogo;