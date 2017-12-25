<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs12>

        <!-- SEARCH TEXT FIELD  -->
        <div class="table-search">


          <!-- SEARCH INPUT -->
          <input
            v-model="searchText"
            @focus="searchText = lastSearch"
            @blur="clearText"
            @keyup.esc="clearText"
            @keyup="setSearchText(searchText)"
            type="text"
            class="table-search__input"
            id="user"/>

          <!-- SEARCH LABEL -->
          <label for="user" class="table-search__label">Search</label>

        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        // store search term
        searchText: '',
        lastSearch: ''
      }
    },
    methods: {
      ...mapActions('table', [
        // set search text in the store to be processed later
        'setSearchText'
      ]),
      clearText () {
        this.lastSearch = this.searchText
        this.searchText = ''
      }
    }
  }
</script>

<style lang="stylus">

/*************************
// Search input effect //
*************************/
.table-search
  width 100%
  position relative
  padding-top 16px
  margin-bottom 16px

  &__label
    position absolute
    top 20px
    left 0
    bottom 0
    z-index 0
    width 100%
    font-weight 300
    opacity 0.5
    cursor text
    transition 0.2s ease all
    margin 0
    user-select none
    &:after
      content ''
      position absolute
      bottom 0
      left 45%
      height 1px
      width 10px
      visibility hidden
      background-color #999
      transition 0.2s ease all

  &__input
    position relative
    width 100%
    outline none
    z-index 1
    border-radius 0
    border-width 0 0 1px
    border-bottom-color rgba(0,0,0,0.25)
    height auto
    padding 3px 0 5px
    &:focus
      box-shadow none
      border-bottom-color rgba(0,0,0,0.12)
      ~ .table-search__label
        top 0
        opacity 1
        color #333
        font-size 15px
        &:after
          visibility visible
          width 100%
          left 0

</style>
