<template>
  <div class="final-page">
    <div class="case-closed-stamp" :class="{ 'show': showStamp }">
      <div class="stamp-content">CASE CLOSED</div>
    </div>
    
    <div class="content">
      <h1 class="title">🕵️ 結案報告</h1>
      
      <p class="congrats">
        你已完成推理。證據鏈完整。
      </p>
      
      <div class="conclusion-card">
        <div class="conclusion-label">結論：</div>
        <div class="conclusion-answer">柯南</div>
        <div class="conclusion-answer">635</div>
        <div class="conclusion-answer">晴空塔</div>
        <div class="conclusion-answer">赤井秀一</div>
      </div>
      
      <div class="action-card">
        <div class="action-title">📍 下一步</div>
        <p class="action-instruction">
          請去找符合上列敘述的那幅拼圖。<br>
          證物藏在那裡。
        </p>
      </div>
      
      <div class="conan-quote">
        <div class="quote-text">「真相只有一個！」</div>
        <div class="conan-image">🔍</div>
      </div>
      
      <button class="restart-button" @click="restartGame">
        🔄 重新調查
      </button>
    </div>
    
    <div class="particles"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameState } from '../composables/useGameState'

const router = useRouter()
const { resetGame } = useGameState()

const showStamp = ref(false)

onMounted(() => {
  setTimeout(() => {
    showStamp.value = true
  }, 500)
})

const restartGame = () => {
  resetGame()
  router.push('/')
}
</script>

<style lang="scss" scoped>
.final-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md);
  position: relative;
  overflow: hidden;
}

.case-closed-stamp {
  position: absolute;
  top: 10%;
  right: 10%;
  width: 150px;
  height: 150px;
  opacity: 0;
  transform: scale(0) rotate(-45deg);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  &.show {
    opacity: 0.3;
    transform: scale(1) rotate(-15deg);
  }
  
  .stamp-content {
    width: 100%;
    height: 100%;
    border: 6px solid var(--color-accent);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-mono);
    font-weight: 900;
    font-size: 1rem;
    color: var(--color-accent);
    text-align: center;
    padding: var(--spacing-sm);
    transform: rotate(15deg);
  }
}

.content {
  max-width: 600px;
  width: 100%;
  text-align: center;
  animation: fadeIn 1s ease;
  z-index: 1;
}

.title {
  font-size: clamp(2rem, 6vw, 3rem);
  margin-bottom: var(--spacing-lg);
  color: var(--color-gold);
  text-shadow: 0 2px 10px rgba(212, 163, 115, 0.3);
}

.congrats {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xl);
  line-height: 1.6;
}

.conclusion-card {
  background: var(--color-bg-card);
  border: 3px solid var(--color-accent);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  box-shadow: var(--shadow-lg);
  animation: fadeIn 1s ease 0.3s backwards;
}

.conclusion-label {
  font-size: 1rem;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-sm);
}

.conclusion-answer {
  font-size: clamp(1.5rem, 5vw, 2rem);
  font-weight: 900;
  color: var(--color-accent);
  font-family: var(--font-mono);
  letter-spacing: 2px;
}

.action-card {
  background: linear-gradient(135deg, rgba(212, 163, 115, 0.1), rgba(212, 163, 115, 0.05));
  border: 2px solid var(--color-gold);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  box-shadow: var(--shadow-md);
  animation: fadeIn 1s ease 0.6s backwards;
}

.action-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-gold);
  margin-bottom: var(--spacing-md);
}

.action-instruction {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--color-text-primary);
}

.conan-quote {
  margin-bottom: var(--spacing-xl);
  animation: fadeIn 1s ease 0.9s backwards;
}

.quote-text {
  font-size: 1.5rem;
  font-style: italic;
  color: var(--color-accent);
  margin-bottom: var(--spacing-sm);
  font-weight: 700;
}

.conan-image {
  font-size: 3rem;
  animation: pulse 2s ease infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.restart-button {
  background: var(--color-bg-card);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: var(--color-text-primary);
  font-size: 1rem;
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
  min-height: 48px;
  
  &:hover {
    border-color: var(--color-gold);
    background: rgba(212, 163, 115, 0.1);
  }
}

.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle, var(--color-gold) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.05;
  animation: particleFloat 20s linear infinite;
  pointer-events: none;
}

@keyframes particleFloat {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-50px);
  }
}

@media (max-width: 768px) {
  .case-closed-stamp {
    width: 100px;
    height: 100px;
    
    .stamp-content {
      font-size: 0.75rem;
      border-width: 4px;
    }
  }
  
  .final-page {
    padding: var(--spacing-sm);
  }
  
  .action-instruction {
    font-size: 1rem;
  }
  
  .restart-button {
    width: 100%;
  }
}
</style>
