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
    FOLDER_CREATED(state, folder) {
      state.folders = [...state.folders, folder]
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
    async folderCreated({ commit }, folder) {
      commit('FOLDER_CREATED', folder)
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