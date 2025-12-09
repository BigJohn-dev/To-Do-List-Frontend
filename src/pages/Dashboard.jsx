import { useState, useContext, useEffect } from "react";
import "../css/Dashboard.css";
import { AuthContext } from "../context/AuthContext";
import PropTypes from "prop-types";

function Dashboard() {
    const { user, logout } = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [tags, setTags] = useState("");
    const [tasks, setTasks] = useState([]);
    const token = localStorage.getItem("token");

    const [editingTask, setEditingTask] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDueDate, setEditDueDate] = useState("");

    // ✅ Fetch tasks on mount
    useEffect(() => {
        if (!token) return;

        fetch("http://127.0.0.1:5000/tasks/", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                const normalized = (data || []).map((t) => ({
                    id: t.id || t._id,
                    title: t.title,
                    due_date: t.due_date,
                    completed: t.completed || false,
                    tags: t.tags || [],
                }));
                setTasks(normalized);
            })
            .catch((err) => console.error("Failed to load tasks:", err));
    }, [token]);

    // ✅ Add task (with date validation)
    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        const now = new Date();
        if (dueDate && new Date(dueDate) < now) {
            alert("⚠️ You cannot set a past date for a new task.");
            return;
        }

        try {
            const res = await fetch("http://127.0.0.1:5000/tasks/add_task", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: title.trim(),
                    due_date: dueDate || new Date().toISOString(),
                    time_estimate: 60,
                    tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
                }),
            });

            if (res.ok) {
                const updated = await fetch("http://127.0.0.1:5000/tasks/", {
                    headers: { Authorization: `Bearer ${token}` },
                }).then((r) => r.json());

                const normalized = (updated || []).map((t) => ({
                    id: t.id || t._id,
                    title: t.title,
                    due_date: t.due_date,
                    completed: t.completed || false,
                    tags: t.tags || [],
                }));
                setTasks(normalized);

                setTitle("");
                setDueDate("");
                setTags("");
            } else {
                const error = await res.json();
                alert(error.error || "Failed to add task");
            }
        } catch (err) {
            console.error("Add task error:", err);
        }
    };

    // ✅ Delete task
    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://127.0.0.1:5000/tasks/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.ok) {
                setTasks(tasks.filter((task) => task.id !== id));
            }
        } catch (err) {
            console.error("Delete task error:", err);
        }
    };

    // ✅ Toggle completion
    const toggleCompletion = async (id, current) => {
        try {
            const res = await fetch(`http://127.0.0.1:5000/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ completed: !current }),
            });

            const data = await res.json();
            if (res.ok) {
                setTasks(tasks.map((t) => (t.id === id ? data : t)));
            }
        } catch (err) {
            console.error("Toggle task error:", err);
        }
    };

    // ✅ Edit task (with date validation)
    const handleEditTask = async (id) => {
        const now = new Date();
        if (editDueDate && new Date(editDueDate) < now) {
            alert("⚠️ You cannot set a past date when editing a task.");
            return;
        }

        try {
            const res = await fetch(`http://127.0.0.1:5000/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: editTitle,
                    due_date: editDueDate,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                setTasks(tasks.map((t) => (t.id === id ? data : t)));
                setEditingTask(null);
            } else {
                alert(data.error || "Failed to update task");
            }
        } catch (err) {
            console.error("Edit task error:", err);
        }
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const now = new Date();

    const isToday = (dateStr) => {
        if (!dateStr) return false;
        const date = new Date(dateStr);
        return date >= today && date < tomorrow;
    };

    const isUpcoming = (dateStr) => {
        if (!dateStr) return false;
        const date = new Date(dateStr);
        return date >= tomorrow;
    };

    const isOverdue = (dateStr, completed) => {
        if (!dateStr) return false;
        const date = new Date(dateStr);
        return date < now && !completed;
    };

    return (
        <div className="login_dashboard">
            <header className="firstbar">
                <h2>My ToDo</h2>
                <p className="welcome-text">
                    Welcome back, <b>{user?.username}</b> 👋
                </p>
                <button className="logout-button" onClick={logout}>
                    Logout
                </button>
            </header>

            <main className="dashboard-container">
                <h1 className="dashboard-title">Add Your Tasks here ...</h1>

                {/* Add Task Form */}
                <div className="add-task-container">
                    <form className="task-form" onSubmit={handleAddTask}>
                        <input
                            type="text"
                            placeholder="Task title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <input
                            type="datetime-local"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Tags (comma separated)"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary">
                            &#43;
                        </button>
                    </form>
                </div>
                {/* Edit Task Form */}
                {editingTask && (
                    <div className="edit-task-container">
                        <h3>Edit Task</h3>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleEditTask(editingTask.id);
                            }}
                        >
                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                placeholder="Task title"
                                required
                            />
                            <input
                                type="datetime-local"
                                value={editDueDate}
                                onChange={(e) => setEditDueDate(e.target.value)}
                            />
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setEditingTask(null)}>
                                Cancel
                            </button>
                        </form>
                    </div>
                )}

                {/* Tasks Section */}
                <div className="tasks-container">
                    <TaskSection
                        title="Today"
                        tasks={tasks.filter((task) => isToday(task.due_date))}
                        onDelete={handleDelete}
                        onToggle={toggleCompletion}
                        onEdit={(task) => {
                            setEditingTask(task);
                            setEditTitle(task.title);
                            setEditDueDate(task.due_date || "");
                        }}
                        showToggle={true}
                        showEdit={true}
                    />
                    <TaskSection
                        title="Upcoming"
                        tasks={tasks.filter((task) => isUpcoming(task.due_date))}
                        onDelete={handleDelete}
                        onToggle={toggleCompletion}
                        onEdit={(task) => {
                            setEditingTask(task);
                            setEditTitle(task.title);
                            setEditDueDate(task.due_date || "");
                        }}
                        showToggle={false}
                        showEdit={true}
                    />
                    <TaskSection
                        title="Overdue"
                        tasks={tasks.filter((task) => isOverdue(task.due_date, task.completed))}
                        onDelete={handleDelete}
                        onToggle={toggleCompletion}
                        onEdit={(task) => {
                            setEditingTask(task);
                            setEditTitle(task.title);
                            setEditDueDate(task.due_date || "");
                        }}
                        showToggle={false}
                        showEdit={false}
                    />
                </div>
            </main>
        </div>
    );
}

