<template>
  <div class="lineTool">
     <svg 
        overflow="visible" 
        width="18"
        height="18"
        xmlns="http://www.w3.org/2000/svg" 
        xmlnsXlink="http://www.w3.org/1999/xlink" 
        version="1.1"
        > 
            <defs>
                <marker 
                    :id="`${idx}-${shapeItem.tip}`" 
                    markerUnits="userSpaceOnUse" 
                    orient="auto" 
                    markerWidth="6" 
                    markerHeight="6" 
                    refX="3" 
                    refY="3"
                    class="line-marker"
                > 
                    <path
                        d="M0,0 L10,5 0,10 Z"
                        fill="#999"
                        transform="scale(0.6, 0.6) rotate(0, 5, 5)"
                    >
                    </path>
                </marker>
            </defs>
            <path 
                class="shape-path"
                vector-effect="non-scaling-stroke" 
                stroke-linecap="butt" 
                stroke-miterlimit="8"
                stroke-linejoin="inherit"
                fill="transparent"
                stroke="#999"
                stroke-width="2" 
                :stroke-dasharray="shapeItem.style === 'solid' ? '0, 0' : '4, 1'"
                :d="shapeItem.path"
                :marker-end="shapeItem.tip ? `url(#${idx}-${shapeItem.tip})` : ''"
            ></path>
        </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'lineTool',
  props:{
      shapeItem:{
          type: Object,
          required: true,
      },
      idx:{
          type: Number,
          required: true,
      }
  }
})
</script>
<style lang="scss" scoped>
  .lineTool{
        height: 100%;
        svg:not(:root) {
          overflow: visible;
        }
        &:hover path{
            stroke: #409EFF;
            fill: #409EFF;
            cursor: pointer;
        }
    }
</style>