<template>
  <div :class="{ 'dark': isDark }" class="min-h-screen transition-colors duration-300">
    <div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <!-- Header -->
      <header class="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-700">
        <nav class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <!-- <div class="text-xl font-bold">Portfolio</div> -->
           <!-- <img src="../assets/unihub.png" alt="Logo" class="w-auto" style="height: 40px;"/> -->
            <div class="h-8 overflow-hidden flex items-center">
  <img src="../assets/unihub.png" alt="Logo" style="height: 120px; width: auto;"/></div>
          <div class="flex items-center space-x-8">
            <a href="#about" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a>
            <a href="#projects" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Projects</a>
            <a href="#contact" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a>
            <button 
              @click="toggleTheme"
              class="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            >
              <Sun v-if="isDark" class="w-5 h-5" />
              <Moon v-else class="w-5 h-5" />
            </button>
          </div>
        </nav>
      </header>

      <!-- Hero Section -->
      <section class="pt-32 pb-20 px-6">
        <div class="max-w-6xl mx-auto">
          <div class="text-center">
            <h1 class="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Vuth Vannak
            </h1>
            <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Full-Stack Developer & UI/UX Designer crafting digital experiences with passion and precision.
            </p>
            <div class="flex justify-center space-x-4">
              <button class="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                View Work
              </button>
              <!-- <button class="px-8 py-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                Download CV
              </button> -->
              <a href="https://nas-portfolio-lac.vercel.app/" class="px-8 py-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">Download CV</a>
            </div>
          </div>
        </div>
      </section>

      <!-- About Section -->
      <section id="about" class="py-20 px-6 bg-gray-100 dark:bg-gray-800">
        <div class="max-w-6xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-center mb-16">About Me</h2>
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="../assets/DSC_4766.jpg" 
                alt="John Doe" 
                class="w-80 h-80 mx-auto rounded-2xl object-cover shadow-lg"
              />
            </div>
            <div class="space-y-6">
              <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              I’m a passionate and driven developer with a strong foundation in IT support, data management, and basic programming. With hands-on experience in system administration, computer hardware and software maintenance, and data entry, I strive to create efficient and user-focused digital solutions. Over the past years, I’ve worked in both academic and professional environments, gaining valuable technical skills and problem-solving abilities. I specialize in modern tools like Microsoft Office Suite and have a growing interest in web technologies and graphic design. I'm always eager to learn, collaborate, and turn innovative ideas into real, impactful solutions.
              </p>
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <h3 class="font-semibold">Frontend</h3>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full text-sm">Vue.js</span>
                    <span class="px-3 py-1 bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full text-sm">React</span>
                    <span class="px-3 py-1 bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full text-sm">TypeScript</span>
                  </div>
                </div>
                <div class="space-y-2">
                  <h3 class="font-semibold">Backend</h3>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full text-sm">Node.js</span>
                    <span class="px-3 py-1 bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full text-sm">PHP</span>
                    <span class="px-3 py-1 bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full text-sm">C#</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Projects Section -->
      <section id="projects" class="py-20 px-6">
        <div class="max-w-6xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-center mb-16">Featured Projects</h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              v-for="project in projects" 
              :key="project.id"
              class="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div class="h-48 bg-gradient-to-br from-blue-400 to-purple-500"></div>
              <div class="p-6">
                <h3 class="text-xl font-bold mb-2">{{ project.title }}</h3>
                <p class="text-gray-600 dark:text-gray-300 mb-4">{{ project.description }}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                  <span 
                    v-for="tech in project.technologies" 
                    :key="tech"
                    class="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm"
                  >
                    {{ tech }}
                  </span>
                </div>
                <div class="flex space-x-4">
                  <button class="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline">
                    <ExternalLink class="w-4 h-4" />
                    <span>Live Demo</span>
                  </button>
                  <button class="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:underline">
                    <Github class="w-4 h-4" />
                    <span>Code</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section id="contact" class="py-20 px-6 bg-gray-100 dark:bg-gray-800">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-8">Let's Work Together</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-12">
            Have a project in mind? I'd love to hear about it and discuss how we can bring your ideas to life.
          </p>
          <div class="flex justify-center space-x-8 mb-12">
            <a href="mailto:john@example.com" class="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <Mail class="w-5 h-5" />
              <span>vann.nak.edu@gmail.com</span>
            </a>
            <a href="https://www.linkedin.com/in/vannakvuth/" class="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <Linkedin class="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com/devnaktech" class="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <Github class="w-5 h-5" />
              <span>GitHub</span>
            </a>
          </div>
          <button class="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg transition-colors">
            Get In Touch
          </button>
        </div>
      </section>

      <!-- Footer -->
      <footer class="py-8 px-6 border-t border-gray-200 dark:border-gray-700">
        <div class="max-w-6xl mx-auto text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2025 Vannak Vuth. All rights reserved.</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Sun, Moon, ExternalLink, Github, Mail, Linkedin } from 'lucide-vue-next'

// Theme management
const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

// Initialize theme from localStorage
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  isDark.value = savedTheme ? savedTheme === 'dark' : prefersDark
})

// Projects data
const projects = ref([
/*
  {
     id: 1,
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce solution with Vue.js and Node.js, featuring real-time inventory and payment processing.',
    technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Stripe']
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Collaborative task management tool with real-time updates, drag-and-drop functionality, and team collaboration.',
    technologies: ['React', 'Firebase', 'Tailwind CSS']
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'Beautiful weather application with location-based forecasts, interactive maps, and detailed analytics.',
    technologies: ['Vue.js', 'OpenWeather API', 'Chart.js']
  }, */
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'Responsive portfolio website with dark mode, smooth animations, and optimized performance.',
    technologies: ['Vue.js', 'Tailwind CSS', 'Vite']
  },
  {
    id: 5,
    title: 'Blog Platform',
    description: 'Full-featured blogging platform with markdown support, SEO optimization, and content management.',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL']
  },
  {
    id: 6,
    title: 'Chat Application',
    description: 'Real-time chat application with file sharing, emoji support, and group conversations.',
    technologies: ['Socket.io', 'Express', 'React']
  }
])

// Smooth scrolling for navigation links
onMounted(() => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'))
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    })
  })
})
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background-color: #f3f4f6;
}

.dark ::-webkit-scrollbar-track {
  background-color: #1f2937;
}

::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #9ca3af;
}

.dark ::-webkit-scrollbar-thumb {
  background-color: #4b5563;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background-color: #6b7280;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>