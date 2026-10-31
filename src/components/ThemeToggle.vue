<script setup lang="ts">
import { computed } from 'vue'
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '../useTheme'

const { preference, nextPreference, cycleTheme } = useTheme()

const LABELS = { light: 'Light', dark: 'Dark', system: 'System' } as const
const label = computed(
  () => `Theme: ${LABELS[preference.value]}. Switch to ${LABELS[nextPreference.value]}`,
)
</script>

<template>
  <button
    type="button"
    @click="cycleTheme"
    class="h-9 inline-flex items-center px-3 py-2 bg-control text-fg rounded-lg hover:bg-control-hover focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
    :title="label"
    :aria-label="label"
  >
    <SunIcon v-if="preference === 'light'" class="h-6 w-6" />
    <MoonIcon v-else-if="preference === 'dark'" class="h-6 w-6" />
    <ComputerDesktopIcon v-else class="h-6 w-6" />
  </button>
</template>
