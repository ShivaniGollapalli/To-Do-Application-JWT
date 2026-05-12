import React, { useState } from "react";
import { Check, X } from "lucide-react";

function TaskEdit({ task, onSave, onCancel }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description, status });
  };

  return (
    <div className="space-y-4">
      {/* Title */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-3 py-2 bg-gray-700 border-gray-600 rounded-lg text-white"
        required
      />

      {/* Description */}
      <textarea
        rows="3"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-3 py-2 bg-gray-700 border-gray-600 rounded-lg text-white resize-none"
      />

      {/* Status Dropdown */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full px-3 py-2 bg-gray-700 border-gray-600 rounded-lg text-white"
      >
        <option value="pending">Pending</option>
        <option value="progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-2">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg flex items-center gap-2 shadow-lg"
        >
          <Check size={16} /> Save
        </button>

        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-700 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-600 flex items-center gap-2"
        >
          <X size={16} /> Cancel
        </button>
      </div>
    </div>
  );
}

export default TaskEdit;
