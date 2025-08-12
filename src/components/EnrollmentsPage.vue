<template>
  <div class="p-4 space-y-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold">Enrollments</h2>
        <p class="text-sm text-muted-foreground">Track student enrollments</p>
      </div>
      <button 
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3"
      >
        <Plus class="w-4 h-4 mr-1" />
        Add
      </button>
    </div>

    <!-- Search and Filters -->
    <div class="space-y-3">
      <div class="relative">
        <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Search enrollments..."
          class="w-full pl-10 px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      
      <div class="flex gap-2">
        <select 
          v-model="statusFilter"
          class="w-32 px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="all">All Status</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Dropped">Dropped</option>
        </select>
        
        <select 
          v-model="paymentFilter"
          class="w-32 px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="all">All Payment</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>
    </div>

    <!-- Enrollments List -->
    <div class="space-y-3">
      <div 
        v-for="enrollment in filteredEnrollments" 
        :key="enrollment.id" 
        class="rounded-lg border border-border bg-card"
      >
        <div class="p-4">
          <div class="flex gap-3">
            <div class="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <ClipboardList class="w-6 h-6 text-green-600" />
            </div>
            
            <div class="flex-1 min-w-0 space-y-2">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                    <span class="text-xs font-medium">
                      {{ enrollment.studentName.split(' ').map(n => n[0]).join('') }}
                    </span>
                  </div>
                  <h3 class="font-medium truncate">{{ enrollment.studentName }}</h3>
                </div>
                <div class="relative">
                  <button 
                    class="h-8 w-8 p-0 rounded-md hover:bg-accent"
                    @click="toggleDropdown(enrollment.id)"
                  >
                    <MoreVertical class="h-4 w-4" />
                  </button>
                  <div 
                    v-if="activeDropdown === enrollment.id" 
                    class="absolute right-0 top-full mt-1 w-32 bg-popover border border-border rounded-md shadow-lg z-10"
                  >
                    <button 
                      class="w-full text-left px-3 py-2 text-sm hover:bg-accent flex items-center"
                      @click="handleEdit(enrollment)"
                    >
                      <Edit class="w-4 h-4 mr-2" />
                      Edit
                    </button>
                    <button 
                      class="w-full text-left px-3 py-2 text-sm hover:bg-accent text-destructive flex items-center"
                      @click="handleDelete(enrollment)"
                    >
                      <Trash class="w-4 h-4 mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              
              <div class="flex items-center gap-1 text-sm text-muted-foreground">
                <GraduationCap class="w-3 h-3" />
                <span class="truncate">{{ enrollment.className }}</span>
              </div>
              
              <div class="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar class="w-3 h-3" />
                <span>Enrolled: {{ new Date(enrollment.enrollmentDate).toLocaleDateString() }}</span>
              </div>
              
              <div class="flex items-center gap-2">
                <span 
                  class="inline-flex items-center rounded-full px-2 py-1 text-xs"
                  :class="enrollment.status === 'Active' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground'"
                >
                  {{ enrollment.status }}
                </span>
                <span 
                  class="inline-flex items-center rounded-full px-2 py-1 text-xs"
                  :class="getPaymentBadgeClass(enrollment.paymentStatus)"
                >
                  {{ enrollment.paymentStatus }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Results count -->
    <div class="text-sm text-muted-foreground text-center py-2">
      Showing {{ filteredEnrollments.length }} of {{ enrollments.length }} enrollments
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Enrollment, mockEnrollments } from '../lib/mock-data'
import { Search, Plus, MoreVertical, ClipboardList, GraduationCap, Calendar, Edit, Trash } from 'lucide-vue-next'

const enrollments = ref<Enrollment[]>([...mockEnrollments])
const searchTerm = ref('')
const statusFilter = ref('all')
const paymentFilter = ref('all')
const activeDropdown = ref<string | null>(null)

const filteredEnrollments = computed(() => {
  return enrollments.value.filter(enrollment => {
    const matchesSearch = enrollment.studentName.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      enrollment.className.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesStatus = statusFilter.value === 'all' || enrollment.status === statusFilter.value
    const matchesPayment = paymentFilter.value === 'all' || enrollment.paymentStatus === paymentFilter.value
    return matchesSearch && matchesStatus && matchesPayment
  })
})

const getPaymentBadgeClass = (status: string) => {
  switch (status) {
    case 'Paid': 
      return 'bg-primary text-primary-foreground'
    case 'Pending': 
      return 'bg-secondary text-secondary-foreground'
    case 'Overdue': 
      return 'bg-destructive text-destructive-foreground'
    default: 
      return 'bg-secondary text-secondary-foreground'
  }
}

const handleEdit = (enrollment: Enrollment) => {
  console.log('Edit enrollment:', enrollment)
  activeDropdown.value = null
}

const handleDelete = (enrollment: Enrollment) => {
  enrollments.value = enrollments.value.filter(e => e.id !== enrollment.id)
  activeDropdown.value = null
}

const toggleDropdown = (enrollmentId: string) => {
  activeDropdown.value = activeDropdown.value === enrollmentId ? null : enrollmentId
}

// Close dropdown when clicking outside
if (typeof window !== 'undefined') {
  window.addEventListener('click', () => {
    activeDropdown.value = null
  })
}
</script>