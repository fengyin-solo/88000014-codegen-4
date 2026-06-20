<script setup>
defineProps({
  crew: {
    type: Array,
    required: true,
  },
  totalConflicts: {
    type: Number,
    default: 0,
  },
  totalTaskCount: {
    type: Number,
    default: 0,
  },
  highPriorityCount: {
    type: Number,
    default: 0,
  },
})
</script>

<template>
  <div class="summary-grid">
    <article class="summary-card summary-card--primary">
      <span class="summary-label">在岗检疫员</span>
      <strong class="summary-value">{{ crew.length }}</strong>
      <p class="summary-desc">
        共分配 {{ totalTaskCount }} 项任务
      </p>
    </article>

    <article
      :class="[
        'summary-card',
        totalConflicts > 0 ? 'summary-card--danger' : 'summary-card--success',
      ]"
    >
      <span class="summary-label">时间冲突</span>
      <strong class="summary-value">{{ totalConflicts }}</strong>
      <p class="summary-desc">
        {{ totalConflicts > 0 ? '需要尽快调整排班' : '当前无冲突' }}
      </p>
    </article>

    <article class="summary-card summary-card--warn">
      <span class="summary-label">高优先级任务</span>
      <strong class="summary-value">{{ highPriorityCount }}</strong>
      <p class="summary-desc">需优先保障执行资源</p>
    </article>

    <article class="summary-card summary-card--neutral">
      <span class="summary-label">负载均衡</span>
      <strong class="summary-value">
        {{ crew.filter((c) => c.loadLevel === 'normal').length }}/{{ crew.length }}
      </strong>
      <p class="summary-desc">人员任务分配状态</p>
    </article>
  </div>
</template>

<style scoped>
.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.summary-card {
  padding: 18px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.summary-card--primary {
  background: linear-gradient(135deg, #2d5a4a 0%, #3a7a65 100%);
  color: #eff6f1;
}

.summary-card--primary .summary-label,
.summary-card--primary .summary-desc {
  color: rgba(239, 246, 241, 0.8);
}

.summary-card--danger {
  background: #f7ddd7;
}

.summary-card--success {
  background: #d8efe0;
}

.summary-card--warn {
  background: #fff1d2;
}

.summary-card--neutral {
  background: #e7f0eb;
}

.summary-label {
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.summary-value {
  font-size: 2rem;
  font-weight: 700;
}

.summary-desc {
  margin: 0;
  font-size: 0.85rem;
  color: #5f7670;
}

@media (max-width: 760px) {
  .summary-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
