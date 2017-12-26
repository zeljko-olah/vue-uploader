<template>
  <!-- CARD ACTION BUTTONS -->
  <v-card-actions>
    <!-- FORM -->
    <form
      @submit.prevent="uploadFile"
      ref="formDom">

      <!-- WRAPPER FOR BUTTONS -->
      <div id="buttons" class="text-xs-center">

        <!-- ADD FILE BUTTON -->
        <v-btn
          class="upload__button"
          @click="onPickFile"
          fab
          dark
          color="amber lighten-2"
          :disabled="addFileDisabled">
          <v-icon class="upload__button-icon" large>add</v-icon>
        </v-btn>

        <!-- INPUT FILE FOR REAL FILE HANDLING -->
        <input
        type="file"
        style="display: none"
        ref="fileInput"
        accept="*"
        @change="onFilePicked">

        <!-- UPLOAD BUTTON -->
        <v-btn
        class="upload__button"
          @click="uploadFile"
          fab
          dark
          color="green lighten-3"
          :disabled="uploadDisabled">
          <v-icon class="upload__button-icon" dark large>cloud_upload</v-icon>
        </v-btn>

        <!-- RESET BUTTON -->
        <v-btn
        class="upload__button"
          @click="resetForm"
          fab
          dark
          color="red lighten-3"
          :disabled="deleteDisabled">
          <v-icon class="upload__button-icon" dark large>do_not_disturb_alt</v-icon>
        </v-btn>

        <!-- PLAY BUTTON -->
        <v-btn
        class="upload__button"
          @click="play"
          fab
          dark
          color="green lighten-3"
          :disabled="playDisabled">
          <v-icon class="upload__button-icon" dark large>play_arrow</v-icon>
        </v-btn>

        <!-- PAUSE BUTTON -->
        <v-btn
        class="upload__button"
          @click="pause"
          fab
          dark
          color="deep-purple lighten-3"
          :disabled="pauseDisabled">
          <v-icon class="upload__button-icon" dark large>pause</v-icon>
        </v-btn>
      </div>
    </form>
  </v-card-actions>
</template>

<script>
// import velocity for animating progress bar
import Velocity from 'velocity-animate'

export default {
  // receive from parent a progress bar element to animate it later
  props: ['animatedElement'],
  data () {
    return {
      // properties related to file handling
      fileName: '',
      fileSize: '',
      fileType: '',
      fileDate: null,
      fileInfo: {},
      // handling control buttons
      addFileDisabled: false,
      uploadDisabled: true,
      deleteDisabled: true,
      playDisabled: true,
      pauseDisabled: true,
      //  properties for animation
      animationDuration: 1000
    }
  },
  computed: {
    // check only for types this app accepts - (doc, mp3, ppt, pdf)
    checkFileType () {
      if (this.fileType !== 'doc' && this.fileType !== 'mp3' && this.fileType !== 'ppt' && this.fileType !== 'pdf') {
        let type = this.fileType
        this.resetForm()
        this.fileName = `.${type} is not supported!`
        this.uploadDisabled = true
        return false
      }
      return true
    },
    // information about file name to upload for later check if file exists
    fileNameInformation () {
      return this.$store.getters['upload/fileInfo'].name
    }
  },
  methods: {
    // reset form
    resetForm () {
      this.fileName = ''
      this.fileSize = ''
      this.fileType = ''
      this.fileDate = null
      // reset form DOM element
      this.$refs.formDom.reset()
      // handle control buttons
      this.addFileDisabled = false
      this.uploadDisabled = true
      this.deleteDisabled = true
      this.playDisabled = true
      this.pauseDisabled = true
      // clear file information component
      this.$store.dispatch('upload/setUploadFileInfo', {
        name: '',
        type: '',
        size: '',
        date: ''
      })
      console.log('Form Cleared Succesfully')
      // reset progress bar and stop animation only if animation was started and animated element exists
      if (this.animatedElement) {
        this.animatedElement.style.width = 0
        Velocity(this.animatedElement, 'stop')
      }
    },
    // connect add button with file input DOM element
    onPickFile () {
      this.$refs.fileInput.click()
    },
    // when file is selected execute this function
    onFilePicked (event) {
      // store file
      const file = event.target.files[0]
      // store file type
      this.fileType = file.name.split('.').pop()

      // first check file type and return if file type is not supported
      if (!this.checkFileType) {
        // set upload information for not supported files
        this.$store.dispatch('upload/setUploadFileInfo', {
          name: 'File type not supported!',
          type: '',
          size: '',
          date: ''
        })
        return false
      }
      // store file name
      this.fileName = file.name.replace(/\.[^/.]+$/, '')
      // set animation duration
      this.animationDuration = file.size / 5000
      // store file size - access filters to format size
      this.fileSize = this.$options.filters.formatSize(file.size)

      // store file date - access formatDate filter
      // this.fileDate = this.$options.filters.formatDate(new Date())
      this.fileDate = new Date().toISOString()

      // set fileInfo object to send it later to table component
      this.fileInfo = {
        name: this.fileName,
        type: this.fileType,
        size: this.fileSize,
        date: this.fileDate
      }
      // then check if file with the same name already exist in the table
      this.$store.dispatch('upload/checkIfFileExists', this.fileInfo)

      // prepare control buttons - show upload and delete - hide add file
      this.addFileDisabled = true
      this.uploadDisabled = false
      this.deleteDisabled = false

      // if it exists, then reset form
      if (this.fileNameInformation === 'File Already Exist') {
        this.resetForm()
        this.$store.dispatch('upload/setUploadFileInfo', {
          name: 'File Already Exist',
          type: '',
          size: '',
          date: ''
        })
        return
      }

      console.log('File Added for Upload!')
    },
    // click on upload button
    uploadFile () {
      // set control buttons
      this.pauseDisabled = false
      this.uploadDisabled = true
      this.deleteDisabled = false
      console.log('Upload Process Started!')
      // animate progress and handle upload file when animation is completed
      this.animateProgress()
    },
    // animate progress bar
    animateProgress () {
      console.log('Progress Animation Started!')
      // store "this" context to use it inside Velocity constructor function
      let vm = this
      // use velocity
      Velocity(this.animatedElement, { width: 100 + '%' }, {
        duration: this.animationDuration,
        // when animation is complete proceed with callback
        complete: function () {
          // simulate asyncronous operation
          setTimeout(function () {
            // reset progress bar
            vm.animatedElement.style.width = 0
            // handle control buttons
            vm.pauseDisabled = vm.deleteDisabled = true
            vm.addFileDisabled = false
            // reset form
            vm.resetForm()
            //  dispatch an event to notify table component
            vm.$store.dispatch('upload/handleUpload', vm.fileInfo)
          }, 1000)
        }
      })
    },
    // resume upload - play button
    play () {
      console.log('File Upload Resumed!')
      this.playDisabled = true
      this.pauseDisabled = false
      Velocity(this.animatedElement, 'resume')
    },
    // pause upload - pause button
    pause () {
      this.playDisabled = false
      this.pauseDisabled = true
      console.log('Upload Transfer Paused!')
      Velocity(this.animatedElement, 'pause')
    }
  }
}
</script>

<style lang="stylus">

.upload
  &__button
    @media screen and (max-width: 600px)
      width 38px
      height 38px
  &__button-icon
    @media screen and (max-width: 600px)
      font-size 24px !important
      width 18px !important
      height 18px !important


/* Override vuetify default styles for disabled buttons */
#buttons button.btn--disabled
  background-color rgba(0,0,0,0.12) !important
</style>
