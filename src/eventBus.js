import Vue from 'vue'
export default new Vue({
  methods: {
    setSelectedItems(items) {
      this.$emit('onSelectedItemsChanged', items)
    },
    onSelectedItemsChanged(callback) {
      this.$on('onSelectedItemsChanged', callback)
    },
    notifyUserList(items) {
      this.$emit('onUserListNotified', items)
    },
    onUserListNotified(callback) {
      this.$on('onUserListNotified', callback)
    },
  },
})
