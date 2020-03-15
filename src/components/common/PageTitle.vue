<template>
  <div class="page-title">
    <div style="display:flex">
      <img
        v-if="auxiliar !== 'fornecedor'"
        :src="loadImg()"
        width="41"
        height="41"
        class="mt-1 mr-2"
      />
      <img
        v-if="auxiliar === 'fornecedor'"
        :src="loadImg()"
        width="41"
        height="41"
        class="mb-1 mr-2"
      />
      <h1>{{ main }}</h1>
    </div>
    <h2>{{ sub }}</h2>
    <hr />
  </div>
</template>

<script>
export default {
  props: ['image', 'main', 'sub'],
  data() {
    return {
      auxiliar: '',
    }
  },
  mounted() {
    this.getAuxiliarValue()
  },
  methods: {
    loadImg() {
      if (this.image === 'centro') {
        console.log('centro')
      }
    },
    getAuxiliarValue() {
      this.auxiliar = this.image
    },
  },
}
</script>

<style>
.page-title h1 {
  margin: 0px;
}

.page-title h2 {
  color: #777;
  margin-top: 5px;
  font-size: 1.3rem;
}
</style>
