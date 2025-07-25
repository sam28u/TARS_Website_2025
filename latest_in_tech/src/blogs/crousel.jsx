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
    <div className="carousel-wrapper">
    
      {/* Top-right aligned heading */}
      <div
        style={{
          height: '61px',
          display: 'flex',
          fontFamily:'kode mono',
          justifyContent:'flex-end',
          alignItems:'flex-end',
          position:'relative',
          left:'28%',
          color: '#CAB5FF',
          fontSize: '40px',
          fontWeight: 'bold',
          marginBottom: '10px',
          background: 'none',
          zIndex:'100',
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
          maxWidth: '760px',
          width:'100%',
          maxHeight:'400px',
          height:'100%',
          paddingBottom:'80px',
          background:'none',
          zIndex:'100',
        }}
      >
        {slides.map((d) => (
          <SwiperSlide key={d.id} className="custom-slide">
           
              <div style={{ display: 'flex', justifyContent: 'center',background:'none'}}>
                <img
                  src={d.image}
                  alt={d.name}
                  style={{
                    maxWidth: '200px',
                    width:'100%',
                    maxHeight: '180px',
                    height:'100%',
                    objectFit: 'cover',
                    borderRadius: '25px',
                    zIndex:'100'
                  }}
                />
              </div>

              <div style={{ marginTop: '1rem', background: 'none' }}>
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
          .swiper-pagination-bullet {
            background: white;
            opacity: 0.4;
            position:relative;
            bottom:20px;
          }

          .swiper-pagination-bullet-active {
            opacity: 1;
          }

          .swiper-scrollbar {
            height: 6px;
            border-radius: 3px;
            position: absolute;
            bottom: 0px;
            background:#271849;
          }

          .swiper-scrollbar-drag {
            background: #CAB5FF;
            border-radius: 3px;
            position: absolute;
            bottom: 10px;
            height:6px;
          }

          .swiper-button-next,
          .swiper-button-prev {
            color: #CAB5FF;
            background:none;
          }
        `}
      </style>
    </div>
  );
}

export default Carousel;
