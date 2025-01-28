import React, { useState,useEffect  } from "react";

export const AddNewTask = ({ tasks, setTasks,setShow,editingTask,setEditingTask}) => {
  const [title, setTitle] = useState(editingTask ? editingTask.title : "");
  const [description, setDescription] = useState(editingTask ? editingTask.description : "");
  const [datetime, setDatetime] = useState(editingTask ? editingTask.datetime : "");
  const [priority, setPriority] = useState(editingTask ? editingTask.priority : "");
 
  useEffect(() => {
    if (editingTask) {
      // Populate the form fields with the editing task's data
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setDatetime(editingTask.datetime);
      setPriority(editingTask.priority);
    } else {
      // Clear the form fields when adding a new task
      setTitle("");
      setDescription("");
      setDatetime("");
      setPriority("");
    }
  }, [editingTask]);

  const submitHandler = (e) => {
    e.preventDefault();
    const isDuplicate = tasks.some(task => task.title.toLowerCase() === title.toLowerCase());
    if (isDuplicate) {
      alert("A task with this title already exists.");
      return;
    }

    if (editingTask) {
      const updatedTasks = tasks.map((task, index) =>
        index === editingTask.index
          ? { title, description, datetime, priority }
          : task
      );
      setTasks(updatedTasks);
      setEditingTask(null);
    } else {
      setTasks([...tasks, { title, description, datetime, priority }]);
    }
    setTitle("");
    setDescription("");
    setDatetime("");
    setPriority("");
    setShow(false);
  };
  const clearField = (e) => {
    e.preventDefault();
    setTitle("");
    setDescription("");
    setDatetime("");
    setPriority(""); 
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
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
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
        </div>
        <div className="form-buttons">
        <button type="submit">{editingTask ? "Update Task" : "Add Task"}</button>
          <button type="button" onClick={() => setShow(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
