import React, { useState } from "react";

const initialTasks = [
  { id: 1, title: "Buy groceries", completed: false },
  { id: 2, title: "Read task", completed: true },
];

export default function TaskManager() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all"); // all, completed, pending

  const addTask = () => {
    if (newTask.trim() === "") {
      alert("Task title cannot be empty!");
      return;
    }
    const newTaskObj = {
      id: Date.now(),
      title: newTask.trim(),
      completed: false,
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true; // all
  });

  return (
    <div style={styles.container}>
      <h2>Simple Task Manager</h2>

      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="New task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={styles.input}
        />
        <button onClick={addTask} style={styles.addButton}>
          Add
        </button>
      </div>

      <div style={styles.filterContainer}>
        <button
          style={{
            ...styles.filterButton,
            backgroundColor: filter === "all" ? "#007bff" : "#ccc",
          }}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          style={{
            ...styles.filterButton,
            backgroundColor: filter === "completed" ? "#007bff" : "#ccc",
          }}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button
          style={{
            ...styles.filterButton,
            backgroundColor: filter === "pending" ? "#007bff" : "#ccc",
          }}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
      </div>

      <ul style={styles.taskList}>
        {filteredTasks.length === 0 && (
          <li style={{ padding: 10, color: "gray" }}>No tasks to show</li>
        )}
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            style={{
              ...styles.taskItem,
              textDecoration: task.completed ? "line-through" : "none",
              color: task.completed ? "gray" : "black",
            }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
              style={styles.checkbox}
            />
            {task.title}
            <button
              onClick={() => deleteTask(task.id)}
              style={styles.deleteButton}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
const styles = {
  container: {
    maxWidth: 400,
    margin: "20px auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: 20,
    border: "1px solid #ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  inputContainer: {
    display: "flex",
    marginBottom: 12,
  },
  input: {
    flex: 1,
    padding: 8,
    fontSize: 16,
    borderRadius: 4,
    border: "1px solid #ccc",
  },
  addButton: {
    marginLeft: 8,
    padding: "8px 16px",
    fontSize: 16,
    cursor: "pointer",
    borderRadius: 4,
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
  },
  filterContainer: {
    marginBottom: 16,
    display: "flex",
    justifyContent: "center",
    gap: 10,
  },
  filterButton: {
    padding: "6px 12px",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    color: "white",
    fontWeight: "bold",
  },
  taskList: {
    listStyleType: "none",
    padding: 0,
  },
  taskItem: {
    display: "flex",
    alignItems: "center",
    padding: "8px 0",
    borderBottom: "1px solid #ddd",
  },
  checkbox: {
    marginRight: 12,
    width: 18,
    height: 18,
  },
  deleteButton: {
    marginLeft: "auto",
    padding: "4px 8px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
};
