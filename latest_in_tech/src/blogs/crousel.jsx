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
      className="carousel-wrapper"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: '20px',
        padding: '20px',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        maxWidth: '100%',
        boxSizing: 'border-box',
        margin: '1rem auto',
      }}
    >
      {/* Heading */}
      <div
        style={{
          height: '61px',
          display: 'flex',
          justifyContent:'flex-end',
          alignItems:'flex-end',
          position:'relative',
          fontFamily: 'Kode Mono',
          color: '#CAB5FF',
          fontSize: 'clamp(24px, 4vw, 40px)', // responsive heading
          fontWeight: 'bold',
          marginBottom: '10px',
          textAlign: 'center',
          background: 'none',
          zIndex: '100',
          
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
        breakpoints={{
          0: { slidesPerView: 1 },         // phones
          700: { slidesPerView: 1 },       // tablets & half-laptop
          850: { slidesPerView: 2 },      // small desktops
          1000: { slidesPerView: 3 }       // full desktops and above
        }}
        style={{
          maxWidth: '760px',
          maxHeight:'400px',
          height:'100%',
          width: '100%',
          paddingBottom: '80px',
          background: 'none',
          zIndex: '100',
        }}
      >
        {slides.map((d) => (
          <SwiperSlide key={d.id} className="custom-slide">
            <div style={{ display: 'flex', justifyContent: 'center', background: 'none' }}>
              <img
                src={d.image}
                alt={d.name}
                style={{
                  maxWidth: '200px',
                  width: '100%',
                  maxHeight: '180px',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '25px',
                  zIndex: '100'
                }}
              />
            </div>

            <div style={{ marginTop: '1rem', background: 'none', textAlign: 'center' }}>
              <h3
                className="slide-text"
                style={{
                  margin: '0.5rem 0',
                  fontSize: 'clamp(16px, 2vw, 22px)',
                  lineHeight: '1.2em',
                }}
              >
                {d.name}
              </h3>
              <p
                className="slide-text"
                style={{
                  fontSize: 'clamp(12px, 1.8vw, 16px)',
                  lineHeight: '1.4em',
                }}
              >
                {d.about}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Styling for Pagination and Scrollbar */}
      <style>
        {`
          .swiper-pagination-bullet {
            background: white;
            opacity: 0.4;
            position: relative;
            bottom: 20px;
          }

          .swiper-pagination-bullet-active {
            opacity: 1;
          }

          .swiper-scrollbar {
            height: 6px;
            border-radius: 3px;
            background: #271849;
          }

          .swiper-scrollbar-drag {
            background: #CAB5FF;
            border-radius: 3px;
            height: 6px;
          }

          .swiper-button-next,
          .swiper-button-prev {
            color: #CAB5FF;
            background: none;
          }

          @media (max-width: 768px) {
            .swiper-button-next,
            .swiper-button-prev {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Carousel;
