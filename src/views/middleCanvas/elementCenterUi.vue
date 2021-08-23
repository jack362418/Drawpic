<template>
  <div class="elementCenterUi">
    <div v-for="(it,idx) in elementShapeArr" :key="idx" class="shapeItem"> 
        <div class="shape" :style="{
                top: it.y + 'px',
                left: it.x + 'px',
                zIndex: idx
            }"
            :class="{
                'shapeMove': it.isSelect
            }"
            @mousedown.stop="$event => changeShapEleSize($event,it)"
        >
            <svg
                overflow="visible" 
                :width="it.width"
                :height="it.height"
                xmlns="http://www.w3.org/2000/svg" 
                xmlnsXlink="http://www.w3.org/1999/xlink" 
                version="1.1"
                style="overflow:visible"
            > 
                <g 
                    :transform="`scale(${it.width / (it.viewBox)}, ${it.height / it.viewBox}) translate(0,0) matrix(1,0,0,1,0,0)`"
                    >
                    
                    <path
                        class="shape-path"
                        vector-effect="non-scaling-stroke" 
                        stroke-linecap="butt" 
                        stroke-miterlimit="8"
                        stroke-linejoin="inherit"
                        fill="#409EFF"
                        stroke="#409EFF"
                        stroke-width="2" 
                        :d="it.path"
                    ></path>
                </g>
            </svg>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,computed } from 'vue'
import { useStore } from '@/store'
import useChangeShapSize from "./hooks/useChangeShapSize"

export default defineComponent({
  name: 'elementCenterUi',
  setup() {
      const store = useStore()
      const elementShapeArr = computed(() => store.state.app.elementShapeArr)

      const { changeShapEleSize } = useChangeShapSize()

      return {
          elementShapeArr,
          changeShapEleSize
      }
  }
})
</script>
<style lang="scss" scoped>
    .elementCenterUi{
        position: relative;
        .shape{
            position: absolute;
        }
        .shapeMove{
            cursor: move;
        }
    }
</style>