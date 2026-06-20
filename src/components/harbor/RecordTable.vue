<script setup>
import { statusMeta } from '../../utils/formatters'

defineProps({
  rows: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="record-table">
    <div class="record-row record-head">
      <span>船名</span>
      <span>样本标签</span>
      <span>状态</span>
      <span>执行人</span>
      <span>备注</span>
    </div>
    <div
      v-for="row in rows"
      :key="row.sampleCode"
      class="record-row"
    >
      <span>{{ row.shipName }}</span>
      <span>{{ row.sampleCode }}</span>
      <span :class="['status-chip', `status-chip--${statusMeta(row.status).tone}`]">
        {{ statusMeta(row.status).label }}
      </span>
      <span>{{ row.assignee }}</span>
      <span>{{ row.note }}</span>
    </div>
  </div>
</template>

<style scoped>
.record-table {
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid rgba(29, 43, 42, 0.1);
}

.record-row {
  display: grid;
  grid-template-columns: 1.1fr 1fr 0.8fr 0.8fr 1.5fr;
  gap: 12px;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.72);
}

.record-row + .record-row {
  border-top: 1px solid rgba(29, 43, 42, 0.08);
}

.record-head {
  background: #e6efe8;
  color: #49655d;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.76rem;
}

.status-chip {
  display: inline-flex;
  justify-content: center;
  width: fit-content;
  padding: 6px 10px;
  border-radius: 999px;
}

.status-chip--success {
  background: #d6efe0;
  color: #226040;
}

.status-chip--warn {
  background: #ffe9bf;
  color: #8b5e08;
}

.status-chip--neutral {
  background: #dde6f6;
  color: #35528b;
}

@media (max-width: 900px) {
  .record-table {
    overflow-x: auto;
  }

  .record-row {
    min-width: 820px;
  }
}
</style>
