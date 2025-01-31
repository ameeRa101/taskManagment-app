import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AddNewTask = ({
  setTasks,
  setShow,
  editingTask,
  setEditingTask,
  isSubmitting,
  setIsSubmitting,
}) => {
  const [title, setTitle] = useState(editingTask ? editingTask.todo : "");
  const [description, setDescription] = useState(
    editingTask ? editingTask.description : ""
  );
  const [dueDate, setDueDate] = useState(
    editingTask ? editingTask.dueDate : ""
  );
  const [priority, setPriority] = useState(
    editingTask ? editingTask.priority : "Medium"
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.todo);
      setDescription(editingTask.description || "");
      setDueDate(editingTask.dueDate || "");
      setPriority(editingTask.priority || "Medium");
    } else {
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("Medium");
    }
  }, [editingTask]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (editingTask) {
      UpdateTask();
      setEditingTask(null);
    } else {
      AddTask();
    }
  };

  const clearField = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("Medium");
  };

  async function AddTask() {
    setIsSubmitting(true);
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post("https://dummyjson.com/todos/add", {
        todo: title,
        description,
        completed: false,
        userId: user.id,
        dueDate,
        priority,
      });

      toast.success("Task added successfully");
      setTasks((prev) => [...prev, response.data]);
      clearField();
    } catch (error) {
      toast.error("Something went wrong");
    }

    setShow(false);
    setIsSubmitting(false);
  }

  async function UpdateTask() {
    setIsSubmitting(true);
    try {
      await axios.put(`https://dummyjson.com/todos/${editingTask.id}`, {
        todo: title,
        description,
        dueDate,
        priority,
        completed: editingTask.completed,
      });

      toast.success("Task updated successfully");

      // التحديث الصحيح للمهام في الواجهة
      setTasks((prev) =>
        prev.map((existingTask) =>
          existingTask.id === editingTask.id
            ? {
                ...existingTask,
                todo: title,
                description,
                dueDate,
                priority,
              }
            : existingTask
        )
      );

      clearField();
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
        <button type="button" onClick={clearField}>
          Clear
        </button>
      </div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ marginBottom: 10 }}
        />

        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ marginBottom: 10, height: "80px" }}
        />

        <input
          type="date"
          placeholder="Due Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          style={{ marginBottom: 10 }}
        />

        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
          style={{ marginBottom: 20 }}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

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
