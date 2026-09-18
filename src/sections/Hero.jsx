import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Planet } from "../components/Planet";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-scroll";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
const Hero = ({ isReady }) => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const metaRowRef = useRef(null);
  const [modelRevealed, setModelRevealed] = useState(false);
  const text = `I help startups and businesses build fast,
scalable web apps and AI-powered
platforms with React, Next.js & Node.js`;

  useGSAP(() => {
    gsap.set(metaRowRef.current, { opacity: 0, y: 30 });
  }, []);

  useGSAP(
    () => {
      if (!isReady) return;

      gsap.to(metaRowRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
      });
    },
    [isReady]
  );

  return (
    <section id="home" className="flex flex-col justify-end min-h-screen">
      <AnimatedHeaderSection
        subTitle={"404 No Bugs Found"}
        title={"Usama\u00A0Ansar"}
        text={text}
        textColor={"text-black"}
        startAnimation={isReady}
        startTextAnimation={modelRevealed}
        animateLetters
      />
      <div
        ref={metaRowRef}
        className="flex flex-col gap-4 px-1 py-8 sm:px-1 md:px-3 lg:px-6 sm:flex-row sm:items-center sm:justify-between ultra-small-screen"
      >
        <p className="text-xs font-light tracking-[0.35em] uppercase text-black/70">
          Software Engineer - React / Next.js / Node.js / AI Integration
        </p>
        <div className="flex items-center gap-6 text-xs font-light tracking-[0.2em] uppercase text-black">
          <Link
            to="work"
            smooth
            offset={0}
            duration={1000}
            className="pb-0.5 border-b border-black/40 cursor-pointer transition-colors duration-300 hover:border-black"
          >
            View Work
          </Link>
          <Link
            to="contact"
            smooth
            offset={0}
            duration={1000}
            className="pb-0.5 border-b border-black/40 cursor-pointer transition-colors duration-300 hover:border-black"
          >
            Get In Touch
          </Link>
          <a
            href="/Usama-Ansar-Resume.pdf"
            download="Usama-Ansar-Resume.pdf"
            className="pb-0.5 border-b border-black/40 cursor-pointer transition-colors duration-300 hover:border-black"
          >
            Download CV
          </a>
        </div>
      </div>
      <figure
        className="absolute inset-0 -z-50"
        style={{ width: "100%", height: "100vh" }}
      >
        <Canvas
          shadows
          camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
        >
          <ambientLight intensity={0.5} />
          <Float speed={0.5}>
            <Planet
              scale={isMobile ? 0.7 : 1}
              isReady={isReady}
              onDropComplete={() => setModelRevealed(true)}
            />
          </Float>
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 3, 4, 1]}>
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[0, 5, -9]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[0, 3, 1]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[-5, -1, -1]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[10, 1, 0]}
                scale={16}
              />
            </group>
          </Environment>
        </Canvas>
      </figure>
    </section>
  );
};

export default Hero;
