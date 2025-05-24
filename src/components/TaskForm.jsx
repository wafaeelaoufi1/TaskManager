import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TaskContext } from "../context/TaskContext";
import dayjs from "dayjs";

function Create() {
  const navigate = useNavigate();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const dueDateRef = useRef();
  const statusRef = useRef();
  const { addTask } = useContext(TaskContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = titleRef.current.value.trim();
    const description = descriptionRef.current.value;
    const dueDate = dueDateRef.current.value;
    const status = statusRef.current.value;

    // Validate required title
    if (!title) {
      alert("Title is required.");
      return;
    }

    // Validate due date is in the future
    const today = new Date().setHours(0, 0, 0, 0);
    const selectedDate = new Date(dueDate).setHours(0, 0, 0, 0);

    if (!dueDate || selectedDate <= today) {
      alert("Due date must be in the future.");
      return;
    }

    const task = { title, description, dueDate, status };

    const result = await addTask(task);
    if (result.success) {
      alert("Task added!");
      // Reset the form
      titleRef.current.value = "";
      descriptionRef.current.value = "";
      dueDateRef.current.value = "";
      statusRef.current.value = "to do";
      navigate("/tasks");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-white via-purple-100 to-purple-300 text-gray-800">
      <div className="w-full max-w-3xl mx-auto pb-10 mt-0 px-8 pt-10 bg-white rounded-2xl shadow-lg border border-gray-200">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-700 mb-8 text-center">
          Add New Task
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Task Name
            </label>
            <input
              type="text"
              placeholder="Enter task name"
              ref={titleRef}
              className="w-full px-4 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Description
            </label>
            <input
              type="text"
              placeholder="Enter task description"
              ref={descriptionRef}
              className="w-full px-4 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              ref={dueDateRef}
              defaultValue={dayjs().add(1, "day").format("YYYY-MM-DD")}
              min={dayjs().add(1, "day").format("YYYY-MM-DD")}
              className="w-full px-4 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Status
            </label>
            <select
              ref={statusRef}
              defaultValue="to do"
              className="w-full px-4 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="to do">To Do</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default Create;
