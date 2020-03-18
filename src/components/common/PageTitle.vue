<template>
  <div class="page-title">
    <div class="main-info">
      <v-icon size="40" class="mr-2">{{ icon }}</v-icon>
      <h1>{{ main }}</h1>
    </div>
    <h2>{{ sub }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    icon: { type: String, default: '' },
    main: { type: String, default: '' },
    sub: { type: String, default: '' },
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

.main-info {
  display: flex;
  align-items: center;
}
</style>
