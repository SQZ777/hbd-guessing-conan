import { ref, computed } from 'vue'

const currentQuestionId = ref(1)
const wrongAttempts = ref({})

export function useGameState() {
  const isQuestionAnswered = (questionId) => {
    return currentQuestionId.value > questionId
  }

  const canAccessQuestion = (questionId) => {
    return questionId <= currentQuestionId.value
  }

  const recordWrongAttempt = (questionId, selectedOption) => {
    if (!wrongAttempts.value[questionId]) {
      wrongAttempts.value[questionId] = []
    }
    if (!wrongAttempts.value[questionId].includes(selectedOption)) {
      wrongAttempts.value[questionId].push(selectedOption)
    }
  }

  const getWrongAttempts = (questionId) => {
    return wrongAttempts.value[questionId] || []
  }

  const submitAnswer = (questionId, selectedOption, correctAnswer) => {
    if (selectedOption === correctAnswer) {
      // 答對，進入下一題
      if (questionId < 4) {
        currentQuestionId.value = questionId + 1
      } else {
        // 最後一題答對，進入結案頁
        currentQuestionId.value = 5
      }
      return true
    } else {
      // 答錯，記錄錯誤選項
      recordWrongAttempt(questionId, selectedOption)
      return false
    }
  }

  const isGameComplete = computed(() => currentQuestionId.value === 5)

  const resetGame = () => {
    currentQuestionId.value = 1
    wrongAttempts.value = {}
  }

  return {
    currentQuestionId,
    wrongAttempts,
    isQuestionAnswered,
    canAccessQuestion,
    submitAnswer,
    getWrongAttempts,
    isGameComplete,
    resetGame
  }
}
