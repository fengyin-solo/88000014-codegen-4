<script setup>
import { formatTime, priorityMeta } from '../../utils/formatters'

defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="window-list">
    <article
      v-for="item in items"
      :key="`${item.shipName}-${item.startAt}`"
      class="window-card"
    >
      <div>
        <div class="window-topline">
          <h4>{{ item.shipName }}</h4>
          <span :class="['tone-pill', `tone-pill--${priorityMeta(item.priority).tone}`]">
            {{ priorityMeta(item.priority).label }}
          </span>
        </div>
        <p>{{ item.berth }} / {{ item.tanks.join('、') }}</p>
        <p>执行人：{{ item.inspector }}</p>
        <small>{{ item.note }}</small>
      </div>
      <strong>{{ formatTime(item.startAt) }}</strong>
    </article>
  </div>
</template>

<style scoped>
.window-list {
  display: grid;
  gap: 14px;
}

.window-card {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 14px;
  align-items: start;
  padding: 16px 18px;
  border-radius: 20px;
  background: #f4f7f4;
}

.window-topline {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}

h4,
p,
small {
  margin: 0;
}

h4 {
  font-size: 1rem;
}

p,
small {
  color: #5f7670;
}

p + p,
p + small {
  margin-top: 6px;
}

strong {
  font-size: 1.1rem;
}

.tone-pill {
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.76rem;
}

.tone-pill--danger {
  background: #f7ddd7;
}

.tone-pill--warn {
  background: #fff1d2;
}

.tone-pill--neutral {
  background: #dce8f7;
}
</style>
