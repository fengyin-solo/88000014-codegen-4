<script setup>
import PanelSection from '../components/common/PanelSection.vue'
import StatCard from '../components/common/StatCard.vue'
import CrewBoard from '../components/harbor/CrewBoard.vue'
import HeroBanner from '../components/harbor/HeroBanner.vue'
import WindowList from '../components/harbor/WindowList.vue'
import {
  harborCrew,
  harborRules,
  harborSummary,
  harborWindows,
} from '../data/harborData'
import { useHarborMetrics } from '../composables/useHarborMetrics'

const { activeInspectors, pendingRecords, recheckRecords, totalWindows } =
  useHarborMetrics()

const metricCards = [
  { label: '采样窗口', value: totalWindows, tone: 'neutral' },
  { label: '待采样记录', value: pendingRecords, tone: 'warn' },
  { label: '待复检记录', value: recheckRecords, tone: 'danger' },
  { label: '在岗检疫员', value: activeInspectors, tone: 'neutral' },
]
</script>

<template>
  <div class="view-stack">
    <HeroBanner :hero="harborSummary.hero" />

    <section class="stats-grid">
      <StatCard
        v-for="card in metricCards"
        :key="card.label"
        :label="card.label"
        :value="card.value"
        :tone="card.tone"
      />
    </section>

    <section class="two-column">
      <PanelSection title="今日窗口" badge="06:00 - 19:00">
        <WindowList :items="harborWindows.slice(0, 3)" />
      </PanelSection>

      <PanelSection title="现场规则" badge="执行口径">
        <ul class="rule-list">
          <li v-for="rule in harborRules" :key="rule">{{ rule }}</li>
        </ul>
      </PanelSection>
    </section>

    <PanelSection title="班组排班" badge="当日班表">
      <CrewBoard :crew="harborCrew" />
    </PanelSection>
  </div>
</template>

<style scoped>
.view-stack {
  display: grid;
  gap: 24px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.two-column {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 24px;
}

.rule-list {
  margin: 0;
  padding-left: 20px;
  color: #405753;
}

.rule-list li + li {
  margin-top: 10px;
}

@media (max-width: 980px) {
  .stats-grid,
  .two-column {
    grid-template-columns: 1fr;
  }
}
</style>
