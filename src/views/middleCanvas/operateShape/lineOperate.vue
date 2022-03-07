<template>
  <div class="lineOperate" v-if="elementShapeOperate.elementSpotRef && updateStraightLineF">
    <template v-for="item in elementShapeOperate.elementSpotRef" :key="item.type">
        <div :class="['resize-operate',item.type]" :style="{
                top: item.style.top + 'px',
                left: item.style.left + 'px'
            }"
            @mousedown.stop="$event => updateStraightLineF($event,item)"
        > </div>
    </template>
    
  </div>
</template>

<script lang="ts">
import { defineComponent,PropType,watchEffect,ref} from 'vue'
import { ShapeObj } from '@/store/modules/type'
import { viewPosition } from '@/types/shape'
import useStraightOperateLine from '../hooks/useStraightOperateLine'
export default defineComponent({
  name: 'lineOperate',
  props:{
      selectShape:{
          type: Object as PropType<ShapeObj>,
          required: true,
      },
      viewportObjRef:{
          type: Object as PropType<viewPosition>,
          required: true,
      }
  },
  setup(props) {
     const elementShapeOperate = ref({
         elementSpotRef:{}
     })
     let updateStraightLineF = undefined
     watchEffect(() => {
        const { elementSpotRef,updateStraightLine } = useStraightOperateLine(props.selectShape,props.viewportObjRef)
        elementShapeOperate.value.elementSpotRef = elementSpotRef.value
        updateStraightLineF = updateStraightLine
     })
     
     return {
        elementShapeOperate,
        updateStraightLineF
     }
  }
})
</script>
<style lang="scss" scoped>
    .lineOperate{
        position: relative;
        .resize-operate{
           position: absolute;
            width: 10px;
            height: 10px;
            left: 0;
            top: 0;
            margin: -5px 0 0 -5px;
            border: 1px solid #f40;
            background-color: #fff;
            border-radius: 1px;
        }         
    }
</style>