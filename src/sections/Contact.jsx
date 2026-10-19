
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import ParticlesBackground from "../components/ParticlesBackground";
import Astra from "../assets/Astra.png";

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

const initialFormData = {
  name: "",
  email: "",
  service: "",
  budget: "",
  idea: "",
};

export default function Contact() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "budget" && value && !/^\d+$/.test(value)) {
      return;
    }

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    if (status) setStatus("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.service) {
      newErrors.service = "Please select a service.";
    }

    if (
      formData.service &&
      formData.service !== "other" &&
      !formData.budget.trim()
    ) {
      newErrors.budget = "Please enter your budget.";
    }

    if (!formData.idea.trim()) {
      newErrors.idea = "Please explain your idea.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus("error");
      console.error("Please configure your EmailJS environment variables.");
      return;
    }

    setStatus("sending");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          ...formData,
          name: formData.name,
          email: formData.email,
          service: formData.service,
          budget: formData.budget || "Not specified",
          idea: formData.idea,
          form_name: formData.name,
          reply_to: formData.email,
        },
        PUBLIC_KEY
      );

      setStatus("success");
      setFormData({ ...initialFormData });
      setErrors({});
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    }
  };

  const inputClass = (field) =>
    `w-full rounded-md border ${
      errors[field] ? "border-red-500" : "border-gray-500"
    } bg-white/10 p-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none`;

  return (
    <section
      id="contact"
      className="relative flex min-h-screen w-full flex-col items-center justify-center gap-10 overflow-hidden bg-black px-6 py-20 text-white md:px-20"
    >
      <ParticlesBackground />

      <div className="relative z-10 flex w-full max-w-7xl flex-col items-center gap-10 md:flex-row">
        {/* Image */}
        <motion.div
          className="flex w-full justify-center md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.img
            src={Astra}
            alt="Contact illustration"
            className="w-72 max-w-full rounded-2xl object-cover shadow-lg sm:w-96 md:w-full md:max-w-md"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Contact form */}
        <motion.div
          className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-sm sm:p-8 md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-2 text-3xl font-bold sm:text-4xl">
            Let's Work Together
          </h2>

          <p className="mb-6 text-sm leading-relaxed text-gray-400">
            Have a project idea or want to connect? Send me a message.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Name */}
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-2 text-sm">
                Your Name <span className="text-red-500">*</span>
              </label>

              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass("name")}
              />

              {errors.name && (
                <p className="mt-1 text-xs text-red-400">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2 text-sm">
                Your Email <span className="text-red-500">*</span>
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={inputClass("email")}
              />

              {errors.email && (
                <p className="mt-1 text-xs text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Service */}
            <div className="flex flex-col">
              <label htmlFor="service" className="mb-2 text-sm">
                Service Needed <span className="text-red-500">*</span>
              </label>

              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={inputClass("service")}
              >
                <option value="" disabled className="text-black">
                  Select a service
                </option>
                <option value="Web Development" className="text-black">
                  Web Development
                </option>
                <option value="Mobile application" className="text-black">
                  Mobile Application
                </option>
                <option value="other" className="text-black">
                  Other / Just Contact Me
                </option>
              </select>

              {errors.service && (
                <p className="mt-1 text-xs text-red-400">{errors.service}</p>
              )}
            </div>

            {/* Budget */}
            {formData.service && formData.service !== "other" && (
              <div className="flex flex-col">
                <label htmlFor="budget" className="mb-2 text-sm">
                  Budget (NPR) <span className="text-red-500">*</span>
                </label>

                <input
                  id="budget"
                  type="number"
                  min="0"
                  name="budget"
                  placeholder="Enter your budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={inputClass("budget")}
                />

                {errors.budget && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.budget}
                  </p>
                )}
              </div>
            )}

            {/* Idea */}
            <div className="flex flex-col">
              <label htmlFor="idea" className="mb-2 text-sm">
                Your Message <span className="text-red-500">*</span>
              </label>

              <textarea
                id="idea"
                name="idea"
                rows={5}
                placeholder="Tell me about your project or message..."
                value={formData.idea}
                onChange={handleChange}
                className={`${inputClass("idea")} resize-y`}
              />

              {errors.idea && (
                <p className="mt-1 text-xs text-red-400">{errors.idea}</p>
              )}
            </div>

            {/* Status */}
            {status && (
              <p
                role="status"
                aria-live="polite"
                className={`text-sm ${
                  status === "success"
                    ? "text-green-400"
                    : status === "error"
                      ? "text-red-400"
                      : "text-yellow-400"
                }`}
              >
                {status === "sending" &&
                  "Sending your message..."}
                {status === "success" &&
                  "Message sent successfully!"}
                {status === "error" &&
                  "Unable to send your message. Check your EmailJS configuration and try again."}
              </p>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={status === "sending"}
              className="rounded-md bg-cyan-600 py-3 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
