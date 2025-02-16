<script setup lang="ts">
import { ref } from 'vue';

const csvUrl = ref('');
const error = ref('');

const handleSubmit = () => {
  try {
    // Basic URL validation
    new URL(csvUrl.value);
    error.value = '';
    // Redirect to the CSV viewer with the URL in hash
    window.location.hash = csvUrl.value;
  } catch {
    error.value = 'Please enter a valid URL';
  }
};
</script>

<template>
  <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
    <h2 class="text-2xl font-semibold text-gray-800 mb-6">CSV Viewer</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="csvUrl" class="block text-sm font-medium text-gray-700 mb-2">
          Enter CSV URL
        </label>
        <input
          id="csvUrl"
          v-model="csvUrl"
          type="text"
          placeholder="https://example.com/data.csv"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          :class="{ 'border-red-500': error }"
        />
        <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
      </div>
      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        View CSV
      </button>
    </form>
  </div>
</template> 