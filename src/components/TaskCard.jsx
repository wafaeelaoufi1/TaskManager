import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import React from "react";
import dayjs from "dayjs";

const TaskCard = ({ task }) => {
  const { updateTask, deleteTask } = useContext(TaskContext);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({ ...task });
  const [errors, setErrors] = useState({});

  // For Read More / Read Less
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleChange = (e) => {
    setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: false }));
  };

  const validate = () => {
    const newErrors = {};

    if (!updatedTask.title.trim()) newErrors.title = true;
    if (!updatedTask.description.trim()) newErrors.description = true;
    if (!updatedTask.dueDate) {
      newErrors.dueDate = "Due date is required";
    } else {
      const today = dayjs().startOf("day");
      const dueDate = dayjs(updatedTask.dueDate);
      if (!dueDate.isAfter(today)) {
        newErrors.dueDate = "Date must be in the future";
      }
    }
    if (!updatedTask.status) newErrors.status = true;

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validate()) return;

    await updateTask(updatedTask);
    setShowModal(false);
  };

  const closeModals = () => {
    setShowModal(false);
    setShowDeleteModal(false);
    setErrors({});
  };

  // Function to show truncated or full description
  const getDescription = () => {
    if (showFullDescription) return updatedTask.description;
    // Limit to about 150 characters (approx. 2 lines)
    if (task.description.length > 150) {
      return task.description.slice(0, 150) + "...";
    }
    return task.description;
  };

  return (
    <>
      <div className="backdrop-blur-md bg-white/50 border border-purple-200 shadow-xl rounded-2xl p-6 w-80 mx-auto relative z-0 flex flex-col justify-between h-full">
        <h3 className="text-2xl font-bold text-center text-purple-800 mb-2">
          {task.title}
        </h3>

        <p
          className="text-gray-700 text-md mb-4"
          style={{ whiteSpace: "pre-line" }}
        >
          {showFullDescription ? task.description : getDescription()}
          {task.description.length > 150 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="ml-1 text-purple-600 underline hover:text-purple-800"
            >
              {showFullDescription ? "Read less" : "Read more"}
            </button>
          )}
        </p>

        <p className="text-right text-sm text-gray-600 mb-4">
          Due date: {dayjs(task.dueDate).format("DD/MM/YYYY")}
        </p>

        {/* Edit and Delete buttons side by side */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full shadow transition"
            onClick={(e) => {
              e.stopPropagation();
              setShowDeleteModal(false);
              setShowModal(true);
            }}
          >
            Edit
          </button>
          <button
            className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow transition"
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(false);
              setShowDeleteModal(true);
            }}
          >
            Delete
          </button>
        </div>

        <div
          className={`text-center text-white font-semibold py-2 rounded-xl ${
            task.status === "in progress"
              ? "bg-green-500"
              : task.status === "completed"
              ? "bg-red-500"
              : "bg-blue-500"
          }`}
        >
          Task: <span className="capitalize">{task.status}</span>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <>
          <div
            className="fixed inset-0 z-40 backdrop-blur-sm bg-black/30"
            onClick={() => setShowDeleteModal(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="bg-white border border-purple-300 w-full max-w-md rounded-2xl shadow-2xl p-6 z-50">
              <h2 className="text-xl font-bold text-purple-800 mb-4 text-center">
                Confirm Deletion
              </h2>
              <p className="text-center mb-6">
                Are you sure you want to delete this task?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    deleteTask(task.id);
                    setShowDeleteModal(false);
                  }}
                  className="px-4 py-2 bg-purple-800 text-white rounded hover:bg-purple-900"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Edit Modal */}
      {showModal && (
        <>
          <div
            className="fixed inset-0 z-40 backdrop-blur-sm bg-black/30"
            onClick={() => setShowModal(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="bg-white border border-purple-300 w-full max-w-lg rounded-2xl shadow-2xl p-6 z-50">
              <h2 className="text-2xl font-bold mb-6 text-center text-purple-800">
                Edit Task
              </h2>

              <div className="mb-4">
                <label className="block font-semibold mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={updatedTask.title}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    Title is required.
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  name="description"
                  value={updatedTask.description}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                  rows={4}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    Description is required.
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block font-semibold mb-1">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={updatedTask.dueDate}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${
                    errors.dueDate ? "border-red-500" : "border-gray-300"
                  }`}
                  min={dayjs().add(1, "day").format("YYYY-MM-DD")}
                />
                {errors.dueDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block font-semibold mb-1">Status</label>
                <select
                  name="status"
                  value={updatedTask.status}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${
                    errors.status ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">-- Select --</option>
                  <option value="to do">To Do</option>
                  <option value="in progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-sm mt-1">
                    Status is required.
                  </p>
                )}
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TaskCard;
