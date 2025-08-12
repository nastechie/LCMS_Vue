<template>
  <div class="p-4 space-y-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold">Classes</h2>
        <p class="text-sm text-muted-foreground">Manage class schedules</p>
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
        placeholder="Search classes..."
        class="w-full pl-10 px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>

    <!-- Classes List -->
    <div class="space-y-3">
      <div 
        v-for="classItem in filteredClasses" 
        :key="classItem.id" 
        class="rounded-lg border border-border bg-card"
      >
        <div class="p-4">
          <div class="flex gap-3">
            <div class="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <GraduationCap class="w-6 h-6 text-blue-600" />
            </div>
            
            <div class="flex-1 min-w-0 space-y-2">
              <div class="flex items-center justify-between">
                <h3 class="font-medium truncate">{{ classItem.name }}</h3>
                <div class="relative">
                  <button 
                    class="h-8 w-8 p-0 rounded-md hover:bg-accent"
                    @click="toggleDropdown(classItem.id)"
                  >
                    <MoreVertical class="h-4 w-4" />
                  </button>
                  <div 
                    v-if="activeDropdown === classItem.id" 
                    class="absolute right-0 top-full mt-1 w-32 bg-popover border border-border rounded-md shadow-lg z-10"
                  >
                    <button 
                      class="w-full text-left px-3 py-2 text-sm hover:bg-accent flex items-center"
                      @click="handleEdit(classItem)"
                    >
                      <Edit class="w-4 h-4 mr-2" />
                      Edit
                    </button>
                    <button 
                      class="w-full text-left px-3 py-2 text-sm hover:bg-accent text-destructive flex items-center"
                      @click="handleDelete(classItem)"
                    >
                      <Trash class="w-4 h-4 mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              
              <p class="text-sm text-muted-foreground">{{ classItem.courseName }}</p>
              
              <div class="flex items-center gap-1 text-sm text-muted-foreground">
                <div class="h-5 w-5 rounded-full bg-muted flex items-center justify-center">
                  <span class="text-xs font-medium">
                    {{ classItem.teacherName.split(' ').map(n => n[0]).join('') }}
                  </span>
                </div>
                <span class="truncate">{{ classItem.teacherName }}</span>
              </div>
              
              <div class="flex flex-wrap items-center gap-2">
                <div class="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar class="w-3 h-3" />
                  <span>{{ classItem.schedule }}</span>
                </div>
              </div>
              
              <div class="flex items-center gap-2">
                <div class="flex items-center gap-1 text-xs">
                  <Users class="w-3 h-3 text-muted-foreground" />
                  <span class="inline-flex items-center rounded-md border px-2 py-1 text-xs">
                    {{ classItem.enrolledStudents }}/{{ classItem.maxStudents }}
                  </span>
                </div>
                
                <span 
                  class="inline-flex items-center rounded-full px-2 py-1 text-xs"
                  :class="new Date(classItem.endDate) > new Date() 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground'"
                >
                  {{ new Date(classItem.endDate) > new Date() ? 'Active' : 'Ended' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Results count -->
    <div class="text-sm text-muted-foreground text-center py-2">
      Showing {{ filteredClasses.length }} of {{ classes.length }} classes
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Class, mockClasses } from '../lib/mock-data'
import { Search, Plus, MoreVertical, GraduationCap, Users, Calendar, Edit, Trash } from 'lucide-vue-next'

const classes = ref<Class[]>([...mockClasses])
const searchTerm = ref('')
const activeDropdown = ref<string | null>(null)

const filteredClasses = computed(() => {
  return classes.value.filter(classItem => 
    classItem.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    classItem.courseName.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    classItem.teacherName.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

const handleEdit = (classItem: Class) => {
  console.log('Edit class:', classItem)
  activeDropdown.value = null
}

const handleDelete = (classItem: Class) => {
  classes.value = classes.value.filter(c => c.id !== classItem.id)
  activeDropdown.value = null
}

const toggleDropdown = (classId: string) => {
  activeDropdown.value = activeDropdown.value === classId ? null : classId
}

// Close dropdown when clicking outside
if (typeof window !== 'undefined') {
  window.addEventListener('click', () => {
    activeDropdown.value = null
  })
}
</script>