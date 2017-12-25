<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="showDialog"
      persistent
      max-width="430">
      <v-card>

        <!-- DIALOG TITLE -->
        <v-card-title class="headline"></v-card-title>
        <v-card-text>Do you really want to delete {{ currentItemName }}?
        </v-card-text>
        <v-card-actions>

          <!-- INSERT SPACE TO THE LEFT -->
          <v-spacer></v-spacer>

          <!-- CANCEL BUTTON -->
          <v-btn
            color="red darken-1"
            flat="flat"
            @click.native="clearCurrent"
            >
            Cancel
          </v-btn>

          <!-- DELETE BUTTON -->
          <v-btn
            @click="deleteItem"
            color="green darken-1"
            flat="flat">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    props: ['currentItem'],
    computed: {
      ...mapGetters('table', [
        // current item name to delete
        'currentItemName',
        // boolean showDialog whether to show modal dialog
        'showDialog'
      ])
    },
    methods: {
      ...mapActions('table', [
        // clear currentitem if user cancel
        'clearCurrent',
        // delete item if delete button was clicked
        'deleteItem'
      ])
    }
  }
</script>
