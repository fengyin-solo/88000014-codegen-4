<script setup>
import PanelSection from '../components/common/PanelSection.vue'
import RecordTable from '../components/harbor/RecordTable.vue'
import { harborRecords } from '../data/harborData'
</script>

<template>
  <div class="view-stack">
    <PanelSection title="检疫记录总表" badge="样本追踪">
      <RecordTable :rows="harborRecords" />
    </PanelSection>
  </div>
</template>

<style scoped>
.view-stack {
  display: grid;
}
</style>
