<template>
  <div class="w-full bg-white shadow-lg rounded-lg overflow-hidden">
    <!-- Search Bar -->
    <div class="p-4 border-b border-gray-200 bg-gray-50">
      <div class="flex items-center justify-between">
        <div class="relative flex-1 mr-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search in CSV..."
            class="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <MagnifyingGlassIcon class="h-5 w-5 text-gray-400 absolute right-3 top-2.5" />
        </div>
        <div class="flex space-x-2">
          <button
            v-if="props.csvUrl"
            @click="copyUrl"
            class="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            title="Copy CSV URL"
          >
            <LinkIcon class="h-5 w-5 mr-2" />
            Copy URL
          </button>
          <button
            @click="downloadCurrentView"
            class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <ArrowDownTrayIcon class="h-5 w-5 mr-2" />
            Download CSV
          </button>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="(header, index) in headers"
              :key="index"
              scope="col"
              class="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              @click="sortByColumn(index)"
            >
              <div class="flex items-center space-x-1">
                <span>{{ header }}</span>
                <div class="flex flex-col">
                  <ChevronUpIcon
                    :class="[
                      'w-4 h-4',
                      sortColumn === index && sortDirection === 'asc'
                        ? 'text-blue-500'
                        : 'text-gray-400',
                    ]"
                  />
                  <ChevronDownIcon
                    :class="[
                      'w-4 h-4 -mt-1',
                      sortColumn === index && sortDirection === 'desc'
                        ? 'text-blue-500'
                        : 'text-gray-400',
                    ]"
                  />
                </div>
                <XMarkIcon
                  v-if="sortColumn === index"
                  @click.stop="clearSort"
                  class="w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer"
                  title="Clear sort"
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="(row, rowIndex) in paginatedData"
            :key="rowIndex"
            class="hover:bg-gray-50"
          >
            <td
              v-for="(cell, cellIndex) in row"
              :key="cellIndex"
              class="px-6 py-4 text-sm text-gray-900 group relative"
            >
              <div class="flex items-center space-x-2">
                <div 
                  class="max-w-xs truncate cursor-pointer"
                  @click="openModal(cell)"
                >
                  {{ cell }}
                </div>
                <button
                  @click.stop="copyToClipboard(cell)"
                  class="opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Copy content"
                >
                  <DocumentDuplicateIcon class="h-4 w-4 text-gray-500 hover:text-blue-500" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex items-center justify-center space-x-2 mt-4 mb-4">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
      >
        Previous
      </button>
      
      <div class="flex items-center space-x-1">
        <button
          v-for="page in displayedPages"
          :key="page"
          @click="goToPage(page)"
          :class="[
            'px-3 py-2 rounded-lg',
            currentPage === page
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          ]"
        >
          {{ page }}
        </button>
      </div>

      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
      >
        Next
      </button>
    </div>

    <!-- Empty State -->
    <div
      v-if="paginatedData.length === 0"
      class="text-center py-12 px-4 bg-gray-50"
    >
      <DocumentIcon class="mx-auto h-12 w-12 text-gray-400" />
      <h3 class="mt-2 text-sm font-medium text-gray-900">No results found</h3>
      <p class="mt-1 text-sm text-gray-500">
        Try adjusting your search query to find what you're looking for.
      </p>
    </div>

    <!-- Full Content Modal -->
    <TransitionRoot appear :show="isModalOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 mb-4">
                  Cell Content
                </DialogTitle>
                <div class="mt-2">
                  <div class="bg-gray-50 rounded-lg p-4 relative">
                    <pre class="text-sm text-gray-700 whitespace-pre-wrap break-words">{{ selectedCellContent }}</pre>
                    <button
                      @click="copyToClipboard(selectedCellContent)"
                      class="absolute top-2 right-2"
                      title="Copy content"
                    >
                      <DocumentDuplicateIcon class="h-5 w-5 text-gray-500 hover:text-blue-500" />
                    </button>
                  </div>
                </div>

                <div class="mt-4">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="closeModal"
                  >
                    Close
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Papa from 'papaparse'
import {
  MagnifyingGlassIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  DocumentIcon,
  DocumentDuplicateIcon,
  XMarkIcon,
  ArrowDownTrayIcon,
  LinkIcon,
} from '@heroicons/vue/24/outline'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

