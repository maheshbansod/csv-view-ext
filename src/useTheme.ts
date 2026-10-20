import { ref } from 'vue'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

const readStored = (): Theme | null => {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

// Without a stored choice there is no data-theme attribute and the CSS follows the OS.
const stored = readStored()
if (stored) document.documentElement.dataset.theme = stored

// Effective theme, used to pick the toggle icon
const theme = ref<Theme>(stored ?? (mediaQuery.matches ? 'dark' : 'light'))

// Keep following the OS until the user has made an explicit choice
mediaQuery.addEventListener('change', (event) => {
  if (!readStored()) theme.value = event.matches ? 'dark' : 'light'
})

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.dataset.theme = theme.value
  try {
    localStorage.setItem(STORAGE_KEY, theme.value)
  } catch {
    // storage unavailable (private mode etc.): the choice just won't persist
  }
}

export const useTheme = () => ({ theme, toggleTheme })
