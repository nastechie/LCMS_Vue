<template>
  <div class="p-4 space-y-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold">Courses</h2>
        <p class="text-sm text-muted-foreground">Manage course offerings</p>
      </div>
      <button 
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3"
        @click="handleAdd"
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
        placeholder="Search courses..."
        class="w-full pl-10 px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>

    <!-- Courses List -->
    <div class="space-y-3">
      <div 
        v-for="course in filteredCourses" 
        :key="course.id" 
        class="rounded-lg border border-border bg-card"
      >
        <div class="p-4">
          <div class="flex gap-3">
            <div class="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <BookOpen class="w-6 h-6 text-primary" />
            </div>
            
            <div class="flex-1 min-w-0 space-y-2">
              <div class="flex items-center justify-between">
                <h3 class="font-medium truncate">{{ course.name }}</h3>
                <div class="relative">
                  <button 
                    class="h-8 w-8 p-0 rounded-md hover:bg-accent"
                    @click="toggleDropdown(course.id)"
                  >
                    <MoreVertical class="h-4 w-4" />
                  </button>
                  <div 
                    v-if="activeDropdown === course.id" 
                    class="absolute right-0 top-full mt-1 w-32 bg-popover border border-border rounded-md shadow-lg z-10"
                  >
                    <button 
                      class="w-full text-left px-3 py-2 text-sm hover:bg-accent flex items-center"
                      @click="handleEdit(course)"
                    >
                      <Edit class="w-4 h-4 mr-2" />
                      Edit
                    </button>
                    <button 
                      class="w-full text-left px-3 py-2 text-sm hover:bg-accent text-destructive flex items-center"
                      @click="handleDelete(course)"
                    >
                      <Trash class="w-4 h-4 mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              
              <p class="text-sm text-muted-foreground line-clamp-2">
                {{ course.description }}
              </p>
              
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock class="w-3 h-3" />
                  <span 
                    class="inline-flex items-center rounded-full bg-secondary text-secondary-foreground px-2 py-1 text-xs"
                  >
                    {{ course.durationMonths }} {{ course.durationMonths === 1 ? 'month' : 'months' }}
                  </span>
                </div>
                
                <div class="flex items-center gap-1 text-sm">
                  <DollarSign class="w-3 h-3 text-green-600" />
                  <span class="font-medium text-green-600">
                    ${{ course.fee.toLocaleString() }}
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
      Showing {{ filteredCourses.length }} of {{ courses.length }} courses
    </div>

    <!-- Add/Edit Dialog -->
    <div v-if="isDialogOpen" class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div class="w-full max-w-md bg-card rounded-lg border border-border shadow-lg">
        <div class="p-6">
          <div class="mb-4">
            <h3 class="text-lg font-semibold">
              {{ editingCourse ? 'Edit Course' : 'Add New Course' }}
            </h3>
            <p class="text-sm text-muted-foreground">
              {{ editingCourse 
                ? 'Update course information below.' 
                : 'Enter the course details below.'
              }}
            </p>
          </div>
          
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="space-y-2">
              <label for="name" class="text-sm font-medium">Course Name</label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                required
                class="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            
            <div class="space-y-2">
              <label for="description" class="text-sm font-medium">Description</label>
              <textarea
                id="description"
                v-model="formData.description"
                required
                rows="3"
                class="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              ></textarea>
            </div>
            
            <div class="space-y-2">
              <label for="durationMonths" class="text-sm font-medium">Duration (months)</label>
              <input
                id="durationMonths"
                v-model.number="formData.durationMonths"
                type="number"
                min="1"
                max="24"
                required
                class="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            
            <div class="space-y-2">
              <label for="fee" class="text-sm font-medium">Course Fee ($)</label>
              <input
                id="fee"
                v-model.number="formData.fee"
                type="number"
                min="0"
                step="50"
                required
                class="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            
            <div class="flex gap-2 pt-4">
              <button 
                type="button" 
                class="flex-1 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                @click="isDialogOpen = false"
              >
                Cancel
              </button>
              <button 
                type="submit"
                class="flex-1 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors"
              >
                {{ editingCourse ? 'Update' : 'Add' }} Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { Course, mockCourses } from '../lib/mock-data'
import { Search, Plus, MoreVertical, BookOpen, Clock, DollarSign, Edit, Trash } from 'lucide-vue-next'

const courses = ref<Course[]>([...mockCourses])
const isDialogOpen = ref(false)
const editingCourse = ref<Course | null>(null)
const searchTerm = ref('')
const activeDropdown = ref<string | null>(null)

const formData = reactive<Partial<Course>>({
  name: '',
  description: '',
  durationMonths: 0,
  fee: 0,
})

const filteredCourses = computed(() => {
  return courses.value.filter(course => 
    course.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

const handleAdd = () => {
  editingCourse.value = null
  Object.assign(formData, {
    name: '',
    description: '',
    durationMonths: 0,
    fee: 0,
  })
  isDialogOpen.value = true
}

const handleEdit = (course: Course) => {
  editingCourse.value = course
  Object.assign(formData, course)
  isDialogOpen.value = true
  activeDropdown.value = null
}

const handleDelete = (course: Course) => {
  courses.value = courses.value.filter(c => c.id !== course.id)
  activeDropdown.value = null
}

const handleSubmit = () => {
  if (editingCourse.value) {
    const index = courses.value.findIndex(c => c.id === editingCourse.value!.id)
    if (index !== -1) {
      courses.value[index] = { ...editingCourse.value, ...formData }
    }
  } else {
    const newCourse: Course = {
      id: Date.now().toString(),
      ...formData as Course,
    }
    courses.value.push(newCourse)
  }
  
  isDialogOpen.value = false
}

const toggleDropdown = (courseId: string) => {
  activeDropdown.value = activeDropdown.value === courseId ? null : courseId
}

// Close dropdown when clicking outside
if (typeof window !== 'undefined') {
  window.addEventListener('click', () => {
    activeDropdown.value = null
  })
}
</script>