<script setup lang="ts">
const csvUrl = window.location.hash.slice(1);
</script>

<template>
  <div class="stylalala">
    I'll show u the csv file at {{ csvUrl }}
  </div>
</template>

<style scoped>
.stylalala {
  color: red;
}
</style>
