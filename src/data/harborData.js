export const harborNavigation = [
  { label: '运行总览', to: '/' },
  { label: '采样窗口', to: '/windows' },
  { label: '检疫记录', to: '/records' },
]

export const harborSummary = {
  hero: {
    title: '压载水采样窗口排班板',
    description:
      '围绕靠港窗口、检疫班组和复检压力做排班编排，适合港口检疫团队作为前端原型继续扩展。',
    windowLabel: '今日采样窗口',
    windowCount: 6,
    note: '晚班只保留复核与补录任务。',
  },
  stats: [
    { label: '待复检任务', value: 2, tone: 'warn' },
    { label: '高风险备注', value: 5, tone: 'danger' },
    { label: '靠泊船次', value: 4, tone: 'neutral' },
  ],
}

export const harborRules = [
  '同船两次采样最少间隔 90 分钟。',
  '高盐度舱位先取空白样，再取正式样。',
  '异常荧光记录必须带舱位照片编号。',
  '19:00 后只保留复核任务，不新增首检。',
]

export const harborWindows = [
  {
    shipName: '浙海 17',
    berth: '3 号泊位',
    tanks: ['B2', 'C1'],
    startAt: '2026-06-20T06:40:00+08:00',
    priority: 'high',
    inspector: '王岚',
    note: '靠泊后 15 分钟内取首样。',
  },
  {
    shipName: 'North Sora',
    berth: '5 号泊位',
    tanks: ['C1'],
    startAt: '2026-06-20T09:20:00+08:00',
    priority: 'medium',
    inspector: '赵冉',
    note: '上午完成复测并同步浊度记录。',
  },
  {
    shipName: '绿岛拖轮补给船',
    berth: '2 号临泊位',
    tanks: ['A1 尾舱'],
    startAt: '2026-06-20T13:10:00+08:00',
    priority: 'medium',
    inspector: '陈策',
    note: '靠港时间短，样本瓶提前准备。',
  },
  {
    shipName: 'Blue Kestrel',
    berth: '7 号泊位',
    tanks: ['A4'],
    startAt: '2026-06-20T17:45:00+08:00',
    priority: 'low',
    inspector: '苏蔚',
    note: '待代理回传完整舱图后执行。',
  },
]

export const harborRecords = [
  {
    shipName: '浙海 17',
    sampleCode: 'BW-2406-B2',
    status: 'sealed',
    assignee: '王岚',
    note: '样本瓶温度正常，已封存。',
  },
  {
    shipName: 'North Sora',
    sampleCode: 'BW-2406-C1',
    status: 'recheck',
    assignee: '赵冉',
    note: '显微计数偏高，下午复测。',
  },
  {
    shipName: 'Blue Kestrel',
    sampleCode: 'BW-2406-A4',
    status: 'pending',
    assignee: '苏蔚',
    note: '外轮代理尚未回传舱图。',
  },
]

export const harborCrew = [
  {
    name: '王岚',
    shift: '早班',
    focus: '高盐度首检',
  },
  {
    name: '赵冉',
    shift: '中班',
    focus: '显微复测',
  },
  {
    name: '苏蔚',
    shift: '晚班',
    focus: '异常样本补录',
  },
]
