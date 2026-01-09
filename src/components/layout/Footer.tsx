export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto max-w-7xl px-6 py-12 flex flex-col lg:flex-row justify-between items-center gap-6">
        <div className="text-center lg:text-left">
          <span className="text-2xl">🦷</span>
          <span className="ml-2 font-bold text-gray-900">SmileCare</span>
          <p className="text-gray-500 text-sm mt-2">
            © {new Date().getFullYear()} SmileCare Dental Clinic. All rights
            reserved.
          </p>
        </div>

        <div className="text-center lg:text-left text-gray-600 text-sm">
          <p>123 Smile Street, Dental City</p>
          <p>+63 912 345 6789</p>
          <p>info@smilecare.com</p>
        </div>

        <div className="flex gap-4">
          <a href="#" className="text-gray-500 hover:text-blue-600 transition">
            FB
          </a>
          <a href="#" className="text-gray-500 hover:text-blue-600 transition">
            IG
          </a>
          <a href="#" className="text-gray-500 hover:text-blue-600 transition">
            TW
          </a>
        </div>
      </div>
    </footer>
  );
}
