<template>
  <v-app id="inspire">
    <Menu />

    <Header />

    <Content />

    <Login />

    <Footer />
  </v-app>
</template>

<script>
import Menu from './components/Menu'
import Header from './components/Header'
import Content from './components/Content'
import Login from './components/Login'
import Footer from './components/Footer'

export default {
  components: { Login, Menu, Footer, Header, Content },
  props: {},
  data: () => ({}),
  created() {
    this.$vuetify.theme.dark = true
  },
}
</script>
