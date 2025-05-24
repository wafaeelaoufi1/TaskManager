import { Link, Outlet } from "react-router-dom";
import { SiGoogletagmanager } from "react-icons/si";
import { FaTrash } from "react-icons/fa";

function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br text-gray-800 bg-white">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-white backdrop-blur-lg  px-6 pt-4  flex justify-between items-center  ">
        <Link to="/" className="flex items-center space-x-2">
          <SiGoogletagmanager className="text-purple-700 w-10 h-10" />
          <span className="text-3xl font-bold text-purple-800">
            TaskManager
          </span>
        </Link>

        <div className="flex space-x-4">
          <Link to="/addTask">
            <button className="bg-white hover:bg-purple-600 border-2 border-purple-600 hover:text-white text-purple-600 font-semibold px-5 py-2 rounded-full transition shadow">
              Add Task
            </button>
          </Link>
          <Link to="/tasks">
            <button className="bg-purple-600 hover:bg-white border-2 border-purple-600 hover:text-purple-600 text-white font-semibold px-5 py-2 rounded-full transition shadow">
              My Tasks
            </button>
          </Link>
        </div>
      </nav>
      {/* CONTENU */}
      <div className="bg-gradient-to-b from-white via-purple-100 to-purple-300 text-gray-800">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
