import React, { useState } from "react";
import { X, Plus } from "lucide-react";

function TaskForm({ onCancel, createTask, newModel, setNewModel }) {
  const [addNewTask, setAddNewTask] = useState(false);
  return (
    <div className="bg-gray-900 rounded-2xl shadow-2xl p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Add New Task</h2>
        <button
          className="text-gray-400 hover:text-red-500 transition"
          onClick={onCancel}
        >
          <X size={26} />
        </button>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Task title..."
          value={newModel.title}
          onChange={(e) => setNewModel({ ...newModel, title: e.target.value })}
          className="w-full px-4 py-3 bg-gray-800 rounded-lg text-white placeholder-gray-400
          focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

        <textarea
          placeholder="Task description (optional)"
          value={newModel.description}
          onChange={(e) =>
            setNewModel({ ...newModel, description: e.target.value })
          }
          className="w-full px-4 py-3 bg-gray-800 rounded-lg text-white placeholder-gray-400 resize-none
          focus:outline-none focus:ring-1 focus:ring-blue-500"
          rows="3"
        />
        <div className="flex gap-3">
          <button
            onClick={createTask}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:from-blue-500 transition"
          >
            <Plus size={16} /> Add Task
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-700 tex-gray-300 py-3 rounded-lg hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskForm;
