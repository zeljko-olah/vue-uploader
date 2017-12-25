<template>
  <v-container>
    <v-layout>
      <v-flex xs12>

        <!-- PLACE THE TABLE IN CARD COMPONENT -->
        <v-card class="table elevation-4" >

          <v-card-title>
            <!-- SEARCH FIELD COMPONENT -->
            <search-items></search-items>
          </v-card-title>

          <!-- ALERT COMPONENT -->
          <alert></alert>

          <!-- SPINER -->
          <v-card-text v-if="loading" class="text-xs-center">
            <v-progress-circular
              indeterminate
              class="primary--text"
              :width="7"
              :size="70">
            </v-progress-circular>
          </v-card-text>

          <!-- DATA TABLE -->
          <items-table v-if="!loading"></items-table>

        </v-card>
      </v-flex>
    </v-layout>

    <!-- DIALOG COMPONENT -->
    <delete-dialog></delete-dialog>

  </v-container>
</template>

<script>
  import SearchItems from './SearchItems.vue'
  import Alert from './Alert.vue'
  import ItemsTable from './ItemsTable.vue'
  import DeleteDialog from './DeleteDialog.vue'

  export default {
    components: {
      SearchItems,
      Alert,
      ItemsTable,
      DeleteDialog
    },
    computed: {
      loading () {
        return this.$store.getters['shared/loading']
      }
    }
  }
</script>
