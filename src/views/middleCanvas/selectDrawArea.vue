<template>
  <div class="selectDrawArea" ref="creatElementRef" @mousedown.stop="$event => createElement($event)">
    <div class="areaBox" 
       v-if="isStartRef && (elementPositionRef.width >= 10 || elementPositionRef.height >= 10)"
       :style="{
        width: elementPositionRef.width + 'px',
        height: elementPositionRef.height + 'px',
        top: elementPositionRef.y + 'px',
        left: elementPositionRef.x + 'px'
       }"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent,inject } from 'vue'
import useCommCreateElement from '@/hooks/useCommCreateElement'
export default defineComponent({
  name: 'selectDrawArea',
  setup() {
    
        /**
         * 绘制鼠标区域
        */
        const cancelSelectElement = inject<() => void>('cancelSelectElement') 
        const isCreateNode = false
        const selectDrawArea = useCommCreateElement(isCreateNode,cancelSelectElement)

        return {
            ...selectDrawArea
        }
  }
})
</script>
<style lang="scss" scoped>
    .selectDrawArea{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
      .areaBox{
          background: #99ccff;
          position: absolute;
          border:  2px solid #0000DD;
          z-index: 9999;
          opacity: 0.5;
      }
    }
</style>