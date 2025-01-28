import React, { useState } from "react";
import "./index.css";

const Task = ({
  title,
  description,
  datetime,
  priority,
  deleteTask,
  index,
  editTask,
  markAsDone,
  isDone,
}) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "High":
        return "priority-high";
      case "Medium":
        return "priority-medium";
      case "Low":
        return "priority-low";
      default:
        return "";
    }
  };

  const handleToggleDescription = () => {
    setIsDescriptionVisible(!isDescriptionVisible);
  };

  return (
    <div className="task">
      <div className="task-titles">
        <div className="task-info">
          <p className="task-title" onClick={handleToggleDescription}>
            <i
              className={`fa-solid fa-caret-down ${
                isDescriptionVisible ? "hidden" : ""
              }`}
            ></i>
            <i
              className={`fa-solid fa-caret-up ${
                isDescriptionVisible ? "" : "hidden"
              }`}
            ></i>
            <span style={{ marginLeft: 10 }}>{title}</span>
          </p>
          <p className="due-date">Due Date: {datetime}</p>
        </div>
        <p className={`title-priority ${getPriorityClass(priority)}`}>
          {priority}
        </p>
      </div>
      {isDescriptionVisible && (
        <>
          <div className="task-description">
            <h4>Description:</h4>
            <p>{description}</p>
          </div>
          {/* I add isDone because I pass it false in done-task-list */}
          {!isDone && (
            <div className="task-btn">
              <button className="edit-btn" onClick={() => editTask(index)}>
                Edit
              </button>
              <button className="done-btn" onClick={() => markAsDone(index)}>
                Mark as done
              </button>
              <button className="delete-btn" onClick={() => deleteTask(index)}>
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
