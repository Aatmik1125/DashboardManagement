import { useState, useEffect } from "react";

function TaskForm({ onAdd, onUpdate, editingTask }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [dueDate, setDueDate] = useState("");

  // Prefill form when editing
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setStatus(editingTask.status);
      setDueDate(editingTask.dueDate);
    }
  }, [editingTask]);

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    const taskData = {
      id: editingTask ? editingTask.id : Date.now(),
      title,
      description,
      status,
      dueDate
    };

    if (editingTask) {
      onUpdate(taskData);
    } else {
      onAdd(taskData);
    }

    // Clear form
    setTitle("");
    setDescription("");
    setStatus("Pending");
    setDueDate("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>

      <h3 className="form-title">
        {editingTask ? "Edit Task" : "Create New Task"}
      </h3>

      <div className="form-group">
        <label>Task Title</label>
        <input
          type="text"
          placeholder="Enter task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          placeholder="Enter description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>

      <div className="form-group">
        <label>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <button type="submit" className="submit-btn">
        {editingTask ? "Update Task" : "Add Task"}
      </button>

    </form>
  );
}

export default TaskForm;