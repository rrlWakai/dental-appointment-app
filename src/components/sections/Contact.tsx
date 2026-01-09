import Button from "../ui/Button";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section className="relative bg-gray-100 py-24">
      {/* Top Gradient Separator */}
      <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-blue-200/50 to-transparent" />

      <div className="container mx-auto max-w-6xl px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Contact Us
          </h2>
          <p className="text-gray-600 mt-2 text-base">
            Reach out to us for inquiries or appointments.
          </p>
        </div>

        {/* Form + Map Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-between space-y-4 bg-white p-6 rounded-2xl shadow-xl border border-blue-100"
          >
            <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 text-center">
              Contact Us
            </h2>
            <div className="space-y-4">
              {/* Name & Email */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Message */}
              <textarea
                placeholder="Message"
                rows={3}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />

              {/* Contact Info (inside form with dots) */}
              <ul className="space-y-2 mt-2">
                <li className="flex items-center text-sm text-gray-700">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2" />
                  123 Smile Street, Dental City
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2" />
                  +63 912 345 6789
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2" />
                  info@smilecare.com
                </li>
              </ul>
            </div>
            {/* Submit Button */}
            <Button
              type="submit"
              className="mt-2 w-full bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 transition"
            >
              Send Message
            </Button>
          </motion.form>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="rounded-xl overflow-hidden shadow-lg"
          >
            <iframe
              title="clinic-location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.963401409565!2d100.50176531523957!3d13.75633099034668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29ed4810e4c7b%3A0xf0b0d1b5b6a16e3a!2sBangkok%2C%20Thailand!5e0!3m2!1sen!2sph!4v1683648076555!5m2!1sen!2sph"
              className="w-full h-full min-h-[400px] sm:min-h-[450px] border-0"
              allowFullScreen
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Separator */}
      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-blue-200/50 to-transparent"></div>
    </section>
  );
}
