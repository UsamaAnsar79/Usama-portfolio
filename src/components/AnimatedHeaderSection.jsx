import React from "react";
import { useRef } from "react";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const AnimatedHeaderSection = ({
  subTitle,
  title,
  text,
  textColor,
  withScrollTrigger = false,
  startAnimation = true,
  startTextAnimation,
  animateLetters = false,
}) => {
  const contextRef = useRef(null);
  const headerRef = useRef(null);
  const letterRefs = useRef([]);
  letterRefs.current = [];
  const shouldSplitTitle = title.includes(" ");
  const titleParts = shouldSplitTitle ? title.split(" ") : [title];
  const titleLetters = animateLetters ? title.split("") : [];
  useGSAP(() => {
    // Scroll-triggered sections are off-screen at mount (nothing to flash),
    // so they keep the original from()-only behavior below. The mount-based
    // path (Hero) can sit fully visible behind the loader for seconds before
    // startAnimation flips, so its hidden pose must be set immediately here
    // rather than only at the moment the reveal tween is created - otherwise
    // the loader's own wipe would flash the finished pose right before it
    // snaps back to hidden and replays.
    if (withScrollTrigger) return;

    gsap.set(contextRef.current, { y: "50vh" });
    gsap.set(headerRef.current, { opacity: 0, y: "200" });
    if (animateLetters && letterRefs.current.length > 0) {
      gsap.set(letterRefs.current, { opacity: 0, y: 40 });
    }
  }, [withScrollTrigger, animateLetters]);

  useGSAP(() => {
    if (!withScrollTrigger && !startAnimation) return;

    const tl = gsap.timeline({
      scrollTrigger: withScrollTrigger
        ? {
            trigger: contextRef.current,
          }
        : undefined,
    });

    if (withScrollTrigger) {
      tl.from(contextRef.current, {
        y: "50vh",
        duration: 1,
        ease: "circ.out",
      });
      tl.from(
        headerRef.current,
        {
          opacity: 0,
          y: "200",
          duration: 1,
          ease: "circ.out",
        },
        "<+0.2"
      );
      if (animateLetters && letterRefs.current.length > 0) {
        tl.from(
          letterRefs.current,
          {
            opacity: 0,
            y: 40,
            duration: 0.6,
            stagger: 0.04,
            ease: "power3.out",
          },
          "<+0.4"
        );
      }
    } else {
      tl.to(contextRef.current, {
        y: 0,
        duration: 1,
        ease: "circ.out",
      });
      tl.to(
        headerRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "circ.out",
        },
        "<+0.2"
      );
      if (animateLetters && letterRefs.current.length > 0) {
        tl.to(
          letterRefs.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.04,
            ease: "power3.out",
          },
          "<+0.4"
        );
      }
    }
  }, [withScrollTrigger, startAnimation, animateLetters]);
  return (
    <div ref={contextRef}>
      <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
        <div
          ref={headerRef}
          className="flex flex-col justify-center gap-12 pt-16 sm:gap-16"
        >
          <p
            className={`text-sm font-light tracking-[0.5rem] uppercase px-1 sm:px-1 md:px-3 lg:px-6 ultra-small-screen ${textColor}`}
          >
            {subTitle}
          </p>
          <div className="px-1 sm:px-1 md:px-3 lg:px-6 ultra-small-screen">
            <h1
              className={`${
                animateLetters
                  ? "block"
                  : "flex flex-col gap-12 sm:gap-16 md:block"
              } uppercase banner-text-responsive ${textColor}`}
            >
              {animateLetters
                ? titleLetters.map((char, index) => (
                    <span
                      key={index}
                      ref={(el) => (letterRefs.current[index] = el)}
                      className="inline-block"
                    >
                      {char === " " ? " " : char}
                    </span>
                  ))
                : titleParts.map((part, index) => (
                    <span key={index}>{part} </span>
                  ))}
            </h1>
          </div>
        </div>
      </div>
      <div className={`relative px-1 sm:px-1 md:px-3 lg:px-6 ultra-small-screen ${textColor}`}>
        <div className="absolute inset-x-0 border-t-2" />
        <div className="py-12 sm:py-16 text-end">
          <AnimatedTextLines
            text={text}
            className={`font-light uppercase value-text-responsive ${textColor}`}
            startAnimation={
              withScrollTrigger
                ? true
                : (startTextAnimation ?? startAnimation)
            }
            useScrollTrigger={withScrollTrigger}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeaderSection;
