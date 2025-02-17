<script setup lang="ts">
import { ref } from 'vue';
import { chromeExtensionUrl, firefoxExtensionUrl, extensionUrl } from '../consts';

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
  <div class="max-w-4xl mx-auto p-6">
    <!-- Input Section -->
    <div class="bg-white rounded-lg shadow-lg p-6 mb-12">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">CSV Viewer</h2>

      <!-- Warning Banner -->
      <div class="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-amber-700">
              <strong class="font-medium">Limited Functionality:</strong> This web viewer only works with CORS-enabled URLs.
              <a :href="extensionUrl" class="font-medium underline hover:text-amber-800">
                Use our Browser Extension
              </a>
              for unlimited access to any CSV file!
            </p>
          </div>
        </div>
      </div>

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

    <!-- Marketing Section -->
    <div class="space-y-16">
      <!-- Key Features Section -->
      <div class="text-center">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">
          Why Use The Browser Extension?
        </h3>
        <p class="text-lg text-gray-600 mb-8">
          No more CORS issues, no downloads needed - just instant CSV viewing right in your browser!
        </p>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <h4 class="text-xl font-semibold mb-2">Auto-Intercept</h4>
            <p class="text-gray-600">Automatically catches CSV file requests - no manual URL entry needed</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 class="text-xl font-semibold mb-2">CORS-Free</h4>
            <p class="text-gray-600">Access any CSV file without CORS restrictions</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h4 class="text-xl font-semibold mb-2">100% Private</h4>
            <p class="text-gray-600">All processing happens locally - no external servers</p>
          </div>
        </div>
      </div>

      <!-- How It Works Section -->
      <div class="bg-gray-50 rounded-xl p-8">
        <h3 class="text-2xl font-bold text-center mb-8">How It Works</h3>
        <div class="grid md:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span class="text-blue-600 font-bold">1</span>
            </div>
            <p class="text-gray-600">Click any CSV link</p>
          </div>
          <div class="text-center">
            <div class="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span class="text-blue-600 font-bold">2</span>
            </div>
            <p class="text-gray-600">Extension intercepts automatically</p>
          </div>
          <div class="text-center">
            <div class="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span class="text-blue-600 font-bold">3</span>
            </div>
            <p class="text-gray-600">View & analyze instantly</p>
          </div>
          <div class="text-center">
            <div class="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span class="text-blue-600 font-bold">4</span>
            </div>
            <p class="text-gray-600">Download if needed</p>
          </div>
        </div>
      </div>

      <!-- Features Comparison -->
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h3 class="text-2xl font-bold text-center mb-8">Extension vs. Web Viewer</h3>
        <div class="grid md:grid-cols-2 gap-8">
          <div class="border-r border-gray-200 pr-8">
            <h4 class="text-xl font-semibold text-blue-600 mb-4">Web Viewer (This Page)</h4>
            <ul class="space-y-3 text-gray-600">
              <li class="flex items-center">
                <svg class="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Basic CSV viewing capabilities
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Requires CORS-enabled URLs
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Manual URL entry needed
              </li>
            </ul>
          </div>
          <div class="pl-8">
            <h4 class="text-xl font-semibold text-green-600 mb-4">Browser Extension 🚀</h4>
            <ul class="space-y-3 text-gray-600">
              <li class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Works with any CSV URL
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Automatic request interception
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                No CORS limitations
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Install CTA -->
      <div class="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-center text-white">
        <h3 class="text-2xl font-bold mb-4" id="install-heading">Get the Full Experience</h3>
        <p class="text-lg mb-6">
          Install our extension to unlock unlimited CSV viewing capabilities
        </p>
        <a
          :href="chromeExtensionUrl"
          target="_blank"
          class="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Install for Chrome
        </a>
        <a
          :href="firefoxExtensionUrl"
          target="_blank"
          class="inline-flex items-center mx-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Install for Firefox
        </a>
      </div>
    </div>
  </div>
</template>
