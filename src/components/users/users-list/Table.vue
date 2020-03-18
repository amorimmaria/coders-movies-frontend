<template>
  <div>
    <b-table
      ref="selectableTable"
      selectable
      select-mode="range"
      :items="items"
      :fields="fields"
      responsive="sm"
      table-variant="dark"
      striped
      @row-selected="onRowSelected"
    >
      <!-- Example scoped slot for select state illustrative purposes -->
      <template v-slot:cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true">&check;</span>
          <span class="sr-only">Selected</span>
        </template>
        <template v-else>
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only">Not selected</span>
        </template>
      </template>

      <template v-slot:cell(actions)="row">
        <router-link :to="`${row.item.id}/detail`">
          <b-button size="sm" class="mr-1">
            <v-icon small>mdi-eye</v-icon>
          </b-button>
        </router-link>

        <router-link :to="`${row.item.id}/update`">
          <b-button size="sm" class="mr-1">
            <v-icon small>mdi-pencil</v-icon>
          </b-button>
        </router-link>

        <b-button size="sm" class="mr-1" @click="deleteUser(row.item)">
          <v-icon small>mdi-account-cancel</v-icon>
        </b-button>
      </template>
    </b-table>
    <p class="text-pagination">{{ rows }} resultados</p>
    <b-pagination
      v-model="currentPage"
      class="pagination"
      :total-rows="rows"
      per-page="20"
      @input="getUsers()"
    />
    <v-btn icon color="#55aedf" class="mr-2" small @click="selectAllRows()">
      <v-icon>mdi-select-all</v-icon>
    </v-btn>
    <v-btn icon color="#55aedf" small @click="clearSelected()">
      <v-icon>mdi-select-off</v-icon>
    </v-btn>
  </div>
</template>
<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
import eventBus from '@/eventBus'

export default {
  data: () => ({
    fields: [
      { key: 'selected', label: 'Selecionado' },
      { key: 'name', label: 'Nome', sortable: true },
      { key: 'username', label: 'Username', sortable: true },
      { key: 'user_type', label: 'Tipo de Usuário', sortable: true },
      { key: 'is_active', label: 'Ativo', sortable: true },
      { key: 'actions', label: 'Ações' },
    ],
    items: [],
    rows: 1,
    currentPage: 1,
    search: '',
    selected: [],
  }),
  created() {
    this.getList()

    eventBus.onUserListNotified(() => {
      this.getList()
    })

    eventBus.onSearchListener(search => {
      this.currentPage = 1
      this.search = search
      this.getList()
    })
  },
  methods: {
    ...mapMutations(['showSnackbar']),
    async getUsers() {
      const auth = this.$store.getters.getAuth

      try {
        const response = await axios(
          `http://localhost:3333/admusers/list-users?page=${this.currentPage}&user=${this.search}`,
          auth
        )

        this.items = [...response.data]
      } catch (err) {
        this.showSnackbar({
          text: err.response.data.error,
          color: 'error',
        })
      }
    },
    async getPagesAmount() {
      const auth = this.$store.getters.getAuth

      try {
        const response = await axios(
          `http://localhost:3333/admusers/pages-amount?user=${this.search}`,
          auth
        )

        this.rows = response.data
      } catch (err) {
        this.showSnackbar({
          text: err.response.data.error,
          color: 'error',
        })
      }
    },
    async deleteUser(item) {
      const auth = this.$store.getters.getAuth

      try {
        await axios.delete(`http://localhost:3333/admusers/${item.id}`, auth)

        this.showSnackbar({
          text: `Usuário ${item.username} foi bloqueado com sucesso`,
          color: 'success',
        })

        this.getUsers()
      } catch (err) {
        this.showSnackbar({
          text: err.response.data.error,
          color: 'error',
        })
      }
    },
    getList() {
      this.getUsers()
      this.getPagesAmount()
    },
    onRowSelected(items) {
      this.selected = items
      eventBus.setSelectedItems(this.selected)
    },
    selectAllRows() {
      this.$refs.selectableTable.selectAllRows()
    },
    clearSelected() {
      this.$refs.selectableTable.clearSelected()
    },
  },
}
</script>

<style>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 !important;
}

.text-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination .page-item.active .page-link {
  color: white;
  background-color: #454d55;
  border-color: black;
}

.pagination .page-link {
  color: #454d55;
  background-color: white;
}
</style>
