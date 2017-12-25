import { database } from 'firebase'

export default {
  namespaced: true,

  state () {
    return {
      // information about file to upload
      fileInfo: null
    }
  },

  mutations: {
    // mutate - change fileInfo
    setFileInfo (state, fileInformation) {
      state.fileInfo = fileInformation
    }
  },

  actions: {
    checkIfFileExists ({ dispatch, commit, rootGetters }, payload) {
      console.log('Checking...')
      // first check if same item exists
      let sameItem = rootGetters['table/items'].find(item => {
        return item.name === payload.name
      })
      if (sameItem) {
        //  if exists then show warning alert
        dispatch('table/displayAlertInfo', {
          show: true,
          message: 'Same file already exists',
          color: 'warning'
        }, { root: true })
        // and set file upload info
        commit('setFileInfo', {
          name: 'File Already Exist',
          type: '',
          size: '',
          date: ''
        })
        console.log('File already exists!')
      } else {
        dispatch('setUploadFileInfo', payload)
      }
    },
    handleUpload ({commit, dispatch}, payload) {
      commit('shared/setLoading', true, { root: true })
      // store file in the list
      // reach to firebase storage and set uploaded file item
      database().ref('files').push(payload)
        .then((data) => {
          payload.id = data.key
          commit('table/addFile', payload, { root: true })
          commit('shared/setLoading', false, { root: true })
        })
        // catch any potential errors
        .catch((error) => {
          commit('shared/setLoading', false, { root: true })
          console.log(error)
        })
      // display success alert
      dispatch('table/displayAlertInfo', {
        show: true,
        message: 'Upload succesfull',
        color: 'success'
      }, { root: true })
      // and update notifications
      dispatch('notifications/updateNotifications', null, { root: true })
      console.log('Ok... File Added!')
    },
    setUploadFileInfo ({ commit }, fileInformation) {
      // update upload file information
      commit('setFileInfo', fileInformation)
    }
  },

  getters: {
    // retrieve file information to upload
    fileInfo (state) {
      if (state.fileInfo === null) {
        return {
          name: '',
          type: '',
          size: ''
        }
      } else {
        return state.fileInfo
      }
    }
  }
}
