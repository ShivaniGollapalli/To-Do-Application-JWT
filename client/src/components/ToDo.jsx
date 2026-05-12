import React, { useEffect, useState } from "react";
import ToDoHeader from "./ToDoHeader";
import Stats from "./Stats";
import FilterButtons from "./FilterButtons";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import TaskEdit from "./TaskEdit";
import axios from "axios";

import {
  fetchTaskAPI,
  createTaskAPI,
  updateTaskAPI,
  deleteTaskAPI,
} from "../Helpers/TaskAPIHelper";
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
function Todo() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newModel, setNewModel] = useState({ title: "", description: "" });
  const [editTask, setEditTask] = useState(null);
  const [updateTast, setUpdateTask] = useState(null);
  const [deleteTask, setDeleteTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);

  const loadUser = async () => {
    try {
      const res = await API.get("/auth/getUser");
      if (res?.data?.status) {
        setUser(res.data.user);
        await fetchTasks();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async () => {
    try {
      await API.post("/auth/signOut");
      window.location.href = "/login";
    } catch (err) {
      console.log("Logout failed", err);
    }
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await fetchTaskAPI();
      setTasks(data);
    } catch (error) {
      console.log("Error fetching", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async () => {
    try {
      const data = await createTaskAPI(newModel);
      setTasks([...tasks, data?.task]);
      setNewModel({ title: "", description: "" });
      setShowForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const updatedTask = await updateTaskAPI(id, updates);
      setTasks(tasks.map((t) => (t._id === id ? updatedTask : t)));
      setEditTask(null);
    } catch (err) {
      console.log(err);
    }
  };

  const toDeleteTask = async (id) => {
    try {
      await deleteTaskAPI(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch("https://to-do-application-with-jwt.onrender.com/health").catch(() => {});
    loadUser();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    if (!task) return false;
    if (filter === "all") return true;
    return task.status === filter;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    pending: tasks.filter((t) => t.status === "pending").length,
    progress: tasks.filter((t) => t.status === "progress").length,
  };

  const showActions = filter !== "all";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <ToDoHeader username={user?.name} onLogout={handleLogout} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-8 pb-8 sm:pb-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
            Welcome back{user?.name ? `, ${user.name}` : ""}
          </h1>

          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Manage your daily tasks, track progress, and stay productive.
          </p>
        </div>

        <Stats {...stats} />

        <div className="flex justify-end mt-3 mb-3">
          <button
            onClick={() => setShowForm(true)}
            className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm sm:text-base font-medium"
          >
            + Add Task
          </button>
        </div>

        <FilterButtons filter={filter} setFilter={setFilter} />

        <TaskList
          tasks={filteredTasks}
          loading={loading}
          editTask={editTask}
          setEditingTask={setEditTask}
          updateTask={updateTask}
          deleteTask={toDeleteTask}
          showActions={showActions}
        />
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-[10px] flex items-center justify-center z-50 px-4">
          <div className="w-full max-w-xl">
            <TaskForm
              onCancel={() => setShowForm(false)}
              createTask={createTask}
              newModel={newModel}
              setNewModel={setNewModel}
            />
          </div>
        </div>
      )}

      {editTask && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-[10px] flex items-center justify-center z-50 px-4">
          <div className="w-full max-w-xl">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-4 sm:p-6 shadow-xl">
              <TaskEdit
                task={editTask}
                onSave={(updates) => updateTask(editTask._id, updates)}
                onCancel={() => setEditTask(null)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Todo;