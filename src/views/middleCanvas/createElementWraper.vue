<template>
  <div class="creatElement"
    ref="creatElementRef"
    @mousedown.stop="$event => createElement($event)"
  >
    <div class="createBox" v-if="isStartRef" :style="{
        width: elementPositionRef.width + 'px',
        height: elementPositionRef.height + 'px',
        top: elementPositionRef.y + 'px',
        left: elementPositionRef.x + 'px'
    }"></div>
    
  </div>
</template>

<script lang="ts">
import { defineComponent,inject } from 'vue'
import useCreateElementWraper from '@/hooks/useCommCreateElement'
import useSelectDrawArea from "@/views/middleCanvas/hooks/useSelectDrawArea" 
export default defineComponent({
  name: 'creatElement',
  setup() {
        /**
         * 创建节点
         */
        const cancelSelectElement = inject<() => void>('cancelSelectElement') 
        const isCreateNode = true
        const creactElementShap = useCreateElementWraper(isCreateNode,cancelSelectElement)
        // useSelectDrawArea()
        return {
            ...creactElementShap
        }
  }
})
</script>
<style lang="scss" scoped>
  .creatElement{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    cursor: crosshair;
    .createBox{
        position: absolute;
        border: 2px solid #f40;
        z-index: 9999;
    }
  }
</style>