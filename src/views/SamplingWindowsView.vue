<script setup>
import PanelSection from '../components/common/PanelSection.vue'
import WindowList from '../components/harbor/WindowList.vue'
import { harborWindows } from '../data/harborData'
</script>

<template>
  <div class="view-stack">
    <PanelSection title="采样窗口全览" badge="按时间排序">
      <WindowList :items="harborWindows" />
    </PanelSection>
  </div>
</template>

<style scoped>
.view-stack {
  display: grid;
}
</style>
