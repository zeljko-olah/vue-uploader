<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm8 lg6 offset-sm2 offset-lg3>

        <!-- JUMBOTRON COMPONENT -->
        <v-jumbotron
          height="300px"
          color="white"
          class="mt-5">

          <!-- FILL AVAILABLE HEIGHT IN JUMBOTRON -->
          <v-container fill-height>
            <v-layout align-center>
              <v-flex class="text-xs-center">

                <!-- JUMBOTRON TITLE -->
                <h2 class="display-2 text-xs-center light-blue--text mb-4">EASY, FAST AND SAFE</h2>

                <!-- HR RULE -->
                <!-- <v-divider class="my-3"></v-divider> -->

                <!-- JUMBOTRON DESCRIPTION -->
                <span class="jumbotron__subheading">Upload your music, documents, power point presentations and pdf!</span>
                <div class="jumbotron__description">(*.mp3, *.doc, *.ppt, *.pdf)</div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-jumbotron>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style lang="stylus">

/*************************
// Jumbotron Component //
*************************/

.jumbotron
  &__subheading
    font-weight 100
    font-size 1.8rem

  &__description
    font-size 1.3rem
    font-weight 300
    font-style italic

</style>
