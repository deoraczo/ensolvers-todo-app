import Vue from 'vue'
import Vuex from 'vuex'
import { folderStore } from './modules/folder.store'
import { taskStore } from './modules/task.store'
import { toastStore } from './modules/toast.store'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    task: taskStore,
    toast: toastStore,
    folder: folderStore
  },
})
