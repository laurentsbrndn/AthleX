import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-500 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-28 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            Welcome to <span className="text-white drop-shadow-lg">AthleX</span>
          </h1>
          <p className="text-lg md:text-xl text-green-50 max-w-2xl mx-auto mb-8">
            Your all-in-one fitness platform. High-quality gym equipment, expert
            workout programs, and custom meal plans to achieve your goals.
          </p>
          <Link
            to="/products"
            className="inline-block bg-white text-green-600 font-semibold px-8 py-4 rounded-2xl shadow hover:scale-105 transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Build your strength, stay motivated, and fuel your progress with
            AthleX's complete fitness ecosystem.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Products */}
          <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl hover:-translate-y-1 transition">
            <img
              src="https://www.svgrepo.com/show/34869/one-dumbbell.svg"
              alt="Equipment"
              className="w-20 mx-auto mb-6"
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Gym Equipment
            </h3>
            <p className="text-gray-600 mb-6">
              Explore high-quality gym equipment to support your training.
            </p>
            <Link
              to="/products"
              className="inline-block bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition"
            >
              Explore
            </Link>
          </div>

          {/* Workouts */}
          <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl hover:-translate-y-1 transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2964/2964514.png"
              alt="Workout"
              className="w-20 mx-auto mb-6"
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Workout Programs
            </h3>
            <p className="text-gray-600 mb-6">
              Access personalized workout routines built by experts.
            </p>
            <Link
              to="/workouts"
              className="inline-block bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition"
            >
              View
            </Link>
          </div>

          {/* Meal Plans */}
          <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl hover:-translate-y-1 transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/706/706195.png"
              alt="Meal Plans"
              className="w-20 mx-auto mb-6"
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Meal Plans
            </h3>
            <p className="text-gray-600 mb-6">
              Get customized meal plans to fuel your fitness journey.
            </p>
            <Link
              to="/meal-plans"
              className="inline-block bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition"
            >
              See Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
