import Card from "../ui/Card";
import { motion } from "framer-motion";

const doctors = [
  {
    name: "Dr. Angela Cruz",
    role: "General Dentist",
    experience: "12 Years",
    image: "/doctors/doctor-1.jpg",
  },
  {
    name: "Dr. Miguel Santos",
    role: "Orthodontist",
    experience: "10 Years",
    image: "/doctors/doctor-2.jpg",
  },
  {
    name: "Dr. Patricia Reyes",
    role: "Cosmetic Dentist",
    experience: "8 Years",
    image: "/doctors/doctor-3.jpg",
  },
];

export default function Doctors() {
  return (
    <section className="relative bg-gray-50 py-16">
      <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-blue-200/50 to-transparent"></div>

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Meet Our Dental Experts
          </h2>
          <p className="text-gray-600 mt-2 text-base">
            Licensed and experienced dentists committed to exceptional care.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor, i) => (
            <motion.div
              key={doctor.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Card className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1 border border-blue-100 bg-white">
                <div className="relative">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="h-64 w-full object-cover rounded-t-2xl transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />
                </div>

                <div className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {doctor.name}
                  </h3>
                  <p className="text-blue-600 text-sm font-medium mt-1">
                    {doctor.role}
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    {doctor.experience}
                  </p>
                  <div className="w-12 h-1 mx-auto bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 rounded-full mt-4 mb-4" />
                  <button className="mt-2 px-6 py-2 rounded-full bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-600 transition duration-300">
                    View Profile
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-blue-200/50 to-transparent"></div>
    </section>
  );
}
