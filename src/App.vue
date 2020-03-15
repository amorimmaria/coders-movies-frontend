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

export default {
  components: { Auth, Menu, Footer, Header, Content, SnackbarStore },
  props: {},
  data: () => ({}),
  created() {
    this.$vuetify.theme.dark = true
  },
}
</script>
