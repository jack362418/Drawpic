<template>
  <div class="graphicSelection">
    <a-card size="small" title="图形"  class="selectTool">
        <div class="wrapper-tool">
          <a-collapse default-active-key="1" :bordered="false" accordion>
            <template >
              <a-icon type="caret-right" />
            </template>
            <a-collapse-panel v-for="(item,index) in shapeSvgRef" :key="index" :header="item.type">
              <div v-for="(it,idx) in item.children" :key="idx" class="shapeItem"> 
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
                          stroke-linejoin
                          fill="transparent"
                          stroke="#999"
                          stroke-width="2" 
                          :d="it.path"
                        ></path>
                    </g>
                  </svg>
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
export default defineComponent({
  name: 'graphicSelection',
  setup() {
    const shapeSvgRef = ref(shapeSvg)

    return {
      shapeSvgRef
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
          }
        }
        svg:not(:root) {
          overflow: visible;
        }
    }
</style>