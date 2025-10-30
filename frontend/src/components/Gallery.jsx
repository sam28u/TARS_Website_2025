import React, { use, useEffect, useState } from "react";
const large = "/large(lit).svg";
const small = "/small(lit).svg";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [columnCount, setColumnCount] = useState(3);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // const API_URL = `http://localhost:4000/api/gallery`;
    const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gallery`;
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        const formattedData = data.data.map((item) => ({
          id: item._id,
          url: item.imageUrl,
        }));

        setImages(formattedData);
        setError(null);
      } catch (err) {
        console.error("Error fetching gallery images:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const calculateLayout = () => {
    const width = window.innerWidth;
    let cols = 3;

    if (width < 768) {
      cols = 1;
    } else if (width < 1024) {
      cols = 2;
    }

    setColumnCount(cols);
  };

  useEffect(() => {
    calculateLayout();
    window.addEventListener("resize", calculateLayout);
    return () => window.removeEventListener("resize", calculateLayout);
  }, []);

  const getColumns = () => {
    const columns = Array.from({ length: columnCount }, () => []);
    images.forEach((item, index) => {
      const col = index % columnCount;
      columns[col].push(item);
    });
    return columns;
  };

  const columns = getColumns();

  return (
    <div className="py-[1rem] relative kode-mono">
      <img src={large} className="hidden md:block w-full" alt="" />
      <img src={small} className="md:hidden w-full" alt="" />

      <div className="absolute top-[10vw] sm:top-[7vw] left-[1rem] md:top-[2rem] w-[90%] md:left-[1.7rem] lg:top-[2.5rem] lg:left-[2.3rem]">
        <div className="text-end w-full">
          <h1 className="text-[5vw] sm:text-[2rem] md:text-[1.5rem] xl:text-[2.5rem] pr-[2rem] md:pr-[0rem] text-[#CAB5FF] ">
            Gallery
          </h1>
        </div>

        {/* --- ADD THIS LOADING/ERROR HANDLING --- */}
        {loading && (
          <div className="flex justify-center items-center h-40">
            <p className="text-white text-lg">Loading images...</p>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center h-40">
            <p className="text-red-500 text-lg">Error: {error}</p>
          </div>
        )}
        {/* --- END OF ADDITION --- */}

        {/* Only render gallery if NOT loading and NO error */}
        {!loading && !error && (
          <div
            className={`flex w-full justify-around xl:mx-[1rem] overflow-y-scroll h-[98vw] rounded-[7vw] sm:h-[41rem] sm:rounded-[5rem] md:mt-[0.5rem] md:h-[14.5rem] md:rounded-[1.2rem] lg:h-[20.5rem] lg:rounded-[1.5rem] xl:h-[26rem] xl:rounded-[2rem] 2xl:h-[32.5rem] lg:mt-[1rem] scroll-hide mt-[2vw] flex-1 ${
              columnCount === 1 ? "flex-col items-center gap-5" : "gap-5"
            }`}
            style={{
              maxHeight: "calc(100% - 5rem)",
              paddingBottom: "1rem",
            }}
          >
            {columns.map((column, colIndex) => (
              <div
                key={colIndex}
                className={`flex flex-col ${
                  columnCount === 1 ? "w-full max-w-sm" : "flex-1 max-w-xs"
                }`}
                style={{
                  gap: "1.25rem",
                  width: columnCount === 1 ? "100%" : "15.75rem",
                  maxWidth: columnCount === 1 ? "24rem" : "15.75rem",
                }}
              >
                {/* --- APPLY KEY FIX HERE --- */}
                {column.map((item) => (
                  <div
                    key={item.id} // <-- FIX #3
                    className="bg-gray-300 rounded-3xl overflow-hidden flex items-center justify-center flex-shrink-0"
                    style={{
                      borderRadius: "1.5625rem",
                    }}
                  >
                    {item.url ? (
                      <img
                        src={item.url}
                        alt={`Gallery ${item.id}`}
                        className="w-full h-auto object-cover hover:scale-130 ease-in-out duration-500"
                        style={{
                          borderRadius: "1.5625rem",
                        }}
                      />
                    ) : (
                      <span className="text-gray-500">Placeholder</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
