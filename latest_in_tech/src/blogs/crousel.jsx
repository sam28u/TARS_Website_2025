import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './latest_in_tech.css';

const slides = [
  {
    id: '1',
    name: 'News Title 1',
    image: 'https://wallpapercave.com/wp/wp3344569.jpg',
    about: 'Lorem ipsum dolor sit amet.'
  },
  {
    id: '2',
    name: 'News Title 2',
    image: 'https://wallpapercave.com/wp/wp3344569.jpg',
    about: 'Sed do eiusmod tempor incididunt.'
  },
  {
    id: '3',
    name: 'News Title 3',
    image: 'https://wallpapercave.com/wp/wp3344569.jpg',
    about: 'Ut enim ad minim veniam.'
  },
  {
    id: '4',
    name: 'News Title 4',
    image: 'https://wallpapercave.com/wp/wp3344569.jpg',
    about: 'Quis nostrud exercitation ullamco.'
  },
  {
    id: '5',
    name: 'News Title 5',
    image: 'https://wallpapercave.com/wp/wp3344569.jpg',
    about: 'Laboris nisi ut aliquip ex ea commodo.'
  },
  {
    id: '6',
    name: 'News Title 6',
    image: 'https://wallpapercave.com/wp/wp3344569.jpg',
    about: 'Laboris nisi ut aliquip ex ea commodo.'
  }
];

function Carousel() {
  return (
    <div
    

      style={{
        width: '936px',
        height: '624px',
        borderRadius: '35px',
       padding:'16px',
         background: 'linear-gradient(to right, #1a0d39, #1D0E40, #1F0F48, #251059, #281062)',
        
        boxSizing: 'border-box',
        marginTop: '210px',
         marginLeft: '60px',
          marginRight: '47pxpx',
         
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
      }}
    >
      {/* Top-right aligned heading */}
      <div
        style={{
          height: '61px',
          display: 'flex',
          fontFamily:'kode mono',
          alignItems: 'center',
          color: '#CAB5FF',
          fontSize: '40px',
          fontWeight: 'bold',
          marginBottom: '10px',
           background: 'linear-gradient(to right, #281062)'
        }}
      >
        LATEST IN TECH
      </div>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
        spaceBetween={30}
        slidesPerView={3}
        style={{
          width: '100%',
          height: '100%',
          paddingBottom: '150px',
           background: 'linear-gradient(to right, #1F0F48, #251059, #281062)',
           borderRadius: '35px',
           
        }}
      >
        {slides.map((d) => (
          <SwiperSlide key={d.id} className="custom-slide">
           
              <div style={{ display: 'flex', justifyContent: 'center',  background: 'linear-gradient(to right, #1a0d39, #1D0E40, #1F0F48, #251059, #281062)' }}>
                <img
                  src={d.image}
                  alt={d.name}
                  style={{
                    maxWidth: '100%',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                     background: 'linear-gradient(to right, #1a0d39, #1D0E40, #1F0F48, #251059, #281062)'

                  }}
                />
              </div>

              <div style={{ marginTop: '1rem', background: 'linear-gradient(to right, #1a0d39, #1D0E40, #1F0F48, #251059, #281062)' }}>
                <h3 className='slide-text' style={{ margin: '0.5rem 0' }} >{d.name}</h3>
                <p className='slide-text' style={{ fontSize: '0.9rem' }}>{d.about}</p>
              </div>
            {/* </div> */}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Styling for Pagination and Scrollbar */}
      <style>
        {`
          .swiper-pagination-bullets {
            bottom: 30px !important;
          }

          .swiper-pagination-bullet {
            background: white;
            opacity: 0.4;
          }

          .swiper-pagination-bullet-active {
           background: linear-gradient(to right, #1a0d39, #1D0E40, #1F0F48, #251059, #281062);
            opacity: 1;
          }

          .swiper-scrollbar {
            height: 6px;
             background: linear-gradient(to right, #1a0d39, #1D0E40, #1F0F48, #251059, #281062);
            border-radius: 3px;
            position: absolute;
            bottom: 10px;
            left: 0;
            right: 0;
            margin: 0 auto;
          }

          .swiper-scrollbar-drag {
            background: white;
            border-radius: 3px;
          }

          .swiper-button-next,
          .swiper-button-prev {
            color: white;
            background: linear-gradient(to right, #1a0d39, #1D0E40, #1F0F48, #251059, #281062);
          }
        `}
      </style>
    </div>
  );
}

export default Carousel;
