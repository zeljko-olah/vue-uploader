<template>

  <!-- TOOLBAR COMPONENT -->
  <v-toolbar
    fixed
    height="80px"
    dark
    class="light-blue lighten-1 elevation-1">

    <!-- DISTRIBUTE SPACE -->
    <v-spacer></v-spacer>

    <img class="header__logo" src="static/cloud.png" alt="">

    <!--  TOOLBAR TITLE -->
    <v-toolbar-title class="display-1 mb-1 hidden-sm-and-down">
      Happy Cloud
    </v-toolbar-title>

    <!-- DISTRIBUTE SPACE -->
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>

    <notifications></notifications>

    <!-- DISTRIBUTE SPACE -->
    <v-spacer></v-spacer>
  </v-toolbar>
</template>

<script>
import Notifications from './Notifications'
export default {
  components: {
    Notifications: Notifications
  }
}
</script>

<style lang="stylus" scoped>

/**********************
// Header Component //
**********************/

.header
  /* position the logo image */
  position relative
  z-index 1000

  &__logo
    width 100px
    height auto
    margin-top 2.5rem
</style>
