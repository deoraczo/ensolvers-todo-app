import { folderService } from '@/services'

const folderStore = {
  namespaced: true,
  state: () => ({
    folders: []
  }),
  mutations: {
    FILL_FOLDERS(state, folders) {
      state.folders = folders
    },
    FOLDER_CREATED(state, folder) {
      state.folders = [...state.folders, folder]
    },
    FOLDER_UPDATED(state, updatedFolder) {
      const folderFound = state.folders.find(folder => folder.id == updatedFolder.id)
      folderFound.title = updatedFolder.title
    }
  },
  actions: {
    async fetchFolders({commit}) {
      const { data } = await folderService.getAllFolders()
      commit('FILL_FOLDERS', data)
    },
    async folderRemoved({ commit, state }, id) {
      commit('FILL_FOLDERS', state.folders.filter(folder => folder.id !== id))
    },
    async folderCreated({ commit }, folder) {
      commit('FOLDER_CREATED', folder)
    },
    async folderUpdated({ commit }, folder) {
      commit('FOLDER_UPDATED', folder)
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