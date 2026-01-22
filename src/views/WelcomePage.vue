<template>
  <div class="welcome-page">
    <div class="case-number">CASE #2026-0122</div>
    
    <div class="content">
      <h1 class="title">📁 案件檔案：生日特別任務</h1>
      
      <div class="file-info">
        <div class="info-item">
          <span class="label">目標：</span>
          <span class="value">找出禮物位置</span>
        </div>
        <div class="info-item">
          <span class="label">狀態：</span>
          <span class="value status-locked">線索未解鎖</span>
        </div>
      </div>
      
      <div class="hint">
        <p>「提示：證物就藏在你每天看見的地方。」</p>
      </div>
      
      <button class="start-button" @click="startInvestigation">
        🔍 開始調查
      </button>
    </div>
    
    <div class="fingerprint-bg"></div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const startInvestigation = () => {
  router.push('/question/1')
}
</script>

<style lang="scss" scoped>
.welcome-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md);
  position: relative;
  overflow: hidden;
}

.case-number {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  font-family: var(--font-mono);
  font-size: 0.875rem;
  color: var(--color-accent);
  letter-spacing: 1px;
}

.content {
  max-width: 600px;
  width: 100%;
  text-align: center;
  animation: fadeIn 1s ease;
  z-index: 1;
}

.title {
  font-family: var(--font-mono);
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  margin-bottom: var(--spacing-lg);
  line-height: 1.3;
}

.file-info {
  background: var(--color-bg-card);
  border: 2px solid rgba(212, 163, 115, 0.3);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  text-align: left;
  box-shadow: var(--shadow-md);
}

.info-item {
  display: flex;
  padding: var(--spacing-xs) 0;
  font-size: 0.95rem;
  
  .label {
    color: var(--color-text-secondary);
    margin-right: var(--spacing-xs);
  }
  
  .value {
    color: var(--color-text-primary);
    flex: 1;
  }
  
  .status-locked {
    color: var(--color-accent);
  }
}

.hint {
  margin-bottom: var(--spacing-xl);
  
  p {
    font-style: italic;
    color: var(--color-text-secondary);
    font-size: 0.95rem;
    line-height: 1.6;
  }
}

.start-button {
  background: var(--color-accent);
  color: white;
  font-size: 1.125rem;
  font-weight: 700;
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-normal);
  min-height: 48px;
  
  &:hover {
    background: var(--color-accent-dim);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(230, 57, 70, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
}

.fingerprint-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  opacity: 0.03;
  background-image: radial-gradient(circle, var(--color-text-primary) 1px, transparent 1px);
  background-size: 20px 20px;
  pointer-events: none;
}

@media (max-width: 768px) {
  .case-number {
    top: var(--spacing-sm);
    right: var(--spacing-sm);
    font-size: 0.75rem;
  }
  
  .content {
    padding: var(--spacing-sm);
  }
  
  .start-button {
    width: 100%;
  }
}
</style>
