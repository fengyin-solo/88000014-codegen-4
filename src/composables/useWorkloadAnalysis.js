import { computed } from 'vue'
import { crewTasks, harborCrew, shiftTimeRange } from '../data/harborData'

function parseTime(isoString) {
  return new Date(isoString).getTime()
}

function minutesBetween(startIso, endIso) {
  return Math.round((parseTime(endIso) - parseTime(startIso)) / 60000)
}

function hasOverlap(taskA, taskB) {
  const aStart = parseTime(taskA.startAt)
  const aEnd = parseTime(taskA.endAt)
  const bStart = parseTime(taskB.startAt)
  const bEnd = parseTime(taskB.endAt)
  return aStart < bEnd && bStart < aEnd
}

export function useWorkloadAnalysis() {
  const crewWithTasks = computed(() => {
    return harborCrew.map((member) => {
      const tasks = crewTasks
        .filter((t) => t.inspector === member.name)
        .sort((a, b) => parseTime(a.startAt) - parseTime(b.startAt))
      const totalMinutes = tasks.reduce(
        (sum, t) => sum + minutesBetween(t.startAt, t.endAt),
        0,
      )
      const highPriorityCount = tasks.filter((t) => t.priority === 'high').length
      const mediumPriorityCount = tasks.filter((t) => t.priority === 'medium').length
      const lowPriorityCount = tasks.filter((t) => t.priority === 'low').length
      const conflicts = []
      for (let i = 0; i < tasks.length; i++) {
        for (let j = i + 1; j < tasks.length; j++) {
          if (hasOverlap(tasks[i], tasks[j])) {
            conflicts.push([tasks[i].id, tasks[j].id])
          }
        }
      }
      const shift = shiftTimeRange[member.shift]
      let loadLevel = 'normal'
      if (conflicts.length > 0) {
        loadLevel = 'overload'
      } else if (totalMinutes > 360) {
        loadLevel = 'heavy'
      } else if (totalMinutes < 120) {
        loadLevel = 'light'
      }
      return {
        ...member,
        tasks,
        totalMinutes,
        totalHours: (totalMinutes / 60).toFixed(1),
        highPriorityCount,
        mediumPriorityCount,
        lowPriorityCount,
        conflicts,
        conflictCount: conflicts.length,
        loadLevel,
        shiftRange: shift,
      }
    })
  })
  const totalConflicts = computed(() =>
    crewWithTasks.value.reduce((sum, c) => sum + c.conflictCount, 0),
  )
  const overloadCrew = computed(() =>
    crewWithTasks.value.filter((c) => c.loadLevel === 'overload'),
  )
  const heavyLoadCrew = computed(() =>
    crewWithTasks.value.filter((c) => c.loadLevel === 'heavy'),
  )
  const lightLoadCrew = computed(() =>
    crewWithTasks.value.filter((c) => c.loadLevel === 'light'),
  )
  const totalTaskCount = computed(() => crewTasks.length)
  const highPriorityTasks = computed(() =>
    crewTasks.filter((t) => t.priority === 'high'),
  )
  function getTaskById(taskId) {
    return crewTasks.find((t) => t.id === taskId)
  }
  function getConflictTaskPairs(inspectorName) {
    const crew = crewWithTasks.value.find((c) => c.name === inspectorName)
    if (!crew) return []
    return crew.conflicts.map((pair) => pair.map((id) => getTaskById(id)))
  }
  return {
    crewWithTasks,
    totalConflicts,
    overloadCrew,
    heavyLoadCrew,
    lightLoadCrew,
    totalTaskCount,
    highPriorityTasks,
    getTaskById,
    getConflictTaskPairs,
  }
}
