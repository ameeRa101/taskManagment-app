import { useRef, useState } from "react";
import "./index.css";


const TaskActionsMenu = ({
  show,
  setShow,
  tasks,
  isSearch,
  setIsSearch,
  setResult,
  filters,
  setFilters,
}) => {
  const searchRef = useRef(null);
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput === "") return;
    setIsSearch(true);
    // to reset filters
    setFilters({ activeBar: "all" });
    // Here we filter the tasks based on the search input
    // 1- We convert the search input and the task title and description to lowercase
    // 2- We filter the tasks based on the search input
    // 3- We update the result state with the filtered tasks
    setResult(
      tasks.filter((task) =>
        task.title.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  };

  const cancelSearch = (e) => {
    e.preventDefault();
    setIsSearch(false);
    setResult([]);
    setSearchInput("");
    searchRef.current.value = "";
  };

  return (
    <div className="tasks-menu">
      <div className="tasks-menu-header">
        <div className="search-bar">
          <input
            ref={searchRef}
            type="text"
            className="task-search-input"
            placeholder="Search tasks..."
            onChange={(e) => {
              setIsSearch(false);
              setSearchInput(e.target.value);
            }}
          />
          <button
            onClick={(e) => (!isSearch ? handleSearch(e) : cancelSearch(e))}
          >
            {isSearch ? "cancel" : "search"}
          </button>
        </div>
        <button className="task-list-add-button" onClick={() => setShow(!show)}>
          <div className="add-button">+</div>
          <span>Add New Task</span>
        </button>
      </div>
      {/* Tasks buttons All high medium low done */}
      <div className="task-buttons-row">
        <button onClick={() => setFilters({ ...filters, activeBar: "all" })}>
          All Tasks
        </button>

        <button
          onClick={() => setFilters({ ...filters, activeBar: "uncompleted" })}
        >
          Pending
        </button>

        <button onClick={() => setFilters({ ...filters, activeBar: "done" })}>
          Completed
        </button>
      </div>
    </div>
  );
};

export default TaskActionsMenu;
