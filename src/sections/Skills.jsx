
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { FaJava, FaReact } from "react-icons/fa";
import { DiNodejsSmall } from "react-icons/di";
import {
  SiNextdotjs,
  SiJavascript,
  SiTailwindcss,
  SiFigma,
  SiPython,
  SiMongodb,
  SiExpress,
} from "react-icons/si";

export default function Skills() {
  const skills = [
    { icon: <FaJava />, name: "Java" },
    { icon: <FaReact />, name: "React" },
    { icon: <SiNextdotjs />, name: "Next.js" },
    { icon: <SiJavascript />, name: "JavaScript" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
    { icon: <SiFigma />, name: "UI/UX Design" },
    { icon: <SiPython />, name: "Python" },
    { icon: <SiExpress />, name: "Express.js" },
    { icon: <DiNodejsSmall />, name: "Node.js" },
    { icon: <SiMongodb />, name: "MongoDB" },
  ];

  const repeated = [...skills, ...skills];

  const [dir, setDir] = useState(-1);
  const [active, setActive] = useState(false);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const touchY = useRef(null);
  const x = useMotionValue(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting && entry.intersectionRatio > 0.1);
      },
      { threshold: [0.1] }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;

    const onWheel = (e) => {
      setDir(e.deltaY > 0 ? -1 : 1);
    };

    const onTouchStart = (e) => {
      touchY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      if (touchY.current === null) return;

      const delta = e.touches[0].clientY - touchY.current;
      setDir(delta > 0 ? 1 : -1);
      touchY.current = e.touches[0].clientY;
    };

    const onTouchEnd = () => {
      touchY.current = null;
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [active]);

  useEffect(() => {
    if (!active) return;

    let id;
    let last = performance.now();
    const SPEED = 80;

    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;

      let next = x.get() + SPEED * dir * dt;
      const loop = (trackRef.current?.scrollWidth || 0) / 2;

      if (loop > 0) {
        if (next <= -loop) next += loop;
        if (next >= 0) next -= loop;
      }

      x.set(next);
      id = requestAnimationFrame(tick);
    };

    id = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(id);
  }, [active, dir, x]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative flex min-h-[50vh] w-full flex-col items-center justify-center overflow-hidden bg-black pb-8 text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/4 h-75 w-75 animate-pulse rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px]" />

        <div className="absolute bottom-1/4 right-0 h-75 w-75 animate-pulse rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] delay-500" />
      </div>

      <motion.h2
        className="z-10 mt-5 bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] bg-clip-text text-4xl font-bold text-transparent sm:text-5xl"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        My Skills
      </motion.h2>

      <motion.p
        className="z-10 mb-8 mt-2 text-base text-white/90 sm:text-lg"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        Modern Applications | Modern Technologies
      </motion.p>

      <div className="relative w-full overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex w-max gap-10 whitespace-nowrap text-6xl text-[#1cd8d2]"
          style={{ x }}
        >
          {repeated.map((skill, i) => (
            <div
              key={i}
              className="flex min-w-[120px] flex-col items-center gap-2"
              aria-label={skill.name}
              title={skill.name}
            >
              <span className="transition-transform duration-300 hover:scale-125">
                {skill.icon}
              </span>

              <p className="whitespace-normal text-center text-sm text-white">
                {skill.name}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
