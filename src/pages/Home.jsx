import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Always scroll to top on page load
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">

      {/* Hero Section */}
      <section className="w-full bg-blue-600 text-white text-center py-20 px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Master Your Money Journey with FinQuest</h1>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
          Fast lessons. Real rewards. Total confidence.
        </p>
        <div className="space-x-4">
          <Link to="/signup" className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-lg hover:bg-gray-100 transition">
            Start Learning
          </Link>
          <Link to="/about" className="border-2 border-white py-2 px-6 rounded-lg hover:bg-white hover:text-blue-600 transition">
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6 max-w-6xl w-full text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">Why Choose FinQuest?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white shadow-md p-8 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">Fast, Fun Lessons</h3>
            <p className="text-gray-600">
              Bite-sized daily lessons that actually stick — no boring lectures.
            </p>
          </div>

          <div className="bg-white shadow-md p-8 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">Real-World Skills</h3>
            <p className="text-gray-600">
              Learn budgeting, taxes, credit building, and investing — skills that matter.
            </p>
          </div>

          <div className="bg-white shadow-md p-8 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">Rewards That Motivate</h3>
            <p className="text-gray-600">
              Earn XP, unlock badges, and level up your financial game.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-white w-full text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">How FinQuest Works</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 max-w-5xl mx-auto">
          <div className="bg-blue-100 p-6 rounded-xl shadow-md w-full md:w-1/3">
            <h3 className="font-bold text-blue-700 mb-2">1. Learn</h3>
            <p className="text-gray-700">Take fast, fun lessons daily — tailored to your goals.</p>
          </div>
          <div className="bg-blue-100 p-6 rounded-xl shadow-md w-full md:w-1/3">
            <h3 className="font-bold text-blue-700 mb-2">2. Level Up</h3>
            <p className="text-gray-700">Earn XP, collect badges, and track your progress like a pro.</p>
          </div>
          <div className="bg-blue-100 p-6 rounded-xl shadow-md w-full md:w-1/3">
            <h3 className="font-bold text-blue-700 mb-2">3. Master Money</h3>
            <p className="text-gray-700">Build confidence and take control of your financial future.</p>
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="w-full bg-blue-600 text-white text-center py-16 px-6 mt-12">
        <h2 className="text-3xl font-bold mb-6">Ready to Level Up Your Finances?</h2>
        <Link to="/signup" className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition text-lg">
          Join FinQuest Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} FinQuest. All rights reserved.
      </footer>
      
    </div>
  );
};

export default HomePage;
