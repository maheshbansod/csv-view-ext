import { computed, ref } from 'vue'

type Theme = 'light' | 'dark'
export type ThemePreference = Theme | 'system'

const STORAGE_KEY = 'theme'
const ORDER: ThemePreference[] = ['light', 'dark', 'system']
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

const readStored = (): Theme | null => {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

// What the user picked. 'system' means: no data-theme attribute, no stored value, the CSS follows the OS.
const preference = ref<ThemePreference>(readStored() ?? 'system')
const systemTheme = ref<Theme>(mediaQuery.matches ? 'dark' : 'light')

// Effective theme, derived, so OS changes need no extra bookkeeping
const theme = computed<Theme>(() =>
  preference.value === 'system' ? systemTheme.value : preference.value,
)
const nextPreference = computed(
  () => ORDER[(ORDER.indexOf(preference.value) + 1) % ORDER.length],
)

const applyAttribute = (value: ThemePreference) => {
  if (value === 'system') delete document.documentElement.dataset.theme
  else document.documentElement.dataset.theme = value
}
applyAttribute(preference.value)

mediaQuery.addEventListener('change', (event) => {
  systemTheme.value = event.matches ? 'dark' : 'light'
})

// Other tabs: the event fires only in tabs that did not write. key is null when storage was cleared.
window.addEventListener('storage', (event) => {
  if (event.key !== STORAGE_KEY && event.key !== null) return
  preference.value = readStored() ?? 'system'
  applyAttribute(preference.value)
})

const cycleTheme = () => {
  preference.value = nextPreference.value
  applyAttribute(preference.value)
  try {
    if (preference.value === 'system') localStorage.removeItem(STORAGE_KEY)
    else localStorage.setItem(STORAGE_KEY, preference.value)
  } catch {
    // storage unavailable (private mode etc.): the choice just won't persist
  }
}

export const useTheme = () => ({ theme, preference, nextPreference, cycleTheme })
