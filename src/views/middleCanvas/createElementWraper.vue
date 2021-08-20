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
import { defineComponent,ref,onMounted,reactive } from 'vue'
import { useStore } from '@/store'
export default defineComponent({
  name: 'creatElement',
  setup() {
        const store = useStore()
        const elementPositionRef = ref({
            width:0,
            height:0,
            x:0,
            y:0
        })
        const isStartRef = ref<boolean>(false)
        const el = reactive({
            x:0,
            y:0
        })
        const creatElementRef = ref<HTMLElement>()
        onMounted(() => {
            if (!creatElementRef.value) return
            let {x,y} = creatElementRef.value.getBoundingClientRect()
            el.x = Math.floor(x)
            el.y = Math.floor(y) 
        })  
        
        const createElement = (e:MouseEvent) => {
            isStartRef.value = true
            let clientX = e.clientX
            let clientY = e.clientY
            elementPositionRef.value.x = clientX - el.x
            elementPositionRef.value.y = clientY - el.y
            /**
             * 上下左右均可移动
             */
            document.onmousemove = (e:MouseEvent) => {
                elementPositionRef.value.width = Math.abs(e.clientX - clientX) 
                elementPositionRef.value.height = Math.abs(e.clientY - clientY) 
                if(e.clientX > clientX && e.clientY < clientY) {
                  elementPositionRef.value.y = e.clientY - el.y
                }
                if(e.clientX < clientX && e.clientY > clientY) {
                  elementPositionRef.value.x = e.clientX - el.x
                }
                if(e.clientX < clientX && e.clientY < clientY) {
                  elementPositionRef.value.x = e.clientX - el.x
                  elementPositionRef.value.y = e.clientY - el.y
                }
                if(e.clientX > clientX && e.clientY > clientY) {
                  elementPositionRef.value.x = clientX - el.x
                  elementPositionRef.value.y = clientY - el.y
                }
                if(e.clientX == clientX) {
                   elementPositionRef.value.x = clientX - el.x
                }
                if(e.clientY == clientY) {
                  elementPositionRef.value.y = clientY - el.y
                }
            }
            document.onmouseup = (e:MouseEvent) => {
                document.onmousemove = null
                document.onmouseup = null
                store.commit("CANCEL_CREATE_EL",false)
            }
        }

        return {
            createElement,
            creatElementRef,
            elementPositionRef,
            isStartRef
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
    z-index: 2;
    cursor: crosshair;
    .createBox{
        position: absolute;
        border: 2px solid #409EFF
    }
  }
</style>