<template>
  <b-col md="4" sm="12">
    <router-link v-if="selected.length === 0" to="/users/create">
      <b-button class="bt-secondary-global-lg">
        <i class="fa fa-plus-circle mr-2"></i>Cadastrar
      </b-button>
    </router-link>

    <v-btn
      v-if="selected.length > 0"
      class="pull-right"
      color="red"
      icon
      @click="removeItemsSelecteds()"
    >
      <b-spinner v-if="loading" label="Spinning"></b-spinner>
      <v-icon v-else large dark>mdi-account-cancel</v-icon>
    </v-btn>
  </b-col>
</template>
<script>
import eventBus from '@/eventBus'
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'

export default {
  data: () => ({
    selected: [],
    loading: false,
  }),
  computed: mapState(['credentials']),
  created() {
    eventBus.onSelectedItemsChanged(selectedItems => {
      this.selected = selectedItems
    })
  },
  methods: {
    ...mapMutations(['showSnackbar']),
    async removeItemsSelecteds() {
      this.loading = true

      const auth = this.$store.getters.getAuth

      try {
        this.selected.forEach(async item => {
          await axios.delete(`http://localhost:3333/admusers/${item.id}`, auth)
        })

        this.showSnackbar({
          text: 'Usuários bloqueados com sucesso!',
          color: 'success',
        })

        eventBus.notifyUserList([])
      } catch (err) {
        this.showSnackbar({
          text: err.response.data.error,
          color: 'error',
        })
      }

      this.loading = false
    },
  },
}
</script>
