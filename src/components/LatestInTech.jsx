import React from 'react';
import Tarslogo from "./Tarslogo";
import Navbar from "./Navbar";
import Corousel from "./Corousel";
import { Recap } from './Recap';
import Projects from './Projects';
import Team from "./Team";
import Gallery from './Gallery';
import Liveevents from './Liveevents';

const LatestInTech = ({ refs }) => {
    return (
        <div className="relative">
            <div className="container mx-auto grid grid-cols-12 gap-4 text-white p-6">
                {/* Sticky Logo */}
                <div className="col-span-2 md:col-span-2 sticky top-6 self-start z-50 shimmer">
                    <Tarslogo />
                </div>

                {/* Main content */}
                <div className="col-span-10 md:col-span-8 space-y-4">
                    <div ref={refs.latestRef}>
                        <Corousel />
                    </div>
                    <div ref={refs.pastRef}>
                        <Recap />
                    </div>
                    <div ref={refs.projectsRef}>
                        <Projects />
                    </div>
                    <div ref={refs.ourTeamRef}>
                        <Team />
                    </div>
                    <div ref={refs.galleryRef}>
                        <Gallery />
                    </div>
                    <div ref={refs.liveeventsRef}>
                        <Liveevents />
                    </div>
                </div>

                {/* Sticky Navbar */}
                <div className="hidden md:block md:col-span-2 sticky top-6 self-start z-50">
                    <Navbar refs={refs} />
                </div>
            </div>
        </div>
    );
};

export default LatestInTech;