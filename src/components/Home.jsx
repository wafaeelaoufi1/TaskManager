import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-white via-purple-100 to-purple-300 text-gray-800">
      <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-6 text-purple-800 drop-shadow-md">
        Welcome to the Task Manager
      </h1>
      <p className="text-lg md:text-xl text-center max-w-xl mb-10">
        Organize your tasks, stay focused, and be more productive. Create and
        manage your daily to-do items with ease!
      </p>
      <Link to="/addTask">
        <button className="px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-full text-lg font-semibold shadow-md transition duration-300">
          Get started
        </button>
      </Link>
    </div>
  );
}

export default Home;
