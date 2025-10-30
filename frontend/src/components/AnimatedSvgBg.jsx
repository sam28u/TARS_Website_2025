import React from 'react';
import '../App.css';
const starsSvgUrl = '/bg(stars).png';

const AnimatedSvgBg = () => {
    return (
        <div
            className="absolute inset-0 z-00 overflow-hidden "
            style={{
                backgroundImage: `url(${starsSvgUrl})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
            }}
        />
    );
};

export default AnimatedSvgBg;