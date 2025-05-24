import { useState } from "react";
import TaskList from "./components/TaskList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskForm from "./components/TaskForm";
import { TaskProvider } from "./context/TaskContext";

import "./App.css";
import Home from "./components/Home";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <TaskProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/addTask" element={<TaskForm />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </>
  );
}

export default App;
