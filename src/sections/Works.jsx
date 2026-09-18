import { Icon } from "@iconify/react/dist/iconify.js";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { projects } from "../constants";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Works = () => {
  const overlayRefs = useRef([]);

  const text = `Featured projects that have been meticulously
    crafted with passion to drive
    results and impact.`;

  useGSAP(() => {
    gsap.from("#project", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: "#project",
      },
    });
  }, []);

  const handleMouseEnter = (index) => {
    if (window.innerWidth < 768) return;

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        duration: 0.15,
        ease: "power2.out",
      }
    );
  };

  const handleMouseLeave = (index) => {
    if (window.innerWidth < 768) return;

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.to(el, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      duration: 0.2,
      ease: "power2.in",
    });
  };


  return (
    <section id="work" className="flex flex-col min-h-screen">
      <AnimatedHeaderSection
        subTitle={"Logic meets Aesthetics, Seamlessly"}
        title={"Works"}
        text={text}
        textColor={"text-black"}
        withScrollTrigger={true}
      />
      <div className="relative flex flex-col font-light">
        {projects.map((project, index) => (
          <a
            key={project.id}
            id="project"
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex flex-col gap-1 py-5 cursor-pointer group md:gap-0"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            {/* overlay */}
            <div
              ref={(el) => {
                overlayRefs.current[index] = el;
              }}
              className="absolute inset-0 hidden md:block duration-200 bg-black -z-10 clip-path"
            />

            {/* title */}
            <div className="flex justify-between px-1 sm:px-1 md:px-3 lg:px-6 text-black transition-all duration-500 md:group-hover:px-12 md:group-hover:text-white ultra-small-screen">
              <h2 className="lg:text-[32px] text-[26px] leading-none">
                {project.name}
              </h2>
              <Icon icon="lucide:arrow-up-right" className="md:size-6 size-5" />
            </div>
            {/* divider */}
            <div className="w-full h-0.5 bg-black/80" />
            {/* desktop hover preview image */}
            <div className="absolute inset-0 z-10 items-center justify-center hidden pointer-events-none md:flex">
              <img
                src={project.image}
                alt={`${project.name} preview`}
                className="object-contain w-72 rounded-xl bg-black/90 opacity-0 scale-90 shadow-2xl transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100 h-44 lg:w-[420px] lg:h-64"
              />
            </div>
            {/* framework */}
            <div className="flex flex-wrap px-1 sm:px-1 md:px-3 lg:px-6 text-xs leading-loose uppercase transtion-all duration-500 md:text-sm gap-x-5 gap-y-1 md:group-hover:px-12 ultra-small-screen">
              {project.frameworks.map((framework) => (
                <p
                  key={framework.id}
                  className="text-black whitespace-nowrap transition-colors duration-500 md:group-hover:text-white"
                >
                  {framework.name}
                </p>
              ))}
            </div>
            {/* mobile preview image */}
            <div className="relative px-1 sm:px-1 md:px-3 lg:px-6 md:hidden h-[400px] ultra-small-screen">
              <img
                src={project.image}
                alt={`${project.name} preview`}
                className="object-contain w-full h-full bg-black/90 rounded-xl"
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Works;
