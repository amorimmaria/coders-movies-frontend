<template>
  <v-app id="inspire">
    <Menu />

    <Header />

    <Content />

    <Auth />

    <Footer />

    <SnackbarStore />
  </v-app>
</template>

<script>
import Menu from './components/common/Menu'
import Header from './components/common/Header'
import Content from './components/common/Content'
import Auth from './pages/Auth'
import Footer from './components/common/Footer'
import SnackbarStore from './components/common/SnackbarStore'

import axios from 'axios'

export default {
  components: { Auth, Menu, Footer, Header, Content, SnackbarStore },
  props: {},
  data: () => ({}),
  created() {
    this.$vuetify.theme.dark = true

    this.validateToken()
  },
  methods: {
    async validateToken() {
      const json = localStorage.getItem('credentials')
      if (!json) return

      const credentials = JSON.parse(json)
      this.$store.commit('setCredentials', credentials)

      const auth = this.$store.getters.getAuth

      try {
        await axios(`http://localhost:3333/users/me`, auth)
      } catch {
        localStorage.removeItem('credentials')
        this.$store.commit('setCredentials', null)
      }
    },
  },
}
</script>

<style>
/*

Se quiser alterar a cor de fundo
#inspire {
  background-color: red;
}

*/
</style>
