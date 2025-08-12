<template>
  <div class="p-4 space-y-6">
    <div>
      <h2 class="text-xl font-semibold text-foreground">Dashboard</h2>
      <p class="text-sm text-muted-foreground">Learning center overview</p>
    </div>

    <!-- Statistics Cards - Mobile Grid -->
    <div class="grid grid-cols-2 gap-3">
      <div class="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border border-border bg-card">
        <div class="p-4 pb-2">
          <div class="flex items-center justify-between">
            <Users class="h-5 w-5 text-primary" />
            <TrendingUp class="h-3 w-3 text-green-600" />
          </div>
        </div>
        <div class="px-4 pb-4">
          <div class="text-xl font-bold">{{ dashboardStats.totalStudents }}</div>
          <p class="text-xs text-muted-foreground">Total Students</p>
        </div>
      </div>

      <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg border border-border bg-card">
        <div class="p-4 pb-2">
          <div class="flex items-center justify-between">
            <BookOpen class="h-5 w-5 text-blue-600" />
            <TrendingUp class="h-3 w-3 text-green-600" />
          </div>
        </div>
        <div class="px-4 pb-4">
          <div class="text-xl font-bold">{{ dashboardStats.activeClasses }}</div>
          <p class="text-xs text-muted-foreground">Active Classes</p>
        </div>
      </div>

      <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg border border-border bg-card">
        <div class="p-4 pb-2">
          <div class="flex items-center justify-between">
            <DollarSign class="h-5 w-5 text-green-600" />
            <TrendingUp class="h-3 w-3 text-green-600" />
          </div>
        </div>
        <div class="px-4 pb-4">
          <div class="text-xl font-bold">${{ dashboardStats.totalRevenue.toLocaleString() }}</div>
          <p class="text-xs text-muted-foreground">Revenue</p>
        </div>
      </div>

      <div class="bg-gradient-to-br from-orange-50 to-red-50 dark:from-red-950 dark:to-orange-950 rounded-lg border border-border bg-card">
        <div class="p-4 pb-2">
          <div class="flex items-center justify-between">
            <AlertCircle class="h-5 w-5 text-red-600" />
          </div>
        </div>
        <div class="px-4 pb-4">
          <div class="text-xl font-bold text-red-600">{{ dashboardStats.pendingPayments }}</div>
          <p class="text-xs text-muted-foreground">Pending</p>
        </div>
      </div>
    </div>

    <!-- Recent Enrollments -->
    <div class="rounded-lg border border-border bg-card">
      <div class="p-4 pb-3">
        <div class="flex items-center justify-between">
          <h3 class="flex items-center gap-2 text-base font-semibold">
            <GraduationCap class="h-4 w-4" />
            Recent Enrollments
          </h3>
          <button class="p-1 rounded-md hover:bg-accent">
            <ChevronRight class="h-4 w-4" />
          </button>
        </div>
      </div>
      <div class="px-4 pb-4">
        <div class="space-y-3">
          <div 
            v-for="enrollment in recentEnrollments" 
            :key="enrollment.id" 
            class="flex items-center gap-3 p-2 rounded-lg bg-muted/30"
          >
            <div class="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
              <span class="text-xs font-medium">
                {{ enrollment.studentName.split(' ').map(n => n[0]).join('') }}
              </span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium truncate">{{ enrollment.studentName }}</p>
              <p class="text-xs text-muted-foreground truncate">{{ enrollment.className }}</p>
            </div>
            <div class="text-right">
              <span 
                class="inline-flex items-center rounded-full px-2 py-1 text-xs"
                :class="enrollment.status === 'Active' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-secondary-foreground'"
              >
                {{ enrollment.status }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="rounded-lg border border-border bg-card">
      <div class="p-4 pb-3">
        <h3 class="text-base font-semibold">Quick Actions</h3>
      </div>
      <div class="px-4 pb-4">
        <div class="grid grid-cols-2 gap-3">
          <button class="h-12 flex flex-col items-center justify-center gap-1 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
            <Users class="h-4 w-4" />
            <span class="text-xs">Add Student</span>
          </button>
          <button class="h-12 flex flex-col items-center justify-center gap-1 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
            <BookOpen class="h-4 w-4" />
            <span class="text-xs">New Course</span>
          </button>
          <button class="h-12 flex flex-col items-center justify-center gap-1 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
            <GraduationCap class="h-4 w-4" />
            <span class="text-xs">Create Class</span>
          </button>
          <button class="h-12 flex flex-col items-center justify-center gap-1 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
            <UserCheck class="h-4 w-4" />
            <span class="text-xs">Add Teacher</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Upcoming Classes -->
    <div class="rounded-lg border border-border bg-card">
      <div class="p-4 pb-3">
        <div class="flex items-center justify-between">
          <h3 class="flex items-center gap-2 text-base font-semibold">
            <BookOpen class="h-4 w-4" />
            Upcoming Classes
          </h3>
          <button class="p-1 rounded-md hover:bg-accent">
            <ChevronRight class="h-4 w-4" />
          </button>
        </div>
      </div>
      <div class="px-4 pb-4">
        <div class="space-y-3">
          <div 
            v-for="classItem in upcomingClasses" 
            :key="classItem.id" 
            class="flex items-center justify-between p-2 rounded-lg bg-muted/30"
          >
            <div class="flex-1">
              <p class="text-sm font-medium">{{ classItem.name }}</p>
              <p class="text-xs text-muted-foreground">{{ classItem.teacherName }}</p>
            </div>
            <div class="text-right">
              <p class="text-xs font-medium">{{ classItem.schedule.split(' ')[0] }}</p>
              <p class="text-xs text-muted-foreground">
                {{ formatDate(classItem.startDate) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Users, BookOpen, GraduationCap, DollarSign, TrendingUp, AlertCircle, ChevronRight, UserCheck } from 'lucide-vue-next'
import { dashboardStats, mockEnrollments, mockClasses } from '../lib/mock-data'

const recentEnrollments = computed(() => mockEnrollments.slice(0, 4))
const upcomingClasses = computed(() => 
  mockClasses.filter(c => new Date(c.startDate) > new Date()).slice(0, 3)
)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  })
}
</script>