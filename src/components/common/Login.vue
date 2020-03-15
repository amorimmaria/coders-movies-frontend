<template>
  <v-row justify="center">
    <v-dialog v-model="loginDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <div
              class="form-group"
              :class="{ 'form-group--error': $v.name.$error }"
            >
              <v-row v-if="screen === 'register'">
                <v-col cols="12">
                  <v-text-field
                    v-model="user.name"
                    label="Nome Completo"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row v-if="screen === 'register'">
                <v-col cols="6">
                  <v-text-field
                    v-model="user.username"
                    label="Username"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="user.birth_date"
                    label="Data de Nascimento"
                    type="date"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="user.email"
                    label="E-mail"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row v-if="screen !== 'recover'">
                <v-col cols="12">
                  <v-text-field
                    v-model="user.password"
                    label="Senha"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row v-if="screen === 'register'">
                <v-col cols="12">
                  <v-text-field
                    v-model="user.confirmPassword"
                    label="Repetir senha"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog()"
            >Cancelar</v-btn
          >

          <v-btn
            v-if="screen === 'login'"
            color="blue darken-1"
            text
            @click="screen = 'register'"
            >Criar conta</v-btn
          >
          <v-btn v-else color="blue darken-1" text @click="screen = 'login'"
            >Faça login em vez disso</v-btn
          >

          <v-btn v-if="screen === 'login'" color="primary" @click="login()"
            >Entrar</v-btn
          >
          <v-btn v-else color="primary" @click="register()">Registrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  data: () => ({
    user: {},
    screen: 'login',
  }),
  computed: mapState(['loginDialog']),
  validations: {
    user: {
      name: {
        required,
        minLength: minLength(6),
      },
      email: {
        minLength: minLength(4),
      },
    },
  },
  methods: {
    ...mapMutations(['setCredentials', 'showSnackbar', 'setLoginDialog']),
    closeDialog() {
      this.$store.commit('setLoginDialog', false)
    },
    async login(loginFromRegister = false) {
      try {
        const response = await axios.post(
          'http://localhost:3000/sessions',
          this.user
        )

        const credentials = response.data

        this.setCredentials(credentials)

        localStorage.setItem('credentials', JSON.stringify(credentials))

        !loginFromRegister &&
          this.showSnackbar({
            text: 'Login efetuado com sucesso!',
            color: 'success',
          })

        this.setLoginDialog(false)
      } catch (err) {
        !loginFromRegister &&
          this.showSnackbar({
            text: err.response.data.error,
            color: 'error',
          })
      }
    },
    async register() {
      try {
        await axios.post('http://localhost:3000/users', this.user)

        this.showSnackbar({
          text: 'Cadastro realizado com sucesso!',
          color: 'success',
        })

        this.login(true)
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
