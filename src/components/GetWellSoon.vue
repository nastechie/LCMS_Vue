<template>
  <div
    class="relative max-w-[850px] aspect-[16/9] mx-auto rounded-[36px] overflow-hidden border-[14px] border-[#f9c9d3] bg-cover bg-center"
    :style="{ backgroundImage: `url(${background})` }"
  >
    <!-- Decorative Images -->
    <img src="../assets/cute.png" class="absolute top-5 left-5 w-[110px]" alt="Cute" />
    <img src="../assets/hellokitty.png" class="absolute top-5 right-5 w-[80px]" alt="Hello Kitty" />
    <img src="../assets/hellokitty1.png" class="absolute bottom-5 left-5 w-[80px]" alt="Hello Kitty 1" />
    <img src="../assets/hellokitty2.png" class="absolute bottom-5 right-5 w-[80px]" alt="Hello Kitty 2" />

    <!-- Center Message -->
    <div
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#75c1b5] text-white font-bold text-[40px] px-9 py-3 rounded-xl text-center font-[ArialRoundedMTBold,sans-serif]"
    >
      Get Well Soon
    </div>
  </div>
</template>

<script lang="ts" setup>
import background from '../assets/backgroundpink.jpg'
</script>
