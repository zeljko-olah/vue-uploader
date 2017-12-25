<!-- ALERT COMPONENT -->
<template>
  <transition name="fade">
    <v-alert
      v-if="alert.show"
      :color="alert.color"
      outline
      icon="info"
      value="true">
      {{ alert.message }}
    </v-alert>
  </transition>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters('table', [
        // get alert information from the store
        'alert'
      ])
    }
  }
</script>

<style lang="stylus">

/******************
// Alert styles //
******************/
.alert.alert
  position absolute !important
  width 95%
  top 6.8rem
  padding .3rem
  margin 0 1rem 1rem

</style>
