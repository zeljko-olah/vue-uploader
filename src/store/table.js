// import items from external file
// import items from '../data/items'
import { database } from 'firebase'

export default {
  namespaced: true,

  state () {
    return {
      // TABLE
      // items from external file
      items: [],
      // initial number of items
      count: 8,
      // how many items to load with load more
      loadNum: 8,
      // text entered in search field
      searchText: '',
      // show dialog
      showDialog: false,
      // current item and index to delete
      currentItem: null,
      currentIndex: null,
      // alert
      displayAlert: false,
      alertMessage: '',
      alertColor: 'info'
    }
  },

  mutations: {
    setLoadedItems (state, payload) {
      state.items = payload
    },
    searchText (state, payload) {
      state.searchText = payload
    },
    addFile (state, file) {
      state.items.unshift(file)
    },
    setCount (state) {
      state.count += state.loadNum
    },
    showDialog (state, payload) {
      state.showDialog = payload
    },
    deleteItem (state, index) {
      state.items.splice(index, 1)
    },
    currentItem (state, item) {
      state.currentItem = item
    },
    currentIndex (state, index) {
      state.currentIndex = index
    },
    displayAlert (state, payload) {
      state.displayAlert = payload.show
      state.alertMessage = payload.message
      state.alertColor = payload.color
    },
    resetAlert (state) {
      state.displayAlert = false
      state.alertMessage = ''
      state.alertColor = ''
    }
  },

  actions: {
    // load items from firebase
    loadItems ({ commit }) {
      //
      commit('shared/setLoading', true, { root: true })
      // reach to fireabase and get values on "files" reference node
      database().ref('files').once('value')
      // then create items array from database response data
      .then((data) => {
        const items = []
        // firebase gives us val() to use just file object,and not other
        // metadata from the response data
        const obj = data.val()
        for (let key in obj) {
          items.push({
            id: key,
            name: obj[key].name,
            type: obj[key].type,
            size: obj[key].size,
            date: obj[key].date
          })
        }
        // set items in mutation
        commit('setLoadedItems', items)
        commit('shared/setLoading', false, { root: true })
      })
      .catch((error) => {
        commit('shared/setLoading', false, { root: true })
        console.log(error)
      })
    },
    setSearchText ({ commit }, payload) {
      commit('searchText', payload)
    },
    saveEditedName ({ commit }, payload) {
      console.log(payload)
      database().ref('files').child(payload.id).update({ name: payload.name })
    },
    // prepare delete information
    readyToDelete ({ commit, dispatch }, payload) {
      commit('currentItem', payload.item)
      commit('currentIndex', payload.index)
      dispatch('showDialog', true)
    },
    clearCurrent ({ commit, dispatch }) {
      commit('currentItem', null)
      commit('currentIndex', null)
      dispatch('showDialog', false)
    },
    showDialog ({ commit }, payload) {
      commit('showDialog', payload)
    },
    // delete item, close dialog,display alert
    deleteItem ({ state, commit, dispatch }) {
      commit('shared/setLoading', true, { root: true })
      // reach to firebase and delete file
      database().ref('files').child(state.currentItem.id).remove()
        .then((data) => {
          commit('shared/setLoading', false, { root: true })
        })
        .catch((error) => {
          commit('shared/setLoading', false, { root: true })
          console.log(error)
        })

      commit('deleteItem', state.currentIndex)
      dispatch('showDialog', false)
      dispatch('displayAlertInfo', {
        show: true,
        message: 'File deleted',
        color: 'error'
      })
    },
    // handle alerts
    displayAlertInfo ({ commit, dispatch }, payload) {
      commit('displayAlert', payload)
      setTimeout(() => {
        dispatch('resetAlert')
      }, 3000)
    },
    resetAlert ({ commit }) {
      commit('resetAlert')
    },
    // load more items on click load button
    loadMore ({ commit }) {
      commit('setCount')
    }
  },

  getters: {
    items (state) {
      return state.items.sort((a, b) => {
        a = new Date(a.date)
        b = new Date(b.date)
        return a > b ? -1 : a < b ? 1 : 0
      })
    },
    count (state) {
      return state.count
    },
    displayItems (state) {
      return state.items.slice(0, state.count)
    },
    searchText (state) {
      return state.searchText
    },
    // filter items depending on the search term
    searchedItems (state, getters) {
      if (state.searchText) {
        const reg = new RegExp(state.searchText.trim().toLowerCase().replace(/\s+/g, '|'))
        return getters.displayItems.filter(
          item => {
            return item.name.toLowerCase().search(reg) !== -1 ||
            item.type.toLowerCase().search(reg) !== -1 ||
            item.size.toLowerCase().search(reg) !== -1 ||
            item.date.toLowerCase().search(reg) !== -1
          }
        )
      } else {
        return getters.displayItems
      }
    },
    currentItemName (state) {
      if (state.currentItem) {
        return state.currentItem.name
      } else {
        return null
      }
    },
    currentIndex (state) {
      return state.currentIndex
    },
    showDialog (state) {
      return state.showDialog
    },
    alert (state) {
      return {
        show: state.displayAlert,
        message: state.alertMessage,
        color: state.alertColor
      }
    }
  }
}
