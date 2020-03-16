<template>
  <v-card>
    <v-card-title>
      <span class="headline">Login</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model.trim="user.email"
                label="E-mail"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model.trim="user.password"
                label="Senha"
                required
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="closeDialog()">Cancelar</v-btn>

      <v-btn
        color="blue darken-1"
        text
        @click="$store.commit('setAuthScreen', 'register')"
        >Criar conta</v-btn
      >

      <v-btn color="primary" @click="login()">Entrar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapMutations } from 'vuex'
import axios from 'axios'

export default {
  data: () => ({
    valid: true,
    user: {},
    showPassword: false,
  }),

  methods: {
    ...mapMutations(['setCredentials', 'showSnackbar', 'setAuthDialog']),
    closeDialog() {
      this.$store.commit('setAuthDialog', false)
    },
    async login() {
      try {
        const response = await axios.post(
          'http://localhost:3000/sessions',
          this.user
        )

        const credentials = response.data

        this.setCredentials(credentials)

        localStorage.setItem('credentials', JSON.stringify(credentials))

        this.showSnackbar({
          text: 'Login efetuado com sucesso!',
          color: 'success',
        })

        this.setAuthDialog(false)
      } catch (err) {
        this.showSnackbar({
          text: err.response.data.error,
          color: 'error',
        })
      }
    },
  },
}
</script>
