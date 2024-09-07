import React from "react";
import { useDrag } from "react-dnd";
import { useState} from "react";
import { ChevronDownIcon } from "lucide-react";

const TaskCard = ({ task, onUpdate, onDelete, onStatusChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`mb-4 last:mb-0 ${isDragging ? "opacity-50" : ""}`}
    >
      <div
        className="flex justify-between items-start cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded ${
              task.priority === "High"
                ? "bg-red-100 text-red-800"
                : task.priority === "Medium"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {task.priority}
          </span>
          <h4 className="font-semibold mt-2">{task.title}</h4>
        </div>
        <ChevronDownIcon
          className={`w-5 h-5 transition-transform ${
            isExpanded ? "transform rotate-180" : ""
          }`}
        />
      </div>
      {isExpanded && (
        <div className="mt-2 text-sm text-gray-600">
          <p>{task.description}</p>
          <p className="mt-2">Due: {task.date}</p>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
