<template>
  <v-container>
    <v-layout>
      <v-flex sm12>

        <v-card class="upload elevation-4">

          <!-- UPLOAD INFO COMPONENT -->
          <upload-info />

          <!-- PROGRESS BAR -->
          <v-progress-linear
          ref="progress"
          height="13"
          color="warning"
          background-color="grey lighten-2"
          class="upload__progress"
          />

          <!-- CONTROL BUTTONS COMPONENT -->
          <control-buttons :animatedElement="animatedElement" />

          <!-- <upload-form /> -->

        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import UploadInfo from './UploadInfo.vue'
  import ControlButtons from './ControlButtons.vue'

  export default {
    components: {
      UploadInfo,
      ControlButtons
    },
    data () {
      return {
        animatedElement: null
      }
    },
    mounted () {
      this.animatedElement = this.$refs.progress.$el.childNodes[0].nextSibling.childNodes[1]
    }
  }
</script>

<style lang="stylus">

/*****************************
// Upload Component Styles //
*****************************/
.upload
  position: initial
  border-radius 5px
  transition top .5s ease-in

  /* Position fixed for large screens */
  @media screen and (min-width: 960px) {
    transform scale(.9)
    position fixed
    left 2rem
    /* Top position dinamically updated - helper function in utils */
  }
  @media screen and (min-width: 1264px) {
    left 4rem
    transform scale(1)
  }
  @media screen and (min-width: 1900px) {
    left 10rem
    transform scale(1.2)
  }
  &__progress
    margin .3rem 0

</style>
