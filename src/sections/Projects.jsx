
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

import img1 from "../assets/img1.JPG";
import img2 from "../assets/img2.JPG";
import img3 from "../assets/img3.JPG";
import photo1 from "../assets/img1.JPG";
import photo2 from "../assets/photo2.PNG";
import photo3 from "../assets/photo3.PNG";

const useIsMobile = (query = "(max-width: 639px)") => {
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia(query).matches
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    const handler = (event) => setIsMobile(event.matches);

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);

    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, [query]);

  return isMobile;
};

export default function Projects() {
  const isMobile = useIsMobile();
  const sceneRef = useRef(null);

  const projects = useMemo(
    () => [
      {
        title: "NK Studio",
        link: "https://www.nk.studio/",
        bgColor: "#0d4d3d",
        image: isMobile ? photo1 : img1,
      },
      {
        title: "Gamily",
        link: "https://gamilyapp.com/",
        bgColor: "#3884d3",
        image: isMobile ? photo2 : img2,
      },
      {
        title: "Hungry Tiger",
        link: "https://www.eathungrytiger.com/",
        bgColor: "#dc9317",
        image: isMobile ? photo3 : img3,
      },
    ],
    [isMobile]
  );

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = projects.map(
    (_, i) => (i + 1) / projects.length
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const index = thresholds.findIndex((threshold) => value < threshold);
    setActiveIndex(index === -1 ? projects.length - 1 : index);
  });

  const activeProject = projects[activeIndex];

  return (
    <section
      id="projects"
      ref={sceneRef}
      className="relative text-white"
      style={{
        height: `${100 * projects.length}vh`,
        backgroundColor: activeProject.bgColor,
        transition: "background-color 400ms ease",
      }}
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        <h2
          className={`z-10 text-center text-3xl font-semibold ${
            isMobile ? "mt-4" : "mt-8"
          }`}
        >
          My Work
        </h2>

        <div
          className={`relative flex w-full flex-1 items-center justify-center ${
            isMobile ? "-mt-4" : ""
          }`}
        >
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                activeIndex === index
                  ? "z-20 opacity-100"
                  : "z-0 opacity-0"
              }`}
              style={{ width: "85%", maxWidth: "1200px" }}
            >
              <AnimatePresence mode="wait">
                {activeIndex === index && (
                  <motion.h3
                    key={project.title}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`block text-center text-[clamp(2rem,6vw,5rem)] font-semibold italic text-white/95 sm:absolute sm:-top-20 sm:left-[35%] sm:mb-0 lg:left-[-5%] ${
                      isMobile ? "-mt-24" : ""
                    }`}
                    style={{
                      zIndex: 5,
                      textAlign: isMobile ? "center" : "left",
                    }}
                  >
                    {project.title}
                  </motion.h3>
                )}
              </AnimatePresence>

              <div
                className={`relative h-[62vh] w-full overflow-hidden bg-black/20 shadow-2xl sm:h-[66vh] md:shadow-[0_35px_60px_-35px_rgba(0,0,0,0.7)] ${
                  isMobile
                    ? "mb-6 rounded-lg"
                    : "mb-10 rounded-xl sm:mb-12"
                }`}
                style={{
                  zIndex: 10,
                  transition: "box-shadow 250ms ease",
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover drop-shadow-xl md:drop-shadow-2xl"
                  style={{
                    position: "relative",
                    zIndex: 10,
                    filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.65))",
                    transition: "filter 200ms ease",
                  }}
                  loading="lazy"
                />

                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    zIndex: 11,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 40%)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div
          className={`absolute ${
            isMobile ? "bottom-20" : "bottom-10"
          } z-30`}
        >
          <a
            href={activeProject?.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-white px-6 py-3 font-semibold text-black transition-all hover:bg-gray-200"
            aria-label={`View ${activeProject?.title} project`}
          >
            View Project
          </a>
        </div>
      </div>
    </section>
  );
}
