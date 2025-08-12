<template>
  <div class="flex flex-col h-screen bg-background">
    <!-- Top Bar -->
    <TopBar />
    
    <!-- Main Content -->
    <main class="flex-1 overflow-auto pb-16">
      <component :is="currentComponent" />
    </main>
    
    <!-- Bottom Navigation -->
    <div class="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div class="flex items-center justify-around py-2 px-2 safe-area-inset-bottom">
        <button
          v-for="item in navigationItems"
          :key="item.id"
          class="flex flex-col items-center gap-1 h-12 px-2 min-w-0 flex-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
          :class="{
            'text-primary bg-primary/10': activeTab === item.id,
            'text-muted-foreground': activeTab !== item.id
          }"
          @click="setActiveTab(item.id)"
        >
          <component :is="item.icon" 
            :class="['w-4 h-4', { 'text-primary': activeTab === item.id }]" 
          />
          <span class="text-xs leading-none font-normal truncate">{{ item.title }}</span>
        </button>
      </div>
    </div>

    <!-- More Menu Modal -->
    <div v-if="activeTab === 'more'" class="p-4 space-y-4">
      <div class="mb-6">
        <h2 class="text-lg font-semibold">More</h2>
        <p class="text-sm text-muted-foreground">Additional features and settings</p>
      </div>
      
      <div class="space-y-2">
        <button 
          class="w-full justify-start h-12 px-4 flex items-center rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
          @click="setActiveTab('enrollments')"
        >
          <ClipboardList class="w-5 h-5 mr-3" />
          <span>Enrollments</span>
        </button>
        
        <button 
          class="w-full justify-start h-12 px-4 flex items-center rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
          @click="setActiveTab('users')"
        >
          <Settings class="w-5 h-5 mr-3" />
          <span>User Management</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  Home, 
  Users, 
  BookOpen, 
  GraduationCap, 
  UserCheck,
  ClipboardList,
  Settings
} from 'lucide-vue-next'
import TopBar from './components/TopBar.vue'
import Dashboard from './components/Dashboard.vue'
import StudentsPage from './components/StudentsPage.vue'
import CoursesPage from './components/CoursesPage.vue'
import ClassesPage from './components/ClassesPage.vue'
import TeachersPage from './components/TeachersPage.vue'
import EnrollmentsPage from './components/EnrollmentsPage.vue'
import UsersPage from './components/UsersPage.vue'

const navigationItems = [
  {
    title: 'Home',
    icon: Home,
    id: 'dashboard'
  },
  {
    title: 'Students',
    icon: Users,
    id: 'students'
  },
  {
    title: 'Courses',
    icon: BookOpen,
    id: 'courses'
  },
  {
    title: 'Classes',
    icon: GraduationCap,
    id: 'classes'
  },
  {
    title: 'Teachers',
    icon: UserCheck,
    id: 'teachers'
  },
  {
    title: 'More',
    icon: Settings,
    id: 'more'
  }
]

const activeTab = ref('dashboard')

const currentComponent = computed(() => {
  switch (activeTab.value) {
    case 'dashboard':
      return Dashboard
    case 'students':
      return StudentsPage
    case 'courses':
      return CoursesPage
    case 'classes':
      return ClassesPage
    case 'teachers':
      return TeachersPage
    case 'enrollments':
      return EnrollmentsPage
    case 'users':
      return UsersPage
    default:
      return Dashboard
  }
})

const setActiveTab = (tabId: string) => {
  activeTab.value = tabId
}
</script>