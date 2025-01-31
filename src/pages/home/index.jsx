import React, { useState, useEffect } from "react";
import { AddNewTask } from "../../components/add-new-task";
import DisplayTask from "../../components/display-task";
import "./home.css";
import TaskActionsMenu from "../../components/task-actions-menu/index";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const [show, setShow] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  // this for search result
  const [result, setResult] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const [tasks, setTasks] = useState([]);
  // added filters state to manage the tasks based on the priority and the active bar
  const [filters, setFilters] = useState({
    activeBar: "all", // all, uncompleted, done
  });
  // this is for dispalying a loading message while fetching the data
  const [isLoading, setIsLoading] = useState(true);
  // this is for disabling buttons while sending an api request to prevent sending multiple requests
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deleteTask = async (task) => {
    setIsSubmitting(true);
    try {
      await axios.delete(`https://dummyjson.com/todos/${task.id}`);
      toast.success("Task deleted successfully");
      // Update the task in the tasks state
      setTasks((prev) => prev.filter((item) => item.id !== task.id));
    } catch (error) {
      toast.error("Something went wrong");
    }
    setShow(false);
    setIsSubmitting(false);
  };

  const editTask = (task) => {
    setEditingTask(task);
    setShow(true);
  };

  const markAsDone = async (task) => {
    setIsSubmitting(true);
    try {
      await axios.put(`https://dummyjson.com/todos/${task.id}`, {
        completed: true,
      });
      toast.success("Task marked as done successfully");
      // Update the task in the tasks state
      setTasks((prev) =>
        prev.map((item) =>
          item.id === task.id ? { ...item, completed: true } : item
        )
      );
    } catch (error) {
      toast.error("Something went wrong");
    }
    setShow(false);
    setIsSubmitting(false);
  };

  // get todos of a user
  async function getTasks() {
    try {
      const res = await axios.get(`https://dummyjson.com/todos?limit=8`);

      setTasks(res.data.todos);
    } catch (error) {
      console.log("Error: ", error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    setShow(false);
  }, [filters]);

  return (
    <div className="home">
      <div className="task-list-header">
        <div className="task-list-title">
          <i className="fa-regular fa-folder-open"></i>Task List View
        </div>
      </div>

      {/* I moved the code of task action into a new separate component to clean code */}
      <TaskActionsMenu
        show={show}
        setShow={setShow}
        tasks={tasks}
        isSearch={isSearch}
        setIsSearch={setIsSearch}
        setResult={setResult}
        filters={filters}
        setFilters={setFilters}
      />

      <div className="tasks-container">
        {isLoading ? (
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            Loading...
          </div>
        ) : (
          <>
            {show && (
              <AddNewTask
                tasks={tasks}
                setTasks={setTasks}
                setShow={setShow}
                editingTask={editingTask}
                setEditingTask={setEditingTask}
                isSubmitting={isSubmitting}
                setIsSubmitting={setIsSubmitting}
              />
            )}

            <div className="task-lists">
              <DisplayTask
                // I added isSearch to pass the result to the DisplayTask component instead of filteredTasks
                tasks={isSearch ? result : tasks}
                deleteTask={deleteTask}
                editTask={editTask}
                markAsDone={markAsDone}
                filters={filters}
                isSearch={isSearch}
                isSubmitting={isSubmitting}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
