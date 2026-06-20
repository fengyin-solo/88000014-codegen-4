<template>
  <div class="page-shell">
    <header class="hero">
      <div class="hero-copy">
        <p class="eyebrow">Harbor Utility</p>
        <h1>压载水采样窗口排班板</h1>
        <p class="lead">
          面向沿海港务检疫人员的单页排班工具，用来整理不同船期的采样时段、检测舱位和风险备注。
        </p>
      </div>
      <div class="hero-card">
        <span>今日采样窗口</span>
        <strong>6 个</strong>
        <p>低频但要求极细，适合小团队临时协作。</p>
      </div>
    </header>

    <main class="content-grid">
      <section class="panel">
        <div class="panel-head">
          <h2>船期安排</h2>
          <span class="pill">06:00 - 19:00</span>
        </div>
        <div class="schedule-list">
          <article class="schedule-item">
            <div>
              <h3>浙海 17</h3>
              <p>3 号泊位 / 压载舱 B2、C1</p>
            </div>
            <strong>06:40</strong>
          </article>
          <article class="schedule-item">
            <div>
              <h3>North Sora</h3>
              <p>冷却后复测 / 重点查看浊度异常</p>
            </div>
            <strong>09:20</strong>
          </article>
          <article class="schedule-item">
            <div>
              <h3>绿岛拖轮补给船</h3>
              <p>仅取尾舱样本 / 靠港时间短</p>
            </div>
            <strong>13:10</strong>
          </article>
          <article class="schedule-item">
            <div>
              <h3>Blue Kestrel</h3>
              <p>需同步上传显微镜照片编号</p>
            </div>
            <strong>17:45</strong>
          </article>
        </div>
      </section>

      <section class="panel accent-panel">
        <div class="panel-head">
          <h2>采样规则速览</h2>
          <span class="pill soft">现场口径</span>
        </div>
        <ul class="rule-list">
          <li>同船两次采样最少间隔 90 分钟。</li>
          <li>高盐度舱位先取空白样，再取正式样。</li>
          <li>异常荧光记录必须带舱位照片编号。</li>
          <li>19:00 后只保留复核任务，不新增首检。</li>
        </ul>
        <div class="metrics">
          <div>
            <span>待复检</span>
            <strong>2</strong>
          </div>
          <div>
            <span>高风险备注</span>
            <strong>5</strong>
          </div>
        </div>
      </section>

      <section class="panel wide-panel">
        <div class="panel-head">
          <h2>检疫记录</h2>
          <span class="pill">按优先级排序</span>
        </div>
        <div class="log-table">
          <div class="log-row log-head">
            <span>船名</span>
            <span>样本标签</span>
            <span>状态</span>
            <span>备注</span>
          </div>
          <div class="log-row">
            <span>浙海 17</span>
            <span>BW-2406-B2</span>
            <span class="status status-ok">已封存</span>
            <span>样本瓶温度正常</span>
          </div>
          <div class="log-row">
            <span>North Sora</span>
            <span>BW-2406-C1</span>
            <span class="status status-warn">待复检</span>
            <span>显微计数偏高，下午复测</span>
          </div>
          <div class="log-row">
            <span>Blue Kestrel</span>
            <span>BW-2406-A4</span>
            <span class="status status-idle">待采样</span>
            <span>外轮代理尚未回传舱图</span>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
