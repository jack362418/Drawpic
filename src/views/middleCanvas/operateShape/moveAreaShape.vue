<template>
  <div class="moveAreaShape" v-if="maxAreaShapRef">
        <div class="shapeWrapper" :style="{
                left: maxAreaShapRef.x + 'px',
                top: maxAreaShapRef.y + 'px',
                width: maxAreaShapRef.width + 'px',
                height: maxAreaShapRef.height + 'px'
            }"
             @mousedown.stop="$event => moveAreaShape($event,maxAreaShapRef)"
        >
             <div class="shape-element-operate">
                <!-- 四条虚线 -->
                <template v-for="item in elementShapeOperate.elementBorderRef" :key="item.type">
                    <div :class="['borderLine',item.type]" :style="{
                        width: item.style.width + 'px',
                        height: item.style.height + 'px',
                        top: item.style.top + 'px',
                        left: item.style.left + 'px'
                    }"></div>
                </template>
            </div>
        </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent,watchEffect,ref } from 'vue'
import { useStore } from '@/store'
import { ShapeObj,State } from '@/store/modules/type'
import useOperateShapeLine from '../hooks/useOperateShapeLine'
import useMoveAreaShape from '../hooks/useMoveAreaShap'

export default defineComponent({
  name: 'moveAreaShape',
  setup() {
      const store = useStore()
      const maxAreaShapRef = ref<ShapeObj>() 
      
      const elementShapeOperate = ref()
      const getMultipleShapeArr = () => {
          maxAreaShapRef.value = undefined
          const multipleShapeArr = computed<State['multipleShapeArr']>(() => store.state.app.multipleShapeArr)
          if(multipleShapeArr.value.length) {
                let minX = 0
                let minY = 0
                let maxWidth = 0
                let maxheight = 0
                const maxXY = multipleShapeArr.value.map(item => {
                    return {
                        ...item,
                        maxY: item.y+item.height,
                        maxX: item.x+item.width
                    }
                })
                
                minX = multipleShapeArr.value.sort((it1,it2) => it1.x - it2.x)[0].x
                const maxWidthArr = maxXY.sort((it1,it2) => it1.maxX - it2.maxX)
                maxWidth = maxWidthArr[maxWidthArr.length-1].maxX - minX
                minY = multipleShapeArr.value.sort((it1,it2) => it1.y - it2.y)[0].y
                const maxheightArr = maxXY.sort((it1,it2) => it1.maxY - it2.maxY)
                maxheight = maxheightArr[maxheightArr.length-1].maxY - minY

                maxAreaShapRef.value = {
                    ...maxXY[0],
                    x: minX,
                    y: minY,
                    width: maxWidth,
                    height: maxheight
                }
                elementShapeOperate.value = useOperateShapeLine(maxAreaShapRef.value)
                store.commit("SET_MULTIPLE_TYPE",true)
          }
      }

      watchEffect(getMultipleShapeArr)

      const { moveAreaShape } = useMoveAreaShape()

      return {
          maxAreaShapRef,
          elementShapeOperate,
          moveAreaShape
      }
  }
})
</script>
<style lang="scss" scoped>
    .moveAreaShape{
        .shapeWrapper{
            position: absolute;
            z-index: 9999;
            user-select: none;
            cursor: move;
            .shape-element-operate{
                .borderLine{
                    position: absolute;
                    width: 0;
                    height: 0;
                    left: 0;
                    top: 0;
                    border: 0 dashed#f40;
                }
                .borderLine.top{
                    border-top-width: 2px;
                }
                .borderLine.bottom{
                    border-bottom-width: 2px;
                }
                .borderLine.left{
                    border-left-width: 2px;
                }
                .borderLine.right{
                    border-right-width: 2px;
                }
                
            }
        }
    }
</style>