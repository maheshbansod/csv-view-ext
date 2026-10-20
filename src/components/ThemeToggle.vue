<script setup lang="ts">
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '../useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <button
    type="button"
    @click="toggleTheme"
    class="inline-flex items-center px-3 py-2 bg-control text-fg rounded-lg hover:bg-control-hover focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
    :title="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
    :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <SunIcon v-if="theme === 'dark'" class="h-6 w-6" />
    <MoonIcon v-else class="h-6 w-6" />
  </button>
</template>
