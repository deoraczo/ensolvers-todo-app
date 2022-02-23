const toastStore = {
  namespaced: true,
  state: () => ({
    title: '',
    message: '',
    type: ''
  }),

  mutations: {
    FIRE(state, payload) {
      Object.assign(state, payload)
    }
  },

  actions: {
    fire({ commit },  { title, message, type }) {
      commit('FIRE', { title, message, type })
    }
  }
}

export {
  toastStore
}