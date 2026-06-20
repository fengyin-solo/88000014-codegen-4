export function formatTime(isoString, locale = 'zh-CN') {
  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(isoString))
}

export function statusMeta(status) {
  const map = {
    sealed: {
      label: '已封存',
      tone: 'success',
    },
    recheck: {
      label: '待复检',
      tone: 'warn',
    },
    pending: {
      label: '待采样',
      tone: 'neutral',
    },
  }

  return map[status] ?? map.pending
}

export function priorityMeta(priority) {
  const map = {
    high: {
      label: '高优先级',
      tone: 'danger',
    },
    medium: {
      label: '中优先级',
      tone: 'warn',
    },
    low: {
      label: '低优先级',
      tone: 'neutral',
    },
  }

  return map[priority] ?? map.low
}
