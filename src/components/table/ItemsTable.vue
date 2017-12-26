<template>
  <div>
    <v-card-text>
      <table
        v-if="items"
        class="items-table">

        <!-- HEAD -->
        <thead class="items-table__head">
          <th class="items-table__th">
            <i class="fa fa-edit info--text text-xs-left"></i>
          </th>
          <th @click="sortByName" class="items-table__th text-xs-left">
            Name
            <i class="fa fa-sort"></i>
          </th>
          <th class="items-table__th text-xs-right">Type</th>
          <th @click="sortBySize" class="items-table__th text-xs-right">
            Size
            <i class="fa fa-sort"></i>
          </th>
          <th @click="sortByDate"class="items-table__th text-xs-right">
            Date
            <i class="fa fa-sort"></i>
          </th>
          <th class="items-table__th">
            <i class="fa fa-remove error--text text-xs-right"></i>
          </th>
        </thead>

        <!-- BODY -->
        <tbody is="transition-group" name="table-row" class="items-table__body">

          <!-- ITEMS TABLE COMPONENT -->
          <tableItem
            v-for="item, index in filteredItems"
            :item="item"
            :index="index"
            :key="item.id" />

        </tbody>

      </table>
    </v-card-text>

    <v-divider></v-divider>

    <!-- LOAD MORE BUTTON -->
    <v-card-actions class="table__card-actions ml-4">
      <transition name="fade" mode="out-in">
        <v-btn
        id="tableScrollToBottom"
        @click="loadMore()"
        v-if="!noMoreResults && filteredItems.length !== 0"
        v-scroll-to="scrollToLoadMoreButton"
        large
        color="info"
        class="elevation-5 mt-2 mb-2"
        >
        Load
        <v-icon medium right>autorenew</v-icon>
      </v-btn>
      <!-- NO ITEMS ATT ALL -->
      <p v-else-if="filteredItems.length === 0">No items to load.</p>
      <!-- NO MORE ITEMS TO LOAD -->
      <p v-else-if="noMoreResults && items.length > 8">No more items to load.</p>
    </transition>
  </v-card-actions>
  </div>
</template>

<script>
  import TableItem from './TableItem.vue'

  import { mapGetters } from 'vuex'

  export default {
    components: {
      TableItem
    },
    data () {
      return {
        // position where to scroll to
        scrollToLoadMoreButton: {
          el: '#tableScrollToBottom',
          container: 'body',
          duration: 700,
          easing: 'ease',
          offset: -200
        },
        filteredItems: [],
        prefix: 1
      }
    },
    computed: {
      ...mapGetters('table', [
        // filtered items with search term
        'searchedItems',
        // all items
        'items',
        // currently displayed items
        'displayItems'
        // count - how many items to load
      ]),
      noMoreResults () {
        // if there is no more results to display
        if (this.items.length === 0) {
          return true
        }
        return this.displayItems.length === this.items.length && !!this.items.length
      }
    },
    watch: {
      searchedItems (value) {
        this.filteredItems = this.searchedItems
      }
    },
    methods: {
      // when load button is clicked on
      loadMore () {
        console.log(!!this.items.length)
        this.$store.dispatch('table/loadMore')
      },
      // sorting table by name
      sortByName () {
        this.filteredItems = this.searchedItems.sort((a, b) => {
          var nameA = a.name.toUpperCase()
          var nameB = b.name.toUpperCase()
          if (nameA < nameB) {
            return -1 * this.prefix
          }
          if (nameA > nameB) {
            return 1 * this.prefix
          }

          return 0
        })
        this.change(this.prefix)
      },
      // sorting table by size
      sortBySize () {
        this.filteredItems = this.searchedItems.sort((a, b) => {
          return (parseFloat(a.size) - parseFloat(b.size)) * this.prefix
        })
        this.change(this.prefix)
      },
      // sorting table by date
      sortByDate () {
        this.filteredItems = this.searchedItems.sort((a, b) => {
          return (new Date(a.date).getTime() - new Date(b.date).getTime()) * this.prefix
        })
        this.change(this.prefix)
      },
      // change sort order - ascending vs descending
      change (prefix) {
        prefix === 1 ? prefix = -1 : prefix = 1
        this.prefix = prefix
      }
    },
    mounted () {
      this.filteredItems = this.searchedItems
    }
  }
</script>

<style lang="stylus">

/*************************
// Table styles //
*************************/

.items-table
  border-radius 5px
  width 100%
  border-collapse collapse

  &__body
    position relative !important

  &__th
    font-weight bold !important

  &__th,
  &__td
    font-size 10px !important
    padding .2rem 0 !important
    height auto
    @media screen and (max-width: 600px) {
      font-size 8px !important
      padding .5rem .1rem !important
      margin-right .2rem !important
    }
    @media screen and (min-width: 600px) and (max-width: 959px) {
      font-size 12px !important
      padding .5rem .2rem !important
      margin-right .3rem !important
    }
    @media screen and (min-width: 960px) and (max-width: 1263px) {
      font-size 13px !important
      padding .5rem .2rem !important
      margin-right .1rem !important
    }
    @media screen and (min-width: 1264px) {
      font-size 16px !important
      padding .6rem .5rem !important
      margin-right .3rem !important
    }

  &__icon
    transform translate(0px, 0)
    opacity 0
    cursor pointer
    transition all .5s ease
    &:hover
      opacity 1
      transform translate(3px, 0) scale(1.5)

  &__tr:nth-child(odd)
    background-color #E1F5FE !important

.table__card-actions
  height 5rem
  transition all .5s ease-in

</style>
