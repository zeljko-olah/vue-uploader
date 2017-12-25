<template>
  <div>
    <!-- CARD TITLE -->
    <v-card-title class="light-blue lighten-1 upload__headline white--text">

      <!-- TITLE -->
      <h2>Upload Files</h2>

      <!-- SPACE IN BETWEEN   -->
      <v-spacer></v-spacer>

      <!-- ICON -->
      <v-icon dark medium>file_upload</v-icon>
    </v-card-title>

    <!-- CARD TEXT CONTENT -->
    <v-card-text class="upload__text grey--text">

      <!-- NAME -->
      <p :title="name">
        Name:
        <span><strong>{{ name | allowedNameLength }}</strong></span>
      </p>

      <!-- TYPE -->
      <p>Type:
        <span><strong>{{ type }}</strong></span>
      </p>

      <!-- SIZE -->
      <p>Size:
        <span v-if="size != 0"><strong>{{ size }}</strong></span>
      </p>

    </v-card-text>
  </div>
</template>

<script>
export default {
  computed: {
    name () {
      return this.$store.getters['upload/fileInfo'].name
    },
    type () {
      return this.$store.getters['upload/fileInfo'].type
    },
    size () {
      return this.$store.getters['upload/fileInfo'].size
    }
  }

}
</script>

<style lang="stylus">

.upload
/* Upload component title */
  &__headline h2
    font-size 2rem
    font-weight 400
  & .card__title
    padding 0.3rem 2rem

  /* Upload component content */
  &__text
    word-wrap: break-word;
    font-size 1.1rem
    font-style italic
    padding: 1rem 1rem 0
    & strong
      margin-left .4rem

    & p:not(:last-child)
      border-bottom 1px dashed lighten(grey, 70%)

</style>
