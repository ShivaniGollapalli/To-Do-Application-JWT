import React from "react";
import Header from "./components/Header";
import { Link } from "react-router-dom";
import Todo from "./components/ToDo";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />

      {/* Landing Page Section */}
      <section className="max-w-5xl mx-auto mt-20 px-6 text-center">
        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-md">
          Organize Your Day,
          <span className="text-indigo-500"> Effortlessly</span>
        </h1>

        <p className="mt-4 text-gray-300 text-lg max-w-2xl mx-auto">
          A smart and secure To-Do Manager to keep your daily tasks organized.
          Track, manage, and complete your goals with ease — anywhere, anytime.
        </p>

        {/* CTA Button */}
        <div className="mt-8">
          <Link
            to="/login"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-xl transition-all"
          >
            Get Started →
          </Link>
        </div>

        {/* Thumbnail / App Preview Card */}
        {/* Thumbnail / App Preview Card */}
        <div className="mt-16 flex justify-center">
          <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700 shadow-2xl rounded-2xl p-6 w-full max-w-3xl">
            <h3 className="text-xl font-semibold text-white mb-3">
              Clean & Modern To-Do Manager
            </h3>

            <div className="bg-gray-900 rounded-xl p-5 border border-gray-700 space-y-4">
              {/* Task Item 1 */}
              <div className="flex items-center justify-between bg-gray-800/70 border border-gray-700 rounded-lg p-4 hover:border-indigo-500 hover:shadow-lg transition">
                <div className="flex items-start space-x-3">
                  <span className="w-5 h-5 border-2 border-indigo-400 rounded-full"></span>
                  <div>
                    <p className="text-white font-medium">
                      Finish React Dashboard UI
                    </p>
                    <p className="text-gray-400 text-sm">
                      Design and build the Task List layout
                    </p>
                  </div>
                </div>
                <span className="text-xs bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full border border-blue-600/30">
                  In Progress
                </span>
              </div>

              {/* Task Item 2 */}
              <div className="flex items-center justify-between bg-gray-800/70 border border-gray-700 rounded-lg p-4 hover:border-indigo-500 hover:shadow-lg transition">
                <div className="flex items-start space-x-3">
                  <span className="w-5 h-5 border-2 border-green-400 rounded-full bg-green-400/80"></span>
                  <div>
                    <p className="text-white font-medium line-through">
                      Write Authentication API
                    </p>
                    <p className="text-gray-500 text-sm">
                      Login, Register, Logout flow
                    </p>
                  </div>
                </div>
                <span className="text-xs bg-green-600/20 text-green-400 px-3 py-1 rounded-full border border-green-600/30">
                  Completed
                </span>
              </div>

              {/* Task Item 3 */}
              <div className="flex items-center justify-between bg-gray-800/70 border border-gray-700 rounded-lg p-4 hover:border-indigo-500 hover:shadow-lg transition">
                <div className="flex items-start space-x-3">
                  <span className="w-5 h-5 border-2 border-yellow-400 rounded-full"></span>
                  <div>
                    <p className="text-white font-medium">
                      Create MongoDB Schema
                    </p>
                    <p className="text-gray-400 text-sm">User & Task Models</p>
                  </div>
                </div>
                <span className="text-xs bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full border border-yellow-600/30">
                  Pending
                </span>
              </div>

              {/* Task Item 4 */}
              <div className="flex items-center justify-between bg-gray-800/70 border border-gray-700 rounded-lg p-4 hover:border-indigo-500 hover:shadow-lg transition">
                <div className="flex items-start space-x-3">
                  <span className="w-5 h-5 border-2 border-red-400 rounded-full"></span>
                  <div>
                    <p className="text-white font-medium">
                      Set Up JWT Middleware
                    </p>
                    <p className="text-gray-400 text-sm">
                      Protect routes & validate tokens
                    </p>
                  </div>
                </div>
                <span className="text-xs bg-red-600/20 text-red-400 px-3 py-1 rounded-full border border-red-600/30">
                  Not Started
                </span>
              </div>
            </div>

            <p className="text-gray-400 mt-4 text-sm text-center">
              (Preview of how your To-Do Dashboard will look)
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
