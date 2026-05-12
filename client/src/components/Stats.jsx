import React from "react";

function Stats({ total, completed, pending, progress }) {
  return (
    <div className="w-full mt-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 w-full">
        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 text-center">
          <div className="text-xl font-bold text-blue-400">{total}</div>
          <div className="text-sm text-gray-300">Tasks</div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 text-center">
          <div className="text-xl font-bold text-blue-400">{completed}</div>
          <div className="text-sm text-gray-300">Completed</div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 text-center">
          <div className="text-xl font-bold text-blue-400">{pending}</div>
          <div className="text-sm text-gray-300">Pending</div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 text-center">
          <div className="text-xl font-bold text-blue-400">{progress}</div>
          <div className="text-sm text-gray-300">In Progress</div>
        </div>
      </div>
    </div>
  );
}

export default Stats;