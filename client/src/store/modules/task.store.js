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
      commit('FILL_TASKS', data)
    },
    async taskRemoved({ commit, state }, id) {
      commit('FILL_TASKS', state.tasks.filter(task => task.id !== id))
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