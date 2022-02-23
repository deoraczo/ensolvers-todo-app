import { apiInvoker } from "./api.invoker";

class TaskService {
  async getAllTasks() {
    return await apiInvoker.http.get('/tasks')
  }

  async deleteTask(id) {
    return await apiInvoker.http.delete(`/tasks/${id}`)
  }
}

const taskService = new TaskService()

export {
  taskService
}