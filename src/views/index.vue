<template>
  <div class="index flex">
    <graphicSelection
      :style="{
        width: visibleAreaSizeRef.graphicWidth + 'px'
      }" 
    />
    <middleCanvas 
      :style="{
        width: visibleAreaSizeRef.middleWidth + 'px'
      }" 
    />
    <toolsMenu 
      :style="{
        width: visibleAreaSizeRef.toolsWidth + 'px'
      }" 
    />
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs,computed } from 'vue'
import graphicSelection from '@/views/graphicSelection/index.vue'
import middleCanvas from '@/views/middleCanvas/index.vue'
import toolsMenu from '@/views/toolsMenu/index.vue'
import { useStore } from '@/store'

export default defineComponent({
  name: 'index',
  components:{
    graphicSelection,
    middleCanvas,
    toolsMenu
  },
  setup() {
    const store = useStore()
    
    const visibleAreaSizeRef = computed(() => store.getters.layout)

    return {
      visibleAreaSizeRef
    }
  },
})
</script>

<style lang="scss" scoped>
  .index{
    height: 100%;
  }
</style>

