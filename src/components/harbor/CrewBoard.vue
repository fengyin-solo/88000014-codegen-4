<script setup>
defineProps({
  crew: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="crew-board">
    <article
      v-for="member in crew"
      :key="member.name"
      class="crew-card"
    >
      <h4>{{ member.name }}</h4>
      <p>{{ member.shift }}</p>
      <small>{{ member.focus }}</small>
    </article>
  </div>
</template>

<style scoped>
.crew-board {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.crew-card {
  padding: 16px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.72);
}

h4,
p,
small {
  margin: 0;
}

p,
small {
  color: #61756f;
}

p {
  margin-top: 6px;
}

small {
  display: block;
  margin-top: 6px;
}

@media (max-width: 760px) {
  .crew-board {
    grid-template-columns: 1fr;
  }
}
</style>
