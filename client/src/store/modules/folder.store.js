import { folderService } from '@/services'

const folderStore = {
  namespaced: true,
  state: () => ({
    folders: []
  }),
  mutations: {
    FILL_TASKS(state, folders) {
      state.folders = folders
    },
  },
  actions: {
    async fetchFolders({commit}) {
      const { data } = await folderService.getAllFolders()
      commit('FILL_TASKS', data)
    },
    async folderRemoved({ commit, state }, id) {
      commit('FILL_TASKS', state.folders.filter(folder => folder.id !== id))
    },
  },
  getters: {
    getFolders: state => {
      return state.folders
    }
  }
}

export {
  folderStore
}