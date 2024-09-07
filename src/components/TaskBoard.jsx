import React, { useState, useEffect } from "react";
import TaskColumn from "./TaskColumn";
import CreateTaskForm from "./CreateTaskForm";

const initialTasks = {
  TODO: [],
  "IN PROGRESS": [],
  COMPLETED: [],
};

const TaskBoard = () => {
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
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">BOARD INFINITY</h1>
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-md flex items-center"
            onClick={() => setIsModalOpen(true)}
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Create Task
          </button>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

export default TaskBoard;
