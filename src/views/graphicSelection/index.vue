<template>
  <div class="graphicSelection">
    <a-card size="small" title="Small size card" style="width: 300px" class="selectTool">
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'graphicSelection'
})
</script>
<style lang="scss" scoped>
    .graphicSelection{
        height: 100%;
        .selectTool{
            height: 100%;
        }
    }
</style>