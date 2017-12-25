<template>
  <!-- PROFILE AND NOTIFICATIONS -->
  <div class="header__nav-stats">

    <!-- CHIP COMPONENT -->
    <v-chip
      color="transparent"
      class="white--text body-2 mt-3 mb-0">

      <!-- NOTIFICATIONS ICON -->
      <v-icon left dark>
        notifications
      </v-icon>

      <!-- NOTIFICATION BADGE -->
      <v-badge
        @click.native="clearNotifications"
        class="header__notification"
        color="red">
        <span
          v-if="showNotification"
          slot="badge"
          >{{ notificationCount }}</span>
        <span>Notifications</span>

        <!-- TOOLTIP -->
        <p v-if="showNotification" class="header__tooltip">You have a new file <br> on the top of the list!</p>
      </v-badge>
    </v-chip>

    <!-- PROFILE IMAGE CHIP -->
    <v-chip
      color="transparent"
      class="white--text body-2 mb-2 mt-0">
      <v-avatar>
        <img src="static/zeljko.png" alt="zeljko">
      </v-avatar>
      Olah Zeljko
    </v-chip>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapGetters('notifications', [
        // show notification if true
        'showNotification',
        // increase or reset notification count
        'notificationCount'
      ])
    },
    watch: {
      // watch for notification count to change and the play the sound
      notificationCount (value) {
        var audio = new Audio('static/plucky.mp3')
        // do not play when resetting notifications and count is back to 0
        if (this.notificationCount === 0) {
          return
        }
        audio.play()
      }
    },
    methods: {
      ...mapActions('notifications', [
        // remove notification action
        'clearNotifications'
      ])
    }
  }
</script>

<style lang="stylus" scoped>

/**********************
// Profile Component //
**********************/

.header
  &__nav-stats
    display flex
    flex-direction column

  &__tooltip
    opacity 0
    width 150px
    height auto
    background-color #81c784
    color #fff
    text-align center
    border-radius 6px
    padding 5px
    border 2px solid #fff
    top 10px
    right -170px
    position absolute
    z-index 1
    font-size 14px
    transition opacity 1s

  &__notification:hover > &__tooltip
    opacity 1
</style>
