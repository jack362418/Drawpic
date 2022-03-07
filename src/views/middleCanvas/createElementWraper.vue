<template>
  <div class="creatElement"
    ref="creatElementRef"
    @mousedown.stop="$event => createElement($event)"
  >
    <div :class="!singleGraphRef.isLine ? 'createBox':'createLine'" v-if="isStartRef" :style="{
        width: elementPositionRef.width + 'px',
        height: elementPositionRef.height + 'px',
        top: elementPositionRef.y + 'px',
        left: elementPositionRef.x + 'px'
    }">
      <div v-if="singleGraphRef.isLine">
        <svg
          overflow="visible" 
          :width="svgStyleRef.width"
          :height="svgStyleRef.height"
          version="1.1"
        >
          <path
            :d="linePathRef" 
            class="shape-path"
            vector-effect="non-scaling-stroke" 
            stroke-linecap="butt" 
            stroke-miterlimit="8"
            stroke-linejoin="inherit"
            fill="transparent"
            stroke="#409EFF"
            stroke-width="2" 
          >
          </path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,inject,computed, ref } from 'vue'
import useCreateElementWraper from '@/hooks/useCommCreateElement'
import { useStore } from '@/store'
export default defineComponent({
  name: 'creatElement',
  setup() {
        const store = useStore()
        const singleGraphRef = computed(() => store.state.app.singleGraph)
     
        /**
         * 创建节点
         */
        const cancelSelectElement = inject<() => void>('cancelSelectElement') 
        const isCreateNode = true
        const creactElementShap = useCreateElementWraper(isCreateNode,cancelSelectElement)
        return {
            ...creactElementShap,
            singleGraphRef
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
    .createLine{
      position: absolute;
      z-index: 9999;
    }
    svg:not(:root) {
      overflow: visible;
    }
  }
</style>

