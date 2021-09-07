<template>
  <div class="graphicSelection">
    <a-card size="small" title="图形"  class="selectTool">
        <div class="wrapper-tool">
          <a-collapse default-active-key="1" :bordered="false" accordion>
            <template >
              <a-icon type="caret-right" />
            </template>
            <a-collapse-panel v-for="(item,index) in shapeSvgRef" :key="index" :header="item.type">
              <div v-for="(it,idx) in item.children" :key="idx" class="shapeItem" @click="selectShap(it)"> 
                <template v-if="!it.isLine">
                  <svg 
                    overflow="visible" 
                    width="18"
                    height="18"
                    xmlns="http://www.w3.org/2000/svg" 
                    xmlnsXlink="http://www.w3.org/1999/xlink" 
                    version="1.1"
                  > 
                    <g 
                      :transform="`scale(${20 / it.viewBox}, ${20 / it.viewBox}) translate(0,0) matrix(1,0,0,1,0,0)`"
                      >
                        <path 
                          class="shape-path"
                          vector-effect="non-scaling-stroke" 
                          stroke-linecap="butt" 
                          stroke-miterlimit="8"
                          stroke-linejoin="inherit"
                          fill="transparent"
                          stroke="#999"
                          stroke-width="2" 
                          :d="it.path"
                        ></path>
                    </g>
                  </svg>
                </template>
                <template v-else> 
                  <!-- 直线 -->
                  <lineTool :shapeItem='it' :idx='idx'/>
                </template>
              </div>
            </a-collapse-panel>
          </a-collapse>
        </div>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue'
import { shapeSvg } from '@/config/shapeSvg'
import { ChildrenOption } from '@/types/shape' 
import { useStore } from '@/store'
import lineTool from '@/components/lineTool.vue'
export default defineComponent({
  name: 'graphicSelection',
  components:{
    lineTool
  },
  setup() {
    const store = useStore()
    const shapeSvgRef = ref(shapeSvg)
    
    const selectShap = (shape:ChildrenOption) => {
      // store.commit("CANCEL_ALL_SELECT_SHAPE")
      store.commit("SET_SIGN_PATH",shape)
    }

    return {
      shapeSvgRef,
      selectShap
    }
  }
})
</script>
<style lang="scss" scoped>
    .graphicSelection{
        height: 100%;
        .selectTool{
            height: 100%;
        }
        /deep/ .ant-card{
          display: flex;
          flex-direction: column;
        }
        /deep/ .ant-card-body{
          padding: 0;
          overflow: auto;
        }
        /deep/ .ant-collapse-content-box{
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          .shapeItem{
            display: flex;
            justify-content: center;
            width: 20%;
            height: 35px;
            &:hover .shape-path {
              stroke: #409EFF;
              fill: #409EFF;
              cursor: pointer;
            }
          }
        }
        svg:not(:root) {
          overflow: visible;
        }
    }
</style>