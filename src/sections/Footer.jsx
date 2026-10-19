
import { motion } from "framer-motion";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const socials = [
  {
    Icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/my6046674-alt",
  },
  {
    Icon: FaFacebook,
    label: "Facebook",
    href: "https://www.facebook.com/manoj.yadav.39240",
  },
  {
    Icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/manoj-yadav-772a7b352/",
  },
];

const glowVariants = {
  initial: {
    scale: 1,
    y: 0,
    filter: "drop-shadow(0 0 0 rgba(0,0,0,0))",
  },
  hover: {
    scale: 1.2,
    y: -3,
    filter:
      "drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(16,185,129,0.8))",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
  tap: {
    scale: 0.95,
    y: 0,
    transition: { duration: 0.08 },
  },
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_70%_35%,rgba(13,88,202,0.35),transparent_70%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_55%_at_30%_70%,rgba(16,185,129,0.30),transparent_70%)]" />

      <motion.div
        className="relative z-10 flex flex-col items-center space-y-6 px-4 py-16 sm:px-8 md:py-20 lg:px-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <h2
          className="select-none text-center font-semibold leading-none"
          style={{
            fontSize: "clamp(2.5rem, 8vw, 7rem)",
            letterSpacing: "0.02em",
            lineHeight: 0.9,
            textShadow: "0 2px 18px rgba(0,0,0,0.45)",
          }}
        >
          Manoj Yadav
        </h2>

        <div className="h-1 w-24 rounded-full bg-linear-to-r from-blue-600 via-cyan-300 to-emerald-400 md:w-32" />

        <div className="flex gap-6 text-2xl md:text-3xl">
          {socials.map(({ Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label}
              title={label}
              target="_blank"
              rel="noopener noreferrer"
              variants={glowVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="inline-flex items-center justify-center text-gray-300 transition-colors duration-200 hover:text-cyan-300"
            >
              <Icon />
            </motion.a>
          ))}
        </div>

        <p className="max-w-xl text-center text-sm italic text-gray-300 sm:text-base">
          "Success is when preparation meets opportunity."
        </p>

        <p className="text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Manoj Yadav. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
}
