<template>
  <div class="p-4 space-y-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold">Teachers</h2>
        <p class="text-sm text-muted-foreground">Manage teacher profiles</p>
      </div>
      <button 
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3"
      >
        <Plus class="w-4 h-4 mr-1" />
        Add
      </button>
    </div>

    <!-- Search Bar -->
    <div class="relative">
      <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Search teachers..."
        class="w-full pl-10 px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>

    <!-- Teachers List -->
    <div class="space-y-3">
      <div 
        v-for="teacher in filteredTeachers" 
        :key="teacher.id" 
        class="rounded-lg border border-border bg-card"
      >
        <div class="p-4">
          <div class="flex gap-3">
            <div class="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
              <span class="text-sm font-medium">
                {{ teacher.name.split(' ').map(n => n[0]).join('').toUpperCase() }}
              </span>
            </div>
            
            <div class="flex-1 min-w-0 space-y-2">
              <div class="flex items-center justify-between">
                <h3 class="font-medium truncate">{{ teacher.name }}</h3>
                <div class="relative">
                  <button 
                    class="h-8 w-8 p-0 rounded-md hover:bg-accent"
                    @click="toggleDropdown(teacher.id)"
                  >
                    <MoreVertical class="h-4 w-4" />
                  </button>
                  <div 
                    v-if="activeDropdown === teacher.id" 
                    class="absolute right-0 top-full mt-1 w-32 bg-popover border border-border rounded-md shadow-lg z-10"
                  >
                    <button 
                      class="w-full text-left px-3 py-2 text-sm hover:bg-accent flex items-center"
                      @click="handleEdit(teacher)"
                    >
                      <Edit class="w-4 h-4 mr-2" />
                      Edit
                    </button>
                    <button 
                      class="w-full text-left px-3 py-2 text-sm hover:bg-accent text-destructive flex items-center"
                      @click="handleDelete(teacher)"
                    >
                      <Trash class="w-4 h-4 mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              
              <div class="flex items-center gap-1 text-sm text-muted-foreground">
                <Mail class="w-3 h-3" />
                <span class="truncate">{{ teacher.email }}</span>
              </div>
              
              <div class="flex items-center gap-1 text-sm text-muted-foreground">
                <Phone class="w-3 h-3" />
                <span>{{ teacher.phone }}</span>
              </div>
              
              <div class="flex items-start gap-2">
                <Tag class="w-3 h-3 text-muted-foreground mt-0.5 shrink-0" />
                <div class="flex flex-wrap gap-1">
                  <span 
                    v-for="(spec, index) in teacher.specializations" 
                    :key="index" 
                    class="inline-flex items-center rounded-full bg-secondary text-secondary-foreground px-2 py-1 text-xs"
                  >
                    {{ spec }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Results count -->
    <div class="text-sm text-muted-foreground text-center py-2">
      Showing {{ filteredTeachers.length }} of {{ teachers.length }} teachers
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Teacher } from '../lib/mock-data'
import { mockTeachers } from '../lib/mock-data'
import { Search, Plus, MoreVertical, Phone, Mail, Tag, Edit, Trash } from 'lucide-vue-next'

const teachers = ref<Teacher[]>([...mockTeachers])
const searchTerm = ref('')
const activeDropdown = ref<string | null>(null)

const filteredTeachers = computed(() => {
  return teachers.value.filter(teacher => 
    teacher.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    teacher.specializations.some(spec => spec.toLowerCase().includes(searchTerm.value.toLowerCase()))
  )
})

const handleEdit = (teacher: Teacher) => {
  console.log('Edit teacher:', teacher)
  activeDropdown.value = null
}

const handleDelete = (teacher: Teacher) => {
  teachers.value = teachers.value.filter(t => t.id !== teacher.id)
  activeDropdown.value = null
}

const toggleDropdown = (teacherId: string) => {
  activeDropdown.value = activeDropdown.value === teacherId ? null : teacherId
}

// Close dropdown when clicking outside
if (typeof window !== 'undefined') {
  window.addEventListener('click', () => {
    activeDropdown.value = null
  })
}
</script>