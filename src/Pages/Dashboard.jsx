import { useState, useEffect } from "react"
import TaskCard from "../Components/TaskCard"
import TaskForm from "../Components/TaskForm"
import FilterBar from "../Components/FilterBar"
import "../Styles/Dashboard.css"

function Dashboard() {

  /* LOAD TASKS */

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks")
    return savedTasks ? JSON.parse(savedTasks) : []
  })

  /* THEME */

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme")
    return savedTheme === "dark"
  })

  const [filter, setFilter] = useState("All")
  const [editingTask, setEditingTask] = useState(null)
  const [search, setSearch] = useState("")

  /* PAGINATION */

  const [currentPage, setCurrentPage] = useState(1)
  const tasksPerPage = 4

  /* SAVE TASKS */

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  /* SAVE THEME */

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light")
  }, [darkMode])

  /* RESET PAGE WHEN FILTER/SEARCH CHANGES */

  useEffect(() => {
    setCurrentPage(1)
  }, [filter, search])

  /* ADD TASK */

  const addTask = (task) => {
    setTasks((prev) => [...prev, task])
  }

  /* DELETE TASK */

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  /* EDIT TASK */

  const handleEditClick = (task) => {
    setEditingTask(task)
  }

  /* UPDATE TASK */

  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    )
    setEditingTask(null)
  }

  /* FILTER + SEARCH */

  const filteredTasks = tasks.filter((task) => {

    if (filter !== "All" && task.status !== filter) return false

    if (
      search &&
      !task.title.toLowerCase().includes(search.toLowerCase())
    )
      return false

    return true
  })

  /* PAGINATION CALCULATION */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTasks.length / tasksPerPage)
  )

  const indexOfLastTask = currentPage * tasksPerPage
  const indexOfFirstTask = indexOfLastTask - tasksPerPage

  const currentTasks = filteredTasks.slice(
    indexOfFirstTask,
    indexOfLastTask
  )

  /* PROGRESS BAR */

  const completed = tasks.filter(t => t.status === "Completed").length
  const progress = tasks.length
    ? (completed / tasks.length) * 100
    : 0

  return (
    <div className={`dashboard-container ${darkMode ? "dark" : "light"}`}>

      {/* HEADER */}

      <div className="top-bar">

        <h2 className="dashboard-title">
          🚀 Task Management Dashboard
        </h2>

        <button
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

      </div>

      {/* SEARCH */}

      <input
        className="search-bar"
        placeholder="🔍 Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* PROGRESS */}

      <div className="progress-container">

        <p>Task Completion</p>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

      </div>

      {/* FILTER */}

      <FilterBar setFilter={setFilter} />

      {/* FORM */}

      <TaskForm
        onAdd={addTask}
        onUpdate={updateTask}
        editingTask={editingTask}
      />

      {/* TASK LIST */}

      <div className="task-list">

        {currentTasks.length === 0 ? (
          <p className="empty">No tasks available</p>
        ) : (
          currentTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onEdit={handleEditClick}
            />
          ))
        )}

      </div>

      {/* PAGINATION */}

      {totalPages > 1 && (
        <div className="pagination">

          {Array.from({ length: totalPages }, (_, index) => {

            const page = index + 1

            return (
              <button
                key={page}
                className={currentPage === page ? "active-page" : ""}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            )
          })}

        </div>
      )}

    </div>
  )
}

export default Dashboard