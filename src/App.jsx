import React, { useEffect, useRef, useState } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ServiceSummary from "./sections/ServiceSummary";
import Services from "./sections/Services";
import ReactLenis from "lenis/react";
import About from "./sections/About";
import Works from "./sections/Works";
import ContactSummary from "./sections/ContactSummary";
import Contact from "./sections/Contact";
import Loader from "./components/Loader";
import { useProgress } from "@react-three/drei";

const MIN_LOADER_MS = 1200;
const LOADER_TIMEOUT_MS = 8000;

const App = () => {
  const { progress, total } = useProgress();
  const [isReady, setIsReady] = useState(false);
  const [loaderExited, setLoaderExited] = useState(false);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    if (isReady) return;

    if (progress === 100) {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(MIN_LOADER_MS - elapsed, 0);
      const timer = setTimeout(() => setIsReady(true), remaining);
      return () => clearTimeout(timer);
    }
  }, [progress, isReady]);

  useEffect(() => {
    // Fallback for when nothing is ever queued to load (total stays 0), so
    // the loader still honors the minimum intro duration instead of waiting
    // on the full safety timeout below.
    const timer = setTimeout(() => {
      if (total === 0) setIsReady(true);
    }, MIN_LOADER_MS);
    return () => clearTimeout(timer);
  }, [total]);

  useEffect(() => {
    const timeout = setTimeout(() => setIsReady(true), LOADER_TIMEOUT_MS);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <ReactLenis root className="relative w-screen min-h-screen overflow-x-hidden">
      <Loader
        progress={progress}
        isReady={isReady}
        onExited={() => setLoaderExited(true)}
      />
      <div inert={!isReady}>
        <Navbar />
        <Hero isReady={loaderExited} />
        <ServiceSummary />
        <Services />
        <About />
        <Works />
        <ContactSummary />
        <Contact />
      </div>
    </ReactLenis>
  );
};

export default App;
