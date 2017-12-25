export default {
  namespaced: true,

  state () {
    return {
      showNotification: false,
      notificationCount: 0
    }
  },

  mutations: {
    updateNotifications (state) {
      state.notificationCount += 1
      state.showNotification = true
    },
    clearNotifications (state) {
      state.notificationCount = 0
      state.showNotification = false
    }
  },

  actions: {
    // update notification count
    updateNotifications ({ commit }) {
      commit('updateNotifications')
    },
    //  clear notifications count and hide notifications
    clearNotifications ({ commit }) {
      commit('clearNotifications')
    }
  },

  getters: {
    showNotification (state) {
      return state.showNotification
    },
    notificationCount (state) {
      return state.notificationCount
    }
  }
}
