import React from "react";
import { useDrag } from "react-dnd";
import { useState } from "react";
import { ChevronDownIcon, Calendar } from "lucide-react";
import { IconButton} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const TaskCard = ({ task, onUpdate, onDelete, onStatusChange, onSelect }) => {
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
          <h3 className="mt-2 text-2xl font-semibold text-gray-800">
            {task.title}
          </h3>
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
          <hr className="mt-2" />
          <div className="flex items-center mt-3 text-gray-500 text-sm">
            <Calendar className="mr-2" size={16} />
            <span>{task.date}</span>
          </div>

          <div className="flex space-x-2 mt-2">
            <IconButton
              icon={<EditIcon />}
              aria-label="Edit Task"
              onClick={() => onSelect(task)}
            />
            <IconButton
              icon={<DeleteIcon />}
              aria-label="Delete Task"
              onClick={() => onDelete(task.id)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
