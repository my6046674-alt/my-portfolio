
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import ParticlesBackground from "../components/ParticlesBackground";

export default function Home() {
  const roles = useMemo(
    () => [  "MERN Stack Developer", "Web Developer", "Software Developer"],
    []
  );

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];
    let timeout;

    if (!deleting && subIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1200);
    } else if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(
        () => {
          setSubIndex((prev) =>
            deleting ? prev - 1 : prev + 1
          );
        },
        deleting ? 40 : 60
      );
    }

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, roles]);

  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <ParticlesBackground />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 -left-32
          w-[70vw] sm:w-[50vw] md:w-[40vw]
          h-[70vw] sm:h-[50vw] md:h-[40vw]
          max-w-[500px] max-h-[500px]
          rounded-full
          bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
          opacity-30 sm:opacity-20 md:opacity-10
          blur-[100px] sm:blur-[130px] md:blur-[150px]
          animate-pulse"
        />

        <div
          className="absolute bottom-0 right-0
          w-[70vw] sm:w-[50vw] md:w-[40vw]
          h-[70vw] sm:h-[50vw] md:h-[40vw]
          max-w-125 max-h-125
          rounded-full
          bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
          opacity-30 sm:opacity-20 md:opacity-10
          blur-[100px] sm:blur-[130px] md:blur-[150px]
          animate-pulse"
        />
      </div>

      <div className="relative z-10 mx-auto grid h-full w-full max-w-7xl grid-cols-1 px-4 lg:grid-cols-2">
        <div className="relative flex h-full flex-col justify-center text-center lg:text-left">
          <div className="mx-auto w-full max-w-3xl lg:mx-0 lg:pr-24">
            <motion.div
              className="mb-3 min-h-[1.6em] text-xl font-semibold tracking-wide text-white sm:text-2xl md:text-3xl lg:text-4xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span>{roles[index].substring(0, subIndex)}</span>

              <span
                className="ml-1 inline-block w-0.5 animate-pulse bg-white align-middle"
                style={{ height: "1em" }}
              />
          
            </motion.div>
            <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text
            bg-linear-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] drop-shadow-lg"
            initial={{opacity:0 , y: 40}}
            animate={{opacity:1 , y: 0}}
            transition={{duration:1}}>
              Hello I'm 
              <br></br>
              <span className="text-white font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl lg:whitespace-nowrap">
                Manoj Yadav
              </span>

            </motion.h1>
            <motion.p className="mt-6 text-base font-bold sm:text-5xl md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0"
             initial={{opacity:0 , y: 20}}
            animate={{opacity:1 , y: 0}}
            transition={{delay:0.4 , duration:0.8 }}>
              I turn complex ideas into seamless, high-impact web experiences - building modern, scalable, and lightning-fast applications that make a difference.
            </motion.p>
            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6"
             initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay:0.8, duration:1}}
            >
              <a href="#projects" className="px-6 py-3 rounded-full font-medium text-lg text-white
              bg-gradient-to-r form-[#1cd8d2] via-[#00bf8f] to-[#302b63] shadow-lg hover:scale-105 transition-all"
              >View My work</a>
              <a href="">My Resume</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
