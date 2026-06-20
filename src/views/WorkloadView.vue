<script setup>
import { computed } from 'vue'
import PanelSection from '../components/common/PanelSection.vue'
import WorkloadSummary from '../components/harbor/WorkloadSummary.vue'
import WorkloadTimeline from '../components/harbor/WorkloadTimeline.vue'
import { useWorkloadAnalysis } from '../composables/useWorkloadAnalysis'
import { formatTime, priorityMeta } from '../utils/formatters'

const {
  crewWithTasks,
  totalConflicts,
  totalTaskCount,
  highPriorityTasks,
  getConflictTaskPairs,
} = useWorkloadAnalysis()

const conflictDetails = computed(() => {
  const details = []
  crewWithTasks.value.forEach((member) => {
    if (member.conflictCount > 0) {
      const pairs = getConflictTaskPairs(member.name)
      details.push({
        inspector: member.name,
        shift: member.shift,
        pairs,
      })
    }
  })
  return details
})
</script>

<template>
  <div class="view-stack">
    <PanelSection title="班组负载概览" badge="实时统计">
      <WorkloadSummary
        :crew="crewWithTasks"
        :total-conflicts="totalConflicts"
        :total-task-count="totalTaskCount"
        :high-priority-count="highPriorityTasks.length"
      />
    </PanelSection>

    <PanelSection title="任务时间轴" badge="06:00 - 22:00">
      <WorkloadTimeline :crew="crewWithTasks" />
    </PanelSection>

    <section class="two-column">
      <PanelSection title="检疫员任务详情" badge="逐人列表">
        <div class="crew-detail-list">
          <article
            v-for="member in crewWithTasks"
            :key="member.name"
            class="crew-detail-card"
          >
            <header class="crew-detail-head">
              <div>
                <h4>{{ member.name }}</h4>
                <p>{{ member.shift }} · {{ member.focus }}</p>
              </div>
              <div class="crew-stats">
                <span class="stat-pill stat-pill--hours">
                  {{ member.totalHours }}h
                </span>
                <span
                  v-if="member.highPriorityCount > 0"
                  class="stat-pill stat-pill--high"
                >
                  高优 {{ member.highPriorityCount }}
                </span>
              </div>
            </header>
            <div class="task-list">
              <div
                v-for="task in member.tasks"
                :key="task.id"
                :class="[
                  'task-item',
                  { 'task-item--conflict': member.conflicts.some((p) => p.includes(task.id)) },
                ]"
              >
                <div class="task-time">
                  {{ formatTime(task.startAt) }} - {{ formatTime(task.endAt) }}
                </div>
                <div class="task-info">
                  <div class="task-title-row">
                    <span class="task-name">{{ task.taskType }}</span>
                    <span
                      :class="[
                        'tone-pill',
                        `tone-pill--${priorityMeta(task.priority).tone}`,
                      ]"
                    >
                      {{ priorityMeta(task.priority).label }}
                    </span>
                  </div>
                  <p class="task-ship">
                    {{ task.shipName }} · {{ task.berth }}
                    <template v-if="task.tanks.length > 0">
                      · {{ task.tanks.join('、') }}
                    </template>
                  </p>
                  <small class="task-note">{{ task.note }}</small>
                </div>
              </div>
            </div>
          </article>
        </div>
      </PanelSection>

      <PanelSection
        v-if="conflictDetails.length > 0"
        title="冲突预警"
        badge="需调整"
      >
        <div class="conflict-list">
          <div
            v-for="item in conflictDetails"
            :key="item.inspector"
            class="conflict-group"
          >
            <h4 class="conflict-inspector">{{ item.inspector }}（{{ item.shift }}）</h4>
            <div
              v-for="(pair, idx) in item.pairs"
              :key="idx"
              class="conflict-pair"
            >
              <div
                v-for="task in pair"
                :key="task.id"
                class="conflict-task"
              >
                <div class="conflict-task-time">
                  {{ formatTime(task.startAt) }} - {{ formatTime(task.endAt) }}
                </div>
                <div class="conflict-task-info">
                  <strong>{{ task.taskType }}</strong>
                  <p>{{ task.shipName }} · {{ task.berth }}</p>
                </div>
              </div>
              <div class="conflict-arrow">⇄</div>
            </div>
          </div>
        </div>
      </PanelSection>

      <PanelSection
        v-else
        title="排班状态"
        badge="正常"
      >
        <div class="all-clear">
          <div class="all-clear-icon">✓</div>
          <h4>当前无时间冲突</h4>
          <p>所有检疫员任务安排合理，可继续执行。</p>
        </div>
      </PanelSection>
    </section>
  </div>
