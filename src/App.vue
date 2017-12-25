<template>

  <!-- MAIN V-APP WRAPPER FOR THE APPLICATION -->
  <v-app id="top" class="white">

    <!-- HEADER COMPONENT -->
    <app-header />

    <!-- HERO COMPONENT -->
    <app-jumbotron />

    <!-- MAKE 1 COL ON SMALL AND 2 COLS ON LARGE SCREENS -->
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm10 offset-sm1 md4>

          <!-- UPLOAD COMPONENT -->
          <base-upload id="upload" />
        </v-flex>

        <v-flex xs12 sm10 offset-sm1 md8 offset-md4>

          <!-- TABLE LIST COMPONENT -->
          <base-table xs12 id="table" />
        </v-flex>
      </v-layout>
    </v-container>

    <!-- FOOTER COMPONENT -->
    <app-footer />

  </v-app>
</template>

<script>
  // import components
  import AppHeader from './components/header/AppHeader.vue'
  import AppJumbotron from './components/jumbotron/AppJumbotron.vue'
  import BaseUpload from './components/upload/BaseUpload.vue'
  import BaseTable from './components/table/BaseTable.vue'
  import AppFooter from './components/footer/AppFooter.vue'

  // import function to position upload component utils
  import { positionUploadComponent } from './utils/DOM-manipulations'

  export default {
    // register components
    components: {
      AppHeader,
      AppJumbotron,
      BaseUpload,
      BaseTable,
      AppFooter
    },
    mounted () {
      positionUploadComponent()
    }
  }
</script>

<style lang="stylus">

/*****************
// Global Rules //
*****************/

[v-cloak] > * { display none }

.fade-enter-active,
.fade-leave-active
  transition opacity .7s linear
.fade-enter,
.fade-leave-to
  opacity 0

</style>
