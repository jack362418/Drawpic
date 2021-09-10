<template>
  <div class="elementCenterUi">
    <div v-for="(it,idx) in elementShapeArr" :key="idx" class="shapeItem"> 
        <div class="shape" :style="{
                top: it.y + 'px',
                left: it.x + 'px',
                zIndex: idx,
                transform: `rotate(${it.rotate}deg)`
            }"
            :class="{
                'shapeMove': it.isSelect
            }"
            @mousedown.stop="$event => changeShapEleSize($event,it)"
        >
            <template v-if="!it.isLine">
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
                <!-- 双击编辑文字 -->
                <div class="shape-text" @dblclick="changeShapeText(it)">
                    <div class="editor">
                        <div :contenteditable="it.isDbclick" :class="{'editorTable': it.isDbclick}" v-html="it.textShape.text" v-if="it.isDbclick" ref="editorShapeEleRef"> </div>
                        <div v-if="!it.isDbclick">
                            <div v-html="it.textShape.text"></div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else> 
                <!-- 直线 -->
                <lineTool :shapeItem='it' :idx='idx' :lineShape='it.lineShape'/>
            </template>
            
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,computed, ref } from 'vue'
import { useStore } from '@/store'
import useChangeShapSize from "./hooks/useChangeShapSize"
import { ShapeObj } from '@/store/modules/type'
import lineTool from '@/components/lineTool.vue'
export default defineComponent({
  name: 'elementCenterUi',
  components:{
      lineTool
  },
  setup() {
      const store = useStore()
      const editorShapeEleRef = ref<HTMLElement>()
      const elementShapeArr = computed(() => {
          return store.state.app.elementShapeArr
      })

      const setShapeHtml = () => {
            if(!editorShapeEleRef.value) return
            let currentSelectShap = store.state.app.elementShapeArr.filter(item => item.isSelect)?.[0]
            if(currentSelectShap && currentSelectShap.textShape?.text !== editorShapeEleRef.value?.innerHTML) {
                const innerHtml = editorShapeEleRef.value?.innerHTML
                currentSelectShap.textShape.text = innerHtml+""
                currentSelectShap.isDbclick = false
                store.commit("UPDATE_ELEMENT_SHAPE",currentSelectShap)
            }
      }

      const { changeShapEleSize } = useChangeShapSize(setShapeHtml)
    
      /** 双击编辑 */
      const changeShapeText = (it:ShapeObj) => {
         it.isDbclick = true
         store.commit("CANCEL_SELECT_SHAPE",it)
      }
      return {
          elementShapeArr,
          changeShapEleSize,
          changeShapeText,
          setShapeHtml,
          editorShapeEleRef
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
        .shape-text{
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            flex-direction: column;
            padding: 10px;
            word-break: break-word;
            justify-content: center;
            .editor{
                .editorTable{
                    outline: 0;
                    border: 0;
                    word-break: break-word;
                    cursor: text;
                }
            }
        }
    }
</style>