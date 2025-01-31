import React, { useState } from "react";
import "./index.css";

const Task = ({
  task,
  deleteTask,
  editTask,
  markAsDone,
  isDone,
  isSubmitting,
}) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  const handleToggleDescription = () => {
    setIsDescriptionVisible(!isDescriptionVisible);
  };

  // دالة لتحديد لون الأولوية
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "red";
      case "Medium":
        return "orange";
      case "Low":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <div className="task">
      <div className="task-titles">
        <div className="task-info">
          <p className="task-title" onClick={handleToggleDescription}>
            
            <i
              className={`fa-solid fa-caret-down ${isDescriptionVisible ? "hidden" : ""}`}
            ></i>
            <i
              className={`fa-solid fa-caret-up ${isDescriptionVisible ? "" : "hidden"}`}
            ></i>
            <span style={{ marginLeft: 10, fontWeight: "bold" }}>
              {task.todo}
            </span>
            <span style={{ marginLeft: 15, color: "#555" }}>
              | Due: {task.dueDate || "No date"}
            </span>
            <span
              style={{
                marginLeft: 15,
                color: getPriorityColor(task.priority),
                fontWeight: "bold",
              }}
            >
              | Priority: {task.priority || "Medium"}
            </span>
          </p>
        </div>
      </div>

      {isDescriptionVisible && (
        <>
          {!isDone && (
            <div className="task-btn">
              <button
                disabled={isSubmitting}
                className="edit-btn"
                onClick={() => editTask(task)}
              >
                Edit
              </button>
              <button
                disabled={isSubmitting}
                className="done-btn"
                onClick={() => markAsDone(task)}
              >
                Mark as done
              </button>
              <button
                disabled={isSubmitting}
                className="delete-btn"
                onClick={() => deleteTask(task)}
              >
                Delete
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Task;
