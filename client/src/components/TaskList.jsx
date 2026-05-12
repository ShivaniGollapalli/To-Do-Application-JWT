import React from "react";
import TaskItems from "./TaskItems";

function TaskList({
  tasks,
  loading,
  editTask,
  setEditingTask,
  updateTask,
  deleteTask,
  showActions,
}) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400 text-lg">No tasks found, try adding one!</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .task-scroll::-webkit-scrollbar {
          width: 4px;
        }

        .task-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .task-scroll::-webkit-scrollbar-thumb {
          background: transparent;
          border-radius: 999px;
        }

        .task-scroll:hover::-webkit-scrollbar-thumb {
          background: #3b82f6;
        }

        .task-scroll:hover::-webkit-scrollbar-thumb:hover {
          background: #60a5fa;
        }
      `}</style>

      <div className="task-scroll max-h-[500px] overflow-y-auto pr-2 space-y-4 border border-gray-700 rounded-lg p-4">
        {tasks.map((task) => (
          <TaskItems
            key={task._id}
            task={task}
            editTask={editTask}
            setEditingTask={setEditingTask}
            updateTask={updateTask}
            deleteTask={deleteTask}
            showActions={showActions}
          />
        ))}
      </div>
    </>
  );
}

export default TaskList;