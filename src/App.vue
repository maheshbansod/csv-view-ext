<script setup lang="ts">
import CsvViewer from './components/CsvViewer.vue';
import { ref, onMounted } from 'vue';

const csvUrl = window.location.hash.slice(1);
const csvData = ref('');

onMounted(() => {
  fetch(csvUrl)
    .then(response => response.text())
    .then(data => csvData.value = data);
});
</script>

<template>
  <CsvViewer v-if="csvData" :csvData="csvData" />
</template>

<style scoped>
</style>
