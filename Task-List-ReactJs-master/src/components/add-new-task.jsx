import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AddNewTask = ({
  tasks,
  setTasks,
  setShow,
  editingTask,
  setEditingTask,
  isSubmitting,
  setIsSubmitting,
}) => {
  const [title, setTitle] = useState(editingTask ? editingTask.title : "");
  const navigate = useNavigate();

  useEffect(() => {
    if (editingTask) {
      // Populate the form fields with the editing task's data
      setTitle(editingTask.todo);
    } else {
      // Clear the form fields when adding a new task
      setTitle("");
    }
  }, [editingTask]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (editingTask) {
      UpdateTask();
      setEditingTask(null);
    } else {
      AddTask();
      // setTasks([...tasks, { todo: title, completed: false }]);
    }
    // setTitle("");
    // setShow(false);
  };

  const clearField = (e) => {
    e.preventDefault();
    setTitle("");
  };

  async function AddTask(params) {
    // get the user id from localStorage
    setIsSubmitting(true);
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post("https://dummyjson.com/todos/add", {
        todo: title,
        completed: false,
        userId: user.id,
      });
      toast.success("Task added successfully");
      setTasks([...tasks, response.data]);
    } catch (error) {
      toast.error("Something went wrong");
    }
    setShow(false);
    setIsSubmitting(false);
  }

  async function UpdateTask() {
    setIsSubmitting(true);
    try {
      const response = await axios.put(
        `https://dummyjson.com/todos/${editingTask.id}`,
        {
          todo: title,
        }
      );
      toast.success("Task updated successfully");
      // Update the task in the tasks state
      setTasks((prev) =>
        prev.map((task) => (task.id === editingTask.id ? response.data : task))
      );
    } catch (error) {
      toast.error("Something went wrong");
    }
    setShow(false);
    setIsSubmitting(false);
  }

  return (
    <div className="add-container">
      <div className="add-Task-header">
        <h2>{editingTask ? "Edit Task" : "Add New Task"}</h2>
        <button onClick={clearField}>Clear</button>
      </div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ marginBottom: 20 }}
        />
        {/* <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          placeholder="Date"
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
        />
        <div className="form-priority">
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="" disabled selected hidden>
              Select Priority
            </option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div> */}
        <div className="form-buttons">
          <button disabled={isSubmitting} type="submit">
            {isSubmitting ? (
              <i className="fa-solid fa-circle-notch" />
            ) : editingTask ? (
              "Update Task"
            ) : (
              "Add Task"
            )}
          </button>
          <button
            disabled={isSubmitting}
            type="button"
            onClick={() => setShow(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
