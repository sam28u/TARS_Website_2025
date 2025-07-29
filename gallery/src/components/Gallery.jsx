import React, { useState, useEffect } from 'react';

const Gallery = () => {
  const [images, setImages] = useState([]);
  
  useEffect(() => {
    // Dynamically import images from the gallery folder
    const importImages = async () => {
      try {
        // Get all image files in the gallery directory
        const context = require.context('../../../assets/gallery', false, /\.(png|jpe?g|webp|svg)$/);
        const imageModules = context.keys().map(context);
        
        // Extract default exports (image URLs)
        const loadedImages = imageModules.map(module => module.default || module);
        setImages(loadedImages);
        
        console.log('Loaded images:', loadedImages); // Debugging
      } catch (e) {
        console.warn("Error loading images:", e);
      }
    };
    
    importImages();
  }, []);

  const heights = [320, 180, 250, 210, 270, 200, 280, 160, 240, 190, 300, 150];
  
  const borderRadiusList = [
    '35px 15px 45px 5px',
    '5px 45px 15px 35px',
    '25px 5px 35px 15px',
    '15px 35px 5px 45px',
    '45px 5px 25px 35px',
    '5px 25px 45px 15px',
    '35px 45px 5px 25px',
    '15px 5px 35px 45px',
    '5px 35px 15px 25px',
    '45px 25px 5px 35px',
    '25px 15px 45px 5px',
    '35px 5px 15px 45px'
  ];

  const columns = [[], [], []];
  const columnTops = [0, 0, 0];
  
  heights.forEach((height, index) => {
    const columnIndex = index % 3;
    const top = columnTops[columnIndex];
    columnTops[columnIndex] = top + height + 20; 
    columns[columnIndex].push({
      index,
      height,
      top,
      borderRadius: borderRadiusList[index],
      image: images[index]
    });
  });

  return (
    <div
      style={{
        position: 'relative',
        marginTop: '80px',
        marginLeft: '-30px',
        width: '936px',
        height: '624px',
        borderRadius: '35px',
        overflow: 'hidden',
      }}
    >
      {/* "Gallery" text */}
      <div
        style={{
          position: 'absolute',
          paddingBottom: '30px',
          top: '23px',
          left: '685px',
          width: '202px',
          height: '61px',
          fontFamily: '"Kode Mono", monospace',
          fontWeight: 700,
          fontSize: '48px',
          lineHeight: '100%',
          color: '#CAB5FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          opacity: 1,
        }}
      >
        Gallery
      </div>
      
      {/* Gradient border */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          padding: '3px',
          borderRadius: '35px',
          background: 'linear-gradient(47.69deg, #11022D 44.77%, #A27BFF 100%)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          zIndex: 0,
        }}
      />
      
      {/* Placeholders */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 'calc(100% - 20px)', 
          padding: '80px 40px 0 40px', 
          borderRadius: '32px',
          boxSizing: 'border-box',
          zIndex: 1,
          overflow: 'hidden',
        }}
      >
        {columns.map((column, colIndex) => (
          <div
            key={colIndex}
            style={{
              position: 'absolute',
              left: `${40 + colIndex * (252 + 50)}px`,
              width: '252px',
              top: '80px',
              height: 'calc(100% - 80px)', 
            }}
          >
            {column.map(item => (
              <div
                key={item.index}
                style={{
                  position: 'absolute',
                  top: `${item.top}px`,
                  width: '100%',
                  height: `${item.height}px`,
                  backgroundColor: '#ccc',
                  borderRadius: item.borderRadius,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {images[item.index] ? (
                  <img
                    src={images[item.index]}
                    alt={`Gallery ${item.index + 1}`}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      borderRadius: item.borderRadius
                    }}
                  />
                ) : (
                  <span style={{ color: '#888' }}>Placeholder</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;