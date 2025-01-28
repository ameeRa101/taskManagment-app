import React, { useState, useEffect } from "react";
import { AddNewTask } from "../../components/add-new-task";
import DisplayTask from "../../components/display-task";
import DoneTaskList from "../../components/done-task-list";
import "./home.css";
import TaskActionsMenu from "../../components/task-actions-menu/index";

const Home = () => {
  const [show, setShow] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showDoneTasks, setShowDoneTasks] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(null);
  // this for search result
  const [result, setResult] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const initialArray = localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
  const [tasks, setTasks] = useState(initialArray);

  // Initialize doneTasks from localStorage
  const initialDoneTasks = localStorage.getItem("doneTasks");
  const [doneTasks, setDoneTasks] = useState(
    initialDoneTasks ? JSON.parse(initialDoneTasks) : []
  );

  const deleteTask = (index) => {
    const filteredArr = tasks.filter((_, i) => i !== index);
    setTasks(filteredArr);
  };

  const editTask = (index) => {
    setEditingTask({ ...tasks[index], index });
    setShow(true);
  };

  const markAsDone = (index) => {
    const taskToMove = tasks[index];
    const filteredArr = tasks.filter((_, i) => i !== index);
    setTasks(filteredArr);
    setDoneTasks([...doneTasks, taskToMove]);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
  }, [doneTasks]);

  const filteredTasks = tasks.filter((task) =>
    selectedPriority ? task.priority === selectedPriority : true
  );

  return (
    <div className="home">
      <div className="task-list-header">
        <div className="task-list-title">
          <i class="fa-regular fa-folder-open"></i>Task List app
        </div>
      </div>

      {/* I moved the code of task action into a new separate component to clean code */}
      <TaskActionsMenu
        show={show}
        setShow={setShow}
        showDoneTasks={showDoneTasks}
        setShowDoneTasks={setShowDoneTasks}
        setSelectedPriority={setSelectedPriority}
        tasks={filteredTasks}
        isSearch={isSearch}
        setIsSearch={setIsSearch}
        setResult={setResult}
      />

      <div className="tasks-container">
        {show && (
          <AddNewTask
            tasks={tasks}
            setTasks={setTasks}
            setShow={setShow}
            editingTask={editingTask}
            setEditingTask={setEditingTask}
          />
        )}

        <div className="task-lists">
          {!showDoneTasks && (
            <DisplayTask
              // I added isSearch to pass the result to the DisplayTask component instead of filteredTasks
              tasks={isSearch ? result : filteredTasks}
              deleteTask={deleteTask}
              editTask={editTask}
              markAsDone={markAsDone}
            />
          )}
          {showDoneTasks && <DoneTaskList tasks={doneTasks} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
