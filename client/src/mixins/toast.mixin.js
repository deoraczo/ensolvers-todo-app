import {  mapActions } from 'vuex'
const toastMixin = {
  methods: {
    ...mapActions({
      toast: 'toast/fire'
    }),
  }
}

export {
  toastMixin
}