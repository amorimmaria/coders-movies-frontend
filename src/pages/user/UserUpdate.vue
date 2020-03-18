<template>
  <div>
    <Permission v-if="!credentials" />

    <v-form v-else ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model.trim="user.name"
            label="Nome Completo"
            required
            :counter="50"
            :rules="nameRules"
          />
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
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="user.birth_date"
            label="Data de Nascimento"
            type="date"
            required
            :rules="birthDateRules"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model.trim="user.email" label="E-mail" required :rules="emailRules" />
        </v-col>
      </v-row>
      <v-btn color="#55aedf" class="float-right" @click="update()">Editar</v-btn>
      <v-btn
        color="warning"
        dark
        class="float-right mr-2"
        @click="$router.push({path: '/user/changepass'})"
      >
        Alterar senha
        <v-icon right dark>mdi-lock</v-icon>
      </v-btn>
    </v-form>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'

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
  }),
  computed: {
    ...mapState(['credentials']),
  },
  created() {
    this.getUser()
  },
  methods: {
    ...mapMutations(['showSnackbar']),
    async getUser() {
      const auth = this.$store.getters.getAuth

      try {
        const response = await axios(`http://localhost:3333/users/me`, auth)

        const { name, email, birth_date, username } = response.data

        this.user = { name, email, birth_date, username }
      } catch (err) {
        this.showSnackbar({
          text: err.response.data.error,
          color: 'error',
        })
      }
    },
    async update() {
      if (!this.$refs.form.validate()) return

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
