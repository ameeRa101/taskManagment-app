import React, { useEffect, useState } from "react";
import Task from "./task/index";

const DisplayTask = ({
  tasks,
  deleteTask,
  editTask,
  markAsDone,
  filters,
  isSearch,
  isSubmitting,
}) => {
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const uncompletedTasks = filteredTasks.filter((task) => !task.completed);
  const doneTasks = filteredTasks.filter((task) => task.completed);

  return (
    <div>
      {filters.activeBar !== "done" && (
        <div>
          <h2>Pending</h2>
          <div>
            {uncompletedTasks.length === 0 && <p>No tasks available</p>}
            {uncompletedTasks.map((item, index) => (
              <Task
                key={item.id}
                deleteTask={deleteTask}
                editTask={editTask}
                markAsDone={markAsDone}
                task={item}
                isSubmitting={isSubmitting}
              />
            ))}
          </div>
        </div>
      )}
      {filters.activeBar !== "uncompleted" && (
        <div>
          <h2>Completed</h2>
          {doneTasks.length === 0 ? (
            <p>
              {isSearch
                ? "No tasks available"
                : "No tasks have been completed yet"}
            </p>
          ) : (
            doneTasks.map((task) => (
              <Task
                key={task.id}
                isDone={true}
                task={task}
                isSubmitting={isSubmitting}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DisplayTask;
