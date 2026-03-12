function TaskCard({ task, onDelete, onEdit }) {

  const statusClass = task.status.toLowerCase().replace(" ", "-")

  return (
    <div className="task-card">

      <div className="task-header">

        <h3 className="task-title">{task.title}</h3>

        <span className={`status ${statusClass}`}>
          {task.status}
        </span>

      </div>

      <p className="task-description">
        {task.description || "No description provided"}
      </p>

      <div className="task-meta">
        <span className="due-date">📅 Due: {task.dueDate}</span>
      </div>

      <div className="task-buttons">

        <button
          className="edit-btn"
          onClick={() => onEdit(task)}
        >
          ✏️ Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(task.id)}
        >
          🗑 Delete
        </button>

      </div>

    </div>
  )
}

export default TaskCard