interface Props {
  csvData: string
  csvUrl?: string
}

const props = defineProps<Props>()

// State
const parsedData = ref<string[][]>([])
const headers = ref<string[]>([])
const searchQuery = ref('')
const sortColumn = ref<number | null>(null)
const sortDirection = ref<'asc' | 'desc'>('asc')
const isModalOpen = ref(false)
const selectedCellContent = ref('')

// Pagination state
const currentPage = ref(1)
const itemsPerPage = ref(50)

// Parse CSV data
watch(
  () => props.csvData,
  (newData) => {
    if (newData) {
      const result = Papa.parse(newData, {
        skipEmptyLines: true,
      })
      
      if (result.data.length > 0) {
        headers.value = result.data[0] as string[]
        parsedData.value = result.data.slice(1) as string[][]
      }
    }
  },
  { immediate: true }
)

// Sorting logic
const sortByColumn = (columnIndex: number) => {
  if (sortColumn.value === columnIndex) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = columnIndex
    sortDirection.value = 'asc'
  }
}

const clearSort = () => {
  sortColumn.value = null
  sortDirection.value = 'asc'
}

// Computed properties for filtered and sorted data
const filteredAndSortedData = computed(() => {
  let result = [...parsedData.value]

  // Filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter((row) =>
      row.some((cell) => cell.toLowerCase().includes(query))
    )
  }

  // Sort
  if (sortColumn.value !== null) {
    result.sort((a, b) => {
      const aVal = a[sortColumn.value!]
      const bVal = b[sortColumn.value!]
      
      // Check if the values are numbers
      const aNum = Number(aVal)
      const bNum = Number(bVal)
      
      let comparison
      if (!isNaN(aNum) && !isNaN(bNum)) {
        comparison = aNum - bNum
      } else {
        comparison = aVal.localeCompare(bVal)
      }
      
      return sortDirection.value === 'asc' ? comparison : -comparison
    })
  }

  return result
})

// Pagination computed properties
const totalPages = computed(() => Math.ceil(filteredAndSortedData.value.length / itemsPerPage.value))
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredAndSortedData.value.slice(start, end)
})

// Add displayed pages computation
const displayedPages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const pages: number[] = []
  
  if (total <= 7) {
    // Show all pages if 7 or fewer
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Always show first page
    pages.push(1)
    
    if (current > 3) {
      pages.push(-1) // Separator
    }
    
    // Show pages around current page
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
      pages.push(i)
    }
    
    if (current < total - 2) {
      pages.push(-1) // Separator
    }
    
    // Always show last page
    pages.push(total)
  }
  
  return pages
})

// Pagination methods
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

//@ts-ignore
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// Reset pagination when search query changes
watch(searchQuery, () => {
  currentPage.value = 1
})

// Modal functions
const openModal = (content: string) => {
  selectedCellContent.value = content
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

// Copy function
const copyToClipboard = async (content: string) => {
  try {
    await navigator.clipboard.writeText(content)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}

// Download functionality
const downloadCurrentView = () => {
  const dataToDownload = [headers.value, ...filteredAndSortedData.value]
  const csv = Papa.unparse(dataToDownload)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  
  // Get filename from URL or use default
  let filename = 'exported_data.csv'
  if (props.csvUrl) {
    const urlParts = props.csvUrl.split('/')
    const lastPart = urlParts[urlParts.length - 1]
    if (lastPart.includes('.csv')) {
      filename = lastPart
    } else {
      filename = lastPart + '.csv'
    }
  }
  
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url) // Clean up the URL object
}

// Copy URL functionality
const copyUrl = async () => {
  if (props.csvUrl) {
    await navigator.clipboard.writeText(props.csvUrl)
  }
}
</script>
