
import { FiX } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

export default function OverlayMenu({ isOpen, onClose }) {
  const menuItems = [
    "Home",
    "About",
    "Skills",
    "Projects",
    "Experience",
    "Testimonials",
    "Contact",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-0 right-0 bottom-0 left-0 w-screen h-screen z-[99999] flex items-center justify-center overflow-y-auto"
          style={{
            backgroundColor: "#000000",
            position: "fixed",
            inset: 0,
          }}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="fixed top-6 right-6 z-[100000] text-white text-4xl hover:text-pink-400 transition-colors"
          >
            <FiX />
          </button>

          {/* Navigation Links */}
          <ul className="flex flex-col items-center gap-6 py-20">
            {menuItems.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={onClose}
                  className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white hover:text-pink-400 transition-colors duration-300"
                >
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
