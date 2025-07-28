import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './latest_in_tech.css';

const slides = [
  {
    id: '1',
    name: 'News Title 1',
    image: 'https://wallpapercave.com/wp/wp3344569.jpg',
    about: 'News description on a little over item'
  },
  {
    id: '2',
    name: 'News Title 2', 
    image: 'https://wallpapercave.com/wp/wp3344569.jpg',
    about: 'News description on a little over item'
  },
  {
    id: '3',
    name: 'News Title 3',
    image: 'https://wallpapercave.com/wp/wp3344569.jpg',
    about: 'News description on a little over item'
  },
  {
    id: '4',
    name: 'News Title 4',
    image: 'https://wallpapercave.com/wp/wp3344569.jpg',
    about: 'News description on a little over item'
  },
  {
    id: '5',
    name: 'News Title 5',
    image: 'https://wallpapercave.com/wp/wp3344569.jpg',
    about: 'News description on a little over item'
  }
];

function Carousel() {
  return (
    <div className="carousel-wrapper">
      {/* Heading */}
      <div style={{
        fontFamily: 'Kode Mono, monospace',
        color: '#CAB5FF',
        fontSize: '36px',
        fontWeight: 'bold',
        marginBottom: '30px',
        textAlign: 'center',
        background: 'none',
        zIndex: '100',
        position: 'relative'
      }}>
        LATEST IN TECH
      </div>

      {/* Swiper Carousel */}
      <div className="carousel-container">
        <Swiper
          modules={[Navigation, Pagination, A11y, Autoplay]}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          pagination={{ 
            clickable: true,
            dynamicBullets: false
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false
          }}
          spaceBetween={20}
          slidesPerView={3}
          centeredSlides={false}
          loop={true}
          className="carousel-swiper"
          breakpoints={{
          0: { slidesPerView: 1 },         // phones
          700: { slidesPerView: 1 },       // tablets & half-laptop
          850: { slidesPerView: 2 },      // small desktops
          1000: { slidesPerView: 3 }      // full desktops and above
          }}  
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="custom-slide">
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  background: 'none',
                  marginBottom: '15px'
                }}>
                  <img
                    src={slide.image}
                    alt={slide.name}
                    style={{
                      width: '200px',
                      height: '140px',
                      objectFit: 'cover',
                      borderRadius: '15px',
                      position: 'relative',
                      zIndex: '10'
                    }}
                  />
                </div>

                <div style={{ 
                  background: 'transparent', 
                  textAlign: 'left', 
                  padding: '0 15px',
                  position: 'relative',
                  zIndex: '10'
                }}>
                  <h3 className="slide-text" style={{
                    margin: '10px 0',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    lineHeight: '1.3em',
                  }}>
                    {slide.name}
                  </h3>
                  <p className="slide-text" style={{
                    fontSize: '13px',
                    lineHeight: '1.4em',
                    opacity: 0.85,
                    margin: 0
                  }}>
                    {slide.about}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows - Bottom Right */}
        <div className="custom-navigation">
          <button className="custom-prev">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="custom-next">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Carousel;