<script setup>
import { RouterView } from 'vue-router'
import AppHeader from './components/common/AppHeader.vue'
import AppSidebar from './components/common/AppSidebar.vue'
import { harborNavigation } from './data/harborData'
</script>

<template>
  <div class="app-shell">
    <AppSidebar
      title="Harbor Utility"
      subtitle="压载水采样排班"
      :items="harborNavigation"
    />
    <div class="app-main">
      <AppHeader
        eyebrow="Field Console"
        title="港口压载水采样协同台"
        description="按正常前端项目方式拆分的多视图结构，方便后续接接口、补状态管理和继续扩展业务模块。"
      />
      <RouterView />
    </div>
  </div>
</template>
