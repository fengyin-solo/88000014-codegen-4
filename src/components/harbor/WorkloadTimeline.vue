<script setup>
import { computed } from 'vue'
import { formatTime, priorityMeta } from '../../utils/formatters'

const props = defineProps({
  crew: {
    type: Array,
    required: true,
  },
})

const TIMELINE_START = 6
const TIMELINE_END = 22
const TIMELINE_HOURS = TIMELINE_END - TIMELINE_START

function getTaskPosition(task) {
  const startDate = new Date(task.startAt)
  const endDate = new Date(task.endAt)
  const startMinutes = startDate.getHours() * 60 + startDate.getMinutes() - TIMELINE_START * 60
  const endMinutes = endDate.getHours() * 60 + endDate.getMinutes() - TIMELINE_START * 60
  const totalMinutes = TIMELINE_HOURS * 60
  const left = Math.max(0, Math.min(100, (startMinutes / totalMinutes) * 100))
  const width = Math.max(2, Math.min(100 - left, ((endMinutes - startMinutes) / totalMinutes) * 100))
  return { left: `${left}%`, width: `${width}%` }
}

const hourMarks = computed(() => {
  const marks = []
  for (let h = TIMELINE_START; h <= TIMELINE_END; h += 2) {
    marks.push(h)
  }
  return marks
})

function isTaskInConflict(task, crewMember) {
  return crewMember.conflicts.some((pair) => pair.includes(task.id))
}
</script>

<template>
  <div class="timeline-container">
    <div class="timeline-header">
      <div class="timeline-label-col">检疫员</div>
      <div class="timeline-axis">
        <div
          v-for="hour in hourMarks"
          :key="hour"
          class="timeline-hour-mark"
        >
          {{ String(hour).padStart(2, '0') }}:00
        </div>
      </div>
    </div>

    <div
      v-for="member in crew"
      :key="member.name"
      class="timeline-row"
    >
      <div class="timeline-label-col">
        <div class="crew-name">{{ member.name }}</div>
        <div class="crew-shift">{{ member.shift }}</div>
        <span
          v-if="member.loadLevel === 'overload'"
          class="load-badge load-badge--danger"
        >冲突</span>
        <span
          v-else-if="member.loadLevel === 'heavy'"
          class="load-badge load-badge--warn"
        >较重</span>
        <span
          v-else-if="member.loadLevel === 'light'"
          class="load-badge load-badge--neutral"
        >较轻</span>
      </div>
      <div class="timeline-track">
        <div class="timeline-grid">
          <div
            v-for="hour in hourMarks"
            :key="hour"
            class="timeline-grid-line"
          />
        </div>
        <div
          v-for="task in member.tasks"
          :key="task.id"
          :class="[
            'task-bar',
            `task-bar--${priorityMeta(task.priority).tone}`,
            { 'task-bar--conflict': isTaskInConflict(task, member) },
          ]"
          :style="getTaskPosition(task)"
          :title="`${task.taskType} - ${task.shipName} (${formatTime(task.startAt)}-${formatTime(task.endAt)})`"
        >
          <span class="task-bar-text">{{ task.shipName }}</span>
        </div>
      </div>
    </div>

    <div class="timeline-legend">
      <div class="legend-item">
        <span class="legend-dot legend-dot--danger" />
        <span>高优先级</span>
      </div>
      <div class="legend-item">
        <span class="legend-dot legend-dot--warn" />
        <span>中优先级</span>
      </div>
      <div class="legend-item">
        <span class="legend-dot legend-dot--neutral" />
        <span>低优先级</span>
      </div>
      <div class="legend-item">
        <span class="legend-dot legend-dot--conflict" />
        <span>时间冲突</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline-container {
  display: grid;
  gap: 12px;
}

.timeline-header,
.timeline-row {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 16px;
  align-items: center;
}

.timeline-header {
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(29, 43, 42, 0.1);
}

.timeline-label-col {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.crew-name {
  font-weight: 600;
  font-size: 0.95rem;
}

.crew-shift {
  font-size: 0.8rem;
  color: #5f7670;
}

.load-badge {
  display: inline-block;
  margin-top: 4px;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 0.7rem;
  width: fit-content;
}

.load-badge--danger {
  background: #f7ddd7;
  color: #a8432d;
}

.load-badge--warn {
  background: #fff1d2;
  color: #9a6b00;
}

.load-badge--neutral {
  background: #dce8f7;
  color: #2d5a8a;
}

.timeline-axis {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
}

.timeline-hour-mark {
  font-size: 0.75rem;
  color: #5f7670;
  text-align: left;
}

.timeline-track {
  position: relative;
  height: 48px;
  background: #f4f7f4;
  border-radius: 12px;
  overflow: hidden;
}

.timeline-grid {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
}

.timeline-grid-line {
  border-left: 1px dashed rgba(29, 43, 42, 0.08);
}

.task-bar {
  position: absolute;
  top: 8px;
  bottom: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.task-bar:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.task-bar--danger {
  background: #f7ddd7;
  border: 1px solid #e5b5aa;
}

.task-bar--warn {
  background: #fff1d2;
  border: 1px solid #e8d29b;
}

.task-bar--neutral {
  background: #dce8f7;
  border: 1px solid #b9cfe8;
}

.task-bar--conflict {
  background: repeating-linear-gradient(
    45deg,
    #f7ddd7,
    #f7ddd7 6px,
    #f0c4b8 6px,
    #f0c4b8 12px
  );
  border: 2px solid #c75a43;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.75; }
}

.task-bar-text {
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #1d2b2a;
}

.timeline-legend {
  display: flex;
  gap: 20px;
  padding-top: 12px;
  border-top: 1px solid rgba(29, 43, 42, 0.1);
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: #5f7670;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 4px;
}

.legend-dot--danger {
  background: #f7ddd7;
  border: 1px solid #e5b5aa;
}

.legend-dot--warn {
  background: #fff1d2;
  border: 1px solid #e8d29b;
}

.legend-dot--neutral {
  background: #dce8f7;
  border: 1px solid #b9cfe8;
}

.legend-dot--conflict {
  background: repeating-linear-gradient(
    45deg,
    #f7ddd7,
    #f7ddd7 3px,
    #f0c4b8 3px,
    #f0c4b8 6px
  );
  border: 1px solid #c75a43;
}

@media (max-width: 760px) {
  .timeline-header,
  .timeline-row {
    grid-template-columns: 80px 1fr;
    gap: 8px;
  }
  .timeline-label-col {
    font-size: 0.85rem;
  }
  .task-bar-text {
    font-size: 0.65rem;
  }
}
</style>
