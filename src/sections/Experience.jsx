
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const experiences = [
  {
    role: "BSc IT Student",
    company: "Techspire College, Kathmandu, Nepal",
    duration: "Currently Pursuing",
    description:
      "Studying Information Technology with a focus on computer programming, web technologies, database management systems, and data structures.",
  },
  {
    role: "Frontend Development",
    company: "Personal Learning & Practice",
    duration: "Ongoing",
    description:
      "Building responsive and user-friendly web interfaces using HTML, CSS, JavaScript, React.js, Next.js, and Tailwind CSS. Practising reusable components and state management.",
  },
  {
    role: "Full-Stack Development",
    company: "Personal Projects",
    duration: "Ongoing",
    description:
      "Developing personal projects with Node.js, Express.js, MongoDB, and Mongoose. Practising REST APIs, CRUD operations, JWT authentication, and frontend-backend integration.",
  },
];

function ExperienceItem({
  exp,
  idx,
  start,
  end,
  scrollYProgress,
  layout,
}) {
  const scale = useTransform(scrollYProgress, [start, end], [0.5, 1]);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  const y = useTransform(
    scrollYProgress,
    [start, end],
    [idx % 2 === 0 ? 30 : -30, 0]
  );

  const x = useTransform(scrollYProgress, [start, end], [-24, 0]);

  if (layout === "desktop") {
    return (
      <div className="relative flex min-w-0 flex-1 items-center justify-center">
        <motion.div
          className="z-10 h-6 w-6 rounded-full bg-cyan-400 shadow-[0_0_0_8px_rgba(34,211,238,0.12)]"
          style={{ scale, opacity }}
        />

        <motion.div
          className={`absolute w-[3px] bg-cyan-400/50 ${
            idx % 2 === 0 ? "-top-8" : "-bottom-8"
          }`}
          style={{ height: 40, opacity }}
        />

        <motion.article
          className={`absolute w-[min(18rem,95%)] rounded-xl border border-cyan-400/20 bg-gray-900/90 p-4 shadow-lg backdrop-blur ${
            idx % 2 === 0 ? "bottom-12" : "top-12"
          }`}
          style={{ opacity, y }}
        >
          <h3 className="text-lg font-semibold text-cyan-300">
            {exp.role}
          </h3>

          <p className="mb-3 mt-1 text-xs leading-relaxed text-gray-400">
            {exp.company}
          </p>

          <span className="mb-3 inline-block rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
            {exp.duration}
          </span>

          <p className="break-words text-sm leading-relaxed text-gray-300">
            {exp.description}
          </p>
        </motion.article>
      </div>
    );
  }

  return (
    <div className="relative flex items-start">
      <motion.div
        className="absolute -left-[7px] top-3 h-4 w-4 rounded-full bg-cyan-400 shadow-[0_0_0_6px_rgba(34,211,238,0.12)]"
        style={{ scale, opacity }}
      />

      <motion.article
        className="ml-6 w-full rounded-xl border border-cyan-400/20 bg-gray-900/90 p-5 shadow-lg backdrop-blur"
        style={{ opacity, x }}
      >
        <h3 className="break-words text-lg font-semibold text-cyan-300">
          {exp.role}
        </h3>

        <p className="mb-3 mt-1 break-words text-sm text-gray-400">
          {exp.company}
        </p>

        <span className="mb-3 inline-block rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
          {exp.duration}
        </span>

        <p className="break-words text-sm leading-relaxed text-gray-300">
          {exp.description}
        </p>
      </motion.article>
    </div>
  );
}

export default function Experience() {
  const sceneRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const thresholds = useMemo(
    () => experiences.map((_, i) => (i + 1) / experiences.length),
    []
  );

  const sceneHeightVh = isMobile
    ? 160 * experiences.length
    : 120 * experiences.length;

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const lineSize = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <section id="experience" className="relative bg-black text-white">
      <div
        ref={sceneRef}
        style={{
          height: `${sceneHeightVh}vh`,
          minHeight: "120vh",
        }}
        className="relative"
      >
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
          <h2 className="mt-5 text-center text-3xl font-bold sm:text-5xl">
            My Learning Journey
          </h2>

          <p className="mx-auto mt-3 max-w-xl px-5 text-center text-sm text-gray-400 sm:text-base">
            My education, frontend skills, and journey toward becoming a
            MERN Stack Developer.
          </p>

          <div className="flex flex-1 items-center justify-center px-5 pb-10">
            {!isMobile && (
              <div className="relative w-full max-w-7xl">
                <div className="relative h-[6px] rounded bg-white/15">
                  <motion.div
                    className="absolute left-0 top-0 h-[6px] rounded bg-cyan-400"
                    style={{ width: lineSize }}
                  />
                </div>

                <div className="relative flex justify-between">
                  {experiences.map((exp, idx) => (
                    <ExperienceItem
                      key={exp.role}
                      exp={exp}
                      idx={idx}
                      start={idx === 0 ? 0 : thresholds[idx - 1]}
                      end={thresholds[idx]}
                      scrollYProgress={scrollYProgress}
                      layout="desktop"
                    />
                  ))}
                </div>
              </div>
            )}

            {isMobile && (
              <div className="relative w-full max-w-md">
                <div className="absolute bottom-0 left-0 top-0 w-[3px] rounded bg-white/15">
                  <motion.div
                    className="absolute left-0 top-0 w-full rounded bg-cyan-400"
                    style={{ height: lineSize }}
                  />
                </div>

                <div className="relative flex flex-col gap-8 py-2">
                  {experiences.map((exp, idx) => (
                    <ExperienceItem
                      key={exp.role}
                      exp={exp}
                      idx={idx}
                      start={idx === 0 ? 0 : thresholds[idx - 1]}
                      end={thresholds[idx]}
                      scrollYProgress={scrollYProgress}
                      layout="mobile"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
