import React, { useState, useEffect } from "react";
import TaskColumn from "./components/TaskColumn";
import CreateTaskForm from "./components/CreateTaskForm";
import BoardInfinity from "./assets/Board_Infinity.png";


const initialTasks = {
  TODO: [
    {
      id: 1,
      title: "Brainstorming",
      description:
        "Brainstorming brings team members' diverse experience into play.",
      priority: "High",
      date: "18/09/2024",
      status: "TODO",
    },
    {
      id: 2,
      title: "Wireframes",
      description:
        "Low fidelity wireframes include the most basic content and visuals.",
      priority: "High",
      date: "18/09/2024",
      status: "TODO",
    },
  ],
  "IN PROGRESS": [
    {
      id: 3,
      title: "Onboarding Illustrations",
      description: "",
      priority: "Low",
      date: "18/10/2024",
      status: "IN PROGRESS",
    },
  ],
  COMPLETED: [
    {
      id: 4,
      title: "Design System",
      description: "It just needs to adapt the UI from what you did before",
      priority: "Medium",
      date: "12/10/2024",
      status: "COMPLETED",
    },
  ],
};

const App = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks((prev) => ({
      ...prev,
      TODO: [...prev.TODO, task],
    }));
  };

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) => {
      const newTasks = { ...prevTasks };
      const status = updatedTask.status;
      newTasks[status] = newTasks[status].map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      return newTasks;
    });
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => {
      const newTasks = { ...prevTasks };
      for (const status in newTasks) {
        newTasks[status] = newTasks[status].filter(
          (task) => task.id !== taskId
        );
      }
      return newTasks;
    });
  };

  const changeTaskStatus = (taskId, newStatus) => {
    setTasks((prevTasks) => {
      const newTasks = { ...prevTasks };
      let taskToMove;

      for (const status in newTasks) {
        const taskIndex = newTasks[status].findIndex(
          (task) => task.id === taskId
        );
        if (taskIndex !== -1) {
          taskToMove = newTasks[status][taskIndex];
          newTasks[status].splice(taskIndex, 1);
          break;
        }
      }

      if (taskToMove) {
        taskToMove.status = newStatus;
        newTasks[newStatus].push(taskToMove);
      }

      return newTasks;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8"> 
      <img src={BoardInfinity} alt="Board-Infinity" height={"75px"} width={"75px"} />
      <div className="max-w-7xl mx-auto mt-12">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">BOARD INFINITY - KANBAN BOARD</h1>
          <button
            className="bg-purple-600 text-white px-2 py-2 rounded-md flex items-center"
            onClick={() => setIsModalOpen(true)}
          >
            Create Task
          </button>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {Object.entries(tasks).map(([status, taskList]) => (
            <TaskColumn
              key={status}
              status={status}
              tasks={taskList}
              onTaskUpdate={updateTask}
              onTaskDelete={deleteTask}
              onTaskStatusChange={changeTaskStatus}
            />
          ))}
        </div>
        {isModalOpen && (
          <CreateTaskForm
            onClose={() => setIsModalOpen(false)}
            onSave={addTask}
          />
        )}
      </div>
    </div>
  );
};

export default App;
