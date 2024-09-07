import React, { useState } from "react";
import { Input, Textarea, Select } from "@chakra-ui/react";
import { CalendarIcon, XIcon } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateTaskForm = ({ onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("TODO");
  const [priority, setPriority] = useState("Low");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      title,
      description,
      date: date ? date.toLocaleDateString() : "",
      status,
      priority,
    };
    onSave(newTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-4xl  p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Create New Task</h2>
          <XIcon
            className="w-5 h-5 text-gray-500 cursor-pointer"
            onClick={onClose}
          />
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Title *
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Select here"
              className="mt-1"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add here"
              className="mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Date *
            </label>
            <div className="mt-1 relative">
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                placeholderText="DD/MM/YY"
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10"
                required
              />
              <CalendarIcon
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer"
                onClick={() =>
                  document
                    .querySelector(".react-datepicker__input-container input")
                    .focus()
                }
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Status
            </label>
            <Select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="Select here"
            >
              <option value="TODO">To Do</option>
              <option value="IN PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </Select>
          </div>
          <div>
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Priority
            </label>
            <Select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              placeholder="Select here"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              className="border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-black px-4 py-2 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-purple-600 text-white hover:text-black border border-purple-600  hover:bg-white px-4 py-2 rounded-md"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskForm;
