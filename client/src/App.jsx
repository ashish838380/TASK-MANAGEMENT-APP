import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5001/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);

  // Add task states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Edit states
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Search and filter states
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (data.success) {
        setTasks(data.tasks);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Load tasks when page opens
  useEffect(() => {
    fetchTasks();
  }, []);

  // Add new task
  const addTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setTasks((prevTasks) => [data.task, ...prevTasks]);

        setTitle("");
        setDescription("");
      }
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Could not add task");
    } finally {
      setLoading(false);
    }
  };

  // Complete / uncomplete task
  const toggleTask = async (task) => {
    try {
      const response = await fetch(`${API_URL}/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: task.title,
          description: task.description,
          completed: !task.completed,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setTasks((prevTasks) =>
          prevTasks.map((item) =>
            item._id === task._id ? data.task : item
          )
        );
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Start editing
  const startEdit = (task) => {
    setEditingId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
  };

  // Save edited task
  const saveEdit = async (task) => {
    if (!editTitle.trim()) {
      alert("Task title cannot be empty");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
          completed: task.completed,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setTasks((prevTasks) =>
          prevTasks.map((item) =>
            item._id === task._id ? data.task : item
          )
        );

        setEditingId(null);
        setEditTitle("");
        setEditDescription("");
      }
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Statistics
  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.length - completedTasks;

  // Progress percentage
  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completedTasks / tasks.length) * 100);

  // Search + filter
  const filteredTasks = tasks.filter((task) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      task.title.toLowerCase().includes(searchText) ||
      (task.description || "").toLowerCase().includes(searchText);

    const matchesFilter =
      filter === "all" ||
      (filter === "pending" && !task.completed) ||
      (filter === "completed" && task.completed);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <div>
          <h1>TaskFlow</h1>
          <p>Manage your tasks efficiently</p>
        </div>
      </header>

      <main className="container">

        {/* Statistics */}
        <section className="stats">

          <div className="stat-card">
            <h3>Total Tasks</h3>
            <strong>{tasks.length}</strong>
          </div>

          <div className="stat-card">
            <h3>Pending</h3>
            <strong>{pendingTasks}</strong>
          </div>

          <div className="stat-card">
            <h3>Completed</h3>
            <strong>{completedTasks}</strong>
          </div>

        </section>

        {/* Progress */}
        <section className="progress-card">

          <div className="progress-header">

            <div>
              <h2>Your Progress</h2>

              <p>
                {completedTasks} of {tasks.length} tasks completed
              </p>
            </div>

            <strong>{progress}%</strong>

          </div>

          <div className="progress-track">

            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
              }}
            ></div>

          </div>

        </section>

        {/* Add Task */}
        <section className="task-form-card">

          <h2>Add New Task</h2>

          <form onSubmit={addTask}>

            <input
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
            />

            <button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Task"}
            </button>

          </form>

        </section>

        {/* Search and Filter */}
        <section className="filters">

          <input
            type="text"
            placeholder="🔍 Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="filter-buttons">

            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </button>

            <button
              className={filter === "pending" ? "active" : ""}
              onClick={() => setFilter("pending")}
            >
              Pending
            </button>

            <button
              className={filter === "completed" ? "active" : ""}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>

          </div>

        </section>

        {/* Tasks */}
        <section className="tasks-section">

          <div className="section-heading">

            <h2>My Tasks</h2>

            <span>
              {filteredTasks.length}{" "}
              {filteredTasks.length === 1 ? "task" : "tasks"}
            </span>

          </div>

          {filteredTasks.length === 0 ? (

            <div className="empty">

              <h3>No tasks found</h3>

              <p>
                Try another search or add a new task.
              </p>

            </div>

          ) : (

            <div className="task-list">

              {filteredTasks.map((task) => (

                <div
                  className={`task-card ${
                    task.completed ? "completed" : ""
                  }`}
                  key={task._id}
                >

                  {editingId === task._id ? (

                    /* Edit Mode */
                    <div className="edit-form">

                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) =>
                          setEditTitle(e.target.value)
                        }
                      />

                      <textarea
                        value={editDescription}
                        onChange={(e) =>
                          setEditDescription(e.target.value)
                        }
                        rows="3"
                      />

                      <div className="edit-buttons">

                        <button
                          className="save-btn"
                          onClick={() => saveEdit(task)}
                        >
                          Save
                        </button>

                        <button
                          className="cancel-btn"
                          onClick={() => {
                            setEditingId(null);
                            setEditTitle("");
                            setEditDescription("");
                          }}
                        >
                          Cancel
                        </button>

                      </div>

                    </div>

                  ) : (

                    /* Normal Mode */
                    <>
                      <div className="task-content">

                        <div className="task-title-row">

                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task)}
                          />

                          <h3>{task.title}</h3>

                        </div>

                        {task.description && (
                          <p>{task.description}</p>
                        )}

                        <small>
                          {task.completed
                            ? "Completed"
                            : "Pending"}
                        </small>

                      </div>

                      <div className="task-actions">

                        <button
                          className="edit-btn"
                          onClick={() => startEdit(task)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => deleteTask(task._id)}
                        >
                          Delete
                        </button>

                      </div>
                    </>

                  )}

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default App;