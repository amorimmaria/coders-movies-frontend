<template>
  <v-card>
    <v-card-title>
      <span class="headline">Registrar</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model.trim="user.name"
                label="Nome Completo"
                required
                :counter="50"
                :rules="nameRules"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model.trim="user.username"
                label="Username"
                required
                :counter="20"
                :rules="usernameRules"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="user.birth_date"
                label="Data de Nascimento"
                type="date"
                required
                :rules="birthDateRules"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model.trim="user.email"
                label="E-mail"
                required
                :rules="emailRules"
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
                :rules="passwordRules"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model.trim="user.confirmPassword"
                label="Repetir senha"
                required
                :type="showCPassword ? 'text' : 'password'"
                :append-icon="showCPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                @click:append="showCPassword = !showCPassword"
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
        @click="$store.commit('setAuthScreen', 'login')"
        >Faça login em vez disso</v-btn
      >

      <v-btn color="primary" @click="register()">Registrar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'

export default {
  data: () => ({
    valid: true,
    user: {},
    nameRules: [
      v => !!v || 'Nome é obrigatório',
      v => (v && v.length <= 50) || 'Nome deve possuir até 50 caracteres',
    ],
    usernameRules: [
      v => !!v || 'Username é obrigatório',
      v => (v && v.length <= 20) || 'Username deve possuir até 20 caracteres',
    ],
    birthDateRules: [v => !!v || 'Data de nascimento é obrigatório'],
    emailRules: [
      v => !!v || 'E-mail é obrigatório',
      v => /.+@.+\..+/.test(v) || 'E-mail não válido',
    ],
    passwordRules: [
      v => !!v || 'Senha é obrigatório',
      v => (v && v.length >= 6) || 'Senha deve possuir pelo menos 6 caracteres',
    ],
    showPassword: false,
    showCPassword: false,
  }),
  computed: mapState(['authDialog']),
  methods: {
    ...mapMutations(['setCredentials', 'showSnackbar', 'setAuthDialog']),
    closeDialog() {
      this.$store.commit('setAuthDialog', false)
      this.$store.commit('setAuthScreen', 'login')
    },
    async register() {
      if (!this.$refs.form.validate()) return
      if (!this.checkPasswords()) return

      try {
        await axios.post('http://localhost:3000/users', this.user)

        this.showSnackbar({
          text: 'Cadastro realizado com sucesso!',
          color: 'success',
        })

        this.setAuthDialog(false)

        this.login()
      } catch (err) {
        this.showSnackbar({
          text: err.response.data.error,
          color: 'error',
        })
      }
    },
    checkPasswords() {
      if (this.user.password !== this.user.confirmPassword) {
        this.showSnackbar({
          text: 'Senhas não coincidem',
          color: 'error',
        })

        return false
      }

      return true
    },
    async login() {
      const response = await axios.post(
        'http://localhost:3000/sessions',
        this.user
      )

      const credentials = response.data

      this.setCredentials(credentials)

      localStorage.setItem('credentials', JSON.stringify(credentials))
    },
  },
}
</script>
