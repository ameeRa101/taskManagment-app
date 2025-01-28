import React from "react";
import Task from "./task";

const DoneTaskList = ({ tasks }) => {
  return (
    <div>
      <h2>Done Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks completed yet.</p>
      ) : (
        tasks.map((task, index) => (
          <Task
            key={index}
            title={task.title}
            description={task.description}
            priority={task.priority}
            datetime={task.datetime}
            isDone={true}
            index={index}
          />
        ))
      )}
    </div>
  );
};

export default DoneTaskList;
