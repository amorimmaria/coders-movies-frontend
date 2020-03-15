<template>
  <v-app id="inspire">
    <Menu />

    <Header />

    <Content />

    <Login />

    <Footer />

    <SnackbarStore />
  </v-app>
</template>

<script>
import Menu from './components/common/Menu'
import Header from './components/common/Header'
import Content from './components/common/Content'
import Login from './components/common/Login'
import Footer from './components/common/Footer'
import SnackbarStore from './components/common/SnackbarStore'

export default {
  components: { Login, Menu, Footer, Header, Content, SnackbarStore },
  props: {},
  data: () => ({}),
  created() {
    this.$vuetify.theme.dark = true
  },
}
</script>
