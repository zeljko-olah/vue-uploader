<template>

    <!-- FOOTER -->
    <footer id="footer" class="appfooter">
      <v-layout column>
        <v-card dark color="light-blue darken-1">
          <v-container fluid>
            <v-layout :column="orientation" :row="!orientation">
              <v-flex xs12 sm4 md6 offset-sm1 offset-md2>

                <!-- CARD COMPONENT DESCRIPTION -->
                <v-card flat color="light-blue darken-1">

                  <!-- TITLE -->
                  <v-card-title>
                    <h2 class="headline d-inline-block">
                      What is Cloud Computing?
                      <v-icon right dark>cloud</v-icon>
                    </h2>
                  </v-card-title>

                  <!-- TEXT CONTENT -->
                  <v-card-text>
                    <p class="body">Cloud storage is a cloud computing model in which data is stored on remote servers accessed from the Internet, or "cloud." It is maintained, operated and managed by a cloud storage service provider on a storage servers that are built on virtualization techniques.</p>
                  </v-card-text>
                </v-card>

              </v-flex>
              <v-flex xs12 sm3 offset-sm1 offset-md0>
                <!-- CARD COMPONENT SOCIAL ICONS -->
                <v-card flat color="light-blue darken-1">

                  <!-- TITLE -->
                  <v-card-title>
                    <h2 class="headline">Connect With Us!</h2>
                  </v-card-title>

                  <!-- CARD ACTION BUTTONS -->
                  <v-card-actions>

                    <!-- github -->
                    <a href="https://github.com/zeljko-olah" target="_blank"><v-btn class="ma-0" flat fab>
                        <v-icon>
                          fa-github
                        </v-icon>
                      </v-btn ></a>

                    <!-- LINKEDIN -->
                    <a href="https://www.linkedin.com/in/zeljko-olah-11b97a13b/" target="_blank"><v-btn class="ma-0" flat fab>
                      <v-icon>
                        fa-linkedin
                      </v-icon>
                    </v-btn></a>

                    <!-- TWITTER -->
                    <a href="https://twitter.com/zeljkoolah" target="_blank"><v-btn class="ma-0" flat fab>
                        <v-icon>
                          fa-twitter
                        </v-icon>
                      </v-btn></a>

                    <!-- EMAIL -->
                    <a href="mailto:olah.zeljko@gmail.com"><v-btn class="ma-0" flat fab>
                        <v-icon>
                          fa-envelope-open
                        </v-icon>
                      </v-btn></a>
                  </v-card-actions>
                </v-card>

              </v-flex>
            </v-layout>
          </v-container>
        </v-card>

        <!-- CARD COMPONENT COPYRIGHT -->
        <v-card
          dark
          flat
          color="light-blue darken-2"
          class="pa-1">
          <v-container>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <span>Made with <i class="fa fa-heart"></i> and VueJS, Vuex, Vuetify and Firebase by <strong>Zeljko Olah</strong> © {{ new Date().getFullYear() }}</span>
                <br>
                <span>Inspiration from dear Front-End friend <strong>Nikola Lakovic.</strong></span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-layout>

      <!-- GO-TO-TOP BUTTON -->
      <v-btn
        v-scroll-to="'#top'"
        fab
        dark
        fixed
        bottom
        right
        color="light-blue lighten-1">
        <v-icon large>
          keyboard_arrow_up
        </v-icon>
      </v-btn>
    </footer>
</template>

<script>
export default {
  data () {
    return {
      isMobile: false
    }
  },
  computed: {
    orientation () {
      return this.isMobile
    }
  },
  mounted () {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  beforeDestroy () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true })
    }
  },
  methods: {
    onResize () {
      this.isMobile = window.innerWidth < 600
    }
  }
}
</script>

<style lang="stylus">

/**********************
// Footer Component //
**********************/

/* Apply small decoration with ::after and ::before pseudo classes */
.appfooter
  position relative
  margin-top 4rem

  & a
    text-decoration none
  &::before,
  &::after
    content ''
    height 75px
    pointer-events none
    position absolute
    top -75px
    width 75px

  &::before
    background-image linear-gradient(315deg, #039be5 50%, #64B5F6 50%)
    background-image -webkit-gradient(315deg, #039be5 50%, #64B5F6 50%)
    right 0
    -webkit-backface-visibility hidden

  &::after
    background-image linear-gradient(315deg, #0793d7 50%, transparent 50%)
    background-image -webkit-gradient(315deg, #0793d7 50%, transparent 50%)
    right 75px

</style>
