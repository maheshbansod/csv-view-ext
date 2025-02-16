<script setup lang="ts">
import CsvViewer from './components/CsvViewer.vue';
import CsvUrlInput from './components/CsvUrlInput.vue';
import { ref, onMounted, watch } from 'vue';

const currentUrl = ref(window.location.hash.slice(1));
const csvData = ref('');
const isLoading = ref(true);

const loadCsv = async (url: string) => {
  if (!url) {
    isLoading.value = false;
    csvData.value = '';
    document.title = 'CSV Viewer';
    return;
  }

  isLoading.value = true;
  csvData.value = '';

  // Extract filename from URL and set page title
  const filename = decodeURIComponent(url.split('/').pop() || 'CSV Viewer');
  document.title = filename;

  try {
    const response = await fetch(url);
    const data = await response.text();
    csvData.value = data;
  } catch (error) {
    console.error('Failed to load CSV:', error);
  } finally {
    isLoading.value = false;
  }
};

// Watch for hash changes
window.addEventListener('hashchange', () => {
  currentUrl.value = window.location.hash.slice(1);
});

// Watch for URL changes and load CSV
watch(currentUrl, (newUrl) => {
  loadCsv(newUrl);
});

onMounted(() => {
  loadCsv(currentUrl.value);
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
      
      <template v-else>
        <CsvUrlInput v-if="!currentUrl" />
        <CsvViewer v-else-if="csvData" :csvData="csvData" :csvUrl="currentUrl" />
        <div v-else class="flex items-center justify-center min-h-screen">
          <div class="text-center p-6 bg-white rounded-lg shadow-lg">
            <div class="text-red-500 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900">Failed to load CSV</h3>
            <p class="mt-2 text-sm text-gray-500">There was an error loading the CSV file. Please check the URL and try again.</p>
            <button 
              @click="currentUrl = ''" 
              class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </template>
    </div>

    <footer class="py-4 px-6 text-center text-sm bg-white border-t border-gray-200 shadow-sm">
      <p class="text-gray-700">
        Built with 
        <a href="https://vuejs.org/" 
           class="text-red-500 hover:text-red-600 transition-colors"
           target="_blank" 
           rel="noopener noreferrer">❤️</a> 
        by 
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
