<template>
  <header class="bg-card border-b border-border px-4 py-3 sticky top-0 z-50">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <h1 class="font-semibold text-lg text-primary">LCMS</h1>
      </div>
      
      <div class="flex items-center gap-2">
        <!-- Search Sheet for Mobile -->
        <button 
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
          @click="showSearchSheet = true"
        >
          <Search class="w-4 h-4" />
        </button>

        <!-- Notifications -->
        <div class="relative">
          <button 
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 relative"
            @click="showNotifications = !showNotifications"
          >
            <Bell class="w-4 h-4" />
            <span class="absolute -top-1 -right-1 text-xs w-4 h-4 rounded-full p-0 flex items-center justify-center bg-destructive text-destructive-foreground">
              3
            </span>
          </button>
          
          <!-- Notifications Dropdown -->
          <div v-if="showNotifications" class="absolute right-0 top-full mt-2 w-80 max-w-[90vw] bg-popover border border-border rounded-md shadow-lg z-50">
            <div class="p-3 font-medium border-b border-border">Notifications</div>
            <div class="p-3 flex flex-col items-start gap-1">
              <div class="text-sm font-medium">Payment Overdue</div>
              <div class="text-xs text-muted-foreground">David Wilson has an overdue payment</div>
            </div>
            <div class="p-3 flex flex-col items-start gap-1 border-t border-border">
              <div class="text-sm font-medium">Class Full</div>
              <div class="text-xs text-muted-foreground">IELTS class approaching capacity</div>
            </div>
            <div class="p-3 flex flex-col items-start gap-1 border-t border-border">
              <div class="text-sm font-medium">New Enrollment</div>
              <div class="text-xs text-muted-foreground">New student in General English A1</div>
            </div>
          </div>
        </div>

        <!-- User Profile Menu -->
        <div class="relative">
          <button 
            class="relative h-8 w-8 rounded-full bg-muted flex items-center justify-center"
            @click="showProfileMenu = !showProfileMenu"
          >
            <span class="text-sm font-medium">SA</span>
          </button>
          
          <!-- Profile Dropdown -->
          <div v-if="showProfileMenu" class="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-md shadow-lg z-50">
            <div class="p-3 font-normal border-b border-border">
              <div class="flex flex-col space-y-1">
                <p class="text-sm font-medium leading-none">Admin</p>
                <p class="text-xs leading-none text-muted-foreground">admin@lcms.edu</p>
              </div>
            </div>
            <div class="py-1">
              <button class="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground flex items-center">
                <User class="mr-2 h-4 w-4" />
                <span>Profile</span>
              </button>
              <button class="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground flex items-center">
                <Settings class="mr-2 h-4 w-4" />
                <span>Settings</span>
              </button>
            </div>
            <div class="border-t border-border py-1">
              <button class="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground flex items-center">
                <LogOut class="mr-2 h-4 w-4" />
                <span>Log out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Sheet -->
    <div v-if="showSearchSheet" class="fixed inset-0 z-50 bg-black/50" @click="showSearchSheet = false">
      <div class="fixed top-0 left-0 right-0 bg-card border-b border-border p-4" @click.stop>
        <h3 class="text-lg font-semibold mb-4">Search</h3>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search students, courses, classes..."
          class="w-full px-3 py-2 bg-input-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          @input="handleSearch"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search, Bell, User, Settings, LogOut } from 'lucide-vue-next'

interface Props {
  onSearch?: (query: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  onSearch: undefined
})

const showSearchSheet = ref(false)
const showNotifications = ref(false)
const showProfileMenu = ref(false)
const searchQuery = ref('')

const handleSearch = () => {
  if (props.onSearch) {
    props.onSearch(searchQuery.value)
  }
}

// Close dropdowns when clicking outside
const closeDropdowns = () => {
  showNotifications.value = false
  showProfileMenu.value = false
}

// Add event listener for clicking outside
if (typeof window !== 'undefined') {
  window.addEventListener('click', closeDropdowns)
}
</script>