<template>
  <div>
    <Permission v-if="!$store.getters.getPermissionAdm" />

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
      <v-row>
        <v-col cols="12">
          <v-checkbox v-model="isAdmin" label="Usuário administrador?" required />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-checkbox v-model="user.is_active" label="Usuário ativo?" required />
        </v-col>
      </v-row>
      <v-btn color="#55aedf" class="float-right" @click="update()">Editar</v-btn>
      <v-btn
        color="warning"
        dark
        class="float-right mr-2"
        @click="$router.push({path: `/users/${$route.params.id}/changepass`})"
      >
        Alterar senha
        <v-icon right dark>mdi-lock</v-icon>
      </v-btn>
    </v-form>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'

import Permission from '../../components/common/Permission'

import axios from 'axios'

export default {
  components: { Permission },
  props: { id: { type: Number, default: 0 } },
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
    isAdmin: false,
  }),
  created() {
    this.getUser()
  },
  methods: {
    ...mapMutations(['showSnackbar']),
    async getUser() {
      const auth = this.$store.getters.getAuth

      try {
        const response = await axios(
          `http://localhost:3333/admusers/${this.$route.params.id}`,
          auth
        )

        this.user = response.data

        this.user.user_type === 'admin'
          ? (this.isAdmin = true)
          : (this.isAdmin = false)
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

        this.isAdmin
          ? (this.user.user_type = 'admin')
          : (this.user.user_type = 'common')

        await axios.put(
          `http://localhost:3333/admusers/${this.$route.params.id}`,
          this.user,
          auth
        )

        this.showSnackbar({
          text: 'Usuário editado com sucesso!',
          color: 'success',
        })

        this.$router.push({ path: '/users/list' })
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
