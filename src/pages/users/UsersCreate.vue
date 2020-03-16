<template>
  <div>
    <Permission
      v-if="
        !credentials ||
          !credentials.user ||
          credentials.user.user_type !== 'admin'
      "
    />

    <v-form v-else ref="form" v-model="valid" lazy-validation>
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
      <v-row>
        <v-col cols="12">
          <v-checkbox
            v-model="isAdmin"
            label="Usuário administrador?"
            required
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-btn color="#55aedf" class="float-right" @click="create()"
        >Cadastrar</v-btn
      >
    </v-form>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'

import Permission from '../../components/common/Permission'

import axios from 'axios'

export default {
  components: { Permission },
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
    isAdmin: false,
  }),
  computed: mapState(['credentials']),
  methods: {
    ...mapMutations(['showSnackbar']),
    async create() {
      if (!this.$refs.form.validate()) return
      if (!this.checkPasswords()) return

      try {
        const auth = this.$store.getters.getAuth

        this.user.is_active = true

        this.isAdmin
          ? (this.user.user_type = 'admin')
          : (this.user.user_type = 'common')

        await axios.post('http://localhost:3000/admusers', this.user, auth)

        this.showSnackbar({
          text: 'Cadastro realizado com sucesso!',
          color: 'success',
        })
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
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
}
</script>
