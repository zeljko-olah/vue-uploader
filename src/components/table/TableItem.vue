<template>
  <tr class="items-table__tr">

    <!-- EDIT ICON -->
    <td class="items-table__td text-xs-center">
      <i
        @click.stop="showEditMode(item)"
        class="fa fa-edit items-table__icon info--text"></i>
    </td>

    <!-- ITEM NAME -->
    <td class="items-table__td items-table__td--name">
        <div class="items-table__td--wrap">
          <transition appear name="fade" mode="out-in">
            <span
              v-show="!editMode"
              :title="item.name"
              class="items-table__td--noedit">{{ item.name | allowedNameLength(28) }}</span>
          </transition>
          <transition name="fade" mode="out-in">
            <input v-show="editMode"
              v-model="editName"
              @keyup.enter="saveEdit(item)"
              @keyup.esc = "editMode = false"
              @blur="editMode = false"
              ref="editInput"
              class="items-table__td--edit light-blue lighten-4"
              type="text">
            </transition>
          </div>
    </td>

    <!-- ICON AND TYPE -->
    <td class="items-table__td items-table__td--type text-xs-right">
      <i
        class="fa"
        :class="(prependIcons(item.type))"
         ></i>
     {{ item.type }}
    </td>

    <!-- ITEM SIZE -->
    <td class="items-table__td text-xs-right">{{ item.size }}</td>

    <!-- ITEM DATE -->
    <td class="items-table__td text-xs-right">{{ item.date | formatDate }}</td>

    <!-- DELETE ICON -->
    <td class="items-table__td text-xs-center">
      <i
        @click.stop="readyToDelete({ item, index })"
        class="fa fa-remove items-table__icon red--text"></i>
    </td>
  </tr>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      editName: '',
      editMode: false
    }
  },
  props: ['item', 'index'],
  methods: {
    ...mapActions('table', [
      // show succes alert if edit update is successful
      'displayAlertInfo',
      // send item and index to prepare for deletion
      'readyToDelete',
      // saveEditedName
      'saveEditedName'
    ]),
    // prepend icons programmatically to type column
    prependIcons (type) {
      switch (type) {
        case 'mp3':
          return 'fa-music'
        case 'ppt':
          return 'fa-file-powerpoint-o'
        case 'doc':
          return 'fa-file-text-o'
        case 'pdf':
          return 'fa-file-pdf-o'
      }
    },
    // show edit mode when click on edit icon
    showEditMode (item) {
      this.editName = item.name
      this.editMode = true
      this.$nextTick(() => this.$refs.editInput.focus())
    },
    // save edit on blur or enter key pressed
    saveEdit (item) {
      // do not save if edited name is the same or same with spaces
      if (item.name === this.editName.trim()) return
      // set item name to edited name
      item.name = this.editName
      // dispatch action vuex to save edited name to firebase
      this.saveEditedName(item)
      // hide edit mode
      this.editMode = false
      // show success alert
      this.displayAlertInfo({
        show: true,
        message: 'File name updated',
        color: 'success'
      })
    }
  }
}
</script>

<style lang="stylus">

/**********************
// Table Item Styles //
**********************/

.items-table__td
  &--name
    width: 50%

  &--type
    width: 10%

  &--wrap
    position relative

  &--edit
    margin 0
    outline none

  &--noedit,
  &--edit
    position absolute
    left 0
    top 50%
    transform translate(0,-50%)
    padding 4px 10px

</style>
