<template>
  <div class="card-container">
    <!-- Background optimized for 9:16 -->
    <div class="background-wrapper">
      <img 
        src="../assets/backgroundpink.jpg" 
        alt="background" 
        class="background-img"
        loading="lazy"
      />
    </div>
    
    <!-- Content -->
    <img src="../assets/cute.png" class="cute-icon" alt="Cute" loading="lazy" />
    <img src="../assets/hellokitty.png" class="kitty top-right" alt="Hello Kitty" loading="lazy" />
    <img src="../assets/hellokitty1.png" class="kitty bottom-left" alt="Hello Kitty Left" loading="lazy" />
    <img src="../assets/hellokitty2.png" class="kitty bottom-right" alt="Hello Kitty Right" loading="lazy" />

    <div class="message">
      Get Well! Sey Sey!🫡😉 Good Night🌃
    </div>
  </div>
</template>

<style scoped>
/* 9:16 Aspect Ratio Container */
.card-container {
  position: relative;
  width: 90vw;
  max-width: 405px; /* 1080/4 = 270px, but scaled up for visibility */
  min-width: 270px;
  aspect-ratio: 9/16; /* 1080x1920 ratio */
  margin: 20px auto;
  border-radius: 36px;
  overflow: hidden;
  border: 14px solid #f9c9d3;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

/* Perfect 9:16 Background */
.background-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.background-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* Responsive Adjustments */
@media (max-width: 600px) {
  .card-container {
    width: 95vw;
    border-width: 10px;
    border-radius: 24px;
  }
  
  .message {
    font-size: clamp(16px, 5vw, 24px);
    padding: 1rem 2rem;
  }
}

/* For actual 1080x1920 displays */
@media (min-width: 1080px) and (min-height: 1920px) {
  .card-container {
    max-width: 1080px;
    height: 1920px;
  }
}

/* Message Styling */
.message {
  position: absolute;
  top: 60%; /* Adjusted for taller aspect ratio */
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1.5rem 3rem;
  font-size: clamp(18px, 4vw, 44px);
  max-width: 90%;
  font-weight: bold;
  font-family: 'Baloo 2', 'Comic Sans MS', cursive;
  color: #fff;
  background-color: rgba(255, 182, 193, 0.3);
  backdrop-filter: blur(2px);
  border: 4px solid #ffe3ef;
  border-radius: 40px;
  box-shadow: 0 10px 25px rgba(255, 182, 193, 0.5),
              0 0 12px rgba(255, 255, 255, 0.6) inset;
  text-shadow: 2px 3px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  word-break: break-word;
  z-index: 2;
}

/* Icon Positioning */
.cute-icon {
  position: absolute;
  top: 3%;
  left: 5%;
  width: 20%;
  max-width: 100px;
  z-index: 3;
}

.kitty {
  position: absolute;
  width: 15%;
  max-width: 80px;
  z-index: 3;
}

.top-right {
  top: 3%;
  right: 5%;
}

.bottom-left {
  bottom: 3%;
  left: 5%;
}

.bottom-right {
  bottom: 3%;
  right: 5%;
}
</style>