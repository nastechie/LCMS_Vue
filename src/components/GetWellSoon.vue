<template>
  <div class="card-container" :style="{ backgroundImage: `url(${background})` }">
    <img src="../assets/cute.png" class="cute-icon" alt="Cute" />
    <img src="../assets/hellokitty.png" class="kitty top-right" alt="Hello Kitty" />
    <img src="../assets/hellokitty1.png" class="kitty bottom-left" alt="Hello Kitty Left" />
    <img src="../assets/hellokitty2.png" class="kitty bottom-right" alt="Hello Kitty Right" />

    <div class="message">Get Well! Sey Sey!🫡😉 Good Night🌃
    </div>
  </div>
</template>

<script lang="ts" setup>
import background from '../assets/backgroundpink.jpg'
</script>

<style scoped>
.card-container {
  position: relative;
  width: 100%;
  max-width: 500px; /* narrower for vertical design */
  aspect-ratio: 3 / 4; /* vertical ratio */
  margin: auto;
  border-radius: 36px;
  overflow: hidden;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border: 14px solid #f9c9d3;

  display: flex;
  align-items: center;
  justify-content: center;
}

.message {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 50px;
  font-size: 44px;
  font-weight: bold;
  font-family: 'Baloo 2', 'Comic Sans MS', cursive;
  color: #fff;
  /* background: linear-gradient(135deg, #ffc1dc, #fff0f5); */
  border: 4px solid #ffe3ef;
  border-radius: 40px;
  box-shadow:
    0 10px 25px rgba(255, 182, 193, 0.5),
    0 0 12px rgba(255, 255, 255, 0.6) inset;
  text-shadow: 2px 3px 6px rgba(0, 0, 0, 0.1);
  animation: popIn 0.6s ease-out;
  letter-spacing: 1px;
  text-align: center;
}


@keyframes popIn {
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}

.message:hover {
  transform: translate(-50%, -50%) scale(1.05);

}

@keyframes pop {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}


.cute-icon {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 90px;
}

.kitty {
  position: absolute;
  width: 70px;
}

.kitty.top-right {
  top: 20px;
  right: 20px;
}

.kitty.bottom-left {
  bottom: 20px;
  left: 20px;
}

.kitty.bottom-right {
  bottom: 20px;
  right: 20px;
}

@media (max-width: 600px) {
  .message {
    font-size: 24px;
  }
  .cute-icon,
  .kitty {
    width: 60px;
  }
}
</style>
