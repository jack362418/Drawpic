<template>
  <div class="graphicSelection">
    <a-card size="small"  class="selectTool">
        <theme />
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import theme from './theme.vue'
export default defineComponent({
  name: 'graphicSelection',
  components: {
    theme
  },

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