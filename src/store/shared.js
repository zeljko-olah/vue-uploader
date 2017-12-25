export default {
  namespaced: true,

  state: {
    // state for displaying a loading spinner
    loading: false
  },

  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    }
  },

  getters: {
    loading (state) {
      return state.loading
    }
  }
}
