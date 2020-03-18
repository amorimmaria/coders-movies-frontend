<template>
  <div>
    <Permission v-if="!credentials" />

    <v-form v-else ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model.trim="user.oldPassword"
            label="Senha Antiga"
            required
            :type="showOldPassword ? 'text' : 'password'"
            :append-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            @click:append="showOldPassword = !showOldPassword"
          />
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
          />
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
          />
        </v-col>
      </v-row>
      <v-btn color="#55aedf" class="float-right" @click="update()">Salvar</v-btn>
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
    passwordRules: [
      v => !!v || 'Senha é obrigatório',
      v => (v && v.length >= 6) || 'Senha deve possuir pelo menos 6 caracteres',
    ],
    showPassword: false,
    showCPassword: false,
    showOldPassword: false,
  }),
  computed: {
    ...mapState(['credentials']),
  },
  methods: {
    ...mapMutations(['showSnackbar']),
    async update() {
      if (!this.$refs.form.validate()) return
      if (!this.checkPasswords()) return

      try {
        const auth = this.$store.getters.getAuth

        await axios.put(`http://localhost:3333/users`, this.user, auth)

        this.showSnackbar({
          text: 'Operação realizada com sucesso!',
          color: 'success',
        })

        this.$router.push({ path: '/user' })
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
