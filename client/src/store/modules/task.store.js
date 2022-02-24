import { taskService, folderService } from '@/services'

const taskStore = {
  namespaced: true,
  state: () => ({
    tasks: [],
    folderName: null
  }),
  mutations: {
    FILL_TASKS(state, tasks) {
      state.tasks = tasks
    },
    FILL_FOLDER_NAME(state, name) {
      state.folderName = name
    },
    TASK_CREATED(state, task) {
      state.tasks = [...state.tasks, task]
    },
    TASK_UPDATED(state, updatedTask) {
      const taskFound = state.tasks.find(task => task.id == updatedTask.id)
      taskFound.title = updatedTask.title
    }
  },
  actions: {
    async fetchTasks({commit}) {
      const { data } = await taskService.getAllTasks()
      commit('FILL_TASKS', data)
    },
    async taskRemoved({ commit, state }, id) {
      commit('FILL_TASKS', state.tasks.filter(task => task.id !== id))
    },
    async taskCreated({ commit }, task) {
      commit('TASK_CREATED', task)
    },
    async taskUpdated({ commit }, task) {
      commit('TASK_UPDATED', task)
    },
    async fetchTasksByFolderId({ commit }, folderId) {
      // const { data } = await taskService.getAllTasks()
      // commit('FILL_TASKS', data)
      return folderService.getFolderWithTasks(folderId)
        .then(({ data }) => {
          commit('FILL_TASKS', data.tasks)
          commit('FILL_FOLDER_NAME', data.title)
        })
    },
  },
  getters: {
    getTasks: state => {
      return state.tasks
    },
    getFolderName: state => state.folderName
  }
}

export {
  taskStore
}