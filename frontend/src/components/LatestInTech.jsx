'use client';

import React, { useRef, useEffect, useState } from 'react';
import Tarslogo from "./Tarslogo";
import Navbar from "./Navbar";
import Corousel from "./Corousel";
import { Recap } from './Recap';
import Projects from './Projects';
import Team from "./Team";
import Gallery from './Gallery';
import Liveevents from './Liveevents';

/**
 * A reusable wrapper component that animates its children when they scroll into view.
 */
const AnimatedSection = React.forwardRef(({ children }, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const internalRef = useRef(null);

  // Use the forwarded ref if it exists, otherwise use the internal ref
  const targetRef = ref || internalRef;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [targetRef]);

  return (
    <div
      ref={targetRef}
      className={`transition-all duration-400 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
});
AnimatedSection.displayName = 'AnimatedSection';

const LatestInTech = ({ refs }) => {
    return (
        <div className="relative">
            <div className="container mx-auto grid grid-cols-12 gap-4 text-white py-4 px-6">
                {/* Sticky Logo */}
                <div className="col-span-2 md:col-span-2 sticky top-6 self-start z-50 shimmer">
                    <Tarslogo />
                </div>

                {/* Main content */}
                <div className="col-span-10 md:col-span-8 space-y-4">
                    {/* Each section is now wrapped with AnimatedSection */}
                    <AnimatedSection ref={refs.latestRef}>
                        <Corousel />
                    </AnimatedSection>
                    <AnimatedSection ref={refs.pastRef}>
                        <Recap />
                    </AnimatedSection>
                    <AnimatedSection ref={refs.projectsRef}>
                        <Projects />
                    </AnimatedSection>
                    <AnimatedSection ref={refs.ourTeamRef}>
                        <Team />
                    </AnimatedSection>
                    <AnimatedSection ref={refs.galleryRef}>
                        <Gallery />
                    </AnimatedSection>
                    <AnimatedSection ref={refs.liveeventsRef}>
                        <Liveevents />
                    </AnimatedSection>
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
