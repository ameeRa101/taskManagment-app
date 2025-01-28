import React from "react";
import Task from "./task/index";

const DisplayTask = ({ tasks, deleteTask, editTask, markAsDone }) => {
  return (
    <div>
      <div>
        {tasks.length === 0 && <p>No tasks available</p>}
        {tasks.map((item, index) => (
          <Task
            key={index}
            title={item.title}
            description={item.description}
            priority={item.priority}
            datetime={item.datetime}
            deleteTask={deleteTask}
            editTask={editTask}
            markAsDone={markAsDone}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default DisplayTask;
