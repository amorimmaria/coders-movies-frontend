<template>
  <div>
    <Permission v-if="!credentials" />

    <div v-else>
      <b-table-simple hover small caption-top stacked dark>
        <b-tbody>
          <b-tr>
            <b-th rowspan="3" class="text-center">Dados de {{ user.name }}</b-th>
            <b-th stacked-heading="Nome">{{ user.name }}</b-th>
            <b-td stacked-heading="E-mail">{{ user.email }}</b-td>
            <b-td stacked-heading="Username">{{ user.username }}</b-td>
            <b-td stacked-heading="Data de Nascimento">{{ birthDateFormatted }}</b-td>
            <b-td
              stacked-heading="Usuário Ativo"
              :variant="user.is_active ? 'success' : 'danger'"
            >{{ user.is_active ? 'Sim' : 'Não' }}</b-td>
            <b-td stacked-heading="Usuário criado em">{{ createdAtFormatted }}</b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
      <v-btn color="warning" dark class="float-right" @click="$router.push({path: '/user/update'})">
        Editar
        <v-icon right dark>mdi-pencil</v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import axios from 'axios'
import moment from 'moment'
import Permission from '../../components/common/Permission'

export default {
  components: { Permission },
  data: () => ({
    user: {},
  }),
  computed: {
    ...mapState(['credentials']),
    birthDateFormatted() {
      return moment(this.user.birth_date)
        .locale('pt-br')
        .format('L')
    },
    createdAtFormatted() {
      return moment(this.user.created_at)
        .locale('pt-br')
        .format('LLL')
    },
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

        this.user = response.data
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
