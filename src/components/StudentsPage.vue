<template>
  <div class="p-4 space-y-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold">Students</h2>
        <p class="text-sm text-muted-foreground">Manage student profiles</p>
      </div>
      <button 
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3"
        @click="handleAdd"
      >
        <Plus class="w-4 h-4 mr-1" />
        Add
      </button>
    </div>

    <!-- Search and Filter Bar -->
    <div class="space-y-3">
      <div class="relative">
        <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Search students..."
          class="w-full pl-10 px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      
      <div class="flex gap-2">
        <select 
          v-model="genderFilter"
          class="w-32 px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="all">All Gender</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
        </select>
      </div>
    </div>

    <!-- Students List -->
    <div class="space-y-3">
      <div 
        v-for="student in filteredStudents" 
        :key="student.id" 
        class="rounded-lg border border-border bg-card"
      >
        <div class="p-4">
          <div class="flex items-start gap-3">
            <div class="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
              <span class="text-sm font-medium">
                {{ student.name.split(' ').map(n => n[0]).join('').toUpperCase() }}
              </span>
            </div>
            
            <div class="flex-1 min-w-0 space-y-1">
              <div class="flex items-center justify-between">
                <h3 class="font-medium truncate">{{ student.name }}</h3>
                <div class="relative">
                  <button 
                    class="h-8 w-8 p-0 rounded-md hover:bg-accent"
                    @click="toggleDropdown(student.id)"
                  >
                    <MoreVertical class="h-4 w-4" />
                  </button>
                  <div 
                    v-if="activeDropdown === student.id" 
                    class="absolute right-0 top-full mt-1 w-32 bg-popover border border-border rounded-md shadow-lg z-10"
                  >
                    <button 
                      class="w-full text-left px-3 py-2 text-sm hover:bg-accent flex items-center"
                      @click="handleEdit(student)"
                    >
                      <Edit class="w-4 h-4 mr-2" />
                      Edit
                    </button>
                    <button 
                      class="w-full text-left px-3 py-2 text-sm hover:bg-accent text-destructive flex items-center"
                      @click="handleDelete(student)"
                    >
                      <Trash class="w-4 h-4 mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              
              <div class="flex items-center gap-4 text-sm text-muted-foreground">
                <div class="flex items-center gap-1">
                  <Mail class="w-3 h-3" />
                  <span class="truncate">{{ student.email }}</span>
                </div>
                <span 
                  class="inline-flex items-center rounded-full px-2 py-1 text-xs"
                  :class="student.gender === 'Female' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground'"
                >
                  {{ student.gender }}
                </span>
              </div>
              
              <div class="flex items-center gap-4 text-sm text-muted-foreground">
                <div class="flex items-center gap-1">
                  <Phone class="w-3 h-3" />
                  <span>{{ student.phone }}</span>
                </div>
                <span class="inline-flex items-center rounded-md border px-2 py-1 text-xs">
                  {{ student.enrolledClasses }} classes
                </span>
              </div>
              
              <div class="flex items-start gap-1 text-sm text-muted-foreground">
                <MapPin class="w-3 h-3 mt-0.5 shrink-0" />
                <span class="truncate text-xs">{{ student.address }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Results count -->
    <div class="text-sm text-muted-foreground text-center py-2">
      Showing {{ filteredStudents.length }} of {{ students.length }} students
    </div>

    <!-- Add/Edit Dialog -->
    <div v-if="isDialogOpen" class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div class="w-full max-w-md bg-card rounded-lg border border-border shadow-lg">
        <div class="p-6">
          <div class="mb-4">
            <h3 class="text-lg font-semibold">
              {{ editingStudent ? 'Edit Student' : 'Add New Student' }}
            </h3>
            <p class="text-sm text-muted-foreground">
              {{ editingStudent 
                ? 'Update student information below.' 
                : 'Enter the student details below.'
              }}
            </p>
          </div>
          
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="space-y-2">
              <label for="name" class="text-sm font-medium">Full Name</label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                required
                class="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            
            <div class="space-y-2">
              <label for="email" class="text-sm font-medium">Email</label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                required
                class="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            
            <div class="space-y-2">
              <label for="phone" class="text-sm font-medium">Phone</label>
              <input
                id="phone"
                v-model="formData.phone"
                type="tel"
                required
                class="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            
            <div class="space-y-2">
              <label for="gender" class="text-sm font-medium">Gender</label>
              <select 
                id="gender"
                v-model="formData.gender"
                class="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>
            
            <div class="space-y-2">
              <label for="dateOfBirth" class="text-sm font-medium">Date of Birth</label>
              <input
                id="dateOfBirth"
                v-model="formData.dateOfBirth"
                type="date"
                required
                class="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            
            <div class="space-y-2">
              <label for="address" class="text-sm font-medium">Address</label>
              <textarea
                id="address"
                v-model="formData.address"
                required
                rows="3"
                class="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              ></textarea>
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
                {{ editingStudent ? 'Update' : 'Add' }} Student
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
import type { Student } from '../lib/mock-data'
import { mockStudents } from '../lib/mock-data'
import { Search, Plus, MoreVertical, Phone, Mail, MapPin, Edit, Trash } from 'lucide-vue-next'

const students = ref<Student[]>([...mockStudents])
const isDialogOpen = ref(false)
const editingStudent = ref<Student | null>(null)
const searchTerm = ref('')
const genderFilter = ref('all')
const activeDropdown = ref<string | null>(null)

const formData = reactive<Partial<Student>>({
  name: '',
  email: '',
  phone: '',
  gender: 'Female',
  dateOfBirth: '',
  address: '',
})

const filteredStudents = computed(() => {
  return students.value.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesGender = genderFilter.value === 'all' || student.gender === genderFilter.value
    return matchesSearch && matchesGender
  })
})

const handleAdd = () => {
  editingStudent.value = null
  Object.assign(formData, {
    name: '',
    email: '',
    phone: '',
    gender: 'Female',
    dateOfBirth: '',
    address: '',
  })
  isDialogOpen.value = true
}

const handleEdit = (student: Student) => {
  editingStudent.value = student
  Object.assign(formData, student)
  isDialogOpen.value = true
  activeDropdown.value = null
}

const handleDelete = (student: Student) => {
  students.value = students.value.filter(s => s.id !== student.id)
  activeDropdown.value = null
}

const handleSubmit = () => {
  if (editingStudent.value) {
    const index = students.value.findIndex(s => s.id === editingStudent.value!.id)
    if (index !== -1) {
      students.value[index] = { ...editingStudent.value, ...formData }
    }
  } else {
    // Omit 'id' from formData to avoid overwriting the generated id
    const { id, ...formDataWithoutId } = formData as Student
    const newStudent: Student = {
      id: Date.now().toString(),
      ...formDataWithoutId,
      enrolledClasses: 0
    }
    students.value.push(newStudent)
  }
  
  isDialogOpen.value = false
}

const toggleDropdown = (studentId: string) => {
  activeDropdown.value = activeDropdown.value === studentId ? null : studentId
}

// Close dropdown when clicking outside
if (typeof window !== 'undefined') {
  window.addEventListener('click', () => {
    activeDropdown.value = null
  })
}
</script>