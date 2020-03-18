<template>
  <v-app-bar app clipped-left color="#e31e1e" dense>
    <v-app-bar-nav-icon @click.stop="setDrawer()" />
    <router-link to="/">
      <v-icon class="mx-4" large>mdi-youtube</v-icon>
    </router-link>
    <v-toolbar-title class="mr-12 align-center">
      <router-link to="/" style="text-decoration:none !important; color: inherit !important">
        <span class="title">Youtube</span>
      </router-link>
    </v-toolbar-title>
    <v-spacer />
    <v-row align="center" style="max-width: 650px">
      <v-text-field
        :append-icon-cb="() => {}"
        placeholder="Search..."
        single-line
        append-icon="mdi-magnify"
        color="white"
        hide-details
      />
    </v-row>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState(['drawer']),
  methods: {
    setDrawer() {
      this.$store.commit('setDrawer', !this.drawer)
    },
  },
}
</script>
