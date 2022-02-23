import { apiInvoker } from "./api.invoker";

class TaskService {
  async getAllTasks() {
    return await apiInvoker.http.get('/tasks')
  }

  async deleteTask(id) {
    return await apiInvoker.http.delete(`/tasks/${id}`)
  }

  async markTask(id) {
    return await apiInvoker.http.patch(`/tasks/${id}/mark`)
  }

  async unmarkTask(id) {
    return await apiInvoker.http.patch(`/tasks/${id}/unmark`)
  }
}

const taskService = new TaskService()

export {
  taskService
}