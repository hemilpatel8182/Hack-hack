import { useEffect } from 'react';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Auto scroll to top on page load
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6 space-y-10">
      
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">About Us</h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          At FinQuest, learning about money feels like building your next big win — not sitting through another boring lecture.
        </p>
      </div>

      {/* Our Story */}
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-5xl">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Our Story</h2>
        <p className="text-gray-700 text-md leading-relaxed">
          We created FinQuest because we saw a huge gap: teenagers want financial freedom but often don't get the right tools, knowledge, or motivation to achieve it early.
          So we built a platform that makes mastering money skills as exciting as leveling up in a game — quick wins, daily quests, real rewards, and lifelong results.
          <br /><br />
          FinQuest isn’t just another finance app. It’s your training ground for life.
        </p>
      </div>

      {/* Why We Built Section */}
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-5xl">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Why We Built FinQuest</h2>
        <ul className="space-y-4 list-disc list-inside text-gray-700">
          <li><strong>To make finance accessible.</strong> No complicated jargon. Just real-world skills you can use — starting now.</li>
          <li><strong>To turn learning into action.</strong> Every lesson, every challenge, and every quest is designed to build your real money confidence.</li>
          <li><strong>To help you control your future.</strong> Because money should never be a mystery — it should be your tool to chase dreams, not fears.</li>
        </ul>
      </div>

      {/* What You'll Get Section */}
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-5xl">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">What You’ll Get</h2>
        <ul className="space-y-4 text-gray-700">
          <li>🚀 Fast, fun daily lessons that actually stick.</li>
          <li>💰 Practical skills like budgeting, taxes, credit building, and investing.</li>
          <li>🎯 Levels and rewards that keep you motivated.</li>
          <li>🧠 Real confidence to make smart money moves — forever.</li>
        </ul>
      </div>

      {/* Mission Section */}
      <div className="bg-blue-600 text-white shadow-md rounded-xl p-8 w-full max-w-5xl">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <blockquote className="text-lg italic border-l-4 border-white pl-4">
          Empower the next generation to be financially fearless.
          <br /><br />
          Because when you learn it — you earn it.
        </blockquote>
      </div>

    </div>
  );
};

export default AboutPage;
