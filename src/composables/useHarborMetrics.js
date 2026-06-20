import { computed } from 'vue'

import { harborCrew, harborRecords, harborWindows } from '../data/harborData'

export function useHarborMetrics() {
  const totalWindows = computed(() => harborWindows.length)
  const pendingRecords = computed(
    () => harborRecords.filter((item) => item.status === 'pending').length,
  )
  const recheckRecords = computed(
    () => harborRecords.filter((item) => item.status === 'recheck').length,
  )
  const activeInspectors = computed(() => harborCrew.length)

  return {
    totalWindows,
    pendingRecords,
    recheckRecords,
    activeInspectors,
  }
}
