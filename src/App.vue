<script setup lang="ts">
import CsvViewer from './components/CsvViewer.vue';
import { ref, onMounted } from 'vue';

const csvUrl = window.location.hash.slice(1);
const csvData = ref('');
const isLoading = ref(true);

onMounted(() => {
  // Extract filename from URL and set page title
  const filename = decodeURIComponent(csvUrl.split('/').pop() || 'CSV Viewer');
  document.title = filename;

  fetch(csvUrl)
    .then(response => response.text())
    .then(data => {
      csvData.value = data;
      isLoading.value = false;
    })
    .catch(() => {
      isLoading.value = false;
    });
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <div class="flex-grow">
      <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
          <p class="mt-4 text-gray-600">Loading CSV data...</p>
        </div>
      </div>
      
      <CsvViewer v-else-if="csvData" :csvData="csvData" :csvUrl="csvUrl" />
      
      <div v-else class="flex items-center justify-center min-h-screen">
        <div class="text-center p-6 bg-white rounded-lg shadow-lg">
          <div class="text-red-500 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900">Failed to load CSV</h3>
          <p class="mt-2 text-sm text-gray-500">There was an error loading the CSV file. Please check the URL and try again.</p>
        </div>
      </div>
    </div>

    <footer class="py-4 px-6 text-center text-sm bg-white border-t border-gray-200 shadow-sm">
      <p class="text-gray-700">
        Built with ❤️ by 
        <a href="https://maheshbansod.com" 
           class="font-medium text-blue-600 hover:text-blue-800 transition-colors" 
           target="_blank" 
           rel="noopener noreferrer">Mahesh Bansod</a> 
        • 
        <a href="https://github.com/maheshbansod/csv-view-ext" 
           class="font-medium text-blue-600 hover:text-blue-800 transition-colors" 
           target="_blank" 
           rel="noopener noreferrer">View on GitHub</a>
      </p>
    </footer>
  </div>
</template>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
