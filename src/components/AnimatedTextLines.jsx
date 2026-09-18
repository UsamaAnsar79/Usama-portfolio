import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
gsap.registerPlugin(ScrollTrigger);
export const AnimatedTextLines = ({
  text,
  className,
  startAnimation = true,
  useScrollTrigger = true,
}) => {
  const containerRef = useRef(null);
  const lineRefs = useRef([]);
  const lines = text.split("\n").filter((line) => line.trim() !== "");

  // Set immediately (not gated) so a mount-based caller (Hero) doesn't sit
  // fully visible behind the loader and then flash to hidden once the
  // reveal tween below is finally allowed to run.
  useGSAP(() => {
    if (lineRefs.current.length > 0) {
      gsap.set(lineRefs.current, { y: 100, opacity: 0 });
    }
  }, []);

  useGSAP(() => {
    if (!startAnimation) return;

    if (lineRefs.current.length > 0) {
      gsap.to(lineRefs.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.3,
        ease: "back.out",
        scrollTrigger: useScrollTrigger
          ? { trigger: containerRef.current }
          : undefined,
      });
    }
  }, [startAnimation, useScrollTrigger]);

  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, index) => (
        <span
          key={index}
          ref={(el) => (lineRefs.current[index] = el)}
          className="block leading-relaxed tracking-wide text-pretty"
        >
          {line}
        </span>
      ))}
    </div>
  );
};
