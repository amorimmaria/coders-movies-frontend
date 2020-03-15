<template>
  <div>
    <b-form-group label="Selection mode:" label-cols-md="4">
      <b-form-select
        v-model="selectMode"
        :options="modes"
        class="mb-3"
      ></b-form-select>
    </b-form-group>

    <b-table
      ref="selectableTable"
      selectable
      :select-mode="selectMode"
      :items="items"
      :fields="fields"
      responsive="sm"
      class="tabela"
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
    <p>
      <b-button size="sm" @click="selectAllRows">Select all</b-button>
      <b-button size="sm" @click="clearSelected">Clear selected</b-button>
      <b-button size="sm" @click="selectThirdRow">Select 3rd row</b-button>
      <b-button size="sm" @click="unselectThirdRow">Unselect 3rd row</b-button>
    </p>
    <p>
      Selected Rows:<br />
      {{ selected }}
    </p>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      modes: ['multi', 'single', 'range'],
      fields: ['selected', 'name', 'email'],
      items: [],
      selectMode: 'multi',
      selected: [],
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
    selectThirdRow() {
      // Rows are indexed from 0, so the third row is index 2
      this.$refs.selectableTable.selectRow(2)
    },
    unselectThirdRow() {
      // Rows are indexed from 0, so the third row is index 2
      this.$refs.selectableTable.unselectRow(2)
    },
  },
}
</script>
<style>
.tabela {
  background-color: rgb(54, 54, 54);
  color: white;
}
</style>
