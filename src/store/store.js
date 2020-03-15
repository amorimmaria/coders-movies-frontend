import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    credentials: null,
    loginDialog: false,
    drawer: false,
    snackbar: {
      visible: false,
      text: null,
      timeout: 6000,
      multiline: false,
      color: '',
      icon: '',
    },
  },
  mutations: {
    setCredentials(state, credentials) {
      state.credentials = credentials
    },
    setDrawer(state, drawer) {
      state.drawer = drawer
    },
    setLoginDialog(state, loginDialog) {
      state.loginDialog = loginDialog
    },
    showSnackbar(state, payload) {
      state.snackbar.text = payload.text
      state.snackbar.multiline = payload.text.length > 50 ? true : false
      state.snackbar.color = payload.color

      if (payload.color) {
        if (payload.color === 'error') {
          state.snackbar.icon = 'mdi-close-octagon'
        } else if (payload.color === 'success') {
          state.snackbar.icon = 'mdi-check-circle'
        }
      }

      state.snackbar.visible = true
    },
    closeSnackbar(state) {
      state.snackbar.visible = false
      state.snackbar.multiline = false
      state.snackbar.text = null
      state.snackbar.color = ''
      state.snackbar.icon = ''
    },
  },
})
