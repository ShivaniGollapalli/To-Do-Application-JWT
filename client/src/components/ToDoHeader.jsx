import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CheckSquare } from "lucide-react";
import logo from "../assets/person_icon.svg";

function ToDoHeader({ username, onLogout }) {
  const [open, setOpen] = useState(false);
  const getInitials = (name) => {
  if (!name) return "U";

  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

  return (
   <header className="sticky top-0 z-40 w-full bg-gray-900/80 backdrop-blur-xl border-b border-gray-700 px-4 py-4 shadow-lg">
      <div className="max-w-full mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 group transition-all duration-200"
        >
          <div className="p-2 rounded-xl bg-gray-800 border border-gray-700 group-hover:bg-gray-700 transition">
            <CheckSquare className="w-5 h-5 text-white" />
          </div>

          <div>
            <h1 className="text-xl font-semibold text-white tracking-wide">
              Task Manager
            </h1>
            <p className="text-xs text-gray-400">
              Organize your work efficiently
            </p>
          </div>
        </Link>


        <div className="relative">
         <div
  className="flex items-center gap-2 cursor-pointer"
  onClick={() => setOpen((prev) => !prev)}
>
  <p className="hidden sm:block text-sm text-gray-300 font-medium">
    {username || "User"}
  </p>

  <p className="sm:hidden text-sm text-gray-300 font-medium">
    {getInitials(username)}
  </p>

  <img src={logo} alt="user" className="w-7 h-7 rounded-full" />
</div>

          {open && (
            <button
              type="button"
              onClick={onLogout}
              className="absolute right-0 top-10 bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-md whitespace-nowrap shadow-lg hover:bg-gray-700"
            >
              Logout
            </button>
          )}
        </div>
      </div>

    </header>
  );
}

export default ToDoHeader;