import React, { createContext, useContext, useEffect, useState } from "react";

export const TaskContext = createContext();

export function useTasks() {
  return useContext(TaskContext);
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            title: "Task 1",
            status: "in progress",
            description: "Description for Task 1",
            dueDate: "2023-10-15",
          },
          {
            id: 2,
            title: "Task 2",
            status: "completed",
            description: "Description for Task 2",
            dueDate: "2023-10-16",
          },
          {
            id: 3,
            title: "Task 3",
            description: "Description for Task 3",
            status: "in progress",
            dueDate: "2023-10-17",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(task) {
    const newTask = { ...task, id: Date.now() };
    setTasks((prev) => [...prev, newTask]);
    return { success: true };
  }

  function updateTask(updatedTask) {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}
