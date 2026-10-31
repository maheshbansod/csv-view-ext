<script setup lang="ts">
import { ref } from 'vue';

const userUrl = ref('');

const openCsvViewer = () => {
  if (userUrl.value) {
    const extUrl = chrome.runtime.getURL("/index.html");
    window.open(`${extUrl}#${userUrl.value}`, '_blank');
    userUrl.value = ''; // Reset the input
  }
};
</script>

<template>
  <div class="min-h-[200px] w-[300px] bg-surface p-4 flex flex-col">
    <div class="text-center mb-4">
      <h1 class="text-2xl font-bold text-fg mb-2">📊 CSV Viewer</h1>
      <p class="text-sm text-muted mb-1">Found a CSV that we missed?</p>
      <p class="text-xs text-muted">Paste any URL that returns CSV data, even if it doesn't end with .csv!</p>
    </div>

    <form @submit.prevent="openCsvViewer" class="flex-grow flex flex-col">
      <input
        v-model="userUrl"
        type="url"
        placeholder="https://example.com/data.csv"
        class="w-full px-4 py-2 rounded-lg border border-line-strong bg-surface-raised text-fg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
        required
      />
      
      <button
        type="submit"
        class="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
      >
        <span>View CSV</span>
        <span>✨</span>
      </button>
    </form>

    <footer class="mt-4 text-center text-xs text-muted">
      Made with 💖 by <a href="https://maheshbansod.com" class="underline" target="_blank">Mahesh Bansod</a>
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
