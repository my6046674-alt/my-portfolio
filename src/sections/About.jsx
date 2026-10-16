
import { motion } from "framer-motion";
import profile from "../assets/profile.jpeg";

export default function About() {
  const stats = [
    { label: "Education", value: "BSc IT Student" },
    { label: "Speciality", value: "Full-Stack Development" },
    { label: "Focus", value: "Performance & UX" },
  ];

  const glows = [
    "-top-10 -left-10 w-[360px] h-[360px] opacity-20 blur-[120px]",
    "bottom-0 right-10 w-[420px] h-[420px] opacity-15 blur-[140px] delay-300",
    "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] opacity-10 blur-[100px]",
  ];

  return (
    <section
      id="about"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        {glows.map((c, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] animate-pulse ${c}`}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-20 md:px-10 lg:px-12">
        <motion.div
          className="flex flex-col items-center gap-8 md:flex-row md:items-stretch"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="relative h-40 w-40 shrink-0 overflow-hidden rounded-2xl border border-[#1cd8d2]/25 bg-gradient-to-r from-[#1cd8d2]/10 to-[#302b63]/20 shadow-2xl md:h-52 md:w-52"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
          >
            <img
              src={profile}
              alt="Manoj Yadav"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </motion.div>

          <div className="flex flex-1 flex-col justify-center text-center md:text-left">
            <h2 className="bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#1cd8d2] bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
              Manoj Yadav
            </h2>

            <p className="mt-2 text-lg font-semibold text-white/90 sm:text-xl">
              Aspiring Full-Stack Developer
            </p>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg">
              I am a  BSc IT student passionate about web
              development and modern technologies. I enjoy creating responsive,
              user-friendly websites and turning creative ideas into practical
              digital solutions.
            </p>

            <div className="mt-6 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {stats.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="text-sm text-gray-400">{item.label}</div>
                  <div className="text-base font-semibold">{item.value}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4 md:justify-start">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 font-semibold text-black transition hover:bg-gray-200"
              >
                View Projects
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 px-5 py-3 text-white transition hover:bg-white/20"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="space-y-4 border-t border-white/10 pt-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className="text-3xl font-bold text-white sm:text-4xl">
            About Me
          </h3>

          <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
            I am currently pursuing my BSc in Information Technology and
            developing my skills through hands-on projects and continuous
            learning. I enjoy solving problems, exploring new technologies,
            and understanding how modern web applications work.
          </p>

          <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
            My current focus is on the MERN stack, including MongoDB,
            Express.js, React.js, and Node.js. I am also improving my skills
            in JavaScript, Tailwind CSS, REST APIs, responsive design, and
            writing clean, maintainable code.
          </p>

          <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
            My goal is to become a skilled full-stack developer, contribute
            to meaningful projects, collaborate with other developers, and
            build useful digital experiences while continuing to grow
            professionally.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
