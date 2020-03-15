<template>
  <v-snackbar
    v-model="snackbar.visible"
    top
    right
    :timeout="snackbar.timeout"
    :multi-line="snackbar.multiline === true"
    :color="snackbar.color"
  >
    <v-icon class="pr-2" color="white">{{ snackbar.icon }}</v-icon>

    {{ snackbar.text }}

    <v-btn text @click="closeSnackbar">
      Fechar
    </v-btn>
  </v-snackbar>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  computed: {
    snackbar() {
      return this.$store.state.snackbar
    },
  },
  methods: {
    ...mapMutations(['closeSnackbar']),
  },
}
</script>
