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
            <span style={{ marginLeft: 10 }}>{task.todo}</span>
          </p>
        </div>
      </div>
      {isDescriptionVisible && (
        <>
          {/* I add isDone because I pass it false in done-task-list */}
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
