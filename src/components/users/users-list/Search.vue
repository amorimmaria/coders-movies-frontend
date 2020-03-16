<template>
  <b-col md="8" sm="12">
    <b-form-group>
      <b-input-group>
        <b-form-input
          v-model.trim="search"
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
</template>
<script>
export default {
  data: () => ({
    search: '',
  }),
}
</script>
