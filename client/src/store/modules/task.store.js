import { taskService } from '@/services'

const taskStore = {
  namespaced: true,
  state: () => ({
    tasks: []
  }),
  mutations: {
    FILL_TASKS(state, tasks) {
      state.tasks = tasks
    }
  },
  actions: {
    async fetchTasks({commit}) {
      const { data } = await taskService.getAllTasks()
      console.log(data)
      commit('FILL_TASKS', data)
    }
  },
  getters: {
    getTasks: state => {
      return state.tasks
    }
  }
}

export {
  taskStore
}