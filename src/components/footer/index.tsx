import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Athle<span className="text-green-500">X</span>
          </h2>
          <p className="text-gray-400">
            Your all-in-one platform for workouts, nutrition, and fitness gear.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-green-500">Home</Link></li>
            <li><Link to="/products" className="hover:text-green-500">Products</Link></li>
            <li><Link to="/workouts" className="hover:text-green-500">Workouts</Link></li>
            <li><Link to="/mealplans" className="hover:text-green-500">Meal Plans</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-green-500">📘</a>
            <a href="#" className="hover:text-green-500">📸</a>
            <a href="#" className="hover:text-green-500">🎥</a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} AthleX. All rights reserved.
      </div>
    </footer>
  );
};
