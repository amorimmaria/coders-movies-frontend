<template>
  <v-row justify="center">
    <v-dialog v-model="authDialog" persistent max-width="600px">
      <Login v-if="authScreen === 'login'" />

      <Register v-else />
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'

import Login from '../components/auth/Login'
import Register from '../components/auth/Register'

export default {
  components: { Login, Register },
  computed: mapState(['authDialog', 'authScreen']),
}
</script>
