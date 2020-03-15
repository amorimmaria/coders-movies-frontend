<template>
  <div>
    <p
      v-if="
        !credentials ||
          !credentials.user ||
          credentials.user.user_type !== 'admin'
      "
    >
      Você não possui permissões para acessar essa página
    </p>
    <div v-else>
      <PageTitle image="fornecedor" main="Fornecedores" sub="" />

      <b-row>
        <b-col md="8" sm="12">
          <b-form-group>
            <b-input-group>
              <b-form-input
                v-model="search"
                placeholder="Pesquisar..."
                @keyup.enter="filter()"
              ></b-form-input>
              <b-input-group-append>
                <b-button class="bt-secondary-global" @click="filter()">
                  <v-icon>mdi-magnify</v-icon>
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col md="4" sm="12">
          <b-form-group>
            <router-link
              v-if="selected.length === 0"
              to="/user-creation"
              class="pull-right"
            >
              <b-button class="bt-secondary-global-lg">
                <i class="fa fa-plus-circle mr-2"></i>Cadastrar
              </b-button>
            </router-link>

            <b-button
              v-if="selected.length > 0"
              variant="danger"
              class="pull-right"
              @click="removeItemsSelecteds()"
            >
              <i class="fa fa-trash mr-2"></i>Excluir
            </b-button>
          </b-form-group>
        </b-col>
      </b-row>

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
      </b-table>
      <v-btn icon color="#55aedf" class="mr-2" small @click="selectAllRows()"
        ><v-icon>mdi-select-all</v-icon></v-btn
      >
      <v-btn icon color="#55aedf" small @click="clearSelected()"
        ><v-icon>mdi-select-off</v-icon></v-btn
      >
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import PageTitle from '../components/common/PageTitle'

export default {
  components: { PageTitle },
  data() {
    return {
      modes: ['multi', 'single', 'range'],
      fields: ['selected', 'name', 'email'],
      items: [],
      selectMode: 'multi',
      selected: [],
      search: '',
    }
  },
  computed: mapState(['drawer', 'credentials']),
  created() {
    this.getUsers()
  },
  methods: {
    async getUsers() {
      if (!this.credentials.token) return

      const token = this.credentials.token

      const config = {
        headers: { Authorization: `bearer ${token}` },
      }

      try {
        const response = await axios(
          'http://localhost:3000/admusers/list-users?page=1',
          config
        )

        this.items = [...response.data]
      } catch (err) {
        console.log(err.response.data)
      }
    },
    onRowSelected(items) {
      this.selected = items
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