function TaskSection({ title, tasks, onDelete, onToggle, onEdit, showToggle, showEdit }) {
    return (
        <section className="task-section">
            <h2 className="section-title">{title}</h2>
            {tasks.length === 0 ? (
                <p className="no-tasks">No tasks for {title.toLowerCase()}.</p>
            ) : (
                tasks.map((task) => (
                    <div
                        className={`task-card ${task.completed ? "completed" : ""}`}
                        key={task.id}
                    >
                        <div className="task-details">
                            <h3 className="task-title">{task.title}</h3>
                            <p className="task-time">
                                {task.due_date
                                    ? new Date(task.due_date).toLocaleString()
                                    : "No date"}
                            </p>
                            <div className="task-tags">
                                {task.tags?.map((tag) => (
                                    <span key={`${task.id}-${tag}`} className="tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="task-actions">
                            {showToggle && (
                                <button
                                    className={`complete-button ${task.completed ? "undo-button" : ""
                                        }`}
                                    onClick={() => onToggle(task.id, task.completed)}
                                >
                                    {task.completed ? "Undo" : "Complete"}
                                </button>
                            )}
                            {showEdit && (
                                <button className="edit-button" onClick={() => onEdit(task)}>
                                    ✏️ Edit
                                </button>
                            )}
                            <button
                                className="delete-button"
                                onClick={() => onDelete(task.id)}
                            >
                                🗑
                            </button>
                        </div>
                    </div>
                ))
            )}
        </section>
    );
}

TaskSection.propTypes = {
    title: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            title: PropTypes.string.isRequired,
            due_date: PropTypes.string,
            completed: PropTypes.bool.isRequired,
            tags: PropTypes.array,
        })
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    showToggle: PropTypes.bool,
    showEdit: PropTypes.bool,
};

export default Dashboard;
