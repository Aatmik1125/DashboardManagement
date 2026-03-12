import tasks from "../data/Task.json"

export const fetchTasks = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tasks)
    }, 500)
  })
}