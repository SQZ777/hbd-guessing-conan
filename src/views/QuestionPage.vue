<template>
  <div class="question-page">
    <div class="progress-bar">
      線索 {{ questionId }} / 4
      <span class="difficulty" :class="`difficulty-${question.difficulty.toLowerCase()}`">
        {{ question.difficulty }}
      </span>
    </div>
    
    <div class="content">
      <div class="evidence-card">
        <h2 class="card-title">📋 線索 #{{ questionId }}</h2>
        <p class="question-text" style="white-space: pre-line;">{{ question.question }}</p>
      </div>
      
      <!-- 選擇題 -->
      <div v-if="question.type === 'choice'" class="options-container">
        <button
          v-for="option in question.options"
          :key="option"
          class="option-button"
          :class="{
            'disabled': isWrongOption(option),
            'selected': selectedOption === option
          }"
          :disabled="isWrongOption(option)"
          @click="selectOption(option)"
        >
          <span class="option-text">{{ option }}</span>
          <span v-if="isWrongOption(option)" class="cross-mark">✗</span>
        </button>
      </div>
      
      <!-- 問答題 -->
      <div v-else-if="question.type === 'input'" class="input-container">
        <input
          v-model="inputAnswer"
          type="text"
          class="answer-input"
          placeholder="請輸入答案..."
          @keyup.enter="handleSubmit"
        />
      </div>
      
      <button 
        class="submit-button"
        :disabled="!canSubmit || submitting"
        @click="handleSubmit"
      >
        🔎 提交推理
      </button>
      
      <transition name="fade">
        <div v-if="feedback" class="feedback" :class="feedback.type">
          {{ feedback.message }}
        </div>
      </transition>
      
      <transition name="fade">
        <div v-if="showTruth" class="truth-easter-egg">
          真相只有一個
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { questions } from '../data/questions'
import { useGameState } from '../composables/useGameState'

const router = useRouter()
const route = useRoute()
const { submitAnswer, getWrongAttempts } = useGameState()

const questionId = computed(() => parseInt(route.params.id))
const question = computed(() => questions.find(q => q.id === questionId.value))

const selectedOption = ref(null)
const inputAnswer = ref('')
const feedback = ref(null)
const submitting = ref(false)
const showTruth = ref(false)

const wrongOptions = computed(() => getWrongAttempts(questionId.value))

const canSubmit = computed(() => {
  if (question.value.type === 'choice') {
    return selectedOption.value !== null
  } else if (question.value.type === 'input') {
    return inputAnswer.value.trim() !== ''
  }
  return false
})

const isWrongOption = (option) => {
  return wrongOptions.value.includes(option)
}

const selectOption = (option) => {
  if (!isWrongOption(option)) {
    selectedOption.value = option
    feedback.value = null
  }
}

const handleSubmit = async () => {
  if (!canSubmit.value || submitting.value) return
  
  submitting.value = true
  
  // 根據題型取得答案
  const userAnswer = question.value.type === 'choice' 
    ? selectedOption.value 
    : inputAnswer.value.trim()
  
  const isCorrect = submitAnswer(
    questionId.value,
    userAnswer,
    question.value.answer
  )
  
  if (isCorrect) {
    feedback.value = {
      type: 'success',
      message: '✅ 線索成立。下一份證物已解鎖。'
    }
    
    // 顯示「真相只有一個」彩蛋
    showTruth.value = true
    setTimeout(() => {
      showTruth.value = false
    }, 1500)
    
    // 1.5 秒後跳轉
    setTimeout(() => {
      if (questionId.value < 4) {
        router.push(`/question/${questionId.value + 1}`)
      } else {
        router.push('/final')
      }
    }, 1500)
  } else {
    feedback.value = {
      type: 'error',
      message: '❌ 推理不成立。重新檢視現場線索。'
    }
    
    // 震動效果
    const card = document.querySelector('.evidence-card')
    if (card) {
      card.classList.add('shake')
      setTimeout(() => {
        card.classList.remove('shake')
      }, 500)
    }
    
    // 重置輸入
    selectedOption.value = null
    inputAnswer.value = ''
    submitting.value = false
  }
}

// 監聽路由參數變化，重置狀態
watch(() => route.params.id, () => {
  selectedOption.value = null
  inputAnswer.value = ''
  feedback.value = null
  submitting.value = false
  showTruth.value = false
})
</script>

<style lang="scss" scoped>
.question-page {
  min-height: 100vh;
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
}

.progress-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--color-bg-card);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-lg);
  font-family: var(--font-mono);
  font-size: 0.95rem;
  box-shadow: var(--shadow-sm);
}

.difficulty {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.1);
  
  &.difficulty-easy {
    color: var(--color-success);
  }
  
  &.difficulty-normal {
    color: #ffd60a;
  }
  
  &.difficulty-hard {
    color: var(--color-error);
  }
}

.content {
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.evidence-card {
  background: var(--color-bg-card);
  border: 2px solid var(--color-gold);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  box-shadow: var(--shadow-md);
}

.card-title {
  font-family: var(--font-mono);
  font-size: 1.25rem;
  margin-bottom: var(--spacing-md);
  color: var(--color-gold);
}

.question-text {
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--color-text-primary);
}

.options-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}

.option-button {
  background: var(--color-bg-card);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: var(--color-text-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: 1rem;
  text-align: left;
  transition: all var(--transition-fast);
  min-height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &:not(.disabled):hover {
    border-color: var(--color-gold);
    background: rgba(212, 163, 115, 0.1);
  }
  
  &.selected {
    border-color: var(--color-gold);
    background: rgba(212, 163, 115, 0.2);
  }
  
  &.disabled {
    opacity: 0.4;
    text-decoration: line-through;
    cursor: not-allowed;
    
    .cross-mark {
      color: var(--color-error);
      font-weight: bold;
    }
  }
}

.input-container {
  margin-bottom: var(--spacing-lg);
}

.answer-input {
  width: 100%;
  background: var(--color-bg-card);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: var(--color-text-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: 1.125rem;
  text-align: center;
  transition: all var(--transition-fast);
  min-height: 48px;
  font-family: var(--font-primary);
  
  &::placeholder {
    color: var(--color-text-secondary);
    opacity: 0.6;
  }
  
  &:focus {
    outline: none;
    border-color: var(--color-gold);
    background: rgba(212, 163, 115, 0.1);
    box-shadow: 0 0 0 3px rgba(212, 163, 115, 0.1);
  }
}

.submit-button {
  background: var(--color-accent);
  color: white;
  font-size: 1.125rem;
  font-weight: 700;
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-normal);
  min-height: 48px;
  margin-bottom: var(--spacing-md);
  
  &:hover:not(:disabled) {
    background: var(--color-accent-dim);
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.feedback {
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  text-align: center;
  font-weight: 600;
  animation: fadeIn 0.3s ease;
  
  &.success {
    background: rgba(6, 214, 160, 0.2);
    border: 2px solid var(--color-success);
    color: var(--color-success);
  }
  
  &.error {
    background: rgba(239, 71, 111, 0.2);
    border: 2px solid var(--color-error);
    color: var(--color-error);
  }
}

.truth-easter-egg {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  font-weight: 900;
  color: var(--color-accent);
  text-shadow: 0 0 20px rgba(230, 57, 70, 0.8);
  animation: truthReveal 1.5s ease;
  pointer-events: none;
  z-index: 1000;
}

@media (max-width: 768px) {
  .question-page {
    padding: var(--spacing-sm);
  }
  
  .card-title {
    font-size: 1.125rem;
  }
  
  .question-text {
    font-size: 1rem;
  }
}
</style>
