<template>
  <v-app id="inspire">
    <Menu />

    <Header />

    <v-content>
      <router-view></router-view>
    </v-content>

    <Login />

    <Footer />
  </v-app>
</template>

<script>
import Login from './components/Login'
import Menu from './components/Menu'
import Footer from './components/Footer'
import Header from './components/Header'

export default {
  components: { Login, Menu, Footer, Header },
  props: {},
  data: () => ({}),
  created() {
    this.$vuetify.theme.dark = true
  },
}
</script>
