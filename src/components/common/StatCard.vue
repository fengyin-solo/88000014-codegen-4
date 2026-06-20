<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  tone: {
    type: String,
    default: 'neutral',
  },
})
</script>

<template>
  <article :class="['stat-card', `stat-card--${tone}`]">
    <span>{{ label }}</span>
    <strong>{{ value }}</strong>
  </article>
</template>

<style scoped>
.stat-card {
  padding: 18px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.78);
}

.stat-card span {
  display: block;
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.stat-card strong {
  display: block;
  margin-top: 10px;
  font-size: 2rem;
}

.stat-card--warn {
  background: #fff1d2;
}

.stat-card--danger {
  background: #f7ddd7;
}

.stat-card--neutral {
  background: #e7f0eb;
}
</style>
