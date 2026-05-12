import {React,useState} from "react";
import { Link,useLocation } from "react-router-dom";
import { CheckSquare, PlusCircle } from "lucide-react";


function Header() {
    const location = useLocation();
    const [singInBtn, setSignInBtn] = useState(false);
     const showSignInBtn = location.pathname === "/";
  return (
    <header className="w-full bg-gray-900/50 backdrop-blur-lg border-b border-gray-700 p-4 rounded-xl shadow-lg">
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
        {showSignInBtn && (
          <div className="flex gap-4">
            <Link
              to="/register"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition font-medium shadow-lg"
            >
              Sign In / Log In
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
