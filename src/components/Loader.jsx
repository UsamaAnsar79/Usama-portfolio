import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import { PlanetTeaser } from "./PlanetTeaser";

const Loader = ({ progress, isReady, onExited }) => {
  const containerRef = useRef(null);
  const copyRef = useRef(null);
  const counterRef = useRef(null);
  const barRef = useRef(null);
  const tweened = useRef({ value: 0 });
  const [shouldRender, setShouldRender] = useState(true);

  const syncDom = () => {
    const val = Math.round(tweened.current.value);
    if (counterRef.current) counterRef.current.textContent = val;
    if (barRef.current) barRef.current.style.width = `${val}%`;
  };

  useGSAP(
    () => {
      // @gsap/react only reverts a dependency-array useGSAP on unmount, not
      // between re-runs - so any tween still animating `tweened.current`
      // from a previous invocation must be killed explicitly, or it keeps
      // calling onUpdate in the background and stomping later values.
      gsap.killTweensOf(tweened.current);

      if (isReady) return;

      // Self-driven ramp toward 92% so the counter is never stuck at 0 - the
      // current hero scene loads no real assets, so `progress` from
      // useProgress often never moves. Real progress (if any) still takes
      // over below whenever it's ahead of this simulated value.
      gsap.to(tweened.current, {
        value: 92,
        duration: 4,
        ease: "power1.out",
        onUpdate: syncDom,
      });

      if (progress > tweened.current.value) {
        gsap.to(tweened.current, {
          value: progress,
          duration: 0.4,
          ease: "power1.out",
          onUpdate: syncDom,
        });
      }
    },
    [progress, isReady]
  );

  useGSAP(
    () => {
      if (!isReady) return;

      gsap.killTweensOf(tweened.current);

      const tl = gsap.timeline({
        onComplete: () => {
          setShouldRender(false);
          onExited?.();
        },
      });
      tl.to(tweened.current, {
        value: 100,
        duration: 0.3,
        ease: "power1.out",
        onUpdate: syncDom,
      })
        .to(copyRef.current, {
          yPercent: -40,
          opacity: 0,
          duration: 0.5,
          ease: "power3.in",
        })
        .to(
          containerRef.current,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 0.9,
            ease: "power4.inOut",
          },
          "-=0.2"
        );
    },
    [isReady]
  );

  if (!shouldRender) return null;

  return (
    <div
      ref={containerRef}
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black text-white"
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
    >
      <div ref={copyRef} className="flex flex-col items-center">
        <div className="w-24 h-24 mb-2 md:w-32 md:h-32">
          <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[3, 3, 4]} intensity={1.4} />
            <directionalLight position={[-3, -2, -3]} intensity={0.5} />
            <PlanetTeaser scale={0.85} />
          </Canvas>
        </div>
        <p className="mb-3 text-xs font-light tracking-[0.4em] uppercase text-white/40">
          Usama Ansar
        </p>
        <p className="flex items-end font-light leading-none tabular-nums">
          <span ref={counterRef} className="text-[18vw] md:text-[9rem]">
            0
          </span>
          <span className="mb-2 ml-1 text-2xl text-white/40 md:text-4xl">
            %
          </span>
        </p>
      </div>
      <div className="absolute w-1/2 max-w-xs h-px bottom-12 bg-white/20 md:w-60">
        <div ref={barRef} className="h-full bg-white" style={{ width: "0%" }} />
      </div>
    </div>
  );
};

export default Loader;
