<script setup>
defineProps({
  hero: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section class="hero-banner">
    <div>
      <p class="eyebrow">Harbor Workflow</p>
      <h3>{{ hero.title }}</h3>
      <p class="description">{{ hero.description }}</p>
    </div>
    <div class="hero-highlight">
      <span>{{ hero.windowLabel }}</span>
      <strong>{{ hero.windowCount }}</strong>
      <p>{{ hero.note }}</p>
    </div>
  </section>
</template>

<style scoped>
.hero-banner {
  display: grid;
  grid-template-columns: 1.5fr 0.9fr;
  gap: 20px;
  margin-bottom: 24px;
}

.hero-banner > div {
  border-radius: 26px;
  padding: 26px;
  border: 1px solid rgba(29, 43, 42, 0.12);
  background: rgba(255, 253, 248, 0.82);
}

.eyebrow {
  margin: 0 0 12px;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  font-size: 0.78rem;
  color: #4a6a5f;
}

h3 {
  margin: 0;
  font-size: clamp(1.7rem, 3vw, 2.7rem);
  line-height: 1;
}

.description {
  margin: 14px 0 0;
  color: #425853;
}

.hero-highlight {
  background: linear-gradient(180deg, rgba(61, 93, 84, 0.96), rgba(34, 55, 47, 0.96));
  color: #eff6f1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.hero-highlight span {
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.hero-highlight strong {
  margin: 12px 0 8px;
  font-size: 3rem;
  line-height: 1;
}

.hero-highlight p {
  margin: 0;
  color: rgba(239, 246, 241, 0.82);
}

@media (max-width: 900px) {
  .hero-banner {
    grid-template-columns: 1fr;
  }
}
</style>
