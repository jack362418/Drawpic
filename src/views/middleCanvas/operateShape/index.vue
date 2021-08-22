<template>
  <div class="operateShape" v-if="selectShapeRef">
        <div class="shapeWrapper" :style="{
            left: selectShapeRef.x + 'px',
            top: selectShapeRef.y + 'px',
            transform: 'rotate(0deg)'
        }">
            <div class="shape-element-operate" >
                <!-- 四条虚线 -->
                <template v-for="item in elementShapeOperate.elementBorderRef" :key="item.type">
                    <div :class="['borderLine',item.type]" :style="{
                        width: item.style.width + 'px',
                        height: item.style.height + 'px',
                        top: item.style.top + 'px',
                        left: item.style.left + 'px'
                    }"></div>
                </template>
                <!-- 四个顶点 -->
                <template v-for="item in elementShapeOperate.elementSpotRef" :key="item.type">
                    <div :class="['resize-operate',item.type]" :style="{
                        top: item.style.top + 'px',
                        left: item.style.left + 'px'
                    }"> </div>
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

export default defineComponent({
  name: 'operateShape',
  setup() {
    const store = useStore()
    const shapeElementList = computed<State['elementShapeArr']>(() => store.state.app.elementShapeArr)
    const selectShapeRef = ref<ShapeObj>() 
    const elementShapeOperate = ref()
    
    const getSelectElementShape = () => {
        const filterSelectShape = shapeElementList.value.filter(item => item.isSelect)
        if(filterSelectShape.length == 1) {
            selectShapeRef.value = {
                ...filterSelectShape[0]
            }
            elementShapeOperate.value = useOperateShapeLine(selectShapeRef.value)
        }
    }
    watchEffect(getSelectElementShape)
    
    return {
        selectShapeRef,
        elementShapeOperate
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
        }
    }
</style>