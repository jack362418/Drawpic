<template>
  <div class="graphicSelection" @click="handleCloseAllPop">
    <a-card size="small"  class="selectTool">
        <theme />
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import theme from './theme.vue'
import { useStore } from '@/store' 
export default defineComponent({
  name: 'graphicSelection',
  components: {
    theme
  },
  setup() {
    const store = useStore()
    const handleCloseAllPop = () => {
            store.commit("CLOSE_ALL_POP")
    } 
    return { 
        handleCloseAllPop
    }
  }
})
</script>
<style lang="scss" scoped>
    .graphicSelection{
        height: 100%;
        overflow: auto;
        .selectTool{
            height: 100%;
        }
    }
</style>