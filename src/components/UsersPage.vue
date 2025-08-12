<template>
  <div class="p-4 space-y-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold">Users</h2>
        <p class="text-sm text-muted-foreground">Manage user accounts</p>
      </div>
      <button 
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3"
      >
        <Plus class="w-4 h-4 mr-1" />
        Add
      </button>
    </div>

    <!-- Search and Filter -->
    <div class="space-y-3">
      <div class="relative">
        <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Search users..."
          class="w-full pl-10 px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      
      <div class="flex gap-2">
        <select 
          v-model="roleFilter"
          class="w-32 px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="all">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Teacher">Teacher</option>
          <option value="Student">Student</option>
        </select>
      </div>
    </div>

    <!-- Users List -->
    <div class="space-y-3">
      <div 
        v-for="user in filteredUsers" 
        :key="user.id" 
        class="rounded-lg border border-border bg-card"
      >
        <div class="p-4">
          <div class="flex gap-3">
            <div class="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <component :is="getRoleIcon(user.role)" class="w-6 h-6 text-purple-600" />
            </div>
            
            <div class="flex-1 min-w-0 space-y-2">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                    <span class="text-xs font-medium">
                      {{ user.profileName.split(' ').map(n => n[0]).join('') }}
                    </span>
                  </div>
                  <h3 class="font-medium truncate">{{ user.profileName }}</h3>
                </div>
                <div class="relative">
                  <button 
                    class="h-8 w-8 p-0 rounded-md hover:bg-accent"
                    @click="toggleDropdown(user.id)"
                  >
                    <MoreVertical class="h-4 w-4" />
                  </button>
                  <div 
                    v-if="activeDropdown === user.id" 
                    class="absolute right-0 top-full mt-1 w-32 bg-popover border border-border rounded-md shadow-lg z-10"
                  >
                    <button 
                      class="w-full text-left px-3 py-2 text-sm hover:bg-accent flex items-center"
                      @click="handleEdit(user)"
                    >
                      <Edit class="w-4 h-4 mr-2" />
                      Edit
                    </button>
                    <button 
                      class="w-full text-left px-3 py-2 text-sm hover:bg-accent text-destructive flex items-center"
                      @click="handleDelete(user)"
                    >
                      <Trash class="w-4 h-4 mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              
              <p class="text-sm text-muted-foreground truncate">{{ user.email }}</p>
              
              <div class="flex items-center gap-2">
                <span 
                  class="inline-flex items-center rounded-full px-2 py-1 text-xs"
                  :class="getRoleBadgeClass(user.role)"
                >
                  {{ user.role }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Results count -->
    <div class="text-sm text-muted-foreground text-center py-2">
      Showing {{ filteredUsers.length }} of {{ users.length }} users
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { User, mockUsers } from '../lib/mock-data'
import { Search, Plus, MoreVertical, Shield, User as UserIcon, Edit, Trash } from 'lucide-vue-next'

const users = ref<User[]>([...mockUsers])
const searchTerm = ref('')
const roleFilter = ref('all')
const activeDropdown = ref<string | null>(null)

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      user.profileName.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesRole = roleFilter.value === 'all' || user.role === roleFilter.value
    return matchesSearch && matchesRole
  })
})

const getRoleIcon = (role: string) => {
  switch (role) {
    case 'Admin': 
      return Shield
    case 'Teacher': 
      return UserIcon
    case 'Student': 
      return UserIcon
    default: 
      return UserIcon
  }
}

const getRoleBadgeClass = (role: string) => {
  switch (role) {
    case 'Admin': 
      return 'bg-destructive text-destructive-foreground'
    case 'Teacher': 
      return 'bg-primary text-primary-foreground'
    case 'Student': 
      return 'bg-secondary text-secondary-foreground'
    default: 
      return 'bg-secondary text-secondary-foreground'
  }
}

const handleEdit = (user: User) => {
  console.log('Edit user:', user)
  activeDropdown.value = null
}

const handleDelete = (user: User) => {
  users.value = users.value.filter(u => u.id !== user.id)
  activeDropdown.value = null
}

const toggleDropdown = (userId: string) => {
  activeDropdown.value = activeDropdown.value === userId ? null : userId
}

// Close dropdown when clicking outside
if (typeof window !== 'undefined') {
  window.addEventListener('click', () => {
    activeDropdown.value = null
  })
}
</script>