</template>

<style scoped>
.view-stack {
  display: grid;
  gap: 24px;
}

.two-column {
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 24px;
}

.crew-detail-list {
  display: grid;
  gap: 16px;
}

.crew-detail-card {
  padding: 16px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.72);
}

.crew-detail-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 14px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(29, 43, 42, 0.08);
}

.crew-detail-head h4 {
  margin: 0;
  font-size: 1rem;
}

.crew-detail-head p {
  margin: 4px 0 0;
  font-size: 0.85rem;
  color: #5f7670;
}

.crew-stats {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.stat-pill {
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 500;
}

.stat-pill--hours {
  background: #e7f0eb;
  color: #2d5a4a;
}

.stat-pill--high {
  background: #f7ddd7;
  color: #a8432d;
}

.task-list {
  display: grid;
  gap: 10px;
}

.task-item {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  background: #f4f7f4;
}

.task-item--conflict {
  background: repeating-linear-gradient(
    45deg,
    #fbeae4,
    #fbeae4 6px,
    #f7ddd7 6px,
    #f7ddd7 12px
  );
  border: 1px solid #e5b5aa;
}

.task-time {
  font-size: 0.85rem;
  font-weight: 600;
  color: #35524c;
}

.task-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.task-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.task-name {
  font-weight: 600;
  font-size: 0.92rem;
}

.task-ship {
  margin: 0;
  font-size: 0.85rem;
  color: #5f7670;
}

.task-note {
  font-size: 0.78rem;
  color: #6b837d;
}

.tone-pill {
  padding: 4px 9px;
  border-radius: 999px;
  font-size: 0.72rem;
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

.conflict-list {
  display: grid;
  gap: 18px;
}

.conflict-inspector {
  margin: 0 0 10px;
  font-size: 0.95rem;
  color: #a8432d;
}

.conflict-pair {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 10px;
  align-items: stretch;
}

.conflict-task {
  padding: 12px;
  border-radius: 12px;
  background: #fbeae4;
  border: 1px solid #e5b5aa;
}

.conflict-task-time {
  font-size: 0.8rem;
  font-weight: 600;
  color: #a8432d;
}

.conflict-task-info strong {
  display: block;
  margin-top: 4px;
  font-size: 0.9rem;
}

.conflict-task-info p {
  margin: 2px 0 0;
  font-size: 0.82rem;
  color: #7a5a52;
}

.conflict-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #c75a43;
  font-weight: 700;
}

.all-clear {
  text-align: center;
  padding: 30px 20px;
}

.all-clear-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 14px;
  border-radius: 50%;
  background: #d8efe0;
  color: #2d7a4a;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.all-clear h4 {
  margin: 0 0 6px;
  font-size: 1.05rem;
  color: #2d5a4a;
}

.all-clear p {
  margin: 0;
  font-size: 0.88rem;
  color: #5f7670;
}

@media (max-width: 980px) {
  .two-column {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 680px) {
  .task-item {
    grid-template-columns: 1fr;
    gap: 6px;
  }
  .conflict-pair {
    grid-template-columns: 1fr;
  }
  .conflict-arrow {
    transform: rotate(90deg);
  }
}
</style>
