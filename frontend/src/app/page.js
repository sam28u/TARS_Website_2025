'use client';

// Imports for React functionality (Hooks)
import React, { useRef, useEffect, useState } from "react";

// Imports for your components
import Landing from "@/components/Landing";
import Aboutus from "@/components/Aboutus";
import LatestInTech from "@/components/LatestInTech";
import Footer from "@/components/Footer";

/**
 * A reusable wrapper component that animates its children when they scroll into view.
 * It uses the Intersection Observer API to detect visibility.
 */
const AnimatedSection = React.forwardRef(({ children }, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const internalRef = useRef(null);

  // Use the forwarded ref if it exists, otherwise use the internal ref
  const targetRef = ref || internalRef;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the element is intersecting the viewport, set it to visible
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop observing the element once it's visible
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1, // Trigger the animation when 10% of the element is visible
      }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    // Cleanup function to unobserve the element
    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [targetRef]);

  return (
    <div
      ref={targetRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
});
AnimatedSection.displayName = 'AnimatedSection';


/**
 * The default export for app/page.js creates the content for the "/" route (Homepage).
 */
export default function Home() {
  // Retaining all useRef hooks for section scrolling/navigation
  const aboutUsRef = useRef(null);
  const latestRef = useRef(null);
  const pastRef = useRef(null);
  const projectsRef = useRef(null);
  const ourTeamRef = useRef(null);
  const galleryRef = useRef(null);
  const liveeventsRef = useRef(null);
  const fullTeamRef = useRef(null);

  // Consolidating all refs into a single object to pass down to children
  const sectionRefs = {
    aboutUsRef,
    latestRef,
    pastRef,
    projectsRef,
    ourTeamRef,
    galleryRef,
    liveeventsRef,
    fullTeamRef,
  };

  return (
    <div className="min-h-screen">
      <Landing refs={sectionRefs} />

      {/* Each section is now wrapped with AnimatedSection to trigger animations on scroll */}
      {/* The `ref` is passed to AnimatedSection so the scroll-to functionality still works */}
      
      <AnimatedSection ref={aboutUsRef}>
        <Aboutus />
      </AnimatedSection>
      
      <AnimatedSection ref={latestRef}>
        <LatestInTech refs={sectionRefs} />
      </AnimatedSection>

      <AnimatedSection>
        <Footer refs={sectionRefs}/>
      </AnimatedSection>

    </div>
  );
}
