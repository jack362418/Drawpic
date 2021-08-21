<template>
  <div class="operateShape" v-if="selectShapeRef">
      <div class="shapeWrapper" :style="{
        left: selectShapeRef.x + 'px',
        top: selectShapeRef.y + 'px',
        transform: 'rotate(0deg)'
      }">
          <div class="shape-element-operate">

          </div>
      </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent,watchEffect,ref } from 'vue'
import { useStore } from '@/store'
import { ShapeObj,State } from '@/store/modules/type'

export default defineComponent({
  name: 'operateShape',
  setup() {
    const store = useStore()
    const shapeElementList = computed<State['elementShapeArr']>(() => store.state.app.elementShapeArr)
    const selectShapeRef = ref<ShapeObj>() 
    const elementBorderRef = ref({})
    const getSelectElementShape = () => {
        const filterSelectShape = shapeElementList.value.filter(item => item.isSelect)
        if(filterSelectShape.length == 1) {
            selectShapeRef.value = {
                ...filterSelectShape[0]
            }

            console.log("selectShape",selectShapeRef.value)
        }
    }
    watchEffect(getSelectElementShape)
    
    return {
        selectShapeRef
    }
  }
})
</script>
<style lang="scss" scoped>
    .operateShape{
        .shapeWrapper{
            position: absolute;
            z-index: 9999;
            user-select: none;
        }
    }
</style>