import { useContext, useState } from "react";
import TaskCard from "./TaskCard";
import { TaskContext } from "../context/TaskContext";

function TaskList() {
  const { tasks } = useContext(TaskContext);
  const [statusFilter, setStatusFilter] = useState("");

  const filteredTasks = tasks.filter(
    (task) => statusFilter === "" || task.status === statusFilter
  );

  return (
    <div className="min-h-screen w-full px-6 py-20 bg-gradient-to-b from-white via-purple-100 to-purple-300 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-2">
          <h1 className="text-5xl font-extrabold text-purple-700 drop-shadow-sm">
            Task Manager
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Stay organized. Stay productive.
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-md shadow-xl rounded-2xl p-6 mb-10 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 border border-purple-100">
          <select
            className="bg-white/80 border border-gray-300 text-gray-700 rounded-lg p-3 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-purple-300"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All statuses</option>
            <option value="to do">To Do</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, key) => <TaskCard task={task} key={key} />)
          ) : (
            <div className="col-span-full flex items-center justify-center h-96 text-gray-600 text-xl font-medium">
              <p>No tasks found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskList;
