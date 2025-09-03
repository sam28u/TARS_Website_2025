import React, { useEffect, useState } from 'react'
import large from '../assets/large(lit).svg'
import small from '../assets/small(lit).svg'

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [columnCount, setColumnCount] = useState(3);

    // 👇 JSON data without height
    const galleryData = [
        {
            id: 1,
            url: "https://images.unsplash.com/photo-1756370473190-4c41ddbd5e59?q=80&w=692&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 2,
            url: "https://plus.unsplash.com/premium_photo-1756286484747-c269c20e6a24?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 3,
            url: "https://images.unsplash.com/photo-1756054271968-726cf7e15ca9?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 4,
            url: "https://images.unsplash.com/photo-1756302637887-1c00e98fd0cc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 5,
            url: "https://images.unsplash.com/photo-1756312827971-e162f92e5588?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 6,
            url: "https://plus.unsplash.com/premium_photo-1756298029029-175eeb4bff18?q=80&w=1069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 7,
            url: "https://images.unsplash.com/photo-1756289308425-a34b1291b9d3?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 8,
            url: "https://images.unsplash.com/photo-1756296576613-ba165a77555f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 9,
            url: "https://images.unsplash.com/photo-1756302555654-5e413da2d1b8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 10,
            url: "https://images.unsplash.com/photo-1756362635650-88f3ae807d9f?q=80&w=741&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 11,
            url: "https://plus.unsplash.com/premium_photo-1756286484891-45501a0ad20d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 12,
            url: "https://images.unsplash.com/photo-1756310652024-efa234eac5d9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    ];

    useEffect(() => {
        setImages(galleryData);
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
        window.addEventListener('resize', calculateLayout);
        return () => window.removeEventListener('resize', calculateLayout);
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
        <div className='py-[1rem] relative kode-mono'>
            <img src={large} className='hidden md:block w-full' alt="" />
            <img src={small} className='md:hidden w-full' alt="" />

            <div className='absolute top-[10vw] sm:top-[7vw] left-[1rem] md:top-[2rem] w-[90%] md:left-[1.7rem] lg:top-[2.5rem] lg:left-[2.3rem]'>
                <div className='text-end w-full'>
                    <h1 className='text-[5vw] sm:text-[2rem] md:text-[1.5rem] xl:text-[2.5rem] pr-[2rem] md:pr-[0rem] text-[#CAB5FF] '>Gallery</h1>
                </div>

                <div
                    className={`flex w-full justify-between xl:mx-[1rem] overflow-y-scroll h-[98vw] rounded-[7vw] sm:h-[41rem] sm:rounded-[5rem] md:mt-[0.5rem] md:h-[14.5rem] md:rounded-[1.2rem] lg:h-[20.5rem] lg:rounded-[1.5rem] xl:h-[26rem] xl:rounded-[2rem] 2xl:h-[32.5rem] lg:mt-[1rem] scroll-hide mt-[2vw] flex-1 ${columnCount === 1 ? 'flex-col items-center gap-5' : 'gap-5'
                        }`}
                    style={{
                        maxHeight: 'calc(100% - 5rem)',
                        paddingBottom: '1rem',
                    }}
                >
                    {columns.map((column, colIndex) => (
                        <div
                            key={colIndex}
                            className={`flex flex-col ${columnCount === 1 ? 'w-full max-w-sm' : 'flex-1 max-w-xs'
                                }`}
                            style={{
                                gap: '1.25rem',
                                width: columnCount === 1 ? '100%' : '15.75rem',
                                maxWidth: columnCount === 1 ? '24rem' : '15.75rem',
                            }}
                        >
                            {column.map((item, i) => (
                                <div
                                    key={i}
                                    className="bg-gray-300 rounded-3xl overflow-hidden flex items-center justify-center flex-shrink-0"
                                    style={{
                                        borderRadius: '1.5625rem',
                                    }}
                                >
                                    {item.url ? (
                                        <img
                                            src={item.url}
                                            alt={`Gallery ${item.id}`}
                                            className="w-full h-auto object-cover hover:scale-130 ease-in-out duration-500"
                                            style={{
                                                borderRadius: '1.5625rem',
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
            </div>
        </div>
    )
}

export default Gallery
