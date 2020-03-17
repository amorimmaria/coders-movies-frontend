<template>
  <b-col md="8" sm="12">
    <b-form-group>
      <b-input-group>
        <b-form-input
          v-model.trim="search"
          placeholder="Pesquisar por usuário..."
          @keyup="filter()"
        />
        <b-input-group-append>
          <b-button class="bt-secondary-global" @click="filter()">
            <v-icon>mdi-magnify</v-icon>
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form-group>
  </b-col>
</template>
<script>
import eventBus from '@/eventBus'
export default {
  data: () => ({
    search: '',
  }),
  methods: {
    filter() {
      eventBus.notifySearch(this.search)
    },
  },
}
</script>
